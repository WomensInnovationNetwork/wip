/* ==========================================================================
   Women in Power — shared page behaviour

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
    btn.setAttribute('aria-label', 'Colour theme: ' + LABEL[mode] + '. Activate to change.');
    btn.title = 'Colour theme: ' + LABEL[mode];
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

      // Keep the active dot in view without yanking the page around.
      var active = rail.querySelector('.je-step[aria-selected="true"]');
      if (active && active.scrollIntoView) {
        active.scrollIntoView({ block: 'nearest', inline: 'center' });
      }
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

    /* --- Keyboard: standard tablist behaviour -------------------------- */
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

  /* ====================================================================== */

  function init() {
    initTheme();
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
