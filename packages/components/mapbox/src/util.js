export class CustomControl {
	constructor (node) {
		this.elementNode = node;
	}

	onAdd (map) {
		this._map = map;
		this._container = document.createElement('div');
		this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
		this._container.appendChild(this.elementNode);

		return this._container;
	}

	onRemove () {
		this._container.remove();
		this.map = undefined;
	}
}

export const ws_en_to_wsen = ([[w, s], [e, n]]) => [w, s, e, n];
