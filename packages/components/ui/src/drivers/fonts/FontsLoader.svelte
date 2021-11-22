<script>
	import {isClientSide} from '../../utils/env';
	import {
		_firstFamilyToLoad,
		_fontsInfo,
		_runtimeFonts,
		_status,
		loadFonts
	} from './stores';

	export let fontsInfo = [];
	export let firstFamilyToLoad = null;
	export let status = $_status;

	$: if (isClientSide) {
		_fontsInfo.set(fontsInfo);
		$_status.isDone  = false;
	};
	$: isClientSide && _firstFamilyToLoad.set(firstFamilyToLoad);
	$: isClientSide && loadFonts($_runtimeFonts);
	$: status = $_status;
</script>
