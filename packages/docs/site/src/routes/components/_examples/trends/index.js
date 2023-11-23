import {config as percentilesTrends} from './PercentilesTrends.js';
import {config as streamGraph} from './StreamGraph.js';
import {config as trends} from './Trends.js';

import {examplesFormatter4} from '../utils.js';

export default examplesFormatter4([
	...percentilesTrends,
	...streamGraph,
	...trends,
]);
