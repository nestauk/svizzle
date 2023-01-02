import {getAtlasId, makeTopoId, makeTopoURL} from '@svizzle/atlas';
import {default as idToNutsIdByYear}
	from '@svizzle/atlas/data/dist/NUTS/idToNutsIdByYear.js';
import {pruneTopology, topoToGeo} from '@svizzle/geo';
import {isNotNil, makeIsIncluded, transformPaths} from '@svizzle/utils';
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

// current topojson

export const _fetchedTopojson = derived(
	[_topoAtlasId, _topoCache],
	([topoAtlasId, topoCache]) => topoCache[topoAtlasId]
);

// TODO no data ?

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

const _geometriesPath = derived(
	_regionSettings,
	regionSettings => `objects.${regionSettings.objectId}.geometries`
);

/* processing */

const _isValidRegionKey = derived(
	[_getFeatureAtlasId, _regionSettings],
	([getFeatureAtlasId, {ignoredRegions}]) => _.pipe([
		getFeatureAtlasId,
		_.not(makeIsIncluded(ignoredRegions)),
	])
);

const _removeInvalidRegions = derived(
	[_geometriesPath, _isValidRegionKey],
	([geometriesPath, isValidRegionKey]) => _.pipe([
		transformPaths({
			[geometriesPath]: _.filterWith(isValidRegionKey)
		}),
		pruneTopology
	])
);

export const _topojson = derived(
	[_fetchedTopojson, _removeInvalidRegions],
	([fetchedTopojson, removeInvalidRegions]) =>
		fetchedTopojson && removeInvalidRegions(fetchedTopojson)
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

export const _geojson = derived(
	[_geoCache, _topoAtlasId],
	([geoCache, topoAtlasId]) => geoCache[topoAtlasId]
);

const _featuresIndex = derived(
	[_geojson, _getFeatureAtlasId],
	([geojson, getFeatureAtlasId]) =>
		geojson && _.index(geojson.features, getFeatureAtlasId)
);

export const _filteredGeojson = derived(
	[_featuresIndex, _geojson, _selectedRegionAtlasIds],
	([featuresIndex, geojson, selectedRegionAtlasIds]) =>
		geojson &&
		featuresIndex &&
		_.setPathIn(geojson, 'features',
			_.reduce(selectedRegionAtlasIds, (acc, atlasId) => {
				const feature = featuresIndex[atlasId];
				feature && acc.push(feature);

				return acc;
			}, [])
		)
);
