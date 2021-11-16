<!--
from https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/css/vision_deficiency.cc;l=24-78;drc=25c9d397f8ece542feaf21ad680b71f161edf47b:
The filter color matrices are based on the following research paper:
Gustavo M. Machado, Manuel M. Oliveira, and Leandro A. F. Fernandes,
"A Physiologically-based Model for Simulation of Color Vision Deficiency".
IEEE Transactions on Visualization and Computer Graphics. Volume 15 (2009),
Number 6, November/December 2009. pp. 1291-1298.
https://www.inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html
-->
<svg width='0' height='0' aria-hidden='true'>
	<defs>
		<filter id='achromatopsia'>
			<feColorMatrix values=' 0.213  0.715  0.072  0.000  0.000
									0.213  0.715  0.072  0.000  0.000
									0.213  0.715  0.072  0.000  0.000
									0.000  0.000  0.000  1.000  0.000'
			/>
		</filter>
		<filter id='deuteranopia'>
			<feColorMatrix values=' 0.367  0.861 -0.228  0.000  0.000
									0.280  0.673  0.047  0.000  0.000
									0.012  0.043  0.969  0.000  0.000
									0.000  0.000  0.000  1.000  0.000'
			/>
		</filter>
		<filter id='protanopia'>
			<feColorMatrix values=' 0.152  1.053 -0.205  0.000  0.000
									0.115  0.786  0.099  0.000  0.000
									-0.004 -0.048  1.052  0.000  0.000
									0.000  0.000  0.000  1.000  0.000'
			/>
		</filter>
		<filter id='tritanopia'>
			<feColorMatrix values=' 1.256 -0.077 -0.179  0.000  0.000
									-0.078  0.931  0.148  0.000  0.000
									0.005  0.691  0.304  0.000  0.000
									0.000  0.000  0.000  1.000  0.000'
			/>
		</filter>
		<!--
		The values for the recoloring matrices are not from official sources and
		are only tentative.
		-->
		<filter id='recolor-deuteranopia'>
			<feColorMatrix values=' 0, 0.5, 0.5, 0, 0,
									0.5, 0.5, 0, 0, 0,
									0, 0, 1, 0, 0,
									0, 0, 0, 1, 0'
			/>
		</filter>
		<filter id='recolor-protanopia'>
			<feColorMatrix values=' 0.5, 0, 0.5, 0, 0,
									0, 1, 0, 0, 0,
									0.5, 0.5, 0, 0, 0,
									0, 0, 0, 1, 0'
			/>
		</filter>
		<filter id='recolor-tritanopia'>
			<feColorMatrix values=' 0.5, 0, 0.5, 0, 0,
									0, 1, 0, 0, 0,
									0.5, 0.5, 0, 0, 0,
									0, 0, 0, 1, 0'
			/>
		</filter>
	</defs>
</svg>

<style>
	svg {
		position: fixed;
		visibility: hidden;
	}
	:global(.color-corrected) {
		filter: var(--color-correction); /* color vision deficiency */
	}
	:global(.simulated-deuteranopia) {
		filter: url(#deuternopia);
	}
	:global(.simulated-protanopia) {
		filter: url(#protanopia);
	}
	:global(.simulated-tritanopia) {
		filter: url(#tritanopia);
	}
</style>
