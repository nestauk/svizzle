var makeURL = function makeURL(base, id, year) {
  return new URL(year ? "".concat(base, "/").concat(id, "/").concat(year) : "".concat(base, "/").concat(id), document.baseURI);
};

var hrefBase = 'compounds/time_region_value';

export { hrefBase as h, makeURL as m };
