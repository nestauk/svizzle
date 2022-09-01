import {isKeyValue} from '@svizzle/utils';
import * as _ from 'lamb';

export const getFamily = _.getKey('family');
export const getFamilies = _.mapWith(getFamily);

export const isFamilyEqualTo = family => isKeyValue(['family', family]);

export const createFontFaces = ({family, faces}) => faces && faces.map(
	({src, descriptors}) => new FontFace(family, src, descriptors)
);

export const loadFontFaces = faces => faces && Promise.all(
	faces.map(async face => {
		const fontFace = await face.load();
		document.fonts.add(fontFace);
	})
);
