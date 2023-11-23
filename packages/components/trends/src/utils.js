import {pluckKey} from '@svizzle/utils';
import * as _ from 'lamb';

const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 28 * DAY; // shortest month
const YEAR = 365 * DAY; // shortest year

// TODO Svizzle: add formatting options for shorter time spans
const formatOptions = [
	[YEAR, {year: '2-digit'}],
	[MONTH, {year: '2-digit', month: '2-digit'}],
	[DAY, {year: '2-digit', month: '2-digit', day: '2-digit'}],
];

// TODO use a module such as `luxon` instead of `Intl.DateTimeFormat`
const timeFormats = _.map(
	formatOptions,
	([maxSeconds, options]) => [
		maxSeconds,
		new Intl.DateTimeFormat('fr-CA', options).format // fr-CA -> yy-mm-dd
	]
);

export const getDateTimeFormat = tickDurationInSecs => {
	let timeFormat;

	if (!tickDurationInSecs) {
		// eslint-disable-next-line prefer-destructuring
		timeFormat = _.last(timeFormats)[1];
	} else {
		// eslint-disable-next-line prefer-destructuring
		timeFormat = _.find(
			timeFormats,
			([maxSeconds]) => tickDurationInSecs >= maxSeconds
		)[1];
	}

	return timeFormat;
};

export const pluckKeySorted = _.pipe([pluckKey, _.sortWith([])]);
