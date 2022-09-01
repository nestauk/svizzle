<script>
	import {isClientSide} from '../../utils/env.js';
	import {
		_firstFamilyToLoad,
		_fontsInfo,
		_runtimeFonts,
		_status,
		loadFonts
	} from './stores.js';

	export let fontsInfo = [];
	export let firstFamilyToLoad = null;
	export let status = $_status;

	$: if (isClientSide) {
		_fontsInfo.set(fontsInfo);
		$_status.isDone  = false;
	}
	$: isClientSide && _firstFamilyToLoad.set(firstFamilyToLoad);
	$: isClientSide && loadFonts($_runtimeFonts);
	$: status = $_status;
</script>
