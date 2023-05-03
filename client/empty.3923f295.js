import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, e as element, D as create_component, f as claim_element, g as children, E as claim_component, b as detach_dev, k as attr_dev, m as add_location, n as insert_hydration_dev, F as mount_component, p as noop, u as transition_in, B as transition_out, G as destroy_component } from './client.c587a315.js';
import { M as Mapbox } from './Mapbox.93d9344d.js';

/* src/routes/compounds/mapbox/empty.svelte generated by Svelte v3.58.0 */
const file = "src/routes/compounds/mapbox/empty.svelte";

function create_fragment(ctx) {
	let div;
	let mapbox;
	let current;

	mapbox = new Mapbox({
			props: {
				accessToken,
				styleURL,
				withScaleControl: true,
				withZoomControl: true
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div = element("div");
			create_component(mapbox.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(mapbox.$$.fragment, div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "map-container svelte-vpafuk");
			add_location(div, file, 7, 0, 249);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			mount_component(mapbox, div, null);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(mapbox.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(mapbox.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(mapbox);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const accessToken = 'pk.eyJ1IjoibmVzdGEtdWsiLCJhIjoiY2ozbjUzY2drMDAwNzJxbnl6a21uM253cSJ9.3RTMySEVk0LC4gQvGoG-Zw';
const styleURL = 'mapbox://styles/nesta-uk/cl8olrzo200ci16pim0h4c1pn';

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Empty', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Empty> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ Mapbox, accessToken, styleURL });
	return [];
}

class Empty extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Empty",
			options,
			id: create_fragment.name
		});
	}
}

export { Empty as default };
