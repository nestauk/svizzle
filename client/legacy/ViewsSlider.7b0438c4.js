import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, a as space, e as element, t as text, D as create_component, h as head_selector, b as detach_dev, c as claim_space, f as claim_element, g as children, j as claim_text, E as claim_component, k as attr_dev, m as add_location, n as insert_hydration_dev, o as append_hydration_dev, F as mount_component, M as listen_dev, u as transition_in, B as transition_out, G as destroy_component, az as run_all, I as svg_element, J as claim_svg_element, p as noop } from './client.c3033a77.js';
import { V as View } from './View.f7d32cd6.js';
import { V as ViewsSlider } from './ViewsSlider.7036434e.js';
import { V as ViewsSliderMarkup } from './markup.90353e4c.js';

/* src/routes/compounds/viewports/ViewsSlider.svelte generated by Svelte v3.59.2 */
const file = "src/routes/compounds/viewports/ViewsSlider.svelte";

// (26:4) <View id='view_1'>
function create_default_slot_3(ctx) {
  let div;
  let h1;
  let t0;
  let t1;
  let svg;
  let circle;
  const block = {
    c: function create() {
      div = element("div");
      h1 = element("h1");
      t0 = text("View 1");
      t1 = space();
      svg = svg_element("svg");
      circle = svg_element("circle");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      h1 = claim_element(div_nodes, "H1", {});
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, "View 1");
      h1_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      svg = claim_svg_element(div_nodes, "svg", {});
      var svg_nodes = children(svg);
      circle = claim_svg_element(svg_nodes, "circle", {
        cx: true,
        cy: true,
        r: true,
        fill: true,
        stroke: true
      });
      children(circle).forEach(detach_dev);
      svg_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(h1, file, 27, 6, 589);
      attr_dev(circle, "cx", "50");
      attr_dev(circle, "cy", "50");
      attr_dev(circle, "r", "30");
      attr_dev(circle, "fill", "palegreen");
      attr_dev(circle, "stroke", "green");
      add_location(circle, file, 29, 7, 624);
      add_location(svg, file, 28, 6, 611);
      attr_dev(div, "class", "view svelte-1it0sgj");
      add_location(div, file, 26, 5, 564);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      append_hydration_dev(div, h1);
      append_hydration_dev(h1, t0);
      append_hydration_dev(div, t1);
      append_hydration_dev(div, svg);
      append_hydration_dev(svg, circle);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_3.name,
    type: "slot",
    source: "(26:4) <View id='view_1'>",
    ctx
  });
  return block;
}

// (40:4) <View id='view_2'>
function create_default_slot_2(ctx) {
  let div;
  let h1;
  let t0;
  let t1;
  let svg;
  let rect;
  const block = {
    c: function create() {
      div = element("div");
      h1 = element("h1");
      t0 = text("View 2");
      t1 = space();
      svg = svg_element("svg");
      rect = svg_element("rect");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      h1 = claim_element(div_nodes, "H1", {});
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, "View 2");
      h1_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      svg = claim_svg_element(div_nodes, "svg", {});
      var svg_nodes = children(svg);
      rect = claim_svg_element(svg_nodes, "rect", {
        x: true,
        y: true,
        width: true,
        height: true,
        fill: true,
        stroke: true
      });
      children(rect).forEach(detach_dev);
      svg_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(h1, file, 41, 6, 821);
      attr_dev(rect, "x", "10");
      attr_dev(rect, "y", "10");
      attr_dev(rect, "width", "100");
      attr_dev(rect, "height", "100");
      attr_dev(rect, "fill", "orange");
      attr_dev(rect, "stroke", "red");
      add_location(rect, file, 43, 7, 856);
      add_location(svg, file, 42, 6, 843);
      attr_dev(div, "class", "view svelte-1it0sgj");
      add_location(div, file, 40, 5, 796);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      append_hydration_dev(div, h1);
      append_hydration_dev(h1, t0);
      append_hydration_dev(div, t1);
      append_hydration_dev(div, svg);
      append_hydration_dev(svg, rect);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_2.name,
    type: "slot",
    source: "(40:4) <View id='view_2'>",
    ctx
  });
  return block;
}

// (55:4) <View id='view_3'>
function create_default_slot_1(ctx) {
  let div;
  let h1;
  let t0;
  let t1;
  let svg;
  let rect;
  const block = {
    c: function create() {
      div = element("div");
      h1 = element("h1");
      t0 = text("View 3");
      t1 = space();
      svg = svg_element("svg");
      rect = svg_element("rect");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      h1 = claim_element(div_nodes, "H1", {});
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, "View 3");
      h1_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      svg = claim_svg_element(div_nodes, "svg", {});
      var svg_nodes = children(svg);
      rect = claim_svg_element(svg_nodes, "rect", {
        x: true,
        y: true,
        width: true,
        height: true,
        fill: true,
        stroke: true,
        "stroke-width": true
      });
      children(rect).forEach(detach_dev);
      svg_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(h1, file, 56, 6, 1068);
      attr_dev(rect, "x", "40");
      attr_dev(rect, "y", "40");
      attr_dev(rect, "width", "50");
      attr_dev(rect, "height", "50");
      attr_dev(rect, "fill", "cyan");
      attr_dev(rect, "stroke", "blue");
      attr_dev(rect, "stroke-width", "3");
      add_location(rect, file, 58, 7, 1103);
      add_location(svg, file, 57, 6, 1090);
      attr_dev(div, "class", "view svelte-1it0sgj");
      add_location(div, file, 55, 5, 1043);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, div, anchor);
      append_hydration_dev(div, h1);
      append_hydration_dev(h1, t0);
      append_hydration_dev(div, t1);
      append_hydration_dev(div, svg);
      append_hydration_dev(svg, rect);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot_1.name,
    type: "slot",
    source: "(55:4) <View id='view_3'>",
    ctx
  });
  return block;
}

// (25:3) <ViewsSlider {viewId}>
function create_default_slot(ctx) {
  let view0;
  let t0;
  let view1;
  let t1;
  let view2;
  let current;
  view0 = new View({
    props: {
      id: "view_1",
      $$slots: {
        default: [create_default_slot_3]
      },
      $$scope: {
        ctx
      }
    },
    $$inline: true
  });
  view1 = new View({
    props: {
      id: "view_2",
      $$slots: {
        default: [create_default_slot_2]
      },
      $$scope: {
        ctx
      }
    },
    $$inline: true
  });
  view2 = new View({
    props: {
      id: "view_3",
      $$slots: {
        default: [create_default_slot_1]
      },
      $$scope: {
        ctx
      }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      create_component(view0.$$.fragment);
      t0 = space();
      create_component(view1.$$.fragment);
      t1 = space();
      create_component(view2.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(view0.$$.fragment, nodes);
      t0 = claim_space(nodes);
      claim_component(view1.$$.fragment, nodes);
      t1 = claim_space(nodes);
      claim_component(view2.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(view0, target, anchor);
      insert_hydration_dev(target, t0, anchor);
      mount_component(view1, target, anchor);
      insert_hydration_dev(target, t1, anchor);
      mount_component(view2, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      const view0_changes = {};
      if (dirty & /*$$scope*/32) {
        view0_changes.$$scope = {
          dirty,
          ctx
        };
      }
      view0.$set(view0_changes);
      const view1_changes = {};
      if (dirty & /*$$scope*/32) {
        view1_changes.$$scope = {
          dirty,
          ctx
        };
      }
      view1.$set(view1_changes);
      const view2_changes = {};
      if (dirty & /*$$scope*/32) {
        view2_changes.$$scope = {
          dirty,
          ctx
        };
      }
      view2.$set(view2_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(view0.$$.fragment, local);
      transition_in(view1.$$.fragment, local);
      transition_in(view2.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(view0.$$.fragment, local);
      transition_out(view1.$$.fragment, local);
      transition_out(view2.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(view0, detaching);
      if (detaching) detach_dev(t0);
      destroy_component(view1, detaching);
      if (detaching) detach_dev(t1);
      destroy_component(view2, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_default_slot.name,
    type: "slot",
    source: "(25:3) <ViewsSlider {viewId}>",
    ctx
  });
  return block;
}
function create_fragment(ctx) {
  let t0;
  let main;
  let section0;
  let button0;
  let t1;
  let t2;
  let button1;
  let t3;
  let t4;
  let button2;
  let t5;
  let t6;
  let p0;
  let t7;
  let t8;
  let div;
  let viewsslider;
  let t9;
  let section1;
  let p1;
  let t10;
  let t11;
  let p2;
  let t12;
  let code;
  let t13;
  let t14;
  let t15;
  let pre;
  let t16;
  let current;
  let mounted;
  let dispose;
  viewsslider = new ViewsSlider({
    props: {
      viewId: /*viewId*/ctx[0],
      $$slots: {
        default: [create_default_slot]
      },
      $$scope: {
        ctx
      }
    },
    $$inline: true
  });
  const block = {
    c: function create() {
      t0 = space();
      main = element("main");
      section0 = element("section");
      button0 = element("button");
      t1 = text("View 1");
      t2 = space();
      button1 = element("button");
      t3 = text("View 2");
      t4 = space();
      button2 = element("button");
      t5 = text("View 3");
      t6 = space();
      p0 = element("p");
      t7 = text("Viewport");
      t8 = space();
      div = element("div");
      create_component(viewsslider.$$.fragment);
      t9 = space();
      section1 = element("section");
      p1 = element("p");
      t10 = text("You can create a slideshow by rendering a `View` based on its `id` using `ViewsSlider` to transition between views, like below.");
      t11 = space();
      p2 = element("p");
      t12 = text("Please check ");
      code = element("code");
      t13 = text("packages/docs/site/src/routes/compounds/viewports/ViewsSlider.svelte");
      t14 = text(" for more details.");
      t15 = space();
      pre = element("pre");
      t16 = text(ViewsSliderMarkup);
      this.h();
    },
    l: function claim(nodes) {
      const head_nodes = head_selector('svelte-c7i2zf', document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      main = claim_element(nodes, "MAIN", {
        class: true
      });
      var main_nodes = children(main);
      section0 = claim_element(main_nodes, "SECTION", {});
      var section0_nodes = children(section0);
      button0 = claim_element(section0_nodes, "BUTTON", {
        class: true
      });
      var button0_nodes = children(button0);
      t1 = claim_text(button0_nodes, "View 1");
      button0_nodes.forEach(detach_dev);
      t2 = claim_space(section0_nodes);
      button1 = claim_element(section0_nodes, "BUTTON", {
        class: true
      });
      var button1_nodes = children(button1);
      t3 = claim_text(button1_nodes, "View 2");
      button1_nodes.forEach(detach_dev);
      t4 = claim_space(section0_nodes);
      button2 = claim_element(section0_nodes, "BUTTON", {
        class: true
      });
      var button2_nodes = children(button2);
      t5 = claim_text(button2_nodes, "View 3");
      button2_nodes.forEach(detach_dev);
      t6 = claim_space(section0_nodes);
      p0 = claim_element(section0_nodes, "P", {});
      var p0_nodes = children(p0);
      t7 = claim_text(p0_nodes, "Viewport");
      p0_nodes.forEach(detach_dev);
      t8 = claim_space(section0_nodes);
      div = claim_element(section0_nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      claim_component(viewsslider.$$.fragment, div_nodes);
      div_nodes.forEach(detach_dev);
      section0_nodes.forEach(detach_dev);
      t9 = claim_space(main_nodes);
      section1 = claim_element(main_nodes, "SECTION", {});
      var section1_nodes = children(section1);
      p1 = claim_element(section1_nodes, "P", {});
      var p1_nodes = children(p1);
      t10 = claim_text(p1_nodes, "You can create a slideshow by rendering a `View` based on its `id` using `ViewsSlider` to transition between views, like below.");
      p1_nodes.forEach(detach_dev);
      t11 = claim_space(section1_nodes);
      p2 = claim_element(section1_nodes, "P", {});
      var p2_nodes = children(p2);
      t12 = claim_text(p2_nodes, "Please check ");
      code = claim_element(p2_nodes, "CODE", {});
      var code_nodes = children(code);
      t13 = claim_text(code_nodes, "packages/docs/site/src/routes/compounds/viewports/ViewsSlider.svelte");
      code_nodes.forEach(detach_dev);
      t14 = claim_text(p2_nodes, " for more details.");
      p2_nodes.forEach(detach_dev);
      t15 = claim_space(section1_nodes);
      pre = claim_element(section1_nodes, "PRE", {});
      var pre_nodes = children(pre);
      t16 = claim_text(pre_nodes, ViewsSliderMarkup);
      pre_nodes.forEach(detach_dev);
      section1_nodes.forEach(detach_dev);
      main_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "@svizzle/ui: ViewsSlider";
      attr_dev(button0, "class", "svelte-1it0sgj");
      add_location(button0, file, 18, 2, 279);
      attr_dev(button1, "class", "svelte-1it0sgj");
      add_location(button1, file, 19, 2, 342);
      attr_dev(button2, "class", "svelte-1it0sgj");
      add_location(button2, file, 20, 2, 405);
      add_location(p0, file, 22, 2, 469);
      attr_dev(div, "class", "viewport svelte-1it0sgj");
      add_location(div, file, 23, 2, 487);
      add_location(section0, file, 17, 1, 267);
      add_location(p1, file, 75, 2, 1335);
      add_location(code, file, 76, 18, 1488);
      add_location(p2, file, 76, 2, 1472);
      add_location(pre, file, 77, 2, 1594);
      add_location(section1, file, 74, 1, 1323);
      attr_dev(main, "class", "svelte-1it0sgj");
      add_location(main, file, 16, 0, 259);
    },
    m: function mount(target, anchor) {
      insert_hydration_dev(target, t0, anchor);
      insert_hydration_dev(target, main, anchor);
      append_hydration_dev(main, section0);
      append_hydration_dev(section0, button0);
      append_hydration_dev(button0, t1);
      append_hydration_dev(section0, t2);
      append_hydration_dev(section0, button1);
      append_hydration_dev(button1, t3);
      append_hydration_dev(section0, t4);
      append_hydration_dev(section0, button2);
      append_hydration_dev(button2, t5);
      append_hydration_dev(section0, t6);
      append_hydration_dev(section0, p0);
      append_hydration_dev(p0, t7);
      append_hydration_dev(section0, t8);
      append_hydration_dev(section0, div);
      mount_component(viewsslider, div, null);
      append_hydration_dev(main, t9);
      append_hydration_dev(main, section1);
      append_hydration_dev(section1, p1);
      append_hydration_dev(p1, t10);
      append_hydration_dev(section1, t11);
      append_hydration_dev(section1, p2);
      append_hydration_dev(p2, t12);
      append_hydration_dev(p2, code);
      append_hydration_dev(code, t13);
      append_hydration_dev(p2, t14);
      append_hydration_dev(section1, t15);
      append_hydration_dev(section1, pre);
      append_hydration_dev(pre, t16);
      current = true;
      if (!mounted) {
        dispose = [listen_dev(button0, "click", /*click_handler*/ctx[2], false, false, false, false), listen_dev(button1, "click", /*click_handler_1*/ctx[3], false, false, false, false), listen_dev(button2, "click", /*click_handler_2*/ctx[4], false, false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      let [dirty] = _ref;
      const viewsslider_changes = {};
      if (dirty & /*viewId*/1) viewsslider_changes.viewId = /*viewId*/ctx[0];
      if (dirty & /*$$scope*/32) {
        viewsslider_changes.$$scope = {
          dirty,
          ctx
        };
      }
      viewsslider.$set(viewsslider_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(viewsslider.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(viewsslider.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(main);
      destroy_component(viewsslider);
      mounted = false;
      run_all(dispose);
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
function instance($$self, $$props, $$invalidate) {
  let {
    $$slots: slots = {},
    $$scope
  } = $$props;
  validate_slots('ViewsSlider', slots, []);
  let viewId = 'view_1';
  const setViewId = id => {
    $$invalidate(0, viewId = id);
  };
  const writable_props = [];
  Object.keys($$props).forEach(key => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ViewsSlider> was created with unknown prop '${key}'`);
  });
  const click_handler = () => setViewId('view_1');
  const click_handler_1 = () => setViewId('view_2');
  const click_handler_2 = () => setViewId('view_3');
  $$self.$capture_state = () => ({
    View,
    ViewsSlider,
    ViewsSliderMarkup,
    viewId,
    setViewId
  });
  $$self.$inject_state = $$props => {
    if ('viewId' in $$props) $$invalidate(0, viewId = $$props.viewId);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [viewId, setViewId, click_handler, click_handler_1, click_handler_2];
}
class ViewsSlider_1 extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "ViewsSlider_1",
      options,
      id: create_fragment.name
    });
  }
}

export { ViewsSlider_1 as default };
