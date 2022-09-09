import {getFamilies} from '@svizzle/ui';

export const fontsInfo = [
	{
		family: 'Avenir Next Variable',
		faces: [
			{
				src: 'url(/svizzle/font/AvenirNext/Variable.ttf) format("truetype")'
			}
		]
	},
	{
		family: 'Archivo',
		faces: [
			{
				src: 'url(/svizzle/font/Archivo/VariableFont_wdth,wght.ttf) format("truetype")',
				descriptors: {
					style: 'normal'
				}
			},
			{
				src: 'url(/svizzle/font/Archivo/Italic-VariableFont_wdth,wght.ttf) format("truetype")',
				descriptors: {
					style: 'italic'
				}
			},
		]
	},
	{
		family: 'Noboto Flex',
		faces: [
			{
				src: 'url(/svizzle/font/NobotoFlex/Variable.woff2)',
				descriptors: {
					weight: 140
				}
			}
		]
	},
	{
		family: 'Courier New'
	},
	{
		family: 'Open Dyslexia',
		faces: [
			{
				src: 'url(/svizzle/font/OpenDyslexic/Regular.otf) format("opentype")',
				descriptors: {
					weight: 400,
					style: 'normal'
				}
			},
			{
				src: 'url(/svizzle/font/OpenDyslexic/Italic.otf) format("opentype")',
				descriptors: {
					weight: 400,
					style: 'italic'
				}
			},
			{
				src: 'url(/svizzle/font/OpenDyslexic/Bold.otf) format("opentype")',
				descriptors: {
					weight: 700,
					style: 'normal'
				}
			},
			{
				src: 'url(/svizzle/font/OpenDyslexic/BoldItalic.otf) format("opentype")',
				descriptors: {
					weight: 700,
					style: 'italic'
				}
			}
		]
	}
];

export const a11yFontFamilies = getFamilies(fontsInfo);
