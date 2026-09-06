/* ==========================================================================
   Women in Power — shared page behavior

   Two things live here:
     1. Theme control  — light / dark / follow the system, remembered.
     2. Journey explorer — the interactive mentor and mentee walkthroughs.

   Both are progressive enhancements. With JavaScript off, the theme follows
   the operating system and every journey renders in full as a plain list.
   ========================================================================== */
(function () {
  'use strict';

  document.documentElement.classList.add('has-js');

  /* ======================================================================
     1. THEME
     The <head> of each page runs a tiny inline snippet that applies the
     stored choice before first paint. This wires up the button.
     ====================================================================== */

  var STORE = 'wip-theme';
  var ORDER = ['auto', 'light', 'dark'];

  var ICONS = {
    auto:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/></svg>',
    light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>',
    dark:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>'
  };
  var LABEL = { auto: 'Auto', light: 'Light', dark: 'Dark' };

  function read() {
    try {
      var v = localStorage.getItem(STORE);
      return ORDER.indexOf(v) > -1 ? v : 'auto';
    } catch (e) { return 'auto'; }   // private mode, blocked storage
  }

  function write(v) {
    try {
      if (v === 'auto') localStorage.removeItem(STORE);
      else localStorage.setItem(STORE, v);
    } catch (e) { /* nothing we can do, and nothing that breaks */ }
  }

  function apply(mode) {
    if (mode === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', mode);
  }

  function paintButton(btn, mode) {
    btn.innerHTML = ICONS[mode] + '<span>' + LABEL[mode] + '</span>';
    btn.setAttribute('aria-label', 'Color theme: ' + LABEL[mode] + '. Activate to change.');
    btn.title = 'Color theme: ' + LABEL[mode];
  }

  function initTheme() {
    var buttons = document.querySelectorAll('[data-theme-toggle]');
    if (!buttons.length) return;
    var mode = read();
    apply(mode);
    Array.prototype.forEach.call(buttons, function (btn) {
      paintButton(btn, mode);
      btn.addEventListener('click', function () {
        mode = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
        apply(mode);
        write(mode);
        Array.prototype.forEach.call(buttons, function (b) { paintButton(b, mode); });
      });
    });
  }

  /* ======================================================================
     2. JOURNEY EXPLORER

     Reads its content from the markup already on the page — the four
     <ol class="timeline"> journeys inside .je-source — so there is exactly
     one copy of the words, and it still reads correctly with JS off.
     ====================================================================== */

  function text(el, sel) {
    var n = el.querySelector(sel);
    return n ? n.textContent.trim() : '';
  }

  function parseJourneys(root) {
    var map = {};
    Array.prototype.forEach.call(root.querySelectorAll('.je-journey'), function (j) {
      var key = j.getAttribute('data-tier') + '-' + j.getAttribute('data-role');
      map[key] = {
        total: j.getAttribute('data-total') || '',
        steps: Array.prototype.map.call(j.querySelectorAll('li'), function (li) {
          var title = text(li, '.tl-title');
          return {
            when:  text(li, '.tl-when'),
            title: title,
            body:  li.querySelector('.tl-body') ? li.querySelector('.tl-body').innerHTML : '',
            time:  text(li, '.tl-time'),
            label: li.getAttribute('data-label') || title
          };
        })
      };
    });
    return map;
  }

  function initExplorer(root) {
    var source = root.querySelector('.je-source');
    if (!source) return;

    var journeys = parseJourneys(source);
    var rail   = root.querySelector('.je-rail');
    var panel  = root.querySelector('.je-panel');
    var elWhen = root.querySelector('.je-when');
    var elTitle= root.querySelector('.je-title');
    var elBody = root.querySelector('.je-body');
    var elTags = root.querySelector('.je-tags');
    var elCount= root.querySelector('.je-count');
    var elTotal= root.querySelector('.je-total');
    var bar    = root.querySelector('.je-bar > i');
    var prev   = root.querySelector('[data-je-prev]');
    var next   = root.querySelector('[data-je-next]');
    if (!rail || !panel) return;

    var tier = root.getAttribute('data-tier') || '1';
    var role = root.getAttribute('data-role') || 'mentee';
    var index = 0;
    var firstPaint = true;

    function current() { return journeys[tier + '-' + role] || { steps: [], total: '' }; }

    /* --- Render the rail of step dots --------------------------------- */
    function buildRail() {
      var steps = current().steps;
      rail.innerHTML = '';
      steps.forEach(function (s, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'je-step';
        b.setAttribute('role', 'tab');           // tabs must be owned directly
        b.id = 'je-tab-' + i;                    // by the tablist, so no <li>
        b.setAttribute('aria-controls', panel.id);
        b.innerHTML = '<span class="je-dot">' + (i + 1) + '</span>' +
                      '<span class="je-lbl">' + s.label + '</span>';
        b.addEventListener('click', function () { go(i); });
        rail.appendChild(b);
      });
    }

    /* --- Paint the selected step -------------------------------------- */
    function paint() {
      var j = current();
      var steps = j.steps;
      if (!steps.length) return;
      if (index > steps.length - 1) index = steps.length - 1;
      var s = steps[index];

      Array.prototype.forEach.call(rail.querySelectorAll('.je-step'), function (b, i) {
        var selected = i === index;
        b.setAttribute('aria-selected', selected ? 'true' : 'false');
        b.tabIndex = selected ? 0 : -1;                 // roving tabindex
        if (i < index) b.setAttribute('data-state', 'done');
        else b.removeAttribute('data-state');
      });

      elWhen.textContent  = s.when;
      elTitle.textContent = s.title;
      elBody.innerHTML    = s.body;
      elTags.innerHTML    = (s.time ? '<span class="pill pill-neutral">' + s.time + '</span>' : '') +
        '<span class="pill ' + (tier === '1' ? 'pill-t1' : 'pill-t2') + '">Tier ' + tier +
        ' &middot; ' + (role === 'mentor' ? 'Mentor' : 'Mentee') + '</span>';
      elCount.textContent = 'Step ' + (index + 1) + ' of ' + steps.length;
      if (elTotal) elTotal.textContent = j.total;
      if (bar) bar.style.width = ((index + 1) / steps.length * 100) + '%';
      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index === steps.length - 1;

      panel.setAttribute('aria-labelledby', 'je-tab-' + index);
      panel.setAttribute('data-anim', 'in');
      window.setTimeout(function () { panel.removeAttribute('data-anim'); }, 350);

      // Keep the active dot in view by scrolling THE RAIL, never the page.
      // scrollIntoView({block:'nearest'}) looks harmless but scrolls the
      // nearest scrollable ancestor in both axes — on load, with the rail
      // below the fold, that drags the whole page down to it. Setting
      // rail.scrollLeft cannot move the page. Skipped on first paint so
      // arriving at the page never moves anything at all.
      var active = rail.querySelector('.je-step[aria-selected="true"]');
      if (active && !firstPaint) {
        var target = active.offsetLeft - (rail.clientWidth - active.offsetWidth) / 2;
        target = Math.max(0, Math.min(target, rail.scrollWidth - rail.clientWidth));
        // Assigning scrollLeft rather than scrollTo({behavior}): .je-rail
        // already carries scroll-behavior:smooth in CSS, so this animates
        // where that is supported and jumps where it is not, instead of
        // silently doing nothing.
        rail.scrollLeft = target;
      }
      firstPaint = false;
    }

    function go(i, focusDot) {
      var steps = current().steps;
      index = Math.max(0, Math.min(i, steps.length - 1));
      paint();
      if (focusDot) {
        var active = rail.querySelector('.je-step[aria-selected="true"]');
        if (active) active.focus();
      }
    }

    /* --- Keyboard: standard tablist behavior -------------------------- */
    rail.addEventListener('keydown', function (e) {
      var n = current().steps.length;
      var k = e.key;
      if (k === 'ArrowRight' || k === 'ArrowDown')      go((index + 1) % n, true);
      else if (k === 'ArrowLeft' || k === 'ArrowUp')    go((index - 1 + n) % n, true);
      else if (k === 'Home')                            go(0, true);
      else if (k === 'End')                             go(n - 1, true);
      else return;
      e.preventDefault();
    });

    if (prev) prev.addEventListener('click', function () { go(index - 1); });
    if (next) next.addEventListener('click', function () { go(index + 1); });

    /* --- Segmented controls -------------------------------------------- */
    Array.prototype.forEach.call(root.querySelectorAll('.seg'), function (seg) {
      var btns = seg.querySelectorAll('.seg-btn');
      function select(btn) {
        Array.prototype.forEach.call(btns, function (b) {
          var on = b === btn;
          b.setAttribute('aria-checked', on ? 'true' : 'false');
          b.tabIndex = on ? 0 : -1;
        });
        if (btn.hasAttribute('data-tier')) tier = btn.getAttribute('data-tier');
        if (btn.hasAttribute('data-role')) role = btn.getAttribute('data-role');
        root.setAttribute('data-tier', tier);
        root.setAttribute('data-role', role);
        index = 0;
        buildRail();
        rail.scrollLeft = 0;
        paint();
      }
      Array.prototype.forEach.call(btns, function (b) {
        b.addEventListener('click', function () { select(b); });
      });
      seg.addEventListener('keydown', function (e) {
        var list = Array.prototype.slice.call(btns);
        var cur = list.indexOf(document.activeElement);
        if (cur < 0) return;
        var to;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') to = (cur + 1) % list.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') to = (cur - 1 + list.length) % list.length;
        else return;
        e.preventDefault();
        list[to].focus();
        select(list[to]);
      });
    });

    /* --- "Show every step" fallback view -------------------------------- */
    var toggleAll = root.querySelector('[data-je-showall]');
    if (toggleAll) {
      toggleAll.addEventListener('click', function () {
        var open = source.classList.toggle('is-open');
        toggleAll.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggleAll.textContent = open ? 'Hide the full list' : 'Show all four journeys as a list';
      });
    }

    buildRail();
    paint();
  }

  /* ======================================================================
     3. BACK TO TOP

     Visibility is driven by a passive scroll listener coalesced with
     requestAnimationFrame, so at most one check runs per frame.

     On activation we scroll to the top AND move focus there. Scrolling alone
     leaves a keyboard or screen-reader user's focus stranded where they were,
     so the next Tab would drop them back down the page.
     ====================================================================== */

  function initToTop() {
    var btn = document.querySelector('.to-top');
    if (!btn) return;

    var target = document.getElementById('top') || document.body;
    var shown = false;
    var ticking = false;

    function evaluate() {
      ticking = false;
      // Show once the reader is roughly a screenful down, so it never
      // covers content on a short page or at the top of a long one.
      var trigger = Math.max(400, window.innerHeight * 0.9);
      var should = (window.pageYOffset || document.documentElement.scrollTop) > trigger;
      if (should !== shown) {
        shown = should;
        btn.classList.toggle('is-visible', shown);
      }
    }

    function onScroll() {
      // Coalesce to one check per frame rather than one per scroll event.
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(evaluate);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    evaluate();

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var reduce = window.matchMedia &&
                   window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });

      // Scrolling alone strands a keyboard or screen-reader user's focus
      // where they were, so move focus to the top too. tabindex is added
      // only for the duration of the focus, never joining the tab order.
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
        target.addEventListener('blur', function once() {
          target.removeAttribute('tabindex');
          target.removeEventListener('blur', once);
        });
      }
      target.focus({ preventScroll: true });
    });
  }

  /* ======================================================================
     4. COMMUNITY ROSTER

     Renders assets/data/people.json into a searchable list. Built for the
     thousand-name case, not the ten-name case:

       * Names live in JSON, never in the markup. Adding people is a data
         edit — it can be exported straight from the attendance tracker.
       * The list is built once into a DocumentFragment. Filtering then only
         toggles the `hidden` attribute, so typing never re-renders the DOM.
       * Search is debounced and matches on a pre-lowercased key, so we are
         not calling toLowerCase() a thousand times per keystroke.
       * The count is in an aria-live region, because for a screen reader
         "847 of 1,024" is the only signal that filtering did anything.
     ====================================================================== */

  function initRoster(root) {
    var list    = root.querySelector('.roster');
    var input   = root.querySelector('.roster-q');
    var count   = root.querySelector('.roster-count');
    var chips   = root.querySelectorAll('.chip[data-filter]');
    var empty   = root.querySelector('.roster-empty');
    var src     = root.getAttribute('data-src');
    if (!list || !src) return;

    var items = [];        // { el, key, roles }
    var filter = 'all';
    var query = '';
    var timer = null;

    function nf(n) { return n.toLocaleString('en-US'); }

    function apply() {
      var shown = 0;
      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        var ok = (filter === 'all' || it.roles.indexOf(filter) > -1) &&
                 (query === '' || it.key.indexOf(query) > -1);
        if (ok) { shown++; if (it.el.hidden) it.el.hidden = false; }
        else if (!it.el.hidden) { it.el.hidden = true; }
      }
      if (count) {
        count.textContent = (shown === items.length)
          ? nf(items.length) + (items.length === 1 ? ' person' : ' people')
          : 'Showing ' + nf(shown) + ' of ' + nf(items.length);
      }
      if (empty) empty.hidden = shown !== 0 || items.length === 0;
    }

    function build(people) {
      var frag = document.createDocumentFragment();
      people.forEach(function (p) {
        var li = document.createElement('li');
        var name = document.createElement('span');
        name.className = 'r-name';
        name.textContent = p.name;
        li.appendChild(name);

        var bits = [];
        if (p.roles && p.roles.length) {
          bits.push(p.roles.map(function (r) {
            return r.charAt(0).toUpperCase() + r.slice(1);
          }).join(' & '));
        }
        if (p.cohorts && p.cohorts.length) bits.push(p.cohorts.join(', '));
        if (bits.length) {
          var meta = document.createElement('span');
          meta.className = 'r-meta';
          meta.textContent = bits.join(' · ');
          li.appendChild(meta);
        }

        frag.appendChild(li);
        items.push({ el: li, key: p.name.toLowerCase(), roles: p.roles || [] });
      });
      list.appendChild(frag);
      apply();
    }

    if (input) {
      input.addEventListener('input', function () {
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
          query = input.value.trim().toLowerCase();
          apply();
        }, 120);
      });
    }

    Array.prototype.forEach.call(chips, function (chip) {
      chip.addEventListener('click', function () {
        filter = chip.getAttribute('data-filter');
        Array.prototype.forEach.call(chips, function (c) {
          c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
        });
        apply();
      });
    });

    fetch(src)
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        var people = (data && data.people) || [];
        people.sort(function (a, b) { return a.name.localeCompare(b.name, 'en'); });
        build(people);
      })
      .catch(function () {
        if (count) count.textContent = 'The list could not be loaded just now.';
        if (empty) empty.hidden = true;
      });
  }

  /* ======================================================================
     5. LEADERSHIP PHOTOS

     Each avatar carries data-photo="firstname-lastname.jpg". We preload it
     and only insert the <img> once it has actually loaded, so a person
     without a photo yet shows her initials cleanly — no broken image icon,
     no layout shift, nothing to edit in the HTML when a photo arrives.
     ====================================================================== */

  function initPeoplePhotos() {
    var avatars = document.querySelectorAll('.person-avatar[data-photo]');
    if (!avatars.length) return;
    var base = document.body.getAttribute('data-photo-base') || '';

    Array.prototype.forEach.call(avatars, function (av) {
      var file = av.getAttribute('data-photo');
      if (!file) return;
      var probe = new Image();
      probe.onload = function () {
        var img = document.createElement('img');
        img.src = base + file;
        img.alt = '';                 // the name sits right beside it
        img.loading = 'lazy';
        img.decoding = 'async';
        av.appendChild(img);
      };
      probe.src = base + file;
    });
  }

  /* ====================================================================== */

  function init() {
    initTheme();
    initToTop();
    initPeoplePhotos();
    Array.prototype.forEach.call(
      document.querySelectorAll('.roster-block'),
      initRoster
    );
    Array.prototype.forEach.call(
      document.querySelectorAll('.journey-explorer'),
      initExplorer
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
