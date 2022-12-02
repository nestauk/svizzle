import {getAtlasId, makeTopoId, makeTopoURL} from '@svizzle/atlas';
import {default as idToNutsIdByYear}
	from '@svizzle/atlas/data/dist/NUTS/idToNutsIdByYear.js';
import {topoToGeo} from '@svizzle/geo';
import {isIterableNotEmpty, isNotNil} from '@svizzle/utils';
import bboxClip from '@turf/bbox-clip';
import {cross} from 'd3-array';
import * as _ from 'lamb';
import {derived, get, writable} from 'svelte/store';

// lib/stores
import {
	_availableYears,
	_regionsYearSpec,
	_selectedRegionAtlasIds
} from './indicator.js';
import {_regionSettings} from './regionSettings.js';
import {_currentLevel} from './selectedRegions.js';

/* sources */

export const _uriMap = derived(
	_regionSettings,
	({atlasBase, levels, resolution, type, years}) => {
		let uriMap = {};

		if (levels && years) {
			// level first so that we'll download all years at level 0 first
			const pairs = cross(levels, years);

			uriMap = _.fromPairs(
				_.map(pairs, ([level, year]) => {
					const id = makeTopoId({level, resolution, type, year});
					const url = makeTopoURL(id, type, atlasBase);

					return [id, {url}];
				})
			);
		}

		return uriMap;
	}
);

/* navigation */

// current topojson id

const _topoAtlasId = derived(
	[_currentLevel, _regionSettings, _regionsYearSpec],
	([currentLevel, regionSettings, regionsYearSpec]) =>
		regionSettings && regionsYearSpec &&
		makeTopoId({
			level: currentLevel,
			level0: regionSettings.level0,
			resolution: regionSettings.resolution,
			type: regionSettings.type,
			year: regionsYearSpec,
		})
);

// priorities

const getDistance = _.getKey('distance');

export const _topojsonPriorities = derived(
	[_availableYears, _currentLevel, _regionSettings, _regionsYearSpec],
	([availableYears, currentLevel, regionSettings, regionsYearSpec]) => {

		const {levels, level0, resolution, type, years} = regionSettings;

		let priorities = {asapKeys: [], nextKeys: []};

		if (availableYears && isNotNil(currentLevel) && regionsYearSpec) {
			const availableSpecYears = _.filter(years, year => _.isIn(availableYears, year));

			const yearsSelections = _.map(availableSpecYears, year => ({
				distance: Math.abs(year - regionsYearSpec),
				level: currentLevel,
				year,
			}));

			const levelsSelections = _.map(levels, level => ({
				distance: Math.abs(level - currentLevel),
				level,
				year: regionsYearSpec,
			}));

			const nextSelections = _.sort(
				levelsSelections.concat(yearsSelections),
				[getDistance]
			);

			const [asapKey, ...nextKeys] = _.map(
				nextSelections,
				({level, year}) => makeTopoId({
					level,
					level0,
					resolution,
					type,
					year,
				})
			);

			priorities = {asapKeys: [asapKey], nextKeys};
		}

		return priorities;
	}
);

/* topojson cache */

export const _topoCache = writable({});

/* fetching */

// progress

export const _loadingTopojsonKeys = writable([]); // FIXME

export const _isTopoFetching = derived(
	[_loadingTopojsonKeys, _topoAtlasId],
	([loadingTopojsonKeys, topoAtlasId]) =>
		_.isIn(loadingTopojsonKeys, topoAtlasId)
);

/* feature keys, paths, ids */

const _getFeatureKey = derived(
	_regionSettings,
	regionSettings => _.getPath(`properties.${regionSettings.key}`)
);

const _getFeatureAtlasId = derived(
	[_getFeatureKey, _regionSettings, _regionsYearSpec],
	([getFeatureKey, {type}, specYear]) =>
		feature => {
			const regionId = getFeatureKey(feature);
			const atlasId = getAtlasId({regionId, specYear, type});

			return atlasId;
		}
);

export const _getAtlasIdFromRegionId = derived(
	[_regionSettings, _regionsYearSpec],
	([{type}, specYear]) =>
		regionId => getAtlasId({regionId, specYear, type})
);

export const _getRegionIdFromAtlasId = derived(
	_regionsYearSpec,
	regionsYearSpec =>
		atlasId =>
			idToNutsIdByYear[atlasId]
				? idToNutsIdByYear[atlasId][regionsYearSpec]
				: null
);

/* geojson */

// geojson cache

export const _geoCache = writable({});

derived(
	[_regionSettings, _topoCache],
	_.identity
).subscribe(
	([{objectId}, topoCache]) => {
		const geoCache = get(_geoCache);

		_.forEach(
			_.keys(topoCache),
			id => {
				const topojson = topoCache[id];
				let geojson = geoCache[id];

				if (topojson && !geojson) {
					geojson = topoToGeo(topojson, objectId);

					_geoCache.update(cache => {
						cache[id] = geojson;

						return cache
					});
				}
			}
		);
	}
);

export const _wholeGeojson = derived(
	[_geoCache, _topoAtlasId],
	([geoCache, topoAtlasId]) => geoCache[topoAtlasId]
);

/* processing */

const _featuresIndex = derived(
	[_getFeatureAtlasId, _wholeGeojson],
	([getFeatureAtlasId, wholeGeojson]) =>
		wholeGeojson && _.index(wholeGeojson.features, getFeatureAtlasId)
);

const removeEmptyGeometries = _.updatePath(
	'geometry.coordinates',
	_.filterWith(isIterableNotEmpty)
);

export const _euGeojson = derived(
	[_regionSettings, _wholeGeojson],
	([{maxBbox, processing: {clipIds, excludeIds}}, wholeGeojson]) => {

		const clippedGeojson =
			wholeGeojson &&
			_.updatePathIn(wholeGeojson, 'features',
				_.reduceWith((acc, feature) => {
					const clipIt = maxBbox && _.isIn(clipIds, feature.properties.atlasId);
					const keepIt = !_.isIn(excludeIds, feature.properties.atlasId);

					if (clipIt) {
						const clippedFeature = removeEmptyGeometries(
							bboxClip(feature, maxBbox)
						);
						acc.push(clippedFeature);
					} else if (keepIt) {
						acc.push(feature);
					}

					return acc;
				}, [])
			)
			|| null;


		return clippedGeojson;
	}
);

export const _filteredGeojson = derived(
	[_featuresIndex, _regionSettings, _selectedRegionAtlasIds, _wholeGeojson],
	([
		featuresIndex,
		{maxBbox, processing: {clipIds, excludeIds}},
		selectedRegionAtlasIds,
		wholeGeojson,
	]) =>
		wholeGeojson &&
		featuresIndex &&
		_.setPathIn(wholeGeojson, 'features',
			_.reduce(selectedRegionAtlasIds, (acc, atlasId) => {
				const feature = featuresIndex[atlasId];

				if (feature) {
					const clipIt = maxBbox && _.isIn(clipIds, feature.properties.atlasId);
					const keepIt = !_.isIn(excludeIds, feature.properties.atlasId);

					if (clipIt) {
						const clippedFeature = removeEmptyGeometries(
							bboxClip(feature, maxBbox)
						);
						acc.push(clippedFeature);
					} else if (keepIt) {
						acc.push(feature);
					}
				}

				return acc;
			}, [])
		)
);
