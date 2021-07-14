import { a as isClientSide } from './env.a10fb8fd.js';

var makeURL = function makeURL(base, id, year) {
  var url = year ? "".concat(base, "/").concat(id, "/").concat(year) : "".concat(base, "/").concat(id);

  if (isClientSide) {
    var _location = location,
        protocol = _location.protocol,
        host = _location.host;
    url = new URL(url, "".concat(protocol, "//").concat(host)).toString();
  }

  return url;
};

var regionSpecs = {
  world: {
    // epsgId: 4326, // TODO
    // levels: undefined, // TODO
    // years: undefined, // TODO
    objectIds: ['countries', 'land'],
    properties: ['iso_a2'],
    resolutions: ['110m'],
    type: 'world'
  },
  NUTS: {
    epsgId: 4326,
    levels: [0, 1, 2, 3],
    objectIds: ['NUTS'],
    properties: ['NUTS_ID', 'LEVL_CODE', 'CNTR_CODE', 'NUTS_NAME', 'FID'],
    resolutions: ['03M', '10M'],
    type: 'NUTS',
    years: [2003, 2006, 2010, 2013, 2016, 2021]
  }
};

/* navigation */

var hrefBase = '/svizzle/compounds/time_region_value';
/* flags */

var flags = {
  showPOIs: false
};
/* regional selection */

var regionType = 'NUTS';
var regionSettings = {
  canSelectLevels: true,
  filterableLevel: 0,
  ignoredRegions: ['ES7', 'FR9', 'FRY', 'IS', 'PT2', 'PT3', 'TR'],
  key: 'NUTS_ID',
  level: 2,
  level0: undefined,
  levels: regionSpecs[regionType].levels,
  objectId: 'NUTS',
  resolution: '03M',
  type: regionType
};

export { flags as f, hrefBase as h, makeURL as m, regionSettings as r };
