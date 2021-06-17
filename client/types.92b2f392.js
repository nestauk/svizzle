import { I as sortWith, aw as sorter, g as getKey, l as mapValues, v as values, p as pipe, ad as filterWith, ah as is, a6 as isIterableNotEmpty, ax as flatMapWith, ay as updatePath, az as negate, C as _, D as pairs, aA as isArray, aB as isObject, G as isUndefined } from './defaultLocale.f3c5fc93.js';
import { t as transformValues, m as mergeObj } from './linear.86b0ac46.js';
import { a9 as derived, U as writable, S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, o as validate_each_argument, R as validate_store, T as component_subscribe, v as validate_slots, e as element, a as space, t as text, f as claim_element, g as children, b as detach_dev, c as claim_space, h as claim_text, j as attr_dev, k as add_location, l as insert_dev, m as append_dev, B as listen_dev, V as is_function, K as group_outros, x as transition_out, L as check_outros, w as transition_in, A as set_data_dev, W as run_all, G as create_component, H as claim_component, I as mount_component, ad as stop_propagation, r as destroy_each, J as destroy_component, ac as set_store_value, C as bubble, n as noop$1, D as empty } from './client.ed49fe48.js';
import { I as Icon, a as Info } from './Info.aabe6ce3.js';
import { r as CheckSquare, u as Square, L as Link, q as LinkButton, G as Globe, t as ChevronUp, s as ChevronDown, S as Switch } from './Switch.c8812232.js';
import { c as _isSmallScreen } from './stores.a3dd9b97.js';
import { D as Download } from './Download.fd9eedfa.js';
import { a as _theme, t as toggleColorScheme, e as _colorSchemeLabel, f as _colorSchemeLabels } from './theme.78e0950d.js';

/**
* @module @svizzle/utils/any-undefined
*/

/**
 * A function that does nothing
 *
 * @function
 * @arg {*} any
 * @return {undefined} - Any -> Undefined
 *
 * @example
> noop()
undefined
 *
 * @since v0.14.0
 */
// eslint-disable-next-line no-empty-function
const noop = () => {};

var EOL = {},
    EOF = {},
    QUOTE = 34,
    NEWLINE = 10,
    RETURN = 13;

function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function(name, i) {
    return JSON.stringify(name) + ": d[" + i + "] || \"\"";
  }).join(",") + "}");
}

function customConverter(columns, f) {
  var object = objectConverter(columns);
  return function(row, i) {
    return f(object(row), i, columns);
  };
}

// Compute unique columns in order of discovery.
function inferColumns(rows) {
  var columnSet = Object.create(null),
      columns = [];

  rows.forEach(function(row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push(columnSet[column] = column);
      }
    }
  });

  return columns;
}

function pad(value, width) {
  var s = value + "", length = s.length;
  return length < width ? new Array(width - length + 1).join(0) + s : s;
}

function formatYear(year) {
  return year < 0 ? "-" + pad(-year, 6)
    : year > 9999 ? "+" + pad(year, 6)
    : pad(year, 4);
}

function formatDate(date) {
  var hours = date.getUTCHours(),
      minutes = date.getUTCMinutes(),
      seconds = date.getUTCSeconds(),
      milliseconds = date.getUTCMilliseconds();
  return isNaN(date) ? "Invalid Date"
      : formatYear(date.getUTCFullYear()) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2)
      + (milliseconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3) + "Z"
      : seconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "Z"
      : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z"
      : "");
}

function dsv(delimiter) {
  var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
      DELIMITER = delimiter.charCodeAt(0);

  function parse(text, f) {
    var convert, columns, rows = parseRows(text, function(row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns || [];
    return rows;
  }

  function parseRows(text, f) {
    var rows = [], // output rows
        N = text.length,
        I = 0, // current character index
        n = 0, // current line number
        t, // current token
        eof = N <= 0, // current token followed by EOF?
        eol = false; // current token followed by EOL?

    // Strip the trailing newline.
    if (text.charCodeAt(N - 1) === NEWLINE) --N;
    if (text.charCodeAt(N - 1) === RETURN) --N;

    function token() {
      if (eof) return EOF;
      if (eol) return eol = false, EOL;

      // Unescape quotes.
      var i, j = I, c;
      if (text.charCodeAt(j) === QUOTE) {
        while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE);
        if ((i = I) >= N) eof = true;
        else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        return text.slice(j + 1, i - 1).replace(/""/g, "\"");
      }

      // Find next delimiter or newline.
      while (I < N) {
        if ((c = text.charCodeAt(i = I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        else if (c !== DELIMITER) continue;
        return text.slice(j, i);
      }

      // Return last token before EOF.
      return eof = true, text.slice(j, N);
    }

    while ((t = token()) !== EOF) {
      var row = [];
      while (t !== EOL && t !== EOF) row.push(t), t = token();
      if (f && (row = f(row, n++)) == null) continue;
      rows.push(row);
    }

    return rows;
  }

  function preformatBody(rows, columns) {
    return rows.map(function(row) {
      return columns.map(function(column) {
        return formatValue(row[column]);
      }).join(delimiter);
    });
  }

  function format(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
  }

  function formatBody(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return preformatBody(rows, columns).join("\n");
  }

  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }

  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }

  function formatValue(value) {
    return value == null ? ""
        : value instanceof Date ? formatDate(value)
        : reFormat.test(value += "") ? "\"" + value.replace(/"/g, "\"\"") + "\""
        : value;
  }

  return {
    parse: parse,
    parseRows: parseRows,
    format: format,
    formatBody: formatBody,
    formatRows: formatRows,
    formatRow: formatRow,
    formatValue: formatValue
  };
}

var csv = dsv(",");

var csvParse = csv.parse;

const getNutsId = getKey('nuts_id');

const sortAscByYear = sortWith([sorter(getKey('year'))]);

const sanitizeValue = id => transformValues({
	[id]: Number,
	// year: Number
});
const parseCSV = id =>
	t => csvParse(t, sanitizeValue(id));

var UKC = {
	id: "UKC",
	name: "North East",
	children: [
		"UKC1",
		"UKC2"
	]
};
var UKD = {
	id: "UKD",
	name: "North West",
	children: [
		"UKD1",
		"UKD2",
		"UKD3",
		"UKD4",
		"UKD5",
		"UKD6",
		"UKD7"
	]
};
var UKE = {
	id: "UKE",
	name: "Yorkshire and The Humber",
	children: [
		"UKE1",
		"UKE2",
		"UKE3",
		"UKE4"
	]
};
var UKF = {
	id: "UKF",
	name: "East Midlands",
	children: [
		"UKF1",
		"UKF2",
		"UKF3"
	]
};
var UKG = {
	id: "UKG",
	name: "West Midlands",
	children: [
		"UKG1",
		"UKG2",
		"UKG3"
	]
};
var UKH = {
	id: "UKH",
	name: "East Of England",
	children: [
		"UKH1",
		"UKH2",
		"UKH3"
	]
};
var UKI = {
	id: "UKI",
	name: "London",
	children: [
		"UKI1",
		"UKI2",
		"UKI3",
		"UKI4",
		"UKI5",
		"UKI6",
		"UKI7"
	]
};
var UKJ = {
	id: "UKJ",
	name: "South East",
	children: [
		"UKJ1",
		"UKJ2",
		"UKJ3",
		"UKJ4"
	]
};
var UKK = {
	id: "UKK",
	name: "South West",
	children: [
		"UKK1",
		"UKK2",
		"UKK3",
		"UKK4"
	]
};
var UKL = {
	id: "UKL",
	name: "Wales",
	children: [
		"UKL1",
		"UKL2"
	]
};
var UKM = {
	id: "UKM",
	name: "Scotland",
	children: [
		"UKM1",
		"UKM2",
		"UKM3",
		"UKM4",
		"UKM5",
		"UKM6",
		"UKM7",
		"UKM8",
		"UKM9"
	]
};
var UKN = {
	id: "UKN",
	name: "Northern Ireland",
	children: [
		"UKN0"
	]
};
var UK_NUTS_1_2 = {
	UKC: UKC,
	UKD: UKD,
	UKE: UKE,
	UKF: UKF,
	UKG: UKG,
	UKH: UKH,
	UKI: UKI,
	UKJ: UKJ,
	UKK: UKK,
	UKL: UKL,
	UKM: UKM,
	UKN: UKN
};

// selected regions

const noNutsSelected = mapValues(UK_NUTS_1_2, mergeObj({selected: false}));
const allNutsSelected = mapValues(UK_NUTS_1_2, mergeObj({selected: true}));
const _nutsSelection = writable(allNutsSelected);
const _nutsRegions = derived(_nutsSelection, values);

const selectAllRegions = () => _nutsSelection.set(allNutsSelected);
const deselectAllRegions = () => _nutsSelection.set(noNutsSelected);

const toggleRegionNUTS1 =
	id => _nutsSelection.update(updatePath(`${id}.selected`, negate));

const _someUnselectedRegions = derived(
	_nutsSelection,
	pipe([
		values,
		filterWith(pipe([getKey('selected'), is(false)])),
		isIterableNotEmpty
	])
);

const getSelectedChildren = pipe([
	values,
	filterWith(getKey('selected')),
	flatMapWith(getKey('children'))
]);
const _selectedNUT2Ids = derived(
	_nutsSelection,
	nutsSelection => getSelectedChildren(nutsSelection)
);

// pre-selected regions

const getNUTS1Children = id => UK_NUTS_1_2[id].children;
const _preselectedNUTS1Id = writable(null);
const _preselectedNUTS2Ids = derived(
	_preselectedNUTS1Id,
	id => id && getNUTS1Children(id) || []
);

/* ../../components/time_region_value/src/node_modules/components/GeoFilterModal.svelte generated by Svelte v3.38.2 */

const file$8 = "../../components/time_region_value/src/node_modules/components/GeoFilterModal.svelte";

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i].id;
	child_ctx[9] = list[i].name;
	child_ctx[10] = list[i].selected;
	return child_ctx;
}

// (49:6) {:else}
function create_else_block$3(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: { glyph: Square, size: 20 },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(icon.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(icon.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p: noop$1,
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(icon, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$3.name,
		type: "else",
		source: "(49:6) {:else}",
		ctx
	});

	return block;
}

// (44:6) {#if selected}
function create_if_block$7(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: { glyph: CheckSquare, size: 20 },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(icon.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(icon.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p: noop$1,
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(icon, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$7.name,
		type: "if",
		source: "(44:6) {#if selected}",
		ctx
	});

	return block;
}

// (36:3) {#each $_nutsRegions as {id, name, selected}}
function create_each_block$3(ctx) {
	let li;
	let span0;
	let current_block_type_index;
	let if_block;
	let t0;
	let span1;
	let t1_value = /*name*/ ctx[9] + "";
	let t1;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block$7, create_else_block$3];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*selected*/ ctx[10]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			li = element("li");
			span0 = element("span");
			if_block.c();
			t0 = space();
			span1 = element("span");
			t1 = text(t1_value);
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", { class: true });
			var li_nodes = children(li);
			span0 = claim_element(li_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			if_block.l(span0_nodes);
			span0_nodes.forEach(detach_dev);
			t0 = claim_space(li_nodes);
			span1 = claim_element(li_nodes, "SPAN", {});
			var span1_nodes = children(span1);
			t1 = claim_text(span1_nodes, t1_value);
			span1_nodes.forEach(detach_dev);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span0, "class", "checker svelte-hphy5v");
			add_location(span0, file$8, 42, 5, 930);
			add_location(span1, file$8, 55, 5, 1151);
			attr_dev(li, "class", "clickable svelte-hphy5v");
			add_location(li, file$8, 36, 4, 788);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, span0);
			if_blocks[current_block_type_index].m(span0, null);
			append_dev(li, t0);
			append_dev(li, span1);
			append_dev(span1, t1);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(
						li,
						"click",
						function () {
							if (is_function(/*onClick*/ ctx[3](/*id*/ ctx[8]))) /*onClick*/ ctx[3](/*id*/ ctx[8]).apply(this, arguments);
						},
						false,
						false,
						false
					),
					listen_dev(
						li,
						"mouseenter",
						function () {
							if (is_function(/*onMouseEnter*/ ctx[1](/*id*/ ctx[8]))) /*onMouseEnter*/ ctx[1](/*id*/ ctx[8]).apply(this, arguments);
						},
						false,
						false,
						false
					),
					listen_dev(
						li,
						"mouseleave",
						function () {
							if (is_function(/*onMouseLeave*/ ctx[2](/*id*/ ctx[8]))) /*onMouseLeave*/ ctx[2](/*id*/ ctx[8]).apply(this, arguments);
						},
						false,
						false,
						false
					)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(span0, null);
			}

			if ((!current || dirty & /*$_nutsRegions*/ 1) && t1_value !== (t1_value = /*name*/ ctx[9] + "")) set_data_dev(t1, t1_value);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			if_blocks[current_block_type_index].d();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$3.name,
		type: "each",
		source: "(36:3) {#each $_nutsRegions as {id, name, selected}}",
		ctx
	});

	return block;
}

function create_fragment$8(ctx) {
	let div1;
	let div0;
	let h2;
	let t0;
	let t1;
	let ul;
	let t2;
	let li0;
	let span0;
	let t3;
	let t4;
	let span1;
	let icon0;
	let t5;
	let li1;
	let span2;
	let t6;
	let t7;
	let span3;
	let icon1;
	let current;
	let mounted;
	let dispose;
	let each_value = /*$_nutsRegions*/ ctx[0];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	icon0 = new Icon({
			props: {
				glyph: CheckSquare,
				size: 20,
				stroke: "palegreen"
			},
			$$inline: true
		});

	icon1 = new Icon({
			props: { glyph: Square, size: 20, stroke: "red" },
			$$inline: true
		});

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			h2 = element("h2");
			t0 = text("NUTS1 regions");
			t1 = space();
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t2 = space();
			li0 = element("li");
			span0 = element("span");
			t3 = text("Select all");
			t4 = space();
			span1 = element("span");
			create_component(icon0.$$.fragment);
			t5 = space();
			li1 = element("li");
			span2 = element("span");
			t6 = text("Deselect all");
			t7 = space();
			span3 = element("span");
			create_component(icon1.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			h2 = claim_element(div0_nodes, "H2", {});
			var h2_nodes = children(h2);
			t0 = claim_text(h2_nodes, "NUTS1 regions");
			h2_nodes.forEach(detach_dev);
			t1 = claim_space(div0_nodes);
			ul = claim_element(div0_nodes, "UL", { class: true });
			var ul_nodes = children(ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(ul_nodes);
			}

			t2 = claim_space(ul_nodes);
			li0 = claim_element(ul_nodes, "LI", { class: true });
			var li0_nodes = children(li0);
			span0 = claim_element(li0_nodes, "SPAN", {});
			var span0_nodes = children(span0);
			t3 = claim_text(span0_nodes, "Select all");
			span0_nodes.forEach(detach_dev);
			t4 = claim_space(li0_nodes);
			span1 = claim_element(li0_nodes, "SPAN", { class: true });
			var span1_nodes = children(span1);
			claim_component(icon0.$$.fragment, span1_nodes);
			span1_nodes.forEach(detach_dev);
			li0_nodes.forEach(detach_dev);
			t5 = claim_space(ul_nodes);
			li1 = claim_element(ul_nodes, "LI", { class: true });
			var li1_nodes = children(li1);
			span2 = claim_element(li1_nodes, "SPAN", {});
			var span2_nodes = children(span2);
			t6 = claim_text(span2_nodes, "Deselect all");
			span2_nodes.forEach(detach_dev);
			t7 = claim_space(li1_nodes);
			span3 = claim_element(li1_nodes, "SPAN", { class: true });
			var span3_nodes = children(span3);
			claim_component(icon1.$$.fragment, span3_nodes);
			span3_nodes.forEach(detach_dev);
			li1_nodes.forEach(detach_dev);
			ul_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(h2, file$8, 33, 2, 705);
			add_location(span0, file$8, 63, 4, 1279);
			attr_dev(span1, "class", "checker svelte-hphy5v");
			add_location(span1, file$8, 64, 4, 1307);
			attr_dev(li0, "class", "end sep clickable svelte-hphy5v");
			add_location(li0, file$8, 59, 3, 1196);
			add_location(span2, file$8, 76, 4, 1521);
			attr_dev(span3, "class", "checker svelte-hphy5v");
			add_location(span3, file$8, 77, 4, 1551);
			attr_dev(li1, "class", "end clickable svelte-hphy5v");
			add_location(li1, file$8, 72, 3, 1440);
			attr_dev(ul, "class", "svelte-hphy5v");
			add_location(ul, file$8, 34, 2, 730);
			attr_dev(div0, "class", "panel svelte-hphy5v");
			add_location(div0, file$8, 29, 1, 645);
			attr_dev(div1, "class", "clickable modal svelte-hphy5v");
			add_location(div1, file$8, 25, 0, 602);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);
			append_dev(div0, h2);
			append_dev(h2, t0);
			append_dev(div0, t1);
			append_dev(div0, ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			append_dev(ul, t2);
			append_dev(ul, li0);
			append_dev(li0, span0);
			append_dev(span0, t3);
			append_dev(li0, t4);
			append_dev(li0, span1);
			mount_component(icon0, span1, null);
			append_dev(ul, t5);
			append_dev(ul, li1);
			append_dev(li1, span2);
			append_dev(span2, t6);
			append_dev(li1, t7);
			append_dev(li1, span3);
			mount_component(icon1, span3, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(li0, "click", /*click_handler_1*/ ctx[5], false, false, false),
					listen_dev(li1, "click", /*click_handler_2*/ ctx[6], false, false, false),
					listen_dev(div0, "click", stop_propagation(noop), false, false, true),
					listen_dev(div1, "click", /*click_handler*/ ctx[4], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*onClick, $_nutsRegions, onMouseEnter, onMouseLeave, CheckSquare, Square*/ 15) {
				each_value = /*$_nutsRegions*/ ctx[0];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$3(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$3(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(ul, t2);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(icon0.$$.fragment, local);
			transition_in(icon1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(icon0.$$.fragment, local);
			transition_out(icon1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			destroy_each(each_blocks, detaching);
			destroy_component(icon0);
			destroy_component(icon1);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$8.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$8($$self, $$props, $$invalidate) {
	let $_preselectedNUTS1Id;
	let $_nutsRegions;
	validate_store(_preselectedNUTS1Id, "_preselectedNUTS1Id");
	component_subscribe($$self, _preselectedNUTS1Id, $$value => $$invalidate(7, $_preselectedNUTS1Id = $$value));
	validate_store(_nutsRegions, "_nutsRegions");
	component_subscribe($$self, _nutsRegions, $$value => $$invalidate(0, $_nutsRegions = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("GeoFilterModal", slots, []);

	const onMouseEnter = id => () => {
		set_store_value(_preselectedNUTS1Id, $_preselectedNUTS1Id = id, $_preselectedNUTS1Id);
	};

	const onMouseLeave = () => () => {
		set_store_value(_preselectedNUTS1Id, $_preselectedNUTS1Id = null, $_preselectedNUTS1Id);
	};

	const onClick = id => () => {
		toggleRegionNUTS1(id);
	};

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<GeoFilterModal> was created with unknown prop '${key}'`);
	});

	function click_handler(event) {
		bubble($$self, event);
	}

	const click_handler_1 = () => selectAllRegions();
	const click_handler_2 = () => deselectAllRegions();

	$$self.$capture_state = () => ({
		Icon,
		Square,
		CheckSquare,
		noop,
		_nutsRegions,
		_preselectedNUTS1Id,
		deselectAllRegions,
		selectAllRegions,
		toggleRegionNUTS1,
		onMouseEnter,
		onMouseLeave,
		onClick,
		$_preselectedNUTS1Id,
		$_nutsRegions
	});

	return [
		$_nutsRegions,
		onMouseEnter,
		onMouseLeave,
		onClick,
		click_handler,
		click_handler_1,
		click_handler_2
	];
}

class GeoFilterModal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "GeoFilterModal",
			options,
			id: create_fragment$8.name
		});
	}
}

/* ../../components/time_region_value/src/node_modules/components/Header.svelte generated by Svelte v3.38.2 */
const file$7 = "../../components/time_region_value/src/node_modules/components/Header.svelte";

// (19:1) {#if !$_isSmallScreen}
function create_if_block$6(ctx) {
	let div;
	let icon;
	let current;
	let mounted;
	let dispose;

	icon = new Icon({
			props: { glyph: Info, size: 30, strokeWidth: 1.5 },
			$$inline: true
		});

	const block = {
		c: function create() {
			div = element("div");
			create_component(icon.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(icon.$$.fragment, div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "svelte-3sgw11");
			add_location(div, file$7, 19, 2, 389);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(icon, div, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(div, "click", /*click_handler*/ ctx[3], false, false, false);
				mounted = true;
			}
		},
		p: noop$1,
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(icon);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$6.name,
		type: "if",
		source: "(19:1) {#if !$_isSmallScreen}",
		ctx
	});

	return block;
}

function create_fragment$7(ctx) {
	let header;
	let div;
	let h1;
	let t0;
	let t1;
	let p;
	let t2;
	let t3;
	let current;
	let if_block = !/*$_isSmallScreen*/ ctx[2] && create_if_block$6(ctx);

	const block = {
		c: function create() {
			header = element("header");
			div = element("div");
			h1 = element("h1");
			t0 = text(/*title*/ ctx[1]);
			t1 = space();
			p = element("p");
			t2 = text(/*subtitle*/ ctx[0]);
			t3 = space();
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			header = claim_element(nodes, "HEADER", { class: true });
			var header_nodes = children(header);
			div = claim_element(header_nodes, "DIV", { class: true });
			var div_nodes = children(div);
			h1 = claim_element(div_nodes, "H1", { class: true });
			var h1_nodes = children(h1);
			t0 = claim_text(h1_nodes, /*title*/ ctx[1]);
			h1_nodes.forEach(detach_dev);
			t1 = claim_space(div_nodes);
			p = claim_element(div_nodes, "P", { class: true });
			var p_nodes = children(p);
			t2 = claim_text(p_nodes, /*subtitle*/ ctx[0]);
			p_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			t3 = claim_space(header_nodes);
			if (if_block) if_block.l(header_nodes);
			header_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h1, "class", "svelte-3sgw11");
			add_location(h1, file$7, 13, 2, 288);
			attr_dev(p, "class", "svelte-3sgw11");
			add_location(p, file$7, 14, 2, 307);
			attr_dev(div, "class", "svelte-3sgw11");
			add_location(div, file$7, 12, 1, 280);
			attr_dev(header, "class", "svelte-3sgw11");
			add_location(header, file$7, 11, 0, 270);
		},
		m: function mount(target, anchor) {
			insert_dev(target, header, anchor);
			append_dev(header, div);
			append_dev(div, h1);
			append_dev(h1, t0);
			append_dev(div, t1);
			append_dev(div, p);
			append_dev(p, t2);
			append_dev(header, t3);
			if (if_block) if_block.m(header, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (!current || dirty & /*title*/ 2) set_data_dev(t0, /*title*/ ctx[1]);
			if (!current || dirty & /*subtitle*/ 1) set_data_dev(t2, /*subtitle*/ ctx[0]);

			if (!/*$_isSmallScreen*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*$_isSmallScreen*/ 4) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$6(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(header, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(header);
			if (if_block) if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$7.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$7($$self, $$props, $$invalidate) {
	let $_isSmallScreen;
	validate_store(_isSmallScreen, "_isSmallScreen");
	component_subscribe($$self, _isSmallScreen, $$value => $$invalidate(2, $_isSmallScreen = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Header", slots, []);
	let { subtitle = null } = $$props;
	let { title = null } = $$props;
	const writable_props = ["subtitle", "title"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Header> was created with unknown prop '${key}'`);
	});

	function click_handler(event) {
		bubble($$self, event);
	}

	$$self.$$set = $$props => {
		if ("subtitle" in $$props) $$invalidate(0, subtitle = $$props.subtitle);
		if ("title" in $$props) $$invalidate(1, title = $$props.title);
	};

	$$self.$capture_state = () => ({
		Icon,
		Info,
		_,
		_isSmallScreen,
		subtitle,
		title,
		$_isSmallScreen
	});

	$$self.$inject_state = $$props => {
		if ("subtitle" in $$props) $$invalidate(0, subtitle = $$props.subtitle);
		if ("title" in $$props) $$invalidate(1, title = $$props.title);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [subtitle, title, $_isSmallScreen, click_handler];
}

class Header extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$7, create_fragment$7, safe_not_equal, { subtitle: 0, title: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Header",
			options,
			id: create_fragment$7.name
		});
	}

	get subtitle() {
		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set subtitle(value) {
		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get title() {
		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../components/time_region_value/src/node_modules/components/Info/PolymorphicString.svelte generated by Svelte v3.38.2 */
const file$6 = "../../components/time_region_value/src/node_modules/components/Info/PolymorphicString.svelte";

function get_each_context_2$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[6] = list[i];
	return child_ctx;
}

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i][0];
	child_ctx[3] = list[i][1];
	return child_ctx;
}

function get_each_context_1$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[6] = list[i];
	return child_ctx;
}

// (34:1) {:else}
function create_else_block_1$1(ctx) {
	let p;
	let b;
	let t0;
	let t1;
	let t2;
	let t3;

	const block = {
		c: function create() {
			p = element("p");
			b = element("b");
			t0 = text(/*title*/ ctx[1]);
			t1 = text(":");
			t2 = space();
			t3 = text(/*item*/ ctx[0]);
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			b = claim_element(p_nodes, "B", { class: true });
			var b_nodes = children(b);
			t0 = claim_text(b_nodes, /*title*/ ctx[1]);
			t1 = claim_text(b_nodes, ":");
			b_nodes.forEach(detach_dev);
			t2 = claim_space(p_nodes);
			t3 = claim_text(p_nodes, /*item*/ ctx[0]);
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(b, "class", "svelte-1o74auc");
			add_location(b, file$6, 34, 5, 639);
			add_location(p, file$6, 34, 2, 636);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, b);
			append_dev(b, t0);
			append_dev(b, t1);
			append_dev(p, t2);
			append_dev(p, t3);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*title*/ 2) set_data_dev(t0, /*title*/ ctx[1]);
			if (dirty & /*item*/ 1) set_data_dev(t3, /*item*/ ctx[0]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_1$1.name,
		type: "else",
		source: "(34:1) {:else}",
		ctx
	});

	return block;
}

// (27:25) 
function create_if_block_2$2(ctx) {
	let p;
	let b;
	let t0;
	let t1;
	let t2;
	let ul;
	let each_value_2 = /*item*/ ctx[0];
	validate_each_argument(each_value_2);
	let each_blocks = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks[i] = create_each_block_2$1(get_each_context_2$1(ctx, each_value_2, i));
	}

	const block = {
		c: function create() {
			p = element("p");
			b = element("b");
			t0 = text(/*title*/ ctx[1]);
			t1 = text(":");
			t2 = space();
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			b = claim_element(p_nodes, "B", { class: true });
			var b_nodes = children(b);
			t0 = claim_text(b_nodes, /*title*/ ctx[1]);
			t1 = claim_text(b_nodes, ":");
			b_nodes.forEach(detach_dev);
			p_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			ul = claim_element(nodes, "UL", { class: true });
			var ul_nodes = children(ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(ul_nodes);
			}

			ul_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(b, "class", "svelte-1o74auc");
			add_location(b, file$6, 27, 5, 518);
			add_location(p, file$6, 27, 2, 515);
			attr_dev(ul, "class", "svelte-1o74auc");
			add_location(ul, file$6, 28, 2, 540);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, b);
			append_dev(b, t0);
			append_dev(b, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, ul, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*title*/ 2) set_data_dev(t0, /*title*/ ctx[1]);

			if (dirty & /*item*/ 1) {
				each_value_2 = /*item*/ ctx[0];
				validate_each_argument(each_value_2);
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2$1(ctx, each_value_2, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_2$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(ul, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_2.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(ul);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$2.name,
		type: "if",
		source: "(27:25) ",
		ctx
	});

	return block;
}

// (10:1) {#if isObject(item)}
function create_if_block$5(ctx) {
	let p;
	let b;
	let t0;
	let t1;
	let t2;
	let ul;
	let each_value = pairs(/*item*/ ctx[0]);
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			p = element("p");
			b = element("b");
			t0 = text(/*title*/ ctx[1]);
			t1 = text(":");
			t2 = space();
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			b = claim_element(p_nodes, "B", { class: true });
			var b_nodes = children(b);
			t0 = claim_text(b_nodes, /*title*/ ctx[1]);
			t1 = claim_text(b_nodes, ":");
			b_nodes.forEach(detach_dev);
			p_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			ul = claim_element(nodes, "UL", { class: true });
			var ul_nodes = children(ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(ul_nodes);
			}

			ul_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(b, "class", "svelte-1o74auc");
			add_location(b, file$6, 10, 5, 185);
			add_location(p, file$6, 10, 2, 182);
			attr_dev(ul, "class", "svelte-1o74auc");
			add_location(ul, file$6, 11, 2, 207);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, b);
			append_dev(b, t0);
			append_dev(b, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, ul, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*title*/ 2) set_data_dev(t0, /*title*/ ctx[1]);

			if (dirty & /*pairs, item, isArray*/ 1) {
				each_value = pairs(/*item*/ ctx[0]);
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(ul, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(ul);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$5.name,
		type: "if",
		source: "(10:1) {#if isObject(item)}",
		ctx
	});

	return block;
}

// (30:3) {#each item as string}
function create_each_block_2$1(ctx) {
	let li;
	let span;
	let t_value = /*string*/ ctx[6] + "";
	let t;

	const block = {
		c: function create() {
			li = element("li");
			span = element("span");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", {});
			var li_nodes = children(li);
			span = claim_element(li_nodes, "SPAN", {});
			var span_nodes = children(span);
			t = claim_text(span_nodes, t_value);
			span_nodes.forEach(detach_dev);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$6, 30, 8, 579);
			add_location(li, file$6, 30, 4, 575);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, span);
			append_dev(span, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*item*/ 1 && t_value !== (t_value = /*string*/ ctx[6] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_2$1.name,
		type: "each",
		source: "(30:3) {#each item as string}",
		ctx
	});

	return block;
}

// (22:4) {:else}
function create_else_block$2(ctx) {
	let li;
	let span;
	let t_value = /*value*/ ctx[3] + "";
	let t;

	const block = {
		c: function create() {
			li = element("li");
			span = element("span");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", {});
			var li_nodes = children(li);
			span = claim_element(li_nodes, "SPAN", {});
			var span_nodes = children(span);
			t = claim_text(span_nodes, t_value);
			span_nodes.forEach(detach_dev);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$6, 22, 9, 432);
			add_location(li, file$6, 22, 5, 428);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, span);
			append_dev(span, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*item*/ 1 && t_value !== (t_value = /*value*/ ctx[3] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$2.name,
		type: "else",
		source: "(22:4) {:else}",
		ctx
	});

	return block;
}

// (14:4) {#if isArray(value)}
function create_if_block_1$3(ctx) {
	let li;
	let t0_value = /*key*/ ctx[2] + "";
	let t0;
	let t1;
	let ul;
	let t2;
	let each_value_1 = /*value*/ ctx[3];
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
	}

	const block = {
		c: function create() {
			li = element("li");
			t0 = text(t0_value);
			t1 = text(":\n\t\t\t\t\t\t");
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t2 = space();
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", {});
			var li_nodes = children(li);
			t0 = claim_text(li_nodes, t0_value);
			t1 = claim_text(li_nodes, ":\n\t\t\t\t\t\t");
			ul = claim_element(li_nodes, "UL", { class: true });
			var ul_nodes = children(ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(ul_nodes);
			}

			ul_nodes.forEach(detach_dev);
			t2 = claim_space(li_nodes);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(ul, "class", "svelte-1o74auc");
			add_location(ul, file$6, 15, 6, 298);
			add_location(li, file$6, 14, 5, 281);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, t0);
			append_dev(li, t1);
			append_dev(li, ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			append_dev(li, t2);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*item*/ 1 && t0_value !== (t0_value = /*key*/ ctx[2] + "")) set_data_dev(t0, t0_value);

			if (dirty & /*pairs, item*/ 1) {
				each_value_1 = /*value*/ ctx[3];
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(ul, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$3.name,
		type: "if",
		source: "(14:4) {#if isArray(value)}",
		ctx
	});

	return block;
}

// (17:7) {#each value as string}
function create_each_block_1$1(ctx) {
	let li;
	let span;
	let t_value = /*string*/ ctx[6] + "";
	let t;

	const block = {
		c: function create() {
			li = element("li");
			span = element("span");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", {});
			var li_nodes = children(li);
			span = claim_element(li_nodes, "SPAN", {});
			var span_nodes = children(span);
			t = claim_text(span_nodes, t_value);
			span_nodes.forEach(detach_dev);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$6, 17, 12, 346);
			add_location(li, file$6, 17, 8, 342);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, span);
			append_dev(span, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*item*/ 1 && t_value !== (t_value = /*string*/ ctx[6] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1$1.name,
		type: "each",
		source: "(17:7) {#each value as string}",
		ctx
	});

	return block;
}

// (13:3) {#each pairs(item) as [key, value]}
function create_each_block$2(ctx) {
	let show_if;
	let if_block_anchor;

	function select_block_type_1(ctx, dirty) {
		if (show_if == null || dirty & /*item*/ 1) show_if = !!isArray(/*value*/ ctx[3]);
		if (show_if) return create_if_block_1$3;
		return create_else_block$2;
	}

	let current_block_type = select_block_type_1(ctx, -1);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type_1(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		d: function destroy(detaching) {
			if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$2.name,
		type: "each",
		source: "(13:3) {#each pairs(item) as [key, value]}",
		ctx
	});

	return block;
}

function create_fragment$6(ctx) {
	let div;
	let show_if;
	let show_if_1;

	function select_block_type(ctx, dirty) {
		if (show_if == null || dirty & /*item*/ 1) show_if = !!isObject(/*item*/ ctx[0]);
		if (show_if) return create_if_block$5;
		if (show_if_1 == null || dirty & /*item*/ 1) show_if_1 = !!isArray(/*item*/ ctx[0]);
		if (show_if_1) return create_if_block_2$2;
		return create_else_block_1$1;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			div = element("div");
			if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", {});
			var div_nodes = children(div);
			if_block.l(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(div, file$6, 8, 0, 152);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if_block.m(div, null);
		},
		p: function update(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		i: noop$1,
		o: noop$1,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$6.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$6($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("PolymorphicString", slots, []);
	let { item = null } = $$props;
	let { title = null } = $$props;
	const writable_props = ["item", "title"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<PolymorphicString> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("item" in $$props) $$invalidate(0, item = $$props.item);
		if ("title" in $$props) $$invalidate(1, title = $$props.title);
	};

	$$self.$capture_state = () => ({ pairs, isArray, isObject, item, title });

	$$self.$inject_state = $$props => {
		if ("item" in $$props) $$invalidate(0, item = $$props.item);
		if ("title" in $$props) $$invalidate(1, title = $$props.title);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [item, title];
}

class PolymorphicString extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$6, create_fragment$6, safe_not_equal, { item: 0, title: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "PolymorphicString",
			options,
			id: create_fragment$6.name
		});
	}

	get item() {
		throw new Error("<PolymorphicString>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set item(value) {
		throw new Error("<PolymorphicString>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get title() {
		throw new Error("<PolymorphicString>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<PolymorphicString>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../components/time_region_value/src/node_modules/components/Info/PolymorphicURL.svelte generated by Svelte v3.38.2 */
const file$5 = "../../components/time_region_value/src/node_modules/components/Info/PolymorphicURL.svelte";

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i];
	child_ctx[9] = i;
	return child_ctx;
}

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[3] = list[i][0];
	child_ctx[4] = list[i][1];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i];
	child_ctx[9] = i;
	return child_ctx;
}

// (61:1) {:else}
function create_else_block_1(ctx) {
	let p;
	let b;
	let t0;
	let t1;
	let t2;
	let link;
	let current;

	link = new Link({
			props: {
				href: /*item*/ ctx[0],
				text: /*text*/ ctx[1]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			p = element("p");
			b = element("b");
			t0 = text(/*title*/ ctx[2]);
			t1 = text(":");
			t2 = space();
			create_component(link.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			b = claim_element(p_nodes, "B", { class: true });
			var b_nodes = children(b);
			t0 = claim_text(b_nodes, /*title*/ ctx[2]);
			t1 = claim_text(b_nodes, ":");
			b_nodes.forEach(detach_dev);
			t2 = claim_space(p_nodes);
			claim_component(link.$$.fragment, p_nodes);
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(b, "class", "svelte-1o74auc");
			add_location(b, file$5, 62, 3, 995);
			add_location(p, file$5, 61, 2, 988);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, b);
			append_dev(b, t0);
			append_dev(b, t1);
			append_dev(p, t2);
			mount_component(link, p, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (!current || dirty & /*title*/ 4) set_data_dev(t0, /*title*/ ctx[2]);
			const link_changes = {};
			if (dirty & /*item*/ 1) link_changes.href = /*item*/ ctx[0];
			if (dirty & /*text*/ 2) link_changes.text = /*text*/ ctx[1];
			link.$set(link_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(link.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(link.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
			destroy_component(link);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_1.name,
		type: "else",
		source: "(61:1) {:else}",
		ctx
	});

	return block;
}

// (46:25) 
function create_if_block_2$1(ctx) {
	let p;
	let b;
	let t0;
	let t1;
	let t2;
	let ul;
	let current;
	let each_value_2 = /*item*/ ctx[0];
	validate_each_argument(each_value_2);
	let each_blocks = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			p = element("p");
			b = element("b");
			t0 = text(/*title*/ ctx[2]);
			t1 = text(":");
			t2 = space();
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			b = claim_element(p_nodes, "B", { class: true });
			var b_nodes = children(b);
			t0 = claim_text(b_nodes, /*title*/ ctx[2]);
			t1 = claim_text(b_nodes, ":");
			b_nodes.forEach(detach_dev);
			p_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			ul = claim_element(nodes, "UL", { class: true });
			var ul_nodes = children(ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(ul_nodes);
			}

			ul_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(b, "class", "svelte-1o74auc");
			add_location(b, file$5, 47, 3, 792);
			add_location(p, file$5, 46, 2, 785);
			attr_dev(ul, "class", "svelte-1o74auc");
			add_location(ul, file$5, 49, 2, 817);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, b);
			append_dev(b, t0);
			append_dev(b, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, ul, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (!current || dirty & /*title*/ 4) set_data_dev(t0, /*title*/ ctx[2]);

			if (dirty & /*item*/ 1) {
				each_value_2 = /*item*/ ctx[0];
				validate_each_argument(each_value_2);
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2(ctx, each_value_2, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_2(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(ul, null);
					}
				}

				group_outros();

				for (i = each_value_2.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value_2.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(ul);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$1.name,
		type: "if",
		source: "(46:25) ",
		ctx
	});

	return block;
}

// (12:1) {#if isObject(item)}
function create_if_block$4(ctx) {
	let p;
	let b;
	let t0;
	let t1;
	let t2;
	let ul;
	let current;
	let each_value = pairs(/*item*/ ctx[0]);
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			p = element("p");
			b = element("b");
			t0 = text(/*title*/ ctx[2]);
			t1 = text(":");
			t2 = space();
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			b = claim_element(p_nodes, "B", { class: true });
			var b_nodes = children(b);
			t0 = claim_text(b_nodes, /*title*/ ctx[2]);
			t1 = claim_text(b_nodes, ":");
			b_nodes.forEach(detach_dev);
			p_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			ul = claim_element(nodes, "UL", { class: true });
			var ul_nodes = children(ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(ul_nodes);
			}

			ul_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(b, "class", "svelte-1o74auc");
			add_location(b, file$5, 13, 3, 263);
			add_location(p, file$5, 12, 2, 256);
			attr_dev(ul, "class", "svelte-1o74auc");
			add_location(ul, file$5, 15, 2, 288);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, b);
			append_dev(b, t0);
			append_dev(b, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, ul, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (!current || dirty & /*title*/ 4) set_data_dev(t0, /*title*/ ctx[2]);

			if (dirty & /*pairs, item, isArray*/ 1) {
				each_value = pairs(/*item*/ ctx[0]);
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(ul, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(ul);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$4.name,
		type: "if",
		source: "(12:1) {#if isObject(item)}",
		ctx
	});

	return block;
}

// (51:3) {#each item as href, index}
function create_each_block_2(ctx) {
	let li;
	let span;
	let link;
	let t;
	let current;

	link = new Link({
			props: {
				href: /*href*/ ctx[7],
				text: "Link " + (/*index*/ ctx[9] + 1) + ":"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			li = element("li");
			span = element("span");
			create_component(link.$$.fragment);
			t = space();
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", {});
			var li_nodes = children(li);
			span = claim_element(li_nodes, "SPAN", {});
			var span_nodes = children(span);
			claim_component(link.$$.fragment, span_nodes);
			span_nodes.forEach(detach_dev);
			t = claim_space(li_nodes);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$5, 52, 5, 867);
			add_location(li, file$5, 51, 4, 857);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, span);
			mount_component(link, span, null);
			append_dev(li, t);
			current = true;
		},
		p: function update(ctx, dirty) {
			const link_changes = {};
			if (dirty & /*item*/ 1) link_changes.href = /*href*/ ctx[7];
			link.$set(link_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(link.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(link.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			destroy_component(link);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_2.name,
		type: "each",
		source: "(51:3) {#each item as href, index}",
		ctx
	});

	return block;
}

// (33:4) {:else}
function create_else_block$1(ctx) {
	let li;
	let span;
	let link;
	let t;
	let current;

	link = new Link({
			props: {
				href: /*value*/ ctx[4],
				text: "" + (/*key*/ ctx[3] + ":")
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			li = element("li");
			span = element("span");
			create_component(link.$$.fragment);
			t = space();
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", {});
			var li_nodes = children(li);
			span = claim_element(li_nodes, "SPAN", {});
			var span_nodes = children(span);
			claim_component(link.$$.fragment, span_nodes);
			span_nodes.forEach(detach_dev);
			t = claim_space(li_nodes);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$5, 34, 6, 629);
			add_location(li, file$5, 33, 5, 618);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, span);
			mount_component(link, span, null);
			append_dev(li, t);
			current = true;
		},
		p: function update(ctx, dirty) {
			const link_changes = {};
			if (dirty & /*item*/ 1) link_changes.href = /*value*/ ctx[4];
			if (dirty & /*item*/ 1) link_changes.text = "" + (/*key*/ ctx[3] + ":");
			link.$set(link_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(link.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(link.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			destroy_component(link);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$1.name,
		type: "else",
		source: "(33:4) {:else}",
		ctx
	});

	return block;
}

// (18:4) {#if isArray(value)}
function create_if_block_1$2(ctx) {
	let li;
	let t0_value = /*key*/ ctx[3] + "";
	let t0;
	let t1;
	let ul;
	let t2;
	let current;
	let each_value_1 = /*value*/ ctx[4];
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			li = element("li");
			t0 = text(t0_value);
			t1 = text(":\n\t\t\t\t\t\t");
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t2 = space();
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", {});
			var li_nodes = children(li);
			t0 = claim_text(li_nodes, t0_value);
			t1 = claim_text(li_nodes, ":\n\t\t\t\t\t\t");
			ul = claim_element(li_nodes, "UL", { class: true });
			var ul_nodes = children(ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(ul_nodes);
			}

			ul_nodes.forEach(detach_dev);
			t2 = claim_space(li_nodes);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(ul, "class", "svelte-1o74auc");
			add_location(ul, file$5, 19, 6, 379);
			add_location(li, file$5, 18, 5, 362);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, t0);
			append_dev(li, t1);
			append_dev(li, ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			append_dev(li, t2);
			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty & /*item*/ 1) && t0_value !== (t0_value = /*key*/ ctx[3] + "")) set_data_dev(t0, t0_value);

			if (dirty & /*pairs, item*/ 1) {
				each_value_1 = /*value*/ ctx[4];
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(ul, null);
					}
				}

				group_outros();

				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$2.name,
		type: "if",
		source: "(18:4) {#if isArray(value)}",
		ctx
	});

	return block;
}

// (21:7) {#each value as href, index}
function create_each_block_1(ctx) {
	let li;
	let span;
	let link;
	let t;
	let current;

	link = new Link({
			props: {
				href: /*href*/ ctx[7],
				text: "Link " + (/*index*/ ctx[9] + 1) + ":"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			li = element("li");
			span = element("span");
			create_component(link.$$.fragment);
			t = space();
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", {});
			var li_nodes = children(li);
			span = claim_element(li_nodes, "SPAN", {});
			var span_nodes = children(span);
			claim_component(link.$$.fragment, span_nodes);
			span_nodes.forEach(detach_dev);
			t = claim_space(li_nodes);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$5, 22, 9, 442);
			add_location(li, file$5, 21, 8, 428);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, span);
			mount_component(link, span, null);
			append_dev(li, t);
			current = true;
		},
		p: function update(ctx, dirty) {
			const link_changes = {};
			if (dirty & /*item*/ 1) link_changes.href = /*href*/ ctx[7];
			link.$set(link_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(link.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(link.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			destroy_component(link);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(21:7) {#each value as href, index}",
		ctx
	});

	return block;
}

// (17:3) {#each pairs(item) as [key, value]}
function create_each_block$1(ctx) {
	let show_if;
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_1$2, create_else_block$1];
	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (dirty & /*item*/ 1) show_if = !!isArray(/*value*/ ctx[4]);
		if (show_if) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_1(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_1(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(17:3) {#each pairs(item) as [key, value]}",
		ctx
	});

	return block;
}

function create_fragment$5(ctx) {
	let div;
	let show_if;
	let show_if_1;
	let current_block_type_index;
	let if_block;
	let current;
	const if_block_creators = [create_if_block$4, create_if_block_2$1, create_else_block_1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (dirty & /*item*/ 1) show_if = !!isObject(/*item*/ ctx[0]);
		if (show_if) return 0;
		if (dirty & /*item*/ 1) show_if_1 = !!isArray(/*item*/ ctx[0]);
		if (show_if_1) return 1;
		return 2;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			div = element("div");
			if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", {});
			var div_nodes = children(div);
			if_block.l(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(div, file$5, 10, 0, 226);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if_blocks[current_block_type_index].m(div, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(div, null);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if_blocks[current_block_type_index].d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$5.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$5($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("PolymorphicURL", slots, []);
	let { item = null } = $$props;
	let { text = null } = $$props;
	let { title = null } = $$props;
	const writable_props = ["item", "text", "title"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<PolymorphicURL> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("item" in $$props) $$invalidate(0, item = $$props.item);
		if ("text" in $$props) $$invalidate(1, text = $$props.text);
		if ("title" in $$props) $$invalidate(2, title = $$props.title);
	};

	$$self.$capture_state = () => ({
		pairs,
		isArray,
		isObject,
		Link,
		item,
		text,
		title
	});

	$$self.$inject_state = $$props => {
		if ("item" in $$props) $$invalidate(0, item = $$props.item);
		if ("text" in $$props) $$invalidate(1, text = $$props.text);
		if ("title" in $$props) $$invalidate(2, title = $$props.title);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [item, text, title];
}

class PolymorphicURL extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$5, create_fragment$5, safe_not_equal, { item: 0, text: 1, title: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "PolymorphicURL",
			options,
			id: create_fragment$5.name
		});
	}

	get item() {
		throw new Error("<PolymorphicURL>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set item(value) {
		throw new Error("<PolymorphicURL>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get text() {
		throw new Error("<PolymorphicURL>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set text(value) {
		throw new Error("<PolymorphicURL>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get title() {
		throw new Error("<PolymorphicURL>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<PolymorphicURL>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../components/time_region_value/src/node_modules/components/Info/InfoView.svelte generated by Svelte v3.38.2 */
const file$4 = "../../components/time_region_value/src/node_modules/components/Info/InfoView.svelte";

// (38:1) {#if description}
function create_if_block_14(ctx) {
	let p;
	let t;

	const block = {
		c: function create() {
			p = element("p");
			t = text(/*description*/ ctx[3]);
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", { class: true });
			var p_nodes = children(p);
			t = claim_text(p_nodes, /*description*/ ctx[3]);
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(p, "class", "longDesc svelte-1b2hdj4");
			add_location(p, file$4, 38, 2, 1109);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*description*/ 8) set_data_dev(t, /*description*/ ctx[3]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_14.name,
		type: "if",
		source: "(38:1) {#if description}",
		ctx
	});

	return block;
}

// (42:1) {#if date}
function create_if_block_13(ctx) {
	let p;
	let b;
	let t0;
	let t1;
	let t2;

	const block = {
		c: function create() {
			p = element("p");
			b = element("b");
			t0 = text("Data downloaded on date:");
			t1 = space();
			t2 = text(/*date*/ ctx[14]);
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			b = claim_element(p_nodes, "B", { class: true });
			var b_nodes = children(b);
			t0 = claim_text(b_nodes, "Data downloaded on date:");
			b_nodes.forEach(detach_dev);
			t1 = claim_space(p_nodes);
			t2 = claim_text(p_nodes, /*date*/ ctx[14]);
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(b, "class", "svelte-1b2hdj4");
			add_location(b, file$4, 42, 5, 1172);
			add_location(p, file$4, 42, 2, 1169);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, b);
			append_dev(b, t0);
			append_dev(p, t1);
			append_dev(p, t2);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*date*/ 16384) set_data_dev(t2, /*date*/ ctx[14]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_13.name,
		type: "if",
		source: "(42:1) {#if date}",
		ctx
	});

	return block;
}

// (48:2) {#if year_extent[0] !== year_extent[1]}
function create_if_block_12(ctx) {
	let t0;
	let t1_value = /*year_extent*/ ctx[13][1] + "";
	let t1;

	const block = {
		c: function create() {
			t0 = text("- ");
			t1 = text(t1_value);
		},
		l: function claim(nodes) {
			t0 = claim_text(nodes, "- ");
			t1 = claim_text(nodes, t1_value);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, t1, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*year_extent*/ 8192 && t1_value !== (t1_value = /*year_extent*/ ctx[13][1] + "")) set_data_dev(t1, t1_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(t1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_12.name,
		type: "if",
		source: "(48:2) {#if year_extent[0] !== year_extent[1]}",
		ctx
	});

	return block;
}

// (56:2) {#if region.level}
function create_if_block_11(ctx) {
	let span;
	let t0;
	let t1_value = /*region*/ ctx[8].level + "";
	let t1;
	let t2;

	const block = {
		c: function create() {
			span = element("span");
			t0 = text("(level: ");
			t1 = text(t1_value);
			t2 = text(")");
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", {});
			var span_nodes = children(span);
			t0 = claim_text(span_nodes, "(level: ");
			t1 = claim_text(span_nodes, t1_value);
			t2 = claim_text(span_nodes, ")");
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$4, 56, 3, 1429);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, t0);
			append_dev(span, t1);
			append_dev(span, t2);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*region*/ 256 && t1_value !== (t1_value = /*region*/ ctx[8].level + "")) set_data_dev(t1, t1_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_11.name,
		type: "if",
		source: "(56:2) {#if region.level}",
		ctx
	});

	return block;
}

// (61:1) {#if is_experimental}
function create_if_block_10(ctx) {
	let p;
	let t0;
	let b;
	let t1;
	let t2;

	const block = {
		c: function create() {
			p = element("p");
			t0 = text("Note that this indicator is ");
			b = element("b");
			t1 = text("experimental");
			t2 = text(".");
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			t0 = claim_text(p_nodes, "Note that this indicator is ");
			b = claim_element(p_nodes, "B", { class: true });
			var b_nodes = children(b);
			t1 = claim_text(b_nodes, "experimental");
			b_nodes.forEach(detach_dev);
			t2 = claim_text(p_nodes, ".");
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(b, "class", "svelte-1b2hdj4");
			add_location(b, file$4, 62, 31, 1541);
			add_location(p, file$4, 61, 2, 1506);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t0);
			append_dev(p, b);
			append_dev(b, t1);
			append_dev(p, t2);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_10.name,
		type: "if",
		source: "(61:1) {#if is_experimental}",
		ctx
	});

	return block;
}

// (67:1) {#if warning}
function create_if_block_9(ctx) {
	let p;
	let b;
	let t0;
	let t1;
	let span;
	let t2;

	const block = {
		c: function create() {
			p = element("p");
			b = element("b");
			t0 = text("Warning:");
			t1 = space();
			span = element("span");
			t2 = text(/*warning*/ ctx[12]);
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			b = claim_element(p_nodes, "B", { class: true });
			var b_nodes = children(b);
			t0 = claim_text(b_nodes, "Warning:");
			b_nodes.forEach(detach_dev);
			t1 = claim_space(p_nodes);
			span = claim_element(p_nodes, "SPAN", {});
			var span_nodes = children(span);
			t2 = claim_text(span_nodes, /*warning*/ ctx[12]);
			span_nodes.forEach(detach_dev);
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(b, "class", "svelte-1b2hdj4");
			add_location(b, file$4, 68, 3, 1601);
			add_location(span, file$4, 69, 3, 1620);
			add_location(p, file$4, 67, 2, 1594);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, b);
			append_dev(b, t0);
			append_dev(p, t1);
			append_dev(p, span);
			append_dev(span, t2);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*warning*/ 4096) set_data_dev(t2, /*warning*/ ctx[12]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_9.name,
		type: "if",
		source: "(67:1) {#if warning}",
		ctx
	});

	return block;
}

// (74:1) {#if source_name}
function create_if_block_8(ctx) {
	let polymorphicstring;
	let current;

	polymorphicstring = new PolymorphicString({
			props: {
				item: /*source_name*/ ctx[9],
				title: "Source name"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(polymorphicstring.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(polymorphicstring.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(polymorphicstring, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const polymorphicstring_changes = {};
			if (dirty & /*source_name*/ 512) polymorphicstring_changes.item = /*source_name*/ ctx[9];
			polymorphicstring.$set(polymorphicstring_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(polymorphicstring.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(polymorphicstring.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(polymorphicstring, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_8.name,
		type: "if",
		source: "(74:1) {#if source_name}",
		ctx
	});

	return block;
}

// (77:1) {#if source_url}
function create_if_block_7(ctx) {
	let polymorphicurl;
	let current;

	polymorphicurl = new PolymorphicURL({
			props: {
				item: /*source_url*/ ctx[10],
				title: "Source"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(polymorphicurl.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(polymorphicurl.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(polymorphicurl, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const polymorphicurl_changes = {};
			if (dirty & /*source_url*/ 1024) polymorphicurl_changes.item = /*source_url*/ ctx[10];
			polymorphicurl.$set(polymorphicurl_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(polymorphicurl.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(polymorphicurl.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(polymorphicurl, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_7.name,
		type: "if",
		source: "(77:1) {#if source_url}",
		ctx
	});

	return block;
}

// (80:1) {#if api_doc_url}
function create_if_block_6(ctx) {
	let polymorphicurl;
	let current;

	polymorphicurl = new PolymorphicURL({
			props: {
				item: /*api_doc_url*/ ctx[0],
				title: "Source documentation"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(polymorphicurl.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(polymorphicurl.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(polymorphicurl, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const polymorphicurl_changes = {};
			if (dirty & /*api_doc_url*/ 1) polymorphicurl_changes.item = /*api_doc_url*/ ctx[0];
			polymorphicurl.$set(polymorphicurl_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(polymorphicurl.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(polymorphicurl.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(polymorphicurl, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_6.name,
		type: "if",
		source: "(80:1) {#if api_doc_url}",
		ctx
	});

	return block;
}

// (83:1) {#if endpoint_url}
function create_if_block_5(ctx) {
	let polymorphicurl;
	let current;

	polymorphicurl = new PolymorphicURL({
			props: {
				item: /*endpoint_url*/ ctx[4],
				title: "Source data"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(polymorphicurl.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(polymorphicurl.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(polymorphicurl, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const polymorphicurl_changes = {};
			if (dirty & /*endpoint_url*/ 16) polymorphicurl_changes.item = /*endpoint_url*/ ctx[4];
			polymorphicurl.$set(polymorphicurl_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(polymorphicurl.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(polymorphicurl.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(polymorphicurl, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(83:1) {#if endpoint_url}",
		ctx
	});

	return block;
}

// (86:1) {#if api_type}
function create_if_block_4(ctx) {
	let polymorphicstring;
	let current;

	polymorphicstring = new PolymorphicString({
			props: {
				item: /*api_type*/ ctx[1],
				title: "API type"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(polymorphicstring.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(polymorphicstring.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(polymorphicstring, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const polymorphicstring_changes = {};
			if (dirty & /*api_type*/ 2) polymorphicstring_changes.item = /*api_type*/ ctx[1];
			polymorphicstring.$set(polymorphicstring_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(polymorphicstring.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(polymorphicstring.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(polymorphicstring, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(86:1) {#if api_type}",
		ctx
	});

	return block;
}

// (89:1) {#if query}
function create_if_block_3(ctx) {
	let polymorphicstring;
	let current;

	polymorphicstring = new PolymorphicString({
			props: { item: /*query*/ ctx[7], title: "Query" },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(polymorphicstring.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(polymorphicstring.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(polymorphicstring, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const polymorphicstring_changes = {};
			if (dirty & /*query*/ 128) polymorphicstring_changes.item = /*query*/ ctx[7];
			polymorphicstring.$set(polymorphicstring_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(polymorphicstring.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(polymorphicstring.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(polymorphicstring, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(89:1) {#if query}",
		ctx
	});

	return block;
}

// (92:1) {#if !_.isUndefined(is_experimental)}
function create_if_block_2(ctx) {
	let polymorphicstring;
	let current;

	polymorphicstring = new PolymorphicString({
			props: {
				item: /*is_experimental*/ ctx[5],
				title: "Experimental"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(polymorphicstring.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(polymorphicstring.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(polymorphicstring, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const polymorphicstring_changes = {};
			if (dirty & /*is_experimental*/ 32) polymorphicstring_changes.item = /*is_experimental*/ ctx[5];
			polymorphicstring.$set(polymorphicstring_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(polymorphicstring.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(polymorphicstring.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(polymorphicstring, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(92:1) {#if !_.isUndefined(is_experimental)}",
		ctx
	});

	return block;
}

// (95:1) {#if !_.isUndefined(is_public) && !is_public}
function create_if_block$3(ctx) {
	let p;
	let b;
	let t0;
	let t1;
	let span;
	let t2;
	let t3;
	let if_block = /*auth_provider*/ ctx[2] && create_if_block_1$1(ctx);

	const block = {
		c: function create() {
			p = element("p");
			b = element("b");
			t0 = text("Access:");
			t1 = space();
			span = element("span");
			t2 = text("The dataset originally used to create this indicator is not public.");
			t3 = space();
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			b = claim_element(p_nodes, "B", { class: true });
			var b_nodes = children(b);
			t0 = claim_text(b_nodes, "Access:");
			b_nodes.forEach(detach_dev);
			t1 = claim_space(p_nodes);
			span = claim_element(p_nodes, "SPAN", {});
			var span_nodes = children(span);
			t2 = claim_text(span_nodes, "The dataset originally used to create this indicator is not public.");
			span_nodes.forEach(detach_dev);
			t3 = claim_space(p_nodes);
			if (if_block) if_block.l(p_nodes);
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(b, "class", "svelte-1b2hdj4");
			add_location(b, file$4, 96, 3, 2330);
			add_location(span, file$4, 97, 3, 2348);
			add_location(p, file$4, 95, 2, 2323);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, b);
			append_dev(b, t0);
			append_dev(p, t1);
			append_dev(p, span);
			append_dev(span, t2);
			append_dev(p, t3);
			if (if_block) if_block.m(p, null);
		},
		p: function update(ctx, dirty) {
			if (/*auth_provider*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1$1(ctx);
					if_block.c();
					if_block.m(p, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
			if (if_block) if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$3.name,
		type: "if",
		source: "(95:1) {#if !_.isUndefined(is_public) && !is_public}",
		ctx
	});

	return block;
}

// (99:3) {#if auth_provider}
function create_if_block_1$1(ctx) {
	let span;
	let t0;
	let t1;
	let t2;

	const block = {
		c: function create() {
			span = element("span");
			t0 = text("Please contact ");
			t1 = text(/*auth_provider*/ ctx[2]);
			t2 = text(" for more details about access.");
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", {});
			var span_nodes = children(span);
			t0 = claim_text(span_nodes, "Please contact ");
			t1 = claim_text(span_nodes, /*auth_provider*/ ctx[2]);
			t2 = claim_text(span_nodes, " for more details about access.");
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$4, 99, 4, 2457);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, t0);
			append_dev(span, t1);
			append_dev(span, t2);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*auth_provider*/ 4) set_data_dev(t1, /*auth_provider*/ ctx[2]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$1.name,
		type: "if",
		source: "(99:3) {#if auth_provider}",
		ctx
	});

	return block;
}

function create_fragment$4(ctx) {
	let div1;
	let h2;
	let t0;
	let t1;
	let t2;
	let t3;
	let p0;
	let b0;
	let t4;
	let t5;
	let t6_value = /*year_extent*/ ctx[13][0] + "";
	let t6;
	let t7;
	let t8;
	let p1;
	let b1;
	let t9;
	let t10;
	let span;
	let t11;
	let t12;
	let t13;
	let t14;
	let t15;
	let t16;
	let t17;
	let t18;
	let t19;
	let t20;
	let t21;
	let show_if_1 = !isUndefined(/*is_experimental*/ ctx[5]);
	let t22;
	let show_if = !isUndefined(/*is_public*/ ctx[6]) && !/*is_public*/ ctx[6];
	let t23;
	let div0;
	let linkbutton;
	let current;
	let if_block0 = /*description*/ ctx[3] && create_if_block_14(ctx);
	let if_block1 = /*date*/ ctx[14] && create_if_block_13(ctx);
	let if_block2 = /*year_extent*/ ctx[13][0] !== /*year_extent*/ ctx[13][1] && create_if_block_12(ctx);
	let if_block3 = /*region*/ ctx[8].level && create_if_block_11(ctx);
	let if_block4 = /*is_experimental*/ ctx[5] && create_if_block_10(ctx);
	let if_block5 = /*warning*/ ctx[12] && create_if_block_9(ctx);
	let if_block6 = /*source_name*/ ctx[9] && create_if_block_8(ctx);
	let if_block7 = /*source_url*/ ctx[10] && create_if_block_7(ctx);
	let if_block8 = /*api_doc_url*/ ctx[0] && create_if_block_6(ctx);
	let if_block9 = /*endpoint_url*/ ctx[4] && create_if_block_5(ctx);
	let if_block10 = /*api_type*/ ctx[1] && create_if_block_4(ctx);
	let if_block11 = /*query*/ ctx[7] && create_if_block_3(ctx);
	let if_block12 = show_if_1 && create_if_block_2(ctx);
	let if_block13 = show_if && create_if_block$3(ctx);

	linkbutton = new LinkButton({
			props: {
				glyph: Download,
				href: /*url*/ ctx[11],
				text: "Download this indicator",
				theme: {
					backgroundColor: /*$_theme*/ ctx[16].colorMain
				}
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div1 = element("div");
			h2 = element("h2");
			t0 = text("About the data");
			t1 = space();
			if (if_block0) if_block0.c();
			t2 = space();
			if (if_block1) if_block1.c();
			t3 = space();
			p0 = element("p");
			b0 = element("b");
			t4 = text("Available years:");
			t5 = space();
			t6 = text(t6_value);
			t7 = space();
			if (if_block2) if_block2.c();
			t8 = space();
			p1 = element("p");
			b1 = element("b");
			t9 = text("Region type:");
			t10 = space();
			span = element("span");
			t11 = text(/*regionType*/ ctx[15]);
			t12 = space();
			if (if_block3) if_block3.c();
			t13 = space();
			if (if_block4) if_block4.c();
			t14 = space();
			if (if_block5) if_block5.c();
			t15 = space();
			if (if_block6) if_block6.c();
			t16 = space();
			if (if_block7) if_block7.c();
			t17 = space();
			if (if_block8) if_block8.c();
			t18 = space();
			if (if_block9) if_block9.c();
			t19 = space();
			if (if_block10) if_block10.c();
			t20 = space();
			if (if_block11) if_block11.c();
			t21 = space();
			if (if_block12) if_block12.c();
			t22 = space();
			if (if_block13) if_block13.c();
			t23 = space();
			div0 = element("div");
			create_component(linkbutton.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			h2 = claim_element(div1_nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t0 = claim_text(h2_nodes, "About the data");
			h2_nodes.forEach(detach_dev);
			t1 = claim_space(div1_nodes);
			if (if_block0) if_block0.l(div1_nodes);
			t2 = claim_space(div1_nodes);
			if (if_block1) if_block1.l(div1_nodes);
			t3 = claim_space(div1_nodes);
			p0 = claim_element(div1_nodes, "P", {});
			var p0_nodes = children(p0);
			b0 = claim_element(p0_nodes, "B", { class: true });
			var b0_nodes = children(b0);
			t4 = claim_text(b0_nodes, "Available years:");
			b0_nodes.forEach(detach_dev);
			t5 = claim_space(p0_nodes);
			t6 = claim_text(p0_nodes, t6_value);
			t7 = claim_space(p0_nodes);
			if (if_block2) if_block2.l(p0_nodes);
			p0_nodes.forEach(detach_dev);
			t8 = claim_space(div1_nodes);
			p1 = claim_element(div1_nodes, "P", {});
			var p1_nodes = children(p1);
			b1 = claim_element(p1_nodes, "B", { class: true });
			var b1_nodes = children(b1);
			t9 = claim_text(b1_nodes, "Region type:");
			b1_nodes.forEach(detach_dev);
			t10 = claim_space(p1_nodes);
			span = claim_element(p1_nodes, "SPAN", {});
			var span_nodes = children(span);
			t11 = claim_text(span_nodes, /*regionType*/ ctx[15]);
			span_nodes.forEach(detach_dev);
			t12 = claim_space(p1_nodes);
			if (if_block3) if_block3.l(p1_nodes);
			p1_nodes.forEach(detach_dev);
			t13 = claim_space(div1_nodes);
			if (if_block4) if_block4.l(div1_nodes);
			t14 = claim_space(div1_nodes);
			if (if_block5) if_block5.l(div1_nodes);
			t15 = claim_space(div1_nodes);
			if (if_block6) if_block6.l(div1_nodes);
			t16 = claim_space(div1_nodes);
			if (if_block7) if_block7.l(div1_nodes);
			t17 = claim_space(div1_nodes);
			if (if_block8) if_block8.l(div1_nodes);
			t18 = claim_space(div1_nodes);
			if (if_block9) if_block9.l(div1_nodes);
			t19 = claim_space(div1_nodes);
			if (if_block10) if_block10.l(div1_nodes);
			t20 = claim_space(div1_nodes);
			if (if_block11) if_block11.l(div1_nodes);
			t21 = claim_space(div1_nodes);
			if (if_block12) if_block12.l(div1_nodes);
			t22 = claim_space(div1_nodes);
			if (if_block13) if_block13.l(div1_nodes);
			t23 = claim_space(div1_nodes);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			claim_component(linkbutton.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h2, "class", "svelte-1b2hdj4");
			add_location(h2, file$4, 35, 1, 1063);
			attr_dev(b0, "class", "svelte-1b2hdj4");
			add_location(b0, file$4, 46, 2, 1230);
			add_location(p0, file$4, 45, 1, 1224);
			attr_dev(b1, "class", "svelte-1b2hdj4");
			add_location(b1, file$4, 53, 2, 1357);
			add_location(span, file$4, 54, 2, 1379);
			add_location(p1, file$4, 52, 1, 1351);
			attr_dev(div0, "class", "cta svelte-1b2hdj4");
			add_location(div0, file$4, 104, 1, 2557);
			attr_dev(div1, "class", "InfoView svelte-1b2hdj4");
			add_location(div1, file$4, 34, 0, 1039);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, h2);
			append_dev(h2, t0);
			append_dev(div1, t1);
			if (if_block0) if_block0.m(div1, null);
			append_dev(div1, t2);
			if (if_block1) if_block1.m(div1, null);
			append_dev(div1, t3);
			append_dev(div1, p0);
			append_dev(p0, b0);
			append_dev(b0, t4);
			append_dev(p0, t5);
			append_dev(p0, t6);
			append_dev(p0, t7);
			if (if_block2) if_block2.m(p0, null);
			append_dev(div1, t8);
			append_dev(div1, p1);
			append_dev(p1, b1);
			append_dev(b1, t9);
			append_dev(p1, t10);
			append_dev(p1, span);
			append_dev(span, t11);
			append_dev(p1, t12);
			if (if_block3) if_block3.m(p1, null);
			append_dev(div1, t13);
			if (if_block4) if_block4.m(div1, null);
			append_dev(div1, t14);
			if (if_block5) if_block5.m(div1, null);
			append_dev(div1, t15);
			if (if_block6) if_block6.m(div1, null);
			append_dev(div1, t16);
			if (if_block7) if_block7.m(div1, null);
			append_dev(div1, t17);
			if (if_block8) if_block8.m(div1, null);
			append_dev(div1, t18);
			if (if_block9) if_block9.m(div1, null);
			append_dev(div1, t19);
			if (if_block10) if_block10.m(div1, null);
			append_dev(div1, t20);
			if (if_block11) if_block11.m(div1, null);
			append_dev(div1, t21);
			if (if_block12) if_block12.m(div1, null);
			append_dev(div1, t22);
			if (if_block13) if_block13.m(div1, null);
			append_dev(div1, t23);
			append_dev(div1, div0);
			mount_component(linkbutton, div0, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*description*/ ctx[3]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_14(ctx);
					if_block0.c();
					if_block0.m(div1, t2);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*date*/ ctx[14]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_13(ctx);
					if_block1.c();
					if_block1.m(div1, t3);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if ((!current || dirty & /*year_extent*/ 8192) && t6_value !== (t6_value = /*year_extent*/ ctx[13][0] + "")) set_data_dev(t6, t6_value);

			if (/*year_extent*/ ctx[13][0] !== /*year_extent*/ ctx[13][1]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_12(ctx);
					if_block2.c();
					if_block2.m(p0, null);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (!current || dirty & /*regionType*/ 32768) set_data_dev(t11, /*regionType*/ ctx[15]);

			if (/*region*/ ctx[8].level) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block_11(ctx);
					if_block3.c();
					if_block3.m(p1, null);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (/*is_experimental*/ ctx[5]) {
				if (if_block4) ; else {
					if_block4 = create_if_block_10(ctx);
					if_block4.c();
					if_block4.m(div1, t14);
				}
			} else if (if_block4) {
				if_block4.d(1);
				if_block4 = null;
			}

			if (/*warning*/ ctx[12]) {
				if (if_block5) {
					if_block5.p(ctx, dirty);
				} else {
					if_block5 = create_if_block_9(ctx);
					if_block5.c();
					if_block5.m(div1, t15);
				}
			} else if (if_block5) {
				if_block5.d(1);
				if_block5 = null;
			}

			if (/*source_name*/ ctx[9]) {
				if (if_block6) {
					if_block6.p(ctx, dirty);

					if (dirty & /*source_name*/ 512) {
						transition_in(if_block6, 1);
					}
				} else {
					if_block6 = create_if_block_8(ctx);
					if_block6.c();
					transition_in(if_block6, 1);
					if_block6.m(div1, t16);
				}
			} else if (if_block6) {
				group_outros();

				transition_out(if_block6, 1, 1, () => {
					if_block6 = null;
				});

				check_outros();
			}

			if (/*source_url*/ ctx[10]) {
				if (if_block7) {
					if_block7.p(ctx, dirty);

					if (dirty & /*source_url*/ 1024) {
						transition_in(if_block7, 1);
					}
				} else {
					if_block7 = create_if_block_7(ctx);
					if_block7.c();
					transition_in(if_block7, 1);
					if_block7.m(div1, t17);
				}
			} else if (if_block7) {
				group_outros();

				transition_out(if_block7, 1, 1, () => {
					if_block7 = null;
				});

				check_outros();
			}

			if (/*api_doc_url*/ ctx[0]) {
				if (if_block8) {
					if_block8.p(ctx, dirty);

					if (dirty & /*api_doc_url*/ 1) {
						transition_in(if_block8, 1);
					}
				} else {
					if_block8 = create_if_block_6(ctx);
					if_block8.c();
					transition_in(if_block8, 1);
					if_block8.m(div1, t18);
				}
			} else if (if_block8) {
				group_outros();

				transition_out(if_block8, 1, 1, () => {
					if_block8 = null;
				});

				check_outros();
			}

			if (/*endpoint_url*/ ctx[4]) {
				if (if_block9) {
					if_block9.p(ctx, dirty);

					if (dirty & /*endpoint_url*/ 16) {
						transition_in(if_block9, 1);
					}
				} else {
					if_block9 = create_if_block_5(ctx);
					if_block9.c();
					transition_in(if_block9, 1);
					if_block9.m(div1, t19);
				}
			} else if (if_block9) {
				group_outros();

				transition_out(if_block9, 1, 1, () => {
					if_block9 = null;
				});

				check_outros();
			}

			if (/*api_type*/ ctx[1]) {
				if (if_block10) {
					if_block10.p(ctx, dirty);

					if (dirty & /*api_type*/ 2) {
						transition_in(if_block10, 1);
					}
				} else {
					if_block10 = create_if_block_4(ctx);
					if_block10.c();
					transition_in(if_block10, 1);
					if_block10.m(div1, t20);
				}
			} else if (if_block10) {
				group_outros();

				transition_out(if_block10, 1, 1, () => {
					if_block10 = null;
				});

				check_outros();
			}

			if (/*query*/ ctx[7]) {
				if (if_block11) {
					if_block11.p(ctx, dirty);

					if (dirty & /*query*/ 128) {
						transition_in(if_block11, 1);
					}
				} else {
					if_block11 = create_if_block_3(ctx);
					if_block11.c();
					transition_in(if_block11, 1);
					if_block11.m(div1, t21);
				}
			} else if (if_block11) {
				group_outros();

				transition_out(if_block11, 1, 1, () => {
					if_block11 = null;
				});

				check_outros();
			}

			if (dirty & /*is_experimental*/ 32) show_if_1 = !isUndefined(/*is_experimental*/ ctx[5]);

			if (show_if_1) {
				if (if_block12) {
					if_block12.p(ctx, dirty);

					if (dirty & /*is_experimental*/ 32) {
						transition_in(if_block12, 1);
					}
				} else {
					if_block12 = create_if_block_2(ctx);
					if_block12.c();
					transition_in(if_block12, 1);
					if_block12.m(div1, t22);
				}
			} else if (if_block12) {
				group_outros();

				transition_out(if_block12, 1, 1, () => {
					if_block12 = null;
				});

				check_outros();
			}

			if (dirty & /*is_public*/ 64) show_if = !isUndefined(/*is_public*/ ctx[6]) && !/*is_public*/ ctx[6];

			if (show_if) {
				if (if_block13) {
					if_block13.p(ctx, dirty);
				} else {
					if_block13 = create_if_block$3(ctx);
					if_block13.c();
					if_block13.m(div1, t23);
				}
			} else if (if_block13) {
				if_block13.d(1);
				if_block13 = null;
			}

			const linkbutton_changes = {};
			if (dirty & /*url*/ 2048) linkbutton_changes.href = /*url*/ ctx[11];

			if (dirty & /*$_theme*/ 65536) linkbutton_changes.theme = {
				backgroundColor: /*$_theme*/ ctx[16].colorMain
			};

			linkbutton.$set(linkbutton_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block6);
			transition_in(if_block7);
			transition_in(if_block8);
			transition_in(if_block9);
			transition_in(if_block10);
			transition_in(if_block11);
			transition_in(if_block12);
			transition_in(linkbutton.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block6);
			transition_out(if_block7);
			transition_out(if_block8);
			transition_out(if_block9);
			transition_out(if_block10);
			transition_out(if_block11);
			transition_out(if_block12);
			transition_out(linkbutton.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			if (if_block4) if_block4.d();
			if (if_block5) if_block5.d();
			if (if_block6) if_block6.d();
			if (if_block7) if_block7.d();
			if (if_block8) if_block8.d();
			if (if_block9) if_block9.d();
			if (if_block10) if_block10.d();
			if (if_block11) if_block11.d();
			if (if_block12) if_block12.d();
			if (if_block13) if_block13.d();
			destroy_component(linkbutton);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4($$self, $$props, $$invalidate) {
	let date;
	let regionType;
	let $_theme;
	validate_store(_theme, "_theme");
	component_subscribe($$self, _theme, $$value => $$invalidate(16, $_theme = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("InfoView", slots, []);
	const formatDate = pipe([String, s => `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`]);
	let { api_doc_url = null } = $$props;
	let { api_type = null } = $$props;
	let { auth_provider = null } = $$props;
	let { data_date = null } = $$props;
	let { description = null } = $$props;
	let { endpoint_url = null } = $$props;
	let { is_experimental = null } = $$props;
	let { is_public = null } = $$props;
	let { query = null } = $$props;
	let { region = null } = $$props;
	let { source_name = null } = $$props;
	let { source_url = null } = $$props;
	let { url = null } = $$props;
	let { warning = null } = $$props;
	let { year_extent = null } = $$props;

	const writable_props = [
		"api_doc_url",
		"api_type",
		"auth_provider",
		"data_date",
		"description",
		"endpoint_url",
		"is_experimental",
		"is_public",
		"query",
		"region",
		"source_name",
		"source_url",
		"url",
		"warning",
		"year_extent"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<InfoView> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("api_doc_url" in $$props) $$invalidate(0, api_doc_url = $$props.api_doc_url);
		if ("api_type" in $$props) $$invalidate(1, api_type = $$props.api_type);
		if ("auth_provider" in $$props) $$invalidate(2, auth_provider = $$props.auth_provider);
		if ("data_date" in $$props) $$invalidate(17, data_date = $$props.data_date);
		if ("description" in $$props) $$invalidate(3, description = $$props.description);
		if ("endpoint_url" in $$props) $$invalidate(4, endpoint_url = $$props.endpoint_url);
		if ("is_experimental" in $$props) $$invalidate(5, is_experimental = $$props.is_experimental);
		if ("is_public" in $$props) $$invalidate(6, is_public = $$props.is_public);
		if ("query" in $$props) $$invalidate(7, query = $$props.query);
		if ("region" in $$props) $$invalidate(8, region = $$props.region);
		if ("source_name" in $$props) $$invalidate(9, source_name = $$props.source_name);
		if ("source_url" in $$props) $$invalidate(10, source_url = $$props.source_url);
		if ("url" in $$props) $$invalidate(11, url = $$props.url);
		if ("warning" in $$props) $$invalidate(12, warning = $$props.warning);
		if ("year_extent" in $$props) $$invalidate(13, year_extent = $$props.year_extent);
	};

	$$self.$capture_state = () => ({
		_,
		Download,
		LinkButton,
		PolymorphicString,
		PolymorphicURL,
		_theme,
		formatDate,
		api_doc_url,
		api_type,
		auth_provider,
		data_date,
		description,
		endpoint_url,
		is_experimental,
		is_public,
		query,
		region,
		source_name,
		source_url,
		url,
		warning,
		year_extent,
		date,
		regionType,
		$_theme
	});

	$$self.$inject_state = $$props => {
		if ("api_doc_url" in $$props) $$invalidate(0, api_doc_url = $$props.api_doc_url);
		if ("api_type" in $$props) $$invalidate(1, api_type = $$props.api_type);
		if ("auth_provider" in $$props) $$invalidate(2, auth_provider = $$props.auth_provider);
		if ("data_date" in $$props) $$invalidate(17, data_date = $$props.data_date);
		if ("description" in $$props) $$invalidate(3, description = $$props.description);
		if ("endpoint_url" in $$props) $$invalidate(4, endpoint_url = $$props.endpoint_url);
		if ("is_experimental" in $$props) $$invalidate(5, is_experimental = $$props.is_experimental);
		if ("is_public" in $$props) $$invalidate(6, is_public = $$props.is_public);
		if ("query" in $$props) $$invalidate(7, query = $$props.query);
		if ("region" in $$props) $$invalidate(8, region = $$props.region);
		if ("source_name" in $$props) $$invalidate(9, source_name = $$props.source_name);
		if ("source_url" in $$props) $$invalidate(10, source_url = $$props.source_url);
		if ("url" in $$props) $$invalidate(11, url = $$props.url);
		if ("warning" in $$props) $$invalidate(12, warning = $$props.warning);
		if ("year_extent" in $$props) $$invalidate(13, year_extent = $$props.year_extent);
		if ("date" in $$props) $$invalidate(14, date = $$props.date);
		if ("regionType" in $$props) $$invalidate(15, regionType = $$props.regionType);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*data_date*/ 131072) {
			$$invalidate(14, date = data_date && formatDate(data_date));
		}

		if ($$self.$$.dirty & /*region*/ 256) {
			$$invalidate(15, regionType = region.type.replace("Region", "").toUpperCase());
		}
	};

	return [
		api_doc_url,
		api_type,
		auth_provider,
		description,
		endpoint_url,
		is_experimental,
		is_public,
		query,
		region,
		source_name,
		source_url,
		url,
		warning,
		year_extent,
		date,
		regionType,
		$_theme,
		data_date
	];
}

class InfoView extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
			api_doc_url: 0,
			api_type: 1,
			auth_provider: 2,
			data_date: 17,
			description: 3,
			endpoint_url: 4,
			is_experimental: 5,
			is_public: 6,
			query: 7,
			region: 8,
			source_name: 9,
			source_url: 10,
			url: 11,
			warning: 12,
			year_extent: 13
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "InfoView",
			options,
			id: create_fragment$4.name
		});
	}

	get api_doc_url() {
		throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set api_doc_url(value) {
		throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get api_type() {
		throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set api_type(value) {
		throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get auth_provider() {
		throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set auth_provider(value) {
		throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get data_date() {
		throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set data_date(value) {
		throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get description() {
		throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set description(value) {
		throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get endpoint_url() {
		throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set endpoint_url(value) {
		throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get is_experimental() {
		throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set is_experimental(value) {
		throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get is_public() {
		throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set is_public(value) {
		throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get query() {
		throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set query(value) {
		throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get region() {
		throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set region(value) {
		throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get source_name() {
		throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set source_name(value) {
		throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get source_url() {
		throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set source_url(value) {
		throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get url() {
		throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set url(value) {
		throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get warning() {
		throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set warning(value) {
		throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get year_extent() {
		throw new Error("<InfoView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set year_extent(value) {
		throw new Error("<InfoView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../components/time_region_value/src/node_modules/components/Info/InfoModal.svelte generated by Svelte v3.38.2 */
const file$3 = "../../components/time_region_value/src/node_modules/components/Info/InfoModal.svelte";

function create_fragment$3(ctx) {
	let div1;
	let div0;
	let infoview;
	let current;
	let mounted;
	let dispose;

	infoview = new InfoView({
			props: {
				api_doc_url: /*api_doc_url*/ ctx[0],
				api_type: /*api_type*/ ctx[1],
				auth_provider: /*auth_provider*/ ctx[2],
				data_date: /*data_date*/ ctx[3],
				description: /*description*/ ctx[4],
				endpoint_url: /*endpoint_url*/ ctx[5],
				is_experimental: /*is_experimental*/ ctx[6],
				is_public: /*is_public*/ ctx[7],
				query: /*query*/ ctx[8],
				region: /*region*/ ctx[9],
				source_name: /*source_name*/ ctx[10],
				source_url: /*source_url*/ ctx[11],
				url: /*url*/ ctx[12],
				warning: /*warning*/ ctx[13],
				year_extent: /*year_extent*/ ctx[14]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			create_component(infoview.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			claim_component(infoview.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "panel svelte-1d8tp84");
			add_location(div0, file$3, 24, 1, 631);
			attr_dev(div1, "class", "modal svelte-1d8tp84");
			add_location(div1, file$3, 23, 0, 601);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);
			mount_component(infoview, div0, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(div0, "click", stop_propagation(noop), false, false, true),
					listen_dev(div1, "click", /*click_handler*/ ctx[15], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			const infoview_changes = {};
			if (dirty & /*api_doc_url*/ 1) infoview_changes.api_doc_url = /*api_doc_url*/ ctx[0];
			if (dirty & /*api_type*/ 2) infoview_changes.api_type = /*api_type*/ ctx[1];
			if (dirty & /*auth_provider*/ 4) infoview_changes.auth_provider = /*auth_provider*/ ctx[2];
			if (dirty & /*data_date*/ 8) infoview_changes.data_date = /*data_date*/ ctx[3];
			if (dirty & /*description*/ 16) infoview_changes.description = /*description*/ ctx[4];
			if (dirty & /*endpoint_url*/ 32) infoview_changes.endpoint_url = /*endpoint_url*/ ctx[5];
			if (dirty & /*is_experimental*/ 64) infoview_changes.is_experimental = /*is_experimental*/ ctx[6];
			if (dirty & /*is_public*/ 128) infoview_changes.is_public = /*is_public*/ ctx[7];
			if (dirty & /*query*/ 256) infoview_changes.query = /*query*/ ctx[8];
			if (dirty & /*region*/ 512) infoview_changes.region = /*region*/ ctx[9];
			if (dirty & /*source_name*/ 1024) infoview_changes.source_name = /*source_name*/ ctx[10];
			if (dirty & /*source_url*/ 2048) infoview_changes.source_url = /*source_url*/ ctx[11];
			if (dirty & /*url*/ 4096) infoview_changes.url = /*url*/ ctx[12];
			if (dirty & /*warning*/ 8192) infoview_changes.warning = /*warning*/ ctx[13];
			if (dirty & /*year_extent*/ 16384) infoview_changes.year_extent = /*year_extent*/ ctx[14];
			infoview.$set(infoview_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(infoview.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(infoview.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			destroy_component(infoview);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("InfoModal", slots, []);
	let { api_doc_url = null } = $$props;
	let { api_type = null } = $$props;
	let { auth_provider = null } = $$props;
	let { data_date = null } = $$props;
	let { description = null } = $$props;
	let { endpoint_url = null } = $$props;
	let { is_experimental = null } = $$props;
	let { is_public = null } = $$props;
	let { query = null } = $$props;
	let { region = null } = $$props;
	let { source_name = null } = $$props;
	let { source_url = null } = $$props;
	let { url = null } = $$props;
	let { warning = null } = $$props;
	let { year_extent = null } = $$props;

	const writable_props = [
		"api_doc_url",
		"api_type",
		"auth_provider",
		"data_date",
		"description",
		"endpoint_url",
		"is_experimental",
		"is_public",
		"query",
		"region",
		"source_name",
		"source_url",
		"url",
		"warning",
		"year_extent"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<InfoModal> was created with unknown prop '${key}'`);
	});

	function click_handler(event) {
		bubble($$self, event);
	}

	$$self.$$set = $$props => {
		if ("api_doc_url" in $$props) $$invalidate(0, api_doc_url = $$props.api_doc_url);
		if ("api_type" in $$props) $$invalidate(1, api_type = $$props.api_type);
		if ("auth_provider" in $$props) $$invalidate(2, auth_provider = $$props.auth_provider);
		if ("data_date" in $$props) $$invalidate(3, data_date = $$props.data_date);
		if ("description" in $$props) $$invalidate(4, description = $$props.description);
		if ("endpoint_url" in $$props) $$invalidate(5, endpoint_url = $$props.endpoint_url);
		if ("is_experimental" in $$props) $$invalidate(6, is_experimental = $$props.is_experimental);
		if ("is_public" in $$props) $$invalidate(7, is_public = $$props.is_public);
		if ("query" in $$props) $$invalidate(8, query = $$props.query);
		if ("region" in $$props) $$invalidate(9, region = $$props.region);
		if ("source_name" in $$props) $$invalidate(10, source_name = $$props.source_name);
		if ("source_url" in $$props) $$invalidate(11, source_url = $$props.source_url);
		if ("url" in $$props) $$invalidate(12, url = $$props.url);
		if ("warning" in $$props) $$invalidate(13, warning = $$props.warning);
		if ("year_extent" in $$props) $$invalidate(14, year_extent = $$props.year_extent);
	};

	$$self.$capture_state = () => ({
		_,
		noop,
		InfoView,
		api_doc_url,
		api_type,
		auth_provider,
		data_date,
		description,
		endpoint_url,
		is_experimental,
		is_public,
		query,
		region,
		source_name,
		source_url,
		url,
		warning,
		year_extent
	});

	$$self.$inject_state = $$props => {
		if ("api_doc_url" in $$props) $$invalidate(0, api_doc_url = $$props.api_doc_url);
		if ("api_type" in $$props) $$invalidate(1, api_type = $$props.api_type);
		if ("auth_provider" in $$props) $$invalidate(2, auth_provider = $$props.auth_provider);
		if ("data_date" in $$props) $$invalidate(3, data_date = $$props.data_date);
		if ("description" in $$props) $$invalidate(4, description = $$props.description);
		if ("endpoint_url" in $$props) $$invalidate(5, endpoint_url = $$props.endpoint_url);
		if ("is_experimental" in $$props) $$invalidate(6, is_experimental = $$props.is_experimental);
		if ("is_public" in $$props) $$invalidate(7, is_public = $$props.is_public);
		if ("query" in $$props) $$invalidate(8, query = $$props.query);
		if ("region" in $$props) $$invalidate(9, region = $$props.region);
		if ("source_name" in $$props) $$invalidate(10, source_name = $$props.source_name);
		if ("source_url" in $$props) $$invalidate(11, source_url = $$props.source_url);
		if ("url" in $$props) $$invalidate(12, url = $$props.url);
		if ("warning" in $$props) $$invalidate(13, warning = $$props.warning);
		if ("year_extent" in $$props) $$invalidate(14, year_extent = $$props.year_extent);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		api_doc_url,
		api_type,
		auth_provider,
		data_date,
		description,
		endpoint_url,
		is_experimental,
		is_public,
		query,
		region,
		source_name,
		source_url,
		url,
		warning,
		year_extent,
		click_handler
	];
}

class InfoModal extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
			api_doc_url: 0,
			api_type: 1,
			auth_provider: 2,
			data_date: 3,
			description: 4,
			endpoint_url: 5,
			is_experimental: 6,
			is_public: 7,
			query: 8,
			region: 9,
			source_name: 10,
			source_url: 11,
			url: 12,
			warning: 13,
			year_extent: 14
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "InfoModal",
			options,
			id: create_fragment$3.name
		});
	}

	get api_doc_url() {
		throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set api_doc_url(value) {
		throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get api_type() {
		throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set api_type(value) {
		throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get auth_provider() {
		throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set auth_provider(value) {
		throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get data_date() {
		throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set data_date(value) {
		throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get description() {
		throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set description(value) {
		throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get endpoint_url() {
		throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set endpoint_url(value) {
		throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get is_experimental() {
		throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set is_experimental(value) {
		throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get is_public() {
		throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set is_public(value) {
		throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get query() {
		throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set query(value) {
		throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get region() {
		throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set region(value) {
		throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get source_name() {
		throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set source_name(value) {
		throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get source_url() {
		throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set source_url(value) {
		throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get url() {
		throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set url(value) {
		throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get warning() {
		throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set warning(value) {
		throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get year_extent() {
		throw new Error("<InfoModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set year_extent(value) {
		throw new Error("<InfoModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../components/time_region_value/src/node_modules/components/SettingsRow.svelte generated by Svelte v3.38.2 */

const file$2 = "../../components/time_region_value/src/node_modules/components/SettingsRow.svelte";

// (65:1) {#if flags.showRankingControl}
function create_if_block$2(ctx) {
	let div;
	let switch_1;
	let current;

	switch_1 = new Switch({
			props: {
				value: "Absolute",
				values: ["Absolute", "Ranking"]
			},
			$$inline: true
		});

	switch_1.$on("toggled", function () {
		if (is_function(/*handlers*/ ctx[0].toggledRanking)) /*handlers*/ ctx[0].toggledRanking.apply(this, arguments);
	});

	const block = {
		c: function create() {
			div = element("div");
			create_component(switch_1.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			claim_component(switch_1.$$.fragment, div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "optgroup svelte-5cw442");
			add_location(div, file$2, 65, 2, 1534);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(switch_1, div, null);
			current = true;
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
		},
		i: function intro(local) {
			if (current) return;
			transition_in(switch_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(switch_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(switch_1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(65:1) {#if flags.showRankingControl}",
		ctx
	});

	return block;
}

function create_fragment$2(ctx) {
	let div3;
	let div1;
	let div0;
	let icon0;
	let t0;
	let icon1;
	let t1;
	let switch0;
	let t2;
	let t3;
	let div2;
	let switch1;
	let current;
	let mounted;
	let dispose;

	icon0 = new Icon({
			props: {
				glyph: Globe,
				size: 28,
				stroke: /*globeStroke*/ ctx[2],
				strokeWidth: 1.5
			},
			$$inline: true
		});

	icon1 = new Icon({
			props: {
				glyph: /*flags*/ ctx[1].isGeoModalVisible
				? ChevronUp
				: ChevronDown,
				size: 24,
				strokeWidth: 1
			},
			$$inline: true
		});

	switch0 = new Switch({
			props: {
				value: /*flags*/ ctx[1].doFilter ? "Filter" : "Highlight",
				values: ["Highlight", "Filter"]
			},
			$$inline: true
		});

	switch0.$on("toggled", function () {
		if (is_function(/*handlers*/ ctx[0].toggledFiltering)) /*handlers*/ ctx[0].toggledFiltering.apply(this, arguments);
	});

	let if_block = /*flags*/ ctx[1].showRankingControl && create_if_block$2(ctx);

	switch1 = new Switch({
			props: {
				value: /*$_colorSchemeLabel*/ ctx[3],
				values: /*$_colorSchemeLabels*/ ctx[4]
			},
			$$inline: true
		});

	switch1.$on("toggled", toggleColorScheme);

	const block = {
		c: function create() {
			div3 = element("div");
			div1 = element("div");
			div0 = element("div");
			create_component(icon0.$$.fragment);
			t0 = space();
			create_component(icon1.$$.fragment);
			t1 = space();
			create_component(switch0.$$.fragment);
			t2 = space();
			if (if_block) if_block.c();
			t3 = space();
			div2 = element("div");
			create_component(switch1.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div3 = claim_element(nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			div1 = claim_element(div3_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			claim_component(icon0.$$.fragment, div0_nodes);
			t0 = claim_space(div0_nodes);
			claim_component(icon1.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach_dev);
			t1 = claim_space(div1_nodes);
			claim_component(switch0.$$.fragment, div1_nodes);
			div1_nodes.forEach(detach_dev);
			t2 = claim_space(div3_nodes);
			if (if_block) if_block.l(div3_nodes);
			t3 = claim_space(div3_nodes);
			div2 = claim_element(div3_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			claim_component(switch1.$$.fragment, div2_nodes);
			div2_nodes.forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "globe clickable svelte-5cw442");
			add_location(div0, file$2, 39, 2, 1039);
			attr_dev(div1, "class", "optgroup svelte-5cw442");
			add_location(div1, file$2, 38, 1, 1014);
			attr_dev(div2, "class", "optgroup svelte-5cw442");
			add_location(div2, file$2, 75, 1, 1713);
			attr_dev(div3, "class", "SettingsRow svelte-5cw442");
			add_location(div3, file$2, 36, 0, 963);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div3, anchor);
			append_dev(div3, div1);
			append_dev(div1, div0);
			mount_component(icon0, div0, null);
			append_dev(div0, t0);
			mount_component(icon1, div0, null);
			append_dev(div1, t1);
			mount_component(switch0, div1, null);
			append_dev(div3, t2);
			if (if_block) if_block.m(div3, null);
			append_dev(div3, t3);
			append_dev(div3, div2);
			mount_component(switch1, div2, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(
					div0,
					"click",
					function () {
						if (is_function(/*handlers*/ ctx[0].toggledGeoModal)) /*handlers*/ ctx[0].toggledGeoModal.apply(this, arguments);
					},
					false,
					false,
					false
				);

				mounted = true;
			}
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;
			const icon0_changes = {};
			if (dirty & /*globeStroke*/ 4) icon0_changes.stroke = /*globeStroke*/ ctx[2];
			icon0.$set(icon0_changes);
			const icon1_changes = {};

			if (dirty & /*flags*/ 2) icon1_changes.glyph = /*flags*/ ctx[1].isGeoModalVisible
			? ChevronUp
			: ChevronDown;

			icon1.$set(icon1_changes);
			const switch0_changes = {};
			if (dirty & /*flags*/ 2) switch0_changes.value = /*flags*/ ctx[1].doFilter ? "Filter" : "Highlight";
			switch0.$set(switch0_changes);

			if (/*flags*/ ctx[1].showRankingControl) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*flags*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$2(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div3, t3);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			const switch1_changes = {};
			if (dirty & /*$_colorSchemeLabel*/ 8) switch1_changes.value = /*$_colorSchemeLabel*/ ctx[3];
			if (dirty & /*$_colorSchemeLabels*/ 16) switch1_changes.values = /*$_colorSchemeLabels*/ ctx[4];
			switch1.$set(switch1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon0.$$.fragment, local);
			transition_in(icon1.$$.fragment, local);
			transition_in(switch0.$$.fragment, local);
			transition_in(if_block);
			transition_in(switch1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon0.$$.fragment, local);
			transition_out(icon1.$$.fragment, local);
			transition_out(switch0.$$.fragment, local);
			transition_out(if_block);
			transition_out(switch1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div3);
			destroy_component(icon0);
			destroy_component(icon1);
			destroy_component(switch0);
			if (if_block) if_block.d();
			destroy_component(switch1);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let globeStroke;
	let $_theme;
	let $_colorSchemeLabel;
	let $_colorSchemeLabels;
	validate_store(_theme, "_theme");
	component_subscribe($$self, _theme, $$value => $$invalidate(5, $_theme = $$value));
	validate_store(_colorSchemeLabel, "_colorSchemeLabel");
	component_subscribe($$self, _colorSchemeLabel, $$value => $$invalidate(3, $_colorSchemeLabel = $$value));
	validate_store(_colorSchemeLabels, "_colorSchemeLabels");
	component_subscribe($$self, _colorSchemeLabels, $$value => $$invalidate(4, $_colorSchemeLabels = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("SettingsRow", slots, []);

	const defaultHandlers = {
		toggledFiltering: null,
		toggledGeoModal: null,
		toggledRanking: null
	};

	let { flags = {
		doFilter: false,
		isGeoModalVisible: false,
		showRankingControl: false,
		someUnselectedRegions: false
	} } = $$props;

	let { handlers = defaultHandlers } = $$props;
	const writable_props = ["flags", "handlers"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SettingsRow> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("flags" in $$props) $$invalidate(1, flags = $$props.flags);
		if ("handlers" in $$props) $$invalidate(0, handlers = $$props.handlers);
	};

	$$self.$capture_state = () => ({
		Icon,
		ChevronDown,
		ChevronUp,
		Globe,
		Switch,
		_colorSchemeLabel,
		_colorSchemeLabels,
		_theme,
		toggleColorScheme,
		defaultHandlers,
		flags,
		handlers,
		globeStroke,
		$_theme,
		$_colorSchemeLabel,
		$_colorSchemeLabels
	});

	$$self.$inject_state = $$props => {
		if ("flags" in $$props) $$invalidate(1, flags = $$props.flags);
		if ("handlers" in $$props) $$invalidate(0, handlers = $$props.handlers);
		if ("globeStroke" in $$props) $$invalidate(2, globeStroke = $$props.globeStroke);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*handlers*/ 1) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			$$invalidate(0, handlers = handlers
			? { ...defaultHandlers, ...handlers }
			: defaultHandlers);
		}

		if ($$self.$$.dirty & /*flags, $_theme*/ 34) {
			$$invalidate(2, globeStroke = flags.someUnselectedRegions
			? $_theme.colorSelected
			: $_theme.colorRef);
		}
	};

	return [handlers, flags, globeStroke, $_colorSchemeLabel, $_colorSchemeLabels, $_theme];
}

class SettingsRow extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2, create_fragment$2, safe_not_equal, { flags: 1, handlers: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "SettingsRow",
			options,
			id: create_fragment$2.name
		});
	}

	get flags() {
		throw new Error("<SettingsRow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set flags(value) {
		throw new Error("<SettingsRow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get handlers() {
		throw new Error("<SettingsRow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set handlers(value) {
		throw new Error("<SettingsRow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../components/time_region_value/src/node_modules/components/RegionsSelector.svelte generated by Svelte v3.38.2 */

const file$1 = "../../components/time_region_value/src/node_modules/components/RegionsSelector.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i].id;
	child_ctx[9] = list[i].name;
	child_ctx[10] = list[i].selected;
	return child_ctx;
}

// (32:1) {#if title}
function create_if_block_1(ctx) {
	let h2;
	let t;

	const block = {
		c: function create() {
			h2 = element("h2");
			t = text(/*title*/ ctx[0]);
			this.h();
		},
		l: function claim(nodes) {
			h2 = claim_element(nodes, "H2", {});
			var h2_nodes = children(h2);
			t = claim_text(h2_nodes, /*title*/ ctx[0]);
			h2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(h2, file$1, 32, 2, 709);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);
			append_dev(h2, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*title*/ 1) set_data_dev(t, /*title*/ ctx[0]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(32:1) {#if title}",
		ctx
	});

	return block;
}

// (49:5) {:else}
function create_else_block(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: { glyph: Square, size: 20 },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(icon.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(icon.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p: noop$1,
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(icon, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(49:5) {:else}",
		ctx
	});

	return block;
}

// (44:5) {#if selected}
function create_if_block$1(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: { glyph: CheckSquare, size: 20 },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(icon.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(icon.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p: noop$1,
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(icon, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(44:5) {#if selected}",
		ctx
	});

	return block;
}

// (36:2) {#each $_nutsRegions as {id, name, selected}}
function create_each_block(ctx) {
	let li;
	let span0;
	let current_block_type_index;
	let if_block;
	let t0;
	let span1;
	let t1_value = /*name*/ ctx[9] + "";
	let t1;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block$1, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*selected*/ ctx[10]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			li = element("li");
			span0 = element("span");
			if_block.c();
			t0 = space();
			span1 = element("span");
			t1 = text(t1_value);
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", { class: true });
			var li_nodes = children(li);
			span0 = claim_element(li_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			if_block.l(span0_nodes);
			span0_nodes.forEach(detach_dev);
			t0 = claim_space(li_nodes);
			span1 = claim_element(li_nodes, "SPAN", {});
			var span1_nodes = children(span1);
			t1 = claim_text(span1_nodes, t1_value);
			span1_nodes.forEach(detach_dev);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span0, "class", "checker svelte-tohe9z");
			add_location(span0, file$1, 42, 4, 926);
			add_location(span1, file$1, 55, 4, 1134);
			attr_dev(li, "class", "clickable svelte-tohe9z");
			add_location(li, file$1, 36, 3, 790);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, span0);
			if_blocks[current_block_type_index].m(span0, null);
			append_dev(li, t0);
			append_dev(li, span1);
			append_dev(span1, t1);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(
						li,
						"click",
						function () {
							if (is_function(/*onClick*/ ctx[4](/*id*/ ctx[8]))) /*onClick*/ ctx[4](/*id*/ ctx[8]).apply(this, arguments);
						},
						false,
						false,
						false
					),
					listen_dev(
						li,
						"mouseenter",
						function () {
							if (is_function(/*onMouseEnter*/ ctx[2](/*id*/ ctx[8]))) /*onMouseEnter*/ ctx[2](/*id*/ ctx[8]).apply(this, arguments);
						},
						false,
						false,
						false
					),
					listen_dev(
						li,
						"mouseleave",
						function () {
							if (is_function(/*onMouseLeave*/ ctx[3](/*id*/ ctx[8]))) /*onMouseLeave*/ ctx[3](/*id*/ ctx[8]).apply(this, arguments);
						},
						false,
						false,
						false
					)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(span0, null);
			}

			if ((!current || dirty & /*$_nutsRegions*/ 2) && t1_value !== (t1_value = /*name*/ ctx[9] + "")) set_data_dev(t1, t1_value);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			if_blocks[current_block_type_index].d();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(36:2) {#each $_nutsRegions as {id, name, selected}}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let div;
	let t0;
	let ul;
	let t1;
	let li0;
	let span0;
	let t2;
	let t3;
	let span1;
	let icon0;
	let t4;
	let li1;
	let span2;
	let t5;
	let t6;
	let span3;
	let icon1;
	let current;
	let mounted;
	let dispose;
	let if_block = /*title*/ ctx[0] && create_if_block_1(ctx);
	let each_value = /*$_nutsRegions*/ ctx[1];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	icon0 = new Icon({
			props: {
				glyph: CheckSquare,
				size: 20,
				stroke: "palegreen"
			},
			$$inline: true
		});

	icon1 = new Icon({
			props: { glyph: Square, size: 20, stroke: "red" },
			$$inline: true
		});

	const block = {
		c: function create() {
			div = element("div");
			if (if_block) if_block.c();
			t0 = space();
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t1 = space();
			li0 = element("li");
			span0 = element("span");
			t2 = text("Select all");
			t3 = space();
			span1 = element("span");
			create_component(icon0.$$.fragment);
			t4 = space();
			li1 = element("li");
			span2 = element("span");
			t5 = text("Deselect all");
			t6 = space();
			span3 = element("span");
			create_component(icon1.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			if (if_block) if_block.l(div_nodes);
			t0 = claim_space(div_nodes);
			ul = claim_element(div_nodes, "UL", { class: true });
			var ul_nodes = children(ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(ul_nodes);
			}

			t1 = claim_space(ul_nodes);
			li0 = claim_element(ul_nodes, "LI", { class: true });
			var li0_nodes = children(li0);
			span0 = claim_element(li0_nodes, "SPAN", {});
			var span0_nodes = children(span0);
			t2 = claim_text(span0_nodes, "Select all");
			span0_nodes.forEach(detach_dev);
			t3 = claim_space(li0_nodes);
			span1 = claim_element(li0_nodes, "SPAN", { class: true });
			var span1_nodes = children(span1);
			claim_component(icon0.$$.fragment, span1_nodes);
			span1_nodes.forEach(detach_dev);
			li0_nodes.forEach(detach_dev);
			t4 = claim_space(ul_nodes);
			li1 = claim_element(ul_nodes, "LI", { class: true });
			var li1_nodes = children(li1);
			span2 = claim_element(li1_nodes, "SPAN", {});
			var span2_nodes = children(span2);
			t5 = claim_text(span2_nodes, "Deselect all");
			span2_nodes.forEach(detach_dev);
			t6 = claim_space(li1_nodes);
			span3 = claim_element(li1_nodes, "SPAN", { class: true });
			var span3_nodes = children(span3);
			claim_component(icon1.$$.fragment, span3_nodes);
			span3_nodes.forEach(detach_dev);
			li1_nodes.forEach(detach_dev);
			ul_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span0, file$1, 63, 3, 1255);
			attr_dev(span1, "class", "checker svelte-tohe9z");
			add_location(span1, file$1, 64, 3, 1282);
			attr_dev(li0, "class", "end sep clickable svelte-tohe9z");
			add_location(li0, file$1, 59, 2, 1176);
			add_location(span2, file$1, 76, 3, 1484);
			attr_dev(span3, "class", "checker svelte-tohe9z");
			add_location(span3, file$1, 77, 3, 1513);
			attr_dev(li1, "class", "end clickable svelte-tohe9z");
			add_location(li1, file$1, 72, 2, 1407);
			attr_dev(ul, "class", "svelte-tohe9z");
			add_location(ul, file$1, 34, 1, 734);
			attr_dev(div, "class", "RegionsSelector svelte-tohe9z");
			add_location(div, file$1, 27, 0, 629);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if (if_block) if_block.m(div, null);
			append_dev(div, t0);
			append_dev(div, ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			append_dev(ul, t1);
			append_dev(ul, li0);
			append_dev(li0, span0);
			append_dev(span0, t2);
			append_dev(li0, t3);
			append_dev(li0, span1);
			mount_component(icon0, span1, null);
			append_dev(ul, t4);
			append_dev(ul, li1);
			append_dev(li1, span2);
			append_dev(span2, t5);
			append_dev(li1, t6);
			append_dev(li1, span3);
			mount_component(icon1, span3, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(li0, "click", /*click_handler*/ ctx[5], false, false, false),
					listen_dev(li1, "click", /*click_handler_1*/ ctx[6], false, false, false),
					listen_dev(div, "click", stop_propagation(noop), false, false, true)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (/*title*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					if_block.m(div, t0);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*onClick, $_nutsRegions, onMouseEnter, onMouseLeave, CheckSquare, Square*/ 30) {
				each_value = /*$_nutsRegions*/ ctx[1];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(ul, t1);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(icon0.$$.fragment, local);
			transition_in(icon1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(icon0.$$.fragment, local);
			transition_out(icon1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (if_block) if_block.d();
			destroy_each(each_blocks, detaching);
			destroy_component(icon0);
			destroy_component(icon1);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	let $_preselectedNUTS1Id;
	let $_nutsRegions;
	validate_store(_preselectedNUTS1Id, "_preselectedNUTS1Id");
	component_subscribe($$self, _preselectedNUTS1Id, $$value => $$invalidate(7, $_preselectedNUTS1Id = $$value));
	validate_store(_nutsRegions, "_nutsRegions");
	component_subscribe($$self, _nutsRegions, $$value => $$invalidate(1, $_nutsRegions = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("RegionsSelector", slots, []);
	let { title = null } = $$props;

	const onMouseEnter = id => () => {
		set_store_value(_preselectedNUTS1Id, $_preselectedNUTS1Id = id, $_preselectedNUTS1Id);
	};

	const onMouseLeave = () => () => {
		set_store_value(_preselectedNUTS1Id, $_preselectedNUTS1Id = null, $_preselectedNUTS1Id);
	};

	const onClick = id => () => {
		toggleRegionNUTS1(id);
	};

	const writable_props = ["title"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<RegionsSelector> was created with unknown prop '${key}'`);
	});

	const click_handler = () => selectAllRegions();
	const click_handler_1 = () => deselectAllRegions();

	$$self.$$set = $$props => {
		if ("title" in $$props) $$invalidate(0, title = $$props.title);
	};

	$$self.$capture_state = () => ({
		Icon,
		Square,
		CheckSquare,
		noop,
		_nutsRegions,
		_preselectedNUTS1Id,
		deselectAllRegions,
		selectAllRegions,
		toggleRegionNUTS1,
		title,
		onMouseEnter,
		onMouseLeave,
		onClick,
		$_preselectedNUTS1Id,
		$_nutsRegions
	});

	$$self.$inject_state = $$props => {
		if ("title" in $$props) $$invalidate(0, title = $$props.title);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		title,
		$_nutsRegions,
		onMouseEnter,
		onMouseLeave,
		onClick,
		click_handler,
		click_handler_1
	];
}

class RegionsSelector extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { title: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "RegionsSelector",
			options,
			id: create_fragment$1.name
		});
	}

	get title() {
		throw new Error("<RegionsSelector>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<RegionsSelector>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* ../../components/time_region_value/src/node_modules/components/SettingsView.svelte generated by Svelte v3.38.2 */

const file = "../../components/time_region_value/src/node_modules/components/SettingsView.svelte";

// (58:1) {#if flags.showRankingControl}
function create_if_block(ctx) {
	let div;
	let h2;
	let t0;
	let t1;
	let t2;
	let t3;
	let switch_1;
	let current;

	switch_1 = new Switch({
			props: {
				value: "Absolute",
				values: ["Absolute", "Ranking"]
			},
			$$inline: true
		});

	switch_1.$on("toggled", function () {
		if (is_function(/*handlers*/ ctx[0].toggledRanking)) /*handlers*/ ctx[0].toggledRanking.apply(this, arguments);
	});

	const block = {
		c: function create() {
			div = element("div");
			h2 = element("h2");
			t0 = text("3/");
			t1 = text(/*count*/ ctx[2]);
			t2 = text(": Y scale");
			t3 = space();
			create_component(switch_1.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			h2 = claim_element(div_nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t0 = claim_text(h2_nodes, "3/");
			t1 = claim_text(h2_nodes, /*count*/ ctx[2]);
			t2 = claim_text(h2_nodes, ": Y scale");
			h2_nodes.forEach(detach_dev);
			t3 = claim_space(div_nodes);
			claim_component(switch_1.$$.fragment, div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h2, "class", "svelte-w1ktf1");
			add_location(h2, file, 59, 3, 1223);
			attr_dev(div, "class", "setting svelte-w1ktf1");
			add_location(div, file, 58, 2, 1198);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, h2);
			append_dev(h2, t0);
			append_dev(h2, t1);
			append_dev(h2, t2);
			append_dev(div, t3);
			mount_component(switch_1, div, null);
			current = true;
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (!current || dirty & /*count*/ 4) set_data_dev(t1, /*count*/ ctx[2]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(switch_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(switch_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(switch_1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(58:1) {#if flags.showRankingControl}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div3;
	let div1;
	let h20;
	let t0;
	let t1;
	let t2;
	let t3;
	let switch0;
	let t4;
	let div0;
	let regionsselector;
	let t5;
	let div2;
	let h21;
	let t6;
	let t7;
	let t8;
	let t9;
	let switch1;
	let t10;
	let current;

	switch0 = new Switch({
			props: {
				value: /*flags*/ ctx[1].doFilter ? "Filter" : "Highlight",
				values: ["Highlight", "Filter"]
			},
			$$inline: true
		});

	switch0.$on("toggled", function () {
		if (is_function(/*handlers*/ ctx[0].toggledFiltering)) /*handlers*/ ctx[0].toggledFiltering.apply(this, arguments);
	});

	regionsselector = new RegionsSelector({ $$inline: true });

	switch1 = new Switch({
			props: {
				value: /*$_colorSchemeLabel*/ ctx[3],
				values: /*$_colorSchemeLabels*/ ctx[4]
			},
			$$inline: true
		});

	switch1.$on("toggled", toggleColorScheme);
	let if_block = /*flags*/ ctx[1].showRankingControl && create_if_block(ctx);

	const block = {
		c: function create() {
			div3 = element("div");
			div1 = element("div");
			h20 = element("h2");
			t0 = text("1/");
			t1 = text(/*count*/ ctx[2]);
			t2 = text(": NUTS1 regions");
			t3 = space();
			create_component(switch0.$$.fragment);
			t4 = space();
			div0 = element("div");
			create_component(regionsselector.$$.fragment);
			t5 = space();
			div2 = element("div");
			h21 = element("h2");
			t6 = text("2/");
			t7 = text(/*count*/ ctx[2]);
			t8 = text(": Color scale");
			t9 = space();
			create_component(switch1.$$.fragment);
			t10 = space();
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			div3 = claim_element(nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			div1 = claim_element(div3_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			h20 = claim_element(div1_nodes, "H2", { class: true });
			var h20_nodes = children(h20);
			t0 = claim_text(h20_nodes, "1/");
			t1 = claim_text(h20_nodes, /*count*/ ctx[2]);
			t2 = claim_text(h20_nodes, ": NUTS1 regions");
			h20_nodes.forEach(detach_dev);
			t3 = claim_space(div1_nodes);
			claim_component(switch0.$$.fragment, div1_nodes);
			t4 = claim_space(div1_nodes);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			claim_component(regionsselector.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			t5 = claim_space(div3_nodes);
			div2 = claim_element(div3_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			h21 = claim_element(div2_nodes, "H2", { class: true });
			var h21_nodes = children(h21);
			t6 = claim_text(h21_nodes, "2/");
			t7 = claim_text(h21_nodes, /*count*/ ctx[2]);
			t8 = claim_text(h21_nodes, ": Color scale");
			h21_nodes.forEach(detach_dev);
			t9 = claim_space(div2_nodes);
			claim_component(switch1.$$.fragment, div2_nodes);
			div2_nodes.forEach(detach_dev);
			t10 = claim_space(div3_nodes);
			if (if_block) if_block.l(div3_nodes);
			div3_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h20, "class", "svelte-w1ktf1");
			add_location(h20, file, 33, 2, 703);
			attr_dev(div0, "class", "regions svelte-w1ktf1");
			add_location(div0, file, 39, 2, 883);
			attr_dev(div1, "class", "setting svelte-w1ktf1");
			add_location(div1, file, 32, 1, 679);
			attr_dev(h21, "class", "svelte-w1ktf1");
			add_location(h21, file, 47, 2, 993);
			attr_dev(div2, "class", "setting svelte-w1ktf1");
			add_location(div2, file, 46, 1, 969);
			attr_dev(div3, "class", "SettingsView svelte-w1ktf1");
			add_location(div3, file, 28, 0, 625);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div3, anchor);
			append_dev(div3, div1);
			append_dev(div1, h20);
			append_dev(h20, t0);
			append_dev(h20, t1);
			append_dev(h20, t2);
			append_dev(div1, t3);
			mount_component(switch0, div1, null);
			append_dev(div1, t4);
			append_dev(div1, div0);
			mount_component(regionsselector, div0, null);
			append_dev(div3, t5);
			append_dev(div3, div2);
			append_dev(div2, h21);
			append_dev(h21, t6);
			append_dev(h21, t7);
			append_dev(h21, t8);
			append_dev(div2, t9);
			mount_component(switch1, div2, null);
			append_dev(div3, t10);
			if (if_block) if_block.m(div3, null);
			current = true;
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;
			if (!current || dirty & /*count*/ 4) set_data_dev(t1, /*count*/ ctx[2]);
			const switch0_changes = {};
			if (dirty & /*flags*/ 2) switch0_changes.value = /*flags*/ ctx[1].doFilter ? "Filter" : "Highlight";
			switch0.$set(switch0_changes);
			if (!current || dirty & /*count*/ 4) set_data_dev(t7, /*count*/ ctx[2]);
			const switch1_changes = {};
			if (dirty & /*$_colorSchemeLabel*/ 8) switch1_changes.value = /*$_colorSchemeLabel*/ ctx[3];
			if (dirty & /*$_colorSchemeLabels*/ 16) switch1_changes.values = /*$_colorSchemeLabels*/ ctx[4];
			switch1.$set(switch1_changes);

			if (/*flags*/ ctx[1].showRankingControl) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*flags*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div3, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(switch0.$$.fragment, local);
			transition_in(regionsselector.$$.fragment, local);
			transition_in(switch1.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(switch0.$$.fragment, local);
			transition_out(regionsselector.$$.fragment, local);
			transition_out(switch1.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div3);
			destroy_component(switch0);
			destroy_component(regionsselector);
			destroy_component(switch1);
			if (if_block) if_block.d();
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
	let count;
	let $_colorSchemeLabel;
	let $_colorSchemeLabels;
	validate_store(_colorSchemeLabel, "_colorSchemeLabel");
	component_subscribe($$self, _colorSchemeLabel, $$value => $$invalidate(3, $_colorSchemeLabel = $$value));
	validate_store(_colorSchemeLabels, "_colorSchemeLabels");
	component_subscribe($$self, _colorSchemeLabels, $$value => $$invalidate(4, $_colorSchemeLabels = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("SettingsView", slots, []);

	const defaultHandlers = {
		toggledFiltering: null,
		toggledRanking: null
	};

	let { flags = {
		doFilter: false,
		showRankingControl: false
	} } = $$props;

	let { handlers = defaultHandlers } = $$props;
	const writable_props = ["flags", "handlers"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SettingsView> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("flags" in $$props) $$invalidate(1, flags = $$props.flags);
		if ("handlers" in $$props) $$invalidate(0, handlers = $$props.handlers);
	};

	$$self.$capture_state = () => ({
		Switch,
		RegionsSelector,
		_colorSchemeLabel,
		_colorSchemeLabels,
		_theme,
		toggleColorScheme,
		defaultHandlers,
		flags,
		handlers,
		count,
		$_colorSchemeLabel,
		$_colorSchemeLabels
	});

	$$self.$inject_state = $$props => {
		if ("flags" in $$props) $$invalidate(1, flags = $$props.flags);
		if ("handlers" in $$props) $$invalidate(0, handlers = $$props.handlers);
		if ("count" in $$props) $$invalidate(2, count = $$props.count);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*handlers*/ 1) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			$$invalidate(0, handlers = handlers
			? { ...defaultHandlers, ...handlers }
			: defaultHandlers);
		}

		if ($$self.$$.dirty & /*flags*/ 2) {
			$$invalidate(2, count = flags.showRankingControl ? 3 : 2);
		}
	};

	return [handlers, flags, count, $_colorSchemeLabel, $_colorSchemeLabels];
}

class SettingsView extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { flags: 1, handlers: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "SettingsView",
			options,
			id: create_fragment.name
		});
	}

	get flags() {
		throw new Error("<SettingsView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set flags(value) {
		throw new Error("<SettingsView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get handlers() {
		throw new Error("<SettingsView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set handlers(value) {
		throw new Error("<SettingsView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var yearlyKeyToLabel = {
	2003: {
		UKC1: 'Tees Valley and Durham',
		UKC2: 'Northumberland and Tyne and Wear',
		UKD1: 'Cumbria',
		UKD2: 'Cheshire',
		UKD3: 'Greater Manchester',
		UKD4: 'Lancashire',
		UKD5: 'Merseyside',
		UKE1: 'East Riding and North Lincolnshire',
		UKE2: 'North Yorkshire',
		UKE3: 'South Yorkshire',
		UKE4: 'West Yorkshire',
		UKF1: 'Derbyshire and Nottinghamshire',
		UKF2: 'Leicestershire, Rutland and Northamptonshire',
		UKF3: 'Lincolnshire',
		UKG1: 'Herefordshire, Worcestershire and Warwickshire',
		UKG2: 'Shropshire and Staffordshire',
		UKG3: 'West Midlands',
		UKH1: 'East Anglia',
		UKH2: 'Bedfordshire and Hertfordshire',
		UKH3: 'Essex',
		UKI1: 'Inner London',
		UKI2: 'Outer London',
		UKJ1: 'Berkshire, Buckinghamshire and Oxfordshire',
		UKJ2: 'Surrey, East and West Sussex',
		UKJ3: 'Hampshire and Isle of Wight',
		UKJ4: 'Kent',
		UKK1: 'Gloucestershire, Wiltshire and North Somerset',
		UKK2: 'Dorset and Somerset',
		UKK3: 'Cornwall and Isles of Scilly',
		UKK4: 'Devon',
		UKL1: 'West Wales and The Valleys',
		UKL2: 'East Wales',
		UKM1: 'North Eastern Scotland',
		UKM2: 'Eastern Scotland',
		UKM3: 'South Western Scotland',
		UKM4: 'Highlands and Islands',
		UKN0: 'Northern Ireland',
		UKZZ: 'Extra-regio',
	},
	2006: {
		UKC1: 'Tees Valley and Durham',
		UKC2: 'Northumberland and Tyne and Wear',
		UKD1: 'Cumbria',
		UKD2: 'Cheshire',
		UKD3: 'Greater Manchester',
		UKD4: 'Lancashire',
		UKD5: 'Merseyside',
		UKE1: 'East Yorkshire and Northern Lincolnshire',
		UKE2: 'North Yorkshire',
		UKE3: 'South Yorkshire',
		UKE4: 'West Yorkshire',
		UKF1: 'Derbyshire and Nottinghamshire',
		UKF2: 'Leicestershire, Rutland and Northamptonshire',
		UKF3: 'Lincolnshire',
		UKG1: 'Herefordshire, Worcestershire and Warwickshire',
		UKG2: 'Shropshire and Staffordshire',
		UKG3: 'West Midlands',
		UKH1: 'East Anglia',
		UKH2: 'Bedfordshire and Hertfordshire',
		UKH3: 'Essex',
		UKI1: 'Inner London',
		UKI2: 'Outer London',
		UKJ1: 'Berkshire, Buckinghamshire and Oxfordshire',
		UKJ2: 'Surrey, East and West Sussex',
		UKJ3: 'Hampshire and Isle of Wight',
		UKJ4: 'Kent',
		UKK1: 'Gloucestershire, Wiltshire and Bristol/Bath area',
		UKK2: 'Dorset and Somerset',
		UKK3: 'Cornwall and Isles of Scilly',
		UKK4: 'Devon',
		UKL1: 'West Wales and The Valleys',
		UKL2: 'East Wales',
		UKM2: 'Eastern Scotland',
		UKM3: 'South Western Scotland',
		UKM5: 'North Eastern Scotland',
		UKM6: 'Highlands and Islands',
		UKN0: 'Northern Ireland',
		UKZZ: 'Extra-regio',
	},
	2010: {
		UKC1: 'Tees Valley and Durham',
		UKC2: 'Northumberland and Tyne and Wear',
		UKD1: 'Cumbria',
		UKD3: 'Greater Manchester',
		UKD4: 'Lancashire',
		UKD6: 'Cheshire',
		UKD7: 'Merseyside',
		UKE1: 'East Yorkshire and Northern Lincolnshire',
		UKE2: 'North Yorkshire',
		UKE3: 'South Yorkshire',
		UKE4: 'West Yorkshire',
		UKF1: 'Derbyshire and Nottinghamshire',
		UKF2: 'Leicestershire, Rutland and Northamptonshire',
		UKF3: 'Lincolnshire',
		UKG1: 'Herefordshire, Worcestershire and Warwickshire',
		UKG2: 'Shropshire and Staffordshire',
		UKG3: 'West Midlands',
		UKH1: 'East Anglia',
		UKH2: 'Bedfordshire and Hertfordshire',
		UKH3: 'Essex',
		UKI1: 'Inner London',
		UKI2: 'Outer London',
		UKJ1: 'Berkshire, Buckinghamshire and Oxfordshire',
		UKJ2: 'Surrey, East and West Sussex',
		UKJ3: 'Hampshire and Isle of Wight',
		UKJ4: 'Kent',
		UKK1: 'Gloucestershire, Wiltshire and Bristol/Bath area',
		UKK2: 'Dorset and Somerset',
		UKK3: 'Cornwall and Isles of Scilly',
		UKK4: 'Devon',
		UKL1: 'West Wales and The Valleys',
		UKL2: 'East Wales',
		UKM2: 'Eastern Scotland',
		UKM3: 'South Western Scotland',
		UKM5: 'North Eastern Scotland',
		UKM6: 'Highlands and Islands',
		UKN0: 'Northern Ireland',
		UKZZ: 'Extra-regio',
	},
	2013: {
		UKC1: 'Tees Valley and Durham',
		UKC2: 'Northumberland and Tyne and Wear',
		UKD1: 'Cumbria',
		UKD3: 'Greater Manchester',
		UKD4: 'Lancashire',
		UKD6: 'Cheshire',
		UKD7: 'Merseyside',
		UKE1: 'East Yorkshire and Northern Lincolnshire',
		UKE2: 'North Yorkshire',
		UKE3: 'South Yorkshire',
		UKE4: 'West Yorkshire',
		UKF1: 'Derbyshire and Nottinghamshire',
		UKF2: 'Leicestershire, Rutland and Northamptonshire',
		UKF3: 'Lincolnshire',
		UKG1: 'Herefordshire, Worcestershire and Warwickshire',
		UKG2: 'Shropshire and Staffordshire',
		UKG3: 'West Midlands',
		UKH1: 'East Anglia',
		UKH2: 'Bedfordshire and Hertfordshire',
		UKH3: 'Essex',
		UKI3: 'Inner London - West',
		UKI4: 'Inner London - East',
		UKI5: 'Outer London - East and North East',
		UKI6: 'Outer London - South',
		UKI7: 'Outer London - West and North West',
		UKJ1: 'Berkshire, Buckinghamshire and Oxfordshire',
		UKJ2: 'Surrey, East and West Sussex',
		UKJ3: 'Hampshire and Isle of Wight',
		UKJ4: 'Kent',
		UKK1: 'Gloucestershire, Wiltshire and Bristol/Bath area',
		UKK2: 'Dorset and Somerset',
		UKK3: 'Cornwall and Isles of Scilly',
		UKK4: 'Devon',
		UKL1: 'West Wales and The Valleys',
		UKL2: 'East Wales',
		UKM2: 'Eastern Scotland',
		UKM3: 'South Western Scotland',
		UKM5: 'North Eastern Scotland',
		UKM6: 'Highlands and Islands',
		UKN0: 'Northern Ireland',
		UKZZ: 'Extra-regio',
	},
	2016: {
		UKC1: 'Tees Valley and Durham',
		UKC2: 'Northumberland and Tyne and Wear',
		UKD1: 'Cumbria',
		UKD3: 'Greater Manchester',
		UKD4: 'Lancashire',
		UKD6: 'Cheshire',
		UKD7: 'Merseyside',
		UKE1: 'East Yorkshire and Northern Lincolnshire',
		UKE2: 'North Yorkshire',
		UKE3: 'South Yorkshire',
		UKE4: 'West Yorkshire',
		UKF1: 'Derbyshire and Nottinghamshire',
		UKF2: 'Leicestershire, Rutland and Northamptonshire',
		UKF3: 'Lincolnshire',
		UKG1: 'Herefordshire, Worcestershire and Warwickshire',
		UKG2: 'Shropshire and Staffordshire',
		UKG3: 'West Midlands',
		UKH1: 'East Anglia',
		UKH2: 'Bedfordshire and Hertfordshire',
		UKH3: 'Essex',
		UKI3: 'Inner London - West',
		UKI4: 'Inner London - East',
		UKI5: 'Outer London - East and North East',
		UKI6: 'Outer London - South',
		UKI7: 'Outer London - West and North West',
		UKJ1: 'Berkshire, Buckinghamshire and Oxfordshire',
		UKJ2: 'Surrey, East and West Sussex',
		UKJ3: 'Hampshire and Isle of Wight',
		UKJ4: 'Kent',
		UKK1: 'Gloucestershire, Wiltshire and Bristol/Bath area',
		UKK2: 'Dorset and Somerset',
		UKK3: 'Cornwall and Isles of Scilly',
		UKK4: 'Devon',
		UKL1: 'West Wales and The Valleys',
		UKL2: 'East Wales',
		UKM5: 'North Eastern Scotland',
		UKM6: 'Highlands and Islands',
		UKM7: 'Eastern Scotland',
		UKM8: 'West Central Scotland',
		UKM9: 'Southern Scotland',
		UKN0: 'Northern Ireland',
		UKZZ: 'Extra-regio',
	}
};

// modal utils

const hidden = {isVisible: false};
const toggleIsVisible = transformValues({isVisible: negate});

/* geo modal */

const _geoModal = writable(hidden);
const hideGeoModal = () => _geoModal.set(hidden);
const toggleGeoModal = () => _geoModal.update(toggleIsVisible);

// selection mode

const _doFilterRegions = writable(false);

/* info modal */

const _infoModal = writable(hidden);
const hideInfoModal = () => _infoModal.set(hidden);
const toggleInfoModal = () => _infoModal.update(toggleIsVisible);

var config = {
	noDataMessage: 'No data'
};

var data = { Date_YYYYMMDD:{ format:"YYYYMMDD",
    kind:"date",
    type:"Datestring" },
  URL:{ kind:"uri",
    type:"string" },
  NutsRegion:{ level:"int",
    name:"GeoRegion.name",
    nuts_id:"GeoRegion.<region_type>_id",
    nuts_year_enforced:"GeoRegion.<region_type>_year_enforced",
    nuts_year_spec:"GeoRegion.<region_type>_year_spec",
    region_type:"nuts",
    source_url:"GeoRegion.source_url",
    source:"GeoRegion.source",
    type:"GeoRegion" },
  LepRegion:{ lep_id:"GeoRegion.id",
    lep_year_enforced:"GeoRegion.year_enforced",
    lep_year_spec:"GeoRegion.year_spec",
    name:"GeoRegion.name",
    region_type:"lep",
    source_url:"GeoRegion.source_url",
    source:"GeoRegion.source",
    type:"GeoRegion" },
  EUR:{ kind:"currency",
    label:"Euro",
    data_type:"int|float",
    unit_string:"EUR",
    type:"Unit" },
  GBP:{ kind:"currency",
    label:"British Pound",
    data_type:"int|float",
    unit_string:"GBP",
    type:"Unit" },
  USD:{ kind:"currency",
    label:"US Dollar",
    data_type:"int|float",
    unit_string:"USD",
    type:"Unit" },
  GravimetricUnit:{ kind:"density",
    label:"Gravimetric Units",
    data_type:"int|float",
    unit_string:"µg m^-3",
    type:"Unit" },
  Area_hectare:{ kind:"area",
    label:"Hectare",
    data_type:"int|float",
    unit_string:"hectare",
    type:"Unit" },
  REF:{ kind:"score",
    label:"REF score",
    data_type:"int|float",
    unit_string:"REF Score (1-4)",
    type:"Unit" },
  FTE:{ kind:"score",
    label:"Full Time Equivalent",
    data_type:"float",
    unit_string:"FTE",
    type:"Unit" },
  BitTransferRate:{ kind:"bit transfer rate",
    data_type:"float",
    unit_string:"Mb/s",
    type:"Unit" } };
data.Date_YYYYMMDD;
data.URL;
data.NutsRegion;
data.LepRegion;
data.EUR;
data.GBP;
data.USD;
data.GravimetricUnit;
data.Area_hectare;
data.REF;
data.FTE;
data.BitTransferRate;

export { GeoFilterModal as G, Header as H, InfoModal as I, SettingsRow as S, _doFilterRegions as _, InfoView as a, SettingsView as b, _geoModal as c, _infoModal as d, hideInfoModal as e, toggleGeoModal as f, getNutsId as g, hideGeoModal as h, _preselectedNUTS2Ids as i, _selectedNUT2Ids as j, _someUnselectedRegions as k, config as l, data as m, parseCSV as p, sortAscByYear as s, toggleInfoModal as t, yearlyKeyToLabel as y };
