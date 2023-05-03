import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, a as space, e as element, t as text, h as head_selector, b as detach_dev, c as claim_space, f as claim_element, g as children, j as claim_text, m as add_location, k as attr_dev, n as insert_hydration_dev, o as append_hydration_dev, p as noop } from './client.b153d44c.js';

/* src/routes/compounds/index.svelte generated by Svelte v3.58.0 */
const file = "src/routes/compounds/index.svelte";
function create_fragment(ctx) {
  let t0;
  let h1;
  let t1;
  let t2;
  let ul;
  let li0;
  let a0;
  let t3;
  let t4;
  let li1;
  let a1;
  let t5;
  const block = {
    c: function create() {
      t0 = space();
      h1 = element("h1");
      t1 = text("Compounds");
      t2 = space();
      ul = element("ul");
      li0 = element("li");
      a0 = element("a");
      t3 = text("@svizzle/mapbox");
      t4 = space();
      li1 = element("li");
      a1 = element("a");
      t5 = text("@svizzle/time_region_value");
      this.h();
    },
    l: function claim(nodes) {
      const head_nodes = head_selector('svelte-1t8fhib', document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      h1 = claim_element(nodes, "H1", {});
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes, "Compounds");
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      ul = claim_element(nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);
      li0 = claim_element(ul_nodes, "LI", {});
      var li0_nodes = children(li0);
      a0 = claim_element(li0_nodes, "A", {
        href: true
      });
      var a0_nodes = children(a0);
      t3 = claim_text(a0_nodes, "@svizzle/mapbox");
      a0_nodes.forEach(detach_dev);
      li0_nodes.forEach(detach_dev);
      t4 = claim_space(ul_nodes);
      li1 = claim_element(ul_nodes, "LI", {});
      var li1_nodes = children(li1);
      a1 = claim_element(li1_nodes, "A", {
        href: true
      });
      var a1_nodes = children(a1);
      t5 = claim_text(a1_nodes, "@svizzle/time_region_value");
      a1_nodes.forEach(detach_dev);
      li1_nodes.forEach(detach_dev);
      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "Svizzle Compounds";
      add_location(h1, file, 4, 0, 64);
      attr_dev(a0, "href", "compounds/mapbox");
      add_location(a0, file, 8, 2, 97);
      add_location(li0, file, 7, 1, 90);
      attr_dev(a1, "href", "compounds/mapbox");
      add_location(a1, file, 11, 2, 159);
      add_location(li1, file, 10, 1, 152);
      attr_dev(ul, "class", "svelte-1rd5d3v");
      add_location(ul, file, 6, 0, 84);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, t0, anchor);
      insert_hydration_dev(target, h1, anchor);
      append_hydration_dev(h1, t1);
      insert_hydration_dev(target, t2, anchor);
      insert_hydration_dev(target, ul, anchor);
      append_hydration_dev(ul, li0);
      append_hydration_dev(li0, a0);
      append_hydration_dev(a0, t3);
      append_hydration_dev(ul, t4);
      append_hydration_dev(ul, li1);
      append_hydration_dev(li1, a1);
      append_hydration_dev(a1, t5);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(h1);
      if (detaching) detach_dev(t2);
      if (detaching) detach_dev(ul);
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
function instance($$self, $$props) {
  let {
    $$slots: slots = {},
    $$scope
  } = $$props;
  validate_slots('Compounds', slots, []);
  const writable_props = [];
  Object.keys($$props).forEach(key => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn("<Compounds> was created with unknown prop '".concat(key, "'"));
  });
  return [];
}
class Compounds extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Compounds",
      options,
      id: create_fragment.name
    });
  }
}

export { Compounds as default };
