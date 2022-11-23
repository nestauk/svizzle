<script>
	import {isClientSide} from '@svizzle/ui';

	import {
		getAllStylesBySelector,
		getStylesheet,
		setStyleRules
	} from '../../utils/style.js';
	import {getURL} from '../../utils/url.js';

	export let href;
	export let styleRules;

	$: hrefURL = isClientSide && href && getURL(href).toString();
	$: allStyleRules = hrefURL
		? [...getStylesheet(hrefURL).cssRules] // convert collection to array
		: [];
	$: styleRulesObj = getAllStylesBySelector(allStyleRules);
	$: setStyleRules(styleRulesObj, styleRules);
</script>
