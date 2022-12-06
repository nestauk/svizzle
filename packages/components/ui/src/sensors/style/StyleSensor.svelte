<script>
	import {isClientSide} from '../../utils/env.js';
	import {getStylesheet, makeGetStyleRulesObj} from '../../utils/style.js';
	import {getURL} from '../../utils/url.js';

	export let href;
	export let selectorRegex;
	export let styleRules;

	$: hrefURL = isClientSide && href && getURL(href).toString();
	$: allStyleRules = hrefURL
		? [...getStylesheet(hrefURL).cssRules] // convert collection to array
		: [];
	$: getStyleRulesObj = makeGetStyleRulesObj(selectorRegex);
	$: styleRules = getStyleRulesObj(allStyleRules);
</script>
