function noop() { }
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
        src_url_equal_anchor = document.createElement('a');
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i = 0; i < length; i++) {
            dirty[i] = -1;
        }
        return dirty;
    }
    return -1;
}
function null_to_empty(value) {
    return value == null ? '' : value;
}
function set_store_value(store, ret, value) {
    store.set(value);
    return ret;
}
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

// Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
// at the end of hydration without touching the remaining nodes.
let is_hydrating = false;
function start_hydrating() {
    is_hydrating = true;
}
function end_hydrating() {
    is_hydrating = false;
}
function upper_bound(low, high, key, value) {
    // Return first index of value larger than input value in the range [low, high)
    while (low < high) {
        const mid = low + ((high - low) >> 1);
        if (key(mid) <= value) {
            low = mid + 1;
        }
        else {
            high = mid;
        }
    }
    return low;
}
function init_hydrate(target) {
    if (target.hydrate_init)
        return;
    target.hydrate_init = true;
    // We know that all children have claim_order values since the unclaimed have been detached if target is not <head>
    let children = target.childNodes;
    // If target is <head>, there may be children without claim_order
    if (target.nodeName === 'HEAD') {
        const myChildren = [];
        for (let i = 0; i < children.length; i++) {
            const node = children[i];
            if (node.claim_order !== undefined) {
                myChildren.push(node);
            }
        }
        children = myChildren;
    }
    /*
    * Reorder claimed children optimally.
    * We can reorder claimed children optimally by finding the longest subsequence of
    * nodes that are already claimed in order and only moving the rest. The longest
    * subsequence subsequence of nodes that are claimed in order can be found by
    * computing the longest increasing subsequence of .claim_order values.
    *
    * This algorithm is optimal in generating the least amount of reorder operations
    * possible.
    *
    * Proof:
    * We know that, given a set of reordering operations, the nodes that do not move
    * always form an increasing subsequence, since they do not move among each other
    * meaning that they must be already ordered among each other. Thus, the maximal
    * set of nodes that do not move form a longest increasing subsequence.
    */
    // Compute longest increasing subsequence
    // m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j
    const m = new Int32Array(children.length + 1);
    // Predecessor indices + 1
    const p = new Int32Array(children.length);
    m[0] = -1;
    let longest = 0;
    for (let i = 0; i < children.length; i++) {
        const current = children[i].claim_order;
        // Find the largest subsequence length such that it ends in a value less than our current value
        // upper_bound returns first greater value, so we subtract one
        // with fast path for when we are on the current longest subsequence
        const seqLen = ((longest > 0 && children[m[longest]].claim_order <= current) ? longest + 1 : upper_bound(1, longest, idx => children[m[idx]].claim_order, current)) - 1;
        p[i] = m[seqLen] + 1;
        const newLen = seqLen + 1;
        // We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.
        m[newLen] = i;
        longest = Math.max(newLen, longest);
    }
    // The longest increasing subsequence of nodes (initially reversed)
    const lis = [];
    // The rest of the nodes, nodes that will be moved
    const toMove = [];
    let last = children.length - 1;
    for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
        lis.push(children[cur - 1]);
        for (; last >= cur; last--) {
            toMove.push(children[last]);
        }
        last--;
    }
    for (; last >= 0; last--) {
        toMove.push(children[last]);
    }
    lis.reverse();
    // We sort the nodes being moved to guarantee that their insertion order matches the claim order
    toMove.sort((a, b) => a.claim_order - b.claim_order);
    // Finally, we move the nodes
    for (let i = 0, j = 0; i < toMove.length; i++) {
        while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
            j++;
        }
        const anchor = j < lis.length ? lis[j] : null;
        target.insertBefore(toMove[i], anchor);
    }
}
function append$1(target, node) {
    target.appendChild(node);
}
function append_hydration(target, node) {
    if (is_hydrating) {
        init_hydrate(target);
        if ((target.actual_end_child === undefined) || ((target.actual_end_child !== null) && (target.actual_end_child.parentElement !== target))) {
            target.actual_end_child = target.firstChild;
        }
        // Skip nodes of undefined ordering
        while ((target.actual_end_child !== null) && (target.actual_end_child.claim_order === undefined)) {
            target.actual_end_child = target.actual_end_child.nextSibling;
        }
        if (node !== target.actual_end_child) {
            // We only insert if the ordering of this node should be modified or the parent node is not target
            if (node.claim_order !== undefined || node.parentNode !== target) {
                target.insertBefore(node, target.actual_end_child);
            }
        }
        else {
            target.actual_end_child = node.nextSibling;
        }
    }
    else if (node.parentNode !== target || node.nextSibling !== null) {
        target.appendChild(node);
    }
}
function insert_hydration(target, node, anchor) {
    if (is_hydrating && !anchor) {
        append_hydration(target, node);
    }
    else if (node.parentNode !== target || node.nextSibling != anchor) {
        target.insertBefore(node, anchor || null);
    }
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function stop_propagation(fn) {
    return function (event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function init_claim_info(nodes) {
    if (nodes.claim_info === undefined) {
        nodes.claim_info = { last_index: 0, total_claimed: 0 };
    }
}
function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
    // Try to find nodes in an order such that we lengthen the longest increasing subsequence
    init_claim_info(nodes);
    const resultNode = (() => {
        // We first try to find an element after the previous one
        for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
            const node = nodes[i];
            if (predicate(node)) {
                const replacement = processNode(node);
                if (replacement === undefined) {
                    nodes.splice(i, 1);
                }
                else {
                    nodes[i] = replacement;
                }
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                return node;
            }
        }
        // Otherwise, we try to find one before
        // We iterate in reverse so that we don't go too far back
        for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
            const node = nodes[i];
            if (predicate(node)) {
                const replacement = processNode(node);
                if (replacement === undefined) {
                    nodes.splice(i, 1);
                }
                else {
                    nodes[i] = replacement;
                }
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                else if (replacement === undefined) {
                    // Since we spliced before the last_index, we decrease it
                    nodes.claim_info.last_index--;
                }
                return node;
            }
        }
        // If we can't find any matching node, we create a new one
        return createNode();
    })();
    resultNode.claim_order = nodes.claim_info.total_claimed;
    nodes.claim_info.total_claimed += 1;
    return resultNode;
}
function claim_element_base(nodes, name, attributes, create_element) {
    return claim_node(nodes, (node) => node.nodeName === name, (node) => {
        const remove = [];
        for (let j = 0; j < node.attributes.length; j++) {
            const attribute = node.attributes[j];
            if (!attributes[attribute.name]) {
                remove.push(attribute.name);
            }
        }
        remove.forEach(v => node.removeAttribute(v));
        return undefined;
    }, () => create_element(name));
}
function claim_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, element);
}
function claim_svg_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, svg_element);
}
function claim_text(nodes, data) {
    return claim_node(nodes, (node) => node.nodeType === 3, (node) => {
        const dataStr = '' + data;
        if (node.data.startsWith(dataStr)) {
            if (node.data.length !== dataStr.length) {
                return node.splitText(dataStr.length);
            }
        }
        else {
            node.data = dataStr;
        }
    }, () => text(data), true // Text nodes should not update last index since it is likely not worth it to eliminate an increasing subsequence of actual elements
    );
}
function claim_space(nodes) {
    return claim_text(nodes, ' ');
}
function set_style(node, key, value, important) {
    node.style.setProperty(key, value, important ? 'important' : '');
}
// unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead
let crossorigin;
function is_crossorigin() {
    if (crossorigin === undefined) {
        crossorigin = false;
        try {
            if (typeof window !== 'undefined' && window.parent) {
                void window.parent.document;
            }
        }
        catch (error) {
            crossorigin = true;
        }
    }
    return crossorigin;
}
function add_resize_listener(node, fn) {
    const computed_style = getComputedStyle(node);
    if (computed_style.position === 'static') {
        node.style.position = 'relative';
    }
    const iframe = element('iframe');
    iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
        'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    const crossorigin = is_crossorigin();
    let unsubscribe;
    if (crossorigin) {
        iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
        unsubscribe = listen(window, 'message', (event) => {
            if (event.source === iframe.contentWindow)
                fn();
        });
    }
    else {
        iframe.src = 'about:blank';
        iframe.onload = () => {
            unsubscribe = listen(iframe.contentWindow, 'resize', fn);
        };
    }
    append$1(node, iframe);
    return () => {
        if (crossorigin) {
            unsubscribe();
        }
        else if (unsubscribe && iframe.contentWindow) {
            unsubscribe();
        }
        detach(iframe);
    };
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail, bubbles = false) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, false, detail);
    return e;
}
function query_selector_all(selector, parent = document.body) {
    return Array.from(parent.querySelectorAll(selector));
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        // @ts-ignore
        callbacks.slice().forEach(fn => fn.call(this, event));
    }
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);

function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}
function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for (let i = 0; i < list.length; i++) {
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) {
            throw new Error('Cannot have duplicate keys in a keyed each');
        }
        keys.add(key);
    }
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

function bind$1(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init$2(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            start_hydrating();
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        end_hydrating();
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.2' }, detail), true));
}
function append_hydration_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append_hydration(target, node);
}
function insert_hydration_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert_hydration(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev('SvelteDOMSetProperty', { node, property, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}

const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe
    };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = new Set();
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (const subscriber of subscribers) {
                    subscriber[1]();
                    subscriber_queue.push(subscriber, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.add(subscriber);
        if (subscribers.size === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            subscribers.delete(subscriber);
            if (subscribers.size === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}
function derived(stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single
        ? [stores]
        : stores;
    const auto = fn.length < 2;
    return readable(initial_value, (set) => {
        let inited = false;
        const values = [];
        let pending = 0;
        let cleanup = noop;
        const sync = () => {
            if (pending) {
                return;
            }
            cleanup();
            const result = fn(single ? values[0] : values, set);
            if (auto) {
                set(result);
            }
            else {
                cleanup = is_function(result) ? result : noop;
            }
        };
        const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
            values[i] = value;
            pending &= ~(1 << i);
            if (inited) {
                sync();
            }
        }, () => {
            pending |= (1 << i);
        }));
        inited = true;
        sync();
        return function stop() {
            run_all(unsubscribers);
            cleanup();
        };
    });
}

const CONTEXT_KEY = {};

/**
* @overview lamb - A lightweight, and docile, JavaScript library to help embracing functional programming.
* @author Andrea Scartabelli <andrea.scartabelli@gmail.com>
* @version 0.60.0
* @module lamb
* @license MIT
*/
/**
 * The placeholder object used in partial application.
 * @memberof module:lamb
 * @alias module:lamb.__
 * @category Special properties
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.57.0
 * @type {Object}
 */
var __ = {};

/**
 * Builds a function that returns a constant value.
 * It's actually the simplest form of the K combinator or Kestrel.
 * @example
 * const truth = _.always(true);
 *
 * truth() // => true
 * truth(false) // => true
 * truth(1, 2) // => true
 *
 * // the value being returned is actually the
 * // very same value passed to the function
 * const foo = {bar: "baz"};
 * const alwaysFoo = _.always(foo);
 *
 * alwaysFoo() === foo // => true
 *
 * @memberof module:lamb
 * @category Function
 * @see [SKI combinator calculus]{@link https://en.wikipedia.org/wiki/SKI_combinator_calculus}
 * @since 0.1.0
 * @param {*} value
 * @returns {Function}
 */
function always (value) {
    return function () {
        return value;
    };
}

/**
 * Verifies that the two supplied values are the same value using the "SameValueZero" comparison.<br/>
 * With this comparison <code>NaN</code> is equal to itself, but <code>0</code> and <code>-0</code> are
 * considered the same value.<br/>
 * See also {@link module:lamb.isSVZ|isSVZ} for a curried version building a predicate and
 * {@link module:lamb.areSame|areSame} and {@link module:lamb.is|is} to perform a "SameValue" comparison.
 * @example
 * const testObject = {};
 *
 * _.areSVZ({}, testObject) // => false
 * _.areSVZ(testObject, testObject) // => true
 * _.areSVZ("foo", "foo") // => true
 * _.areSVZ(0, -0) // => true
 * _.areSVZ(0 / 0, NaN) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.isSVZ|isSVZ}
 * @see {@link module:lamb.areSame|areSame}, {@link module:lamb.is|is}
 * @see [SameValue comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevalue}
 * @see [SameValueZero comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero}
 * @since 0.50.0
 * @param {*} a
 * @param {*} b
 * @returns {Boolean}
 */
function areSVZ (a, b) {
    return a !== a ? b !== b : a === b; // eslint-disable-line no-self-compare
}

/**
 * Builds a function that passes only two arguments to the given function.<br/>
 * It's simply a shortcut for a common use case of {@link module:lamb.aritize|aritize},
 * exposed for convenience.
 * @example
 * _.list(1, 2, 3, 4, 5) // => [1, 2, 3, 4, 5]
 * _.binary(_.list)(1, 2, 3, 4, 5) // => [1, 2]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.aritize|aritize}
 * @see {@link module:lamb.unary|unary}
 * @since 0.10.0
 * @param {Function} fn
 * @returns {Function}
 */
function binary (fn) {
    return function (a, b) {
        return fn.call(this, a, b);
    };
}

/**
 * "Clamps" a number within the given limits, both included.<br/>
 * The function will convert to number all its parameters before starting any
 * evaluation, and will return <code>NaN</code> if <code>min</code> is greater
 * than <code>max</code>.
 * @example
 * _.clamp(-5, 0, 10) // => 0
 * _.clamp(5, 0, 10) // => 5
 * _.clamp(15, 0, 10) // => 10
 * _.clamp(0, 0, 10) // => 0
 * _.clamp(10, 0, 10) // => 10
 * _.is(_.clamp(-0, 0, 10), -0) // => true
 * _.clamp(10, 20, 15) // => NaN
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.clampWithin|clampWithin}
 * @since 0.13.0
 * @param {Number} n
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
function clamp (n, min, max) {
    n = +n;
    min = +min;
    max = +max;

    if (min > max) {
        return NaN;
    } else {
        return n < min ? min : n > max ? max : n;
    }
}

/**
 * Builds a partially applied function.<br/>
 * The {@link module:lamb.__|__} object can be used as a placeholder for arguments.<br/>
 * @example
 * const __ = _.__;
 * const users = [
 *     {id: 1, name: "John", active: true, confirmedMail: true},
 *     {id: 2, name: "Jane", active: true, confirmedMail: false},
 *     {id: 3, name: "Mario", active: false, confirmedMail: false}
 * ];
 * const isKeyTrue = _.partial(_.hasKeyValue, [__, true]);
 * const isActive = isKeyTrue("active");
 * const hasConfirmedMail = isKeyTrue("confirmedMail");
 *
 * _.map(users, isActive) // => [true, true, false]
 * _.map(users, hasConfirmedMail) // => [true, false, false]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.__|__} The placeholder object.
 * @since 0.1.0
 * @param {Function} fn
 * @param {Array} args
 * @returns {Function}
 */
function partial (fn, args) {
    return function () {
        if (!Array.isArray(args)) {
            return fn.apply(this, arguments);
        }

        var lastIdx = 0;
        var newArgs = [];
        var argsLen = args.length;

        for (var i = 0, boundArg; i < argsLen; i++) {
            boundArg = args[i];
            newArgs[i] = boundArg === __ ? arguments[lastIdx++] : boundArg;
        }

        for (var len = arguments.length; lastIdx < len; lastIdx++) {
            newArgs[i++] = arguments[lastIdx];
        }

        return fn.apply(this, newArgs);
    };
}

/**
 * Builds a partial application of a ternary function so that its first parameter
 * is expected as the last one.<br/>
 * The <code>shouldAritize</code> parameter is for the "reduce" functions, where
 * the absence of the <code>initialValue</code> transforms a "fold" operation into a
 * "reduce" one.
 * @private
 * @param {Function} fn
 * @param {Boolean} shouldAritize
 * @returns {Function}
 */
function _makePartial3 (fn, shouldAritize) {
    return function (a, b) {
        var f = shouldAritize && arguments.length !== 2 ? binary(fn) : fn;

        return partial(f, [__, a, b]);
    };
}

/**
 * A curried version of {@link module:lamb.clamp|clamp}, expecting a <code>min</code>
 * and a <code>max</code> value, that builds a function waiting for the number to clamp.
 * @example
 * _.clampWithin(0, 10)(-5) // => 0
 * _.clampWithin(0, 10)(5) // => 5
 * _.clampWithin(0, 10)(15) // => 10
 * _.clampWithin(0, 10)(0) // => 0
 * _.clampWithin(0, 10)(10) // => 10
 * _.is(_.clampWithin(0, 10)(-0), -0) // => true
 * _.clampWithin(20, 15)(10) // => NaN
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.clamp|clamp}
 * @since 0.47.0
 * @param {Number} min
 * @param {Number} max
 * @returns {Function}
 */
var clampWithin = _makePartial3(clamp);

/**
 * The I combinator. Any value passed to the function is simply returned as it is.
 * @example
 * const foo = {bar: "baz"};
 *
 * _.identity(foo) === foo // true
 *
 * @memberof module:lamb
 * @category Function
 * @see [SKI combinator calculus]{@link https://en.wikipedia.org/wiki/SKI_combinator_calculus}
 * @since 0.1.0
 * @param {*} value
 * @returns {*} The value passed as parameter.
 */
function identity (value) {
    return value;
}

/**
 * Returns a function that is the composition of the functions given as parameters.
 * The first function consumes the result of the function that follows.
 * @example
 * const sayHi = name => `Hi, ${name}`;
 * const capitalize = s => s[0].toUpperCase() + s.substr(1).toLowerCase();
 * const fixNameAndSayHi = _.compose(sayHi, capitalize);
 *
 * sayHi("bOb") // => "Hi, bOb"
 * fixNameAndSayHi("bOb") // "Hi, Bob"
 *
 * const users = [{name: "fred"}, {name: "bOb"}];
 * const sayHiToUser = _.compose(fixNameAndSayHi, _.getKey("name"));
 *
 * _.map(users, sayHiToUser) // ["Hi, Fred", "Hi, Bob"]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.pipe|pipe}
 * @since 0.1.0
 * @param {Function} a
 * @param {Function} b
 * @returns {Function}
 */
function compose (a, b) {
    return arguments.length ? function () {
        return a.call(this, b.apply(this, arguments));
    } : identity;
}

var MAX_ARRAY_LENGTH = 4294967295;
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Converts a value to a valid array length, thus an integer within
 * <code>0</code> and <code>2<sup>32</sup> - 1</code> (both included).
 * @private
 * @param {*} value
 * @returns {Number}
 */
function _toArrayLength (value) {
    return clamp(value, 0, MAX_ARRAY_LENGTH) >>> 0;
}

/* eslint-disable jsdoc/require-returns-check */

/**
 * Executes the provided <code>iteratee</code> for each element of the given array-like object.<br/>
 * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
 * @example <caption>Adding a CSS class to all elements of a NodeList in a browser environment:</caption>
 * const addClass = _.curry(function (className, element) {
 *     element.classList.add(className);
 * });
 * const paragraphs = document.querySelectorAll("#some-container p");
 *
 * _.forEach(paragraphs, addClass("main"));
 * // each "p" element in the container will have the "main" class now
 *
 * @memberof module:lamb
 * @category Array
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
 * @returns {Undefined}
 */
function forEach (arrayLike, iteratee) {
    for (var i = 0, len = _toArrayLength(arrayLike.length); i < len; i++) {
        iteratee(arrayLike[i], i, arrayLike);
    }
}

/**
 * Creates generic functions out of methods.
 * @author A very little change on a great idea by [Irakli Gozalishvili]{@link https://github.com/Gozala/}.
 * Thanks for this *beautiful* one-liner (never liked your "unbind" naming choice, though).
 * @memberof module:lamb
 * @category Function
 * @function
 * @example
 * const join = _.generic(Array.prototype.join);
 *
 * join([1, 2, 3, 4, 5], "-") // => "1-2-3-4-5"
 *
 * // the function will work with any array-like object
 * join("hello", "-") // => "h-e-l-l-o"
 *
 * @since 0.1.0
 * @param {Function} method
 * @returns {Function}
 */
var generic = Function.bind.bind(Function.call);

/**
 * Verifies if a value is <code>null</code>.
 * @example
 * _.isNull(null) // => true
 * _.isNull(void 0) // => false
 * _.isNull(false) // => false
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.isNil|isNil} if you want to check for <code>undefined</code> too.
 * @since 0.1.0
 * @param {*} value
 * @returns {Boolean}
 */
function isNull (value) {
    return value === null;
}

/**
 * Verifies if a value is <code>undefined</code>.
 * @example
 * _.isUndefined(null) // => false
 * _.isUndefined(void 0) // => true
 * _.isUndefined(false) // => false
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.isNil|isNil} if you want to check for <code>null</code> too.
 * @since 0.1.0
 * @param {*} value
 * @returns {Boolean}
 */
function isUndefined (value) {
    return value === void 0;
}

/**
 * Verifies if a value is <code>null</code> or <code>undefined</code>.
 * @example
 * _.isNil(NaN) // => false
 * _.isNil({}) // => false
 * _.isNil(null) // => true
 * _.isNil(void 0) // => true
 * _.isNil() // => true
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.isNull|isNull}
 * @see {@link module:lamb.isUndefined|isUndefined}
 * @since 0.1.0
 * @param {*} value
 * @returns {Boolean}
 */
function isNil (value) {
    return isNull(value) || isUndefined(value);
}

/**
 * Curries a function of arity 2.
 * @private
 * @param {Function} fn
 * @param {Boolean} [isRightCurry=false]
 * @returns {Function}
 */
function _curry2 (fn, isRightCurry) {
    return function (a) {
        return function (b) {
            return isRightCurry ? fn.call(this, b, a) : fn.call(this, a, b);
        };
    };
}

/**
 * A curried version of {@link module:lamb.areSVZ|areSVZ}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * and the one received by the predicate are the same using the "SameValueZero"
 * comparison.<br/>
 * See also {@link module:lamb.areSame|areSame} and {@link module:lamb.is|is}
 * to perform a "SameValue" comparison.
 * @example
 * const john = {name: "John", surname: "Doe"};
 * const isJohn = _.isSVZ(john);
 * const isZero = _.isSVZ(0);
 * const isReallyNaN = _.isSVZ(NaN);
 *
 * isJohn(john) // => true
 * isJohn({name: "John", surname: "Doe"}) // => false
 *
 * isZero(0) // => true
 * isZero(-0) // => true
 *
 * isNaN(NaN) // => true
 * isNaN("foo") // => true
 *
 * isReallyNaN(NaN) // => true
 * isReallyNaN("foo") // => false
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.areSVZ|areSVZ}
 * @see {@link module:lamb.areSame|areSame}, {@link module:lamb.is|is}
 * @see [SameValue comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevalue}
 * @see [SameValueZero comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero}
 * @since 0.1.0
 * @param {*} value
 * @returns {Function}
 */
var isSVZ = _curry2(areSVZ);

/**
 * Builds a new array by applying the iteratee function to each element of the
 * received array-like object.<br/>
 * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
 * @example
 * _.map(["Joe", "Mario", "Jane"], _.invoke("toUpperCase")) // => ["JOE", "MARIO", "JANE"]
 *
 * _.map([4, 9, 16], Math.sqrt); // => [2, 3, 4]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.mapWith|mapWith}
 * @see {@link module:lamb.flatMap|flatMap}, {@link module:lamb.flatMapWith|flatMapWith}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
 * @returns {Array}
 */
function map (arrayLike, iteratee) {
    var len = _toArrayLength(arrayLike.length);
    var result = Array(len);

    for (var i = 0; i < len; i++) {
        result[i] = iteratee(arrayLike[i], i, arrayLike);
    }

    return result;
}

/**
 * A curried version of {@link module:lamb.map|map} that uses the provided iteratee to
 * build a function expecting the array-like object to act upon.
 * @example
 * const square = n => n ** 2;
 * const getSquares = _.mapWith(square);
 *
 * getSquares([1, 2, 3, 4, 5]) // => [1, 4, 9, 16, 25]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.map|map}
 * @see {@link module:lamb.flatMap|flatMap}, {@link module:lamb.flatMapWith|flatMapWith}
 * @since 0.1.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
var mapWith = _curry2(map, true);

/**
 * Like {@link module:lamb.partial|partial} will build a partially applied function and
 * it will accept placeholders.<br/>
 * The difference is that the bound arguments will be appended to the ones received by
 * the resulting function.
 * @example
 * <caption>Explaining the difference with <code>partial</code>:</caption>
 * const f1 = _.partial(_.list, ["a", "b", "c"]);
 * const f2 = _.partialRight(_.list, ["a", "b", "c"]);
 *
 * f1("d", "e") // => ["a", "b", "c", "d", "e"]
 * f2("d", "e") // => ["d", "e", "a", "b", "c"]
 *
 * @example
 * <caption>Explaining placeholder substitutions:</caption>
 * const __ = _.__;
 * const f1 = _.partial(_.list, ["a", __, __, "d"]);
 * const f2 = _.partialRight(_.list, ["a", __, __, "d"]);
 *
 * f1("b", "c", "e") // => ["a", "b", "c", "d", "e"]
 * f2("b", "c", "e") // => ["b", "a", "c", "e", "d"]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.partial|partial}
 * @see {@link module:lamb.asPartial|asPartial}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.__|__} The placeholder object.
 * @param {Function} fn
 * @param {Array} args
 * @since 0.52.0
 * @returns {Function}
 */
function partialRight (fn, args) {
    return function () {
        if (!Array.isArray(args)) {
            return fn.apply(this, arguments);
        }

        var lastIdx = arguments.length - 1;
        var argsLen = args.length;
        var boundArgs = Array(argsLen);
        var newArgs = [];

        for (var i = argsLen - 1, boundArg; i > -1; i--) {
            boundArg = args[i];
            boundArgs[i] = boundArg === __ ? arguments[lastIdx--] : boundArg;
        }

        for (i = 0; i <= lastIdx; i++) {
            newArgs[i] = arguments[i];
        }

        for (var j = 0; j < argsLen; j++) {
            newArgs[i++] = boundArgs[j];
        }

        return fn.apply(this, newArgs);
    };
}

/**
 * Builds a reduce function. The <code>step</code> parameter must be <code>1</code>
 * to build  {@link module:lamb.reduce|reduce} and <code>-1</code> to build
 * {@link module:lamb.reduceRight|reduceRight}.
 * @private
 * @param {Number} step
 * @returns {Function}
 */
function _makeReducer (step) {
    return function (arrayLike, accumulator, initialValue) {
        var len = _toArrayLength(arrayLike.length);
        var idx = step === 1 ? 0 : len - 1;
        var nCalls;
        var result;

        if (arguments.length === 3) {
            nCalls = len;
            result = initialValue;
        } else {
            if (len === 0) {
                throw new TypeError("Reduce of empty array-like with no initial value");
            }

            result = arrayLike[idx];
            idx += step;
            nCalls = len - 1;
        }

        for (; nCalls--; idx += step) {
            result = accumulator(result, arrayLike[idx], idx, arrayLike);
        }

        return result;
    };
}

/**
 * Reduces (or folds) the values of an array-like object, starting from the first, to a new
 * value using the provided <code>accumulator</code> function.<br/>
 * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
 * @example
 * _.reduce([1, 2, 3, 4], _.sum) // => 10
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.reduceRight|reduceRight}
 * @see {@link module:lamb.reduceWith|reduceWith}, {@link module:lamb.reduceRightWith|reduceRightWith}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {AccumulatorCallback} accumulator
 * @param {*} [initialValue]
 * @returns {*}
 */
var reduce = _makeReducer(1);

/**
 * A partial application of {@link module:lamb.reduce|reduce} that uses the
 * provided <code>accumulator</code> and the optional <code>initialValue</code> to
 * build a function expecting the array-like object to act upon.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.reduceWith(_.sum)(arr) // => 15
 * _.reduceWith(_.subtract)(arr) // => -13
 * _.reduceWith(_.subtract, 0)(arr) // => -15
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.reduceRightWith|reduceRightWith}
 * @see {@link module:lamb.reduce|reduce}, {@link module:lamb.reduce|reduceRight}
 * @since 0.27.0
 * @param {AccumulatorCallback} accumulator
 * @param {*} [initialValue]
 * @returns {Function}
 */
var reduceWith = _makePartial3(reduce, true);

/**
 * Converts a value to an integer.
 * @private
 * @param {*} value
 * @returns {Number}
 */
function _toInteger (value) {
    var n = +value;

    if (n !== n) { // eslint-disable-line no-self-compare
        return 0;
    } else if (n % 1 === 0) {
        return n;
    } else {
        return Math.floor(Math.abs(n)) * (n < 0 ? -1 : 1);
    }
}

/**
 * Builds an array by extracting a portion of an array-like object.<br/>
 * Note that unlike the native array method this function ensures that dense
 * arrays are returned.<br/>
 * Also, unlike the native method, the <code>start</code> and <code>end</code>
 * parameters aren't optional and will be simply converted to integer.<br/>
 * See {@link module:lamb.dropFrom|dropFrom} and {@link module:lamb.drop|drop} if you want a
 * slice to the end of the array-like.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.slice(arr, 0, 2) // => [1, 2]
 * _.slice(arr, 2, -1) // => [3, 4]
 * _.slice(arr, -3, 5) // => [3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.sliceAt|sliceAt}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike - Any array like object.
 * @param {Number} start - Index at which to begin extraction.
 * @param {Number} end - Index at which to end extraction. Extracts up to but not including end.
 * @returns {Array}
 */
function slice (arrayLike, start, end) {
    var len = _toArrayLength(arrayLike.length);
    var begin = _toInteger(start);
    var upTo = _toInteger(end);

    if (begin < 0) {
        begin = begin < -len ? 0 : begin + len;
    }

    if (upTo < 0) {
        upTo = upTo < -len ? 0 : upTo + len;
    } else if (upTo > len) {
        upTo = len;
    }

    var resultLen = upTo - begin;
    var result = resultLen > 0 ? Array(resultLen) : [];

    for (var i = 0; i < resultLen; i++) {
        result[i] = arrayLike[begin + i];
    }

    return result;
}

/**
 * Given the <code>start</code> and <code>end</code> bounds, builds a partial application
 * of {@link module:lamb.slice|slice} expecting the array-like object to slice.<br/>
 * See also {@link module:lamb.dropFrom|dropFrom} and {@link module:lamb.drop|drop} if you want a
 * slice to the end of the array-like.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const s = "hello";
 * const dropFirstAndLast = _.sliceAt(1, -1);
 *
 * dropFirstAndLast(arr) // => [2, 3, 4]
 * dropFirstAndLast(s) // => ["e", "l", "l"]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.slice|slice}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @since 0.48.0
 * @param {Number} start - Index at which to begin extraction.
 * @param {Number} end - Index at which to end extraction. Extracts up to but not including end.
 * @returns {Function}
 */
var sliceAt = _makePartial3(slice);

var objectProtoToString = Object.prototype.toString;

/**
 * Retrieves the "type tag" from the given value.
 * @example
 * const x = 5;
 * const y = new Number(5);
 *
 * typeof x // => "number"
 * typeof y // => "object"
 * _.type(x) // => "Number"
 * _.type(y) // => "Number"
 *
 * _.type(Object.prototype.toString) // => "Function"
 * _.type(/a/) // => "RegExp"
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.isType|isType}
 * @since 0.9.0
 * @param {*} value
 * @returns {String}
 */
function type (value) {
    return objectProtoToString.call(value).slice(8, -1);
}

/**
 * Appends the given value at the end of a copy of the provided array-like object.
 * @example
 * const arr = [1, 2, 3, 4];
 *
 * _.appendTo(arr, 5) // => [1, 2, 3, 4, 5]
 * _.appendTo(arr, [5]) // => [1, 2, 3, 4, [5]]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.append|append}
 * @see {@link module:lamb.insert|insert}, {@link module:lamb.insertAt|insertAt}
 * @since 0.44.0
 * @param {ArrayLike} arrayLike
 * @param {*} value
 * @returns {Array}
 */
function appendTo (arrayLike, value) {
    return slice(arrayLike, 0, arrayLike.length).concat([value]);
}

/**
 * A curried version of {@link module:lamb.appendTo|appendTo} that uses the value to append
 * to build a function expecting the array-like object to act upon.
 * @example
 * const arr = [1, 2, 3, 4];
 *
 * _.append(5)(arr) // => [1, 2, 3, 4, 5]
 * _.append([5])(arr) // => [1, 2, 3, 4, [5]]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.appendTo|appendTo}
 * @see {@link module:lamb.insert|insert}, {@link module:lamb.insertAt|insertAt}
 * @since 0.44.0
 * @param {*} value
 * @returns {Function}
 */
var append = _curry2(appendTo, true);

/**
 * Checks if an array-like object contains the given value.<br/>
 * Please note that the equality test is made with {@link module:lamb.areSVZ|areSVZ}; so you can
 * check for <code>NaN</code>, but <code>0</code> and <code>-0</code> are the same value.<br/>
 * See also {@link module:lamb.contains|contains} for a curried version building a predicate.
 * @example
 * const numbers = [0, 1, 2, 3, NaN];
 *
 * _.isIn(numbers, 1) // => true
 * _.isIn(numbers, 0) // => true
 * _.isIn(numbers, -0) // => true
 * _.isIn(numbers, NaN) // => true
 * _.isIn(numbers, 5) // => false
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.contains|contains}
 * @since 0.13.0
 * @param {ArrayLike} arrayLike
 * @param {*} value
 * @returns {Boolean}
 */
function isIn (arrayLike, value) {
    var result = false;

    for (var i = 0, len = arrayLike.length; i < len; i++) {
        if (areSVZ(value, arrayLike[i])) {
            result = true;
            break;
        }
    }

    return result;
}

/**
 * Builds a predicate to check if an array-like object contains the given value.<br/>
 * Please note that the equality test is made with {@link module:lamb.areSVZ|areSVZ}; so you can
 * check for <code>NaN</code>, but <code>0</code> and <code>-0</code> are the same value.<br/>
 * See also {@link module:lamb.isIn|isIn} for an uncurried version.
 * @example
 * const containsNaN = _.contains(NaN);
 *
 * containsNaN([0, 1, 2, 3, NaN]) // => true
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.isIn|isIn}
 * @since 0.13.0
 * @param {*} value
 * @returns {Function}
 */
var contains = _curry2(isIn, true);

/**
 * Builds a "grouping function" for an array-like object.
 * @private
 * @param {Function} makeValue
 * @returns {Function}
 */
function _groupWith (makeValue) {
    return function (arrayLike, iteratee) {
        var result = {};
        var len = arrayLike.length;

        for (var i = 0, element, key; i < len; i++) {
            element = arrayLike[i];
            key = iteratee(element, i, arrayLike);
            result[key] = makeValue(result[key], element);
        }

        return result;
    };
}

/**
 * Transforms an array-like object in a lookup table with the keys generated by the provided
 * <code>iteratee</code>, having as values the count of matches for the key.
 * @example
 * const persons = [
 *     {"name": "Jane", "age": 12},
 *     {"name": "John", "age": 40},
 *     {"name": "Mario", "age": 17},
 *     {"name": "Paolo", "age": 15}
 * ];
 * const getAgeStatus = person => (person.age >= 18 ? "adult" : "minor");
 *
 * _.count(persons, getAgeStatus) // => {"adult": 1, "minor": 3}
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.countBy|countBy}
 * @see {@link module:lamb.group|group}, {@link module:lamb.groupBy|groupBy}
 * @see {@link module:lamb.index|index}, {@link module:lamb.indexBy|indexBy}
 * @since 0.21.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
 * @returns {Object}
 */
var count = _groupWith(function (a) {
    return a ? ++a : 1;
});

/**
 * A curried version of {@link module:lamb.count|count} that uses the provided iteratee to
 * build a function expecting the array-like object to act upon.
 * @example
 * const persons = [
 *     {"name": "Jane", "city": "New York"},
 *     {"name": "John", "city": "New York"},
 *     {"name": "Mario", "city": "Rome"},
 *     {"name": "Paolo"}
 * ];
 * const getCityOrUnknown = _.adapter([_.getKey("city"), _.always("Unknown")]);
 * const countByCity = _.countBy(getCityOrUnknown);
 *
 * countByCity(persons) // => {"New York": 2, "Rome": 1, "Unknown": 1}
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.count|count}
 * @see {@link module:lamb.group|group}, {@link module:lamb.groupBy|groupBy}
 * @see {@link module:lamb.index|index}, {@link module:lamb.indexBy|indexBy}
 * @since 0.21.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
var countBy = _curry2(count, true);

/**
 * Builds an array comprised of all values of the array-like object passing the <code>predicate</code>
 * test.<br/>
 * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
 * @example
 * const isLowerCase = s => s.toLowerCase() === s;
 *
 * _.filter(["Foo", "bar", "baZ"], isLowerCase) // => ["bar"]
 *
 * // the function will work with any array-like object
 * _.filter("fooBAR", isLowerCase) // => ["f", "o", "o"]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.filterWith|filterWith}
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @since 0.1.0
 * @returns {Array}
 */
function filter (arrayLike, predicate) {
    var len = arrayLike.length;
    var result = [];

    for (var i = 0; i < len; i++) {
        predicate(arrayLike[i], i, arrayLike) && result.push(arrayLike[i]);
    }

    return result;
}

/**
 * Returns a predicate that negates the given one.
 * @example
 * const isEven = n => n % 2 === 0;
 * const isOdd = _.not(isEven);
 *
 * isOdd(5) // => true
 * isOdd(4) // => false
 *
 * @memberof module:lamb
 * @category Logic
 * @since 0.1.0
 * @param {Function} predicate
 * @returns {Function}
 */
function not (predicate) {
    return function () {
        return !predicate.apply(this, arguments);
    };
}

/**
 * Using the provided iteratee, builds a function that will return an array comprised of the
 * unique elements of an array-like object. The values being compared are the ones returned by
 * the iteratee.<br/>
 * The equality test is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.<br/>
 * When two values are considered equal, the first occurence will be the one included
 * in the result array.<br/>
 * See also {@link module:lamb.uniques|uniques} if you don't need to transform your values before the
 * comparison.
 * @example
 * const data  = [
 *     {id: "1", name: "John"},
 *     {id: "4", name: "Jane"},
 *     {id: "5", name: "Joe"},
 *     {id: "1", name: "Mario"},
 *     {id: "5", name: "Paolo"},
 * ];
 * const uniquesById = _.uniquesBy(_.getKey("id"));
 *
 * uniquesById(data) // => [{id: "1", name: "John"}, {id: "4", name: "Jane"}, {id: "5", name: "Joe"}]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.uniques|uniques}
 * @since 0.51.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
function uniquesBy (iteratee) {
    return function (arrayLike) {
        var result = [];

        for (var i = 0, len = arrayLike.length, seen = [], value; i < len; i++) {
            value = iteratee(arrayLike[i], i, arrayLike);

            if (!isIn(seen, value)) {
                seen.push(value);
                result.push(arrayLike[i]);
            }
        }

        return result;
    };
}

/**
 * Returns an array comprised of the unique elements of the given array-like object.<br/>
 * Note that this function uses the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}
 * to test the equality of values.<br/>
 * When two values are considered equal, the first occurence will be the one included
 * in the result array.<br/>
 * See also {@link module:lamb.uniquesBy|uniquesBy} if you need to transform your values before
 * the comparison or if you have to extract them from complex ones.
 * @example
 * _.uniques([-0, 1, 2, 0, 2, 3, 4, 3, 5, 1]) // => [-0, 1, 2, 3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.uniquesBy|uniquesBy}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @returns {Array}
 */
var uniques = uniquesBy(identity);

/**
 * Returns an array of unique items present only in the first of the two given
 * array-like objects. To determine uniqueness the function uses the
 * ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * const a1 = [1, 2, 1, 3, 4];
 * const a2 = [2, 4, 5, 6];
 * const a3 = [3, 4, 5, 2, 1];
 *
 * _.difference(a1, a2) // => [1, 3]
 * _.difference(a2, a3) // => [6]
 * _.difference(a1, a3) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.intersection|intersection}
 * @see {@link module:lamb.union|union}, {@link module:lamb.unionBy|unionBy}
 * @see {@link module:lamb.pull|pull}, {@link module:lamb.pullFrom|pullFrom}
 * @since 0.6.0
 * @param {ArrayLike} arrayLike
 * @param {ArrayLike} other
 * @returns {Array}
 */
function difference (arrayLike, other) {
    var isNotInOther = partial(not(isIn), [other]);

    return uniques(filter(arrayLike, isNotInOther));
}

/**
 * Builds an array without the first <code>n</code> elements of the given array or array-like object.
 * Note that, being this only a shortcut for a specific use case of {@link module:lamb.slice|slice},
 * <code>n</code> can be a negative number.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.dropFrom(arr, 2) // => [3, 4, 5]
 * _.dropFrom(arr, -1) // => [5]
 * _.dropFrom(arr, -10) // => [1, 2, 3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @since 0.51.0
 * @param {ArrayLike} arrayLike
 * @param {Number} n
 * @returns {Array}
 */
function dropFrom (arrayLike, n) {
    return slice(arrayLike, n, arrayLike.length);
}

/**
 * A curried version of {@link module:lamb.dropFrom|dropFrom} that expects the number of elements
 * to drop to build a function waiting for the list to take the elements from.<br/>
 * See the note and examples for {@link module:lamb.dropFrom|dropFrom} about passing a
 * negative <code>n</code>.
 * @example
 * const drop2 = _.drop(2);
 *
 * drop2([1, 2, 3, 4, 5]) // => [3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @since 0.5.0
 * @see {@link module:lamb.dropFrom|dropFrom}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @param {Number} n
 * @returns {Function}
 */
var drop = _curry2(dropFrom, true);

/**
 * Gets the index of the last element satisfying a predicate in an array-like object.
 * @private
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @param {Boolean} fromLast
 * @returns {Number}
 */
function _getLastHitIndex (arrayLike, predicate, fromLast) {
    var idx;
    var increment;
    var len = arrayLike.length;

    if (fromLast) {
        idx = len - 1;
        increment = -1;
    } else {
        idx = 0;
        increment = 1;
    }

    while (idx >= 0 && idx < len && predicate(arrayLike[idx], idx, arrayLike)) {
        idx += increment;
    }

    return idx;
}

/**
 * Helper to build the {@link module:lamb.takeWhile|takeWhile},
 * {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropWhile|dropWhile} and
 * {@link module:lamb.dropLastWhile|dropLastWhile} functions.
 * @private
 * @param {Boolean} isTake
 * @param {Boolean} fromLast
 * @returns {Function}
 */
function _takeOrDropWhile (isTake, fromLast) {
    return function (predicate) {
        return function (arrayLike) {
            var idxFrom;
            var idxTo;
            var lastHitIndex = _getLastHitIndex(arrayLike, predicate, fromLast);

            if (isTake && fromLast) {
                idxFrom = lastHitIndex + 1;
                idxTo = arrayLike.length;
            } else if (isTake) {
                idxFrom = 0;
                idxTo = lastHitIndex;
            } else if (!isTake && fromLast) {
                idxFrom = 0;
                idxTo = lastHitIndex + 1;
            } else {
                idxFrom = lastHitIndex;
                idxTo = arrayLike.length;
            }

            return slice(arrayLike, idxFrom, idxTo);
        };
    };
}

/**
 * Builds a function that drops the last elements satisfying a predicate
 * from an array or array-like object.
 * @example
 * const isEven = n => n % 2 === 0;
 * const dropLastWhileIsEven = _.dropLastWhile(isEven);
 *
 * dropLastWhileIsEven([2, 4, 6, 8]) // => []
 * dropLastWhileIsEven([2, 4, 7, 8]) // => [2, 4, 7]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @since 0.58.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var dropLastWhile = _takeOrDropWhile(false, true);

/**
 * Builds a function that drops the first elements satisfying a predicate
 * from an array or array-like object.
 * @example
 * const isEven = n => n % 2 === 0;
 * const dropWhileIsEven = _.dropWhile(isEven);
 *
 * dropWhileIsEven([2, 4, 6, 8]) // => []
 * dropWhileIsEven([2, 4, 7, 8]) // => [7, 8]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.takeWhile|takeWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @since 0.5.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var dropWhile = _takeOrDropWhile(false, false);

/**
 * Helper to build the {@link module:lamb.everyIn|everyIn} or the
 * {@link module:lamb.someIn|someIn} function.
 * @private
 * @param {Boolean} defaultResult
 * @returns {Function}
 */
function _makeArrayChecker (defaultResult) {
    return function (arrayLike, predicate) {
        for (var i = 0, len = arrayLike.length; i < len; i++) {
            if (defaultResult ^ !!predicate(arrayLike[i], i, arrayLike)) {
                return !defaultResult;
            }
        }

        return defaultResult;
    };
}

/**
 * Checks if all the elements in an array-like object satisfy the given predicate.<br/>
 * The function will stop calling the predicate as soon as it returns a <em>falsy</em> value.<br/>
 * Note that an empty array-like will always produce a <code>true</code> result regardless of the
 * predicate because of [vacuous truth]{@link https://en.wikipedia.org/wiki/Vacuous_truth}.<br/>
 * Also note that unlike the native
 * [Array.prototype.every]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every},
 * this function won't skip deleted or unassigned indexes.
 * @example
 * const persons = [
 *     {"name": "Jane", "age": 12, active: true},
 *     {"name": "John", "age": 40, active: true},
 *     {"name": "Mario", "age": 17, active: true},
 *     {"name": "Paolo", "age": 15, active: true}
 * ];
 * const isAdult = _.keySatisfies(_.isGTE(18), "age");
 * const isActive = _.hasKeyValue("active", true);
 *
 * _.everyIn(persons, isAdult) // => false
 * _.everyIn(persons, isActive) // => true
 *
 * @example <caption>Showing the difference with <code>Array.prototype.every</code>:</caption>
 * const isDefined = _.not(_.isUndefined);
 * const arr = new Array(5);
 * arr[3] = 99;
 *
 * arr.every(isDefined) // => true
 * _.everyIn(arr, isDefined) // => false
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.every|every}
 * @see {@link module:lamb.some|some}, {@link module:lamb.someIn|someIn}
 * @since 0.39.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Boolean}
 */
var everyIn = _makeArrayChecker(true);

/**
 * A curried version of {@link module:lamb.everyIn|everyIn} that expects a predicate
 * to build a function waiting for the array-like to act upon.
 * @example
 * const data = [2, 3, 5, 6, 8];
 * const isEven = n => n % 2 === 0;
 * const allEvens = _.every(isEven);
 * const allIntegers = _.every(_.isInteger);
 *
 * allEvens(data) // => false
 * allIntegers(data) // => true
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.everyIn|everyIn}
 * @see {@link module:lamb.some|some}, {@link module:lamb.someIn|someIn}
 * @since 0.39.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var every = _curry2(everyIn, true);

/**
 * A curried version of {@link module:lamb.filter|filter} that uses the given predicate
 * to build a function expecting the array-like object to act upon.
 * @example
 * const isLowerCase = s => s.toLowerCase() === s;
 * const getLowerCaseEntries = _.filterWith(isLowerCase);
 *
 * getLowerCaseEntries(["Foo", "bar", "baZ"]) // => ["bar"]
 *
 * // array-like objects can be used as well
 * getLowerCaseEntries("fooBAR") // => ["f", "o", "o"]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.filter|filter}
 * @since 0.9.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var filterWith = _curry2(filter, true);

/**
 * Helper to create the {@link module:lamb.findIndex|findIndex} and
 * {@link module:lamb.findLastIndex|findLastIndex} functions.
 * @private
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @param {Boolean} fromLast
 * @returns {Number}
 */
function _findIndex (arrayLike, predicate, fromLast) {
    var start;
    var increment;
    var len = arrayLike.length;
    var result = -1;

    if (fromLast) {
        start = len - 1;
        increment = -1;
    } else {
        start = 0;
        increment = 1;
    }

    for (var i = start; i < len && i >= 0; i += increment) {
        if (predicate(arrayLike[i], i, arrayLike)) {
            result = i;
            break;
        }
    }

    return result;
}

/**
 * Searches for an element satisfying the predicate in the given array-like object and returns its
 * index if the search is successful. Returns <code>-1</code> otherwise.
 * @example
 * const persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 40}
 * ];
 *
 * _.findIndex(persons, _.hasKeyValue("age", 40)) // => 1
 * _.findIndex(persons, _.hasKeyValue("age", 41)) // => -1
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.findIndexWhere|findIndexWhere}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @since 0.7.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Number}
 */
function findIndex (arrayLike, predicate) {
    return _findIndex(arrayLike, predicate, false);
}

/**
 * Searches for an element satisfying the predicate in the given array-like object and returns it if
 * the search is successful. Returns <code>undefined</code> otherwise.
 * @example
 * const persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 40}
 * ];
 *
 * _.find(persons, _.hasKeyValue("age", 40)) // => {"name": "John", "surname": "Doe", "age": 40}
 * _.find(persons, _.hasKeyValue("age", 41)) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.findWhere|findWhere}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @since 0.7.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {*}
 */
function find (arrayLike, predicate) {
    var idx = findIndex(arrayLike, predicate);

    return idx === -1 ? void 0 : arrayLike[idx];
}

/**
 * A curried version of {@link module:lamb.findIndex|findIndex} that uses the given predicate
 * to build a function expecting the array-like object to search.
 * @example
 * const isEven = n => n % 2 === 0;
 * const findEvenIdx = _.findIndexWhere(isEven);
 *
 * findEvenIdx([1, 3, 4, 5, 6, 7]) // => 2
 * findEvenIdx([1, 3, 5, 7]) // => -1
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.findIndex|findIndex}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @since 0.41.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var findIndexWhere = _curry2(findIndex, true);

/**
 * Searches for an element satisfying the predicate in the given array-like object starting from
 * the end and returns its index if the search is successful. Returns <code>-1</code> otherwise.
 * @example
 * const persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 40}
 * ];
 *
 * _.findLastIndex(persons, _.hasKeyValue("age", 40)) // => 3
 * _.findLastIndex(persons, _.hasKeyValue("age", 41)) // => -1
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @since 0.58.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Number}
 */
function findLastIndex (arrayLike, predicate) {
    return _findIndex(arrayLike, predicate, true);
}

/**
 * Searches for an element satisfying the predicate in the given array-like object starting from the end
 * and returns it if the search is successful. Returns <code>undefined</code> otherwise.
 * @example
 * const persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 40}
 * ];
 *
 * _.findLast(persons, _.hasKeyValue("surname", "Doe")) // => {"name": "John", "surname": "Doe", "age": 40}
 * _.findLast(persons, _.hasKeyValue("age", 41)) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @since 0.58.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {*}
 */
function findLast (arrayLike, predicate) {
    var idx = findLastIndex(arrayLike, predicate);

    return idx === -1 ? void 0 : arrayLike[idx];
}

/**
 * A curried version of {@link module:lamb.findLastIndex|findLastIndex} that uses the given predicate
 * to build a function expecting the array-like object to search.
 * @example
 * const isEven = n => n % 2 === 0;
 * const findLastEvenIdx = _.findLastIndexWhere(isEven);
 *
 * findLastEvenIdx([1, 3, 4, 5, 6, 7]) // => 4
 * findLastEvenIdx([1, 3, 5, 7]) // => -1
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.findLastIndex|findLastIndex}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @since 0.58.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var findLastIndexWhere = _curry2(findLastIndex, true);

/**
 * A curried version of {@link module:lamb.findLast|findLast} that uses the given
 * predicate to build a function expecting the array-like object to search.
 * @example
 * const isEven = n => n % 2 === 0;
 * const findEven = _.findLastWhere(isEven);
 *
 * findEven([1, 3, 4, 5, 6, 7]) // => 6
 * findEven([1, 3, 5, 7]) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.findLast|findLast}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @see {@link module:lamb.find|find}, {@link module:lamb.findWhere|findWhere}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @since 0.58.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var findLastWhere = _curry2(findLast, true);

/**
 * A curried version of {@link module:lamb.find|find} that uses the given
 * predicate to build a function expecting the array-like object to search.
 * @example
 * const isEven = n => n % 2 === 0;
 * const findEven = _.findWhere(isEven);
 *
 * findEven([1, 3, 4, 5, 7]) // => 4
 * findEven([1, 3, 5, 7]) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.find|find}
 * @see {@link module:lamb.findIndex|findIndex}, {@link module:lamb.findIndexWhere|findIndexWhere}
 * @see {@link module:lamb.findLast|findLast}, {@link module:lamb.findLastWhere|findLastWhere}
 * @see {@link module:lamb.findLastIndex|findLastIndex},
 *      {@link module:lamb.findLastIndexWhere|findLastIndexWhere}
 * @since 0.41.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var findWhere = _curry2(find, true);

/**
 * Similar to {@link module:lamb.map|map}, but if the mapping function returns an array this will
 * be concatenated, rather than pushed, to the final result.
 * @example <caption>Showing the difference with <code>map</code>:</caption>
 * const words = ["foo", "bar"];
 * const toCharArray = _.splitBy("");
 *
 * _.map(words, toCharArray) // => [["f", "o", "o"], ["b", "a", "r"]]
 * _.flatMap(words, toCharArray) // => ["f", "o", "o", "b", "a", "r"]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.flatMapWith|flatMapWith}
 * @see {@link module:lamb.map|map}, {@link module:lamb.mapWith|mapWith}
 * @since 0.1.0
 * @param {Array} array
 * @param {ListIteratorCallback} iteratee
 * @returns {Array}
 */
function flatMap (array, iteratee) {
    return reduce(array, function (result, el, idx, arr) {
        var v = iteratee(el, idx, arr);

        if (!Array.isArray(v)) {
            v = [v];
        }

        for (var i = 0, len = v.length, rLen = result.length; i < len; i++) {
            result[rLen + i] = v[i];
        }

        return result;
    }, []);
}

/**
 * A curried version of {@link module:lamb.flatMap|flatMap} that uses provided iteratee
 * to build a function expecting the array to act upon.
 * @example
 * const toCharArray = _.splitBy("");
 * const wordsToCharArray = _.flatMapWith(toCharArray);
 *
 * wordsToCharArray(["foo", "bar"]) // => ["f", "o", "o", "b", "a", "r"]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.flatMap|flatMap}
 * @see {@link module:lamb.map|map}, {@link module:lamb.mapWith|mapWith}
 * @since 0.11.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
var flatMapWith = _curry2(flatMap, true);

/**
 * Flattens an array.
 * @private
 * @param {Array} array - The source array
 * @param {Boolean} isDeep - Whether to perform a deep flattening or not
 * @param {Array} output - An array to collect the result
 * @param {Number} idx - The next index to be filled in the output
 * @returns {Array} The output array filled with the results
 */
function _flatten (array, isDeep, output, idx) {
    for (var i = 0, len = array.length, value, j, vLen; i < len; i++) {
        value = array[i];

        if (!Array.isArray(value)) {
            output[idx++] = value;
        } else if (isDeep) {
            _flatten(value, true, output, idx);
            idx = output.length;
        } else {
            vLen = value.length;
            output.length += vLen;

            for (j = 0; j < vLen; j++) {
                output[idx++] = value[j];
            }
        }
    }

    return output;
}

/**
 * Helper to build the {@link module:lamb.flatten|flatten} and
 * {@link module:lamb.shallowFlatten|shallowFlatten} functions.
 * @private
 * @function
 * @param {Boolean} isDeep
 * @returns {Function}
 */
var _makeArrayFlattener = _curry2(function (isDeep, array) {
    return Array.isArray(array) ? _flatten(array, isDeep, [], 0) : slice(array, 0, array.length);
});

/**
 * Flattens an array.
 * @example <caption>Showing the difference with <code>shallowFlatten</code>:</caption>
 * const arr = [1, 2, [3, 4, [5, 6]], 7, 8];
 *
 * _.flatten(arr) // => [1, 2, 3, 4, 5, 6, 7, 8]
 * _.shallowFlatten(arr) // => [1, 2, 3, 4, [5, 6], 7, 8]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.shallowFlatten|shallowFlatten}
 * @since 0.1.0
 * @param {Array} array
 * @returns {Array}
 */
var flatten = _makeArrayFlattener(true);

/**
 * Checks if the given number, even negative, represents an array-like index
 * within the provided length. If so returns its natural number equivalent.<br/>
 * Returns <code>NaN<code> otherwise.
 * @private
 * @param {Number} idx
 * @param {Number} len
 * @returns {Number}
 */
function _toNaturalIndex (idx, len) {
    idx = _toInteger(idx);

    return idx >= -len && idx < len ? idx < 0 ? idx + len : idx : NaN;
}

/**
 * Retrieves the element at the given index in an array-like object.<br/>
 * Like {@link module:lamb.slice|slice} the index can be negative.<br/>
 * If the index isn't supplied, or if its value isn't an integer within the array-like bounds,
 * the function will return <code>undefined</code>.<br/>
 * <code>getIndex</code> will throw an exception when receives <code>null</code> or
 * <code>undefined</code> in place of an array-like object, but returns <code>undefined</code>
 * for any other value.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.getIndex(arr, 1) // => 2
 * _.getIndex(arr, -1) // => 5
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.getAt|getAt}
 * @see {@link module:lamb.head|head} and {@link module:lamb.last|last} for common use cases shortcuts.
 * @since 0.23.0
 * @param {ArrayLike} arrayLike
 * @param {Number} index
 * @returns {*}
 */
function getIndex (arrayLike, index) {
    var idx = _toNaturalIndex(index, _toArrayLength(arrayLike.length));

    return idx === idx ? arrayLike[idx] : void 0; // eslint-disable-line no-self-compare
}

/**
 * A curried version of {@link module:lamb.getIndex|getIndex} that uses the provided index
 * to build a function expecting the array-like object holding the element we want to retrieve.
 * @example
 * const getFifthElement = _.getAt(4);
 *
 * getFifthElement([1, 2, 3, 4, 5]) // => 5
 * getFifthElement("foo bar") // => "b"
 * getFifthElement([]) // => undefined
 * getFifthElement("foo") // => undefined
 *
 * @example <caption>Using negative indexes:</caption>
 * _.getAt(-2)([1, 2, 3]) // => 2
 * _.getAt(-3)("foo") // => "f"
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @since 0.16.0
 * @see {@link module:lamb.getIndex|getIndex}
 * @see {@link module:lamb.head|head} and {@link module:lamb.last|last} for common use cases shortcuts.
 * @param {Number} index
 * @returns {Function}
 */
var getAt = _curry2(getIndex, true);

/**
 * Transforms an array-like object into a lookup table using the provided iteratee as a grouping
 * criterion to generate keys and values.
 * @example
 * const persons = [
 *     {"name": "Jane", "city": "New York"},
 *     {"name": "John", "city": "New York"},
 *     {"name": "Mario", "city": "Rome"},
 *     {"name": "Paolo"}
 * ];
 * const getCity = _.getKey("city");
 * const personsByCity = _.group(persons, getCity);
 *
 * // "personsByCity" holds:
 * // {
 * //     "New York": [
 * //         {"name": "Jane", "city": "New York"},
 * //         {"name": "John", "city": "New York"}
 * //     ],
 * //     "Rome": [
 * //         {"name": "Mario", "city": "Rome"}
 * //     ],
 * //     "undefined": [
 * //         {"name": "Paolo"}
 * //     ]
 * // }
 *
 * @example <caption>Adding a custom value for missing keys:</caption>
 *
 * const getCityOrUnknown = _.adapter([getCity, _.always("Unknown")]);
 *
 * const personsByCity = _.group(persons, getCityOrUnknown);
 *
 * // "personsByCity" holds:
 * // {
 * //     "New York": [
 * //         {"name": "Jane", "city": "New York"},
 * //         {"name": "John", "city": "New York"}
 * //     ],
 * //     "Rome": [
 * //         {"name": "Mario", "city": "Rome"}
 * //     ],
 * //     "Unknown": [
 * //         {"name": "Paolo"}
 * //     ]
 * // }
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.groupBy|groupBy}
 * @see {@link module:lamb.count|count}, {@link module:lamb.countBy|countBy}
 * @see {@link module:lamb.index|index}, {@link module:lamb.indexBy|indexBy}
 * @since 0.7.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
 * @returns {Object}
 */
var group = _groupWith(function (a, b) {
    if (!a) {
        return [b];
    }

    a[a.length] = b;

    return a;
});

/**
 * A curried version of {@link module:lamb.group|group} that uses the provided iteratee
 * to build a function expecting the array-like object to act upon.
 * @example
 * const persons = [
 *     {"name": "Jane", "age": 12},
 *     {"name": "John", "age": 40},
 *     {"name": "Mario", "age": 18},
 *     {"name": "Paolo", "age": 15}
 * ];
 *
 * const getAgeStatus = person => `${person.age > 20 ? "over" : "under"} 20`;
 * const groupByAgeStatus = _.groupBy(getAgeStatus);
 *
 * const personsByAgeStatus = groupByAgeStatus(persons);
 *
 * // "personsByAgeStatus" holds:
 * // {
 * //     "under 20": [
 * //         {"name": "Jane", "age": 12},
 * //         {"name": "Mario", "age": 18},
 * //         {"name": "Paolo", "age": 15}
 * //     ],
 * //     "over 20": [
 * //         {"name": "John", "age": 40}
 * //     ]
 * // }
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.group|group}
 * @see {@link module:lamb.count|count}, {@link module:lamb.countBy|countBy}
 * @see {@link module:lamb.index|index}, {@link module:lamb.indexBy|indexBy}
 * @since 0.7.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
var groupBy = _curry2(group, true);

/**
 * Retrieves the first element of an array-like object.<br/>
 * Just a common use case of {@link module:lamb.getAt|getAt} exposed for convenience.
 * @example
 * _.head([1, 2, 3]) // => 1
 * _.head("hello") // => "h"
 * _.head([]) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.last|last}
 * @see {@link module:lamb.getIndex|getIndex}, {@link module:lamb.getAt|getAt}
 * @since 0.16.0
 * @param {ArrayLike} arrayLike
 * @returns {*}
 */
var head = getAt(0);

/**
 * Similar to {@link module:lamb.group|group}, but the generated lookup table will have
 * only one element of the original array-like object for each value.<br/>
 * Should be used only when you're sure that your <code>iteratee</code> won't produce
 * duplicate keys, otherwise only the last evaluated element will be in the result.
 * @example
 * const users = [
 *     {id: 1, name: "John"},
 *     {id: 2, name: "Jane"},
 *     {id: 3, name: "Mario"},
 *     {id: 4, name: "John"}
 * ];
 *
 * const indexedUsers = _.index(users, _.getKey("id"));
 *
 * // "indexedUsers" holds:
 * // {
 * //     "1": {id: 1, name: "John"},
 * //     "2": {id: 2, name: "Jane"},
 * //     "3": {id: 3, name: "Mario"},
 * //     "4": {id: 4, name: "John"}
 * // }
 *
 * @example <caption>Result of an <code>iteratee</code> producing a duplicate key:</caption>
 * const users = [
 *     {id: 1, name: "John"},
 *     {id: 2, name: "Jane"},
 *     {id: 3, name: "Mario"},
 *     {id: 4, name: "John"}
 * ];
 *
 * const indexedUsers = _.index(users, _.getKey("name"));
 *
 * // "indexedUsers" holds:
 * // {
 * //     "John": {"id": 4, "name": "John"},
 * //     "Jane": {"id": 2, "name": "Jane"},
 * //     "Mario": {"id": 3, "name": "Mario"}
 * // }
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.indexBy|indexBy}
 * @see {@link module:lamb.count|count}, {@link module:lamb.countBy|countBy}
 * @see {@link module:lamb.group|group}, {@link module:lamb.groupBy|groupBy}
 * @since 0.21.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} iteratee
 * @returns {Object}
 */
var index = _groupWith(function (a, b) {
    return b;
});

/**
 * A curried version of {@link module:lamb.index|index} that uses the provided iteratee
 * to build a function expecting the array-like object to act upon.
 * @example
 * const users = [
 *     {id: 1, name: "John"},
 *     {id: 2, name: "Jane"},
 *     {id: 3, name: "Mario"}
 * ];
 * const indexByID = _.indexBy(_.getKey("id"));
 *
 * const indexedUsers = indexByID(users);
 *
 * // "indexedUsers" holds:
 * // {
 * //     "1": {id: 1, name: "John"},
 * //     "2": {id: 2, name: "Jane"},
 * //     "3": {id: 3, name: "Mario"}
 * // }
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.index|index}
 * @see {@link module:lamb.count|count}, {@link module:lamb.countBy|countBy}
 * @see {@link module:lamb.group|group}, {@link module:lamb.groupBy|groupBy}
 * @since 0.21.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
var indexBy = _curry2(index, true);

/**
 * Returns a copy of the given array-like object without the last element.
 * @example
 * _.init([1, 2, 3, 4]) // => [1, 2, 3]
 * _.init([1]) // => []
 * _.init([]) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.tail|tail}
 * @see {@link module:lamb.head|head}, {@link module:lamb.last|last}
 * @since 0.16.0
 * @param {ArrayLike} arrayLike
 * @returns {Array}
 */
var init$1 = partial(slice, [__, 0, -1]);

/**
 * Inserts the provided element in a copy of an array-like object at the
 * specified index.<br/>
 * If the index is greater than the length of the array-like, the element
 * will be appended at the end.<br/>
 * Negative indexes are allowed; when a negative index is out of bounds
 * the element will be inserted at the start of the resulting array.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.insert(arr, 3, 99) // => [1, 2, 3, 99, 4, 5]
 * _.insert(arr, -2, 99) // => [1, 2, 3, 99, 4, 5]
 * _.insert(arr, 10, 99) // => [1, 2, 3, 4, 5, 99]
 * _.insert(arr, -10, 99) // => [99, 1, 2, 3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.insertAt|insertAt}
 * @see {@link module:lamb.sortedInsert|sortedInsert}
 * @see {@link module:lamb.append|append}, {@link module:lamb.appendTo|appendTo}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {Number} index
 * @param {*} element
 * @returns {Array}
 */
function insert (arrayLike, index, element) {
    var result = slice(arrayLike, 0, arrayLike.length);

    result.splice(index, 0, element);

    return result;
}

/**
 * Builds a partial application of {@link module:lamb.insert|insert}
 * expecting the array-like object to act upon.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.insertAt(3, 99)(arr) // => [1, 2, 3, 99, 4, 5]
 * _.insertAt(-2, 99)(arr) // => [1, 2, 3, 99, 4, 5]
 * _.insertAt(10, 99)(arr) // => [1, 2, 3, 4, 5, 99]
 * _.insertAt(-10, 99)(arr) // => [99, 1, 2, 3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.insert|insert}
 * @see {@link module:lamb.sortedInsert|sortedInsert}
 * @see {@link module:lamb.append|append}, {@link module:lamb.appendTo|appendTo}
 * @since 0.27.0
 * @param {Number} index
 * @param {*} element
 * @returns {Function}
 */
var insertAt = _makePartial3(insert);

/**
 * Returns an array of every unique item that is included in all two given arrays
 * or array-like objects.<br/>
 * Note that this function uses the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * const a1 = [1, 2, 3, 4];
 * const a2 = [2, 5, 4, 2, 6];
 * const a3 = [5, 6, 7];
 *
 * _.intersection(a1, a2) // => [2, 4]
 * _.intersection(a2, a3) // => [5, 6]
 * _.intersection(a1, a3) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.difference|difference}
 * @see {@link module:lamb.union|union}, {@link module:lamb.unionBy|unionBy}
 * @since 0.5.0
 * @param {ArrayLike} a
 * @param {ArrayLike} b
 * @returns {Array}
 */
function intersection (a, b) {
    var result = [];
    var lenA = a.length;

    if (lenA && b.length) {
        for (var i = 0; i < lenA; i++) {
            !isIn(result, a[i]) && isIn(b, a[i]) && result.push(a[i]);
        }
    }

    return result;
}

/**
 * Transforms an array-like object into a string by joining its elements with
 * the given separator.<br/>
 * Note that unlike the native method, this function won't convert
 * <code>null</code> and <code>undefined</code> values in the array to empty
 * strings and that the <code>separator</code> parameter isn't optional.<br/>
 * See the examples about these differences.
 * @example
 * const words = ["foo", "bar", "baz"];
 *
 * _.join(words, "-") // => "foo-bar-baz"
 *
 * @example <caption>Showing the differences with the native array method:</caption>
 * const mixed = [1, null, 2, undefined, 3, NaN, 4, 5];
 * const numbers = [1, 2, 3];
 *
 * _.join(mixed, "-") // => "1-null-2-undefined-3-NaN-4-5"
 * mixed.join("-") // => "1--2--3-NaN-4-5"
 *
 * _.join(numbers) // => "1undefined2undefined3"
 * numbers.join() // => "1,2,3"
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.joinWith|joinWith}
 * @see {@link module:lamb.split|split}, {@link module:lamb.splitBy|splitBy}
 * @since 0.58.0
 * @param {ArrayLike} arrayLike
 * @param {String} separator
 * @returns {String}
 */
function join (arrayLike, separator) {
    return map(arrayLike, String).join(String(separator));
}

/**
 * A curried version of {@link module:lamb.join|join} that accepts an optional
 * separator and builds a function expecting the array-like object to act upon.<br/>
 * Please refer to the description and examples of {@link module:lamb.join|join}
 * to understand the differences with the native array method.
 * @example
 * const words = ["foo", "bar", "baz"];
 * const joinWithDash = _.joinWith("-");
 *
 * joinWithDash(words) // => "foo-bar-baz"
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.join|join}
 * @see {@link module:lamb.split|split}, {@link module:lamb.splitBy|splitBy}
 * @since 0.58.0
 * @param {String} separator
 * @returns {Function}
 */
var joinWith = _curry2(join, true);

/**
 * Retrieves the last element of an array-like object.<br/>
 * Just a common use case of {@link module:lamb.getAt|getAt} exposed for convenience.
 * @example
 * _.last([1, 2, 3]) // => 3
 * _.last("hello") // => "o"
 * _.last([]) // => undefined
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.head|head}
 * @see {@link module:lamb.getIndex|getIndex}, {@link module:lamb.getAt|getAt}
 * @since 0.16.0
 * @param {ArrayLike} arrayLike
 * @returns {*}
 */
var last = getAt(-1);

/**
 * Builds helper functions to extract portions of the arguments
 * object rather efficiently without having to write for loops
 * manually for each case.<br/>
 * The arguments object needs to be passed to the apply method
 * of the generated function.
 * @private
 * @param {Number} idx
 * @returns {Function}
 */
function _argsToArrayFrom (idx) {
    return function () {
        var argsLen = arguments.length || idx;
        var len = argsLen - idx;
        var result = Array(len);

        for (var i = 0; i < len; i++) {
            result[i] = arguments[i + idx];
        }

        return result;
    };
}

/**
 * Generates an array with the values passed as arguments.<br/>
 * Behaves like ES6's [Array.of]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of}.
 * @example
 * _.list(1, 2, 3) // => [1, 2, 3]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @since 0.1.0
 * @param {...*} value
 * @returns {Array}
 */
var list = _argsToArrayFrom(0);

/**
 * Splits an array-like object in two lists: the first with the elements satisfying the given predicate,
 * the others with the remaining elements.
 * @example
 * const isEven = n => n % 2 === 0;
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 *
 * _.partition(numbers, isEven) // => [[2, 4, 6, 8, 10], [1, 3, 5, 7, 9]]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.partitionWith|partitionWith}
 * @since 0.11.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Array<Array, Array>}
 */
function partition (arrayLike, predicate) {
    var result = [[], []];
    var len = arrayLike.length;

    for (var i = 0, el; i < len; i++) {
        el = arrayLike[i];
        result[predicate(el, i, arrayLike) ? 0 : 1].push(el);
    }

    return result;
}

/**
 * A curried version of {@link module:lamb.partition|partition} that uses the provided
 * predicate to build a function expecting the array-like object to act upon.
 * @example
 * const users = [
 *     {"name": "Jane", "surname": "Doe", "active": false},
 *     {"name": "John", "surname": "Doe", "active": true},
 *     {"name": "Mario", "surname": "Rossi", "active": true},
 *     {"name": "Paolo", "surname": "Bianchi", "active": false}
 * ];
 * const isActive = _.hasKeyValue("active", true);
 * const splitByActiveStatus = _.partitionWith(isActive);
 *
 * splitByActiveStatus(users) // =>
 * // [[
 * //     {"name": "John", "surname": "Doe", "active": true},
 * //     {"name": "Mario", "surname": "Rossi", "active": true}
 * // ], [
 * //     {"name": "Jane", "surname": "Doe", "active": false},
 * //     {"name": "Paolo", "surname": "Bianchi", "active": false}
 * // ]]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.partition|partition}
 * @since 0.11.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var partitionWith = _curry2(partition, true);

/**
 * Returns the value of the object property with the given key.
 * @example
 * const user = {name: "John"};
 *
 * _.getIn(user, "name") // => "John";
 * _.getIn(user, "surname") // => undefined
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.getKey|getKey}
 * @see {@link module:lamb.getPath|getPath}, {@link module:lamb.getPathIn|getPathIn}
 * @since 0.18.0
 * @param {Object} obj
 * @param {String} key
 * @returns {*}
 */
function getIn (obj, key) {
    return obj[key];
}

/**
 * A curried version of {@link module:lamb.getIn|getIn}.<br/>
 * Receives a property name and builds a function expecting the object from which we want to retrieve
 * the property.
 * @example
 * const user1 = {name: "john"};
 * const user2 = {name: "jane"};
 * const getName = _.getKey("name");
 *
 * getName(user1) // => "john"
 * getName(user2) // => "jane"
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.getIn|getIn}
 * @see {@link module:lamb.getPath|getPath}, {@link module:lamb.getPathIn|getPathIn}
 * @since 0.1.0
 * @param {String} key
 * @returns {Function}
 */
var getKey = _curry2(getIn, true);

/**
 * A curried version of {@link module:lamb.pluckFrom|pluckFrom} expecting the key to retrieve to
 * build a function waiting for the array-like object to act upon.
 * @example
 * const persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 15}
 * ];
 * const getAges = _.pluck("age");
 *
 * getAges(persons) // => [12, 40, 18, 15]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.pluckFrom|pluckFrom}
 * @since 0.12.0
 * @param {String} key
 * @returns {Function}
 */
var pluck = compose(mapWith, getKey);

/**
 * "Plucks" the values of the specified key from a list of objects.
 * @example
 * const persons = [
 *     {"name": "Jane", "surname": "Doe", "age": 12},
 *     {"name": "John", "surname": "Doe", "age": 40},
 *     {"name": "Mario", "surname": "Rossi", "age": 18},
 *     {"name": "Paolo", "surname": "Bianchi", "age": 15}
 * ];
 *
 * _.pluckFrom(persons, "age") // => [12, 40, 18, 15]
 *
 * const lists = [
 *     [1, 2],
 *     [3, 4, 5],
 *     [6]
 * ];
 *
 * _.pluckFrom(lists, "length") // => [2, 3, 1]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.pluck|pluck}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {String} key
 * @returns {Array}
 */
function pluckFrom (arrayLike, key) {
    return map(arrayLike, getKey(key));
}

/**
 * Creates an array copy of the given array-like object without the
 * specified values.<br/>
 * The equality test is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.pullFrom(arr, [2, 5]) // => [1, 3, 4]
 *
 * @example <caption>It's not the same as {@link module:lamb.difference|difference}:</caption>
 *
 * const arr = [1,1,2,3,4,4,5];
 *
 * _.pullFrom(arr, [1, 2]) // => [3, 4, 4, 5]
 * _.difference(arr, [1, 2]) // => [3, 4, 5]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.pull|pull}
 * @see {@link module:lamb.difference|difference}
 * @since 0.45.0
 * @param {ArrayLike} arrayLike
 * @param {ArrayLike} values
 * @returns {Array}
 */
function pullFrom (arrayLike, values) {
    return values ? filter(arrayLike, function (element) {
        return !isIn(values, element);
    }) : slice(arrayLike, 0, arrayLike.length);
}

/**
 * A curried version of {@link module:lamb.pullFrom|pullFrom} expecting
 * a list of values to build a function waiting for an array-like object.<br/>
 * The new function will create an array copy of the array-like without
 * the specified values.<br/>
 * The equality test is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.<br/>
 * See examples in {@link module:lamb.pullFrom|pullFrom} about the
 * relationship with {@link module:lamb.difference|difference}.
 * @example
 * const scores = [40, 20, 30, 10];
 * const newScores = [30, 10];
 * const pullNewScores = _.pull(newScores);
 *
 * pullNewScores(scores) // => [40, 20]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.pullFrom|pullFrom}
 * @see {@link module:lamb.difference|difference}
 * @since 0.45.0
 * @param {ArrayLike} values
 * @returns {Function}
 */
var pull = _curry2(pullFrom, true);

/**
 * Same as {@link module:lamb.reduce|reduce}, but starts the fold operation from the last
 * element instead.<br/>
 * Note that unlike the native array method this function doesn't skip unassigned or deleted indexes.
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.reduce|reduce}
 * @see {@link module:lamb.reduceWith|reduceWith}, {@link module:lamb.reduceRightWith|reduceRightWith}
 * @since 0.1.0
 * @param {ArrayLike} arrayLike
 * @param {AccumulatorCallback} accumulator
 * @param {*} [initialValue]
 * @returns {*}
 */
var reduceRight = _makeReducer(-1);

/**
 * A partial application of {@link module:lamb.reduce|reduceRight} that uses the
 * provided <code>accumulator</code> and the optional <code>initialValue</code> to
 * build a function expecting the array-like object to act upon.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.reduceRightWith(_.sum)(arr) // => 15
 * _.reduceRightWith(_.subtract)(arr) // => -5
 * _.reduceRightWith(_.subtract, 0)(arr) // => -15
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.reduceWith|reduceWith}
 * @see {@link module:lamb.reduce|reduce}, {@link module:lamb.reduce|reduceRight}
 * @since 0.27.0
 * @param {AccumulatorCallback} accumulator
 * @param {*} [initialValue]
 * @returns {Function}
 */
var reduceRightWith = _makePartial3(reduceRight, true);

/**
 * Reverses a copy of the given array-like object.
 * @example
 * const arr = [1, 2, 3];
 *
 * _.reverse(arr) // => [3, 2, 1];
 *
 * // `arr` still is [1, 2, 3]
 *
 * @memberof module:lamb
 * @category Array
 * @since 0.19.0
 * @param {ArrayLike} arrayLike
 * @returns {Array}
 */
function reverse (arrayLike) {
    var len = _toArrayLength(arrayLike.length);
    var result = Array(len);

    for (var i = 0, ofs = len - 1; i < len; i++) {
        result[i] = arrayLike[ofs - i];
    }

    return result;
}

/**
 * Returns a copy of the given array-like with the element rotated by the desired amount.
 * Negative indexes are allowed.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.rotate(arr, 3) // => [3, 4, 5, 1, 2]
 * _.rotate(arr, -3) // => [4, 5, 1, 2, 3]
 * _.rotate(arr, 11) // => [5, 1, 2, 3, 4]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.rotateBy|rotateBy}
 * @since 0.55.0
 * @param {ArrayLike} arrayLike
 * @param {Number} amount
 * @returns {Array}
 */
function rotate (arrayLike, amount) {
    var len = arrayLike.length;
    var shift = amount % len;

    return slice(arrayLike, -shift, len).concat(slice(arrayLike, 0, -shift));
}

/**
 * A curried version of {@link module:lamb.rotate|rotate}.<br/>
 * Uses the given amount to build a function expecting the array to rotate by that amount.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const rotateByTwo = _.rotateBy(2);
 *
 * rotateByTwo(arr) // => [4, 5, 1, 2, 3]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.rotate|rotate}
 * @since 0.55.0
 * @param {Number} amount
 * @returns {Function}
 */
var rotateBy = _curry2(rotate, true);

/**
 * Sets an index in an array-like object.<br/>
 * If provided with an updater function it will use it to update the current value,
 * otherwise sets the index to the specified value.
 * @private
 * @param {ArrayLike} arrayLike
 * @param {Number} idx
 * @param {*} [value]
 * @param {Function} [updater]
 * @returns {Array}
 */
function _setIndex (arrayLike, idx, value, updater) {
    var result = slice(arrayLike, 0, arrayLike.length);
    var n = _toNaturalIndex(idx, result.length);

    if (n === n) { // eslint-disable-line no-self-compare
        result[n] = arguments.length === 4 ? updater(arrayLike[n]) : value;
    }

    return result;
}

/**
 * A curried version of {@link module:lamb.setIndex|setIndex} that builds
 * a function that creates a copy of an array-like object with the given
 * index changed to the desired value.<br/>
 * If the index is not an integer or if it's out of bounds, the function
 * will return a copy of the original array.<br/>
 * Negative indexes are allowed.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.setAt(2, 99)(arr) // => [1, 2, 99, 4, 5]
 * arr // => [1, 2, 3, 4, 5]
 *
 * _.setAt(10, 99)(arr) // => [1, 2, 3, 4, 5] (not a reference to `arr`)
 *
 * @example <caption>Using negative indexes:</caption>
 * _.setAt(-1, 99)(arr) // => [1, 2, 3, 4, 99]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.setIndex|setIndex}
 * @since 0.17.0
 * @param {Number} index
 * @param {*} value
 * @returns {Function}
 */
var setAt = _makePartial3(_setIndex);

/**
 * Builds a new function that passes only the specified amount of arguments to the original one.<br/>
 * As {@link module:lamb.slice|slice} is used to extract the arguments, you can also
 * pass a negative arity.
 * @example
 * Math.max(10, 11, 45, 99) // => 99
 * _.aritize(Math.max, 2)(10, 11, 45, 99) // => 11
 *
 * @example <caption>Using a negative arity:</caption>
 * _.aritize(Math.max, -1)(10, 11, 45, 99) // => 45
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.binary|binary}, {@link module:lamb.unary|unary} for common use cases shortcuts
 * @since 0.1.0
 * @param {Function} fn
 * @param {Number} arity
 * @returns {Function}
 */
function aritize (fn, arity) {
    return function () {
        var n = _toInteger(arity);
        var args = list.apply(null, arguments).slice(0, n);

        for (var i = args.length; i < n; i++) {
            args[i] = void 0;
        }

        return fn.apply(this, args);
    };
}

/**
 * Creates a copy of an array-like object with the given index changed to
 * the desired value.<br/>
 * If the index is not an integer or if it's out of bounds, the function
 * will return a copy of the original array.<br/>
 * Negative indexes are allowed.
 * @example
 * const arr = [1, 2, 3];
 *
 * _.setIndex(arr, 1, 99) // => [1, 99, 3]
 * _.setIndex(arr, -1, 99) // => [1, 2, 99]
 * _.setIndex(arr, 10, 99) // => [1, 2, 3] (not a reference to `arr`)
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.setAt|setAt}
 * @since 0.23.0
 * @param {ArrayLike} arrayLike
 * @param {Number} index
 * @param {*} value
 * @returns {Array}
 */
var setIndex = aritize(_setIndex, 3);

/**
 * Flattens the "first level" of an array.
 * @example <caption>Showing the difference with <code>flatten</code>:</caption>
 * const arr = [1, 2, [3, 4, [5, 6]], 7, 8];
 *
 * _.flatten(arr) // => [1, 2, 3, 4, 5, 6, 7, 8]
 * _.shallowFlatten(arr) // => [1, 2, 3, 4, [5, 6], 7, 8]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.flatten|flatten}
 * @since 0.9.0
 * @param {Array} array
 * @returns {Array}
 */
var shallowFlatten = _makeArrayFlattener(false);

/**
 * Checks if at least one element in an array-like object satisfies the given predicate.<br/>
 * The function will stop calling the predicate as soon as it returns a <em>truthy</em> value.<br/>
 * Note that unlike the native
 * [Array.prototype.some]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some},
 * this function won't skip deleted or unassigned indexes.
 * @example
 * const persons = [
 *     {"name": "Jane", "age": 12, active: false},
 *     {"name": "John", "age": 40, active: false},
 *     {"name": "Mario", "age": 17, active: false},
 *     {"name": "Paolo", "age": 15, active: false}
 * ];
 * const isAdult = _.keySatisfies(_.isGTE(18), "age");
 * const isActive = _.hasKeyValue("active", true);
 *
 * _.someIn(persons, isAdult) // => true
 * _.someIn(persons, isActive) // => false
 *
 * @example <caption>Showing the difference with <code>Array.prototype.some</code>:</caption>
 * const arr = new Array(5);
 * arr[3] = 99;
 *
 * arr.some(_.isUndefined) // => false
 * _.someIn(arr, _.isUndefined) // => true
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.some|some}
 * @see {@link module:lamb.every|every}, {@link module:lamb.everyIn|everyIn}
 * @since 0.39.0
 * @param {ArrayLike} arrayLike
 * @param {ListIteratorCallback} predicate
 * @returns {Boolean}
 */
var someIn = _makeArrayChecker(false);

/**
 * A curried version of {@link module:lamb.someIn|someIn} that uses the given predicate to
 * build a function waiting for the array-like to act upon.
 * @example
 * const data = [1, 3, 5, 6, 7, 8];
 * const isEven = n => n % 2 === 0;
 * const containsEvens = _.some(isEven);
 * const containsStrings = _.some(_.isType("String"));
 *
 * containsEvens(data) // => true
 * containsStrings(data) // => false
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.someIn|someIn}
 * @see {@link module:lamb.every|every}, {@link module:lamb.everyIn|everyIn}
 * @since 0.39.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var some = _curry2(someIn, true);

/**
 * Accepts a list of sorting criteria with at least one element
 * and builds a function that compares two values with such criteria.
 * @private
 * @param {Sorter[]} criteria
 * @returns {Function}
 */
function _compareWith (criteria) {
    return function (a, b) {
        var len = criteria.length;
        var criterion = criteria[0];
        var result = criterion.compare(a.value, b.value);

        for (var i = 1; result === 0 && i < len; i++) {
            criterion = criteria[i];
            result = criterion.compare(a.value, b.value);
        }

        if (result === 0) {
            result = a.index - b.index;
        }

        return criterion.isDescending ? -result : result;
    };
}

/**
 * The default comparer for sorting functions.<br/>
 * If the given values are of different types they
 * will be both converted to strings.<br/>
 * Uses the SameValueZero comparison.
 * @private
 * @param {*} a
 * @param {*} b
 * @returns {Number} -1 | 0 | 1
 */
function _comparer (a, b) {
    var result = 0;

    if (typeof a !== typeof b) {
        a = String(a);
        b = String(b);
    }

    if (!areSVZ(a, b)) {
        // eslint-disable-next-line no-self-compare
        result = a > b || a !== a ? 1 : -1;
    }

    return result;
}

/**
 * Builds a sorting criterion. If the comparer function is missing, the default
 * comparer will be used instead.
 * @private
 * @param {Function} reader
 * @param {Boolean} isDescending
 * @param {Function} [comparer]
 * @returns {Sorter}
 */
function _sorter (reader, isDescending, comparer) {
    if (typeof reader !== "function" || reader === identity) {
        reader = null;
    }

    if (typeof comparer !== "function") {
        comparer = _comparer;
    }

    return {
        isDescending: isDescending === true,
        compare: function (a, b) {
            if (reader) {
                a = reader(a);
                b = reader(b);
            }

            return comparer(a, b);
        }
    };
}

/**
 * Converts a sorting function to a sorting criterion if necessary.
 * @private
 * @param {Function} criterion
 * @returns {Sorter}
 */
function _makeCriterion (criterion) {
    return criterion && typeof criterion.compare === "function" ? criterion : _sorter(criterion);
}

/**
 * Builds a list of sorting criteria from a list of sorter functions. Returns a list containing
 * a single default sorting criterion if the sorter list is empty.
 * @private
 * @param {Function[]} sorters
 * @returns {Sorter[]}
 */
function _makeCriteria (sorters) {
    return sorters && sorters.length ? map(sorters, _makeCriterion) : [_sorter()];
}

/**
 * Returns a [stably]{@link https://en.wikipedia.org/wiki/Sorting_algorithm#Stability} sorted
 * copy of an array-like object using the given criteria.<br/>
 * Sorting criteria are built using Lamb's {@link module:lamb.sorter|sorter} function, but you
 * can also pass simple "reader" functions and default ascending sorters will be built for you.<br/>
 * A "reader" is a function that evaluates the array element and supplies the value to be used
 * in the comparison.<br/>
 * Please note that if the arguments received by the default comparer aren't of the same type,
 * they will be compared as strings.
 *
 * @example <caption>Stable sort:</caption>
 * const persons = [
 *     {"name": "John", "surname" :"Doe"},
 *     {"name": "Mario", "surname": "Rossi"},
 *     {"name": "John", "surname" :"Moe"},
 *     {"name": "Jane", "surname": "Foe"}
 * ];
 *
 * const personsByName = _.sort(persons, [_.getKey("name")]);
 *
 * // personsByName holds:
 * // [
 * //     {"name": "Jane", "surname": "Foe"},
 * //     {"name": "John", "surname" :"Doe"},
 * //     {"name": "John", "surname" :"Moe"},
 * //     {"name": "Mario", "surname": "Rossi"}
 * // ]
 *
 * @example <caption>Stable multi-sort:</caption>
 * const personsByNameAscSurnameDesc = _.sort(persons, [
 *     _.getKey("name"),
 *     _.sorterDesc(_.getKey("surname"))
 * ]);
 *
 * // personsByNameAscSurnameDesc holds:
 * // [
 * //     {"name": "Jane", "surname": "Foe"},
 * //     {"name": "John", "surname" :"Moe"},
 * //     {"name": "John", "surname" :"Doe"},
 * //     {"name": "Mario", "surname": "Rossi"}
 * // ]
 *
 * @example <caption>Using custom comparers:</caption>
 * const localeSorter = new Intl.Collator("it");
 * const chars = ["a", "è", "à", "é", "c", "b", "e"];
 *
 * _.sort(chars, [localeSorter]) // => ["a", "à", "b", "c", "e", "é", "è"]
 *
 * const localeSorterDesc = _.sorterDesc(_.identity, localeSorter.compare);
 *
 * _.sort(chars, [localeSorterDesc]) // => ["è", "é", "e", "c", "b", "à", "a"]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.sortWith|sortWith}
 * @see {@link module:lamb.sorter|sorter}, {@link module:lamb.sorterDesc|sorterDesc}
 * @since 0.15.0
 * @param {ArrayLike} arrayLike
 * @param {Sorter[]|Function[]} [sorters=[{@link module:lamb.sorter|sorter()}]]
 * @returns {Array}
 */
function sort (arrayLike, sorters) {
    var criteria = _makeCriteria(sorters);
    var len = _toArrayLength(arrayLike.length);
    var result = Array(len);

    for (var i = 0; i < len; i++) {
        result[i] = { value: arrayLike[i], index: i };
    }

    result.sort(_compareWith(criteria));

    for (i = 0; i < len; i++) {
        result[i] = result[i].value;
    }

    return result;
}

/**
 * Establishes at which index an element should be inserted in a sorted array to respect
 * the array order. Needs the comparer used to sort the array.
 * @private
 * @param {Array} array
 * @param {*} element
 * @param {Function} comparer
 * @param {Number} start
 * @param {Number} end
 * @returns {Number}
 */
function _getInsertionIndex (array, element, comparer, start, end) {
    if (array.length === 0) {
        return 0;
    }

    var pivot = (start + end) >> 1;
    var result = comparer(
        { value: element, index: pivot },
        { value: array[pivot], index: pivot }
    );

    if (end - start <= 1) {
        return result < 0 ? pivot : pivot + 1;
    } else if (result < 0) {
        return _getInsertionIndex(array, element, comparer, start, pivot);
    } else if (result === 0) {
        return pivot + 1;
    } else {
        return _getInsertionIndex(array, element, comparer, pivot, end);
    }
}

/**
 * Inserts an element in a copy of a sorted array respecting the sort order.
 * @example <caption>With simple values:</caption>
 * _.sortedInsert([], 1) // => [1]
 * _.sortedInsert([2, 4, 6], 5) // => [2, 4, 5, 6]
 * _.sortedInsert([4, 2, 1], 3, _.sorterDesc()) // => [4, 3, 2, 1]
 *
 * @example <caption>With complex values:</caption>
 * const persons = [
 *     {"name": "jane", "surname": "doe"},
 *     {"name": "John", "surname": "Doe"},
 *     {"name": "Mario", "surname": "Rossi"}
 * ];
 *
 * const getLowerCaseName = _.compose(
 *     _.invoke("toLowerCase"),
 *     _.getKey("name")
 * );
 *
 * const result = _.sortedInsert(
 *     persons,
 *     {"name": "marco", "surname": "Rossi"},
 *     getLowerCaseName
 * );
 *
 * // `result` holds:
 * // [
 * //     {"name": "jane", "surname": "doe"},
 * //     {"name": "John", "surname": "Doe"},
 * //     {"name": "marco", "surname": "Rossi"},
 * //     {"name": "Mario", "surname": "Rossi"}
 * // ]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.sort|sort}, {@link module:lamb.sortWith|sortWith}
 * @see {@link module:lamb.sorter|sorter}, {@link module:lamb.sorterDesc|sorterDesc}
 * @see {@link module:lamb.insert|insert}, {@link module:lamb.insertAt|insertAt} to insert the element
 * at a specific index
 * @since 0.27.0
 * @param {ArrayLike} arrayLike
 * @param {*} element
 * @param {Sorter[]|Function[]} [sorters=[{@link module:lamb.sorter|sorter()}]] - The sorting criteria
 * used to sort the array.
 * @returns {Array}
 */
function sortedInsert (arrayLike, element, sorters) {
    var result = slice(arrayLike, 0, arrayLike.length);

    if (arguments.length === 1) {
        return result;
    }

    var criteria = _makeCriteria(sorters);
    var idx = _getInsertionIndex(result, element, _compareWith(criteria), 0, result.length);

    result.splice(idx, 0, element);

    return result;
}

/**
 * Creates an ascending sort criterion with the provided <code>reader</code> and
 * <code>comparer</code>.<br/>
 * See {@link module:lamb.sort|sort} for various examples.
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.sortedInsert|sortedInsert}
 * @see {@link module:lamb.sort|sort}, {@link module:lamb.sortWith|sortWith}
 * @see {@link module:lamb.sorterDesc|sorterDesc}
 * @since 0.1.0
 * @param {Function} [reader={@link module:lamb.identity|identity}] A function meant to generate a
 * simple value from a complex one. The function should evaluate the array element and supply the
 * value to be passed to the comparer.
 * @param {Function} [comparer] An optional custom comparer function.
 * @returns {Sorter}
 */
var sorter = partial(_sorter, [__, false, __]);

/**
 * Creates a descending sort criterion with the provided <code>reader</code> and
 * <code>comparer</code>.<br/>
 * See {@link module:lamb.sort|sort} for various examples.
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.sortedInsert|sortedInsert}
 * @see {@link module:lamb.sort|sort}, {@link module:lamb.sortWith|sortWith}
 * @see {@link module:lamb.sorter|sorter}
 * @since 0.15.0
 * @param {Function} [reader={@link module:lamb.identity|identity}] A function meant to generate a
 * simple value from a complex one. The function should evaluate the array element and supply the
 * value to be passed to the comparer.
 * @param {Function} [comparer] An optional custom comparer function.
 * @returns {Sorter}
 */
var sorterDesc = partial(_sorter, [__, true, __]);

/**
 * Builds a partial application of {@link module:lamb.sort|sort} using the provided criteria.
 * The returned function expects the array-like object to sort.
 * As usual, sorting criteria are built using Lamb's {@link module:lamb.sorter|sorter} function,
 * but you can also pass simple "reader" functions and default ascending sorters will be built.<br/>
 * A "reader" is a function that evaluates the array element and supplies the value to be used in
 * the comparison.<br/>
 * See {@link module:lamb.sort|sort} for more examples.
 *
 * @example
 * var sortAsNumbers = _.sortWith([parseFloat]);
 * var weights = ["2 Kg", "10 Kg", "1 Kg", "7 Kg"];
 *
 * sortAsNumbers(weights) // => ["1 Kg", "2 Kg", "7 Kg", "10 Kg"]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.sort|sort}
 * @see {@link module:lamb.sorter|sorter}, {@link module:lamb.sorterDesc|sorterDesc}
 * @since 0.15.0
 * @param {Sorter[]|Function[]} [sorters=[{@link module:lamb.sorter|sorter()}]]
 * @returns {Function}
 */
var sortWith = _curry2(sort, true);

/**
 * Returns a copy of the given array-like object without the first element.
 * @example
 * _.tail([1, 2, 3, 4]) // => [2, 3, 4]
 * _.tail([1]) // => []
 * _.tail([]) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.init|init}
 * @see {@link module:lamb.head|head}, {@link module:lamb.last|last}
 * @since 0.16.0
 * @param {ArrayLike} arrayLike
 * @returns {Array}
 */
var tail = drop(1);

/**
 * Retrieves the first <code>n</code> elements from an array or array-like object.<br/>
 * Note that, being this a shortcut for a common use case of {@link module:lamb.slice|slice},
 * <code>n</code> can be a negative number.
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * _.takeFrom(arr, 3) // => [1, 2, 3]
 * _.takeFrom(arr, -1) // => [1, 2, 3, 4]
 * _.takeFrom(arr, -10) // => []
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.take|take}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @since 0.51.0
 * @param {ArrayLike} arrayLike
 * @param {Number} n
 * @returns {Array}
 */
function takeFrom (arrayLike, n) {
    return slice(arrayLike, 0, n);
}

/**
 * A curried version of {@link module:lamb.takeFrom|takeFrom} that expects the number of elements
 * to retrieve to build a function waiting for the list to take the elements from.<br/>
 * See the note and examples for {@link module:lamb.takeFrom|takeFrom} about passing a
 * negative <code>n</code>.
 * @example
 * const take2 = _.take(2);
 *
 * take2([1, 2, 3, 4, 5]) // => [1, 2]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.takeFrom|takeFrom}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @since 0.5.0
 * @param {Number} n
 * @returns {Function}
 */
var take = _curry2(takeFrom, true);

/**
 * Builds a function that takes the last elements satisfying a predicate
 * from an array or array-like object.
 * @example
 * const isEven = n => n % 2 === 0;
 * const takeLastWhileIsEven = _.takeLastWhile(isEven);
 *
 * takeLastWhileIsEven([1, 3, 5, 7]) // => []
 * takeLastWhileIsEven([2, 3, 6, 8]) // => [6, 8]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.dropLastWhile|dropLastWhile}
 * @see {@link module:lamb.takeWhile|takeWhile}, {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @since 0.58.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var takeLastWhile = _takeOrDropWhile(true, true);

/**
 * Builds a function that takes the first elements satisfying a predicate from
 * an array or array-like object.
 * @example
 * const isEven = n => n % 2 === 0;
 * const takeWhileIsEven = _.takeWhile(isEven);
 *
 * takeWhileIsEven([1, 2, 4, 6, 8]) // => []
 * takeWhileIsEven([2, 4, 7, 8]) // => [2, 4]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.dropWhile|dropWhile}
 * @see {@link module:lamb.takeLastWhile|takeLastWhile}, {@link module:lamb.dropLastWhile|dropLastWhile}
 * @see {@link module:lamb.takeFrom|takeFrom}, {@link module:lamb.take|take}
 * @see {@link module:lamb.dropFrom|dropFrom}, {@link module:lamb.drop|drop}
 * @since 0.5.0
 * @param {ListIteratorCallback} predicate
 * @returns {Function}
 */
var takeWhile = _takeOrDropWhile(true, false);

/**
 * Transposes a matrix. Can also be used to reverse a {@link module:lamb.zip|zip} operation.<br/>
 * Just like {@link module:lamb.zip|zip}, the received array-like objects will be truncated to the
 * shortest length.
 * @example <caption>Transposing a matrix:</caption>
 * _.transpose([
 *     [1, 2, 3],
 *     [4, 5, 6],
 *     [7, 8, 9]
 * ]) // =>
 * // [
 * //     [1, 4, 7],
 * //     [2, 5, 8],
 * //     [3, 6, 9]
 * // ]
 *
 * @example <caption>Showing the relationship with <code>zip</code>:</caption>
 * const zipped = _.zip(["a", "b", "c"], [1, 2, 3]); // => [["a", 1], ["b", 2], ["c", 3]]
 *
 * _.transpose(zipped) // => [["a", "b", "c"], [1, 2, 3]]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.zip|zip}
 * @since 0.14.0
 * @param {ArrayLike<ArrayLike>} arrayLike
 * @returns {Array<Array>}
 */
function transpose (arrayLike) {
    var minLen = MAX_ARRAY_LENGTH;
    var len = _toArrayLength(arrayLike.length);

    if (len === 0) {
        return [];
    }

    for (var j = 0, elementLen; j < len; j++) {
        elementLen = _toArrayLength(arrayLike[j].length);

        if (elementLen < minLen) {
            minLen = elementLen;
        }
    }

    var result = Array(minLen);

    for (var i = 0, el; i < minLen; i++) {
        el = result[i] = Array(len);

        for (j = 0; j < len; j++) {
            el[j] = arrayLike[j][i];
        }
    }

    return result;
}

/**
 * Builds a TypeError stating that it's not possible to convert the given value to the
 * desired type.
 * @private
 * @param {*} value
 * @param {String} desiredType
 * @returns {TypeError}
 */
function _makeTypeErrorFor (value, desiredType) {
    return new TypeError("Cannot convert " + type(value).toLowerCase() + " to " + desiredType);
}

/**
 * Creates a pipeline of functions, where each function consumes the result of the previous one.
 * @example
 * const square = n => n ** 2;
 * const getMaxAndSquare = _.pipe([Math.max, square]);
 *
 * getMaxAndSquare(3, 5) // => 25
 *
 * @memberof module:lamb
 * @category Function
 * @function
 * @see {@link module:lamb.compose|compose}
 * @since 0.1.0
 * @param {Function[]} functions
 * @returns {Function}
 */
function pipe (functions) {
    if (!Array.isArray(functions)) {
        throw _makeTypeErrorFor(functions, "array");
    }

    var len = functions.length;

    return len ? function () {
        var result = functions[0].apply(this, arguments);

        for (var i = 1; i < len; i++) {
            result = functions[i].call(this, result);
        }

        return result;
    } : identity;
}

/**
 * Using the provided iteratee to transform values, builds a function that will
 * return an array of the unique elements  in the two provided array-like objects.<br/>
 * Uses the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}
 * to test the equality of values.<br/>
 * When two values are considered equal, the first occurence will be the one included
 * in the result array.<br/>
 * See also {@link module:lamb.union|union} if you don't need to compare transformed values.
 * @example
 * const unionByFloor = _.unionBy(Math.floor);
 *
 * unionByFloor([2.8, 3.2, 1.5], [3.5, 1.2, 4]) // => [2.8, 3.2, 1.5, 4]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.union|union}
 * @see {@link module:lamb.difference|difference}
 * @see {@link module:lamb.intersection|intersection}
 * @since 0.51.0
 * @param {ListIteratorCallback} iteratee
 * @returns {Function}
 */
function unionBy (iteratee) {
    return pipe([binary(list), flatMapWith(drop(0)), uniquesBy(iteratee)]);
}

/**
 * Returns a list of every unique element present in the two given array-like objects.<br/>
 * Uses the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}
 * to test the equality of values.<br/>
 * When two values are considered equal, the first occurence will be the one included
 * in the result array.<br/>
 * See also {@link module:lamb.unionBy|unionBy} if you need to transform the values before
 * the comparison or if you have to extract them from complex ones.
 * @example
 * _.union([1, 2, 3, 2], [2, 3, 4]) // => [1, 2, 3, 4]
 * _.union("abc", "bcd") // => ["a", "b", "c", "d"]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.unionBy|unionBy}
 * @see {@link module:lamb.difference|difference}
 * @see {@link module:lamb.intersection|intersection}
 * @since 0.5.0
 * @param {ArrayLike} a
 * @param {ArrayLike} b
 * @returns {Array}
 */
var union = unionBy(identity);

/**
 * Builds a function that creates a copy of an array-like object with the given index
 * changed by applying the provided function to its value.<br/>
 * If the index is not an integer or if it's out of bounds, the function will return
 * a copy of the original array.<br/>
 * Negative indexes are allowed.
 * @example
 * const arr = ["a", "b", "c"];
 * const toUpperCase = _.invoke("toUpperCase");
 *
 * _.updateAt(1, toUpperCase)(arr) // => ["a", "B", "c"]
 * _.updateAt(-1, toUpperCase)(arr) // => ["a", "b", "C"]
 * _.updateAt(10, toUpperCase)(arr) // => ["a", "b", "c"] (not a reference to `arr`)
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.updateIndex|updateIndex}
 * @since 0.22.0
 * @param {Number} index
 * @param {Function} updater
 * @returns {Function}
 */
function updateAt (index, updater) {
    return function (arrayLike) {
        return _setIndex(arrayLike, index, null, updater);
    };
}

/**
 * Creates a copy of an array-like object with the given index changed by applying the
 * provided function to its value.<br/>
 * If the index is not an integer or if it's out of bounds, the function will return
 * a copy of the original array.<br/>
 * Negative indexes are allowed.
 * @example
 * const arr = ["a", "b", "c"];
 * const toUpperCase = _.invoke("toUpperCase");
 *
 * _.updateIndex(arr, 1, toUpperCase) // => ["a", "B", "c"]
 * _.updateIndex(arr, -1, toUpperCase) // => ["a", "b", "C"]
 * _.updateIndex(arr, 10, toUpperCase) // => ["a", "b", "c"] (not a reference to `arr`)
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.updateAt|updateAt}
 * @since 0.23.0
 * @param {ArrayLike} arrayLike
 * @param {Number} index
 * @param {Function} updater
 * @returns {Array}
 */
var updateIndex = partial(_setIndex, [__, __, null, __]);

/**
 * Builds a list of arrays out of the two given array-like objects by pairing items with
 * the same index.<br/>
 * The received array-like objects will be truncated to the shortest length.
 * @example
 * _.zip(
 *     ["a", "b", "c"],
 *     [1, 2, 3]
 * ) // => [["a", 1], ["b", 2], ["c", 3]]
 *
 * _.zip([1, 2, 3, 4], [5, 6, 7]) // => [[1, 5], [2, 6], [3, 7]]
 *
 * @memberof module:lamb
 * @category Array
 * @see {@link module:lamb.transpose|transpose} for the reverse operation
 * @see {@link module:lamb.zipWithIndex|zipWithIndex}
 * @since 0.14.0
 * @param {ArrayLike} a
 * @param {ArrayLike} b
 * @returns {Array<Array>}
 */
function zip (a, b) {
    return transpose([a, b]);
}

/**
 * "{@link module:lamb.zip|Zips}" an array-like object by pairing its values with their index.
 * @example
 * _.zipWithIndex(["a", "b", "c"]) // => [["a", 0], ["b", 1], ["c", 2]]
 *
 * @memberof module:lamb
 * @category Array
 * @function
 * @see {@link module:lamb.zip|zip}
 * @since 0.14.0
 * @param {ArrayLike} arrayLike
 * @returns {Array<Array<*, Number>>}
 */
var zipWithIndex = mapWith(binary(list));

/**
 * Applies the given function to a list of arguments.
 * @example
 * _.application(_.sum, [3, 4]) // => 7
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.apply|apply}, {@link module:lamb.applyTo|applyTo}
 * @since 0.47.0
 * @param {Function} fn
 * @param {ArrayLike} args
 * @returns {*}
 */
function application (fn, args) {
    return fn.apply(this, Object(args));
}

/**
 * A left-curried version of {@link module:lamb.application|application}. Expects the function
 * to apply and builds a function waiting for the arguments array.
 * @example
 * const arrayMax = _.apply(Math.max);
 *
 * arrayMax([4, 5, 2, 6, 1]) // => 6
 *
 * @memberof module:lamb
 * @category Function
 * @function
 * @see {@link module:lamb.application|application}, {@link module:lamb.applyTo|applyTo}
 * @since 0.1.0
 * @param {Function} fn
 * @returns {Function}
 */
var apply = _curry2(application);

/**
 * A right-curried version of {@link module:lamb.application|application}. Expects an array-like
 * object to use as arguments and builds a function waiting for the target of the application.
 * @example
 * const data = [3, 4];
 * const applyToData = _.applyTo(data);
 *
 * applyToData(_.sum) // => 7
 * applyToData(_.multiply) // => 12
 *
 * @memberof module:lamb
 * @category Function
 * @function
 * @see {@link module:lamb.application|application}, {@link module:lamb.apply|apply}
 * @since 0.47.0
 * @param {ArrayLike} args
 * @returns {Function}
 */
var applyTo = _curry2(application, true);

/**
 * Keeps building a partial application of the received function as long
 * as it's called with placeholders; applies the original function to
 * the collected parameters otherwise.<br/>
 * The function checks only the public placeholder to gain a little performance
 * as no function in Lamb is built with {@link module:lamb.asPartial|asPartial}.
 * @private
 * @param {Function} fn
 * @param {Array} argsHolder
 * @returns {Function|*}
 */
function _asPartial (fn, argsHolder) {
    return function () {
        var argsLen = arguments.length;
        var lastIdx = 0;
        var newArgs = [];

        for (var i = 0, len = argsHolder.length, boundArg; i < len; i++) {
            boundArg = argsHolder[i];
            newArgs[i] = boundArg === __ && lastIdx < argsLen ? arguments[lastIdx++] : boundArg;
        }

        while (lastIdx < argsLen) {
            newArgs[i++] = arguments[lastIdx++];
        }

        for (i = 0; i < argsLen; i++) {
            if (arguments[i] === __) {
                return _asPartial(fn, newArgs);
            }
        }

        for (i = 0, len = newArgs.length; i < len; i++) {
            if (newArgs[i] === __) {
                newArgs[i] = void 0;
            }
        }

        return fn.apply(this, newArgs);
    };
}

/**
 * Decorates the received function so that it can be called with
 * placeholders to build a partial application of it.<br/>
 * The difference with {@link module:lamb.partial|partial} is that, as long as
 * you call the generated function with placeholders, another partial application
 * of the original function will be built.<br/>
 * The final application will happen when one of the generated functions is
 * invoked without placeholders, using the parameters collected so far. <br/>
 * This function comes in handy when you need to build different specialized
 * functions starting from a basic one, but it's also useful when dealing with
 * optional parameters as you can decide to apply the function even if its arity
 * hasn't been entirely consumed.
 * @example <caption>Explaining the function's behaviour:</caption>
 * const __ = _.__;
 * const f = _.asPartial((a, b, c) => a + b + c);
 *
 * f(4, 3, 2) // => 9
 * f(4, __, 2)(3) // => 9
 * f(__, 3, __)(4, __)(2) // => 9
 *
 * @example <caption>Exploiting optional parameters:</caption>
 * const __ = _.__;
 * const f = _.asPartial((a, b, c) => a + b + (c || 0));
 *
 * const addFive = f(5, __);
 * addFive(2) // => 7
 *
 * const addNine = addFive(4, __);
 * addNine(11) // => 20
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.__|__} The placeholder object.
 * @since 0.36.0
 * @param {Function} fn
 * @returns {Function}
 */
function asPartial (fn) {
    return _asPartial(fn, []);
}

/**
 * Accepts a series of functions and builds a new function. The functions in the series
 * will then be applied, in order, with the values received by the function built with
 * <code>collect</code>.<br/>
 * The collected results will be returned in an array.
 * @example
 * const user = {
 *     id: "jdoe",
 *     name: "John",
 *     surname: "Doe",
 *     scores: [2, 4, 7]
 * };
 * const getIDAndLastScore = _.collect([_.getKey("id"), _.getPath("scores.-1")]);
 *
 * getIDAndLastScore(user) // => ["jdoe", 7]
 *
 * @example
 * const minAndMax = _.collect([Math.min, Math.max]);
 *
 * minAndMax(3, 1, -2, 5, 4, -1) // => [-2, 5]
 *
 * @memberof module:lamb
 * @category Function
 * @since 0.35.0
 * @param {Function[]} functions
 * @returns {Function}
 */
function collect (functions) {
    if (!Array.isArray(functions)) {
        throw _makeTypeErrorFor(functions, "array");
    }

    return function () {
        return map(functions, applyTo(arguments));
    };
}

/**
 * Used by curry functions to collect arguments until the arity is consumed,
 * then applies the original function.
 * @private
 * @param {Function} fn
 * @param {Number} arity
 * @param {Boolean} isRightCurry
 * @param {Boolean} isAutoCurry
 * @param {Array} argsHolder
 * @returns {Function}
 */
function _currier (fn, arity, isRightCurry, isAutoCurry, argsHolder) {
    return function () {
        var holderLen = argsHolder.length;
        var argsLen = arguments.length;
        var newArgsLen = holderLen + (argsLen > 1 && isAutoCurry ? argsLen : 1);
        var newArgs = Array(newArgsLen);

        for (var i = 0; i < holderLen; i++) {
            newArgs[i] = argsHolder[i];
        }

        for (; i < newArgsLen; i++) {
            newArgs[i] = arguments[i - holderLen];
        }

        if (newArgsLen >= arity) {
            return fn.apply(this, isRightCurry ? newArgs.reverse() : newArgs);
        } else {
            return _currier(fn, arity, isRightCurry, isAutoCurry, newArgs);
        }
    };
}

/**
 * Curries a function of arity 3.
 * @private
 * @param {Function} fn
 * @param {Boolean} [isRightCurry=false]
 * @returns {Function}
 */
function _curry3 (fn, isRightCurry) {
    return function (a) {
        return function (b) {
            return function (c) {
                return isRightCurry ? fn.call(this, c, b, a) : fn.call(this, a, b, c);
            };
        };
    };
}

/**
 * Prepares a function for currying. If it's not auto-currying and the arity
 * is 2 or 3 returns optimized functions, otherwise delegates the currying
 * to the <code>_currier</code> function.<br/>
 * If the desumed arity isn't greater than one, it will return the received
 * function itself, instead.
 * @private
 * @param {Function} fn
 * @param {Number} [arity=fn.length]
 * @param {Boolean} [isRightCurry=false]
 * @param {Boolean} [isAutoCurry=false]
 * @returns {Function}
 */
function _curry (fn, arity, isRightCurry, isAutoCurry) {
    if (arity >>> 0 !== arity) {
        arity = fn.length;
    }

    if (isAutoCurry && arity > 1 || arity > 3) {
        return _currier(fn, arity, isRightCurry, isAutoCurry, []);
    } else if (arity === 2) {
        return _curry2(fn, isRightCurry);
    } else if (arity === 3) {
        return _curry3(fn, isRightCurry);
    } else {
        return fn;
    }
}

/**
 * Transforms the evaluation of the given function in the evaluation of a sequence of functions
 * expecting only one argument. Each function of the sequence is a partial application of the
 * original one, which will be applied when the specified (or derived) arity is consumed.<br/>
 * Currying will start from the leftmost argument: use {@link module:lamb.curryRight|curryRight}
 * for right currying.
 * @example
 * const makeWithKeys = _.curry(_.make);
 * const makePerson = makeWithKeys(["name", "surname"]);
 *
 * makePerson(["John", "Doe"]) // => {name: "John", surname: "Doe"};
 * makePerson(["Mario", "Rossi"]) // => {name: "Mario", surname: "Rossi"};
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.1.0
 * @param {Function} fn
 * @param {Number} [arity=fn.length]
 * @returns {Function}
 */
function curry (fn, arity) {
    return _curry(fn, arity, false);
}

/**
 * Builds an auto-curried function. The resulting function can be called multiple times with
 * any number of arguments, and the original function will be applied only when the specified
 * (or derived) arity is consumed.<br/>
 * Currying will start from the leftmost argument: use {@link module:lamb.curryableRight|curryableRight}
 * for right currying.
 * @example
 * const collectFourElements = _.curryable(_.list, 4);
 *
 * collectFourElements(2)(3)(4)(5) // => [2, 3, 4, 5]
 * collectFourElements(2)(3, 4)(5) // => [2, 3, 4, 5]
 * collectFourElements(2, 3, 4, 5) // => [2, 3, 4, 5]
 * collectFourElements(2, 3)(4, 5) // => [2, 3, 4, 5]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.6.0
 * @param {Function} fn
 * @param {Number} [arity=fn.length]
 * @returns {Function}
 */
function curryable (fn, arity) {
    return _curry(fn, arity, false, true);
}

/**
 * Same as {@link module:lamb.curryable|curryable}, but currying starts from the rightmost argument.
 * @example
 * const collectFourElements = _.curryableRight(_.list, 4);
 *
 * collectFourElements(2)(3)(4)(5) // => [5, 4, 3, 2]
 * collectFourElements(2)(3, 4)(5) // => [5, 4, 3, 2]
 * collectFourElements(2, 3, 4, 5) // => [5, 4, 3, 2]
 * collectFourElements(2, 3)(4, 5) // => [5, 4, 3, 2]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.curryable|curryable}
 * @see {@link module:lamb.curry|curry}, {@link module:lamb.curryRight|curryRight}
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.9.0
 * @param {Function} fn
 * @param {Number} [arity=fn.length]
 * @returns {Function}
 */
function curryableRight (fn, arity) {
    return _curry(fn, arity, true, true);
}

/**
 * Same as {@link module:lamb.curry|curry}, but currying starts from the rightmost argument.
 * @example
 * const makeWithValues = _.curryRight(_.make);
 * const makeJohnDoe = makeWithValues(["John", "Doe"]);
 *
 * makeJohnDoe(["name", "surname"]) // => {name: "John", surname: "Doe"};
 * makeJohnDoe(["firstName", "lastName"]) // => {firstName: "John", lastName: "Doe"};
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.curry|curry}
 * @see {@link module:lamb.curryable|curryable}, {@link module:lamb.curryableRight|curryableRight}
 * @see {@link module:lamb.partial|partial}, {@link module:lamb.partialRight|partialRight}
 * @see {@link module:lamb.asPartial|asPartial}
 * @since 0.9.0
 * @param {Function} fn
 * @param {Number} [arity=fn.length]
 * @returns {Function}
 */
function curryRight (fn, arity) {
    return _curry(fn, arity, true);
}

/**
 * Returns a function that will execute the given function only if it stops being called for the
 * specified timespan.<br/>
 * See also {@link module:lamb.throttle|throttle} for a different behaviour where the first call
 * happens immediately.
 * @example <caption>A common use case of <code>debounce</code> in a browser environment:</caption>
 * function updateLayout () {
 *     // some heavy DOM operations here
 * }
 *
 * window.addEventListener("resize", _.debounce(updateLayout, 200), false);
 *
 * // The resize event is fired repeteadly until the user stops resizing the
 * // window, while the `updateLayout` function is called only once: 200 ms
 * // after he stopped.
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.throttle|throttle}
 * @since 0.1.0
 * @param {Function} fn
 * @param {Number} timespan - Expressed in milliseconds
 * @returns {Function}
 */
function debounce (fn, timespan) {
    var timeoutID;

    return function () {
        var args = arguments;
        var debounced = function () {
            timeoutID = null;
            fn.apply(this, args);
        }.bind(this);

        clearTimeout(timeoutID);
        timeoutID = setTimeout(debounced, timespan);
    };
}

/**
 * Returns a function that applies the original function with the arguments in reverse order.
 * @example
 * _.list(1, 2, 3) // => [1, 2, 3]
 * _.flip(_.list)(1, 2, 3) // => [3, 2, 1]
 *
 * @memberof module:lamb
 * @category Function
 * @since 0.1.0
 * @param {Function} fn
 * @returns {Function}
 */
function flip (fn) {
    return function () {
        var args = list.apply(null, arguments).reverse();

        return fn.apply(this, args);
    };
}

/**
 * Builds a function that returns the argument received at the given index.<br/>
 * As with {@link module:lamb.getAt|getAt} negative indexes are allowed.<br/>
 * The resulting function will return <code>undefined</code> if no arguments are
 * passed or if the index is out of bounds.
 * @example
 * const getFirstArg = _.getArgAt(0);
 * const getLastArg = _.getArgAt(-1);
 *
 * getFirstArg(1, 2, 3) // => 1
 * getLastArg(1, 2, 3) // => 3
 *
 * _.getArgAt()(1, 2, 3) // => undefined
 * _.getArgAt(6)(1, 2, 3) // => undefined
 * _.getArgAt(1)() // => undefined
 *
 * @memberof module:lamb
 * @category Function
 * @since 0.17.0
 * @param {Number} idx
 * @returns {Function}
 */
function getArgAt (idx) {
    return function () {
        return arguments[_toNaturalIndex(idx, arguments.length)];
    };
}

/* eslint-disable jsdoc/check-param-names */

/**
 * If a method with the given name exists on the target, applies it to the provided
 * arguments and returns the result. Returns <code>undefined</code> otherwise.<br/>
 * The arguments for the method are built by concatenating the array of bound arguments,
 * received by {@link module:lamb.invoke|invoke}, with the final set of <code>args</code>,
 * if present.
 * @private
 * @param {String} methodName
 * @param {Array} boundArgs
 * @param {Object} target
 * @param {...*} [args]
 * @returns {*}
 */
function _invoke (methodName, boundArgs, target) {
    var method = target[methodName];

    if (typeof method !== "function") {
        return void 0;
    }

    var boundArgsLen = boundArgs ? _toArrayLength(boundArgs.length) : 0;
    var finalArgsLen = boundArgsLen + arguments.length - 3;
    var finalArgs = Array(finalArgsLen);

    for (var i = 0; i < boundArgsLen; i++) {
        finalArgs[i] = boundArgs[i];
    }

    for (var ofs = 3 - i; i < finalArgsLen; i++) {
        finalArgs[i] = arguments[i + ofs];
    }

    return method.apply(target, finalArgs);
}

/**
 * Builds a function that will invoke the given method name on any received object and
 * return the result. If no method with such name is found the function will return
 * <code>undefined</code>.<br/>
 * Along with the method name it's possible to supply some arguments that will be bound to the
 * method call. Further arguments can also be passed when the function is actually called, and
 * they will be concatenated to the bound ones.<br/>
 * Returning <code>undefined</code> is a behaviour meant to quickly create a case for
 * {@link module:lamb.adapter|adapter} without the need to check for the existence of the
 * desired method.<br/>
 * See also {@link module:lamb.generic|generic} to create functions out of object methods.
 * @example <caption>Basic polymorphism with <code>invoke</code>:</caption>
 * const polySlice = _.invoke("slice");
 *
 * polySlice([1, 2, 3, 4, 5], 1, 3) // => [2, 3]
 * polySlice("Hello world", 1, 3) // => "el"
 *
 * @example <caption>With bound arguments:</caption>
 * const substrFrom2 = _.invoke("substr", [2]);
 *
 * substrFrom2("Hello world") // => "llo world"
 * substrFrom2("Hello world", 5) // => "llo w"
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.invokeOn|invokeOn}
 * @since 0.1.0
 * @param {String} methodName
 * @param {ArrayLike} [boundArgs=[]]
 * @returns {Function}
 */
function invoke (methodName, boundArgs) {
    return partial(_invoke, [methodName, boundArgs]);
}

/**
 * Accepts an object and builds a function expecting a method name, and optionally arguments,
 * to call on such object.
 * Like {@link module:lamb.invoke|invoke}, if no method with the given name is found the
 * function will return <code>undefined</code>.
 * @example
 * const isEven = n => n % 2 === 0;
 * const arr = [1, 2, 3, 4, 5];
 * const invokeOnArr = _.invokeOn(arr);
 *
 * invokeOnArr("filter", isEven) // => [2, 4]
 * invokeOnArr("slice", 1, 3) // => [2, 3]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.invoke|invoke}
 * @since 0.15.0
 * @param {Object} target
 * @returns {Function}
 */
function invokeOn (target) {
    return partial(_invoke, [__, [], target]);
}

/**
 * Builds a function that allows to map over the received arguments before applying them
 * to the original one.
 * @example
 * const sumArray = _.reduceWith(_.sum);
 * const sumArgs = _.compose(sumArray, _.list);
 *
 * sumArgs(1, 2, 3, 4, 5) // => 15
 *
 * const square = n => n ** 2;
 * const sumSquares = _.mapArgs(sumArgs, square);
 *
 * sumSquares(1, 2, 3, 4, 5) // => 55
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.tapArgs|tapArgs}
 * @since 0.3.0
 * @param {Function} fn
 * @param {ListIteratorCallback} mapper
 * @returns {Function}
 */
function mapArgs (fn, mapper) {
    return pipe([list, mapWith(mapper), apply(fn)]);
}

/**
 * Builds a function that allows to "tap" into the arguments of the original one.
 * This allows to extract simple values from complex ones, transform arguments or simply intercept them.
 * If a "tapper" isn't found the argument is passed as it is.
 * @example
 * const someObject = {count: 5};
 * const someArrayData = [2, 3, 123, 5, 6, 7, 54, 65, 76, 0];
 * const getDataAmount = _.tapArgs(_.sum, [_.getKey("count"), _.getKey("length")]);
 *
 * getDataAmount(someObject, someArrayData); // => 15
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.mapArgs|mapArgs}
 * @since 0.3.0
 * @param {Function} fn
 * @param {Function[]} tappers
 * @returns {Function}
 */
function tapArgs (fn, tappers) {
    return function () {
        var len = arguments.length;
        var tappersLen = tappers.length;
        var args = [];

        for (var i = 0; i < len; i++) {
            args.push(i < tappersLen ? tappers[i](arguments[i]) : arguments[i]);
        }

        return fn.apply(this, args);
    };
}

/**
 * Returns a function that will invoke the passed function at most once in the given timespan.<br/>
 * The first call in this case happens as soon as the function is invoked; see also
 * {@link module:lamb.debounce|debounce} for a different behaviour where the first call is delayed.
 * @example
 * const log = _.throttle(console.log.bind(console), 5000);
 *
 * log("Hi"); // console logs "Hi"
 * log("Hi again"); // nothing happens
 * // after five seconds
 * log("Hello world"); // console logs "Hello world"
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.debounce|debounce}
 * @since 0.1.0
 * @param {Function} fn
 * @param {Number} timespan - Expressed in milliseconds.
 * @returns {Function}
 */
function throttle (fn, timespan) {
    var result;
    var lastCall = 0;

    return function () {
        var now = Date.now();

        if (now - lastCall >= timespan) {
            lastCall = now;
            result = fn.apply(this, arguments);
        }

        return result;
    };
}

/**
 * Builds a function that passes only one argument to the given function.<br/>
 * It's simply a shortcut for a common use case of {@link module:lamb.aritize|aritize},
 * exposed for convenience.
 * @example
 * const weights = ["2 Kg", "10 Kg", "1 Kg", "7 Kg"];
 *
 * _.map(weights, _.unary(parseInt)) // => [2, 10, 1, 7]
 *
 * @memberof module:lamb
 * @category Function
 * @see {@link module:lamb.aritize|aritize}
 * @see {@link module:lamb.binary|binary}
 * @since 0.10.0
 * @param {Function} fn
 * @returns {Function}
 */
function unary (fn) {
    return function (a) {
        return fn.call(this, a);
    };
}

/**
 * Accepts a series of functions and builds a function that applies the received
 * arguments to each one and returns the first non-<code>undefined</code> value.<br/>
 * Meant to work in synergy with {@link module:lamb.casus|casus} and
 * {@link module:lamb.invoke|invoke}, can be useful as a strategy pattern for functions,
 * to mimic conditional logic or pattern matching, and also to build polymorphic functions.
 * @example
 * const isEven = n => n % 2 === 0;
 * const filterString = _.compose(_.joinWith(""), _.filter);
 * const filterAdapter = _.adapter([
 *     _.invoke("filter"),
 *     _.casus(_.isType("String"), filterString)
 * ]);
 *
 * filterAdapter([1, 2, 3, 4, 5, 6], isEven) // => [2, 4, 6]
 * filterAdapter("123456", isEven) // => "246"
 * filterAdapter({}, isEven) // => undefined
 *
 * // by its nature is composable
 * const filterWithDefault = _.adapter([filterAdapter, _.always("Not implemented")]);
 *
 * filterWithDefault([1, 2, 3, 4, 5, 6], isEven) // => [2, 4, 6]
 * filterWithDefault("123456", isEven) // => "246"
 * filterWithDefault({}, isEven) // => "Not implemented"
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.casus|casus}
 * @see {@link module:lamb.invoke|invoke}
 * @since 0.6.0
 * @param {Function[]} functions
 * @returns {Function}
 */
function adapter (functions) {
    if (!Array.isArray(functions)) {
        throw _makeTypeErrorFor(functions, "array");
    }

    return function () {
        var len = functions.length;
        var result;

        for (var i = 0; i < len; i++) {
            result = functions[i].apply(this, arguments);

            if (!isUndefined(result)) {
                break;
            }
        }

        return result;
    };
}

/**
 * Creates a function to check the given predicates.<br/>
 * Used to build the {@link module:lamb.allOf|allOf} and the
 * {@link module:lamb.anyOf|anyOf} functions.
 * @private
 * @param {Boolean} checkAll
 * @returns {Function}
 */
function _checkPredicates (checkAll) {
    return function (predicates) {
        if (!Array.isArray(predicates)) {
            throw _makeTypeErrorFor(predicates, "array");
        }

        return function () {
            for (var i = 0, len = predicates.length, result; i < len; i++) {
                result = predicates[i].apply(this, arguments);

                if (checkAll && !result) {
                    return false;
                } else if (!checkAll && result) {
                    return true;
                }
            }

            return checkAll;
        };
    };
}

/**
 * Accepts an array of predicates and builds a new one that returns true if they are all satisfied
 * by the same arguments. The functions in the array will be applied one at a time until a
 * <code>false</code> value is produced, which is returned immediately.
 * @example
 * const isEven = n => n % 2 === 0;
 * const isPositiveEven = _.allOf([isEven, _.isGT(0)]);
 *
 * isPositiveEven(-2) // => false
 * isPositiveEven(11) // => false
 * isPositiveEven(6) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.anyOf|anyOf}
 * @since 0.1.0
 * @param {Function[]} predicates
 * @returns {Function}
 */
var allOf = _checkPredicates(true);

/**
 * Accepts an array of predicates and builds a new one that returns true if at least one of them is
 * satisfied by the received arguments. The functions in the array will be applied one at a time
 * until a <code>true</code> value is produced, which is returned immediately.
 * @example
 * const users = [
 *     {id: 1, name: "John", group: "guest"},
 *     {id: 2, name: "Jane", group: "root"},
 *     {id: 3, name: "Mario", group: "admin"}
 * ];
 * const isInGroup = _.partial(_.hasKeyValue, ["group"]);
 * const isSuperUser = _.anyOf([isInGroup("admin"), isInGroup("root")]);
 *
 * isSuperUser(users[0]) // => false
 * isSuperUser(users[1]) // => true
 * isSuperUser(users[2]) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.allOf|allOf}
 * @since 0.1.0
 * @param {Function[]} predicates
 * @returns {Function}
 */
var anyOf = _checkPredicates(false);

/**
 * Verifies that the two supplied values are the same value using the "SameValue" comparison.<br/>
 * Note that this doesn't behave as the strict equality operator, but rather as a shim of ES6's
 * [Object.is]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is}.
 * Differences are that <code>0</code> and <code>-0</code> aren't the same value and, finally,
 * <code>NaN</code> is equal to itself.<br/>
 * See also {@link module:lamb.is|is} for a curried version building a predicate and
 * {@link module:lamb.areSVZ|areSVZ} and {@link module:lamb.isSVZ|isSVZ} to perform a "SameValueZero"
 * comparison.
 * @example
 * const testObject = {};
 *
 * _.areSame({}, testObject) // => false
 * _.areSame(testObject, testObject) // => true
 * _.areSame("foo", "foo") // => true
 * _.areSame(0, -0) // => false
 * _.areSame(0 / 0, NaN) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.is|is}
 * @see {@link module:lamb.areSVZ|areSVZ}, {@link module:lamb.isSVZ|isSVZ}
 * @see [SameValue comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevalue}
 * @see [SameValueZero comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero}
 * @since 0.50.0
 * @param {*} a
 * @param {*} b
 * @returns {Boolean}
 */
function areSame (a, b) {
    return a === 0 && b === 0 ? 1 / a === 1 / b : areSVZ(a, b);
}

/**
 * Builds a case for {@link module:lamb.adapter|adapter}.<br/>
 * The function will apply the received arguments to <code>fn</code> if the predicate is satisfied
 * with the same arguments, otherwise will return <code>undefined</code>.<br/>
 * See also {@link module:lamb.condition|condition} to build a condition with two branching functions
 * and {@link module:lamb.unless|unless} and {@link module:lamb.when|when} where one of the branches
 * is the identity function.
 * @example
 * const halveIfNumber = _.casus(_.isType("Number"), _.divideBy(2));
 *
 * halveIfNumber(2) // => 1
 * halveIfNumber("2") // => undefined
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.adapter|adapter}
 * @see {@link module:lamb.condition|condition}
 * @see {@link module:lamb.unless|unless}
 * @see {@link module:lamb.when|when}
 * @since 0.51.0
 * @param {Function} predicate
 * @param {Function} fn
 * @returns {Function}
 */
function casus (predicate, fn) {
    return function () {
        return predicate.apply(this, arguments) ? fn.apply(this, arguments) : void 0;
    };
}

/**
 * Builds a function that will apply the received arguments to <code>trueFn</code>,
 * if the predicate is satisfied with the same arguments, or to <code>falseFn</code> otherwise.<br/>
 * Although you can use other <code>condition</code>s as <code>trueFn</code> or <code>falseFn</code>,
 * it's probably better to use {@link module:lamb.adapter|adapter} to build more complex behaviours.<br/>
 * See also {@link module:lamb.unless|unless} and {@link module:lamb.when|when} as they are
 * shortcuts to common use cases.
 * @example
 * const isEven = n => n % 2 === 0;
 * const halveEvenAndDoubleOdd = _.condition(isEven, _.divideBy(2), _.multiplyBy(2));
 *
 * halveEvenAndDoubleOdd(5) // => 10
 * halveEvenAndDoubleOdd(6) // => 3
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.unless|unless}
 * @see {@link module:lamb.when|when}
 * @see {@link module:lamb.adapter|adapter}
 * @see {@link module:lamb.casus|casus}
 * @since 0.2.0
 * @param {Function} predicate
 * @param {Function} trueFn
 * @param {Function} falseFn
 * @returns {Function}
 */
function condition (predicate, trueFn, falseFn) {
    return function () {
        return (predicate.apply(this, arguments) ? trueFn : falseFn).apply(this, arguments);
    };
}

/**
 * Verifies that the first given value is greater than the second.<br/>
 * Wraps the native <code>&gt;</code> operator within a function.
 * @example
 * const pastDate = new Date(2010, 2, 12);
 * const today = new Date();
 *
 * _.gt(today, pastDate) // => true
 * _.gt(pastDate, today) // => false
 * _.gt(3, 4) // => false
 * _.gt(3, 3) // => false
 * _.gt(3, 2) // => true
 * _.gt(0, -0) // => false
 * _.gt(-0, 0) // => false
 * _.gt("a", "A") // => true
 * _.gt("b", "a") // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.gte|gte}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @since 0.50.0
 * @param {Number|String|Date|Boolean} a
 * @param {Number|String|Date|Boolean} b
 * @returns {Boolean}
 */
function gt (a, b) {
    return a > b;
}

/**
 * Verifies that the first given value is greater than or equal to the second.
 * Regarding equality, beware that this is simply a wrapper for the native
 * <code>&gt;=</code> operator, so <code>-0 === 0</code>.
 * @example
 * _.gte(3, 4) // => false
 * _.gte(3, 3) // => true
 * _.gte(3, 2) // => true
 * _.gte(0, -0) // => true
 * _.gte(-0, 0) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.gt|gt}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @since 0.50.0
 * @param {Number|String|Date|Boolean} a
 * @param {Number|String|Date|Boolean} b
 * @returns {Boolean}
 */
function gte (a, b) {
    return a >= b;
}

/**
 * A curried version of {@link module:lamb.areSame|areSame}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * and the one received by the predicate are the same using the "SameValue"
 * comparison.<br/>
 * See also {@link module:lamb.areSVZ|areSVZ} and {@link module:lamb.isSVZ|isSVZ}
 * to perform a "SameValueZero" comparison.
 * @example
 * const john = {name: "John", surname: "Doe"};
 * const isJohn = _.is(john);
 * const isNegativeZero = _.is(-0);
 * const isReallyNaN = _.is(NaN);
 *
 * isJohn(john) // => true
 * isJohn({name: "John", surname: "Doe"}) // => false
 *
 * isNegativeZero(0) // => false
 * isNegativeZero(-0) // => true
 *
 * isNaN(NaN) // => true
 * isNaN("foo") // => true
 *
 * isReallyNaN(NaN) // => true
 * isReallyNaN("foo") // => false
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.areSame|areSame}
 * @see {@link module:lamb.areSVZ|areSVZ}, {@link module:lamb.isSVZ|isSVZ}
 * @see [SameValue comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevalue}
 * @see [SameValueZero comparison]{@link https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero}
 * @since 0.1.0
 * @param {*} value
 * @returns {Function}
 */
var is = _curry2(areSame);

/**
 * A right curried version of {@link module:lamb.gt|gt}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * is greater than the one received by the predicate.
 * @example
 * const isGreaterThan5 = _.isGT(5);
 *
 * isGreaterThan5(3) // => false
 * isGreaterThan5(5) // => false
 * isGreaterThan5(7) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @since 0.1.0
 * @param {Number|String|Date|Boolean} value
 * @returns {Function}
 */
var isGT = _curry2(gt, true);

/**
 * A right curried version of {@link module:lamb.gte|gte}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * is greater than or equal to the one received by the predicate.
 * @example
 * const isPositiveOrZero = _.isGTE(0);
 *
 * isPositiveOrZero(-3) // => false
 * isPositiveOrZero(-0) // => true
 * isPositiveOrZero(0) // => true
 * isPositiveOrZero(5) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.isGT|isGT}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @since 0.1.0
 * @param {Number|String|Date|Boolean} value
 * @returns {Function}
 */
var isGTE = _curry2(gte, true);

/**
 * Verifies that the first given value is less than the second.<br/>
 * Wraps the native <code>&lt;</code> operator within a function.
 * @example
 * const pastDate = new Date(2010, 2, 12);
 * const today = new Date();
 *
 * _.lt(today, pastDate) // => false
 * _.lt(pastDate, today) // => true
 * _.lt(3, 4) // => true
 * _.lt(3, 3) // => false
 * _.lt(3, 2) // => false
 * _.lt(0, -0) // => false
 * _.lt(-0, 0) // => false
 * _.lt("a", "A") // => false
 * _.lt("a", "b") // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.lte|lte}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @since 0.50.0
 * @param {Number|String|Date|Boolean} a
 * @param {Number|String|Date|Boolean} b
 * @returns {Boolean}
 */
function lt (a, b) {
    return a < b;
}

/**
 * A right curried version of {@link module:lamb.lt|lt}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * is less than the one received by the predicate.
 * @example
 * const isLessThan5 = _.isLT(5);
 *
 * isLessThan5(7) // => false
 * isLessThan5(5) // => false
 * isLessThan5(3) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @since 0.1.0
 * @param {Number|String|Date|Boolean} value
 * @returns {Function}
 */
var isLT = _curry2(lt, true);

/**
 * Verifies that the first given value is less than or equal to the second.
 * Regarding equality, beware that this is simply a wrapper for the native
 * <code>&lt;=</code> operator, so <code>-0 === 0</code>.
 * @example
 * _.lte(3, 4) // => true
 * _.lte(3, 3) // => true
 * _.lte(3, 2) // => false
 * _.lte(0, -0) // => true
 * _.lte(-0, 0) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.lt|lt}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @see {@link module:lamb.isLT|isLT}, {@link module:lamb.isLTE|isLTE}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @since 0.50.0
 * @param {Number|String|Date|Boolean} a
 * @param {Number|String|Date|Boolean} b
 * @returns {Boolean}
 */
function lte (a, b) {
    return a <= b;
}

/**
 * A right curried version of {@link module:lamb.lte|lte}.<br/>
 * Accepts a value and builds a predicate that checks whether the value
 * is less than or equal to the one received by the predicate.
 * @example
 * const isNegativeOrZero = _.isLTE(0);
 *
 * isNegativeOrZero(5) // => false
 * isNegativeOrZero(-0) // => true
 * isNegativeOrZero(0) // => true
 * isNegativeOrZero(-3) // => true
 *
 * @memberof module:lamb
 * @category Logic
 * @function
 * @see {@link module:lamb.isLT|isLT}
 * @see {@link module:lamb.isGT|isGT}, {@link module:lamb.isGTE|isGTE}
 * @see {@link module:lamb.lt|lt}, {@link module:lamb.lte|lte}
 * @see {@link module:lamb.gt|gt}, {@link module:lamb.gte|gte}
 * @since 0.1.0
 * @param {Number|String|Date|Boolean} value
 * @returns {Function}
 */
var isLTE = _curry2(lte, true);

/**
 * Builds a unary function that will check its argument against the given predicate.
 * If the predicate isn't satisfied, the provided <code>fn</code> function will be
 * applied to the same value. The received argument is returned as it is otherwise.<br/>
 * See {@link module:lamb.when|when} for the opposite behaviour.<br/>
 * It's a shortcut for a common use case of {@link module:lamb.condition|condition},
 * where its <code>trueFn</code> parameter is the [identity function]{@link module:lamb.identity}.
 * @example
 * const isEven = n => n % 2 === 0;
 * const halveUnlessIsEven = _.unless(isEven, _.divideBy(2));
 *
 * halveUnlessIsEven(5) // => 2.5
 * halveUnlessIsEven(6) // => 6
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.condition|condition}
 * @see {@link module:lamb.when|when}
 * @see {@link module:lamb.adapter|adapter}
 * @see {@link module:lamb.casus|casus}
 * @since 0.42.0
 * @param {Function} predicate
 * @param {Function} fn
 * @returns {Function}
 */
function unless (predicate, fn) {
    return function (value) {
        return predicate.call(this, value) ? value : fn.call(this, value);
    };
}

/**
 * Builds a unary function that will check its argument against the given predicate.
 * If the predicate is satisfied, the provided <code>fn</code> function will be
 * applied to the same value. The received argument is returned as it is otherwise.<br/>
 * See {@link module:lamb.unless|unless} for the opposite behaviour.<br/>
 * It's a shortcut for a common use case of {@link module:lamb.condition|condition},
 * where its <code>falseFn</code> parameter is the [identity function]{@link module:lamb.identity}.
 * @example
 * const isEven = n => n % 2 === 0;
 * const halveIfEven = _.when(isEven, _.divideBy(2));
 *
 * halveIfEven(5) // => 5
 * halveIfEven(6) // => 3
 *
 * @memberof module:lamb
 * @category Logic
 * @see {@link module:lamb.condition|condition}
 * @see {@link module:lamb.unless|unless}
 * @see {@link module:lamb.adapter|adapter}
 * @see {@link module:lamb.casus|casus}
 * @since 0.42.0
 * @param {Function} predicate
 * @param {Function} fn
 * @returns {Function}
 */
function when (predicate, fn) {
    return function (value) {
        return predicate.call(this, value) ? fn.call(this, value) : value;
    };
}

/**
 * Sums two numbers.
 * @example
 * _.sum(4, 5) // => 9
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.add|add}
 * @since 0.50.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function sum (a, b) {
    return a + b;
}

/**
 * A curried version of {@link module:lamb.sum|sum}.
 * @example
 * const add5 = _.add(5);
 *
 * _.add5(4) // => 9
 * _.add5(-2) // => 3
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.sum|sum}
 * @since 0.1.0
 * @param {Number} a
 * @returns {Function}
 */
var add = _curry2(sum, true);

/**
 * Subtracts two numbers.
 * @example
 * _.subtract(5, 3) // => 2
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.deduct|deduct}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function subtract (a, b) {
    return a - b;
}

/**
 * A curried version of {@link module:lamb.subtract|subtract} that expects the
 * subtrahend to build a function waiting for the minuend.
 * @example
 * const deduct5 = _.deduct(5);
 *
 * deduct5(12) // => 7
 * deduct5(3) // => -2
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.subtract|subtract}
 * @since 0.50.0
 * @param {Number} a
 * @returns {Function}
 */
var deduct = _curry2(subtract, true);

/**
 * Divides two numbers.
 * @example
 * _.divide(5, 2) // => 2.5
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.divideBy|divideBy}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function divide (a, b) {
    return a / b;
}

/**
 * A curried version of {@link module:lamb.divide|divide} that expects a divisor to
 * build a function waiting for the dividend.
 * @example
 * const halve = divideBy(2);
 *
 * halve(10) // => 5
 * halve(5) // => 2.5
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.divide|divide}
 * @since 0.50.0
 * @param {Number} a
 * @returns {Function}
 */
var divideBy = _curry2(divide, true);

/**
 * Generates a sequence of values of the desired length with the provided iteratee.
 * The values being iterated, and received by the iteratee, are the results generated so far.
 * @example
 * const fibonacci = (n, idx, results) => n + (results[idx - 1] || 0);
 *
 * _.generate(1, 10, fibonacci) // => [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.range|range}
 * @since 0.21.0
 * @param {*} start - The starting value
 * @param {Number} len - The desired length for the sequence
 * @param {ListIteratorCallback} iteratee
 * @returns {Array}
 */
function generate (start, len, iteratee) {
    var result = [start];

    for (var i = 0, limit = len - 1; i < limit; i++) {
        result.push(iteratee(result[i], i, result));
    }

    return result;
}

/**
 * Verifies whether the received value is a finite number.<br/>
 * Behaves almost as a shim of ES6's [Number.isFinite]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite},
 * but with a difference: it will return <code>true</code> even for Number object's instances.
 * @example
 * _.isFinite(5) // => true
 * _.isFinite(new Number(5)) // => true
 * _.isFinite(Infinity) // => false
 * _.isFinite(-Infinity) // => false
 * _.isFinite("5") // => false
 * _.isFinite(NaN) // => false
 * _.isFinite(null) // => false
 *
 * @alias module:lamb.isFinite
 * @category Math
 * @since 0.46.0
 * @param {*} value
 * @returns {Boolean}
 */
function isFinite_ (value) {
    return type(value) === "Number" && isFinite(value);
}

/**
 * Verifies whether the received value is a number and an integer.
 * Behaves almost as a shim of ES6's [Number.isInteger]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger},
 * but with a difference: it will return <code>true</code> even for Number object's instances.
 * @example
 * _.isInteger(5) // => true
 * _.isInteger(new Number(5)) // => true
 * _.isInteger(2.5) // => false
 * _.isInteger(Infinity) // => false
 * _.isInteger(-Infinity) // => false
 * _.isInteger("5") // => false
 * _.isInteger(NaN) // => false
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.isSafeInteger|isSafeInteger}
 * @since 0.46.0
 * @param {*} value
 * @returns {Boolean}
 */
function isInteger (value) {
    return type(value) === "Number" && value % 1 === 0;
}

/**
 * Verifies whether the received value is a "safe integer", meaning that is a number and that
 * can be exactly represented as an IEEE-754 double precision number.
 * The safe integers consist of all integers from -(2<sup>53</sup> - 1) inclusive to
 * 2<sup>53</sup> - 1 inclusive.<br/>
 * Behaves almost as a shim of ES6's [Number.isSafeInteger]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger},
 * but with a difference: it will return <code>true</code> even for Number object's instances.
 * @example
 * _.isSafeInteger(5) // => true
 * _.isSafeInteger(new Number(5)) // => true
 * _.isSafeInteger(Math.pow(2, 53) - 1) // => true
 * _.isSafeInteger(Math.pow(2, 53)) // => false
 * _.isSafeInteger(2e32) // => false
 * _.isSafeInteger(2.5) // => false
 * _.isSafeInteger(Infinity) // => false
 * _.isSafeInteger(-Infinity) // => false
 * _.isSafeInteger("5") // => false
 * _.isSafeInteger(NaN) // => false
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.isInteger|isInteger}
 * @since 0.46.0
 * @param {*} value
 * @returns {Boolean}
 */
function isSafeInteger (value) {
    return isInteger(value) && Math.abs(value) <= MAX_SAFE_INTEGER;
}

/**
 * Calculates the [arithmetic mean]{@link https://en.wikipedia.org/wiki/Arithmetic_mean} of the given list of numbers.
 * @example
 * _.mean([1, 2, 3, 4, 5, 6, 7, 8, 9]) // => 5
 * _.mean([]) // => NaN
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.median|median}
 * @since 0.60.0
 * @param {Number[]} numbers
 * @returns {Number}
 */
function mean (numbers) {
    return reduce(numbers, function (r, n) {
        return +n + r;
    }, 0) / numbers.length;
}

/**
 * Calculates the [median]{@link https://en.wikipedia.org/wiki/Median} of the given list of numbers.
 * @example
 * _.median([10, 2, 3, 1, 4, 5, 7]) // => 4
 * _.median([]) // => NaN
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.mean|mean}
 * @since 0.60.0
 * @param {Number[]} numbers
 * @returns {Number}
 */
function median (numbers) {
    var len = numbers.length >>> 0;

    if (len === 0) {
        return NaN;
    }

    var result;
    var sortedNumbers = map(numbers, Number).sort(subtract);

    if (len % 2 === 0) {
        var pivot = len / 2;

        result = (sortedNumbers[pivot - 1] + sortedNumbers[pivot]) / 2;
    } else {
        result = sortedNumbers[(len - 1) / 2];
    }

    return result;
}

/**
 * Performs the modulo operation and should not be confused with the
 * {@link module:lamb.remainder|remainder}.
 * The function performs a floored division to calculate the result and not
 * a truncated one, hence the sign of the dividend is not kept, unlike the
 * {@link module:lamb.remainder|remainder}.
 * @example
 * _.modulo(5, 3) // => 2
 * _.remainder(5, 3) // => 2
 *
 * _.modulo(-5, 3) // => 1
 * _.remainder(-5, 3) // => -2
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.remainder|remainder}
 * @see [Modulo operation on Wikipedia]{@link http://en.wikipedia.org/wiki/Modulo_operation}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function modulo (a, b) {
    return a - (b * Math.floor(a / b));
}

/**
 * Multiplies two numbers.
 * @example
 * _.multiply(5, 3) // => 15
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.multiplyBy|multiplyBy}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function multiply (a, b) {
    return a * b;
}

/**
 * A curried version of {@link module:lamb.multiply|multiply}.
 * @example
 * const double = _.multiplyBy(2);
 *
 * double(5) // => 10
 *
 * @memberof module:lamb
 * @category Math
 * @function
 * @see {@link module:lamb.multiply|multiply}
 * @since 0.50.0
 * @param {Number} a
 * @returns {Function}
 */
var multiplyBy = _curry2(multiply, true);

/**
 * Generates a random integer between two given integers, both included.
 * Note that no safety measure is taken if the provided arguments aren't integers, so
 * you may end up with unexpected (not really) results.
 * For example <code>randomInt(0.1, 1.2)</code> could be <code>2</code>.
 * @example
 *
 * _.randomInt(1, 10) // => an integer >=1 && <= 10
 *
 * @memberof module:lamb
 * @category Math
 * @since 0.1.0
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Converts a value to a number and returns it if it's not NaN, otherwise
 * returns zero.
 * @private
 * @param {*} value
 * @returns {Number}
 */
function _forceToNumber (value) {
    var n = +value;

    return n === n ? n : 0; // eslint-disable-line no-self-compare
}

/**
 * Generates an arithmetic progression of numbers starting from <code>start</code> up to,
 * but not including, <code>limit</code>, using the given <code>step</code>.
 * @example
 * _.range(2, 10) // => [2, 3, 4, 5, 6, 7, 8, 9]
 * _.range(1, -10, -2) // => [1, -1, -3, -5, -7, -9]
 * _.range(0, 3, 1) // => [0, 1, 2]
 * _.range(-0, 3, 1) // => [-0, 1, 2]
 * _.range(1, -10, 2) // => []
 * _.range(3, 5, -1) // => []
 *
 * @example <caption>Behaviour if <code>step</code> happens to be zero:</caption>
 * _.range(2, 10, 0) // => [2]
 * _.range(2, -10, 0) // => [2]
 * _.range(2, 2, 0) // => []
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.generate|generate}
 * @since 0.1.0
 * @param {Number} start
 * @param {Number} limit
 * @param {Number} [step=1]
 * @returns {Number[]}
 */
function range (start, limit, step) {
    start = _forceToNumber(start);
    limit = _forceToNumber(limit);
    step = arguments.length === 3 ? _forceToNumber(step) : 1;

    if (step === 0) {
        return limit === start ? [] : [start];
    }

    var len = Math.max(Math.ceil((limit - start) / step), 0);
    var result = Array(len);

    for (var i = 0, last = start; i < len; i++) {
        result[i] = last;
        last += step;
    }

    return result;
}

/**
 * Gets the remainder of the division of two numbers.
 * Not to be confused with the {@link module:lamb.modulo|modulo} as the remainder
 * keeps the sign of the dividend and may lead to some unexpected results.
 * @example
 * // example of wrong usage of the remainder
 * // (in this case the modulo operation should be used)
 * const isOdd = n => _.remainder(n, 2) === 1;
 *
 * isOdd(-3) // => false as -3 % 2 === -1
 *
 * @memberof module:lamb
 * @category Math
 * @see {@link module:lamb.modulo|modulo}
 * @see [Modulo operation on Wikipedia]{@link http://en.wikipedia.org/wiki/Modulo_operation}
 * @since 0.1.0
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function remainder (a, b) {
    return a % b;
}

/**
 * Checks whether the specified key is a own enumerable property of the given object or not.
 * @private
 * @function
 * @param {Object} obj
 * @param {String} key
 * @returns {Boolean}
 */
var _isOwnEnumerable = generic(Object.prototype.propertyIsEnumerable);

/**
 * Builds a list of the enumerable properties of an object.
 * The function is null-safe, unlike the public one.
 * @private
 * @param {Object} obj
 * @returns {String[]}
 */
function _safeEnumerables (obj) {
    var result = [];

    for (var key in obj) {
        result.push(key);
    }

    return result;
}

/**
 * Checks whether the specified key is an enumerable property of the given object or not.
 * @private
 * @param {Object} obj
 * @param {String} key
 * @returns {Boolean}
 */
function _isEnumerable (obj, key) {
    return key in Object(obj) && (_isOwnEnumerable(obj, key) || ~_safeEnumerables(obj).indexOf(key));
}

/**
 * Helper to retrieve the correct key while evaluating a path.
 * @private
 * @param {Object} target
 * @param {String} key
 * @param {Boolean} includeNonEnumerables
 * @returns {String|Number|Undefined}
 */
function _getPathKey (target, key, includeNonEnumerables) {
    if (includeNonEnumerables && key in Object(target) || _isEnumerable(target, key)) {
        return key;
    }

    var n = +key;
    var len = target && target.length;

    return n >= -len && n < len ? n < 0 ? n + len : n : void 0;
}

/**
 * Checks if a path is valid in the given object and retrieves the path target.
 * @private
 * @param {Object} obj
 * @param {String[]} parts
 * @param {Boolean} walkNonEnumerables
 * @returns {Object}
 */
function _getPathInfo (obj, parts, walkNonEnumerables) {
    if (isNil(obj)) {
        throw _makeTypeErrorFor(obj, "object");
    }

    var target = obj;
    var i = -1;
    var len = parts.length;
    var key;

    while (++i < len) {
        key = _getPathKey(target, parts[i], walkNonEnumerables);

        if (isUndefined(key)) {
            break;
        }

        target = target[key];
    }

    return i === len ? { isValid: true, target: target } : { isValid: false, target: void 0 };
}

/**
 * Splits a sting path using the provided separator and returns an array
 * of path parts.
 * @private
 * @param {String} path
 * @param {String} separator
 * @returns {String[]}
 */
function _toPathParts (path, separator) {
    return String(path).split(separator || ".");
}

/**
 * Gets a nested property value from an object using the given path.<br/>
 * The path is a string with property names separated by dots by default, but
 * it can be customised with the optional third parameter.<br/>
 * You can use integers in the path, even negative ones, to refer to array-like
 * object indexes, but the priority will be given to existing object keys:
 * the last example explains this particular case.
 * @example
 * const user = {
 *     name: "John",
 *     surname: "Doe",
 *     login: {
 *         "user.name": "jdoe",
 *         password: "abc123"
 *     },
 *     scores: [
 *         {id: 1, value: 10},
 *         {id: 2, value: 20},
 *         {id: 3, value: 30}
 *     ]
 * };
 *
 * _.getPathIn(user, "name") // => "John"
 * _.getPathIn(user, "login.password") // => "abc123";
 * _.getPathIn(user, "login/user.name", "/") // => "jdoe"
 * _.getPathIn(user, "name.foo") // => undefined
 * _.getPathIn(user, "name.foo.bar") // => undefined
 *
 * @example <caption>Accessing array-like objects indexes:</caption>
 * _.getPathIn(user, "login.password.1") // => "b"
 * _.getPathIn(user, "scores.0") // => {id: 1, value: 10}
 * _.getPathIn(user, "scores.-1.value") // => 30
 *
 * @example <caption>Priority will be given to existing object keys over indexes:</caption>
 * _.getPathIn(user, "scores.-1") // => {id: 3, value: 30}
 *
 * // let's do something funny
 * user.scores["-1"] = "foo bar";
 *
 * _.getPathIn(user, "scores.-1") // => "foo bar";
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.getPath|getPath}
 * @see {@link module:lamb.getIn|getIn}, {@link module:lamb.getKey|getKey}
 * @since 0.19.0
 * @param {Object|ArrayLike} obj
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {*}
 */
function getPathIn (obj, path, separator) {
    return _getPathInfo(obj, _toPathParts(path, separator), true).target;
}

/**
 * Builds a <code>checker</code> function meant to be used with
 * {@link module:lamb.validate|validate}.<br/>
 * Note that the function accepts multiple <code>keyPaths</code> as a means to
 * compare their values. In other words all the received <code>keyPaths</code> will be
 * passed as arguments to the <code>predicate</code> to run the test.<br/>
 * If you want to run the same single property check with multiple properties, you should build
 * multiple <code>checker</code>s and combine them with {@link module:lamb.validate|validate}.
 * @example
 * const user = {
 *     name: "John",
 *     surname: "Doe",
 *     login: {
 *         username: "jdoe",
 *         password: "abc123",
 *         passwordConfirm: "abc123"
 *     }
 * };
 * const pwdMatch = _.checker(
 *     _.areSame,
 *     "Passwords don't match",
 *     ["login.password", "login.passwordConfirm"]
 * );
 *
 * pwdMatch(user) // => []
 *
 * const newUser = _.setPathIn(user, "login.passwordConfirm", "avc123");
 *
 * pwdMatch(newUser) // => ["Passwords don't match", ["login.password", "login.passwordConfirm"]]
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.validate|validate}, {@link module:lamb.validateWith|validateWith}
 * @since 0.1.0
 * @param {Function} predicate - The predicate to test the object properties
 * @param {String} message - The error message
 * @param {String[]} keyPaths - The array of keys, or {@link module:lamb.getPathIn|paths}, to test.
 * @param {String} [pathSeparator="."]
 * @returns {Function} A checker function which returns an error in the form
 * <code>["message", ["propertyA", "propertyB"]]</code> or an empty array.
 */
function checker (predicate, message, keyPaths, pathSeparator) {
    return function (obj) {
        var getValues = partial(getPathIn, [obj, __, pathSeparator]);

        return predicate.apply(obj, map(keyPaths, getValues)) ? [] : [message, keyPaths];
    };
}

/**
 * Creates a non-null-safe version of the provided "getKeys" function.
 * @private
 * @function
 * @param {Function} getKeys
 * @returns {Function}
 */
var _unsafeKeyListFrom = _curry2(function (getKeys, obj) {
    if (isNil(obj)) {
        throw _makeTypeErrorFor(obj, "object");
    }

    return getKeys(obj);
});

/**
 * Creates an array with all the enumerable properties of the given object.
 * @example <caption>Showing the difference with {@link module:lamb.keys|keys}:</caption>
 * const baseFoo = Object.create({a: 1}, {b: {value: 2}});
 * const foo = Object.create(baseFoo, {
 *     c: {value: 3},
 *     d: {value: 4, enumerable: true}
 * });
 *
 * _.keys(foo) // => ["d"]
 * _.enumerables(foo) // => ["d", "a"]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.keys|keys}
 * @since 0.12.0
 * @param {Object} obj
 * @returns {String[]}
 */
var enumerables = _unsafeKeyListFrom(_safeEnumerables);

/**
 * Builds an object from a list of key / value pairs like the one
 * returned by {@link module:lamb.pairs|pairs} or {@link module:lamb.ownPairs|ownPairs}.<br/>
 * In case of duplicate keys the last key / value pair is used.
 * @example
 * _.fromPairs([["a", 1], ["b", 2], ["c", 3]]) // => {"a": 1, "b": 2, "c": 3}
 * _.fromPairs([["a", 1], ["b", 2], ["a", 3]]) // => {"a": 3, "b": 2}
 * _.fromPairs([[1], [void 0, 2], [null, 3]]) // => {"1": undefined, "undefined": 2, "null": 3}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.ownPairs|ownPairs}, {@link module:lamb.pairs|pairs}
 * @since 0.8.0
 * @param {Array<Array<String, *>>} pairsList
 * @returns {Object}
 */
function fromPairs (pairsList) {
    var result = {};

    forEach(pairsList, function (pair) {
        result[pair[0]] = pair[1];
    });

    return result;
}

/**
 * Builds a partial application of {@link module:lamb.getPathIn|getPathIn} with the given
 * path and separator, expecting the object to act upon.<br/>
 * @example
 * const user = {
 *     name: "John",
 *     surname: "Doe",
 *     login: {
 *         "user.name": "jdoe",
 *         password: "abc123"
 *     }
 * };
 *
 * const getPwd = _.getPath("login.password");
 * const getUsername = _.getPath("login/user.name", "/");
 *
 * getPwd(user) // => "abc123";
 * getUsername(user) // => "jdoe"
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.getPathIn|getPathIn}
 * @see {@link module:lamb.getIn|getIn}, {@link module:lamb.getKey|getKey}
 * @since 0.19.0
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {Function}
 */
var getPath = _makePartial3(getPathIn);

/**
 * Verifies the existence of a property in an object.
 * @example
 * const user1 = {name: "john"};
 *
 * _.has(user1, "name") // => true
 * _.has(user1, "surname") // => false
 * _.has(user1, "toString") // => true
 *
 * const user2 = Object.create(null);
 *
 * // not inherited through the prototype chain
 * _.has(user2, "toString") // => false
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.hasKey|hasKey}
 * @see {@link module:lamb.hasOwn|hasOwn}, {@link module:lamb.hasOwnKey|hasOwnKey}
 * @see {@link module:lamb.pathExistsIn|pathExistsIn}, {@link module:lamb.pathExists|pathExists}
 * @since 0.1.0
 * @param {Object} obj
 * @param {String} key
 * @returns {Boolean}
 */
function has (obj, key) {
    if (typeof obj !== "object" && !isUndefined(obj)) {
        obj = Object(obj);
    }

    return key in obj;
}

/**
 * Curried version of {@link module:lamb.has|has}.<br/>
 * Returns a function expecting the object to check against the given key.
 * @example
 * const user1 = {name: "john"};
 * const user2 = {};
 * const hasName = _.hasKey("name");
 *
 * hasName(user1) // => true
 * hasName(user2) // => false
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.has|has}
 * @see {@link module:lamb.hasOwn|hasOwn}, {@link module:lamb.hasOwnKey|hasOwnKey}
 * @see {@link module:lamb.pathExistsIn|pathExistsIn}, {@link module:lamb.pathExists|pathExists}
 * @since 0.1.0
 * @param {String} key
 * @returns {Function}
 */
var hasKey = _curry2(has, true);

/**
 * Verifies if an object has the specified property and that the property isn't inherited through
 * the prototype chain.<br/>
 * @example <caption>Comparison with <code>has</code>:</caption>
 * const user = {name: "john"};
 *
 * _.has(user, "name") // => true
 * _.has(user, "surname") // => false
 * _.has(user, "toString") // => true
 *
 * _.hasOwn(user, "name") // => true
 * _.hasOwn(user, "surname") // => false
 * _.hasOwn(user, "toString") // => false
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.hasOwnKey|hasOwnKey}
 * @see {@link module:lamb.has|has}, {@link module:lamb.hasKey|hasKey}
 * @see {@link module:lamb.pathExistsIn|pathExistsIn}, {@link module:lamb.pathExists|pathExists}
 * @since 0.1.0
 * @param {Object} obj
 * @param {String} key
 * @returns {Boolean}
 */
var hasOwn = generic(Object.prototype.hasOwnProperty);

/**
 * Curried version of {@link module:lamb.hasOwn|hasOwn}.<br/>
 * Returns a function expecting the object to check against the given key.
 * @example
 * const user = {name: "john"};
 * const hasOwnName = _.hasOwnKey("name");
 * const hasOwnToString = _.hasOwnToString("toString");
 *
 * hasOwnName(user) // => true
 * hasOwnToString(user) // => false
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.hasOwn|hasOwn}
 * @see {@link module:lamb.has|has}, {@link module:lamb.hasKey|hasKey}
 * @see {@link module:lamb.pathExistsIn|pathExistsIn}, {@link module:lamb.pathExists|pathExists}
 * @since 0.1.0
 * @param {String} key
 * @returns {Function}
 */
var hasOwnKey = _curry2(hasOwn, true);

/**
 * Builds a predicate expecting an object to check against the given key / value pair.<br/>
 * The value check is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.
 * @example
 * const hasTheCorrectAnswer = _.hasKeyValue("answer", 42);
 *
 * hasTheCorrectAnswer({answer: 2}) // false
 * hasTheCorrectAnswer({answer: 42}) // true
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.hasPathValue|hasPathValue}
 * @since 0.1.0
 * @param {String} key
 * @param {*} value
 * @returns {Function}
 */
function hasKeyValue (key, value) {
    return function (obj) {
        return isUndefined(value) ? has(obj, key) && obj[key] === value : areSVZ(value, obj[key]);
    };
}

/**
 * Builds a predicate to check if the given path exists in an object and holds the desired value.<br/>
 * The value check is made with the ["SameValueZero" comparison]{@link module:lamb.areSVZ|areSVZ}.<br/>
 * Note that the function will check even non-enumerable properties.
 * @example
 * const user = {
 *     name: "John",
 *     surname: "Doe",
 *     personal: {
 *         age: 25,
 *         gender: "M"
 *     },
 *     scores: [
 *         {id: 1, value: 10, passed: false},
 *         {id: 2, value: 20, passed: false},
 *         {id: 3, value: 30, passed: true}
 *     ]
 * };
 *
 * const isMale = _.hasPathValue("personal.gender", "M");
 * const hasPassedFirstTest = _.hasPathValue("scores.0.passed", true);
 * const hasPassedLastTest = _.hasPathValue("scores.-1.passed", true);
 *
 * isMale(user) // => true
 * hasPassedFirstTest(user) // => false
 * hasPassedLastTest(user) // => true
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.hasKeyValue|hasKeyValue}
 * @since 0.41.0
 * @param {String} path
 * @param {*} value
 * @param {String} [separator="."]
 * @returns {Function}
 */
function hasPathValue (path, value, separator) {
    return function (obj) {
        var pathInfo = _getPathInfo(obj, _toPathParts(path, separator), true);

        return pathInfo.isValid && areSVZ(pathInfo.target, value);
    };
}

/**
 * A null-safe version of <code>Object.keys</code>.
 * @private
 * @function
 * @param {Object} obj
 * @returns {String[]}
 */
var _safeKeys = compose(Object.keys, Object);

/**
 * Retrieves the list of the own enumerable properties of an object.<br/>
 * Although [Object.keys]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys}
 * is already present in ECMAScript 5, its behaviour changed in the subsequent specifications
 * of the standard.<br/>
 * This function <em>shims</em> the ECMAScript 6 version, by forcing a conversion to
 * object for any value but <code>null</code> and <code>undefined</code>.
 * @example <caption>Showing the difference with {@link module:lamb.enumerables|enumerables}:</caption>
 * const baseFoo = Object.create({a: 1}, {b: {value: 2}});
 * const foo = Object.create(baseFoo, {
 *     c: {value: 3},
 *     d: {value: 4, enumerable: true}
 * });
 *
 * _.enumerables(foo) // => ["d", "a"]
 * _.keys(foo) // => ["d"]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.enumerables|enumerables}
 * @since 0.25.1
 * @param {Object} obj
 * @returns {String[]}
 */
var keys = _unsafeKeyListFrom(_safeKeys);

/**
 * Builds a predicate to check if the given key satisfies the desired condition
 * on an object.
 * @example
 * const users = [
 *     {name: "John", age: 25},
 *     {name: "Jane", age: 15},
 * ];
 * const isAdult = _.keySatisfies(_.isGTE(18), "age");
 *
 * isAdult(users[0]) // => true
 * isAdult(users[1]) // => false
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.pathSatisfies|pathSatisfies}
 * @since 0.45.0
 * @param {Function} predicate
 * @param {String} key
 * @returns {Function}
 */
function keySatisfies (predicate, key) {
    return function (obj) {
        return predicate.call(this, obj[key]);
    };
}

/**
 * Builds an object from the two given lists, using the first one as keys and the last
 * one as values.<br/>
 * If the list of keys is longer than the values one, the keys will be created with
 * <code>undefined</code> values.<br/>
 * If more values than keys are supplied, the extra values will be ignored.
 * @example
 * _.make(["a", "b", "c"], [1, 2, 3]) // => {a: 1, b: 2, c: 3}
 * _.make(["a", "b", "c"], [1, 2]) // => {a: 1, b: 2, c: undefined}
 * _.make(["a", "b"], [1, 2, 3]) // => {a: 1, b: 2}
 * _.make([null, void 0, 2], [1, 2, 3]) // => {"null": 1, "undefined": 2, "2": 3}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.tear|tear}, {@link module:lamb.tearOwn|tearOwn} for the reverse operation
 * @since 0.8.0
 * @param {String[]} names
 * @param {ArrayLike} values
 * @returns {Object}
 */
function make (names, values) {
    var result = {};
    var valuesLen = values.length;

    for (var i = 0, len = names.length; i < len; i++) {
        result[names[i]] = i < valuesLen ? values[i] : void 0;
    }

    return result;
}

/**
 * Creates a new object by applying the given function
 * to all enumerable properties of the source one.
 * @example
 * const weights = {
 *     john: "72.5 Kg",
 *     jane: "52.3 Kg"
 * };
 *
 * _.mapValues(weights, parseFloat) // => {john: 72.5, jane: 52.3}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.mapValuesWith|mapValuesWith}
 * @since 0.54.0
 * @param {Object} source
 * @param {ObjectIteratorCallback} fn
 * @returns {Object}
 */
function mapValues (source, fn) {
    if (isNil(source)) {
        throw _makeTypeErrorFor(source, "object");
    }

    var result = {};

    for (var key in source) {
        result[key] = fn(source[key], key, source);
    }

    return result;
}

/**
 * A curried version of {@link module:lamb.mapValues|mapValues}.<br/>
 * Expects a mapping function to build a new function waiting for the
 * object to act upon.
 * @example
 * const incValues = _.mapValuesWith(_.add(1));
 * const results = {
 *     first: 10,
 *     second: 5,
 *     third: 3
 * };
 *
 * incValues(results) // => {first: 11, second: 6, third: 4}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.mapValues|mapValues}
 * @since 0.54.0
 * @function
 * @param {ObjectIteratorCallback} fn
 * @returns {Function}
 */
var mapValuesWith = _curry2(mapValues, true);

/**
 * Merges the received objects using the provided function to retrieve their keys.
 * @private
 * @param {Function} getKeys
 * @param {Object} a
 * @param {Object} b
 * @returns {Function}
 */
function _merge (getKeys, a, b) {
    return reduce([a, b], function (result, source) {
        forEach(getKeys(source), function (key) {
            result[key] = source[key];
        });

        return result;
    }, {});
}

/**
 * Merges the enumerable properties of the provided sources into a new object.<br/>
 * In case of key homonymy the last source has precedence over the first.
 * @example
 * _.merge({a: 1, b: 3}, {b: 5, c: 4}) // => {a: 1, b: 5, c: 4}
 *
 * @example <caption>Array-like objects will be transformed to objects with numbers as keys:</caption>
 * _.merge([1, 2], {a: 2}) // => {"0": 1, "1": 2, a: 2}
 * _.merge("foo", {a: 2}) // => {"0": "f", "1": "o", "2": "o", a: 2}
 *
 * @example <caption>Every other non-nil value will be treated as an empty object:</caption>
 * _.merge({a: 2}, 99) // => {a: 2}
 * _.merge({a: 2}, NaN) // => {a: 2}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.mergeOwn|mergeOwn} to merge own properties only
 * @since 0.10.0
 * @function
 * @param {Object} a
 * @param {Object} b
 * @returns {Object}
 */
var merge = partial(_merge, [enumerables]);

/**
 * Same as {@link module:lamb.merge|merge}, but only the own properties of the
 * sources are taken into account.
 * @example <caption>Showing the difference with <code>merge</code>:</caption>
 * const baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
 * const foo = Object.create(baseFoo, {
 *     c: {value: 3, enumerable: true}
 * });
 *
 * const bar = {d: 4};
 *
 * _.merge(foo, bar) // => {a: 1, b: 2, c: 3, d: 4}
 * _.mergeOwn(foo, bar) // => {c: 3, d: 4}
 *
 * @example <caption>Array-like objects will be transformed to objects with numbers as keys:</caption>
 * _.mergeOwn([1, 2], {a: 2}) // => {"0": 1, "1": 2, a: 2}
 * _.mergeOwn("foo", {a: 2}) // => {"0": "f", "1": "o", "2": "o", a: 2}
 *
 * @example <caption>Every other non-nil value will be treated as an empty object:</caption>
 * _.mergeOwn({a: 2}, 99) // => {a: 2}
 * _.mergeOwn({a: 2}, NaN) // => {a: 2}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.merge|merge} to merge all enumerable properties
 * @since 0.12.0
 * @function
 * @param {Object} a
 * @param {Object} b
 * @returns {Object}
 */
var mergeOwn = partial(_merge, [keys]);

/**
 * Accepts an object and build a function expecting a key to create a "pair" with the key
 * and its value.
 * @private
 * @function
 * @param {Object} obj
 * @returns {Function}
 */
var _keyToPairIn = _curry2(function (obj, key) {
    return [key, obj[key]];
});

/**
 * Using the provided function to retrieve the keys, builds a new function
 * expecting an object to create a list of key / value pairs.
 * @private
 * @function
 * @param {Function} getKeys
 * @returns {Function}
 */
var _pairsFrom = _curry2(function (getKeys, obj) {
    return map(getKeys(obj), _keyToPairIn(obj));
});

/**
 * Same as {@link module:lamb.pairs|pairs}, but only the own enumerable properties of the object are
 * taken into account.<br/>
 * See also {@link module:lamb.fromPairs|fromPairs} for the reverse operation.
 * @example <caption>Showing the difference with <code>pairs</code>:</caption>
 * const baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
 * const foo = Object.create(baseFoo, {
 *     c: {value: 3, enumerable: true}
 * });
 *
 * _.pairs(foo) // => [["c", 3], ["b", 2], ["a", 1]]
 * _.ownPairs(foo) // => [["c", 3]]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.pairs|pairs}
 * @see {@link module:lamb.fromPairs|fromPairs}
 * @since 0.12.0
 * @param {Object} obj
 * @returns {Array<Array<String, *>>}
 */
var ownPairs = _pairsFrom(keys);

/**
 * Using the provided function to retrieve the keys of an object, builds
 * a function expecting an object to create the list of values for such keys.
 * @private
 * @function
 * @param {Function} getKeys
 * @returns {Function}
 */
var _valuesFrom = _curry2(function (getKeys, obj) {
    return map(getKeys(obj), function (key) {
        return obj[key];
    });
});

/**
 * Same as {@link module:lamb.values|values}, but only the own enumerable properties of the object are
 * taken into account.<br/>
 * @example <caption>Showing the difference with <code>values</code>:</caption>
 * const baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
 * const foo = Object.create(baseFoo, {
 *     c: {value: 3, enumerable: true}
 * });
 *
 * _.values(foo) // => [3, 2, 1]
 * _.ownValues(foo) // => [3]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.values|values}
 * @since 0.12.0
 * @param {Object} obj
 * @returns {Array}
 */
var ownValues = _valuesFrom(keys);

/**
 * Converts an object into an array of key / value pairs of its enumerable properties.<br/>
 * See also {@link module:lamb.ownPairs|ownPairs} for picking only the own enumerable
 * properties and {@link module:lamb.fromPairs|fromPairs} for the reverse operation.
 * @example
 * _.pairs({a: 1, b: 2, c: 3}) // => [["a", 1], ["b", 2], ["c", 3]]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.ownPairs|ownPairs}
 * @see {@link module:lamb.fromPairs|fromPairs}
 * @since 0.8.0
 * @param {Object} obj
 * @returns {Array<Array<String, *>>}
 */
var pairs = _pairsFrom(enumerables);

/**
 * Checks if the provided path exists in the given object.<br/>
 * Note that the function will check even non-enumerable properties.
 * @example
 * const user = {
 *     name: "John",
 *     surname: "Doe",
 *     address: {
 *         city: "New York"
 *     },
 *     scores: [10, 20, 15]
 * };
 *
 * _.pathExistsIn(user, "address.city") // => true
 * _.pathExistsIn(user, "address.country") // => false
 * _.pathExistsIn(user, "scores.1") // => true
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.pathExists|pathExists}
 * @see {@link module:lamb.hasOwn|hasOwn}, {@link module:lamb.hasOwnKey|hasOwnKey}
 * @see {@link module:lamb.has|has}, {@link module:lamb.hasKey|hasKey}
 * @since 0.43.0
 * @param {Object} obj
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {Boolean}
 */
function pathExistsIn (obj, path, separator) {
    return _getPathInfo(obj, _toPathParts(path, separator), true).isValid;
}

/**
 * Builds a partial application of {@link module:lamb.pathExistsIn|pathExistsIn} using the given
 * path and the optional separator. The resulting function expects the object to check.<br/>
 * Note that the function will check even non-enumerable properties.
 * @example
 * const user = {
 *     name: "John",
 *     surname: "Doe",
 *     address: {
 *         city: "New York"
 *     },
 *     scores: [10, 20, 15]
 * };
 *
 * const hasCity = _.pathExists("address.city");
 * const hasCountry = _.pathExists("address.country");
 * const hasAtLeastThreeScores = _.pathExists("scores.2");
 *
 * hasCity(user) // => true
 * hasCountry(user) // => false
 * hasAtLeastThreeScores(user) // => true
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.pathExistsIn|pathExistsIn}
 * @see {@link module:lamb.hasOwn|hasOwn}, {@link module:lamb.hasOwnKey|hasOwnKey}
 * @see {@link module:lamb.has|has}, {@link module:lamb.hasKey|hasKey}
 * @since 0.43.0
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {Function}
 */
var pathExists = _makePartial3(pathExistsIn);

/**
 * Builds a predicate that verifies if a condition is satisfied for the given
 * path in an object.<br/>
 * Like the other "path functions" you can use integers in the path, even
 * negative ones, to refer to array-like object indexes, but the priority will
 * be given to existing object keys.
 * @example
 * const user = {
 *     name: "John",
 *     performance: {
 *         scores: [1, 5, 10]
 *     }
 * };
 *
 * const gotAnHighScore = _.pathSatisfies(_.contains(10), "performance.scores");
 * const hadAGoodStart = _.pathSatisfies(_.isGT(6), "performance.scores.0");
 *
 * gotAnHighScore(user) // => true
 * hadAGoodStart(user) // => false
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.keySatisfies|keySatisfies}
 * @since 0.45.0
 * @param {Function} predicate
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {Function}
 */
function pathSatisfies (predicate, path, separator) {
    return function (obj) {
        var pathInfo = _getPathInfo(obj, _toPathParts(path, separator), true);

        return predicate.call(this, pathInfo.target);
    };
}

/**
 * Returns an object containing only the specified properties of the given object.<br/>
 * Non existent properties will be ignored.
 * @example
 * const user = {name: "john", surname: "doe", age: 30};
 *
 * _.pickIn(user, ["name", "age"]) // => {"name": "john", "age": 30};
 * _.pickIn(user, ["name", "email"]) // => {"name": "john"}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.pickIf|pickIf}, {@link module:lamb.pick|pick}
 * @see {@link module:lamb.skipIn|skipIn}, {@link module:lamb.skipIf|skipIf}
 * @since 0.1.0
 * @param {Object} source
 * @param {String[]} whitelist
 * @returns {Object}
 */
function pickIn (source, whitelist) {
    var result = {};

    for (var i = 0, len = whitelist.length, key; i < len; i++) {
        key = whitelist[i];

        if (has(source, key)) {
            result[key] = source[key];
        }
    }

    return result;
}

/**
 * A curried version of {@link module:lamb.pickIn|pickIn}, expecting a whitelist of keys to build
 * a function waiting for the object to act upon.
 * @example
 * const user = {id: 1, name: "Jane", surname: "Doe", active: false};
 * const getUserInfo = _.pick(["id", "active"]);
 *
 * getUserInfo(user) // => {id: 1, active: false}
 *
 * @example <caption>A useful composition with <code>mapWith</code>:</caption>
 * const users = [
 *     {id: 1, name: "Jane", surname: "Doe", active: false},
 *     {id: 2, name: "John", surname: "Doe", active: true},
 *     {id: 3, name: "Mario", surname: "Rossi", active: true},
 *     {id: 4, name: "Paolo", surname: "Bianchi", active: false}
 * ];
 * const select = _.compose(_.mapWith, _.pick);
 * const selectUserInfo = select(["id", "active"]);
 *
 * selectUserInfo(users) // =>
 * // [
 * //     {id: 1, active: false},
 * //     {id: 2, active: true},
 * //     {id: 3, active: true},
 * //     {id: 4, active: false}
 * // ]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.pickIn|pickIn}, {@link module:lamb.pickIf|pickIf}
 * @see {@link module:lamb.skipIn|skipIn}, {@link module:lamb.skip|skip},
 * {@link module:lamb.skipIf|skipIf}
 * @since 0.35.0
 * @param {String[]} whitelist
 * @returns {Function}
 */
var pick = _curry2(pickIn, true);

/**
 * Builds a function expecting an object whose enumerable properties will be checked
 * against the given predicate.<br/>
 * The properties satisfying the predicate will be included in the resulting object.
 * @example
 * const user = {name: "john", surname: "doe", age: 30};
 * const pickIfIsString = _.pickIf(_.isType("String"));
 *
 * pickIfIsString(user) // => {name: "john", surname: "doe"}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.pickIn|pickIn}, {@link module:lamb.pick|pick}
 * @see {@link module:lamb.skipIn|skipIn}, {@link module:lamb.skip|skip},
 * {@link module:lamb.skipIf|skipIf}
 * @since 0.1.0
 * @param {ObjectIteratorCallback} predicate
 * @returns {Function}
 */
function pickIf (predicate) {
    return function (source) {
        if (isNil(source)) {
            throw _makeTypeErrorFor(source, "object");
        }

        var result = {};

        for (var key in source) {
            if (predicate(source[key], key, source)) {
                result[key] = source[key];
            }
        }

        return result;
    };
}

/**
 * Creates a copy of the given object with its enumerable keys renamed as
 * indicated in the provided lookup table.
 * @example
 * const person = {"firstName": "John", "lastName": "Doe"};
 * const keysMap = {"firstName": "name", "lastName": "surname"};
 *
 * _.renameIn(person, keysMap) // => {"name": "John", "surname": "Doe"}
 *
 * @example <caption>It's safe using it to swap keys:</caption>
 * const keysMap = {"firstName": "lastName", "lastName": "firstName"};
 *
 * _.renameIn(person, keysMap) // => {"lastName": "John", "firstName": "Doe"}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.rename|rename}, {@link module:lamb.renameWith|renameWith}
 * @since 0.26.0
 * @param {Object} source
 * @param {Object} keysMap
 * @returns {Object}
 */
function renameIn (source, keysMap) {
    keysMap = Object(keysMap);
    var result = {};
    var oldKeys = enumerables(source);

    for (var prop in keysMap) {
        if (~oldKeys.indexOf(prop)) {
            result[keysMap[prop]] = source[prop];
        }
    }

    for (var i = 0, len = oldKeys.length, key; i < len; i++) {
        key = oldKeys[i];

        if (!(key in keysMap || key in result)) {
            result[key] = source[key];
        }
    }

    return result;
}

/**
 * A curried version of {@link module:lamb.renameIn|renameIn} expecting a
 * <code>keysMap</code> to build a function waiting for the object to act upon.
 * @example
 * const persons = [
 *     {"firstName": "John", "lastName": "Doe"},
 *     {"first_name": "Mario", "last_name": "Rossi"},
 * ];
 * const normalizeKeys = _.rename({
 *     "firstName": "name",
 *     "first_name": "name",
 *     "lastName": "surname",
 *     "last_name": "surname"
 * });
 *
 * _.map(persons, normalizeKeys) // =>
 * // [
 * //     {"name": "John", "surname": "Doe"},
 * //     {"name": "Mario", "surname": "Rossi"}
 * // ]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.renameIn|renameIn}, {@link module:lamb.renameWith|renameWith}
 * @since 0.26.0
 * @param {Object} keysMap
 * @returns {Function}
 */
var rename = _curry2(renameIn, true);

/**
 * Uses the provided function as a <code>keysMap</code> generator and returns
 * a function expecting the object whose keys we want to {@link module:lamb.renameIn|renameIn}.
 * @example
 * const person = {"NAME": "John", "SURNAME": "Doe"};
 * const arrayToLower = _.mapWith(_.invoke("toLowerCase"));
 * const makeLowerKeysMap = function (source) {
 *     const sourceKeys = _.keys(source);
 *
 *     return _.make(sourceKeys, arrayToLower(sourceKeys));
 * };
 * const lowerKeysFor = _.renameWith(makeLowerKeysMap);
 *
 * lowerKeysFor(person) // => {"name": "John", "surname": "doe"};
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.renameIn|renameIn}, {@link module:lamb.rename|rename}
 * @since 0.26.0
 * @param {Function} fn
 * @returns {Function}
 */
function renameWith (fn) {
    return function (source) {
        return renameIn(source, fn(source));
    };
}

/**
 * Sets, or creates, a property in a copy of the provided object to the desired value.
 * @private
 * @param {Object} source
 * @param {String} key
 * @param {*} value
 * @returns {Object}
 */
function _setIn (source, key, value) {
    var result = {};

    for (var prop in source) {
        result[prop] = source[prop];
    }

    result[key] = value;

    return result;
}

/**
 * Sets the specified key to the given value in a copy of the provided object.<br/>
 * All the remaining enumerable keys of the source object will be simply copied in the
 * result object without breaking references.<br/>
 * If the specified key is not part of the source object, it will be added to the
 * result.<br/>
 * The main purpose of the function is to work on simple plain objects used as
 * data structures, such as JSON objects, and makes no effort to play nice with
 * objects created from an OOP perspective (it's not worth it).<br/>
 * For example the prototype of the result will be <code>Object</code>'s regardless
 * of the <code>source</code>'s one.
 * @example
 * const user = {name: "John", surname: "Doe", age: 30};
 *
 * _.setIn(user, "name", "Jane") // => {name: "Jane", surname: "Doe", age: 30}
 * _.setIn(user, "gender", "male") // => {name: "John", surname: "Doe", age: 30, gender: "male"}
 *
 * // `user` still is {name: "John", surname: "Doe", age: 30}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.setKey|setKey}
 * @see {@link module:lamb.setPath|setPath}, {@link module:lamb.setPathIn|setPathIn}
 * @since 0.18.0
 * @param {Object} source
 * @param {String} key
 * @param {*} value
 * @returns {Object}
 */
function setIn (source, key, value) {
    if (isNil(source)) {
        throw _makeTypeErrorFor(source, "object");
    }

    return _setIn(source, key, value);
}

/**
 * Builds a partial application of {@link module:lamb.setIn|setIn} with the provided
 * <code>key</code> and <code>value</code>.<br/>
 * The resulting function expects the object to act upon.<br/>
 * Please refer to {@link module:lamb.setIn|setIn}'s description for explanations about
 * how the copy of the source object is made.
 * @example
 * const user = {name: "John", surname: "Doe", age: 30};
 * const setAgeTo40 = _.setKey("age", 40);
 *
 * setAgeTo40(user) // => {name: "john", surname: "doe", age: 40}
 *
 * // `user` still is {name: "John", surname: "Doe", age: 30}
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.setIn|setIn}
 * @see {@link module:lamb.setPath|setPath}, {@link module:lamb.setPathIn|setPathIn}
 * @since 0.18.0
 * @param {String} key
 * @param {*} value
 * @returns {Function}
 */
var setKey = _makePartial3(setIn);

/**
 * Accepts a target object and a key name and verifies that the target is an array and that
 * the key is an existing index.
 * @private
 * @param {Object} target
 * @param {String|Number} key
 * @returns {Boolean}
 */
function _isArrayIndex (target, key) {
    var n = +key;

    return Array.isArray(target) && n % 1 === 0 && !(n < 0 && _isEnumerable(target, key));
}

/**
 * Sets the object's property targeted by the given path to the desired value.<br/>
 * Works with arrays and is able to set their indexes, even negative ones.
 * @private
 * @param {Object|Array} obj
 * @param {String[]} parts
 * @param {*} value
 * @returns {Object|Array}
 */
function _setPathIn (obj, parts, value) {
    var key = parts[0];
    var partsLen = parts.length;
    var v;

    if (partsLen === 1) {
        v = value;
    } else {
        var targetKey = _getPathKey(obj, key, false);

        v = _setPathIn(
            isUndefined(targetKey) ? targetKey : obj[targetKey],
            slice(parts, 1, partsLen),
            value
        );
    }

    return _isArrayIndex(obj, key) ? _setIndex(obj, key, v) : _setIn(obj, key, v);
}

/**
 * Allows to change a nested value in a copy of the provided object.<br/>
 * The function will delegate the "set action" to {@link module:lamb.setIn|setIn} or
 * {@link module:lamb.setAt|setAt} depending on the value encountered in the path,
 * so please refer to the documentation of those functions for specifics about the
 * implementation.<br/>
 * Note anyway that the distinction will be between <code>Array</code>s, delegated
 * to {@link module:lamb.setAt|setAt}, and everything else (including array-like objects),
 * which will be delegated to {@link module:lamb.setIn|setIn}.<br/>
 * As a result of that, array-like objects will be converted to objects having numbers as keys
 * and paths targeting non-object values will be converted to empty objects.<br/>
 * You can anyway target array elements using integers in the path, even negative ones, but
 * the priority will be given to existing, and enumerable, object keys.<br/>
 * Non-enumerable properties encountered in the path will be considered as non-existent properties.<br/>
 * Like {@link module:lamb.getPathIn|getPathIn} or {@link module:lamb.getPath|getPath} you can
 * use custom path separators.
 * @example
 * const user = {id: 1, status: {active : false, scores: [2, 4, 6]}};
 *
 * _.setPathIn(user, "status.active", true) // => {id: 1, status: {active : true, scores: [2, 4, 6]}}
 *
 * @example <caption>Targeting arrays:</caption>
 * _.setPathIn(user, "status.scores.0", 8) // => {id: 1, status: {active : false, scores: [8, 4, 6]}}
 *
 * // you can use negative indexes as well
 * _.setPathIn(user, "status.scores.-1", 8) // => {id: 1, status: {active : false, scores: [2, 4, 8]}}
 *
 * @example <caption>Arrays can also be part of the path and not necessarily its target:</caption>
 * const user = {
 *     id: 1,
 *     scores: [
 *         {value: 2, year: "2000"},
 *         {value: 4, year: "2001"},
 *         {value: 6, year: "2002"}
 *     ]
 * };
 *
 * const newUser = _.setPathIn(user, "scores.0.value", 8);
 * // "newUser" holds:
 * // {
 * //     id: 1,
 * //     scores: [
 * //         {value: 8, year: "2000"},
 * //         {value: 4, year: "2001"},
 * //         {value: 6, year: "2002"}
 * //     ]
 * // }
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.setPath|setPath}
 * @see {@link module:lamb.setIn|setIn}, {@link module:lamb.setKey|setKey}
 * @since 0.20.0
 * @param {Object|Array} source
 * @param {String} path
 * @param {*} value
 * @param {String} [separator="."]
 * @returns {Object|Array}
 */
function setPathIn (source, path, value, separator) {
    if (isNil(source)) {
        throw _makeTypeErrorFor(source, "object");
    }

    return _setPathIn(source, _toPathParts(path, separator), value);
}

/**
 * Builds a partial application of {@link module:lamb.setPathIn|setPathIn} expecting the
 * object to act upon.<br/>
 * See {@link module:lamb.setPathIn|setPathIn} for more details and examples.
 * @example
 * const user = {id: 1, status: {active: false}};
 * const activate = _.setPath("status.active", true);
 *
 * activate(user) // => {id: 1, status: {active: true}}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.setPathIn|setPathIn}
 * @see {@link module:lamb.setIn|setIn}, {@link module:lamb.setKey|setKey}
 * @since 0.20.0
 * @param {String} path
 * @param {*} value
 * @param {String} [separator="."]
 * @returns {Function}
 */
function setPath (path, value, separator) {
    return function (source) {
        return setPathIn(source, path, value, separator);
    };
}

/**
 * Returns a copy of the source object without the specified properties.
 * @example
 * const user = {name: "john", surname: "doe", age: 30};
 *
 * _.skipIn(user, ["name", "age"]) // => {surname: "doe"};
 * _.skipIn(user, ["name", "email"]) // => {surname: "doe", age: 30};
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.skip|skip}, {@link module:lamb.skipIf|skipIf}
 * @see {@link module:lamb.pickIn|pickIn}, {@link module:lamb.pick|pick},
 * {@link module:lamb.pickIf|pickIf}
 * @since 0.1.0
 * @param {Object} source
 * @param {String[]} blacklist
 * @returns {Object}
 */
function skipIn (source, blacklist) {
    if (isNil(source)) {
        throw _makeTypeErrorFor(source, "object");
    }

    var result = {};
    var props = make(blacklist, []);

    for (var key in source) {
        if (!(key in props)) {
            result[key] = source[key];
        }
    }

    return result;
}

/**
 * A curried version of {@link module:lamb.skipIn|skipIn}, expecting a blacklist of keys to build
 * a function waiting for the object to act upon.
 * @example
 * const user = {id: 1, name: "Jane", surname: "Doe", active: false};
 * const getUserInfo = _.skip(["name", "surname"]);
 *
 * getUserInfo(user) // => {id: 1, active: false}
 *
 * @example <caption>A useful composition with <code>mapWith</code>:</caption>
 * const users = [
 *     {id: 1, name: "Jane", surname: "Doe", active: false},
 *     {id: 2, name: "John", surname: "Doe", active: true},
 *     {id: 3, name: "Mario", surname: "Rossi", active: true},
 *     {id: 4, name: "Paolo", surname: "Bianchi", active: false}
 * ];
 * const discard = _.compose(_.mapWith, _.skip);
 * const discardNames = discard(["name", "surname"]);
 *
 * discardNames(users) // =>
 * // [
 * //     {id: 1, active: false},
 * //     {id: 2, active: true},
 * //     {id: 3, active: true},
 * //     {id: 4, active: false}
 * // ]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.skipIn|skipIn}, {@link module:lamb.skipIf|skipIf}
 * @see {@link module:lamb.pickIn|pickIn}, {@link module:lamb.pick|pick},
 * {@link module:lamb.pickIf|pickIf}
 * @since 0.35.0
 * @param {String[]} blacklist
 * @returns {Function}
 */
var skip = _curry2(skipIn, true);

/**
 * Builds a function expecting an object whose enumerable properties will be checked
 * against the given predicate.<br/>
 * The properties satisfying the predicate will be omitted in the resulting object.
 * @example
 * const user = {name: "john", surname: "doe", age: 30};
 * const skipIfIstring = _.skipIf(_.isType("String"));
 *
 * skipIfIstring(user) // => {age: 30}
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.skipIn|skipIn}, {@link module:lamb.skip|skip}
 * @see {@link module:lamb.pickIn|pickIn}, {@link module:lamb.pick|pick},
 * {@link module:lamb.pickIf|pickIf}
 * @since 0.1.0
 * @param {ObjectIteratorCallback} predicate
 * @returns {Function}
 */
var skipIf = compose(pickIf, not);

/**
 * Using the provided function to retrieve the keys of an object, builds
 * a function expecting an object to create an array containing a list
 * of the keys in its first index and the corresponding list of values
 * in the second one.
 * @private
 * @function
 * @param {Function} getKeys
 * @returns {Function}
 */
var _tearFrom = _curry2(function (getKeys, obj) {
    return reduce(getKeys(obj), function (result, key) {
        result[0].push(key);
        result[1].push(obj[key]);

        return result;
    }, [[], []]);
});

/**
 * Tears an object apart by transforming it in an array of two lists: one containing
 * its enumerable keys, the other containing the corresponding values.<br/>
 * Although this "tearing apart" may sound as a rather violent process, the source
 * object will be unharmed.
 * @example
 * _.tear({a: 1, b: 2, c: 3}) // => [["a", "b", "c"], [1, 2, 3]]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.tearOwn|tearOwn}
 * @see {@link module:lamb.make|make} for the reverse operation
 * @since 0.8.0
 * @param {Object} obj
 * @returns {Array<String[], Array>}
 */
var tear = _tearFrom(enumerables);

/**
 * Same as {@link module:lamb.tear|tear}, but only the own properties of the object are
 * taken into account.
 * @example <caption>Showing the difference with <code>tear</code>:</caption>
 * const baseFoo = Object.create({a: 1}, {b: {value: 2, enumerable: true}, z: {value: 5}});
 * const foo = Object.create(baseFoo, {
 *     c: {value: 3, enumerable: true}
 * });
 *
 * _.tear(foo) // => [["c", "b", "a"], [3, 2, 1]]
 * _.tearOwn(foo) // => [["c"], [3]]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.tear|tear}
 * @see {@link module:lamb.make|make} for the reverse operation
 * @since 0.12.0
 * @param {Object} obj
 * @returns {Array<String[], Array>}
 */
var tearOwn = _tearFrom(keys);

/**
 * Creates a copy of the given object having the desired key value updated by applying
 * the provided function to it.<br/>
 * This function is meant for updating existing enumerable properties, and for those it
 * will delegate the "set action" to {@link module:lamb.setIn|setIn}; a copy of the
 * <code>source</code> is returned otherwise.
 * @example
 * const user = {name: "John", visits: 2};
 * const toUpperCase = _.invoke("toUpperCase");
 *
 * _.updateIn(user, "name", toUpperCase) // => {name: "JOHN", visits: 2}
 * _.updateIn(user, "surname", toUpperCase) // => {name: "John", visits: 2}
 *
 * @example <caption>Non-enumerable properties will be treated as non-existent:</caption>
 * const user = Object.create({name: "John"}, {visits: {value: 2}});
 *
 * _.updateIn(user, "visits", _.add(1)) // => {name: "John", visits: 2}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.updateKey|updateKey}
 * @see {@link module:lamb.updatePath|updatePath}, {@link module:lamb.updatePathIn|updatePathIn}
 * @since 0.22.0
 * @param {Object} source
 * @param {String} key
 * @param {Function} updater
 * @returns {Object}
 */
function updateIn (source, key, updater) {
    return _isEnumerable(source, key)
        ? _setIn(source, key, updater(source[key]))
        : _merge(enumerables, source, {});
}

/**
 * Builds a partial application of {@link module:lamb.updateIn|updateIn} with the provided
 * <code>key</code> and <code>updater</code>, expecting the object to act upon.<br/>
 * This function is meant for updating existing enumerable properties, and for those it
 * will delegate the "set action" to {@link module:lamb.setIn|setIn}; a copy of the
 * <code>source</code> is returned otherwise.
 * @example
 * const user = {name: "John", visits: 2};
 * const incrementVisits = _.updateKey("visits", _.add(1));
 *
 * incrementVisits(user) // => {name: "John", visits: 3}
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.updateIn|updateIn}
 * @see {@link module:lamb.updatePath|updatePath}, {@link module:lamb.updatePathIn|updatePathIn}
 * @since 0.22.0
 * @param {String} key
 * @param {Function} updater
 * @returns {Function}
 */
var updateKey = _makePartial3(updateIn);

/**
 * Allows to change a nested value in a copy of the given object by applying the provided
 * function to it.<br/>
 * This function is meant for updating existing enumerable properties, and for those it
 * will delegate the "set action" to {@link module:lamb.setPathIn|setPathIn}; a copy of the
 * <code>source</code> is returned otherwise.<br/>
 * Like the other "path" functions, negative indexes can be used to access array elements, but
 * the priority will be given to existing, and enumerable, object keys.
 * @example
 * const user = {id: 1, status: {scores: [2, 4, 6], visits: 0}};
 * const inc = _.add(1);
 *
 * _.updatePathIn(user, "status.visits", inc) // => {id: 1, status: {scores: [2, 4, 6]}, visits: 1}
 *
 * @example <caption>Targeting arrays:</caption>
 * _.updatePathIn(user, "status.scores.0", inc) // => {id: 1, status: {scores: [3, 4, 6], visits: 0}}
 *
 * // you can use negative indexes as well
 * _.updatePathIn(user, "status.scores.-1", inc) // => {id: 1, status: {scores: [2, 4, 7], visits: 0}}
 *
 * @example <caption>Arrays can also be part of the path and not necessarily its target:</caption>
 * const user = {
 *     id: 1,
 *     scores: [
 *         {value: 2, year: "2000"},
 *         {value: 4, year: "2001"},
 *         {value: 6, year: "2002"}
 *     ]
 * };
 *
 * const newUser = _.updatePathIn(user, "scores.0.value", inc);
 * // "newUser" holds:
 * // {
 * //     id: 1,
 * //     scores: [
 * //         {value: 3, year: "2000"},
 * //         {value: 4, year: "2001"},
 * //         {value: 6, year: "2002"}
 * //     ]
 * // }
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.updatePath|updatePath}
 * @see {@link module:lamb.updateIn|updateIn}, {@link module:lamb.updateKey|updateKey}
 * @since 0.24.0
 * @param {Object|Array} source
 * @param {String} path
 * @param {Function} updater
 * @param {String} [separator="."]
 * @returns {Object|Array}
 */
function updatePathIn (source, path, updater, separator) {
    var parts = _toPathParts(path, separator);
    var pathInfo = _getPathInfo(source, parts, false);

    if (pathInfo.isValid) {
        return _setPathIn(source, parts, updater(pathInfo.target));
    } else {
        return Array.isArray(source) ? slice(source, 0, source.length) : _merge(enumerables, source, {});
    }
}

/**
 * Builds a partial application of {@link module:lamb.updatePathIn|updatePathIn}
 * expecting the object to act upon.<br/>
 * This function is meant for updating existing enumerable properties, and for those it
 * will delegate the "set action" to {@link module:lamb.setPathIn|setPathIn}; a copy of the
 * <code>source</code> is returned otherwise.<br/>
 * Like the other "path" functions, negative indexes can be used to access array elements, but
 * the priority will be given to existing, and enumerable, object keys.
 * @example
 * const user = {id: 1, status: {scores: [2, 4, 6], visits: 0}};
 * const incrementScores = _.updatePath("status.scores", _.mapWith(_.add(1)))
 *
 * incrementScores(user) // => {id: 1, status: {scores: [3, 5, 7], visits: 0}}
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.updatePathIn|updatePathIn}
 * @see {@link module:lamb.updateIn|updateIn}, {@link module:lamb.updateKey|updateKey}
 * @since 0.24.0
 * @param {String} path
 * @param {Function} updater
 * @param {String} [separator="."]
 * @returns {Function}
 */
function updatePath (path, updater, separator) {
    return function (source) {
        return updatePathIn(source, path, updater, separator);
    };
}

/**
 * Validates an object with the given list of {@link module:lamb.checker|checker} functions.
 * @example
 * const hasContent = s => s.trim().length > 0;
 * const userCheckers = [
 *     _.checker(hasContent, "Name is required", ["name"]),
 *     _.checker(hasContent, "Surname is required", ["surname"]),
 *     _.checker(_.isGTE(18), "Must be at least 18 years old", ["age"])
 * ];
 *
 * const user1 = {name: "john", surname: "doe", age: 30};
 * const user2 = {name: "jane", surname: "", age: 15};
 *
 * _.validate(user1, userCheckers) // => []
 * _.validate(user2, userCheckers) // =>
 * // [
 * //     ["Surname is required", ["surname"]],
 * //     ["Must be at least 18 years old", ["age"]]
 * // ]
 *
 * @memberof module:lamb
 * @category Object
 * @see {@link module:lamb.validateWith|validateWith}
 * @see {@link module:lamb.checker|checker}
 * @since 0.1.0
 * @param {Object} obj
 * @param {Function[]} checkers
 * @returns {Array<Array<String, String[]>>} An array of errors in the form returned by
 * {@link module:lamb.checker|checker}, or an empty array.
 */
function validate (obj, checkers) {
    return reduce(checkers, function (errors, _checker) {
        var result = _checker(obj);

        result.length && errors.push(result);

        return errors;
    }, []);
}

/**
 * A curried version of {@link module:lamb.validate|validate} accepting a list of
 * {@link module:lamb.checker|checkers} and returning a function expecting the object to validate.
 * @example
 * const hasContent = s => s.trim().length > 0;
 * const userCheckers = [
 *     _.checker(hasContent, "Name is required", ["name"]),
 *     _.checker(hasContent, "Surname is required", ["surname"]),
 *     _.checker(_.isGTE(18), "Must be at least 18 years old", ["age"])
 * ];
 * const validateUser = _.validateWith(userCheckers);
 *
 * const user1 = {name: "john", surname: "doe", age: 30};
 * const user2 = {name: "jane", surname: "", age: 15};
 *
 * validateUser(user1) // => []
 * validateUser(user2) // =>
 * // [
 * //     ["Surname is required", ["surname"]],
 * //     ["Must be at least 18 years old", ["age"]]
 * // ]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.validate|validate}
 * @see {@link module:lamb.checker|checker}
 * @since 0.1.0
 * @param {Function[]} checkers
 * @returns {Function}
 */
var validateWith = _curry2(validate, true);

/**
 * Generates an array with the values of the enumerable properties of the given object.<br/>
 * See also {@link module:lamb.ownValues|ownValues} to pick only from the own properties of the object.
 * @example
 * const user = {name: "john", surname: "doe", age: 30};
 *
 * _.values(user) // => ["john", "doe", 30]
 *
 * @memberof module:lamb
 * @category Object
 * @function
 * @see {@link module:lamb.ownValues|ownValues}
 * @since 0.1.0
 * @param {Object} obj
 * @returns {Array}
 */
var values = _valuesFrom(enumerables);

/**
 * A null-safe function to repeat the source string the desired amount of times.
 * @private
 * @param {String} source
 * @param {Number} times
 * @returns {String}
 */
function _repeat (source, times) {
    var result = "";

    for (var i = 0; i < times; i++) {
        result += source;
    }

    return result;
}

/**
 * Builds the prefix or suffix to be used when padding a string.
 * @private
 * @param {String} source
 * @param {String} char
 * @param {Number} len
 * @returns {String}
 */
function _getPadding (source, char, len) {
    if (!isNil(source) && type(source) !== "String") {
        source = String(source);
    }

    return _repeat(String(char)[0] || "", Math.ceil(len - source.length));
}

/**
 * Pads a string to the desired length with the given char starting from the beginning of the string.
 * @example
 * _.padLeft("foo", "-", 0) // => "foo"
 * _.padLeft("foo", "-", -1) // => "foo"
 * _.padLeft("foo", "-", 5) // => "--foo"
 * _.padLeft("foo", "-", 3) // => "foo"
 * _.padLeft("foo", "ab", 7) // => "aaaafoo"
 * _.padLeft("foo", "", 5) // => "foo"
 * _.padLeft("", "-", 5) // => "-----"
 *
 * @memberof module:lamb
 * @category String
 * @see {@link module:lamb.padRight|padRight}
 * @since 0.1.0
 * @param {String} source
 * @param {String} char - The padding char. If a string is passed only the first char is used.
 * @param {Number} len
 * @returns {String}
 */
function padLeft (source, char, len) {
    return _getPadding(source, char, len) + source;
}

/**
 * Pads a string to the desired length with the given char starting from the end of the string.
 * @example
 * _.padRight("foo", "-", 0) // => "foo"
 * _.padRight("foo", "-", -1) // => "foo"
 * _.padRight("foo", "-", 5) // => "foo--"
 * _.padRight("foo", "-", 3) // => "foo"
 * _.padRight("foo", "ab", 7) // => "fooaaaa"
 * _.padRight("foo", "", 5) // => "foo"
 * _.padRight("", "-", 5) // => "-----"
 *
 * @memberof module:lamb
 * @category String
 * @see {@link module:lamb.padLeft|padLeft}
 * @since 0.1.0
 * @param {String} source
 * @param {String} char - The padding char. If a string is passed only the first char is used.
 * @param {Number} len
 * @returns {String}
 */
function padRight (source, char, len) {
    return source + _getPadding(source, char, len);
}

/**
 * Builds a new string by repeating the source string the desired amount of times.<br/>
 * Note that unlike the current ES6 proposal for
 * [String.prototype.repeat]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat},
 * this function doesn't throw a RangeError if <code>times</code> is negative,
 * but returns an empty string instead.
 * @example
 * _.repeat("Hello", -1) // => ""
 * _.repeat("Hello", 1) // => "Hello"
 * _.repeat("Hello", 3) // => "HelloHelloHello"
 *
 * @memberof module:lamb
 * @category String
 * @since 0.1.0
 * @param {String} source
 * @param {Number} times
 * @returns {String}
 */
function repeat (source, times) {
    if (isNil(source)) {
        throw _makeTypeErrorFor(source, "string");
    }

    return _repeat(source, Math.floor(times));
}

/**
 * Builds a partial application of [<code>String.prototype.replace</code>]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace}
 * with the given needle and substitution.<br/>
 * Please refer to MDN docs for more insights and examples.
 * @example
 * const htmlString = "<p>Lorem <strong class=\"foo bar\">ipsum dolor</strong> sit amet</p>";
 * const stripHTML = _.replace(/<[^>]+>/g, "");
 *
 * stripHTML(htmlString) // => "Lorem ipsum dolor sit amet"
 *
 * @memberof module:lamb
 * @category String
 * @function
 * @see [<code>String.prototype.replace</code>]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace} on MDN.
 * @since 0.60.0
 * @param {RegExp|String} needle
 * @param {Function|String} sub
 * @returns {Function} <code>(haystack: String) => String</code>
 */
var replace = _makePartial3(generic(String.prototype.replace));

/**
 * Splits a string into an array of substrings using the given separator.
 * @example
 * _.split("Jan,Feb,Mar,Apr,May", ",") // => ["Jan", "Feb", "Mar", "Apr", "May"]
 * _.split("Jan, Feb , Mar,Apr,   May", /\s*,\s*‍/) // => ["Jan", "Feb", "Mar", "Apr", "May"]
 *
 * @memberof module:lamb
 * @category String
 * @function
 * @see {@link module:lamb.splitBy|splitBy}
 * @see {@link module:lamb.join|join}, {@link module:lamb.joinWith|joinWith}
 * @since 0.59.0
 * @param {String} source
 * @param {String|RegExp} separator
 * @returns {String[]}
 */
var split = binary(generic(String.prototype.split));

/**
 * A curried version of {@link module:lamb.split|split} that accepts
 * a separator and builds a function expecting the string to split.
 * @example
 * const splitByCommma = _.splitBy(",");
 *
 * splitByCommma("Jan,Feb,Mar,Apr,May") // => ["Jan", "Feb", "Mar", "Apr", "May"]
 *
 * @memberof module:lamb
 * @category String
 * @function
 * @see {@link module:lamb.split|split}
 * @see {@link module:lamb.join|join}, {@link module:lamb.joinWith|joinWith}
 * @since 0.59.0
 * @param {String|RegExp} separator
 * @returns {Function}
 */
var splitBy = _curry2(split, true);

/**
 * A generic version of <code>String.prototype.search</code>
 * @private
 * @function
 * @param {String} s
 * @param {RegExp} pattern
 * @returns {Number}
 */
var _search = generic(String.prototype.search);

/**
 * Builds a predicate expecting a string to test against the given regular expression pattern.
 * @example
 * const hasNumbersOnly = _.testWith(/^\d+$/);
 *
 * hasNumbersOnly("123") // => true
 * hasNumbersOnly("123 Kg") // => false
 *
 * @memberof module:lamb
 * @category String
 * @since 0.1.0
 * @param {RegExp} pattern
 * @returns {Function}
 */
function testWith (pattern) {
    return function (s) {
        return _search(s, pattern) !== -1;
    };
}

/**
 * Accepts a constructor and builds a predicate expecting an object,
 * which will be tested to verify whether the prototype of the constructor
 * is in its prototype chain.<br/>
 * Wraps in a convenient way the native
 * [instanceof]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof} operator.
 * @example
 * function SomeObjA () {}
 *
 * const a = new SomeObjA();
 * const sObj = new String("foo");
 * const s = "foo";
 *
 * _.isInstanceOf(Object)(a) // => true
 * _.isInstanceOf(SomeObjA)(a) // => true
 *
 * _.isInstanceOf(Object)(sObj) // => true
 * _.isInstanceOf(String)(sObj) // => true
 *
 * _.isInstanceOf(Object)(s) // => false
 * _.isInstanceOf(String)(s) // => false
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.isType|isType}
 * @since 0.47.0
 * @param {*} constructor
 * @returns {Function}
 */
function isInstanceOf (constructor) {
    return function (obj) {
        return obj instanceof constructor;
    };
}

/**
 * Builds a predicate that expects a value to check against the specified type.
 * @example
 * const isString = _.isType("String");
 *
 * isString("Hello") // => true
 * isString(new String("Hi")) // => true
 *
 * @memberof module:lamb
 * @category Type
 * @see {@link module:lamb.type|type}
 * @since 0.1.0
 * @param {String} typeName
 * @returns {Function}
 */
function isType (typeName) {
    return function (value) {
        return type(value) === typeName;
    };
}

var _ = /*#__PURE__*/Object.freeze({
    __proto__: null,
    __: __,
    adapter: adapter,
    add: add,
    allOf: allOf,
    always: always,
    anyOf: anyOf,
    append: append,
    appendTo: appendTo,
    application: application,
    apply: apply,
    applyTo: applyTo,
    areSVZ: areSVZ,
    areSame: areSame,
    aritize: aritize,
    asPartial: asPartial,
    binary: binary,
    casus: casus,
    checker: checker,
    clamp: clamp,
    clampWithin: clampWithin,
    collect: collect,
    compose: compose,
    condition: condition,
    contains: contains,
    count: count,
    countBy: countBy,
    curry: curry,
    curryRight: curryRight,
    curryable: curryable,
    curryableRight: curryableRight,
    debounce: debounce,
    deduct: deduct,
    difference: difference,
    divide: divide,
    divideBy: divideBy,
    drop: drop,
    dropFrom: dropFrom,
    dropLastWhile: dropLastWhile,
    dropWhile: dropWhile,
    enumerables: enumerables,
    every: every,
    everyIn: everyIn,
    filter: filter,
    filterWith: filterWith,
    find: find,
    findIndex: findIndex,
    findIndexWhere: findIndexWhere,
    findLast: findLast,
    findLastIndex: findLastIndex,
    findLastIndexWhere: findLastIndexWhere,
    findLastWhere: findLastWhere,
    findWhere: findWhere,
    flatMap: flatMap,
    flatMapWith: flatMapWith,
    flatten: flatten,
    flip: flip,
    forEach: forEach,
    fromPairs: fromPairs,
    generate: generate,
    generic: generic,
    getArgAt: getArgAt,
    getAt: getAt,
    getIn: getIn,
    getIndex: getIndex,
    getKey: getKey,
    getPath: getPath,
    getPathIn: getPathIn,
    group: group,
    groupBy: groupBy,
    gt: gt,
    gte: gte,
    has: has,
    hasKey: hasKey,
    hasKeyValue: hasKeyValue,
    hasOwn: hasOwn,
    hasOwnKey: hasOwnKey,
    hasPathValue: hasPathValue,
    head: head,
    identity: identity,
    index: index,
    indexBy: indexBy,
    init: init$1,
    insert: insert,
    insertAt: insertAt,
    intersection: intersection,
    invoke: invoke,
    invokeOn: invokeOn,
    is: is,
    isFinite: isFinite_,
    isGT: isGT,
    isGTE: isGTE,
    isIn: isIn,
    isInstanceOf: isInstanceOf,
    isInteger: isInteger,
    isLT: isLT,
    isLTE: isLTE,
    isNil: isNil,
    isNull: isNull,
    isSVZ: isSVZ,
    isSafeInteger: isSafeInteger,
    isType: isType,
    isUndefined: isUndefined,
    join: join,
    joinWith: joinWith,
    keySatisfies: keySatisfies,
    keys: keys,
    last: last,
    list: list,
    lt: lt,
    lte: lte,
    make: make,
    map: map,
    mapArgs: mapArgs,
    mapValues: mapValues,
    mapValuesWith: mapValuesWith,
    mapWith: mapWith,
    mean: mean,
    median: median,
    merge: merge,
    mergeOwn: mergeOwn,
    modulo: modulo,
    multiply: multiply,
    multiplyBy: multiplyBy,
    not: not,
    ownPairs: ownPairs,
    ownValues: ownValues,
    padLeft: padLeft,
    padRight: padRight,
    pairs: pairs,
    partial: partial,
    partialRight: partialRight,
    partition: partition,
    partitionWith: partitionWith,
    pathExists: pathExists,
    pathExistsIn: pathExistsIn,
    pathSatisfies: pathSatisfies,
    pick: pick,
    pickIf: pickIf,
    pickIn: pickIn,
    pipe: pipe,
    pluck: pluck,
    pluckFrom: pluckFrom,
    pull: pull,
    pullFrom: pullFrom,
    randomInt: randomInt,
    range: range,
    reduce: reduce,
    reduceRight: reduceRight,
    reduceRightWith: reduceRightWith,
    reduceWith: reduceWith,
    remainder: remainder,
    rename: rename,
    renameIn: renameIn,
    renameWith: renameWith,
    repeat: repeat,
    replace: replace,
    reverse: reverse,
    rotate: rotate,
    rotateBy: rotateBy,
    setAt: setAt,
    setIn: setIn,
    setIndex: setIndex,
    setKey: setKey,
    setPath: setPath,
    setPathIn: setPathIn,
    shallowFlatten: shallowFlatten,
    skip: skip,
    skipIf: skipIf,
    skipIn: skipIn,
    slice: slice,
    sliceAt: sliceAt,
    some: some,
    someIn: someIn,
    sort: sort,
    sortWith: sortWith,
    sortedInsert: sortedInsert,
    sorter: sorter,
    sorterDesc: sorterDesc,
    split: split,
    splitBy: splitBy,
    subtract: subtract,
    sum: sum,
    tail: tail,
    take: take,
    takeFrom: takeFrom,
    takeLastWhile: takeLastWhile,
    takeWhile: takeWhile,
    tapArgs: tapArgs,
    tear: tear,
    tearOwn: tearOwn,
    testWith: testWith,
    throttle: throttle,
    transpose: transpose,
    type: type,
    unary: unary,
    union: union,
    unionBy: unionBy,
    uniques: uniques,
    uniquesBy: uniquesBy,
    unless: unless,
    updateAt: updateAt,
    updateIn: updateIn,
    updateIndex: updateIndex,
    updateKey: updateKey,
    updatePath: updatePath,
    updatePathIn: updatePathIn,
    validate: validate,
    validateWith: validateWith,
    values: values,
    when: when,
    zip: zip,
    zipWithIndex: zipWithIndex
});

/**
* @module @svizzle/utils/any-boolean
*/

/**
 * Return true if the input is an array
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isArray([])
true
> isArray([1, 2])
true
> isArray({a: 1})
false
> isArray('foo')
false

> function returnArgs () {
	return arguments;
}
> isArray(returnArgs())
false
 *
 * @since 0.1.0
 */
const isArray = isType('Array');

/**
 * Return true if the input is not a NaN.
 * Remember that {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN#Confusing_special-case_behavior|isNaN coerces the input with Number()} to the output can be a bit surprising.
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isNotNaN(1)
true
> isNotNaN(Infinity)
true
> isNotNaN([123])
true
> isNotNaN('123')
true
> isNotNaN(true)
true
> isNotNaN(false)
true
> isNotNaN(null)
true
> isNotNaN([1, 2])
false
> isNotNaN({a: 1})
false
> isNotNaN('123px')
false
> isNotNaN('foo')
false
> isNotNaN(undefined)
false
> isNotNaN(NaN)
false

> function returnArgs () {
	return arguments;
}
> isNotNaN(returnArgs())
false
 *
 * @since 0.1.0
 */
const isNotNaN = not(isNaN);

/**
 * Return true if the input is not undefined or null.
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isNotNil(1)
true
> isNotNil(Infinity)
true
> isNotNil('123')
true
> isNotNil('123px')
true
> isNotNil([1, 2])
true
> isNotNil({a: 1})
true
> isNotNil(true)
true
> isNotNil(false)
true
> isNotNil(NaN)
true

> isNotNil(undefined)
false
> isNotNil(null)
false

> function returnArgs () {
	return arguments;
}
> isNotNil(returnArgs())
false
 *
 * @since 0.2.0
 */
const isNotNil = not(isNil);

/**
 * Return true if the input is not null.
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isNotNull(1)
true
> isNotNull(Infinity)
true
> isNotNull('123')
true
> isNotNull('123px')
true
> isNotNull([1, 2])
true
> isNotNull({a: 1})
true
> isNotNull(true)
true
> isNotNull(false)
true
> isNotNull(NaN)
true
> isNotNull(undefined)
true

> isNotNull(null)
false

> function returnArgs () {
	return arguments;
}
> isNotNull(returnArgs())
true
 *
 * @since 0.4.0
 */
const isNotNull = not(isNull);

/**
 * Return true if the input is a function
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isFunction(() => 2)
true
> makeFunc = n => x => x + n;
> isFunction(makeFunc(3))
true
> isFunction(1)
false
> isFunction(NaN)
false
> isFunction(Infinity)
false
> isFunction([1, 2])
false
> isFunction({a: 1})
false
> isFunction('foo')
false
> function returnArgs () {return arguments}
> isFunction(returnArgs())
false
 *
 * @since 0.12.0
 */
const isFunction = isType('Function');

/**
 * Return true if the input is a number
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isNumber(1)
true
> isNumber(NaN)
true
> isNumber(Infinity)
true
> isNumber({a: 1})
false
> isNumber('foo')
false

> function returnArgs () {
	return arguments;
}
> isNumber(returnArgs())
false
 *
 * @since 0.1.0
 */
const isNumber = isType('Number');

/**
 * Return true if the input is an object
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isObject({a: 1})
true
> isObject([])
false
> isObject(1)
false
> isObject(NaN)
false
> isObject(Infinity)
false
> isObject('foo')
false

> function returnArgs () {
	return arguments;
}
> isObject(returnArgs())
false
 *
 * @since 0.1.0
 * @see {@link module:@svizzle/utils/[any-any]-[any-boolean].isObjectWith|isObjectWith}
 */
const isObject = isType('Object');

/**
 * Return true if the input is a promise
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> isPromise(aFuncReturningAPromise())
true
> isPromise({a: 1})
false
 *
 * @since 0.15.0
 */
allOf([
	isNotNil,
	obj => obj.then && isFunction(obj.then)
]);

/**
 * Return true if the input is a valid number (including not being NaN)
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> [
	1,
	1.2,
	Infinity,
].forEach(x => {
	isValidNumber(x)
});
[true, ...]

> [
	[],
	[123],
	[1, 2],
	{a: 1},
	'',
	'123',
	'123px',
	'foo',
	true,
	null,
	undefined,
	NaN,
	returnArgs()
].forEach(x => {
	isValidNumber(x)
});
[false, ...]
 *
 * @since 0.1.0
 * @see {@link module:@svizzle/utils/[any-any]-[any-boolean].isValidNumberWith|isValidNumberWith}
 */
const isValidNumber = allOf([isNumber, isNotNaN]);

/**
 * Return the negated input.
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> negate(true)
false
> negate(false)
true
> negate(1)
false
> negate(0)
true
> negate('a')
false
> negate('')
true
> negate(null)
true
> negate(NaN)
true
> negate(undefined)
true
> negate([])
false
> negate({})
false
 * @since 0.10.0
 */
const negate = x => !x;

/**
 * Return true if the input, converted to Number, is indeed a number
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> [
	[],
	[2],
	'',
	'123',
	null,
	true,
].forEach(x => {
	toNumberisValidNumber(x)
});
[true, ...]

> [
	{a: 1},
	[1, 2],
	'123px',
	'foo',
	undefined,
	returnArgs(),
	returnArgs(1),
	returnArgs(1, 2),
	returnArgs(1, 2, 3)
].forEach(x => {
	toNumberisValidNumber(x)
});
[false, ...]
 * @since 0.1.0
 */
pipe([Number, isValidNumber]);

/**
 * Return true if the input, parsed to float, is a valid number
 *
 * @function
 * @arg {*} any
 * @return {boolean}
 *
 * @example
> [
	[1],
	[1, 2],
	[1, 2, 3],
	'123',
	'123px',
].forEach(x => {
	toFloatIsValidNumber(x)
});
[true, ...]

> [
	[],
	'',
	'foo',
	{a: 1},
	true,
	null,
	undefined,
	returnArgs(),
	returnArgs(1),
	returnArgs(1, 2),
	returnArgs(1, 2, 3)
].forEach(x => {
	toFloatIsValidNumber(x)
});
[false, ...]
 * @since 0.1.0
 */
pipe([parseFloat, isValidNumber]);

/**
* @module @svizzle/utils/array_proto-array
*/

/**
 * Return an array by concatenating the provided arrays
 * @see
 {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat|Array.prototype.concat},
 {@link module:@svizzle/utils/object-array.concatValues|concatValues},
 {@link module:@svizzle/utils/array-[object-array].pickAndConcatValues|pickAndConcatValues},
 {@link module:@svizzle/utils/object-object.mergeWithConcat|mergeWithConcat}
 *
 * @function
 * @arg {...array} array
 * @return {array}
 *
 * @example
> concat([0, 1, 2], [3, 4], [5, 6])
[0, 1, 2, 3, 4, 5, 6]
 *
 * @since 0.1.0
 */
const concat = generic(Array.prototype.concat);

/**
* @module @svizzle/utils/[any-any]-[object-object]
*/

/**
 * Return a function expecting an object and returning an index of all its values using the provided accessor.
 * Use this if you're sure that applying the accessor on the object values returns unique strings.
 * Note that this works by concatenating all values before indexing hence you can also directly index values being arrays (see the second example).
 *
 * @function
 * @arg {function} accessor - Any -> Any
 * @return {function} - Object -> Object
 *
 * @example
> reindexedByX = indexValuesWith(obj => obj.x)

> // single values
> obj1 = {
  unique1: {x: 'unique1', y: 2},
  unique2: {x: 'unique2', y: 4},
  unique3: {x: 'unique3', y: 6},
  unique4: {x: 'unique4', y: 8},
}
> reindexedByX(obj1)
{
  unique1: {x: 'unique1', y: 2},
  unique2: {x: 'unique2', y: 4},
  unique3: {x: 'unique3', y: 6},
  unique4: {x: 'unique4', y: 8},
}

> // values as arrays
> obj2 = {
  a: [{x: 'unique1', y: 2}, {x: 'unique2', y: 4}],
  b: [{x: 'unique3', y: 6}, {x: 'unique4', y: 8}],
}
> reindexedByX(obj2)
{
  unique1: {x: 'unique1', y: 2},
  unique2: {x: 'unique2', y: 4},
  unique3: {x: 'unique3', y: 6},
  unique4: {x: 'unique4', y: 8},
};
 *
 * @since 0.6.0
 * @see {@link module:@svizzle/utils/[any-any]-[object-object].groupValuesWith|groupValuesWith}
 */
const indexValuesWith = accessor => pipe([
	values,
	apply(concat),
	indexBy(accessor)
]);

/**
 * Return a function expecting two objects to merge using the provided merge function
 *
 * @function
 * @arg {function} fn - Merge function
 * @return {function} - Object -> Object
 *
 * @example

> mergeWithSubtract = mergeWith(_.subtract)
> mergeWithSubtract(
    {a: 8, b: 3},
    {a: 5, b: 2, c: 7}
)
{a: 3, b: 1, c: 7},

 *
 * @since 0.1.0
 */
const mergeWith = fn => (a, b) => reduce(
	pairs(b),
	(obj, [bKey, bValue]) => {
		obj[bKey] = has(obj, bKey) ? fn(obj[bKey], bValue) : bValue;

		return obj;
	},
	merge({}, a) // copy of a
);

/**
* @module @svizzle/utils/constructor-[[any-any]:accumcb-[array-any]]
*/

/**
 * Return a function expecting a reducer function and returning a reduce function
 * with an instance of the provided constructor as the initial value
 * and expecting the array to reduce.
 *
 * @function
 * @arg {object} constructor
 * @return {function} - (Any -> Any):accumcb -> (Array -> Any)
 *
 * @example
> reduceFromEmptyObject = reduceTo(Object)
> foo = reduceFromEmptyObject((acc, x) => {
	acc[x.id] = x.name;
	return acc;
})
> foo([{id: '00', name: 'a'}, {id: '11', name: 'b'}])
Object {11: 'b', 00: 'a'}
 *
 * @since 0.3.0
 */
const reduceTo = ctor => fn => reduceWith(fn, new ctor());

/**
* @module @svizzle/utils/[any-any]:accumcb-[array-any]
*/

/**
 * Return a reduce function expecting an array to reduce with the passed reducer
 * with an empty array as the initial value
 *
 * @function
 * @arg {function} function - reducer
 * @return {function} - Array -> Any
 *
 * @example
> reduce = reduceFromEmptyArray((acc, x) => {
  return acc.slice(-2).concat([x.value]);
})
> reduce([
  {a: 1, value: 2},
  {a: 1, value: 3},
  {a: 1, value: 0},
  {a: 1, value: 4},
  {a: 1, value: 7}
])
[0, 4, 7]
 *
 * @since 0.3.0
 */
const reduceFromEmptyArray = reduceTo(Array);

/**
 * Return a reduce function expecting an array to reduce with the passed reducer
 * with an empty object as the initial value
 *
 * @function
 * @arg {function} function - reducer
 * @return {function} - Array -> Any
 *
 * @example
> reduce = reduceFromEmptyObject((acc, x) => {
  acc[x.id] = x.name;
  return acc;
})
> reduce([
  {id: '00', name: 'a'},
  {id: '11', name: 'b'}
])
{11: 'b', 00: 'a'}
 *
 * @since 0.3.0
 */
const reduceFromEmptyObject = reduceTo(Object);

var collectionCompare = compare;

/*
  primitives: value1 === value2
  functions: value1.toString == value2.toString
  arrays: if length, sequence and values of properties are identical
  objects: if length, names and values of properties are identical
  compare([[1, [2, 3]], [[1, [2, 3]]); // true
  compare([[1, [2, 3], 4], [[1, [2, 3]]); // false
  compare({a: 2, b: 3}, {a: 2, b: 3}); // true
  compare({a: 2, b: 3}, {b: 3, a: 2}); // true
  compare({a: 2, b: 3, c: 4}, {a: 2, b: 3}); // false
  compare({a: 2, b: 3}, {a: 2, b: 3, c: 4}); // false
  compare([[1, [2, {a: 4}], 4], [[1, [2, {a: 4}]]); // true
*/

function compare(value1, value2) {
  if (value1 === value2) {
    return true;
  }
  /* eslint-disable no-self-compare */
  // if both values are NaNs return true
  if (value1 !== value1 && value2 !== value2) {
    return true;
  }
  if ({}.toString.call(value1) != {}.toString.call(value2)) {
    return false;
  }
  if (value1 !== Object(value1)) {
    // non equal primitives
    return false;
  }
  if (!value1) {
    return false;
  }
  if (Array.isArray(value1)) {
    return compareArrays(value1, value2);
  }
  if ({}.toString.call(value1) == '[object Set]') {
    return compareArrays(Array.from(value1), Array.from(value2));
  }
  if ({}.toString.call(value1) == '[object Object]') {
    return compareObjects(value1, value2);
  } else {
    return compareNativeSubtypes(value1, value2);
  }
}

function compareNativeSubtypes(value1, value2) {
  // e.g. Function, RegExp, Date
  return value1.toString() === value2.toString();
}

function compareArrays(value1, value2) {
  var len = value1.length;
  if (len != value2.length) {
    return false;
  }
  var alike = true;
  for (var i = 0; i < len; i++) {
    if (!compare(value1[i], value2[i])) {
      alike = false;
      break;
    }
  }
  return alike;
}

function compareObjects(value1, value2) {
  var keys1 = Object.keys(value1).sort();
  var keys2 = Object.keys(value2).sort();
  var len = keys1.length;
  if (len != keys2.length) {
    return false;
  }
  for (var i = 0; i < len; i++) {
    var key1 = keys1[i];
    var key2 = keys2[i];
    if (!(key1 == key2 && compare(value1[key1], value2[key2]))) {
      return false;
    }
  }
  return true;
}

/**
* @module @svizzle/utils/iterable-number
*/

/**
 * Get the length of the iterable
 *
 * @function
 * @arg {iterable} iterable
 * @return {number}
 *
 * @example
> getLength('a')
1
> getLength('two')
3
> getLength([10])
1
> getLength([3, 7])
2
> function func () {
	return getLength(arguments);
}
> func()
0
> func()
0
> func('a', 'b')
2
 *
 * @since 0.1.0
 */
const getLength = getKey('length');

/**
* @module @svizzle/utils/any-[any-boolean]
*/

/**
 * Return a function that returns true if the input is different from the provided value.
 *
 * @function
 * @arg {*} any
 * @return {function} predicate - Any -> Boolean
 *
 * @example
> isNotTwo = isNot(2)
> isNotTwo(3)
true
> isNotTwo(2)
false
 *
 * @since v0.3.0
 */
const isNot = x => not(is(x));

/**
 * Return a function that returns true if the input value is equal to the provided value.
 * This can be used to compare objects and arrays, but if the input value is of native type {@link https://ascartabelli.github.io/lamb/module-lamb.html#is|_.is} or {@link https://ascartabelli.github.io/lamb/module-lamb.html#isSVZ|_.isSVZ} should be used.
 *
 * @function
 * @arg {*} any
 * @return {function} predicate - Any -> Boolean
 *
 * @example
> isEqualToObj = isEqualTo({a: 1, b: [1,2]})
> isEqualToObj({a: 1, b: [1, 2]})
true
> isEqualToObj({a: 1, b: [1, 2, 3})
false
> isEqualToArray = isEqualTo([1, 2, {a: 1}])
> isEqualToArray([1, 2, {a: 1}])
true
> isEqualToArray([1, 2, {a: 1}, 3])
false
 *
 * @since v0.8.0
 * @see https://ascartabelli.github.io/lamb/module-lamb.html#is
 * @see https://ascartabelli.github.io/lamb/module-lamb.html#isSVZ
 */
curry(collectionCompare);

/**
* @module @svizzle/utils/any-[array-object]
*/

/**
 * Return a function expecting an array of keys and returning an object with
 * the provided value as value of those keys.
 *
 * @function
 * @arg {*} value
 * @return {function} function - Array -> Object
 *
 * @example
> makeKeyedEmptyArray = makeKeyed([])
> makeKeyedEmptyArray([1, 2])
{1: [], 2: []}
> makeKeyedEmptyArray(['a', 'b'])
{a: [], b: []}
 *
 * @since 0.3.0
 */
const makeKeyed = value => pipe([
	collect([identity, mapWith(always(value))]),
	apply(make)
]);

/**
* @module @svizzle/utils/any-any
*/

/**
 * Return a number if the input can be converted to float, identity otherwise
 *
 * @function
 * @arg {*} any
 * @return {number|*}
 *
 * @example
> toFloatOrIdentity('2')
2
> toFloatOrIdentity('2px')
2
> toFloatOrIdentity('')
''
> toFloatOrIdentity('h2o')
'h2o'
> toFloatOrIdentity([1.1])
1.1
> toFloatOrIdentity([1.1, 2])
1.1
> toFloatOrIdentity([1.1, 2, 3])
1.1
> toFloatOrIdentity([])
[]
> toFloatOrIdentity({a: 1})
{a: 1}
> toFloatOrIdentity(true)
true
> toFloatOrIdentity(null)
null
> toFloatOrIdentity(undefined)
undefined
 * @since 0.1.0
 */
const toFloatOrIdentity = x => {
	const parsed = parseFloat(x);

	return isValidNumber(parsed) ? parsed : x;
};

/**
* @module @svizzle/utils/array-[object-boolean]
*/

/**
 * Return a predicate expecting an object and returning `true` if the value at the provided `key` is the [same]{@link https://ascartabelli.github.io/lamb/module-lamb.html#areSame} as the provided `value`
 *
 * @function
 * @arg {array} pair - [key, value]
 * @return {function} predicate - Object -> Boolean
 *
 * @example
> isUSA = isKeyValue(['country_id', 'US'])
> isUSA({country_id: 'GB', id: 123})
false
> isUSA({country_id: 'US', id: 456})
true
 *
 * @since 0.3.0
 */
const isKeyValue = ([key, value]) => pipe([getKey(key), is(value)]);

/**
* @module @svizzle/utils/array-object
*/

/**
 * Return an object built using 'key's and 'value's from the objects in the provided array
 *
 * @function
 * @arg {array} objects - array of objects
 * @return {object} object
 *
 * @example
> objects = [
	{key: 'ITA', value: 0},
	{key: 'FRA', value: 0},
	{key: 'BRA', value: 0},
	{key: 'GER', value: 1},
	{key: 'USA', value: 1},
]
> keyValueArrayToObject(objects)
{
	'ITA': 0,
	'FRA': 0,
	'BRA': 0,
	'GER': 1,
	'USA': 1
}
 *
 * @since 0.3.0
 */
const keyValueArrayToObject = objects => reduce(objects,
	(acc, {key, value}) => {
		acc[key] = value;
		return acc;
	},
	{}
);

/**
 * Return an object with the provided array elements as keys and all values equal to their index in the array
 *
 * @function
 * @arg {array} array
 * @return {object}
 *
 * @example
> makeIndexByKey(['a', 'b'])
{a: 0, b: 1}
> makeIndexByKey([2, -4])
{'2': 0, '-4': 1}
> makeIndexByKey([[1,2,3], [3,4,5], [1,2,3]])
{'3,4,5': 1, '1,2,3': 2}
> makeIndexByKey([[1,2,{a:1}], [3,4,5], [1,2,3]])
{'1,2,[object Object]': 0, '3,4,5': 1, '1,2,3': 2}
> makeIndexByKey([{a: 1}, {b: 2}, {c: 3}])
{'[object Object]': 2}
 *
 * @since 0.12.0
 */
pipe([zipWithIndex, fromPairs]);

/**
 * Return an object with the provided array elements as keys and all values equal to `true`
 *
 * @function
 * @arg {array} array
 * @return {object}
 *
 * @example
> makeKeyedFalse(['a', 'b'])
{a: false, b: false}
 *
 * @since 0.9.0
 */
makeKeyed(false);

/**
 * Return an object with the provided array elements as keys and all values equal to `false`
 *
 * @function
 * @arg {array} array
 * @return {object} - keyed trues
 *
 * @example
> makeKeyedTrue(['a', 'b'])
{a: true, b: true}
 *
 * @since 0.9.0
 */
makeKeyed(true);

/**
 * Return an object with the provided array elements as keys and all values equal to zero
 *
 * @function
 * @arg {array} array
 * @return {object} - keyed zeroes
 *
 * @example
> makeKeyedZeroes([1, 2])
{1: 0, 2: 0}
> makeKeyedZeroes(['a', 'b'])
{a: 0, b: 0}
 *
 * @since 0.1.0
 */
makeKeyed(0);

/**
 * Return an object of occurrences of all the keys contained in the objects in the provided array
 *
 * @function
 * @arg {array} objects - array of objects
 * @return {object} occurrences - occurrences of keys
 *
 * @example
> objects = [{a: 1}, {a: 6, b: -1}, {a: 2, b: 0, c: 1}, {c: 4, e: 2}]
> makeAllOccurrences(objects)
{a: 3, b: 2, c: 2, e: 1}
 *
 * @since 0.1.0
 */
reduceFromEmptyObject((acc, item) => {
	forEach(keys(item), key => {
		if (has(acc, key)) {
			acc[key] += 1;
		} else {
			acc[key] = 1;
		}
	});

	return acc;
});

/**
 * Merge all the objects in the provided array.
 * The result depends on the order of the objects in the array.
 *
 * @function
 * @arg {array} objects - array of objects
 * @return {object} - merged objects
 *
 * @example
> mergeObjects([{a: 1}, {a: 6, b: -1}, {b: 1}])
{a: 6, b: 1}
> mergeObjects([{b: 1}, {a: 6, b: -1}, {a: 1}])
{a: 1, b: -1}
 *
 * @since 0.5.0
 */
const mergeObjects = reduceFromEmptyObject((acc, item) => {
	forEach(pairs(item), ([key, value]) => {
		acc[key] = value;
	});

	return acc;
});
// IDEA merging from right just new keys might be faster

/**
* @module @svizzle/utils/array-string
*/

/**
 * Return a string joining the provided array items with a blank
 * @see {@link https://ascartabelli.github.io/lamb/module-lamb.html#joinWith|joinWith}
 *
 * @function
 * @arg {array} array
 * @return {string}
 *
 * @example
> joinWithBlank(['a', 'b', 'c'])
'a b c'
 *
 * @since 0.13.0
 */
const joinWithBlank = joinWith(' ');

/**
 * Return a string joining the provided array items with a colon
 * @see {@link https://ascartabelli.github.io/lamb/module-lamb.html#joinWith|joinWith}
 *
 * @function
 * @arg {array} array
 * @return {string}
 *
 * @example
> joinWithColon(['a', 'b', 'c'])
'a:b:c'
 *
 * @since 0.1.0
 */
const joinWithColon = joinWith(':');

/**
 * Return a string joining the provided array items with a semicolon
 * @see {@link https://ascartabelli.github.io/lamb/module-lamb.html#joinWith|joinWith}
 *
 * @function
 * @arg {array} array
 * @return {string}
 *
 * @example
> joinWithSemicolon(['a', 'b', 'c'])
'a;b;c'
 *
 * @since 0.1.0
 */
const joinWithSemicolon = joinWith(';');

/**
* @module @svizzle/utils/number-boolean
*/

/**
 * Return `true` if the input number is 0.
 *
 * @function
 * @arg {number} number
 * @return {boolean}
 *
 * @example
> is0(0)
true
> is0(2)
false
 *
 * @since 0.1.0
 */
const is0 = is(0);

/**
 * Return `true` if the input number is 1.
 *
 * @function
 * @arg {number} number
 * @return {boolean}
 *
 * @example
> is1(1)
true
> is1(2)
false
 *
 * @since 0.1.0
 */
const is1 = is(1);

/**
 * Return `true` if the input number is greater than 0.
 *
 * @function
 * @arg {number} number
 * @return {boolean}
 *
 * @example
> isGT0(-1)
false
> isGT0(2)
true
 *
 * @since 0.1.0
 */
const isGT0 = isGT(0);

/**
 * Return `true` if the input number is greater than 1.
 *
 * @function
 * @arg {number} number
 * @return {boolean}
 *
 * @example
> isGT1(0)
false
> isGT1(2)
true
 *
 * @since 0.1.0
 */
const isGT1 = isGT(1);

/**
* @module @svizzle/utils/iterable-boolean
*/

/**
 * Use to check if an iterable is empty
 *
 * @function
 * @arg {iterable} iterable
 * @return {boolean}
 *
 * @example
> isIterableEmpty('string')
false
> isIterableEmpty('')
true
> isIterableEmpty([1, 2])
false
> isIterableEmpty([])
true
> isIterableEmpty([])
true
> function func () {
	return isIterableEmpty(arguments);
}
> func()
true
> func(1, 2)
false
 *
 * @since 0.1.0
 */
const isIterableEmpty = pipe([getLength, is0]);

/**
 * Use to check if an iterable is not empty
 *
 * @function
 * @arg {iterable} iterable
 * @return {boolean}
 *
 * @example
> isIterableNotEmpty('string')
true
> isIterableNotEmpty('')
false
> isIterableNotEmpty([1, 2])
true
> isIterableNotEmpty([])
false
> function func () {
	return isIterableNotEmpty(arguments);
}
> func()
false
> func(1, 2)
true
 *
 * @since 0.1.0
 */
const isIterableNotEmpty = pipe([getLength, isGT0]);

/**
 * Use to check if an iterable has a single element
 *
 * @function
 * @arg {iterable} iterable
 * @return {boolean}
 *
 * @example
> hasIterableLength1('1')
true
> hasIterableLength1('two')
false
> hasIterableLength1([1])
true
> hasIterableLength1([1, 2])
false
> function func () {
	return hasIterableLength1(arguments);
}
> func()
false
> func(1)
true
> func(1, 2)
false
 *
 * @since 0.1.0
 */
pipe([getLength, is1]);

/**
 * Use to check if an iterable has more than an element
 *
 * @function
 * @arg {iterable} iterable
 * @return {boolean}
 *
 * @example
> isIterableLongerThan1('1')
false
> isIterableLongerThan1('two')
true
> isIterableLongerThan1([1])
false
> isIterableLongerThan1([1, 2])
true
> function func () {
	return isIterableLongerThan1(arguments);
}
> func()
false
> func(1)
false
> func(1, 2)
true
 *
 * @since 0.1.0
 */
pipe([getLength, isGT1]);

/**
* @module @svizzle/utils/iterable-object
*/

/**
 * Return the {key, value} object from a pair
 *
 * @function
 * @arg {iterable} iterable
 * @return {object}
 *
 * @example
> function func () {
	return pairToKeyValueObject(arguments);
}
> func()
{key: undefined, value: undefined}
> func(1)
{key: 1, value: undefined}
> func(1, 2)
{key: 1, value: 2}
> func(1, 2, 3)
{key: 1, value: 2}
> pairToKeyValueObject([])
{key: 'undefined', value: 'undefined'}
> pairToKeyValueObject([1])
{key: 1, value: undefined}
> pairToKeyValueObject([1, 2])
{key: 1, value: 2}
> pairToKeyValueObject([1, 2, 3])
{key: 1, value: 2}
> pairToKeyValueObject('')
{key: 'undefined', value: 'undefined'}
> pairToKeyValueObject('a')
{key: 'a', value: 'undefined'}
> pairToKeyValueObject('ab')
{key: 'a', value: 'b'}
> pairToKeyValueObject('abc')
{key: 'a', value: 'b'}
 *
 * @since 0.1.0
 */
const pairToKeyValueObject = ([key, value]) => ({key, value});

/**
* @module @svizzle/utils/object-[any-object]
*/

/**
 * Return a function expecting any kind of input to be used as the argument
 * of the provided functions
 *
 * @function
 * @arg {object} fnMap - a map of keys and functions Any -> Any
 * @return {function} - Any -> Object
 *
 * @example
> array = [
	{fname: 'John', lname: 'Woo', lng: 1, lat: 2},
	{fname: 'John', lname: 'Foo', lng: 7, lat: 8}
];
> format = applyFnMap({
	coords: _.collect([_.getKey('lng'), _.getKey('lat')]),
	fullname: _.pipe([
		_.collect([_.getKey('fname'), _.getKey('lname')]),
		_.joinWith(' ')
	]),
});
> formatted = _.map(raw, format)
[
	{coords: [1, 2], fullname: 'John Woo'},
	{coords: [7, 8], fullname: 'John Foo'}
]

> checkNumber = applyFnMap({
	range: _.collect([_.add(1), _.deduct(1)]),
	sign: Math.sign,
})
> checkNumber(1)
{range: [2, 0], sign: 1}
> checkNumber(-10)
{range: [-9, -11], sign: -1}

> checkString = applyFnMap({
	parts: _.splitBy('/'),
	hasNumbersOnly: _.testWith(/^\d+$/gu),
})
> checkString('aa/bb')
{parts: ['aa', 'bb'], hasNumbersOnly: false}
> checkString('123')
{parts: ['123'], hasNumbersOnly: true}
> checkString('123/g')
{parts: ['123', 'g'], hasNumbersOnly: false}

*
 * @since 0.1.0
 * @see {@link module:@svizzle/utils/array-[object-object].applyTransformsSequence|applyTransformsSequence}
 * @see {@link module:@svizzle/utils/object-[object-object].makeMergeAppliedFnMap|makeMergeAppliedFnMap}
 * @see {@link module:@svizzle/utils/object-[object-object].transformPaths|transformPaths}
 * @see {@link module:@svizzle/utils/object-[object-object].transformValues|transformValues}
 */
const applyFnMap = fnMap => any => mapValues(fnMap, applyTo([any]));

/**
* @module @svizzle/utils/object-[object-object]
*/

/**
 * Return a function that applies the provided map to the expected object and merges the result to the object.
 * This is useful to add new properties to an object, eventually modifying existing ones by using keys expected to be in the input objects.
 *
 * @function
 * @arg {object} fnMap - a map key/function Any -> Any (applied to the object)
 * @return {function} - Object -> Object
 *
 * @example
> enhancer = makeMergeAppliedFnMap({
	coords: _.collect([_.getKey('lng'), _.getKey('lat')]),
	fullname: _.pipe([
		_.collect([_.getKey('fname'), _.getKey('lname')]),
		_.joinWith(' ')
	]),
	lat: obj => roundTo2(obj.lat),
	lng: obj => roundTo2(obj.lng),
})
> enhancer({
	fname: 'John',
	lat: 2.345434,
	lname: 'Woo',
	lng: 10.3425,
})
{
	coords: [10.3425, 2.345434],
	fname: 'John',
	fullname: 'John Woo',
	lat: 2.35,
	lname: 'Woo',
	lng: 10.34,
}
 *
 * @since 0.9.0
 * @see {@link module:@svizzle/utils/object-[any-object].applyFnMap|applyFnMap}
 * @see {@link module:@svizzle/utils/array-[object-object].applyTransformsSequence|applyTransformsSequence}
 * @see {@link module:@svizzle/utils/object-[object-object].transformPaths|transformPaths}
 * @see {@link module:@svizzle/utils/object-[object-object].transformValues|transformValues}
 */
const makeMergeAppliedFnMap = fnMap => {
	const makeProps = applyFnMap(fnMap);

	return obj => merge(obj, makeProps(obj));
};

/**
 * Return a function that expects an object and applies the functions in the values of the input object to the values of the provided object found in the paths in the correspondent keys.
 * Note that since the provided transforms is an object, paths can be processed only once.
 * However, providing a transform that makes another transform meaningless can generate errors because internally the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in#Description|for..in statement} is used to list transforms: because the order of iteration is implementation-dependent, the order of the execution could be unpredictable on old browsers.
 * To apply a specific sequence of transforms, including those modifying the same path multiple times, please see {@link module:@svizzle/utils/array-[object-object].applyTransformsSequence|applyTransformsSequence}.
 *
 * @function
 * @arg {object} pathToFn - object with paths as keys and functions as values
 * @return {function} - Object -> Object
 *
 * @example
> transform = transformPaths({
   'a.a2.a22': _.pipe([Number, Math.sqrt]),
   'a.a3': parseInt,
   'b.b2': parseInt,
 })
> transform({
	a: {
		a1: 'a1',
		a2: {
			a21: 'a21',
			a22: '9',
		},
		a3: '3px',
		a4: '2',
	},
	b: {
		b1: 'b1',
		b2: '4px'
	},
})
{
	a: {
		a1: 'a1',
		a2: {
			a21: 'a21',
			a22: 3,
		},
		a3: 3,
		a4: '2',
	},
	b: {
		b1: 'b1',
		b2: 4
	},
}
> dangerousTransform = transformPaths({
	'a': _.values,     // assuming we have an object in `a`...
	'a.0': x => 2 * x  // ...if this runs first, it could return `2 * undefined = NaN`
 });
 *
 * @since 0.6.0
 * @see {@link module:@svizzle/utils/array-[object-object].applyTransformsSequence|applyTransformsSequence}
 * @see {@link module:@svizzle/utils/object-[any-object].applyFnMap|applyFnMap}
 * @see {@link module:@svizzle/utils/object-[object-object].makeMergeAppliedFnMap|makeMergeAppliedFnMap}
 * @see {@link module:@svizzle/utils/object-[object-object].transformValues|transformValues}
 */
const transformPaths = pathToFn => obj =>
	reduce(pairs(pathToFn), (acc, [path, fn]) => {
		const value = getPathIn(acc, path);

		return setPathIn(acc, path, application(fn, [value]));
	}, merge({}, obj));

/**
 * Return a function that expects an object and applies the functions in the values of the input object to the correspondent values of the provided object.
 * Can be useful with [d3.csvParse]{@link https://github.com/d3/d3-dsv#csvParse}, see the example below.
 * Since 0.6.0 it assumes identity for missing keys.
 *
 * @function
 * @arg {object} fnMap - object with functions as values
 * @return {function} - Object -> Object
 *
 * @example
> conversionFn = transformValues({
	name: _.identity,
	a: _.pipe([Number, Math.sqrt]),
	b: Number,
	width: parseFloat
})
> conversionFn({name: 'foo', a: '9', b: '2', width: '10px'})
{name: 'foo', a: 3, b: 2, width: 10}

$ cat baseurl/file.csv
name,a,b,width
foo,9,2,10px
bar,4,4,25px

> d3.csvParse('baseurl/file.csv', conversionFn)
[{name: 'foo', a: 3, b: 2, width: 10}, {name: 'bar', a: 2, b: 4, width: 25}]

> conversionFn = transformValues({
	a: _.pipe([Number, Math.sqrt]),
})
> conversionFn({name: 'foo', a: '9', b: '2', width: '10px'})
{name: 'foo', a: 3, b: '2', width: '10px'}
 *
 * @since 0.1.0
 * @see {@link module:@svizzle/utils/array-[object-object].applyTransformsSequence|applyTransformsSequence}
 * @see {@link module:@svizzle/utils/object-[any-object].applyFnMap|applyFnMap}
 * @see {@link module:@svizzle/utils/object-[object-object].makeMergeAppliedFnMap|makeMergeAppliedFnMap}
 * @see {@link module:@svizzle/utils/object-[object-object].transformPaths|transformPaths}
 */
const transformValues = fnMap => mapValuesWith(
	(value, key) => key in fnMap
		? application(fnMap[key], [value])
		: value
);

/**
 * Return a function that expects an object and applies the provided updater
 * function to the values correspondent to the provided keys, leaving the other
 * properties unchanged.
 *
 * @function
 * @arg {object} - {keys: Array, updater: Any -> Any}
 * @return {function} - Object -> Object
 *
 * @example
> update = updateKeys({
	keys: ['a', 'k', 'm'],
	updater: x => x * 2
});
> update({a: 1, b: 2, d: 4, k: 7, m: 2})
{a: 2, b: 2, d: 4, k: 14, m: 4}
> update({a: 1, b: 2, d: 4})
{a: 2, b: 2, d: 4}
> update({b: 2, d: 4})
{b: 2, d: 4}
 *
 * @since 0.16.0
 */
const updateKeys = ({keys, updater}) => obj =>
	reduce(keys, (acc, key) => {
		if (key in acc) {
			acc[key] = updater(acc[key]);
		}

		return acc;
	}, {...obj});

/**
 * Return a function expecting an object to merge with the input object
 *
 * @function
 * @arg {object} object - Object to be merged to the provided object
 * @return {function} - Object -> Object
 *
 * @example
> mergeB = mergeObj({b: 2})
> mergeB({a: 1})
{a: 1, b: 2}
> mergeB({a: 1, b: 1})
{a: 1, b: 2}
 *
 * @since 0.1.0
 */
const mergeObj = obj => partial(merge, [__, obj]);

/**
* @module @svizzle/utils/object-object
*/

/**
 * Return the object with values converted to numbers where possible
 *
 * @function
 * @arg {object} object
 * @return {object}
 *
 * @example
> mapValuesToFloatPossibly({a: '1.2', b: '2px', c: 'h2o'})
{a: 1.2, b: 2, c: 'h2o'}
 *
 * @since 0.1.0
 */
mapValuesWith(toFloatOrIdentity);

/**
 * Return the merge of the two provided objects merging values of correspondent keys
 *
 * @function
 * @arg {object} baseObject - The base object
 * @arg {object} objectToMerge - The object to merge on the base object
 * @return {object} - The merged object
 *
 * @example

> obj1 = {A: {a: 1}, B: {b: 1}}
> obj2 = {A: {b: 10}, B: {a: 10}}
> mergeWithMerge(obj1, obj2)
{A: {a: 1, b: 10}, B: {a: 10, b: 1}}
 *
 * @since 0.1.0
 */
const mergeWithMerge = mergeWith(merge);

/**
 * Return a copy of the object without falsy values
 *
 * @function
 * @arg {object} object - The input object
 * @return {object} object - The object with truthy values
 *
 * @example
> pickIfTruthy({a: true, b: true, c: false})
{a: true, b: true}
> pickIfTruthy({a: 1, b: 0, c: false})
{a: 1}
> pickIfTruthy({a: [1, 2], b: {a: 1}, c: false})
{a: [1, 2], b: {a: 1}}
 *
 * @since 0.2.0
 */
const pickIfTruthy = pickIf(identity);

/**
 * Return an object with swapped keys and values.
 * Note that if there are duplicate values, since the keys of the resulting object have to be unique, the last occurrence of each value would be used but depending on the interpreter implementation the output keys might vary.
 *
 * @function
 * @arg {object}
 * @return {object}
 *
 * @example
// unique values
> swapKeyValue({a: 1, b: 2, c: 'd'})
{1: 'a', 2: 'b', d: 'c'}

// duplicate values
> swapKeyValue({a: 1, b: 2, c: 'd', e: 1})
{2: 'b', d: 'c', 1: 'e'}
 *
 * @since 0.6.0
 * @see {@link module:@svizzle/utils/[any-any]-[object-object].indexValuesWith|indexValuesWith}
 */
pipe([
	pairs,
	mapWith(reverse),
	fromPairs
]);

/**
* @module @svizzle/utils/object-array
*/

/**
 * Concatenate the values of the provided object.
 *
 * @function
 * @arg {object} object
 * @return {array}
 *
 * @example
> concatValues({a: [1, 2, 3], b: [4, 5, 6]})
[1, 2, 3, 4, 5, 6]
 *
 * @since 0.4.0
 */
pipe([values, apply(concat)]);

/**
 * Return an array of the permutations of the provided object values items, by key.
 * Note that this function assumes the provided object values are arrays.
 *
 * @function
 * @arg {object} object - {string: any[]}
 * @return {array} - object[]
 *
 * @example
> makeKeyedValuesPermutations({a: [0, 1], b: [2, 3], c: [4, 5]})
[
	{a: 0, b: 2, c: 4}, {a: 1, b: 2, c: 4},
	{a: 0, b: 3, c: 4}, {a: 1, b: 3, c: 4},
	{a: 0, b: 2, c: 5}, {a: 1, b: 2, c: 5},
	{a: 0, b: 3, c: 5}, {a: 1, b: 3, c: 5}
]
 *
 * @since 0.6.0
 */
pipe([
	pairs,
	filterWith(pipe([
		last,
		allOf([isArray, isIterableNotEmpty])
	])),
	reduceFromEmptyArray((acc, [key, values]) => {
		const props = values.map(value => ({[key]: value}));

		return acc.length === 0
			? props
			: flatMap(
				props,
				prop => acc.map(obj => merge(obj, prop))
			);
	})
]);

/**
 * Return an array of {key, value} objects from an object
 *
 * @function
 * @arg {object} object
 * @return {array}
 *
 * @example
> obj = {k1: 'v1', k2: 'v2'}
> objectToKeyValueArray(obj)
[{key: 'k1', value: 'v1'}, {key: 'k2', value: 'v2'}]
 *
 * @since 0.1.0
 */
const objectToKeyValueArray = pipe([
	pairs,
	mapWith(pairToKeyValueObject)
]);

/**
 * Return the keys of the provided object with a truthy value
 *
 * @function
 * @arg {object} object - The input object
 * @return {array} - The keys correspondent to truthy values
 *
 * @example
> getTruthyValuesKeys({a: true, b: true, c: false})
['a', 'b']
> getTruthyValuesKeys({a: 1, b: 0, c: false})
['a']
> getTruthyValuesKeys({a: [1, 2], b: {a: 1}, c: false})
['a', 'b']
 *
 * @since 0.1.0
 */
const getTruthyValuesKeys = pipe([pickIfTruthy, keys]);

/**
* @module @svizzle/utils/string-[string-string]
*/

/**
 * Return a function that appends the provided string to the input string
 *
 * @function
 * @arg {string} postfix - The string to be appended
 * @return {function} - String -> String
 *
 * @example
> postfixed = makePostfixed('---')
> postfixed('A')
'A---'
> postfixed('B')
'B---'
 *
 * @since 0.12.0
 * @see {@link module:@svizzle/utils/string-[string-string].makePrefixed|makePrefixed}
 */
const makePostfixed = postfix => string => string + postfix;

/**
 * Return a function that prepends the provided string to the input string
 *
 * @function
 * @arg {string} prefix - The string to be prepended
 * @return {function} - String -> String
 *
 * @example
> prefixed = makePrefixed('---')
> prefixed('A')
'---A'
> prefixed('B')
'---B'
 *
 * @since 0.1.0
 * @see {@link module:@svizzle/utils/string-[string-string].makePostfixed|makePostfixed}
 */
const makePrefixed = prefix => string => prefix + string;

/* ../../components/ui/src/icons/feather/ArrowLeftCircle.svelte generated by Svelte v3.44.2 */

const file$g = "../../components/ui/src/icons/feather/ArrowLeftCircle.svelte";

function create_fragment$l(ctx) {
	let circle;
	let polyline;
	let line;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			polyline = svg_element("polyline");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$g, 1, 0, 34);
			attr_dev(polyline, "points", "12 8 8 12 12 16");
			add_location(polyline, file$g, 1, 40, 74);
			attr_dev(line, "x1", "16");
			attr_dev(line, "y1", "12");
			attr_dev(line, "x2", "8");
			attr_dev(line, "y2", "12");
			add_location(line, file$g, 1, 86, 120);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$l.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$l($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ArrowLeftCircle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ArrowLeftCircle> was created with unknown prop '${key}'`);
	});

	return [];
}

class ArrowLeftCircle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$2(this, options, instance$l, create_fragment$l, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ArrowLeftCircle",
			options,
			id: create_fragment$l.name
		});
	}
}

var ArrowLeftCircle$1 = ArrowLeftCircle;

/* ../../components/ui/src/icons/feather/ArrowRightCircle.svelte generated by Svelte v3.44.2 */

const file$f = "../../components/ui/src/icons/feather/ArrowRightCircle.svelte";

function create_fragment$k(ctx) {
	let circle;
	let polyline;
	let line;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			polyline = svg_element("polyline");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$f, 1, 0, 34);
			attr_dev(polyline, "points", "12 16 16 12 12 8");
			add_location(polyline, file$f, 1, 40, 74);
			attr_dev(line, "x1", "8");
			attr_dev(line, "y1", "12");
			attr_dev(line, "x2", "16");
			attr_dev(line, "y2", "12");
			add_location(line, file$f, 1, 87, 121);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, polyline, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(polyline);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$k.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$k($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ArrowRightCircle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ArrowRightCircle> was created with unknown prop '${key}'`);
	});

	return [];
}

class ArrowRightCircle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$2(this, options, instance$k, create_fragment$k, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ArrowRightCircle",
			options,
			id: create_fragment$k.name
		});
	}
}

var ArrowRightCircle$1 = ArrowRightCircle;

/* ../../components/ui/src/icons/feather/ChevronLeft.svelte generated by Svelte v3.44.2 */

const file$e = "../../components/ui/src/icons/feather/ChevronLeft.svelte";

function create_fragment$j(ctx) {
	let polyline;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "15 18 9 12 15 6");
			add_location(polyline, file$e, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$j.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$j($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ChevronLeft', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChevronLeft> was created with unknown prop '${key}'`);
	});

	return [];
}

class ChevronLeft extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$2(this, options, instance$j, create_fragment$j, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ChevronLeft",
			options,
			id: create_fragment$j.name
		});
	}
}

var ChevronLeft$1 = ChevronLeft;

/* ../../components/ui/src/icons/feather/ChevronRight.svelte generated by Svelte v3.44.2 */

const file$d = "../../components/ui/src/icons/feather/ChevronRight.svelte";

function create_fragment$i(ctx) {
	let polyline;

	const block = {
		c: function create() {
			polyline = svg_element("polyline");
			this.h();
		},
		l: function claim(nodes) {
			polyline = claim_svg_element(nodes, "polyline", { points: true });
			children(polyline).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(polyline, "points", "9 18 15 12 9 6");
			add_location(polyline, file$d, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, polyline, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(polyline);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$i.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$i($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ChevronRight', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChevronRight> was created with unknown prop '${key}'`);
	});

	return [];
}

class ChevronRight extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$2(this, options, instance$i, create_fragment$i, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ChevronRight",
			options,
			id: create_fragment$i.name
		});
	}
}

var ChevronRight$1 = ChevronRight;

/* ../../components/ui/src/icons/feather/MinusCircle.svelte generated by Svelte v3.44.2 */

const file$c = "../../components/ui/src/icons/feather/MinusCircle.svelte";

function create_fragment$h(ctx) {
	let circle;
	let line;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			line = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			line = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$c, 1, 0, 34);
			attr_dev(line, "x1", "8");
			attr_dev(line, "y1", "12");
			attr_dev(line, "x2", "16");
			attr_dev(line, "y2", "12");
			add_location(line, file$c, 1, 40, 74);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, line, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(line);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$h.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$h($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('MinusCircle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MinusCircle> was created with unknown prop '${key}'`);
	});

	return [];
}

class MinusCircle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$2(this, options, instance$h, create_fragment$h, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "MinusCircle",
			options,
			id: create_fragment$h.name
		});
	}
}

var MinusCircle$1 = MinusCircle;

/* ../../components/ui/src/icons/feather/PlusCircle.svelte generated by Svelte v3.44.2 */

const file$b = "../../components/ui/src/icons/feather/PlusCircle.svelte";

function create_fragment$g(ctx) {
	let circle;
	let line0;
	let line1;

	const block = {
		c: function create() {
			circle = svg_element("circle");
			line0 = svg_element("line");
			line1 = svg_element("line");
			this.h();
		},
		l: function claim(nodes) {
			circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle).forEach(detach_dev);
			line0 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line0).forEach(detach_dev);
			line1 = claim_svg_element(nodes, "line", { x1: true, y1: true, x2: true, y2: true });
			children(line1).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle, "cx", "12");
			attr_dev(circle, "cy", "12");
			attr_dev(circle, "r", "10");
			add_location(circle, file$b, 1, 0, 34);
			attr_dev(line0, "x1", "12");
			attr_dev(line0, "y1", "8");
			attr_dev(line0, "x2", "12");
			attr_dev(line0, "y2", "16");
			add_location(line0, file$b, 1, 40, 74);
			attr_dev(line1, "x1", "8");
			attr_dev(line1, "y1", "12");
			attr_dev(line1, "x2", "16");
			attr_dev(line1, "y2", "12");
			add_location(line1, file$b, 1, 84, 118);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle, anchor);
			insert_hydration_dev(target, line0, anchor);
			insert_hydration_dev(target, line1, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle);
			if (detaching) detach_dev(line0);
			if (detaching) detach_dev(line1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$g.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$g($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('PlusCircle', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PlusCircle> was created with unknown prop '${key}'`);
	});

	return [];
}

class PlusCircle extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$2(this, options, instance$g, create_fragment$g, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "PlusCircle",
			options,
			id: create_fragment$g.name
		});
	}
}

var PlusCircle$1 = PlusCircle;

/* ../../components/ui/src/icons/svizzle/ColorClear.svelte generated by Svelte v3.44.2 */

const file$a = "../../components/ui/src/icons/svizzle/ColorClear.svelte";

function create_fragment$f(ctx) {
	let path;
	let t;
	let rect;

	const block = {
		c: function create() {
			path = svg_element("path");
			t = space();
			rect = svg_element("rect");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			t = claim_space(nodes);

			rect = claim_svg_element(nodes, "rect", {
				height: true,
				transform: true,
				width: true,
				x: true,
				y: true
			});

			children(rect).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2C17.5,2 22,6 22,11A6,6 0 0,1 16,17H14.2C13.9,17 13.7,17.2 13.7,17.5C13.7,17.6 13.8,17.7 13.8,17.8C14.2,18.3 14.4,18.9 14.4,19.5C14.5,20.9 13.4,22 12,22M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C12.3,20 12.5,19.8 12.5,19.5C12.5,19.3 12.4,19.2 12.4,19.1C12,18.6 11.8,18.1 11.8,17.5C11.8,16.1 12.9,15 14.3,15H16A4,4 0 0,0 20,11C20,7.1 16.4,4 12,4M6.5,10C7.3,10 8,10.7 8,11.5C8,12.3 7.3,13 6.5,13C5.7,13 5,12.3 5,11.5C5,10.7 5.7,10 6.5,10M9.5,6C10.3,6 11,6.7 11,7.5C11,8.3 10.3,9 9.5,9C8.7,9 8,8.3 8,7.5C8,6.7 8.7,6 9.5,6M14.5,6C15.3,6 16,6.7 16,7.5C16,8.3 15.3,9 14.5,9C13.7,9 13,8.3 13,7.5C13,6.7 13.7,6 14.5,6M17.5,10C18.3,10 19,10.7 19,11.5C19,12.3 18.3,13 17.5,13C16.7,13 16,12.3 16,11.5C16,10.7 16.7,10 17.5,10Z");
			add_location(path, file$a, 3, 0, 97);
			attr_dev(rect, "height", "1.5");
			attr_dev(rect, "transform", "matrix(0.69653614,0.71752171,-0.72279821,0.69105915,0,0)");
			attr_dev(rect, "width", "26");
			attr_dev(rect, "x", "3.5");
			attr_dev(rect, "y", "0");
			add_location(rect, file$a, 6, 0, 881);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
			insert_hydration_dev(target, t, anchor);
			insert_hydration_dev(target, rect, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
			if (detaching) detach_dev(t);
			if (detaching) detach_dev(rect);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$f.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$f($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ColorClear', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ColorClear> was created with unknown prop '${key}'`);
	});

	return [];
}

class ColorClear extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$2(this, options, instance$f, create_fragment$f, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ColorClear",
			options,
			id: create_fragment$f.name
		});
	}
}

var ColorClear$1 = ColorClear;

/* ../../components/ui/src/icons/svizzle/FormatClear.svelte generated by Svelte v3.44.2 */

const file$9 = "../../components/ui/src/icons/svizzle/FormatClear.svelte";

function create_fragment$e(ctx) {
	let path;

	const block = {
		c: function create() {
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path, "d", "M6,5V5.18L8.82,8H11.22L10.5,9.68L12.6,11.78L14.21,8H20V5H6M3.27,5L2,6.27L8.97,13.24L6.5,19H9.5L11.07,15.34L16.73,21L18,19.73L3.55,5.27L3.27,5Z");
			add_location(path, file$9, 1, 0, 34);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(path);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$e.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$e($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('FormatClear', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FormatClear> was created with unknown prop '${key}'`);
	});

	return [];
}

class FormatClear extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$2(this, options, instance$e, create_fragment$e, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "FormatClear",
			options,
			id: create_fragment$e.name
		});
	}
}

var FormatClear$1 = FormatClear;

/* ../../components/ui/src/icons/Icon.svelte generated by Svelte v3.44.2 */

const file$8 = "../../components/ui/src/icons/Icon.svelte";

function create_fragment$d(ctx) {
	let div;
	let svg;
	let switch_instance;
	let current;
	var switch_value = /*glyph*/ ctx[1];

	function switch_props(ctx) {
		return { $$inline: true };
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	const block = {
		c: function create() {
			div = element("div");
			svg = svg_element("svg");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);

			svg = claim_svg_element(div_nodes, "svg", {
				fill: true,
				stroke: true,
				svgxmlns: true,
				viewBox: true,
				height: true,
				"stroke-linecap": true,
				"stroke-linejoin": true,
				"stroke-width": true,
				width: true,
				class: true
			});

			var svg_nodes = children(svg);
			if (switch_instance) claim_component(switch_instance.$$.fragment, svg_nodes);
			svg_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(svg, "fill", /*fill*/ ctx[0]);
			attr_dev(svg, "stroke", /*stroke*/ ctx[3]);
			attr_dev(svg, "svgxmlns", svgXmlns);
			attr_dev(svg, "viewBox", /*viewBox*/ ctx[5]);
			attr_dev(svg, "height", /*size*/ ctx[2]);
			attr_dev(svg, "stroke-linecap", strokeLinecap);
			attr_dev(svg, "stroke-linejoin", strokeLinejoin);
			attr_dev(svg, "stroke-width", /*strokeWidth*/ ctx[4]);
			attr_dev(svg, "width", /*size*/ ctx[2]);
			attr_dev(svg, "class", "svelte-1ase79a");
			add_location(svg, file$8, 28, 1, 834);
			attr_dev(div, "class", "svelte-1ase79a");
			add_location(div, file$8, 27, 0, 827);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			append_hydration_dev(div, svg);

			if (switch_instance) {
				mount_component(switch_instance, svg, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (switch_value !== (switch_value = /*glyph*/ ctx[1])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, svg, null);
				} else {
					switch_instance = null;
				}
			}

			if (!current || dirty & /*fill*/ 1) {
				attr_dev(svg, "fill", /*fill*/ ctx[0]);
			}

			if (!current || dirty & /*stroke*/ 8) {
				attr_dev(svg, "stroke", /*stroke*/ ctx[3]);
			}

			if (!current || dirty & /*viewBox*/ 32) {
				attr_dev(svg, "viewBox", /*viewBox*/ ctx[5]);
			}

			if (!current || dirty & /*size*/ 4) {
				attr_dev(svg, "height", /*size*/ ctx[2]);
			}

			if (!current || dirty & /*strokeWidth*/ 16) {
				attr_dev(svg, "stroke-width", /*strokeWidth*/ ctx[4]);
			}

			if (!current || dirty & /*size*/ 4) {
				attr_dev(svg, "width", /*size*/ ctx[2]);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (switch_instance) destroy_component(switch_instance);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$d.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const defaultGlyph = null;
const strokeLinecap = 'round';
const strokeLinejoin = 'round';
const svgXmlns = 'http://www.w3.org/2000/svg';

function instance$d($$self, $$props, $$invalidate) {
	let viewBox;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Icon', slots, []);
	const defaultFill = 'none';
	const defaultSize = 24;
	const defaultStroke = 'currentColor';
	const defaultStrokeWidth = 2;
	let { fill = defaultFill } = $$props;
	let { glyph = defaultGlyph } = $$props;
	let { glyphSize = defaultSize } = $$props;
	let { size = defaultSize } = $$props;
	let { stroke = defaultStroke } = $$props;
	let { strokeWidth = defaultStrokeWidth } = $$props;
	const writable_props = ['fill', 'glyph', 'glyphSize', 'size', 'stroke', 'strokeWidth'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Icon> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('fill' in $$props) $$invalidate(0, fill = $$props.fill);
		if ('glyph' in $$props) $$invalidate(1, glyph = $$props.glyph);
		if ('glyphSize' in $$props) $$invalidate(10, glyphSize = $$props.glyphSize);
		if ('size' in $$props) $$invalidate(2, size = $$props.size);
		if ('stroke' in $$props) $$invalidate(3, stroke = $$props.stroke);
		if ('strokeWidth' in $$props) $$invalidate(4, strokeWidth = $$props.strokeWidth);
	};

	$$self.$capture_state = () => ({
		defaultFill,
		defaultSize,
		defaultStroke,
		defaultStrokeWidth,
		defaultGlyph,
		strokeLinecap,
		strokeLinejoin,
		svgXmlns,
		fill,
		glyph,
		glyphSize,
		size,
		stroke,
		strokeWidth,
		viewBox
	});

	$$self.$inject_state = $$props => {
		if ('fill' in $$props) $$invalidate(0, fill = $$props.fill);
		if ('glyph' in $$props) $$invalidate(1, glyph = $$props.glyph);
		if ('glyphSize' in $$props) $$invalidate(10, glyphSize = $$props.glyphSize);
		if ('size' in $$props) $$invalidate(2, size = $$props.size);
		if ('stroke' in $$props) $$invalidate(3, stroke = $$props.stroke);
		if ('strokeWidth' in $$props) $$invalidate(4, strokeWidth = $$props.strokeWidth);
		if ('viewBox' in $$props) $$invalidate(5, viewBox = $$props.viewBox);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*fill*/ 1) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			$$invalidate(0, fill = fill || defaultFill);
		}

		if ($$self.$$.dirty & /*glyph*/ 2) {
			$$invalidate(1, glyph = glyph || defaultGlyph);
		}

		if ($$self.$$.dirty & /*size*/ 4) {
			$$invalidate(2, size = size || defaultSize);
		}

		if ($$self.$$.dirty & /*stroke*/ 8) {
			$$invalidate(3, stroke = stroke || defaultStroke);
		}

		if ($$self.$$.dirty & /*strokeWidth*/ 16) {
			$$invalidate(4, strokeWidth = strokeWidth || defaultStrokeWidth);
		}

		if ($$self.$$.dirty & /*glyphSize*/ 1024) {
			$$invalidate(5, viewBox = `0 0 ${glyphSize} ${glyphSize}`);
		}
	};

	return [
		fill,
		glyph,
		size,
		stroke,
		strokeWidth,
		viewBox,
		defaultFill,
		defaultSize,
		defaultStroke,
		defaultStrokeWidth,
		glyphSize
	];
}

class Icon extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$2(this, options, instance$d, create_fragment$d, safe_not_equal, {
			defaultFill: 6,
			defaultSize: 7,
			defaultStroke: 8,
			defaultStrokeWidth: 9,
			fill: 0,
			glyph: 1,
			glyphSize: 10,
			size: 2,
			stroke: 3,
			strokeWidth: 4
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Icon",
			options,
			id: create_fragment$d.name
		});
	}

	get defaultFill() {
		return this.$$.ctx[6];
	}

	set defaultFill(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get defaultSize() {
		return this.$$.ctx[7];
	}

	set defaultSize(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get defaultStroke() {
		return this.$$.ctx[8];
	}

	set defaultStroke(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get defaultStrokeWidth() {
		return this.$$.ctx[9];
	}

	set defaultStrokeWidth(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get fill() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set fill(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get glyph() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set glyph(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get glyphSize() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set glyphSize(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get size() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set size(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get stroke() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set stroke(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get strokeWidth() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set strokeWidth(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var Icon$1 = Icon;

/**
* @module @svizzle/dom/attrs
*/

/**
 * Return a style string from an object
 *
 * @function
 * @arg {object} object
 * @return {string} styleString
 *
 * @example
> makeStyle({color: 'red', 'font-size': '10px'})
'color:red;font-size:10px'
 *
 * @since 0.1.0
 */
const makeStyle = pipe([
	skipIf(isNil),
	pairs,
	mapWith(joinWithColon),
	joinWithSemicolon
]);

/**
 * Return a style string with hyphenate CSS variables derived from the keys of the expected object
 *
 * @function
 * @arg {object} object
 * @return {string} styleString
 *
 * @example
> makeStyleVars({foo: 'red', 'bar': '10px'})
'--foo:red;--bar:10px'
 *
 * @since 0.4.0
 */
const makeStyleVars = pipe([
	skipIf(isNil),
	pairs,
	mapWith(pipe([joinWithColon, makePrefixed('--')])),
	joinWithSemicolon
]);

/**
 * Return a px representation of the received number.
 * Throws an error if the input is not a number.
 *
 * @function
 * @arg {number} number
 * @return {string}
 *
 * @example
> toPx(10)
'10px'
 *
 * @since 0.1.0
 */
const toPx = number => `${number}px`;

var IDX=36, HEX='';
while (IDX--) HEX += IDX.toString(36);

function uid$1 (len) {
	var str='', num = len || 11;
	while (num--) str += HEX[Math.random() * 36 | 0];
	return str;
}

/* ../../components/ui/src/Switch.svelte generated by Svelte v3.44.2 */
const file$7 = "../../components/ui/src/Switch.svelte";

// (43:2) {#if !hideLabels}
function create_if_block_1$4(ctx) {
	let label;
	let t_value = /*values*/ ctx[0][0] + "";
	let t;

	const block = {
		c: function create() {
			label = element("label");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			label = claim_element(nodes, "LABEL", { for: true, class: true });
			var label_nodes = children(label);
			t = claim_text(label_nodes, t_value);
			label_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(label, "for", "left-" + /*id*/ ctx[5]);
			attr_dev(label, "class", "svelte-hote8");
			add_location(label, file$7, 43, 3, 1049);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, label, anchor);
			append_hydration_dev(label, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*values*/ 1 && t_value !== (t_value = /*values*/ ctx[0][0] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(label);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$4.name,
		type: "if",
		source: "(43:2) {#if !hideLabels}",
		ctx
	});

	return block;
}

// (65:2) {#if !hideLabels}
function create_if_block$6(ctx) {
	let label;
	let t_value = /*values*/ ctx[0][1] + "";
	let t;

	const block = {
		c: function create() {
			label = element("label");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			label = claim_element(nodes, "LABEL", { for: true, class: true });
			var label_nodes = children(label);
			t = claim_text(label_nodes, t_value);
			label_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(label, "for", "right-" + /*id*/ ctx[5]);
			attr_dev(label, "class", "svelte-hote8");
			add_location(label, file$7, 65, 3, 1542);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, label, anchor);
			append_hydration_dev(label, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*values*/ 1 && t_value !== (t_value = /*values*/ ctx[0][1] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(label);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$6.name,
		type: "if",
		source: "(65:2) {#if !hideLabels}",
		ctx
	});

	return block;
}

function create_fragment$c(ctx) {
	let div;
	let fieldset;
	let legend;
	let t0;
	let t1_value = /*values*/ ctx[0][0] + "";
	let t1;
	let t2;
	let t3_value = /*values*/ ctx[0][1] + "";
	let t3;
	let t4;
	let t5;
	let span2;
	let input0;
	let input0_value_value;
	let t6;
	let input1;
	let input1_value_value;
	let t7;
	let span0;
	let t8;
	let span1;
	let t9;
	let fieldset_aria_label_value;
	let mounted;
	let dispose;
	let if_block0 = !/*hideLabels*/ ctx[1] && create_if_block_1$4(ctx);
	let if_block1 = !/*hideLabels*/ ctx[1] && create_if_block$6(ctx);

	const block = {
		c: function create() {
			div = element("div");
			fieldset = element("fieldset");
			legend = element("legend");
			t0 = text("Select between ");
			t1 = text(t1_value);
			t2 = text(" and ");
			t3 = text(t3_value);
			t4 = space();
			if (if_block0) if_block0.c();
			t5 = space();
			span2 = element("span");
			input0 = element("input");
			t6 = space();
			input1 = element("input");
			t7 = space();
			span0 = element("span");
			t8 = space();
			span1 = element("span");
			t9 = space();
			if (if_block1) if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true, style: true });
			var div_nodes = children(div);

			fieldset = claim_element(div_nodes, "FIELDSET", {
				role: true,
				"aria-label": true,
				class: true
			});

			var fieldset_nodes = children(fieldset);
			legend = claim_element(fieldset_nodes, "LEGEND", { class: true });
			var legend_nodes = children(legend);
			t0 = claim_text(legend_nodes, "Select between ");
			t1 = claim_text(legend_nodes, t1_value);
			t2 = claim_text(legend_nodes, " and ");
			t3 = claim_text(legend_nodes, t3_value);
			legend_nodes.forEach(detach_dev);
			t4 = claim_space(fieldset_nodes);
			if (if_block0) if_block0.l(fieldset_nodes);
			t5 = claim_space(fieldset_nodes);
			span2 = claim_element(fieldset_nodes, "SPAN", { class: true });
			var span2_nodes = children(span2);
			input0 = claim_element(span2_nodes, "INPUT", { type: true, id: true, class: true });
			t6 = claim_space(span2_nodes);
			input1 = claim_element(span2_nodes, "INPUT", { type: true, id: true, class: true });
			t7 = claim_space(span2_nodes);
			span0 = claim_element(span2_nodes, "SPAN", { "aria-hidden": true, class: true });
			children(span0).forEach(detach_dev);
			t8 = claim_space(span2_nodes);
			span1 = claim_element(span2_nodes, "SPAN", { "aria-hidden": true, class: true });
			children(span1).forEach(detach_dev);
			span2_nodes.forEach(detach_dev);
			t9 = claim_space(fieldset_nodes);
			if (if_block1) if_block1.l(fieldset_nodes);
			fieldset_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(legend, "class", "svelte-hote8");
			add_location(legend, file$7, 41, 2, 966);
			attr_dev(input0, "type", "radio");
			attr_dev(input0, "id", "left-" + /*id*/ ctx[5]);
			input0.__value = input0_value_value = /*values*/ ctx[0][0];
			input0.value = input0.__value;
			attr_dev(input0, "class", "svelte-hote8");
			/*$$binding_groups*/ ctx[10][0].push(input0);
			add_location(input0, file$7, 49, 3, 1204);
			attr_dev(input1, "type", "radio");
			attr_dev(input1, "id", "right-" + /*id*/ ctx[5]);
			input1.__value = input1_value_value = /*values*/ ctx[0][1];
			input1.value = input1.__value;
			attr_dev(input1, "class", "svelte-hote8");
			/*$$binding_groups*/ ctx[10][0].push(input1);
			add_location(input1, file$7, 55, 3, 1309);
			attr_dev(span0, "aria-hidden", "true");
			attr_dev(span0, "class", "bkg svelte-hote8");
			add_location(span0, file$7, 61, 3, 1415);
			attr_dev(span1, "aria-hidden", "true");
			attr_dev(span1, "class", "knob svelte-hote8");
			add_location(span1, file$7, 62, 3, 1463);
			attr_dev(span2, "class", "wrapper svelte-hote8");
			toggle_class(span2, "isRight", /*isRight*/ ctx[4]);
			add_location(span2, file$7, 48, 2, 1164);
			attr_dev(fieldset, "role", "radiogroup");
			attr_dev(fieldset, "aria-label", fieldset_aria_label_value = "Select between " + /*values*/ ctx[0][0] + " and " + /*values*/ ctx[0][1]);
			attr_dev(fieldset, "class", "svelte-hote8");
			add_location(fieldset, file$7, 37, 1, 873);
			attr_dev(div, "class", "switch svelte-hote8");
			attr_dev(div, "style", /*style*/ ctx[3]);
			add_location(div, file$7, 36, 0, 825);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			append_hydration_dev(div, fieldset);
			append_hydration_dev(fieldset, legend);
			append_hydration_dev(legend, t0);
			append_hydration_dev(legend, t1);
			append_hydration_dev(legend, t2);
			append_hydration_dev(legend, t3);
			append_hydration_dev(fieldset, t4);
			if (if_block0) if_block0.m(fieldset, null);
			append_hydration_dev(fieldset, t5);
			append_hydration_dev(fieldset, span2);
			append_hydration_dev(span2, input0);
			input0.checked = input0.__value === /*currentValue*/ ctx[2];
			append_hydration_dev(span2, t6);
			append_hydration_dev(span2, input1);
			input1.checked = input1.__value === /*currentValue*/ ctx[2];
			append_hydration_dev(span2, t7);
			append_hydration_dev(span2, span0);
			append_hydration_dev(span2, t8);
			append_hydration_dev(span2, span1);
			append_hydration_dev(fieldset, t9);
			if (if_block1) if_block1.m(fieldset, null);

			if (!mounted) {
				dispose = [
					listen_dev(input0, "change", /*input0_change_handler*/ ctx[9]),
					listen_dev(input1, "change", /*input1_change_handler*/ ctx[11]),
					listen_dev(div, "click", /*toggle*/ ctx[6], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*values*/ 1 && t1_value !== (t1_value = /*values*/ ctx[0][0] + "")) set_data_dev(t1, t1_value);
			if (dirty & /*values*/ 1 && t3_value !== (t3_value = /*values*/ ctx[0][1] + "")) set_data_dev(t3, t3_value);

			if (!/*hideLabels*/ ctx[1]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_1$4(ctx);
					if_block0.c();
					if_block0.m(fieldset, t5);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty & /*values*/ 1 && input0_value_value !== (input0_value_value = /*values*/ ctx[0][0])) {
				prop_dev(input0, "__value", input0_value_value);
				input0.value = input0.__value;
			}

			if (dirty & /*currentValue*/ 4) {
				input0.checked = input0.__value === /*currentValue*/ ctx[2];
			}

			if (dirty & /*values*/ 1 && input1_value_value !== (input1_value_value = /*values*/ ctx[0][1])) {
				prop_dev(input1, "__value", input1_value_value);
				input1.value = input1.__value;
			}

			if (dirty & /*currentValue*/ 4) {
				input1.checked = input1.__value === /*currentValue*/ ctx[2];
			}

			if (dirty & /*isRight*/ 16) {
				toggle_class(span2, "isRight", /*isRight*/ ctx[4]);
			}

			if (!/*hideLabels*/ ctx[1]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block$6(ctx);
					if_block1.c();
					if_block1.m(fieldset, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty & /*values*/ 1 && fieldset_aria_label_value !== (fieldset_aria_label_value = "Select between " + /*values*/ ctx[0][0] + " and " + /*values*/ ctx[0][1])) {
				attr_dev(fieldset, "aria-label", fieldset_aria_label_value);
			}

			if (dirty & /*style*/ 8) {
				attr_dev(div, "style", /*style*/ ctx[3]);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (if_block0) if_block0.d();
			/*$$binding_groups*/ ctx[10][0].splice(/*$$binding_groups*/ ctx[10][0].indexOf(input0), 1);
			/*$$binding_groups*/ ctx[10][0].splice(/*$$binding_groups*/ ctx[10][0].indexOf(input1), 1);
			if (if_block1) if_block1.d();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$c.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$c($$self, $$props, $$invalidate) {
	let currentValue;
	let isRight;
	let style;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Switch', slots, []);
	const dispatch = createEventDispatcher();

	const defaultTheme = {
		height: '24px',
		color: 'black',
		backgroundColor: 'white',
		knobColor: 'lightgrey'
	};

	let { value = null } = $$props;
	let { values = null } = $$props;
	let { theme = null } = $$props;
	let { hideLabels = false } = $$props;
	const id = uid$1();

	function toggle() {
		$$invalidate(2, currentValue = currentValue === values[0] ? values[1] : values[0]);
		dispatch('toggled', currentValue);
	}

	const writable_props = ['value', 'values', 'theme', 'hideLabels'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Switch> was created with unknown prop '${key}'`);
	});

	const $$binding_groups = [[]];

	function input0_change_handler() {
		currentValue = this.__value;
		(($$invalidate(2, currentValue), $$invalidate(8, value)), $$invalidate(0, values));
	}

	function input1_change_handler() {
		currentValue = this.__value;
		(($$invalidate(2, currentValue), $$invalidate(8, value)), $$invalidate(0, values));
	}

	$$self.$$set = $$props => {
		if ('value' in $$props) $$invalidate(8, value = $$props.value);
		if ('values' in $$props) $$invalidate(0, values = $$props.values);
		if ('theme' in $$props) $$invalidate(7, theme = $$props.theme);
		if ('hideLabels' in $$props) $$invalidate(1, hideLabels = $$props.hideLabels);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		makeStyleVars,
		uid: uid$1,
		dispatch,
		defaultTheme,
		value,
		values,
		theme,
		hideLabels,
		id,
		toggle,
		currentValue,
		style,
		isRight
	});

	$$self.$inject_state = $$props => {
		if ('value' in $$props) $$invalidate(8, value = $$props.value);
		if ('values' in $$props) $$invalidate(0, values = $$props.values);
		if ('theme' in $$props) $$invalidate(7, theme = $$props.theme);
		if ('hideLabels' in $$props) $$invalidate(1, hideLabels = $$props.hideLabels);
		if ('currentValue' in $$props) $$invalidate(2, currentValue = $$props.currentValue);
		if ('style' in $$props) $$invalidate(3, style = $$props.style);
		if ('isRight' in $$props) $$invalidate(4, isRight = $$props.isRight);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*value, values*/ 257) {
			// FIXME https://github.com/sveltejs/svelte/issues/4442
			$$invalidate(2, currentValue = value || values[0]);
		}

		if ($$self.$$.dirty & /*currentValue, values*/ 5) {
			$$invalidate(4, isRight = currentValue === values[1]);
		}

		if ($$self.$$.dirty & /*theme*/ 128) {
			$$invalidate(7, theme = theme ? { ...defaultTheme, ...theme } : defaultTheme);
		}

		if ($$self.$$.dirty & /*theme*/ 128) {
			$$invalidate(3, style = makeStyleVars(theme));
		}
	};

	return [
		values,
		hideLabels,
		currentValue,
		style,
		isRight,
		id,
		toggle,
		theme,
		value,
		input0_change_handler,
		$$binding_groups,
		input1_change_handler
	];
}

class Switch extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$2(this, options, instance$c, create_fragment$c, safe_not_equal, {
			value: 8,
			values: 0,
			theme: 7,
			hideLabels: 1
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Switch",
			options,
			id: create_fragment$c.name
		});
	}

	get value() {
		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get values() {
		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set values(value) {
		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get theme() {
		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set theme(value) {
		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get hideLabels() {
		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set hideLabels(value) {
		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var Switch$1 = Switch;

const defaultA11ySettings = {
	brightness: {
		defaultValue: 100,
		format: 'percentage',
		group: 'color',
		id: 'brightness',
		label: 'Brightness',
		next: 'contrast',
		prev: 'grayscale',
		range: [10, 150],
		value: 100,
	},
	contrast: {
		defaultValue: 100,
		format: 'percentage',
		group: 'color',
		id: 'contrast',
		label: 'Contrast',
		next: null,
		prev: 'brightness',
		range: [10, 150],
		value: 100,
	},
	cvd: {
		defaultValue: 'None',
		group: 'color',
		id: 'cvd',
		label: 'Color Vision Deficiency',
		next: 'hue',
		prev: 'invert',
		value: 'None',
		values: ['None', 'Protanopia', 'Deuteranopia', 'Tritanopia'],
	},
	fontScaling: {
		defaultValue: 100,
		format: 'percentage',
		group: 'text',
		id: 'fontScaling',
		label: 'Font scale',
		next: 'lineHeight',
		prev: 'typeface',
		value: 100,
		values: [50, 75, 100, 125, 150],
	},
	grayscale: {
		defaultValue: 0,
		format: 'percentage',
		group: 'color',
		id: 'grayscale',
		label: 'Grayscale',
		next: 'brightness',
		prev: 'hue',
		range: [0, 100],
		value: 0,
	},
	hue: {
		defaultValue: 0,
		format: 'degrees',
		group: 'color',
		id: 'hue',
		label: 'Hue Shift',
		next: 'grayscale',
		prev: 'cvd',
		range: [0, 360],
		value: 0,
	},
	invert: {
		defaultValue: false,
		format: 'boolean',
		group: 'color',
		id: 'invert',
		label: 'Invert',
		next: 'cvd',
		prev: 'wordSpacing',
		value: false,
	},
	letterSpacing: {
		defaultValue: 0,
		format: 'percentage',
		group: 'text',
		id: 'letterSpacing',
		label: 'Letter spacing',
		next: 'wordSpacing',
		prev: 'lineHeight',
		value: 0,
		values: [0, 10, 20],
	},
	lineHeight: {
		defaultValue: 150,
		format: 'percentage',
		group: 'text',
		id: 'lineHeight',
		label: 'Line height',
		next: 'letterSpacing',
		prev: 'fontScaling',
		value: 150,
		values: [100, 125, 150, 175, 200],
	},
	typeface: {
		defaultValue: 'sans-serif',
		group: 'text',
		id: 'typeface',
		label: 'Font',
		next: 'fontScaling',
		prev: null,
		value: 'sans-serif',
		values: [
			'sans-serif',
			'monospace',
		],
	},
	wordSpacing: {
		defaultValue: 0,
		format: 'percentage',
		group: 'text',
		id: 'wordSpacing',
		label: 'Word spacing',
		next: 'invert',
		prev: 'letterSpacing',
		value: 0,
		values: [0, 20, 40],
	},
};

const _a11ySettings = writable(defaultA11ySettings);

/* init */

const isFirstSetting = pipe([getKey('prev'), isNull]);
const getFirstId = pipe([
	values,
	findWhere(isFirstSetting),
	getKey('id')
]);
const firstId = getFirstId(defaultA11ySettings);

/* current setting */

const _currentId = writable(firstId);
const _currentSetting = derived(
	[_a11ySettings, _currentId],
	([settings, id]) => settings[id]
);

/* formatting */

const formats = {
	'percentage': value => `${value}%`,
	'degrees': value => `${value}°`,
	'boolean': value => value ? 'Yes' : 'No',
};
const _formatValue = derived(
	_currentSetting,
	setting => setting.format ? formats[setting.format] : identity
);

/* navigation */

const setNextId = () => _currentId.set(get_store_value(_currentSetting).next);
const setPrevId = () => _currentId.set(get_store_value(_currentSetting).prev);

const _hasPrev = derived(
	_currentSetting,
	pipe([getKey('prev'), isNotNull])
);
const _hasNext = derived(
	_currentSetting,
	pipe([getKey('next'), isNotNull])
);

/* update */

const isValueInRange = (value, range) => value >= range[0] && value <= range[1];

const updateSettingsOf = (id, settings) => {
	_a11ySettings.update(updateKey(id, mergeObj(settings)));
};

const updateCurrentValue = value => {
	const setting = get_store_value(_currentSetting);
	updateSettingsOf(setting.id, {value});
};

/* defaults */

const setValueToDefault = makeMergeAppliedFnMap({value: getKey('defaultValue')});

const isValidValue = setting => value =>
	setting.values && value in setting.values
	|| setting.range && isValueInRange(value, setting.range);

const mergeOnlyUpdateValueIfInvalid = (newSetting, oldSetting) => {
	const setting = isValidValue(newSetting)(oldSetting.value)
		? skipIn(newSetting, ['value'])
		: newSetting;
	return merge(oldSetting, setting);
};

const mergeDefaultSettings = newDefaultSettings => {
	const mergedDefaultSettings = mapValuesWith(setValueToDefault)(
		newDefaultSettings
	);
	_a11ySettings.update(
		curry(mergeWith(mergeOnlyUpdateValueIfInvalid))(mergedDefaultSettings)
	);
	return mergeWithMerge(defaultA11ySettings, mergedDefaultSettings);
};

/* resets */

const getGroupsResetStatus = pipe([
	values,
	groupBy(getKey('group')),
	mapValuesWith(
		pipe([
			mapWith(
				collect([
					getKey('value'),
					getKey('defaultValue'),
				])
			),
			every(apply(areSame))
		])
	)
]);
const _groupsResetStatus = derived(_a11ySettings, getGroupsResetStatus);

const _isA11yDirty = derived(
	_groupsResetStatus,
	pipe([
		values,
		some(not(identity))
	])
);

const isNotOfGroup = groupId => pipe([getKey('group'), isNot(groupId)]);
const resetGroupItems = groupId => mapValuesWith(adapter([
	casus(isNotOfGroup(groupId), identity),
	casus(hasKey('value'), setValueToDefault),
]));
const resetGroup = groupId => _a11ySettings.update(
	resetGroupItems(groupId)
);

/* Color corrections CSS property formatter */
const getValuesOrderedByKeys = keys => obj => map(keys, key => obj[key]);
const hasDirtyValue = pipe([
	collect([
		getKey('defaultValue'),
		getKey('value'),
	]),
	apply(not(areSame))
]);
const cvdFilters = {
	Deuteranopia: 'url(#recolor-deuteranopia)',
	Protanopia: 'url(#recolor-protanopia)',
	Tritanopia: 'url(#recolor-tritanopia)',
};
const valueFormatters = {
	percentage: value => `${value}%`,
	degrees: value => `${value}deg`,
	boolean: value => value ? '100%' : '0%',
};
const getCssFilter = setting => {
	if (setting.id === 'cvd') {
		return cvdFilters[setting.value]
	}
	let filter = setting.id === 'hue' ? 'hue-rotate' : setting.id;
	return `${filter}(${valueFormatters[setting.format](setting.value)})`
};
const getColorCorrectionString = pipe([
	getValuesOrderedByKeys([
		'invert',
		'cvd',
		'hue',
		'grayscale',
		'brightness',
		'contrast',
	]),
	filterWith(hasDirtyValue),
	mapWith(getCssFilter),
	joinWith(' ')
]);
const getColorStyles = applyFnMap({
	'--color-correction': getColorCorrectionString
});
const _a11yColorStyles = derived(_a11ySettings, getColorStyles);

/* Text corrections CSS property formatters */

const toRemPercent = pipe([divideBy(100), makePostfixed('rem')]);

const getTextStyles = applyFnMap({
	'font-family': getPath('typeface.value'),
	'font-size': pipe([getPath('fontScaling.value'), toRemPercent]),
	'letter-spacing': pipe([getPath('letterSpacing.value'), toRemPercent]),
	'line-height': pipe([getPath('lineHeight.value'), toRemPercent]),
	'word-spacing': pipe([getPath('wordSpacing.value'), toRemPercent]),
});

const _a11yTextStyles = derived(_a11ySettings, getTextStyles);

const applyStyles = (domStyle, styles) => {
	pairs(styles)
	.forEach(prop => domStyle.setProperty(...prop));
};

/* ../../components/ui/src/a11y/menu/A11yMenu.svelte generated by Svelte v3.44.2 */

const file$6 = "../../components/ui/src/a11y/menu/A11yMenu.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[26] = list[i];
	child_ctx[28] = i;
	return child_ctx;
}

// (144:50) 
function create_if_block_3(ctx) {
	let switch_1;
	let current;

	switch_1 = new Switch$1({
			props: {
				value: /*$_formatValue*/ ctx[6](/*$_currentSetting*/ ctx[4].value),
				values: ['No', 'Yes']
			},
			$$inline: true
		});

	switch_1.$on("toggled", /*toggled_handler*/ ctx[24]);

	const block = {
		c: function create() {
			create_component(switch_1.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(switch_1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(switch_1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_1_changes = {};
			if (dirty & /*$_formatValue, $_currentSetting*/ 80) switch_1_changes.value = /*$_formatValue*/ ctx[6](/*$_currentSetting*/ ctx[4].value);
			switch_1.$set(switch_1_changes);
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
			destroy_component(switch_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(144:50) ",
		ctx
	});

	return block;
}

// (126:35) 
function create_if_block_2(ctx) {
	let div;
	let span0;
	let t0_value = /*$_formatValue*/ ctx[6](/*$_currentSetting*/ ctx[4].range[0]) + "";
	let t0;
	let t1;
	let input;
	let input_max_value;
	let input_min_value;
	let input_name_value;
	let input_value_value;
	let t2;
	let span1;
	let t3_value = /*$_formatValue*/ ctx[6](/*$_currentSetting*/ ctx[4].range[1]) + "";
	let t3;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = element("div");
			span0 = element("span");
			t0 = text(t0_value);
			t1 = space();
			input = element("input");
			t2 = space();
			span1 = element("span");
			t3 = text(t3_value);
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			span0 = claim_element(div_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			t0 = claim_text(span0_nodes, t0_value);
			span0_nodes.forEach(detach_dev);
			t1 = claim_space(div_nodes);

			input = claim_element(div_nodes, "INPUT", {
				class: true,
				max: true,
				min: true,
				name: true,
				type: true
			});

			t2 = claim_space(div_nodes);
			span1 = claim_element(div_nodes, "SPAN", { class: true });
			var span1_nodes = children(span1);
			t3 = claim_text(span1_nodes, t3_value);
			span1_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span0, "class", "svelte-1tu60gf");
			add_location(span0, file$6, 127, 4, 3725);
			attr_dev(input, "class", "clickable svelte-1tu60gf");
			attr_dev(input, "max", input_max_value = /*$_currentSetting*/ ctx[4].range[1]);
			attr_dev(input, "min", input_min_value = /*$_currentSetting*/ ctx[4].range[0]);
			attr_dev(input, "name", input_name_value = /*$_currentSetting*/ ctx[4].id);
			attr_dev(input, "type", "range");
			input.value = input_value_value = /*$_currentSetting*/ ctx[4].value;
			add_location(input, file$6, 130, 4, 3796);
			attr_dev(span1, "class", "svelte-1tu60gf");
			add_location(span1, file$6, 139, 4, 4061);
			attr_dev(div, "class", "slider svelte-1tu60gf");
			add_location(div, file$6, 126, 3, 3700);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			append_hydration_dev(div, span0);
			append_hydration_dev(span0, t0);
			append_hydration_dev(div, t1);
			append_hydration_dev(div, input);
			append_hydration_dev(div, t2);
			append_hydration_dev(div, span1);
			append_hydration_dev(span1, t3);

			if (!mounted) {
				dispose = listen_dev(input, "input", /*input_handler*/ ctx[23], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*$_formatValue, $_currentSetting*/ 80 && t0_value !== (t0_value = /*$_formatValue*/ ctx[6](/*$_currentSetting*/ ctx[4].range[0]) + "")) set_data_dev(t0, t0_value);

			if (dirty & /*$_currentSetting*/ 16 && input_max_value !== (input_max_value = /*$_currentSetting*/ ctx[4].range[1])) {
				attr_dev(input, "max", input_max_value);
			}

			if (dirty & /*$_currentSetting*/ 16 && input_min_value !== (input_min_value = /*$_currentSetting*/ ctx[4].range[0])) {
				attr_dev(input, "min", input_min_value);
			}

			if (dirty & /*$_currentSetting*/ 16 && input_name_value !== (input_name_value = /*$_currentSetting*/ ctx[4].id)) {
				attr_dev(input, "name", input_name_value);
			}

			if (dirty & /*$_currentSetting*/ 16 && input_value_value !== (input_value_value = /*$_currentSetting*/ ctx[4].value)) {
				prop_dev(input, "value", input_value_value);
			}

			if (dirty & /*$_formatValue, $_currentSetting*/ 80 && t3_value !== (t3_value = /*$_formatValue*/ ctx[6](/*$_currentSetting*/ ctx[4].range[1]) + "")) set_data_dev(t3, t3_value);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(126:35) ",
		ctx
	});

	return block;
}

// (89:2) {#if $_currentSetting.values}
function create_if_block$5(ctx) {
	let div;
	let current_block_type_index;
	let if_block;
	let current;
	const if_block_creators = [create_if_block_1$3, create_else_block$1];
	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (/*useRadios*/ ctx[10]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_1(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			div = element("div");
			if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			if_block.l(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "controlContainer svelte-1tu60gf");
			add_location(div, file$6, 89, 3, 2615);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			if_blocks[current_block_type_index].m(div, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_1(ctx);

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
		id: create_if_block$5.name,
		type: "if",
		source: "(89:2) {#if $_currentSetting.values}",
		ctx
	});

	return block;
}

// (107:4) {:else}
function create_else_block$1(ctx) {
	let button0;
	let icon0;
	let button0_aria_label_value;
	let button0_disabled_value;
	let t;
	let button1;
	let icon1;
	let button1_aria_label_value;
	let button1_disabled_value;
	let current;
	let mounted;
	let dispose;

	icon0 = new Icon$1({
			props: {
				glyph: /*hasNumericValues*/ ctx[9]
				? MinusCircle$1
				: ArrowLeftCircle$1
			},
			$$inline: true
		});

	icon1 = new Icon$1({
			props: {
				glyph: /*hasNumericValues*/ ctx[9]
				? PlusCircle$1
				: ArrowRightCircle$1
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			button0 = element("button");
			create_component(icon0.$$.fragment);
			t = space();
			button1 = element("button");
			create_component(icon1.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			button0 = claim_element(nodes, "BUTTON", { "aria-label": true, class: true });
			var button0_nodes = children(button0);
			claim_component(icon0.$$.fragment, button0_nodes);
			button0_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			button1 = claim_element(nodes, "BUTTON", { "aria-label": true, class: true });
			var button1_nodes = children(button1);
			claim_component(icon1.$$.fragment, button1_nodes);
			button1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(button0, "aria-label", button0_aria_label_value = `Previous ${/*hasNumericValues*/ ctx[9] ? 'numeric' : 'alphanumeric'} value`);
			button0.disabled = button0_disabled_value = !/*hasPrevValue*/ ctx[3];
			attr_dev(button0, "class", "svelte-1tu60gf");
			toggle_class(button0, "clickable", /*hasPrevValue*/ ctx[3]);
			add_location(button0, file$6, 107, 5, 3072);
			attr_dev(button1, "aria-label", button1_aria_label_value = `Next ${/*hasNumericValues*/ ctx[9] ? 'numeric' : 'alphanumeric'} value`);
			button1.disabled = button1_disabled_value = !/*hasNextValue*/ ctx[2];
			attr_dev(button1, "class", "svelte-1tu60gf");
			toggle_class(button1, "clickable", /*hasNextValue*/ ctx[2]);
			add_location(button1, file$6, 115, 5, 3361);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, button0, anchor);
			mount_component(icon0, button0, null);
			insert_hydration_dev(target, t, anchor);
			insert_hydration_dev(target, button1, anchor);
			mount_component(icon1, button1, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(
						button0,
						"click",
						function () {
							if (is_function(/*clickedPrev*/ ctx[8])) /*clickedPrev*/ ctx[8].apply(this, arguments);
						},
						false,
						false,
						false
					),
					listen_dev(
						button1,
						"click",
						function () {
							if (is_function(/*clickedNext*/ ctx[7])) /*clickedNext*/ ctx[7].apply(this, arguments);
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
			const icon0_changes = {};

			if (dirty & /*hasNumericValues*/ 512) icon0_changes.glyph = /*hasNumericValues*/ ctx[9]
			? MinusCircle$1
			: ArrowLeftCircle$1;

			icon0.$set(icon0_changes);

			if (!current || dirty & /*hasNumericValues*/ 512 && button0_aria_label_value !== (button0_aria_label_value = `Previous ${/*hasNumericValues*/ ctx[9] ? 'numeric' : 'alphanumeric'} value`)) {
				attr_dev(button0, "aria-label", button0_aria_label_value);
			}

			if (!current || dirty & /*hasPrevValue*/ 8 && button0_disabled_value !== (button0_disabled_value = !/*hasPrevValue*/ ctx[3])) {
				prop_dev(button0, "disabled", button0_disabled_value);
			}

			if (dirty & /*hasPrevValue*/ 8) {
				toggle_class(button0, "clickable", /*hasPrevValue*/ ctx[3]);
			}

			const icon1_changes = {};

			if (dirty & /*hasNumericValues*/ 512) icon1_changes.glyph = /*hasNumericValues*/ ctx[9]
			? PlusCircle$1
			: ArrowRightCircle$1;

			icon1.$set(icon1_changes);

			if (!current || dirty & /*hasNumericValues*/ 512 && button1_aria_label_value !== (button1_aria_label_value = `Next ${/*hasNumericValues*/ ctx[9] ? 'numeric' : 'alphanumeric'} value`)) {
				attr_dev(button1, "aria-label", button1_aria_label_value);
			}

			if (!current || dirty & /*hasNextValue*/ 4 && button1_disabled_value !== (button1_disabled_value = !/*hasNextValue*/ ctx[2])) {
				prop_dev(button1, "disabled", button1_disabled_value);
			}

			if (dirty & /*hasNextValue*/ 4) {
				toggle_class(button1, "clickable", /*hasNextValue*/ ctx[2]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon0.$$.fragment, local);
			transition_in(icon1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon0.$$.fragment, local);
			transition_out(icon1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(button0);
			destroy_component(icon0);
			if (detaching) detach_dev(t);
			if (detaching) detach_dev(button1);
			destroy_component(icon1);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$1.name,
		type: "else",
		source: "(107:4) {:else}",
		ctx
	});

	return block;
}

// (91:4) {#if useRadios}
function create_if_block_1$3(ctx) {
	let each_1_anchor;
	let each_value = /*$_currentSetting*/ ctx[4].values;
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		l: function claim(nodes) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_hydration_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*$_currentSetting, updateCurrentValue, $_formatValue*/ 80) {
				each_value = /*$_currentSetting*/ ctx[4].values;
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$3.name,
		type: "if",
		source: "(91:4) {#if useRadios}",
		ctx
	});

	return block;
}

// (92:5) {#each $_currentSetting.values as value, index}
function create_each_block(ctx) {
	let div;
	let label_1;
	let t0_value = /*$_formatValue*/ ctx[6](/*value*/ ctx[26]) + "";
	let t0;
	let t1;
	let input;
	let input_checked_value;
	let input_value_value;
	let t2;
	let mounted;
	let dispose;

	function change_handler() {
		return /*change_handler*/ ctx[22](/*value*/ ctx[26]);
	}

	const block = {
		c: function create() {
			div = element("div");
			label_1 = element("label");
			t0 = text(t0_value);
			t1 = space();
			input = element("input");
			t2 = space();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", {});
			var div_nodes = children(div);
			label_1 = claim_element(div_nodes, "LABEL", { for: true, class: true });
			var label_1_nodes = children(label_1);
			t0 = claim_text(label_1_nodes, t0_value);
			label_1_nodes.forEach(detach_dev);
			t1 = claim_space(div_nodes);
			input = claim_element(div_nodes, "INPUT", { id: true, class: true, type: true });
			t2 = claim_space(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(label_1, "for", "input-" + /*index*/ ctx[28]);
			attr_dev(label_1, "class", "svelte-1tu60gf");
			add_location(label_1, file$6, 93, 7, 2738);
			attr_dev(input, "id", "input-" + /*index*/ ctx[28]);
			input.checked = input_checked_value = /*$_currentSetting*/ ctx[4].value === /*value*/ ctx[26];
			attr_dev(input, "class", "clickable svelte-1tu60gf");
			attr_dev(input, "type", "radio");
			input.value = input_value_value = /*value*/ ctx[26];
			add_location(input, file$6, 96, 7, 2820);
			add_location(div, file$6, 92, 6, 2725);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			append_hydration_dev(div, label_1);
			append_hydration_dev(label_1, t0);
			append_hydration_dev(div, t1);
			append_hydration_dev(div, input);
			append_hydration_dev(div, t2);

			if (!mounted) {
				dispose = listen_dev(input, "change", change_handler, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*$_formatValue, $_currentSetting*/ 80 && t0_value !== (t0_value = /*$_formatValue*/ ctx[6](/*value*/ ctx[26]) + "")) set_data_dev(t0, t0_value);

			if (dirty & /*$_currentSetting*/ 16 && input_checked_value !== (input_checked_value = /*$_currentSetting*/ ctx[4].value === /*value*/ ctx[26])) {
				prop_dev(input, "checked", input_checked_value);
			}

			if (dirty & /*$_currentSetting*/ 16 && input_value_value !== (input_value_value = /*value*/ ctx[26])) {
				prop_dev(input, "value", input_value_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(92:5) {#each $_currentSetting.values as value, index}",
		ctx
	});

	return block;
}

function create_fragment$b(ctx) {
	let dialog;
	let nav0;
	let button0;
	let icon0;
	let t0;
	let button1;
	let icon1;
	let t1;
	let menu;
	let label_1;
	let t2;
	let t3;
	let current_block_type_index;
	let if_block;
	let menu_resize_listener;
	let t4;
	let nav1;
	let button2;
	let icon2;
	let button2_disabled_value;
	let t5;
	let button3;
	let icon3;
	let button3_disabled_value;
	let dialog_class_value;
	let current;
	let mounted;
	let dispose;

	icon0 = new Icon$1({
			props: {
				fill: /*$_groupsResetStatus*/ ctx[12].text
				? 'silver'
				: 'black',
				glyph: FormatClear$1,
				stroke: "none"
			},
			$$inline: true
		});

	icon1 = new Icon$1({
			props: {
				fill: /*$_groupsResetStatus*/ ctx[12].color
				? 'silver'
				: 'black',
				glyph: ColorClear$1,
				stroke: "none"
			},
			$$inline: true
		});

	const if_block_creators = [create_if_block$5, create_if_block_2, create_if_block_3];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*$_currentSetting*/ ctx[4].values) return 0;
		if (/*$_currentSetting*/ ctx[4].range) return 1;
		if (/*$_currentSetting*/ ctx[4].format === 'boolean') return 2;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	icon2 = new Icon$1({
			props: { glyph: ChevronLeft$1 },
			$$inline: true
		});

	icon3 = new Icon$1({
			props: { glyph: ChevronRight$1 },
			$$inline: true
		});

	const block = {
		c: function create() {
			dialog = element("dialog");
			nav0 = element("nav");
			button0 = element("button");
			create_component(icon0.$$.fragment);
			t0 = space();
			button1 = element("button");
			create_component(icon1.$$.fragment);
			t1 = space();
			menu = element("menu");
			label_1 = element("label");
			t2 = text(/*label*/ ctx[11]);
			t3 = space();
			if (if_block) if_block.c();
			t4 = space();
			nav1 = element("nav");
			button2 = element("button");
			create_component(icon2.$$.fragment);
			t5 = space();
			button3 = element("button");
			create_component(icon3.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			dialog = claim_element(nodes, "DIALOG", {
				"aria-label": true,
				class: true,
				style: true
			});

			var dialog_nodes = children(dialog);
			nav0 = claim_element(dialog_nodes, "NAV", { class: true });
			var nav0_nodes = children(nav0);
			button0 = claim_element(nav0_nodes, "BUTTON", { "aria-label": true, class: true });
			var button0_nodes = children(button0);
			claim_component(icon0.$$.fragment, button0_nodes);
			button0_nodes.forEach(detach_dev);
			t0 = claim_space(nav0_nodes);
			button1 = claim_element(nav0_nodes, "BUTTON", { "aria-label": true, class: true });
			var button1_nodes = children(button1);
			claim_component(icon1.$$.fragment, button1_nodes);
			button1_nodes.forEach(detach_dev);
			nav0_nodes.forEach(detach_dev);
			t1 = claim_space(dialog_nodes);
			menu = claim_element(dialog_nodes, "MENU", { class: true });
			var menu_nodes = children(menu);
			label_1 = claim_element(menu_nodes, "LABEL", { for: true, class: true });
			var label_1_nodes = children(label_1);
			t2 = claim_text(label_1_nodes, /*label*/ ctx[11]);
			label_1_nodes.forEach(detach_dev);
			t3 = claim_space(menu_nodes);
			if (if_block) if_block.l(menu_nodes);
			menu_nodes.forEach(detach_dev);
			t4 = claim_space(dialog_nodes);
			nav1 = claim_element(dialog_nodes, "NAV", { class: true });
			var nav1_nodes = children(nav1);
			button2 = claim_element(nav1_nodes, "BUTTON", { "aria-label": true, class: true });
			var button2_nodes = children(button2);
			claim_component(icon2.$$.fragment, button2_nodes);
			button2_nodes.forEach(detach_dev);
			t5 = claim_space(nav1_nodes);
			button3 = claim_element(nav1_nodes, "BUTTON", { "aria-label": true, class: true });
			var button3_nodes = children(button3);
			claim_component(icon3.$$.fragment, button3_nodes);
			button3_nodes.forEach(detach_dev);
			nav1_nodes.forEach(detach_dev);
			dialog_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(button0, "aria-label", "Reset text accessibility adjustments");
			attr_dev(button0, "class", "text svelte-1tu60gf");
			toggle_class(button0, "clickable", !/*$_groupsResetStatus*/ ctx[12].text);
			add_location(button0, file$6, 61, 2, 1911);
			attr_dev(button1, "aria-label", "Reset color accessibility adjustments");
			attr_dev(button1, "class", "color svelte-1tu60gf");
			toggle_class(button1, "clickable", !/*$_groupsResetStatus*/ ctx[12].color);
			add_location(button1, file$6, 73, 2, 2206);
			attr_dev(nav0, "class", "resets svelte-1tu60gf");
			add_location(nav0, file$6, 60, 1, 1888);
			attr_dev(label_1, "for", "");
			attr_dev(label_1, "class", "svelte-1tu60gf");
			add_location(label_1, file$6, 87, 2, 2550);
			attr_dev(menu, "class", "svelte-1tu60gf");
			add_render_callback(() => /*menu_elementresize_handler*/ ctx[25].call(menu));
			add_location(menu, file$6, 86, 1, 2512);
			attr_dev(button2, "aria-label", "Previous Setting");
			button2.disabled = button2_disabled_value = !/*$_hasPrev*/ ctx[13];
			attr_dev(button2, "class", "svelte-1tu60gf");
			toggle_class(button2, "clickable", /*$_hasPrev*/ ctx[13]);
			add_location(button2, file$6, 152, 2, 4389);
			attr_dev(button3, "aria-label", "Next Setting");
			button3.disabled = button3_disabled_value = !/*$_hasNext*/ ctx[14];
			attr_dev(button3, "class", "svelte-1tu60gf");
			toggle_class(button3, "clickable", /*$_hasNext*/ ctx[14]);
			add_location(button3, file$6, 160, 2, 4560);
			attr_dev(nav1, "class", "nav svelte-1tu60gf");
			add_location(nav1, file$6, 151, 1, 4369);
			attr_dev(dialog, "aria-label", "Accessibility settings");
			attr_dev(dialog, "class", dialog_class_value = "" + (null_to_empty(/*$_screen*/ ctx[5]?.classes) + " svelte-1tu60gf"));
			set_style(dialog, "--gap", gap + "px");
			add_location(dialog, file$6, 56, 0, 1790);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, dialog, anchor);
			append_hydration_dev(dialog, nav0);
			append_hydration_dev(nav0, button0);
			mount_component(icon0, button0, null);
			append_hydration_dev(nav0, t0);
			append_hydration_dev(nav0, button1);
			mount_component(icon1, button1, null);
			append_hydration_dev(dialog, t1);
			append_hydration_dev(dialog, menu);
			append_hydration_dev(menu, label_1);
			append_hydration_dev(label_1, t2);
			append_hydration_dev(menu, t3);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(menu, null);
			}

			menu_resize_listener = add_resize_listener(menu, /*menu_elementresize_handler*/ ctx[25].bind(menu));
			append_hydration_dev(dialog, t4);
			append_hydration_dev(dialog, nav1);
			append_hydration_dev(nav1, button2);
			mount_component(icon2, button2, null);
			append_hydration_dev(nav1, t5);
			append_hydration_dev(nav1, button3);
			mount_component(icon3, button3, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(button0, "click", /*click_handler*/ ctx[20], false, false, false),
					listen_dev(button1, "click", /*click_handler_1*/ ctx[21], false, false, false),
					listen_dev(button2, "click", setPrevId, false, false, false),
					listen_dev(button3, "click", setNextId, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			const icon0_changes = {};

			if (dirty & /*$_groupsResetStatus*/ 4096) icon0_changes.fill = /*$_groupsResetStatus*/ ctx[12].text
			? 'silver'
			: 'black';

			icon0.$set(icon0_changes);

			if (dirty & /*$_groupsResetStatus*/ 4096) {
				toggle_class(button0, "clickable", !/*$_groupsResetStatus*/ ctx[12].text);
			}

			const icon1_changes = {};

			if (dirty & /*$_groupsResetStatus*/ 4096) icon1_changes.fill = /*$_groupsResetStatus*/ ctx[12].color
			? 'silver'
			: 'black';

			icon1.$set(icon1_changes);

			if (dirty & /*$_groupsResetStatus*/ 4096) {
				toggle_class(button1, "clickable", !/*$_groupsResetStatus*/ ctx[12].color);
			}

			if (!current || dirty & /*label*/ 2048) set_data_dev(t2, /*label*/ ctx[11]);
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					} else {
						if_block.p(ctx, dirty);
					}

					transition_in(if_block, 1);
					if_block.m(menu, null);
				} else {
					if_block = null;
				}
			}

			if (!current || dirty & /*$_hasPrev*/ 8192 && button2_disabled_value !== (button2_disabled_value = !/*$_hasPrev*/ ctx[13])) {
				prop_dev(button2, "disabled", button2_disabled_value);
			}

			if (dirty & /*$_hasPrev*/ 8192) {
				toggle_class(button2, "clickable", /*$_hasPrev*/ ctx[13]);
			}

			if (!current || dirty & /*$_hasNext*/ 16384 && button3_disabled_value !== (button3_disabled_value = !/*$_hasNext*/ ctx[14])) {
				prop_dev(button3, "disabled", button3_disabled_value);
			}

			if (dirty & /*$_hasNext*/ 16384) {
				toggle_class(button3, "clickable", /*$_hasNext*/ ctx[14]);
			}

			if (!current || dirty & /*$_screen*/ 32 && dialog_class_value !== (dialog_class_value = "" + (null_to_empty(/*$_screen*/ ctx[5]?.classes) + " svelte-1tu60gf"))) {
				attr_dev(dialog, "class", dialog_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon0.$$.fragment, local);
			transition_in(icon1.$$.fragment, local);
			transition_in(if_block);
			transition_in(icon2.$$.fragment, local);
			transition_in(icon3.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon0.$$.fragment, local);
			transition_out(icon1.$$.fragment, local);
			transition_out(if_block);
			transition_out(icon2.$$.fragment, local);
			transition_out(icon3.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(dialog);
			destroy_component(icon0);
			destroy_component(icon1);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d();
			}

			menu_resize_listener();
			destroy_component(icon2);
			destroy_component(icon3);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$b.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const gap = 24;

function instance$b($$self, $$props, $$invalidate) {
	let label;
	let settingValues;
	let getValueWidth;
	let useRadios;
	let hasNumericValues;
	let currentValueIndex;
	let prevValue;
	let nextValue;
	let hasPrevValue;
	let hasNextValue;
	let clickedPrev;
	let clickedNext;
	let $_currentSetting;

	let $_screen,
		$$unsubscribe__screen = noop,
		$$subscribe__screen = () => ($$unsubscribe__screen(), $$unsubscribe__screen = subscribe(_screen, $$value => $$invalidate(5, $_screen = $$value)), _screen);

	let $_formatValue;
	let $_groupsResetStatus;
	let $_hasPrev;
	let $_hasNext;
	validate_store(_currentSetting, '_currentSetting');
	component_subscribe($$self, _currentSetting, $$value => $$invalidate(4, $_currentSetting = $$value));
	validate_store(_formatValue, '_formatValue');
	component_subscribe($$self, _formatValue, $$value => $$invalidate(6, $_formatValue = $$value));
	validate_store(_groupsResetStatus, '_groupsResetStatus');
	component_subscribe($$self, _groupsResetStatus, $$value => $$invalidate(12, $_groupsResetStatus = $$value));
	validate_store(_hasPrev, '_hasPrev');
	component_subscribe($$self, _hasPrev, $$value => $$invalidate(13, $_hasPrev = $$value));
	validate_store(_hasNext, '_hasNext');
	component_subscribe($$self, _hasNext, $$value => $$invalidate(14, $_hasNext = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe__screen());
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('A11yMenu', slots, []);
	let { _screen } = $$props;
	validate_store(_screen, '_screen');
	$$subscribe__screen();
	let menuWidth; // bound
	const writable_props = ['_screen'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<A11yMenu> was created with unknown prop '${key}'`);
	});

	const click_handler = () => resetGroup('text');
	const click_handler_1 = () => resetGroup('color');
	const change_handler = value => updateCurrentValue(value);
	const input_handler = ({ target: { value } }) => updateCurrentValue(value);
	const toggled_handler = ({ detail }) => updateCurrentValue(detail === 'Yes');

	function menu_elementresize_handler() {
		menuWidth = this.clientWidth;
		$$invalidate(1, menuWidth);
	}

	$$self.$$set = $$props => {
		if ('_screen' in $$props) $$subscribe__screen($$invalidate(0, _screen = $$props._screen));
	};

	$$self.$capture_state = () => ({
		isNotNil,
		isNumber,
		_,
		ArrowLeftCircle: ArrowLeftCircle$1,
		ArrowRightCircle: ArrowRightCircle$1,
		ChevronLeft: ChevronLeft$1,
		ChevronRight: ChevronRight$1,
		MinusCircle: MinusCircle$1,
		PlusCircle: PlusCircle$1,
		ColorClear: ColorClear$1,
		FormatClear: FormatClear$1,
		Icon: Icon$1,
		Switch: Switch$1,
		_currentSetting,
		_formatValue,
		_groupsResetStatus,
		_hasNext,
		_hasPrev,
		resetGroup,
		setNextId,
		setPrevId,
		updateCurrentValue,
		_screen,
		menuWidth,
		gap,
		nextValue,
		hasNextValue,
		clickedNext,
		prevValue,
		hasPrevValue,
		clickedPrev,
		currentValueIndex,
		settingValues,
		hasNumericValues,
		getValueWidth,
		useRadios,
		label,
		$_currentSetting,
		$_screen,
		$_formatValue,
		$_groupsResetStatus,
		$_hasPrev,
		$_hasNext
	});

	$$self.$inject_state = $$props => {
		if ('_screen' in $$props) $$subscribe__screen($$invalidate(0, _screen = $$props._screen));
		if ('menuWidth' in $$props) $$invalidate(1, menuWidth = $$props.menuWidth);
		if ('nextValue' in $$props) $$invalidate(15, nextValue = $$props.nextValue);
		if ('hasNextValue' in $$props) $$invalidate(2, hasNextValue = $$props.hasNextValue);
		if ('clickedNext' in $$props) $$invalidate(7, clickedNext = $$props.clickedNext);
		if ('prevValue' in $$props) $$invalidate(16, prevValue = $$props.prevValue);
		if ('hasPrevValue' in $$props) $$invalidate(3, hasPrevValue = $$props.hasPrevValue);
		if ('clickedPrev' in $$props) $$invalidate(8, clickedPrev = $$props.clickedPrev);
		if ('currentValueIndex' in $$props) $$invalidate(17, currentValueIndex = $$props.currentValueIndex);
		if ('settingValues' in $$props) $$invalidate(18, settingValues = $$props.settingValues);
		if ('hasNumericValues' in $$props) $$invalidate(9, hasNumericValues = $$props.hasNumericValues);
		if ('getValueWidth' in $$props) $$invalidate(19, getValueWidth = $$props.getValueWidth);
		if ('useRadios' in $$props) $$invalidate(10, useRadios = $$props.useRadios);
		if ('label' in $$props) $$invalidate(11, label = $$props.label);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$_currentSetting, $_formatValue*/ 80) {
			$$invalidate(11, label = `${$_currentSetting.label}: ${$_formatValue($_currentSetting.value)}`);
		}

		if ($$self.$$.dirty & /*$_currentSetting*/ 16) {
			$$invalidate(18, settingValues = $_currentSetting.values || []);
		}

		if ($$self.$$.dirty & /*$_formatValue, $_screen*/ 96) {
			$$invalidate(19, getValueWidth = value => $_formatValue(value).length * $_screen?.glyph.width);
		}

		if ($$self.$$.dirty & /*menuWidth, settingValues, getValueWidth*/ 786434) {
			$$invalidate(10, useRadios = menuWidth >= reduce(settingValues, (acc, value) => getValueWidth(value) + gap + acc, 0));
		}

		if ($$self.$$.dirty & /*settingValues*/ 262144) {
			$$invalidate(9, hasNumericValues = isNumber(settingValues[0]));
		}

		if ($$self.$$.dirty & /*settingValues, $_currentSetting*/ 262160) {
			$$invalidate(17, currentValueIndex = findIndex(settingValues, is($_currentSetting.value)));
		}

		if ($$self.$$.dirty & /*settingValues, currentValueIndex*/ 393216) {
			$$invalidate(16, prevValue = settingValues[currentValueIndex - 1]);
		}

		if ($$self.$$.dirty & /*settingValues, currentValueIndex*/ 393216) {
			$$invalidate(15, nextValue = settingValues[currentValueIndex + 1]);
		}

		if ($$self.$$.dirty & /*prevValue*/ 65536) {
			$$invalidate(3, hasPrevValue = isNotNil(prevValue));
		}

		if ($$self.$$.dirty & /*nextValue*/ 32768) {
			$$invalidate(2, hasNextValue = isNotNil(nextValue));
		}

		if ($$self.$$.dirty & /*hasPrevValue, prevValue*/ 65544) {
			$$invalidate(8, clickedPrev = () => hasPrevValue && updateCurrentValue(prevValue));
		}

		if ($$self.$$.dirty & /*hasNextValue, nextValue*/ 32772) {
			$$invalidate(7, clickedNext = () => hasNextValue && updateCurrentValue(nextValue));
		}
	};

	return [
		_screen,
		menuWidth,
		hasNextValue,
		hasPrevValue,
		$_currentSetting,
		$_screen,
		$_formatValue,
		clickedNext,
		clickedPrev,
		hasNumericValues,
		useRadios,
		label,
		$_groupsResetStatus,
		$_hasPrev,
		$_hasNext,
		nextValue,
		prevValue,
		currentValueIndex,
		settingValues,
		getValueWidth,
		click_handler,
		click_handler_1,
		change_handler,
		input_handler,
		toggled_handler,
		menu_elementresize_handler
	];
}

class A11yMenu extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$2(this, options, instance$b, create_fragment$b, safe_not_equal, { _screen: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "A11yMenu",
			options,
			id: create_fragment$b.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*_screen*/ ctx[0] === undefined && !('_screen' in props)) {
			console.warn("<A11yMenu> was created without expected prop '_screen'");
		}
	}

	get _screen() {
		throw new Error("<A11yMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set _screen(value) {
		throw new Error("<A11yMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var A11yMenu$1 = A11yMenu;

const isServerSide = typeof window === 'undefined';

const isClientSide = !isServerSide;

var browserCookies = {};

(function (exports) {
exports.defaults = {};

exports.set = function(name, value, options) {
  // Retrieve options and defaults
  var opts = options || {};
  var defaults = exports.defaults;

  // Apply default value for unspecified options
  var expires  = opts.expires  || defaults.expires;
  var domain   = opts.domain   || defaults.domain;
  var path     = opts.path     !== undefined ? opts.path     : (defaults.path !== undefined ? defaults.path : '/');
  var secure   = opts.secure   !== undefined ? opts.secure   : defaults.secure;
  var httponly = opts.httponly !== undefined ? opts.httponly : defaults.httponly;
  var samesite = opts.samesite !== undefined ? opts.samesite : defaults.samesite;

  // Determine cookie expiration date
  // If succesful the result will be a valid Date, otherwise it will be an invalid Date or false(ish)
  var expDate = expires ? new Date(
      // in case expires is an integer, it should specify the number of days till the cookie expires
      typeof expires === 'number' ? new Date().getTime() + (expires * 864e5) :
      // else expires should be either a Date object or in a format recognized by Date.parse()
      expires
  ) : 0;

  // Set cookie
  document.cookie = name.replace(/[^+#$&^`|]/g, encodeURIComponent)                // Encode cookie name
  .replace('(', '%28')
  .replace(')', '%29') +
  '=' + value.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) +                  // Encode cookie value (RFC6265)
  (expDate && expDate.getTime() >= 0 ? ';expires=' + expDate.toUTCString() : '') + // Add expiration date
  (domain   ? ';domain=' + domain     : '') +                                      // Add domain
  (path     ? ';path='   + path       : '') +                                      // Add path
  (secure   ? ';secure'               : '') +                                      // Add secure option
  (httponly ? ';httponly'             : '') +                                      // Add httponly option
  (samesite ? ';samesite=' + samesite : '');                                       // Add samesite option
};

exports.get = function(name) {
  var cookies = document.cookie.split(';');
  
  // Iterate all cookies
  while(cookies.length) {
    var cookie = cookies.pop();

    // Determine separator index ("name=value")
    var separatorIndex = cookie.indexOf('=');

    // IE<11 emits the equal sign when the cookie value is empty
    separatorIndex = separatorIndex < 0 ? cookie.length : separatorIndex;

    var cookie_name = decodeURIComponent(cookie.slice(0, separatorIndex).replace(/^\s+/, ''));

    // Return cookie value if the name matches
    if (cookie_name === name) {
      return decodeURIComponent(cookie.slice(separatorIndex + 1));
    }
  }

  // Return `null` as the cookie was not found
  return null;
};

exports.erase = function(name, options) {
  exports.set(name, '', {
    expires:  -1,
    domain:   options && options.domain,
    path:     options && options.path,
    secure:   0,
    httponly: 0}
  );
};

exports.all = function() {
  var all = {};
  var cookies = document.cookie.split(';');

  // Iterate all cookies
  while(cookies.length) {
    var cookie = cookies.pop();

    // Determine separator index ("name=value")
    var separatorIndex = cookie.indexOf('=');

    // IE<11 emits the equal sign when the cookie value is empty
    separatorIndex = separatorIndex < 0 ? cookie.length : separatorIndex;

    // add the cookie name and value to the `all` object
    var cookie_name = decodeURIComponent(cookie.slice(0, separatorIndex).replace(/^\s+/, ''));
    all[cookie_name] = decodeURIComponent(cookie.slice(separatorIndex + 1));
  }

  return all;
};
}(browserCookies));

/**
 * https://bugs.webkit.org/show_bug.cgi?id=226547
 * Safari has a horrible bug where IDB requests can hang while the browser is starting up.
 * The only solution is to keep nudging it until it's awake.
 * This probably creates garbage, but garbage is better than totally failing.
 */
function idbReady() {
    const isSafari = !navigator.userAgentData &&
        /Safari\//.test(navigator.userAgent) &&
        !/Chrom(e|ium)\//.test(navigator.userAgent);
    // No point putting other browsers or older versions of Safari through this mess.
    if (!isSafari || !indexedDB.databases)
        return Promise.resolve();
    let intervalId;
    return new Promise((resolve) => {
        const tryIdb = () => indexedDB.databases().finally(resolve);
        intervalId = setInterval(tryIdb, 100);
        tryIdb();
    }).finally(() => clearInterval(intervalId));
}

function promisifyRequest(request) {
    return new Promise((resolve, reject) => {
        // @ts-ignore - file size hacks
        request.oncomplete = request.onsuccess = () => resolve(request.result);
        // @ts-ignore - file size hacks
        request.onabort = request.onerror = () => reject(request.error);
    });
}
function createStore(dbName, storeName) {
    const dbp = idbReady().then(() => {
        const request = indexedDB.open(dbName);
        request.onupgradeneeded = () => request.result.createObjectStore(storeName);
        return promisifyRequest(request);
    });
    return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
let defaultGetStoreFunc;
function defaultGetStore() {
    if (!defaultGetStoreFunc) {
        defaultGetStoreFunc = createStore('keyval-store', 'keyval');
    }
    return defaultGetStoreFunc;
}
/**
 * Get a value by its key.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function get(key, customStore = defaultGetStore()) {
    return customStore('readonly', (store) => promisifyRequest(store.get(key)));
}
/**
 * Set a value with a key.
 *
 * @param key
 * @param value
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function set(key, value, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.put(value, key);
        return promisifyRequest(store.transaction);
    });
}
/**
 * Delete a particular key from the store.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function del(key, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.delete(key);
        return promisifyRequest(store.transaction);
    });
}
function getBrowserStorage(browserStorage, listenExternalChanges = false) {
    const listeners = [];
    const listenerFunction = (event) => {
        const eventKey = event.key;
        if (event.storageArea === browserStorage) {
            listeners
                .filter(({ key }) => key === eventKey)
                .forEach(({ listener }) => {
                let value = event.newValue;
                try {
                    value = JSON.parse(event.newValue);
                }
                catch (e) {
                    // Do nothing
                    // use the value "as is"
                }
                listener(value);
            });
        }
    };
    const connect = () => {
        if (listenExternalChanges && typeof window !== "undefined" && (window === null || window === void 0 ? void 0 : window.addEventListener)) {
            window.addEventListener("storage", listenerFunction);
        }
    };
    const disconnect = () => {
        if (listenExternalChanges && typeof window !== "undefined" && (window === null || window === void 0 ? void 0 : window.removeEventListener)) {
            window.removeEventListener("storage", listenerFunction);
        }
    };
    return {
        addListener(key, listener) {
            listeners.push({ key, listener });
            if (listeners.length === 1) {
                connect();
            }
        },
        removeListener(key, listener) {
            const index = listeners.indexOf({ key, listener });
            if (index !== -1) {
                listeners.splice(index, 1);
            }
            if (listeners.length === 0) {
                disconnect();
            }
        },
        getValue(key) {
            let value = browserStorage.getItem(key);
            if (value !== null && value !== undefined) {
                try {
                    value = JSON.parse(value);
                }
                catch (e) {
                    // Do nothing
                    // use the value "as is"
                }
            }
            return value;
        },
        deleteValue(key) {
            browserStorage.removeItem(key);
        },
        setValue(key, value) {
            browserStorage.setItem(key, JSON.stringify(value));
        }
    };
}
/**
 * Storage implementation that use the browser local storage
 * @param {boolean} listenExternalChanges - Update the store if the localStorage is updated from another page
 */
function localStorage(listenExternalChanges = false) {
    if (typeof window !== "undefined" && (window === null || window === void 0 ? void 0 : window.localStorage)) {
        return getBrowserStorage(window.localStorage, listenExternalChanges);
    }
    console.warn("Unable to find the localStorage. No data will be persisted.");
    return noopStorage();
}
/**
 * Storage implementation that use the browser session storage
 * @param {boolean} listenExternalChanges - Update the store if the sessionStorage is updated from another page
 */
function sessionStorage(listenExternalChanges = false) {
    if (typeof window !== "undefined" && (window === null || window === void 0 ? void 0 : window.sessionStorage)) {
        return getBrowserStorage(window.sessionStorage, listenExternalChanges);
    }
    console.warn("Unable to find the sessionStorage. No data will be persisted.");
    return noopStorage();
}
/**
 * Storage implementation that use the browser cookies
 */
function cookieStorage() {
    if (typeof document === "undefined" || typeof (document === null || document === void 0 ? void 0 : document.cookie) !== "string") {
        console.warn("Unable to find the cookies. No data will be persisted.");
        return noopStorage();
    }
    return {
        getValue(key) {
            const value = browserCookies.get(key);
            if (value === null) {
                return null;
            }
            try {
                return JSON.parse(value);
            }
            catch (e) {
                return value;
            }
        },
        deleteValue(key) {
            browserCookies.erase(key, { samesite: "Strict" });
        },
        setValue(key, value) {
            browserCookies.set(key, JSON.stringify(value), { samesite: "Strict" });
        }
    };
}
/**
 * Storage implementation that use the browser IndexedDB
 */
function indexedDBStorage() {
    if (typeof indexedDB !== "object" || typeof window === "undefined" || typeof (window === null || window === void 0 ? void 0 : window.indexedDB) !== "object") {
        console.warn("Unable to find the IndexedDB. No data will be persisted.");
        return noopSelfUpdateStorage();
    }
    const database = createStore("svelte-persist", "persist");
    const listeners = [];
    const listenerFunction = (eventKey, newValue) => {
        if (newValue === undefined) {
            return;
        }
        listeners
            .filter(({ key }) => key === eventKey)
            .forEach(({ listener }) => listener(newValue));
    };
    return {
        addListener(key, listener) {
            listeners.push({ key, listener });
        },
        removeListener(key, listener) {
            const index = listeners.indexOf({ key, listener });
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        },
        getValue(key) {
            get(key, database).then(value => listenerFunction(key, value));
            return null;
        },
        setValue(key, value) {
            set(key, value, database);
        },
        deleteValue(key) {
            del(key, database);
        }
    };
}
/**
 * Storage implementation that do nothing
 */
function noopStorage() {
    return {
        getValue() {
            return null;
        },
        deleteValue() {
            // Do nothing
        },
        setValue() {
            // Do nothing
        }
    };
}
function noopSelfUpdateStorage() {
    return {
        addListener() {
            // Do nothing
        },
        removeListener() {
            // Do nothing
        },
        getValue() {
            return null;
        },
        deleteValue() {
            // Do nothing
        },
        setValue() {
            // Do nothing
        }
    };
}

/* ../../components/ui/src/io/storage/StorageIO.svelte generated by Svelte v3.44.2 */

function create_fragment$a(ctx) {
	const block = {
		c: noop,
		l: noop,
		m: noop,
		p: noop,
		i: noop,
		o: noop,
		d: noop
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$a.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const dbFactories = {
	cookie: () => cookieStorage(),
	indexedDB: () => indexedDBStorage(),
	localStorage: isReactive => localStorage(isReactive),
	noop: () => noopStorage(),
	sessionStorage: isReactive => sessionStorage(isReactive)
};

const bind = ({ _store, defaultValue, isReactive, key, type }) => {
	const database = dbFactories[type](isReactive);
	const initialValue = database.getValue(key) || defaultValue;
	_store.set(initialValue);

	const syncStore = () => {
		const currentValue = database.getValue(key) || defaultValue;
		_store.set(currentValue);
	};

	const updateDb = newValue => {
		if (collectionCompare(defaultValue, newValue)) {
			database.deleteValue(key);
		} else {
			database.setValue(key, newValue);
		}
	};

	// When we update the store, we also update the database
	_store.subscribe(updateDb);

	// When the database changes, we sync the store
	// e.g. you can edit `localStorage` in dev tools and expect the UI to
	// update because it's bound to the store.
	database.addListener?.(key, syncStore);

	return () => {
		database.removeListener?.(key, syncStore);
	};
};

function instance$a($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('StorageIO', slots, []);
	let { _store = writable() } = $$props;
	let { defaultValue = null } = $$props;
	let { isReactive = false } = $$props;
	let { key = null } = $$props;
	let { type = 'noop' } = $$props;
	let unbind;
	const writable_props = ['_store', 'defaultValue', 'isReactive', 'key', 'type'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<StorageIO> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('_store' in $$props) $$invalidate(1, _store = $$props._store);
		if ('defaultValue' in $$props) $$invalidate(2, defaultValue = $$props.defaultValue);
		if ('isReactive' in $$props) $$invalidate(3, isReactive = $$props.isReactive);
		if ('key' in $$props) $$invalidate(4, key = $$props.key);
		if ('type' in $$props) $$invalidate(0, type = $$props.type);
	};

	$$self.$capture_state = () => ({
		cookieStorage,
		indexedDBStorage,
		localStorage,
		noopStorage,
		sessionStorage,
		isEqual: collectionCompare,
		writable,
		isClientSide,
		dbFactories,
		bind,
		_store,
		defaultValue,
		isReactive,
		key,
		type,
		unbind
	});

	$$self.$inject_state = $$props => {
		if ('_store' in $$props) $$invalidate(1, _store = $$props._store);
		if ('defaultValue' in $$props) $$invalidate(2, defaultValue = $$props.defaultValue);
		if ('isReactive' in $$props) $$invalidate(3, isReactive = $$props.isReactive);
		if ('key' in $$props) $$invalidate(4, key = $$props.key);
		if ('type' in $$props) $$invalidate(0, type = $$props.type);
		if ('unbind' in $$props) $$invalidate(5, unbind = $$props.unbind);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*type*/ 1) {
			if (!(type in dbFactories)) {
				$$invalidate(0, type = 'noop');
			}
		}

		if ($$self.$$.dirty & /*key, type, _store, unbind, defaultValue, isReactive*/ 63) {
			if (isClientSide && key && type && _store) {
				unbind?.();

				$$invalidate(5, unbind = bind({
					_store,
					defaultValue,
					isReactive,
					key,
					type
				}));
			}
		}
	};

	return [type, _store, defaultValue, isReactive, key, unbind];
}

class StorageIO extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$2(this, options, instance$a, create_fragment$a, safe_not_equal, {
			_store: 1,
			defaultValue: 2,
			isReactive: 3,
			key: 4,
			type: 0
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "StorageIO",
			options,
			id: create_fragment$a.name
		});
	}

	get _store() {
		throw new Error("<StorageIO>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set _store(value) {
		throw new Error("<StorageIO>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get defaultValue() {
		throw new Error("<StorageIO>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set defaultValue(value) {
		throw new Error("<StorageIO>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isReactive() {
		throw new Error("<StorageIO>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isReactive(value) {
		throw new Error("<StorageIO>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get key() {
		throw new Error("<StorageIO>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set key(value) {
		throw new Error("<StorageIO>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get type() {
		throw new Error("<StorageIO>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set type(value) {
		throw new Error("<StorageIO>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var StorageIO$1 = StorageIO;

/* ../../components/ui/src/a11y/menu/ColorCorrection.svelte generated by Svelte v3.44.2 */

const file$5 = "../../components/ui/src/a11y/menu/ColorCorrection.svelte";

function create_fragment$9(ctx) {
	let svg;
	let defs;
	let filter0;
	let feColorMatrix0;
	let filter1;
	let feColorMatrix1;
	let filter2;
	let feColorMatrix2;
	let filter3;
	let feColorMatrix3;
	let filter4;
	let feColorMatrix4;
	let filter5;
	let feColorMatrix5;
	let filter6;
	let feColorMatrix6;

	const block = {
		c: function create() {
			svg = svg_element("svg");
			defs = svg_element("defs");
			filter0 = svg_element("filter");
			feColorMatrix0 = svg_element("feColorMatrix");
			filter1 = svg_element("filter");
			feColorMatrix1 = svg_element("feColorMatrix");
			filter2 = svg_element("filter");
			feColorMatrix2 = svg_element("feColorMatrix");
			filter3 = svg_element("filter");
			feColorMatrix3 = svg_element("feColorMatrix");
			filter4 = svg_element("filter");
			feColorMatrix4 = svg_element("feColorMatrix");
			filter5 = svg_element("filter");
			feColorMatrix5 = svg_element("feColorMatrix");
			filter6 = svg_element("filter");
			feColorMatrix6 = svg_element("feColorMatrix");
			this.h();
		},
		l: function claim(nodes) {
			svg = claim_svg_element(nodes, "svg", {
				width: true,
				height: true,
				"aria-hidden": true,
				class: true
			});

			var svg_nodes = children(svg);
			defs = claim_svg_element(svg_nodes, "defs", {});
			var defs_nodes = children(defs);
			filter0 = claim_svg_element(defs_nodes, "filter", { id: true });
			var filter0_nodes = children(filter0);
			feColorMatrix0 = claim_svg_element(filter0_nodes, "feColorMatrix", { values: true });
			children(feColorMatrix0).forEach(detach_dev);
			filter0_nodes.forEach(detach_dev);
			filter1 = claim_svg_element(defs_nodes, "filter", { id: true });
			var filter1_nodes = children(filter1);
			feColorMatrix1 = claim_svg_element(filter1_nodes, "feColorMatrix", { values: true });
			children(feColorMatrix1).forEach(detach_dev);
			filter1_nodes.forEach(detach_dev);
			filter2 = claim_svg_element(defs_nodes, "filter", { id: true });
			var filter2_nodes = children(filter2);
			feColorMatrix2 = claim_svg_element(filter2_nodes, "feColorMatrix", { values: true });
			children(feColorMatrix2).forEach(detach_dev);
			filter2_nodes.forEach(detach_dev);
			filter3 = claim_svg_element(defs_nodes, "filter", { id: true });
			var filter3_nodes = children(filter3);
			feColorMatrix3 = claim_svg_element(filter3_nodes, "feColorMatrix", { values: true });
			children(feColorMatrix3).forEach(detach_dev);
			filter3_nodes.forEach(detach_dev);
			filter4 = claim_svg_element(defs_nodes, "filter", { id: true });
			var filter4_nodes = children(filter4);
			feColorMatrix4 = claim_svg_element(filter4_nodes, "feColorMatrix", { values: true });
			children(feColorMatrix4).forEach(detach_dev);
			filter4_nodes.forEach(detach_dev);
			filter5 = claim_svg_element(defs_nodes, "filter", { id: true });
			var filter5_nodes = children(filter5);
			feColorMatrix5 = claim_svg_element(filter5_nodes, "feColorMatrix", { values: true });
			children(feColorMatrix5).forEach(detach_dev);
			filter5_nodes.forEach(detach_dev);
			filter6 = claim_svg_element(defs_nodes, "filter", { id: true });
			var filter6_nodes = children(filter6);
			feColorMatrix6 = claim_svg_element(filter6_nodes, "feColorMatrix", { values: true });
			children(feColorMatrix6).forEach(detach_dev);
			filter6_nodes.forEach(detach_dev);
			defs_nodes.forEach(detach_dev);
			svg_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(feColorMatrix0, "values", " 0.213  0.715  0.072  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.213  0.715  0.072  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.213  0.715  0.072  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.000  0.000  0.000  1.000  0.000");
			add_location(feColorMatrix0, file$5, 12, 3, 690);
			attr_dev(filter0, "id", "achromatopsia");
			add_location(filter0, file$5, 11, 2, 659);
			attr_dev(feColorMatrix1, "values", " 0.367  0.861 -0.228  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.280  0.673  0.047  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.012  0.043  0.969  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.000  0.000  0.000  1.000  0.000");
			add_location(feColorMatrix1, file$5, 19, 3, 928);
			attr_dev(filter1, "id", "deuteranopia");
			add_location(filter1, file$5, 18, 2, 898);
			attr_dev(feColorMatrix2, "values", " 0.152  1.053 -0.205  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.115  0.786  0.099  0.000  0.000\n\t\t\t\t\t\t\t\t\t-0.004 -0.048  1.052  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.000  0.000  0.000  1.000  0.000");
			add_location(feColorMatrix2, file$5, 26, 3, 1164);
			attr_dev(filter2, "id", "protanopia");
			add_location(filter2, file$5, 25, 2, 1136);
			attr_dev(feColorMatrix3, "values", " 1.256 -0.077 -0.179  0.000  0.000\n\t\t\t\t\t\t\t\t\t-0.078  0.931  0.148  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.005  0.691  0.304  0.000  0.000\n\t\t\t\t\t\t\t\t\t0.000  0.000  0.000  1.000  0.000");
			add_location(feColorMatrix3, file$5, 33, 3, 1401);
			attr_dev(filter3, "id", "tritanopia");
			add_location(filter3, file$5, 32, 2, 1373);
			attr_dev(feColorMatrix4, "values", " 0, 0.5, 0.5, 0, 0,\n\t\t\t\t\t\t\t\t\t0.5, 0.5, 0, 0, 0,\n\t\t\t\t\t\t\t\t\t0, 0, 1, 0, 0,\n\t\t\t\t\t\t\t\t\t0, 0, 0, 1, 0");
			add_location(feColorMatrix4, file$5, 44, 3, 1758);
			attr_dev(filter4, "id", "recolor-deuteranopia");
			add_location(filter4, file$5, 43, 2, 1720);
			attr_dev(feColorMatrix5, "values", " 0.5, 0, 0.5, 0, 0,\n\t\t\t\t\t\t\t\t\t0, 1, 0, 0, 0,\n\t\t\t\t\t\t\t\t\t0.5, 0.5, 0, 0, 0,\n\t\t\t\t\t\t\t\t\t0, 0, 0, 1, 0");
			add_location(feColorMatrix5, file$5, 51, 3, 1933);
			attr_dev(filter5, "id", "recolor-protanopia");
			add_location(filter5, file$5, 50, 2, 1897);
			attr_dev(feColorMatrix6, "values", " 0.5, 0, 0.5, 0, 0,\n\t\t\t\t\t\t\t\t\t0, 1, 0, 0, 0,\n\t\t\t\t\t\t\t\t\t0.5, 0.5, 0, 0, 0,\n\t\t\t\t\t\t\t\t\t0, 0, 0, 1, 0");
			add_location(feColorMatrix6, file$5, 58, 3, 2108);
			attr_dev(filter6, "id", "recolor-tritanopia");
			add_location(filter6, file$5, 57, 2, 2072);
			add_location(defs, file$5, 10, 1, 650);
			attr_dev(svg, "width", "0");
			attr_dev(svg, "height", "0");
			attr_dev(svg, "aria-hidden", "true");
			attr_dev(svg, "class", "svelte-v6m6bt");
			add_location(svg, file$5, 9, 0, 603);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, svg, anchor);
			append_hydration_dev(svg, defs);
			append_hydration_dev(defs, filter0);
			append_hydration_dev(filter0, feColorMatrix0);
			append_hydration_dev(defs, filter1);
			append_hydration_dev(filter1, feColorMatrix1);
			append_hydration_dev(defs, filter2);
			append_hydration_dev(filter2, feColorMatrix2);
			append_hydration_dev(defs, filter3);
			append_hydration_dev(filter3, feColorMatrix3);
			append_hydration_dev(defs, filter4);
			append_hydration_dev(filter4, feColorMatrix4);
			append_hydration_dev(defs, filter5);
			append_hydration_dev(filter5, feColorMatrix5);
			append_hydration_dev(defs, filter6);
			append_hydration_dev(filter6, feColorMatrix6);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$9.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$9($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ColorCorrection', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ColorCorrection> was created with unknown prop '${key}'`);
	});

	return [];
}

class ColorCorrection extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$2(this, options, instance$9, create_fragment$9, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ColorCorrection",
			options,
			id: create_fragment$9.name
		});
	}
}

var ColorCorrection$1 = ColorCorrection;

/* ../../components/ui/src/a11y/menu/A11yMenuDriver.svelte generated by Svelte v3.44.2 */

// (31:0) {#if useLocalStorage}
function create_if_block$4(ctx) {
	let storageio;
	let current;

	storageio = new StorageIO$1({
			props: {
				_store: _a11ySettings,
				defaultValue: /*defaultValue*/ ctx[1],
				isReactive: true,
				key: "a11ySettings",
				type: "localStorage"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(storageio.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(storageio.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(storageio, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const storageio_changes = {};
			if (dirty & /*defaultValue*/ 2) storageio_changes.defaultValue = /*defaultValue*/ ctx[1];
			storageio.$set(storageio_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(storageio.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(storageio.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(storageio, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$4.name,
		type: "if",
		source: "(31:0) {#if useLocalStorage}",
		ctx
	});

	return block;
}

function create_fragment$8(ctx) {
	let colorcorrection;
	let t;
	let if_block_anchor;
	let current;
	colorcorrection = new ColorCorrection$1({ $$inline: true });
	let if_block = /*useLocalStorage*/ ctx[0] && create_if_block$4(ctx);

	const block = {
		c: function create() {
			create_component(colorcorrection.$$.fragment);
			t = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			claim_component(colorcorrection.$$.fragment, nodes);
			t = claim_space(nodes);
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			mount_component(colorcorrection, target, anchor);
			insert_hydration_dev(target, t, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_hydration_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*useLocalStorage*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*useLocalStorage*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$4(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
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
			transition_in(colorcorrection.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(colorcorrection.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(colorcorrection, detaching);
			if (detaching) detach_dev(t);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
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

const colorTargetSelector = 'html';
const textTargetSelector = 'body';

function instance$8($$self, $$props, $$invalidate) {
	let colorTargetNode;
	let textTargetNode;
	let $_a11yTextStyles;
	let $_a11yColorStyles;
	validate_store(_a11yTextStyles, '_a11yTextStyles');
	component_subscribe($$self, _a11yTextStyles, $$value => $$invalidate(5, $_a11yTextStyles = $$value));
	validate_store(_a11yColorStyles, '_a11yColorStyles');
	component_subscribe($$self, _a11yColorStyles, $$value => $$invalidate(6, $_a11yColorStyles = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('A11yMenuDriver', slots, []);
	let { defaults = null } = $$props;
	let { useLocalStorage = true } = $$props;
	let defaultValue;
	const writable_props = ['defaults', 'useLocalStorage'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<A11yMenuDriver> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('defaults' in $$props) $$invalidate(2, defaults = $$props.defaults);
		if ('useLocalStorage' in $$props) $$invalidate(0, useLocalStorage = $$props.useLocalStorage);
	};

	$$self.$capture_state = () => ({
		StorageIO: StorageIO$1,
		isClientSide,
		ColorCorrection: ColorCorrection$1,
		_a11yColorStyles,
		_a11yTextStyles,
		_a11ySettings,
		applyStyles,
		mergeDefaultSettings,
		colorTargetSelector,
		textTargetSelector,
		defaults,
		useLocalStorage,
		defaultValue,
		textTargetNode,
		colorTargetNode,
		$_a11yTextStyles,
		$_a11yColorStyles
	});

	$$self.$inject_state = $$props => {
		if ('defaults' in $$props) $$invalidate(2, defaults = $$props.defaults);
		if ('useLocalStorage' in $$props) $$invalidate(0, useLocalStorage = $$props.useLocalStorage);
		if ('defaultValue' in $$props) $$invalidate(1, defaultValue = $$props.defaultValue);
		if ('textTargetNode' in $$props) $$invalidate(3, textTargetNode = $$props.textTargetNode);
		if ('colorTargetNode' in $$props) $$invalidate(4, colorTargetNode = $$props.colorTargetNode);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*defaults*/ 4) {
			defaults && $$invalidate(1, defaultValue = mergeDefaultSettings(defaults));
		}

		if ($$self.$$.dirty & /*colorTargetNode*/ 16) {
			colorTargetNode?.classList?.add(['colorCorrected']);
		}

		if ($$self.$$.dirty & /*colorTargetNode, $_a11yColorStyles*/ 80) {
			colorTargetNode && applyStyles(colorTargetNode.style, $_a11yColorStyles);
		}

		if ($$self.$$.dirty & /*textTargetNode, $_a11yTextStyles*/ 40) {
			textTargetNode && applyStyles(textTargetNode.style, $_a11yTextStyles);
		}
	};

	$$invalidate(4, colorTargetNode = isClientSide && document.querySelector(colorTargetSelector));
	$$invalidate(3, textTargetNode = isClientSide && document.querySelector(textTargetSelector));

	return [
		useLocalStorage,
		defaultValue,
		defaults,
		textTargetNode,
		colorTargetNode,
		$_a11yTextStyles,
		$_a11yColorStyles
	];
}

class A11yMenuDriver extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$2(this, options, instance$8, create_fragment$8, safe_not_equal, { defaults: 2, useLocalStorage: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "A11yMenuDriver",
			options,
			id: create_fragment$8.name
		});
	}

	get defaults() {
		throw new Error("<A11yMenuDriver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set defaults(value) {
		throw new Error("<A11yMenuDriver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get useLocalStorage() {
		throw new Error("<A11yMenuDriver>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set useLocalStorage(value) {
		throw new Error("<A11yMenuDriver>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var A11yMenuDriver$1 = A11yMenuDriver;

const setupResizeObserver = () => {
	const _writable = writable({blockSize: 0, inlineSize: 0});

	function resizeObserver (node, type = 'borderBoxSize') {
		const callback = entries => _writable.set(entries[0][type][0]);
		const observer = new ResizeObserver(callback);
		observer.observe(node);
		return () => observer.disconnect();
	}

	return {_writable, resizeObserver}
};

/* ../../components/ui/src/sensors/screen/WindowBinder.svelte generated by Svelte v3.44.2 */

function create_fragment$7(ctx) {
	let mounted;
	let dispose;
	add_render_callback(/*onwindowresize*/ ctx[3]);

	const block = {
		c: noop,
		l: noop,
		m: function mount(target, anchor) {
			if (!mounted) {
				dispose = [
					listen_dev(
						window,
						"resize",
						function () {
							if (is_function(/*onResize*/ ctx[2])) /*onResize*/ ctx[2].apply(this, arguments);
						},
						false,
						false,
						false
					),
					listen_dev(window, "resize", /*onwindowresize*/ ctx[3])
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			mounted = false;
			run_all(dispose);
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
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('WindowBinder', slots, []);
	let { innerHeight = null } = $$props;
	let { innerWidth = null } = $$props;
	let { onResize } = $$props;
	const writable_props = ['innerHeight', 'innerWidth', 'onResize'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<WindowBinder> was created with unknown prop '${key}'`);
	});

	function onwindowresize() {
		$$invalidate(1, innerWidth = window.innerWidth);
		$$invalidate(0, innerHeight = window.innerHeight);
	}

	$$self.$$set = $$props => {
		if ('innerHeight' in $$props) $$invalidate(0, innerHeight = $$props.innerHeight);
		if ('innerWidth' in $$props) $$invalidate(1, innerWidth = $$props.innerWidth);
		if ('onResize' in $$props) $$invalidate(2, onResize = $$props.onResize);
	};

	$$self.$capture_state = () => ({ innerHeight, innerWidth, onResize });

	$$self.$inject_state = $$props => {
		if ('innerHeight' in $$props) $$invalidate(0, innerHeight = $$props.innerHeight);
		if ('innerWidth' in $$props) $$invalidate(1, innerWidth = $$props.innerWidth);
		if ('onResize' in $$props) $$invalidate(2, onResize = $$props.onResize);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [innerHeight, innerWidth, onResize, onwindowresize];
}

class WindowBinder extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$2(this, options, instance$7, create_fragment$7, safe_not_equal, {
			innerHeight: 0,
			innerWidth: 1,
			onResize: 2
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "WindowBinder",
			options,
			id: create_fragment$7.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*onResize*/ ctx[2] === undefined && !('onResize' in props)) {
			console.warn("<WindowBinder> was created without expected prop 'onResize'");
		}
	}

	get innerHeight() {
		throw new Error("<WindowBinder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set innerHeight(value) {
		throw new Error("<WindowBinder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get innerWidth() {
		throw new Error("<WindowBinder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set innerWidth(value) {
		throw new Error("<WindowBinder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get onResize() {
		throw new Error("<WindowBinder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set onResize(value) {
		throw new Error("<WindowBinder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var WindowBinder$1 = WindowBinder;

/* ../../components/ui/src/sensors/screen/ScreenSensor.svelte generated by Svelte v3.44.2 */
const file$4 = "../../components/ui/src/sensors/screen/ScreenSensor.svelte";

// (107:0) {#if shouldRender}
function create_if_block$3(ctx) {
	let windowbinder;
	let updating_innerHeight;
	let updating_innerWidth;
	let t0;
	let div;
	let span;
	let t1;
	let t2;
	let if_block_anchor;
	let current;
	let mounted;
	let dispose;

	function windowbinder_innerHeight_binding(value) {
		/*windowbinder_innerHeight_binding*/ ctx[12](value);
	}

	function windowbinder_innerWidth_binding(value) {
		/*windowbinder_innerWidth_binding*/ ctx[13](value);
	}

	let windowbinder_props = { onResize: /*updateScreen*/ ctx[9] };

	if (/*innerHeight*/ ctx[3] !== void 0) {
		windowbinder_props.innerHeight = /*innerHeight*/ ctx[3];
	}

	if (/*innerWidth*/ ctx[4] !== void 0) {
		windowbinder_props.innerWidth = /*innerWidth*/ ctx[4];
	}

	windowbinder = new WindowBinder$1({
			props: windowbinder_props,
			$$inline: true
		});

	binding_callbacks.push(() => bind$1(windowbinder, 'innerHeight', windowbinder_innerHeight_binding));
	binding_callbacks.push(() => bind$1(windowbinder, 'innerWidth', windowbinder_innerWidth_binding));
	let if_block = /*isDev*/ ctx[0] && /*$_sampleSize*/ ctx[2] && /*devInfo*/ ctx[5] && create_if_block_1$2(ctx);

	const block = {
		c: function create() {
			create_component(windowbinder.$$.fragment);
			t0 = space();
			div = element("div");
			span = element("span");
			t1 = text(/*sampleText*/ ctx[1]);
			t2 = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
			this.h();
		},
		l: function claim(nodes) {
			claim_component(windowbinder.$$.fragment, nodes);
			t0 = claim_space(nodes);
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			span = claim_element(div_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t1 = claim_text(span_nodes, /*sampleText*/ ctx[1]);
			span_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "svelte-c7ttbw");
			add_location(span, file$4, 113, 2, 2551);
			attr_dev(div, "class", "textSample svelte-c7ttbw");
			add_location(div, file$4, 112, 1, 2524);
		},
		m: function mount(target, anchor) {
			mount_component(windowbinder, target, anchor);
			insert_hydration_dev(target, t0, anchor);
			insert_hydration_dev(target, div, anchor);
			append_hydration_dev(div, span);
			append_hydration_dev(span, t1);
			insert_hydration_dev(target, t2, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_hydration_dev(target, if_block_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = action_destroyer(/*resizeObserver*/ ctx[8].call(null, span));
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			const windowbinder_changes = {};

			if (!updating_innerHeight && dirty & /*innerHeight*/ 8) {
				updating_innerHeight = true;
				windowbinder_changes.innerHeight = /*innerHeight*/ ctx[3];
				add_flush_callback(() => updating_innerHeight = false);
			}

			if (!updating_innerWidth && dirty & /*innerWidth*/ 16) {
				updating_innerWidth = true;
				windowbinder_changes.innerWidth = /*innerWidth*/ ctx[4];
				add_flush_callback(() => updating_innerWidth = false);
			}

			windowbinder.$set(windowbinder_changes);
			if (!current || dirty & /*sampleText*/ 2) set_data_dev(t1, /*sampleText*/ ctx[1]);

			if (/*isDev*/ ctx[0] && /*$_sampleSize*/ ctx[2] && /*devInfo*/ ctx[5]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1$2(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(windowbinder.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(windowbinder.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(windowbinder, detaching);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div);
			if (detaching) detach_dev(t2);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$3.name,
		type: "if",
		source: "(107:0) {#if shouldRender}",
		ctx
	});

	return block;
}

// (116:1) {#if isDev && $_sampleSize && devInfo}
function create_if_block_1$2(ctx) {
	let div;
	let p0;
	let t0;
	let t1_value = /*devInfo*/ ctx[5].DPPR + "";
	let t1;
	let t2;
	let p1;
	let t3;
	let t4_value = /*devInfo*/ ctx[5].Display + "";
	let t4;
	let t5;
	let p2;
	let t6;
	let t7_value = /*devInfo*/ ctx[5].Text + "";
	let t7;
	let t8;
	let p3;
	let t9;
	let t10_value = /*devInfo*/ ctx[5].Classes + "";
	let t10;
	let t11;
	let p4;
	let t12;
	let t13_value = /*devInfo*/ ctx[5].Orientation + "";
	let t13;
	let t14;
	let button;
	let t15;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = element("div");
			p0 = element("p");
			t0 = text("DPPR: ");
			t1 = text(t1_value);
			t2 = space();
			p1 = element("p");
			t3 = text("Display: ");
			t4 = text(t4_value);
			t5 = space();
			p2 = element("p");
			t6 = text("Text: ");
			t7 = text(t7_value);
			t8 = space();
			p3 = element("p");
			t9 = text("Classes: ");
			t10 = text(t10_value);
			t11 = space();
			p4 = element("p");
			t12 = text("Orientation: ");
			t13 = text(t13_value);
			t14 = space();
			button = element("button");
			t15 = text("Close");
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			p0 = claim_element(div_nodes, "P", {});
			var p0_nodes = children(p0);
			t0 = claim_text(p0_nodes, "DPPR: ");
			t1 = claim_text(p0_nodes, t1_value);
			p0_nodes.forEach(detach_dev);
			t2 = claim_space(div_nodes);
			p1 = claim_element(div_nodes, "P", {});
			var p1_nodes = children(p1);
			t3 = claim_text(p1_nodes, "Display: ");
			t4 = claim_text(p1_nodes, t4_value);
			p1_nodes.forEach(detach_dev);
			t5 = claim_space(div_nodes);
			p2 = claim_element(div_nodes, "P", {});
			var p2_nodes = children(p2);
			t6 = claim_text(p2_nodes, "Text: ");
			t7 = claim_text(p2_nodes, t7_value);
			p2_nodes.forEach(detach_dev);
			t8 = claim_space(div_nodes);
			p3 = claim_element(div_nodes, "P", {});
			var p3_nodes = children(p3);
			t9 = claim_text(p3_nodes, "Classes: ");
			t10 = claim_text(p3_nodes, t10_value);
			p3_nodes.forEach(detach_dev);
			t11 = claim_space(div_nodes);
			p4 = claim_element(div_nodes, "P", {});
			var p4_nodes = children(p4);
			t12 = claim_text(p4_nodes, "Orientation: ");
			t13 = claim_text(p4_nodes, t13_value);
			p4_nodes.forEach(detach_dev);
			t14 = claim_space(div_nodes);
			button = claim_element(div_nodes, "BUTTON", { class: true });
			var button_nodes = children(button);
			t15 = claim_text(button_nodes, "Close");
			button_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(p0, file$4, 117, 3, 2671);
			add_location(p1, file$4, 118, 3, 2702);
			add_location(p2, file$4, 119, 3, 2739);
			add_location(p3, file$4, 120, 3, 2770);
			add_location(p4, file$4, 121, 3, 2807);
			attr_dev(button, "class", "svelte-c7ttbw");
			add_location(button, file$4, 122, 3, 2852);
			attr_dev(div, "class", "devInfo svelte-c7ttbw");
			add_location(div, file$4, 116, 2, 2646);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			append_hydration_dev(div, p0);
			append_hydration_dev(p0, t0);
			append_hydration_dev(p0, t1);
			append_hydration_dev(div, t2);
			append_hydration_dev(div, p1);
			append_hydration_dev(p1, t3);
			append_hydration_dev(p1, t4);
			append_hydration_dev(div, t5);
			append_hydration_dev(div, p2);
			append_hydration_dev(p2, t6);
			append_hydration_dev(p2, t7);
			append_hydration_dev(div, t8);
			append_hydration_dev(div, p3);
			append_hydration_dev(p3, t9);
			append_hydration_dev(p3, t10);
			append_hydration_dev(div, t11);
			append_hydration_dev(div, p4);
			append_hydration_dev(p4, t12);
			append_hydration_dev(p4, t13);
			append_hydration_dev(div, t14);
			append_hydration_dev(div, button);
			append_hydration_dev(button, t15);

			if (!mounted) {
				dispose = listen_dev(button, "click", /*click_handler*/ ctx[14], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*devInfo*/ 32 && t1_value !== (t1_value = /*devInfo*/ ctx[5].DPPR + "")) set_data_dev(t1, t1_value);
			if (dirty & /*devInfo*/ 32 && t4_value !== (t4_value = /*devInfo*/ ctx[5].Display + "")) set_data_dev(t4, t4_value);
			if (dirty & /*devInfo*/ 32 && t7_value !== (t7_value = /*devInfo*/ ctx[5].Text + "")) set_data_dev(t7, t7_value);
			if (dirty & /*devInfo*/ 32 && t10_value !== (t10_value = /*devInfo*/ ctx[5].Classes + "")) set_data_dev(t10, t10_value);
			if (dirty & /*devInfo*/ 32 && t13_value !== (t13_value = /*devInfo*/ ctx[5].Orientation + "")) set_data_dev(t13, t13_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$2.name,
		type: "if",
		source: "(116:1) {#if isDev && $_sampleSize && devInfo}",
		ctx
	});

	return block;
}

function create_fragment$6(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*shouldRender*/ ctx[6] && create_if_block$3(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_hydration_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*shouldRender*/ ctx[6]) if_block.p(ctx, dirty);
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
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
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

const _screen = writable();
const defaultBreakpoints = [45, 90, 135, 180];
let instancesCount = 0;

function instance$6($$self, $$props, $$invalidate) {
	let sampleLength;
	let devInfo;

	let $_screen,
		$$unsubscribe__screen = noop;

	let $_sampleSize;
	validate_store(_screen, '_screen');
	component_subscribe($$self, _screen, $$value => $$invalidate(11, $_screen = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe__screen());
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ScreenSensor', slots, []);
	const makeClasses = pipe([mergeObjects, getTruthyValuesKeys, joinWithBlank]);

	// singleton
	const instanceId = instancesCount++;

	const shouldRender = instanceId === 0;

	// action
	const { _writable: _sampleSize, resizeObserver } = setupResizeObserver();

	validate_store(_sampleSize, '_sampleSize');
	component_subscribe($$self, _sampleSize, value => $$invalidate(2, $_sampleSize = value));
	let { isDev = false } = $$props;
	let { sampleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' } = $$props;
	let { breakpoints = defaultBreakpoints } = $$props;
	let innerHeight;
	let innerWidth;

	const updateScreen = () => {
		if (isServerSide) {
			return;
		}

		// geometry
		const display = {
			aspectRatio: window.innerWidth / window.innerHeight,
			height: window.innerHeight,
			orientation: window.screen.orientation,
			pixelRatio: window.devicePixelRatio,
			width: window.innerWidth
		};

		const glyph = {
			width: $_sampleSize.inlineSize / sampleLength,
			height: $_sampleSize.blockSize
		};

		const text = {
			maxChars: Math.floor(display.width / glyph.width),
			maxLines: Math.floor(display.height / glyph.height)
		};

		// flags
		const orientations = {
			landscape: display.aspectRatio >= 1,
			portrait: display.aspectRatio < 1
		};

		const sizes = {
			xSmall: text.maxChars < breakpoints[0],
			small: true,
			medium: text.maxChars >= breakpoints[1],
			large: text.maxChars >= breakpoints[2],
			xLarge: text.maxChars >= breakpoints[3]
		};

		// update
		_screen.set({
			classes: makeClasses([sizes, orientations]),
			display,
			glyph,
			orientations,
			sizes,
			text
		});
	};

	const writable_props = ['isDev', 'sampleText', 'breakpoints'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ScreenSensor> was created with unknown prop '${key}'`);
	});

	function windowbinder_innerHeight_binding(value) {
		innerHeight = value;
		$$invalidate(3, innerHeight);
	}

	function windowbinder_innerWidth_binding(value) {
		innerWidth = value;
		$$invalidate(4, innerWidth);
	}

	const click_handler = () => {
		$$invalidate(0, isDev = false);
	};

	$$self.$$set = $$props => {
		if ('isDev' in $$props) $$invalidate(0, isDev = $$props.isDev);
		if ('sampleText' in $$props) $$invalidate(1, sampleText = $$props.sampleText);
		if ('breakpoints' in $$props) $$invalidate(10, breakpoints = $$props.breakpoints);
	};

	$$self.$capture_state = () => ({
		writable,
		_screen,
		defaultBreakpoints,
		instancesCount,
		_,
		getTruthyValuesKeys,
		joinWithBlank,
		mergeObjects,
		isServerSide,
		setupResizeObserver,
		WindowBinder: WindowBinder$1,
		makeClasses,
		instanceId,
		shouldRender,
		_sampleSize,
		resizeObserver,
		isDev,
		sampleText,
		breakpoints,
		innerHeight,
		innerWidth,
		updateScreen,
		devInfo,
		sampleLength,
		$_screen,
		$_sampleSize
	});

	$$self.$inject_state = $$props => {
		if ('isDev' in $$props) $$invalidate(0, isDev = $$props.isDev);
		if ('sampleText' in $$props) $$invalidate(1, sampleText = $$props.sampleText);
		if ('breakpoints' in $$props) $$invalidate(10, breakpoints = $$props.breakpoints);
		if ('innerHeight' in $$props) $$invalidate(3, innerHeight = $$props.innerHeight);
		if ('innerWidth' in $$props) $$invalidate(4, innerWidth = $$props.innerWidth);
		if ('devInfo' in $$props) $$invalidate(5, devInfo = $$props.devInfo);
		if ('sampleLength' in $$props) sampleLength = $$props.sampleLength;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*sampleText*/ 2) {
			sampleLength = sampleText.length;
		}

		if ($$self.$$.dirty & /*$_sampleSize*/ 4) {
			$_sampleSize && updateScreen();
		}

		if ($$self.$$.dirty & /*$_screen*/ 2048) {
			$$invalidate(5, devInfo = shouldRender && $_screen && {
				Classes: $_screen.classes,
				Display: `${$_screen.display.width} x ${$_screen.display.height} px`,
				DPPR: $_screen.display.pixelRatio.toPrecision(4),
				Orientation: $_screen.display.aspectRatio > 1
				? 'landscape'
				: 'portrait',
				Text: `${$_screen.text.maxChars} x ${$_screen.text.maxLines} chars`
			});
		}
	};

	return [
		isDev,
		sampleText,
		$_sampleSize,
		innerHeight,
		innerWidth,
		devInfo,
		shouldRender,
		_sampleSize,
		resizeObserver,
		updateScreen,
		breakpoints,
		$_screen,
		windowbinder_innerHeight_binding,
		windowbinder_innerWidth_binding,
		click_handler
	];
}

class ScreenSensor extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$2(this, options, instance$6, create_fragment$6, safe_not_equal, { isDev: 0, sampleText: 1, breakpoints: 10 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ScreenSensor",
			options,
			id: create_fragment$6.name
		});
	}

	get isDev() {
		throw new Error("<ScreenSensor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isDev(value) {
		throw new Error("<ScreenSensor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get sampleText() {
		throw new Error("<ScreenSensor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set sampleText(value) {
		throw new Error("<ScreenSensor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get breakpoints() {
		throw new Error("<ScreenSensor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set breakpoints(value) {
		throw new Error("<ScreenSensor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var ScreenSensor$1 = ScreenSensor;

const getFamily = getKey('family');
const getFamilies = mapWith(getFamily);

const isFamilyEqualTo = family => isKeyValue(['family', family]);

const createFontFaces = ({family, faces}) => faces && faces.map(
	({src, descriptors}) => new FontFace(family, src, descriptors)
);

const loadFontFaces = faces => faces && Promise.all(
	faces.map(async face => {
		const fontFace = await face.load();
		document.fonts.add(fontFace);
	})
);

// main stores
const _firstFamilyToLoad = writable();
const _fontsInfo = writable([]);
const _status = writable({
	isFirstLoaded: false,
	isDone: false
});

// deriveds
const _runtimeFonts = derived(
	[_firstFamilyToLoad, _fontsInfo],
	([firstFamilyToLoad, fontsInfo]) => {
		const isFirstFamily = isFamilyEqualTo(firstFamilyToLoad);

		const createFonts = pipe([
			partitionWith(isFirstFamily),
			mapWith(mapWith(createFontFaces))
		]);

		return createFonts(fontsInfo)
	}
);

// functions with side effects
const loadFonts = async ([firstFonts, otherFonts]) => {
	if (!get_store_value(_status).isDone) {
		await Promise.all(firstFonts.map(loadFontFaces));
		_status.set({
			isFirstLoaded: true,
			isDone: false
		});

		await Promise.all(otherFonts.map(loadFontFaces));
		_status.set({
			isFirstLoaded: true,
			isDone: true
		});
	}
};

/* ../../components/ui/src/drivers/fonts/FontsLoader.svelte generated by Svelte v3.44.2 */

function create_fragment$5(ctx) {
	const block = {
		c: noop,
		l: noop,
		m: noop,
		p: noop,
		i: noop,
		o: noop,
		d: noop
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
	let $_status;
	let $_runtimeFonts;
	validate_store(_status, '_status');
	component_subscribe($$self, _status, $$value => $$invalidate(3, $_status = $$value));
	validate_store(_runtimeFonts, '_runtimeFonts');
	component_subscribe($$self, _runtimeFonts, $$value => $$invalidate(4, $_runtimeFonts = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('FontsLoader', slots, []);
	let { fontsInfo = [] } = $$props;
	let { firstFamilyToLoad = null } = $$props;
	let { status = $_status } = $$props;
	const writable_props = ['fontsInfo', 'firstFamilyToLoad', 'status'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FontsLoader> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('fontsInfo' in $$props) $$invalidate(1, fontsInfo = $$props.fontsInfo);
		if ('firstFamilyToLoad' in $$props) $$invalidate(2, firstFamilyToLoad = $$props.firstFamilyToLoad);
		if ('status' in $$props) $$invalidate(0, status = $$props.status);
	};

	$$self.$capture_state = () => ({
		isClientSide,
		_firstFamilyToLoad,
		_fontsInfo,
		_runtimeFonts,
		_status,
		loadFonts,
		fontsInfo,
		firstFamilyToLoad,
		status,
		$_status,
		$_runtimeFonts
	});

	$$self.$inject_state = $$props => {
		if ('fontsInfo' in $$props) $$invalidate(1, fontsInfo = $$props.fontsInfo);
		if ('firstFamilyToLoad' in $$props) $$invalidate(2, firstFamilyToLoad = $$props.firstFamilyToLoad);
		if ('status' in $$props) $$invalidate(0, status = $$props.status);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*fontsInfo*/ 2) {
			if (isClientSide) {
				_fontsInfo.set(fontsInfo);
				set_store_value(_status, $_status.isDone = false, $_status);
			}
		}

		if ($$self.$$.dirty & /*firstFamilyToLoad*/ 4) {
			isClientSide && _firstFamilyToLoad.set(firstFamilyToLoad);
		}

		if ($$self.$$.dirty & /*$_runtimeFonts*/ 16) {
			isClientSide && loadFonts($_runtimeFonts);
		}

		if ($$self.$$.dirty & /*$_status*/ 8) {
			$$invalidate(0, status = $_status);
		}
	};

	return [status, fontsInfo, firstFamilyToLoad, $_status, $_runtimeFonts];
}

class FontsLoader extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$2(this, options, instance$5, create_fragment$5, safe_not_equal, {
			fontsInfo: 1,
			firstFamilyToLoad: 2,
			status: 0
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "FontsLoader",
			options,
			id: create_fragment$5.name
		});
	}

	get fontsInfo() {
		throw new Error("<FontsLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set fontsInfo(value) {
		throw new Error("<FontsLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get firstFamilyToLoad() {
		throw new Error("<FontsLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set firstFamilyToLoad(value) {
		throw new Error("<FontsLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get status() {
		throw new Error("<FontsLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set status(value) {
		throw new Error("<FontsLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var FontsLoader$1 = FontsLoader;

/* ../../components/ui/src/icons/svizzle/A11yPerson.svelte generated by Svelte v3.44.2 */

const file$3 = "../../components/ui/src/icons/svizzle/A11yPerson.svelte";

function create_fragment$4(ctx) {
	let circle0;
	let t0;
	let circle1;
	let t1;
	let path;

	const block = {
		c: function create() {
			circle0 = svg_element("circle");
			t0 = space();
			circle1 = svg_element("circle");
			t1 = space();
			path = svg_element("path");
			this.h();
		},
		l: function claim(nodes) {
			circle0 = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
			children(circle0).forEach(detach_dev);
			t0 = claim_space(nodes);
			circle1 = claim_svg_element(nodes, "circle", { cy: true, cx: true, r: true });
			children(circle1).forEach(detach_dev);
			t1 = claim_space(nodes);
			path = claim_svg_element(nodes, "path", { d: true });
			children(path).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(circle0, "cx", "12");
			attr_dev(circle0, "cy", "12");
			attr_dev(circle0, "r", "11");
			add_location(circle0, file$3, 2, 0, 54);
			attr_dev(circle1, "cy", "5");
			attr_dev(circle1, "cx", "12");
			attr_dev(circle1, "r", "1.6");
			add_location(circle1, file$3, 4, 0, 102);
			attr_dev(path, "d", "m 19.060408,9.6465306 h -5.03347 l -0.424489,2.8269384 2.75102,7.371429 H 14.78449 l -2,-4.706939 h -1.56898 l -2,4.706939 H 7.6465306 L 10.560816,12.571428 10.136327,9.6465306 H 4.9395918 V 8.077551 H 19.060408 z");
			add_location(path, file$3, 6, 0, 150);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, circle0, anchor);
			insert_hydration_dev(target, t0, anchor);
			insert_hydration_dev(target, circle1, anchor);
			insert_hydration_dev(target, t1, anchor);
			insert_hydration_dev(target, path, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(circle0);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(circle1);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(path);
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

function instance$4($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('A11yPerson', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<A11yPerson> was created with unknown prop '${key}'`);
	});

	return [];
}

class A11yPerson extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$2(this, options, instance$4, create_fragment$4, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "A11yPerson",
			options,
			id: create_fragment$4.name
		});
	}
}

var A11yPerson$1 = A11yPerson;

/* src/node_modules/app/components/Nav.svelte generated by Svelte v3.44.2 */
const file$2 = "src/node_modules/app/components/Nav.svelte";

function create_fragment$3(ctx) {
	let nav;
	let div0;
	let ul0;
	let li0;
	let a0;
	let t0;
	let t1;
	let li1;
	let a1;
	let t2;
	let t3;
	let li2;
	let a2;
	let t4;
	let t5;
	let div1;
	let ul1;
	let li3;
	let a3;
	let t6;
	let t7;
	let li4;
	let button;
	let icon;
	let current;
	let mounted;
	let dispose;

	icon = new Icon$1({
			props: {
				glyph: A11yPerson$1,
				stroke: /*isA11yDirty*/ ctx[0] ? 'white' : 'black',
				strokeWidth: "1",
				fill: /*isA11yDirty*/ ctx[0] ? 'black' : 'white'
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			nav = element("nav");
			div0 = element("div");
			ul0 = element("ul");
			li0 = element("li");
			a0 = element("a");
			t0 = text("Tools");
			t1 = space();
			li1 = element("li");
			a1 = element("a");
			t2 = text("Components");
			t3 = space();
			li2 = element("li");
			a2 = element("a");
			t4 = text("Compounds");
			t5 = space();
			div1 = element("div");
			ul1 = element("ul");
			li3 = element("li");
			a3 = element("a");
			t6 = text("Github repo");
			t7 = space();
			li4 = element("li");
			button = element("button");
			create_component(icon.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			nav = claim_element(nodes, "NAV", { class: true });
			var nav_nodes = children(nav);
			div0 = claim_element(nav_nodes, "DIV", {});
			var div0_nodes = children(div0);
			ul0 = claim_element(div0_nodes, "UL", { class: true });
			var ul0_nodes = children(ul0);
			li0 = claim_element(ul0_nodes, "LI", { class: true });
			var li0_nodes = children(li0);
			a0 = claim_element(li0_nodes, "A", { href: true, class: true });
			var a0_nodes = children(a0);
			t0 = claim_text(a0_nodes, "Tools");
			a0_nodes.forEach(detach_dev);
			li0_nodes.forEach(detach_dev);
			t1 = claim_space(ul0_nodes);
			li1 = claim_element(ul0_nodes, "LI", { class: true });
			var li1_nodes = children(li1);
			a1 = claim_element(li1_nodes, "A", { rel: true, href: true, class: true });
			var a1_nodes = children(a1);
			t2 = claim_text(a1_nodes, "Components");
			a1_nodes.forEach(detach_dev);
			li1_nodes.forEach(detach_dev);
			t3 = claim_space(ul0_nodes);
			li2 = claim_element(ul0_nodes, "LI", { class: true });
			var li2_nodes = children(li2);
			a2 = claim_element(li2_nodes, "A", { rel: true, href: true, class: true });
			var a2_nodes = children(a2);
			t4 = claim_text(a2_nodes, "Compounds");
			a2_nodes.forEach(detach_dev);
			li2_nodes.forEach(detach_dev);
			ul0_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			t5 = claim_space(nav_nodes);
			div1 = claim_element(nav_nodes, "DIV", {});
			var div1_nodes = children(div1);
			ul1 = claim_element(div1_nodes, "UL", { class: true });
			var ul1_nodes = children(ul1);
			li3 = claim_element(ul1_nodes, "LI", { class: true });
			var li3_nodes = children(li3);
			a3 = claim_element(li3_nodes, "A", { href: true, class: true });
			var a3_nodes = children(a3);
			t6 = claim_text(a3_nodes, "Github repo");
			a3_nodes.forEach(detach_dev);
			li3_nodes.forEach(detach_dev);
			t7 = claim_space(ul1_nodes);
			li4 = claim_element(ul1_nodes, "LI", { class: true });
			var li4_nodes = children(li4);
			button = claim_element(li4_nodes, "BUTTON", { "aria-label": true, class: true });
			var button_nodes = children(button);
			claim_component(icon.$$.fragment, button_nodes);
			button_nodes.forEach(detach_dev);
			li4_nodes.forEach(detach_dev);
			ul1_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			nav_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(a0, "href", "./");
			attr_dev(a0, "class", "svelte-1umjh0a");
			toggle_class(a0, "selected", /*segment*/ ctx[1] === undefined);
			add_location(a0, file$2, 18, 4, 413);
			attr_dev(li0, "class", "svelte-1umjh0a");
			add_location(li0, file$2, 17, 3, 404);
			attr_dev(a1, "rel", "prefetch");
			attr_dev(a1, "href", "./components/BarchartVDiv");
			attr_dev(a1, "class", "svelte-1umjh0a");
			toggle_class(a1, "selected", /*segment*/ ctx[1] === 'components');
			add_location(a1, file$2, 24, 4, 511);
			attr_dev(li1, "class", "svelte-1umjh0a");
			add_location(li1, file$2, 23, 3, 502);
			attr_dev(a2, "rel", "prefetch");
			attr_dev(a2, "href", "./compounds/time_region_value");
			attr_dev(a2, "class", "svelte-1umjh0a");
			toggle_class(a2, "selected", /*segment*/ ctx[1] === 'compounds');
			add_location(a2, file$2, 31, 4, 658);
			attr_dev(li2, "class", "svelte-1umjh0a");
			add_location(li2, file$2, 30, 3, 649);
			attr_dev(ul0, "class", "svelte-1umjh0a");
			add_location(ul0, file$2, 16, 2, 396);
			add_location(div0, file$2, 15, 1, 388);
			attr_dev(a3, "href", "https://github.com/nestauk/svizzle");
			attr_dev(a3, "class", "svelte-1umjh0a");
			add_location(a3, file$2, 42, 4, 837);
			attr_dev(li3, "class", "svelte-1umjh0a");
			add_location(li3, file$2, 41, 3, 828);
			attr_dev(button, "aria-label", "Accessibility settings");
			attr_dev(button, "class", "clickable svelte-1umjh0a");
			add_location(button, file$2, 45, 4, 919);
			attr_dev(li4, "class", "svelte-1umjh0a");
			add_location(li4, file$2, 44, 3, 910);
			attr_dev(ul1, "class", "svelte-1umjh0a");
			add_location(ul1, file$2, 40, 2, 820);
			add_location(div1, file$2, 39, 1, 812);
			attr_dev(nav, "class", "svelte-1umjh0a");
			add_location(nav, file$2, 14, 0, 381);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, nav, anchor);
			append_hydration_dev(nav, div0);
			append_hydration_dev(div0, ul0);
			append_hydration_dev(ul0, li0);
			append_hydration_dev(li0, a0);
			append_hydration_dev(a0, t0);
			append_hydration_dev(ul0, t1);
			append_hydration_dev(ul0, li1);
			append_hydration_dev(li1, a1);
			append_hydration_dev(a1, t2);
			append_hydration_dev(ul0, t3);
			append_hydration_dev(ul0, li2);
			append_hydration_dev(li2, a2);
			append_hydration_dev(a2, t4);
			append_hydration_dev(nav, t5);
			append_hydration_dev(nav, div1);
			append_hydration_dev(div1, ul1);
			append_hydration_dev(ul1, li3);
			append_hydration_dev(li3, a3);
			append_hydration_dev(a3, t6);
			append_hydration_dev(ul1, t7);
			append_hydration_dev(ul1, li4);
			append_hydration_dev(li4, button);
			mount_component(icon, button, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(button, "click", /*toggleA11yMenu*/ ctx[2], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*segment, undefined*/ 2) {
				toggle_class(a0, "selected", /*segment*/ ctx[1] === undefined);
			}

			if (dirty & /*segment*/ 2) {
				toggle_class(a1, "selected", /*segment*/ ctx[1] === 'components');
			}

			if (dirty & /*segment*/ 2) {
				toggle_class(a2, "selected", /*segment*/ ctx[1] === 'compounds');
			}

			const icon_changes = {};
			if (dirty & /*isA11yDirty*/ 1) icon_changes.stroke = /*isA11yDirty*/ ctx[0] ? 'white' : 'black';
			if (dirty & /*isA11yDirty*/ 1) icon_changes.fill = /*isA11yDirty*/ ctx[0] ? 'black' : 'white';
			icon.$set(icon_changes);
		},
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
			if (detaching) detach_dev(nav);
			destroy_component(icon);
			mounted = false;
			dispose();
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
	validate_slots('Nav', slots, []);
	let { isA11yDirty = false } = $$props;
	let { segment } = $$props;
	let { showA11yMenu = false } = $$props;

	const toggleA11yMenu = event => {
		$$invalidate(3, showA11yMenu = !showA11yMenu);
		event.target.setAttribute('aria-expanded', showA11yMenu.toString());
	};

	const writable_props = ['isA11yDirty', 'segment', 'showA11yMenu'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Nav> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('isA11yDirty' in $$props) $$invalidate(0, isA11yDirty = $$props.isA11yDirty);
		if ('segment' in $$props) $$invalidate(1, segment = $$props.segment);
		if ('showA11yMenu' in $$props) $$invalidate(3, showA11yMenu = $$props.showA11yMenu);
	};

	$$self.$capture_state = () => ({
		Icon: Icon$1,
		A11yPerson: A11yPerson$1,
		isA11yDirty,
		segment,
		showA11yMenu,
		toggleA11yMenu
	});

	$$self.$inject_state = $$props => {
		if ('isA11yDirty' in $$props) $$invalidate(0, isA11yDirty = $$props.isA11yDirty);
		if ('segment' in $$props) $$invalidate(1, segment = $$props.segment);
		if ('showA11yMenu' in $$props) $$invalidate(3, showA11yMenu = $$props.showA11yMenu);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [isA11yDirty, segment, toggleA11yMenu, showA11yMenu];
}

class Nav extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$2(this, options, instance$3, create_fragment$3, safe_not_equal, {
			isA11yDirty: 0,
			segment: 1,
			showA11yMenu: 3
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Nav",
			options,
			id: create_fragment$3.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*segment*/ ctx[1] === undefined && !('segment' in props)) {
			console.warn("<Nav> was created without expected prop 'segment'");
		}
	}

	get isA11yDirty() {
		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isA11yDirty(value) {
		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get segment() {
		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set segment(value) {
		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get showA11yMenu() {
		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set showA11yMenu(value) {
		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

const fontsInfo = [
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

const a11yFontFamilies = getFamilies(fontsInfo);

/* src/routes/_layout.svelte generated by Svelte v3.44.2 */
const file$1 = "src/routes/_layout.svelte";

// (41:0) {#if fontLoadStatus?.isFirstLoaded}
function create_if_block_1$1(ctx) {
	let screensensor;
	let current;
	screensensor = new ScreenSensor$1({ $$inline: true });

	const block = {
		c: function create() {
			create_component(screensensor.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(screensensor.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(screensensor, target, anchor);
			current = true;
		},
		i: function intro(local) {
			if (current) return;
			transition_in(screensensor.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(screensensor.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(screensensor, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$1.name,
		type: "if",
		source: "(41:0) {#if fontLoadStatus?.isFirstLoaded}",
		ctx
	});

	return block;
}

// (56:0) {#if showA11yMenu}
function create_if_block$2(ctx) {
	let section;
	let a11ymenu;
	let current;
	a11ymenu = new A11yMenu$1({ props: { _screen }, $$inline: true });

	const block = {
		c: function create() {
			section = element("section");
			create_component(a11ymenu.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			section = claim_element(nodes, "SECTION", { role: true, class: true });
			var section_nodes = children(section);
			claim_component(a11ymenu.$$.fragment, section_nodes);
			section_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(section, "role", "region");
			attr_dev(section, "class", "svelte-pnz6hj");
			add_location(section, file$1, 56, 1, 1105);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, section, anchor);
			mount_component(a11ymenu, section, null);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(a11ymenu.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(a11ymenu.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(section);
			destroy_component(a11ymenu);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(56:0) {#if showA11yMenu}",
		ctx
	});

	return block;
}

function create_fragment$2(ctx) {
	let a11ymenudriver;
	let t0;
	let fontsloader;
	let updating_status;
	let t1;
	let t2;
	let header;
	let nav;
	let updating_showA11yMenu;
	let t3;
	let main;
	let t4;
	let if_block1_anchor;
	let current;

	a11ymenudriver = new A11yMenuDriver$1({
			props: {
				defaults: {
					typeface: {
						defaultValue: a11yFontFamilies[0],
						values: a11yFontFamilies
					},
					lineHeight: {
						defaultValue: 175,
						values: [125, 150, 175, 200, 250]
					}
				}
			},
			$$inline: true
		});

	function fontsloader_status_binding(value) {
		/*fontsloader_status_binding*/ ctx[7](value);
	}

	let fontsloader_props = {
		firstFamilyToLoad: /*$_a11ySettings*/ ctx[3].typeface.value,
		fontsInfo
	};

	if (/*fontLoadStatus*/ ctx[1] !== void 0) {
		fontsloader_props.status = /*fontLoadStatus*/ ctx[1];
	}

	fontsloader = new FontsLoader$1({ props: fontsloader_props, $$inline: true });
	binding_callbacks.push(() => bind$1(fontsloader, 'status', fontsloader_status_binding));
	let if_block0 = /*fontLoadStatus*/ ctx[1]?.isFirstLoaded && create_if_block_1$1(ctx);

	function nav_showA11yMenu_binding(value) {
		/*nav_showA11yMenu_binding*/ ctx[8](value);
	}

	let nav_props = {
		segment: /*segment*/ ctx[0],
		isA11yDirty: /*$_isA11yDirty*/ ctx[4]
	};

	if (/*showA11yMenu*/ ctx[2] !== void 0) {
		nav_props.showA11yMenu = /*showA11yMenu*/ ctx[2];
	}

	nav = new Nav({ props: nav_props, $$inline: true });
	binding_callbacks.push(() => bind$1(nav, 'showA11yMenu', nav_showA11yMenu_binding));
	const default_slot_template = /*#slots*/ ctx[6].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
	let if_block1 = /*showA11yMenu*/ ctx[2] && create_if_block$2(ctx);

	const block = {
		c: function create() {
			create_component(a11ymenudriver.$$.fragment);
			t0 = space();
			create_component(fontsloader.$$.fragment);
			t1 = space();
			if (if_block0) if_block0.c();
			t2 = space();
			header = element("header");
			create_component(nav.$$.fragment);
			t3 = space();
			main = element("main");
			if (default_slot) default_slot.c();
			t4 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			this.h();
		},
		l: function claim(nodes) {
			claim_component(a11ymenudriver.$$.fragment, nodes);
			t0 = claim_space(nodes);
			claim_component(fontsloader.$$.fragment, nodes);
			t1 = claim_space(nodes);
			if (if_block0) if_block0.l(nodes);
			t2 = claim_space(nodes);
			header = claim_element(nodes, "HEADER", { class: true });
			var header_nodes = children(header);
			claim_component(nav.$$.fragment, header_nodes);
			header_nodes.forEach(detach_dev);
			t3 = claim_space(nodes);
			main = claim_element(nodes, "MAIN", { class: true });
			var main_nodes = children(main);
			if (default_slot) default_slot.l(main_nodes);
			main_nodes.forEach(detach_dev);
			t4 = claim_space(nodes);
			if (if_block1) if_block1.l(nodes);
			if_block1_anchor = empty();
			this.h();
		},
		h: function hydrate() {
			attr_dev(header, "class", "svelte-pnz6hj");
			add_location(header, file$1, 44, 0, 969);
			attr_dev(main, "class", "svelte-pnz6hj");
			add_location(main, file$1, 52, 0, 1061);
		},
		m: function mount(target, anchor) {
			mount_component(a11ymenudriver, target, anchor);
			insert_hydration_dev(target, t0, anchor);
			mount_component(fontsloader, target, anchor);
			insert_hydration_dev(target, t1, anchor);
			if (if_block0) if_block0.m(target, anchor);
			insert_hydration_dev(target, t2, anchor);
			insert_hydration_dev(target, header, anchor);
			mount_component(nav, header, null);
			insert_hydration_dev(target, t3, anchor);
			insert_hydration_dev(target, main, anchor);

			if (default_slot) {
				default_slot.m(main, null);
			}

			insert_hydration_dev(target, t4, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_hydration_dev(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const fontsloader_changes = {};
			if (dirty & /*$_a11ySettings*/ 8) fontsloader_changes.firstFamilyToLoad = /*$_a11ySettings*/ ctx[3].typeface.value;

			if (!updating_status && dirty & /*fontLoadStatus*/ 2) {
				updating_status = true;
				fontsloader_changes.status = /*fontLoadStatus*/ ctx[1];
				add_flush_callback(() => updating_status = false);
			}

			fontsloader.$set(fontsloader_changes);

			if (/*fontLoadStatus*/ ctx[1]?.isFirstLoaded) {
				if (if_block0) {
					if (dirty & /*fontLoadStatus*/ 2) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_1$1(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t2.parentNode, t2);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			const nav_changes = {};
			if (dirty & /*segment*/ 1) nav_changes.segment = /*segment*/ ctx[0];
			if (dirty & /*$_isA11yDirty*/ 16) nav_changes.isA11yDirty = /*$_isA11yDirty*/ ctx[4];

			if (!updating_showA11yMenu && dirty & /*showA11yMenu*/ 4) {
				updating_showA11yMenu = true;
				nav_changes.showA11yMenu = /*showA11yMenu*/ ctx[2];
				add_flush_callback(() => updating_showA11yMenu = false);
			}

			nav.$set(nav_changes);

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[5],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
						null
					);
				}
			}

			if (/*showA11yMenu*/ ctx[2]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*showA11yMenu*/ 4) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$2(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(a11ymenudriver.$$.fragment, local);
			transition_in(fontsloader.$$.fragment, local);
			transition_in(if_block0);
			transition_in(nav.$$.fragment, local);
			transition_in(default_slot, local);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(a11ymenudriver.$$.fragment, local);
			transition_out(fontsloader.$$.fragment, local);
			transition_out(if_block0);
			transition_out(nav.$$.fragment, local);
			transition_out(default_slot, local);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(a11ymenudriver, detaching);
			if (detaching) detach_dev(t0);
			destroy_component(fontsloader, detaching);
			if (detaching) detach_dev(t1);
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(header);
			destroy_component(nav);
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(main);
			if (default_slot) default_slot.d(detaching);
			if (detaching) detach_dev(t4);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
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
	let $_a11ySettings;
	let $_isA11yDirty;
	validate_store(_a11ySettings, '_a11ySettings');
	component_subscribe($$self, _a11ySettings, $$value => $$invalidate(3, $_a11ySettings = $$value));
	validate_store(_isA11yDirty, '_isA11yDirty');
	component_subscribe($$self, _isA11yDirty, $$value => $$invalidate(4, $_isA11yDirty = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Layout', slots, ['default']);
	let { segment } = $$props;
	let fontLoadStatus;
	let showA11yMenu;
	const writable_props = ['segment'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Layout> was created with unknown prop '${key}'`);
	});

	function fontsloader_status_binding(value) {
		fontLoadStatus = value;
		$$invalidate(1, fontLoadStatus);
	}

	function nav_showA11yMenu_binding(value) {
		showA11yMenu = value;
		$$invalidate(2, showA11yMenu);
	}

	$$self.$$set = $$props => {
		if ('segment' in $$props) $$invalidate(0, segment = $$props.segment);
		if ('$$scope' in $$props) $$invalidate(5, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		A11yMenu: A11yMenu$1,
		A11yMenuDriver: A11yMenuDriver$1,
		_a11ySettings,
		_isA11yDirty,
		ScreenSensor: ScreenSensor$1,
		_screen,
		FontsLoader: FontsLoader$1,
		Nav,
		a11yFontFamilies,
		fontsInfo,
		segment,
		fontLoadStatus,
		showA11yMenu,
		$_a11ySettings,
		$_isA11yDirty
	});

	$$self.$inject_state = $$props => {
		if ('segment' in $$props) $$invalidate(0, segment = $$props.segment);
		if ('fontLoadStatus' in $$props) $$invalidate(1, fontLoadStatus = $$props.fontLoadStatus);
		if ('showA11yMenu' in $$props) $$invalidate(2, showA11yMenu = $$props.showA11yMenu);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		segment,
		fontLoadStatus,
		showA11yMenu,
		$_a11ySettings,
		$_isA11yDirty,
		$$scope,
		slots,
		fontsloader_status_binding,
		nav_showA11yMenu_binding
	];
}

class Layout extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$2(this, options, instance$2, create_fragment$2, safe_not_equal, { segment: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Layout",
			options,
			id: create_fragment$2.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*segment*/ ctx[0] === undefined && !('segment' in props)) {
			console.warn("<Layout> was created without expected prop 'segment'");
		}
	}

	get segment() {
		throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set segment(value) {
		throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/routes/_error.svelte generated by Svelte v3.44.2 */

const { Error: Error_1$1 } = globals;
const file = "src/routes/_error.svelte";

// (38:0) {#if dev && error.stack}
function create_if_block$1(ctx) {
	let pre;
	let t_value = /*error*/ ctx[1].stack + "";
	let t;

	const block = {
		c: function create() {
			pre = element("pre");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			pre = claim_element(nodes, "PRE", {});
			var pre_nodes = children(pre);
			t = claim_text(pre_nodes, t_value);
			pre_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(pre, file, 38, 1, 443);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, pre, anchor);
			append_hydration_dev(pre, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*error*/ 2 && t_value !== (t_value = /*error*/ ctx[1].stack + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(pre);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(38:0) {#if dev && error.stack}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let title_value;
	let t0;
	let h1;
	let t1;
	let t2;
	let p;
	let t3_value = /*error*/ ctx[1].message + "";
	let t3;
	let t4;
	let if_block_anchor;
	document.title = title_value = /*status*/ ctx[0];
	let if_block = /*dev*/ ctx[2] && /*error*/ ctx[1].stack && create_if_block$1(ctx);

	const block = {
		c: function create() {
			t0 = space();
			h1 = element("h1");
			t1 = text(/*status*/ ctx[0]);
			t2 = space();
			p = element("p");
			t3 = text(t3_value);
			t4 = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all('[data-svelte=\"svelte-1o9r2ue\"]', document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			h1 = claim_element(nodes, "H1", { class: true });
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, /*status*/ ctx[0]);
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			p = claim_element(nodes, "P", { class: true });
			var p_nodes = children(p);
			t3 = claim_text(p_nodes, t3_value);
			p_nodes.forEach(detach_dev);
			t4 = claim_space(nodes);
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
			this.h();
		},
		h: function hydrate() {
			attr_dev(h1, "class", "svelte-8od9u6");
			add_location(h1, file, 33, 0, 374);
			attr_dev(p, "class", "svelte-8od9u6");
			add_location(p, file, 35, 0, 393);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, t0, anchor);
			insert_hydration_dev(target, h1, anchor);
			append_hydration_dev(h1, t1);
			insert_hydration_dev(target, t2, anchor);
			insert_hydration_dev(target, p, anchor);
			append_hydration_dev(p, t3);
			insert_hydration_dev(target, t4, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_hydration_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*status*/ 1 && title_value !== (title_value = /*status*/ ctx[0])) {
				document.title = title_value;
			}

			if (dirty & /*status*/ 1) set_data_dev(t1, /*status*/ ctx[0]);
			if (dirty & /*error*/ 2 && t3_value !== (t3_value = /*error*/ ctx[1].message + "")) set_data_dev(t3, t3_value);

			if (/*dev*/ ctx[2] && /*error*/ ctx[1].stack) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t4);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
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
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Error', slots, []);
	let { status } = $$props;
	let { error } = $$props;
	const dev = "development" === 'development';
	const writable_props = ['status', 'error'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Error> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('status' in $$props) $$invalidate(0, status = $$props.status);
		if ('error' in $$props) $$invalidate(1, error = $$props.error);
	};

	$$self.$capture_state = () => ({ status, error, dev });

	$$self.$inject_state = $$props => {
		if ('status' in $$props) $$invalidate(0, status = $$props.status);
		if ('error' in $$props) $$invalidate(1, error = $$props.error);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [status, error, dev];
}

class Error$1 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$2(this, options, instance$1, create_fragment$1, safe_not_equal, { status: 0, error: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Error",
			options,
			id: create_fragment$1.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*status*/ ctx[0] === undefined && !('status' in props)) {
			console.warn("<Error> was created without expected prop 'status'");
		}

		if (/*error*/ ctx[1] === undefined && !('error' in props)) {
			console.warn("<Error> was created without expected prop 'error'");
		}
	}

	get status() {
		throw new Error_1$1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set status(value) {
		throw new Error_1$1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get error() {
		throw new Error_1$1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set error(value) {
		throw new Error_1$1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/node_modules/@sapper/internal/App.svelte generated by Svelte v3.44.2 */

const { Error: Error_1 } = globals;

// (24:1) {:else}
function create_else_block(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [{ segment: /*segments*/ ctx[2][1] }, /*level1*/ ctx[4].props];
	var switch_value = /*level1*/ ctx[4].component;

	function switch_props(ctx) {
		let switch_instance_props = {
			$$slots: { default: [create_default_slot_1] },
			$$scope: { ctx }
		};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		l: function claim(nodes) {
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_hydration_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*segments, level1*/ 20)
			? get_spread_update(switch_instance_spread_levels, [
					dirty & /*segments*/ 4 && { segment: /*segments*/ ctx[2][1] },
					dirty & /*level1*/ 16 && get_spread_object(/*level1*/ ctx[4].props)
				])
			: {};

			if (dirty & /*$$scope, level2*/ 288) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (switch_value !== (switch_value = /*level1*/ ctx[4].component)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(24:1) {:else}",
		ctx
	});

	return block;
}

// (22:1) {#if error}
function create_if_block(ctx) {
	let error_1;
	let current;

	error_1 = new Error$1({
			props: {
				error: /*error*/ ctx[0],
				status: /*status*/ ctx[1]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(error_1.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(error_1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(error_1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const error_1_changes = {};
			if (dirty & /*error*/ 1) error_1_changes.error = /*error*/ ctx[0];
			if (dirty & /*status*/ 2) error_1_changes.status = /*status*/ ctx[1];
			error_1.$set(error_1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(error_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(error_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(error_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(22:1) {#if error}",
		ctx
	});

	return block;
}

// (26:3) {#if level2}
function create_if_block_1(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [/*level2*/ ctx[5].props];
	var switch_value = /*level2*/ ctx[5].component;

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		l: function claim(nodes) {
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_hydration_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*level2*/ 32)
			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*level2*/ ctx[5].props)])
			: {};

			if (switch_value !== (switch_value = /*level2*/ ctx[5].component)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(26:3) {#if level2}",
		ctx
	});

	return block;
}

// (25:2) <svelte:component this="{level1.component}" segment="{segments[1]}" {...level1.props}>
function create_default_slot_1(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*level2*/ ctx[5] && create_if_block_1(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_hydration_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*level2*/ ctx[5]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*level2*/ 32) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
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
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1.name,
		type: "slot",
		source: "(25:2) <svelte:component this=\\\"{level1.component}\\\" segment=\\\"{segments[1]}\\\" {...level1.props}>",
		ctx
	});

	return block;
}

// (21:0) <Layout segment="{segments[0]}" {...level0.props}>
function create_default_slot(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*error*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
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
			insert_hydration_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
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
		id: create_default_slot.name,
		type: "slot",
		source: "(21:0) <Layout segment=\\\"{segments[0]}\\\" {...level0.props}>",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let layout;
	let current;
	const layout_spread_levels = [{ segment: /*segments*/ ctx[2][0] }, /*level0*/ ctx[3].props];

	let layout_props = {
		$$slots: { default: [create_default_slot] },
		$$scope: { ctx }
	};

	for (let i = 0; i < layout_spread_levels.length; i += 1) {
		layout_props = assign(layout_props, layout_spread_levels[i]);
	}

	layout = new Layout({ props: layout_props, $$inline: true });

	const block = {
		c: function create() {
			create_component(layout.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(layout.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(layout, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const layout_changes = (dirty & /*segments, level0*/ 12)
			? get_spread_update(layout_spread_levels, [
					dirty & /*segments*/ 4 && { segment: /*segments*/ ctx[2][0] },
					dirty & /*level0*/ 8 && get_spread_object(/*level0*/ ctx[3].props)
				])
			: {};

			if (dirty & /*$$scope, error, status, level1, segments, level2*/ 311) {
				layout_changes.$$scope = { dirty, ctx };
			}

			layout.$set(layout_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(layout.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(layout.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(layout, detaching);
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
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('App', slots, []);
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	let { level2 = null } = $$props;
	let { notify } = $$props;
	afterUpdate(notify);
	setContext(CONTEXT_KEY, stores);

	const writable_props = [
		'stores',
		'error',
		'status',
		'segments',
		'level0',
		'level1',
		'level2',
		'notify'
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('stores' in $$props) $$invalidate(6, stores = $$props.stores);
		if ('error' in $$props) $$invalidate(0, error = $$props.error);
		if ('status' in $$props) $$invalidate(1, status = $$props.status);
		if ('segments' in $$props) $$invalidate(2, segments = $$props.segments);
		if ('level0' in $$props) $$invalidate(3, level0 = $$props.level0);
		if ('level1' in $$props) $$invalidate(4, level1 = $$props.level1);
		if ('level2' in $$props) $$invalidate(5, level2 = $$props.level2);
		if ('notify' in $$props) $$invalidate(7, notify = $$props.notify);
	};

	$$self.$capture_state = () => ({
		setContext,
		afterUpdate,
		CONTEXT_KEY,
		Layout,
		Error: Error$1,
		stores,
		error,
		status,
		segments,
		level0,
		level1,
		level2,
		notify
	});

	$$self.$inject_state = $$props => {
		if ('stores' in $$props) $$invalidate(6, stores = $$props.stores);
		if ('error' in $$props) $$invalidate(0, error = $$props.error);
		if ('status' in $$props) $$invalidate(1, status = $$props.status);
		if ('segments' in $$props) $$invalidate(2, segments = $$props.segments);
		if ('level0' in $$props) $$invalidate(3, level0 = $$props.level0);
		if ('level1' in $$props) $$invalidate(4, level1 = $$props.level1);
		if ('level2' in $$props) $$invalidate(5, level2 = $$props.level2);
		if ('notify' in $$props) $$invalidate(7, notify = $$props.notify);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [error, status, segments, level0, level1, level2, stores, notify];
}

class App extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$2(this, options, instance, create_fragment, safe_not_equal, {
			stores: 6,
			error: 0,
			status: 1,
			segments: 2,
			level0: 3,
			level1: 4,
			level2: 5,
			notify: 7
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "App",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*stores*/ ctx[6] === undefined && !('stores' in props)) {
			console.warn("<App> was created without expected prop 'stores'");
		}

		if (/*error*/ ctx[0] === undefined && !('error' in props)) {
			console.warn("<App> was created without expected prop 'error'");
		}

		if (/*status*/ ctx[1] === undefined && !('status' in props)) {
			console.warn("<App> was created without expected prop 'status'");
		}

		if (/*segments*/ ctx[2] === undefined && !('segments' in props)) {
			console.warn("<App> was created without expected prop 'segments'");
		}

		if (/*level0*/ ctx[3] === undefined && !('level0' in props)) {
			console.warn("<App> was created without expected prop 'level0'");
		}

		if (/*notify*/ ctx[7] === undefined && !('notify' in props)) {
			console.warn("<App> was created without expected prop 'notify'");
		}
	}

	get stores() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set stores(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get error() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set error(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get status() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set status(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get segments() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set segments(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get level0() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set level0(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get level1() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set level1(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get level2() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set level2(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get notify() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set notify(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

// This file is generated by Sapper — do not edit it!

const ignore = [/^\/components\.json$/];

const components = [
	{
		js: () => Promise.all([import('./index.9110b694.js'), __inject_styles(["client-98e33ee9.css"])]).then(function(x) { return x[0]; })
	},
	{
		js: () => Promise.all([import('./_layout.da86ddfc.js'), __inject_styles(["client-98e33ee9.css","linear-93512ff7.css","_layout-0256f55c.css"])]).then(function(x) { return x[0]; })
	},
	{
		js: () => Promise.all([import('./index.62922f4e.js'), __inject_styles(["client-98e33ee9.css","index-685939ab.css"])]).then(function(x) { return x[0]; })
	},
	{
		js: () => Promise.all([import('./_slug_.1ffe4ce3.js'), __inject_styles(["client-98e33ee9.css","linear-93512ff7.css","MessageView-c049a755.css","ChoroplethG-4f601bfe.css","LoadingView-779c85bf.css","_slug_-3c4a9ff9.css"])]).then(function(x) { return x[0]; })
	},
	{
		js: () => Promise.all([import('./_layout.7956219e.js'), __inject_styles(["client-98e33ee9.css","LoadingView-779c85bf.css","linear-93512ff7.css","_layout-9bde9bd6.css"])]).then(function(x) { return x[0]; })
	},
	{
		js: () => Promise.all([import('./index.178233db.js'), __inject_styles(["client-98e33ee9.css","index-b1ade5e1.css"])]).then(function(x) { return x[0]; })
	},
	{
		js: () => Promise.all([import('./index.93b7d505.js'), __inject_styles(["client-98e33ee9.css","linear-93512ff7.css","MessageView-c049a755.css","types-db20598c.css","index-150444f5.css"])]).then(function(x) { return x[0]; })
	},
	{
		js: () => Promise.all([import('./_year_.b7b8d53a.js'), __inject_styles(["client-98e33ee9.css","linear-93512ff7.css","MessageView-c049a755.css","ChoroplethG-4f601bfe.css","LoadingView-779c85bf.css","types-db20598c.css","_year_-6fcebc5f.css"])]).then(function(x) { return x[0]; })
	}
];

const routes = (d => [
	{
		// index.svelte
		pattern: /^\/$/,
		parts: [
			{ i: 0 }
		]
	},

	{
		// components/index.svelte
		pattern: /^\/components\/?$/,
		parts: [
			{ i: 1 },
			{ i: 2 }
		]
	},

	{
		// components/[slug].svelte
		pattern: /^\/components\/([^/]+?)\/?$/,
		parts: [
			{ i: 1 },
			{ i: 3, params: match => ({ slug: d(match[1]) }) }
		]
	},

	{
		// compounds/time_region_value/index.svelte
		pattern: /^\/compounds\/time_region_value\/?$/,
		parts: [
			null,
			{ i: 4 },
			{ i: 5 }
		]
	},

	{
		// compounds/time_region_value/[id]/index.svelte
		pattern: /^\/compounds\/time_region_value\/([^/]+?)\/?$/,
		parts: [
			null,
			{ i: 4 },
			{ i: 6, params: match => ({ id: d(match[1]) }) }
		]
	},

	{
		// compounds/time_region_value/[id]/[year].svelte
		pattern: /^\/compounds\/time_region_value\/([^/]+?)\/([^/]+?)\/?$/,
		parts: [
			null,
			{ i: 4 },
			null,
			{ i: 7, params: match => ({ id: d(match[1]), year: d(match[2]) }) }
		]
	}
])(decodeURIComponent);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function find_anchor(node) {
    while (node && node.nodeName.toUpperCase() !== 'A')
        node = node.parentNode; // SVG <a> elements have a lowercase name
    return node;
}

let uid = 1;
function set_uid(n) {
    uid = n;
}
let cid;
function set_cid(n) {
    cid = n;
}
const _history = typeof history !== 'undefined' ? history : {
    pushState: () => { },
    replaceState: () => { },
    scrollRestoration: 'auto'
};
const scroll_history = {};
function load_current_page() {
    return Promise.resolve().then(() => {
        const { hash, href } = location;
        _history.replaceState({ id: uid }, '', href);
        const target = select_target(new URL(location.href));
        if (target)
            return navigate(target, uid, true, hash);
    });
}
let base_url;
let handle_target;
function init(base, handler) {
    base_url = base;
    handle_target = handler;
    if ('scrollRestoration' in _history) {
        _history.scrollRestoration = 'manual';
    }
    // Adopted from Nuxt.js
    // Reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    addEventListener('beforeunload', () => {
        _history.scrollRestoration = 'auto';
    });
    // Setting scrollRestoration to manual again when returning to this page.
    addEventListener('load', () => {
        _history.scrollRestoration = 'manual';
    });
    addEventListener('click', handle_click);
    addEventListener('popstate', handle_popstate);
}
// IE11 does not support URLSearchParams so we'll fall back to a custom
// RegExp that mimics the standard URLSearchParams method
const _get_query_array = (search) => {
    if (typeof URLSearchParams !== 'undefined') {
        return [...new URLSearchParams(search).entries()];
    }
    return search.slice(1).split('&').map(searchParam => {
        // Instead of `.*` we'll use \s\S to allow characters and non characters
        // such as [\r\n\v\f]
        const [, key, value = ''] = /([^=]*)(?:=([\S\s]*))?/.exec(decodeURIComponent(searchParam.replace(/\+/g, ' ')));
        return [key, value];
    });
};
function extract_query(search) {
    const query = Object.create(null);
    return search.length ? _get_query_array(search).reduce((query, [key, value]) => {
        if (typeof query[key] === 'string')
            query[key] = [query[key]];
        if (typeof query[key] === 'object')
            query[key].push(value);
        else
            query[key] = value;
        return query;
    }, query) :
        query;
}
function select_target(url) {
    if (url.origin !== location.origin)
        return null;
    if (!url.pathname.startsWith(base_url))
        return null;
    let path = url.pathname.slice(base_url.length);
    if (path === '') {
        path = '/';
    }
    // avoid accidental clashes between server routes and page routes
    if (ignore.some(pattern => pattern.test(path)))
        return;
    for (let i = 0; i < routes.length; i += 1) {
        const route = routes[i];
        const match = route.pattern.exec(path);
        if (match) {
            const query = extract_query(url.search);
            const part = route.parts[route.parts.length - 1];
            const params = part.params ? part.params(match) : {};
            const page = { host: location.host, path, query, params };
            return { href: url.href, route, match, page };
        }
    }
}
function handle_click(event) {
    // Adapted from https://github.com/visionmedia/page.js
    // MIT license https://github.com/visionmedia/page.js#license
    if (which(event) !== 1)
        return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
    if (event.defaultPrevented)
        return;
    const a = find_anchor(event.target);
    if (!a)
        return;
    if (!a.href)
        return;
    // check if link is inside an svg
    // in this case, both href and target are always inside an object
    const svg = typeof a.href === 'object' && a.href.constructor.name === 'SVGAnimatedString';
    const href = String(svg ? a.href.baseVal : a.href);
    if (href === location.href) {
        if (!location.hash)
            event.preventDefault();
        return;
    }
    // Ignore if tag has
    // 1. 'download' attribute
    // 2. rel='external' attribute
    if (a.hasAttribute('download') || a.getAttribute('rel') === 'external')
        return;
    // Ignore if <a> has a target
    if (svg ? a.target.baseVal : a.target)
        return;
    const url = new URL(href);
    // Don't handle hash changes
    if (url.pathname === location.pathname && url.search === location.search)
        return;
    const target = select_target(url);
    if (target) {
        const noscroll = a.hasAttribute('sapper:noscroll');
        navigate(target, null, noscroll, url.hash);
        event.preventDefault();
        _history.pushState({ id: cid }, '', url.href);
    }
}
function which(event) {
    return event.which === null ? event.button : event.which;
}
function scroll_state() {
    return {
        x: pageXOffset,
        y: pageYOffset
    };
}
function handle_popstate(event) {
    scroll_history[cid] = scroll_state();
    if (event.state) {
        const url = new URL(location.href);
        const target = select_target(url);
        if (target) {
            navigate(target, event.state.id);
        }
        else {
            // eslint-disable-next-line
            location.href = location.href; // nosonar
        }
    }
    else {
        // hashchange
        set_uid(uid + 1);
        set_cid(uid);
        _history.replaceState({ id: cid }, '', location.href);
    }
}
function navigate(dest, id, noscroll, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        const popstate = !!id;
        if (popstate) {
            cid = id;
        }
        else {
            const current_scroll = scroll_state();
            // clicked on a link. preserve scroll state
            scroll_history[cid] = current_scroll;
            cid = id = ++uid;
            scroll_history[cid] = noscroll ? current_scroll : { x: 0, y: 0 };
        }
        yield handle_target(dest);
        if (document.activeElement && (document.activeElement instanceof HTMLElement))
            document.activeElement.blur();
        if (!noscroll) {
            let scroll = scroll_history[id];
            let deep_linked;
            if (hash) {
                // scroll is an element id (from a hash), we need to compute y.
                deep_linked = document.getElementById(hash.slice(1));
                if (deep_linked) {
                    scroll = {
                        x: 0,
                        y: deep_linked.getBoundingClientRect().top + scrollY
                    };
                }
            }
            scroll_history[cid] = scroll;
            if (scroll && (popstate || deep_linked)) {
                scrollTo(scroll.x, scroll.y);
            }
            else {
                scrollTo(0, 0);
            }
        }
    });
}

function get_base_uri(window_document) {
    let baseURI = window_document.baseURI;
    if (!baseURI) {
        const baseTags = window_document.getElementsByTagName('base');
        baseURI = baseTags.length ? baseTags[0].href : window_document.URL;
    }
    return baseURI;
}

let prefetching = null;
let mousemove_timeout;
function start() {
    addEventListener('touchstart', trigger_prefetch);
    addEventListener('mousemove', handle_mousemove);
}
function prefetch(href) {
    const target = select_target(new URL(href, get_base_uri(document)));
    if (target) {
        if (!prefetching || href !== prefetching.href) {
            prefetching = { href, promise: hydrate_target(target) };
        }
        return prefetching.promise;
    }
}
function get_prefetched(target) {
    if (prefetching && prefetching.href === target.href) {
        return prefetching.promise;
    }
    else {
        return hydrate_target(target);
    }
}
function trigger_prefetch(event) {
    const a = find_anchor(event.target);
    if (a && a.hasAttribute('sapper:prefetch')) {
        prefetch(a.href);
    }
}
function handle_mousemove(event) {
    clearTimeout(mousemove_timeout);
    mousemove_timeout = setTimeout(() => {
        trigger_prefetch(event);
    }, 20);
}

function goto(href, opts = { noscroll: false, replaceState: false }) {
    const target = select_target(new URL(href, get_base_uri(document)));
    if (target) {
        const res = navigate(target, null, opts.noscroll);
        _history[opts.replaceState ? 'replaceState' : 'pushState']({ id: cid }, '', href);
        return res;
    }
    location.href = href;
    return new Promise(() => {
        /* never resolves */
    });
}

function page_store(value) {
    const store = writable(value);
    let ready = true;
    function notify() {
        ready = true;
        store.update(val => val);
    }
    function set(new_value) {
        ready = false;
        store.set(new_value);
    }
    function subscribe(run) {
        let old_value;
        return store.subscribe((new_value) => {
            if (old_value === undefined || (ready && new_value !== old_value)) {
                run(old_value = new_value);
            }
        });
    }
    return { notify, set, subscribe };
}

const initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;
let ready = false;
let root_component;
let current_token;
let root_preloaded;
let current_branch = [];
let current_query = '{}';
const stores = {
    page: page_store({}),
    preloading: writable(null),
    session: writable(initial_data && initial_data.session)
};
let $session;
let session_dirty;
stores.session.subscribe((value) => __awaiter(void 0, void 0, void 0, function* () {
    $session = value;
    if (!ready)
        return;
    session_dirty = true;
    const dest = select_target(new URL(location.href));
    const token = current_token = {};
    const { redirect, props, branch } = yield hydrate_target(dest);
    if (token !== current_token)
        return; // a secondary navigation happened while we were loading
    if (redirect) {
        yield goto(redirect.location, { replaceState: true });
    }
    else {
        yield render(branch, props, buildPageContext(props, dest.page));
    }
}));
let target;
function set_target(node) {
    target = node;
}
function start$1(opts) {
    set_target(opts.target);
    init(initial_data.baseUrl, handle_target$1);
    start();
    if (initial_data.error) {
        return Promise.resolve().then(() => {
            return handle_error();
        });
    }
    return load_current_page();
}
function handle_error() {
    const { host, pathname, search } = location;
    const { session, preloaded, status, error } = initial_data;
    if (!root_preloaded) {
        root_preloaded = preloaded && preloaded[0];
    }
    const props = {
        error,
        status,
        session,
        level0: {
            props: root_preloaded
        },
        level1: {
            props: {
                status,
                error
            },
            component: Error$1
        },
        segments: preloaded
    };
    const query = extract_query(search);
    render([], props, { host, path: pathname, query, params: {}, error });
}
function buildPageContext(props, page) {
    const { error } = props;
    return Object.assign({ error }, page);
}
function handle_target$1(dest) {
    return __awaiter(this, void 0, void 0, function* () {
        if (root_component)
            stores.preloading.set(true);
        const hydrating = get_prefetched(dest);
        const token = current_token = {};
        const hydrated_target = yield hydrating;
        const { redirect } = hydrated_target;
        if (token !== current_token)
            return; // a secondary navigation happened while we were loading
        if (redirect) {
            yield goto(redirect.location, { replaceState: true });
        }
        else {
            const { props, branch } = hydrated_target;
            yield render(branch, props, buildPageContext(props, dest.page));
        }
    });
}
function render(branch, props, page) {
    return __awaiter(this, void 0, void 0, function* () {
        stores.page.set(page);
        stores.preloading.set(false);
        if (root_component) {
            root_component.$set(props);
        }
        else {
            props.stores = {
                page: { subscribe: stores.page.subscribe },
                preloading: { subscribe: stores.preloading.subscribe },
                session: stores.session
            };
            props.level0 = {
                props: yield root_preloaded
            };
            props.notify = stores.page.notify;
            root_component = new App({
                target,
                props,
                hydrate: true
            });
        }
        current_branch = branch;
        current_query = JSON.stringify(page.query);
        ready = true;
        session_dirty = false;
    });
}
function part_changed(i, segment, match, stringified_query) {
    // TODO only check query string changes for preload functions
    // that do in fact depend on it (using static analysis or
    // runtime instrumentation)
    if (stringified_query !== current_query)
        return true;
    const previous = current_branch[i];
    if (!previous)
        return false;
    if (segment !== previous.segment)
        return true;
    if (previous.match) {
        if (JSON.stringify(previous.match.slice(1, i + 2)) !== JSON.stringify(match.slice(1, i + 2))) {
            return true;
        }
    }
}
function hydrate_target(dest) {
    return __awaiter(this, void 0, void 0, function* () {
        const { route, page } = dest;
        const segments = page.path.split('/').filter(Boolean);
        let redirect = null;
        const props = { error: null, status: 200, segments: [segments[0]] };
        const preload_context = {
            fetch: (url, opts) => fetch(url, opts),
            redirect: (statusCode, location) => {
                if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
                    throw new Error('Conflicting redirects');
                }
                redirect = { statusCode, location };
            },
            error: (status, error) => {
                props.error = typeof error === 'string' ? new Error(error) : error;
                props.status = status;
            }
        };
        if (!root_preloaded) {
            const root_preload = undefined || (() => ({}));
            root_preloaded = initial_data.preloaded[0] || root_preload.call(preload_context, {
                host: page.host,
                path: page.path,
                query: page.query,
                params: {}
            }, $session);
        }
        let branch;
        let l = 1;
        try {
            const stringified_query = JSON.stringify(page.query);
            const match = route.pattern.exec(page.path);
            let segment_dirty = false;
            branch = yield Promise.all(route.parts.map((part, i) => __awaiter(this, void 0, void 0, function* () {
                const segment = segments[i];
                if (part_changed(i, segment, match, stringified_query))
                    segment_dirty = true;
                props.segments[l] = segments[i + 1]; // TODO make this less confusing
                if (!part)
                    return { segment };
                const j = l++;
                let result;
                if (!session_dirty && !segment_dirty && current_branch[i] && current_branch[i].part === part.i) {
                    result = current_branch[i];
                }
                else {
                    segment_dirty = false;
                    const { default: component, preload } = yield components[part.i].js();
                    let preloaded;
                    if (ready || !initial_data.preloaded[i + 1]) {
                        preloaded = preload
                            ? yield preload.call(preload_context, {
                                host: page.host,
                                path: page.path,
                                query: page.query,
                                params: part.params ? part.params(dest.match) : {}
                            }, $session)
                            : {};
                    }
                    else {
                        preloaded = initial_data.preloaded[i + 1];
                    }
                    result = { component, props: preloaded, segment, match, part: part.i };
                }
                return (props[`level${j}`] = result);
            })));
        }
        catch (error) {
            props.error = error;
            props.status = 500;
            branch = [];
        }
        return { redirect, props, branch };
    });
}

start$1({
	target: document.querySelector('#app')
});

export { listen_dev as $, get_all_dirty_from_scope as A, get_slot_changes as B, create_component as C, claim_component as D, mount_component as E, destroy_component as F, group_outros as G, toggle_class as H, svg_element as I, claim_svg_element as J, Icon$1 as K, skipIn as L, keys as M, mapWith as N, transformValues as O, ArrowRightCircle$1 as P, indexValuesWith as Q, getKey as R, SvelteComponentDev as S, pipe as T, mapValuesWith as U, objectToKeyValueArray as V, pick as W, partial as X, zip as Y, set_data_dev as Z, __ as _, space as a, allOf as a$, bubble as a0, empty as a1, getContext as a2, setContext as a3, globals as a4, null_to_empty as a5, makeStyleVars as a6, add_render_callback as a7, add_resize_listener as a8, createEventDispatcher as a9, _ as aA, pairs as aB, prop_dev as aC, setIn as aD, binding_callbacks as aE, assign as aF, get_spread_update as aG, get_spread_object as aH, isNotNull as aI, updateKey as aJ, makeMergeAppliedFnMap as aK, toPx as aL, beforeUpdate as aM, afterUpdate as aN, collectionCompare as aO, always as aP, index as aQ, isIn as aR, sortWith as aS, when as aT, validate_each_keys as aU, update_keyed_each as aV, destroy_block as aW, getPath as aX, not as aY, set_style as aZ, reduceWith as a_, validate_store as aa, component_subscribe as ab, writable as ac, concat as ad, mergeObj as ae, appendTo as af, has as ag, last as ah, pullFrom as ai, sort as aj, uniques as ak, is_function as al, run_all as am, subscribe as an, _screen as ao, Switch$1 as ap, ArrowLeftCircle$1 as aq, ChevronLeft$1 as ar, ChevronRight$1 as as, MinusCircle$1 as at, PlusCircle$1 as au, A11yPerson$1 as av, ScreenSensor$1 as aw, isServerSide as ax, isClientSide as ay, makeKeyed as az, detach_dev as b, transformPaths as b$, isGTE as b0, isLTE as b1, identity as b2, adapter as b3, map as b4, reduce as b5, isNotNil as b6, isIterableNotEmpty as b7, every as b8, hasKey as b9, joinWithBlank as bA, casus as bB, isNil as bC, isKeyValue as bD, readable as bE, make as bF, tail as bG, skip as bH, getAt as bI, mapValues as bJ, sorter as bK, get_store_value as bL, values as bM, groupBy as bN, setKey as bO, flatMapWith as bP, isGT as bQ, updateKeys as bR, filter as bS, isIterableEmpty as bT, applyFnMap as bU, set_store_value as bV, stop_propagation as bW, isArray as bX, isObject as bY, negate as bZ, keyValueArrayToObject as b_, flatten as ba, collect as bb, findIndexWhere as bc, findLastIndexWhere as bd, slice as be, filterWith as bf, isUndefined as bg, range as bh, sorterDesc as bi, head as bj, zipWithIndex as bk, generic as bl, onMount as bm, action_destroyer as bn, findIndex as bo, is as bp, isNumber as bq, apply as br, getLength as bs, divide as bt, sum as bu, pluck as bv, indexBy as bw, transpose as bx, derived as by, getTruthyValuesKeys as bz, claim_space as c, setPathIn as c0, makeStyle as c1, dispatch_dev as d, element as e, claim_element as f, children as g, claim_text as h, init$2 as i, attr_dev as j, src_url_equal as k, add_location as l, insert_hydration_dev as m, append_hydration_dev as n, noop as o, validate_each_argument as p, query_selector_all as q, create_slot as r, safe_not_equal as s, text as t, transition_in as u, validate_slots as v, transition_out as w, check_outros as x, destroy_each as y, update_slot_base as z };

import __inject_styles from './inject_styles.803b7e80.js';