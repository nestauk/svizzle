import Bowser from 'bowser';

export const isServerSide = typeof window === 'undefined';

export const isClientSide = !isServerSide;

export const PLATFORM = isClientSide
	? {...Bowser.parse(window.navigator.userAgent)}
	: null;

export const isPlatformIn = (oses, browsers) => isClientSide
	&& oses.includes(PLATFORM?.os.name)
	&& browsers.includes(PLATFORM?.browser.name);
