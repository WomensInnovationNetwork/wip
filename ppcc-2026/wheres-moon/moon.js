/* ==========================================================================
   Where's Moon? Danielle Moon's PPCC 2026 week: the data, and the one
   function that turns a moment in time into "where she is".

   ONE COPY OF THE SCHEDULE. Two pages read this file: the Where's Moon page
   in this folder, and the live line on the PPCC page. Change a time here and
   both follow. Never paste these events into a page.

   Built from Danielle's own "Where's Moon?" page, Oct 2026. Venue names
   follow the official PPCC 2026 schedule (15 Oct revision) where it gives
   one: the keynotes are in the Grand Garden Arena, the Expo Hall is the
   Marquee Ballroom on level 1, the Community Lounge is Premier Pre-function
   on level 3. The luncheon room comes from Danielle, as the official
   schedule only says "check Whova".

   Privacy, by construction: a "busy" block publishes nothing but the fact
   that she is unavailable. No title, no place, no detail. Off-hours say
   "off the clock" and name no location. Only public conference venues are
   ever shown.

   All times are minutes after midnight, Pacific (the conference's own
   zone, and the one people will be standing in).
   ========================================================================== */
(function () {
  'use strict';

  // h = PPCC's own hours that day, when there are any. Between events inside
  // those hours, Moon is "roaming"; outside them she is off the clock.
  var DAYS = [
    { k: 'sun', s: 'Sun', l: 'Sunday, Oct 25',    d: '2026-10-25' },
    { k: 'mon', s: 'Mon', l: 'Monday, Oct 26',    d: '2026-10-26' },
    { k: 'tue', s: 'Tue', l: 'Tuesday, Oct 27',   d: '2026-10-27', h: [390, 1170] },
    { k: 'wed', s: 'Wed', l: 'Wednesday, Oct 28', d: '2026-10-28', h: [465, 1320] },
    { k: 'thu', s: 'Thu', l: 'Thursday, Oct 29',  d: '2026-10-29', h: [450, 930] },
    { k: 'fri', s: 'Fri', l: 'Friday, Oct 30',    d: '2026-10-30' }
  ];

  // [id, name, where in the building]
  var PLACES = [
    ['registration', 'Registration', 'Grand Pre-function, level 1'],
    ['keynote', 'Grand Garden Arena', 'Keynotes'],
    ['expo', 'Expo Hall & Makers Market', 'Marquee Ballroom, level 1'],
    ['theater', 'Community Theater', 'Level 1'],
    ['studio', 'Studio Ballroom', 'Level 1'],
    ['boulevard', 'Boulevard Ballroom 162', 'Level 1'],
    ['lounge', 'Community Lounge', 'Premier Pre-function, level 3'],
    ['room351', 'Room 351', 'Level 3'],
    ['room354', 'Room 354', 'Level 3'],
    ['around', 'Around the MGM Grand', 'Evening events']
  ];

  var HINT = {
    registration: 'Grab your badge and Women in Power swag',
    keynote: 'The big-stage keynotes',
    expo: 'Booths, demos and the Night Market',
    theater: 'Short community talks',
    studio: 'The Women in Power Networking Luncheon',
    boulevard: 'The Women in Power panel',
    lounge: 'The Women in Power check-in desk, Tuesday to Thursday',
    room351: 'The Women in Power roundtable',
    room354: 'Industry deep dives',
    around: 'Evening events'
  };

  // Schematic positions on an 800 x 452 grid: [x, y, width, height].
  var ZONES = {
    registration: [16, 44, 132, 180], keynote: [158, 44, 220, 86], expo: [158, 138, 220, 86],
    boulevard: [388, 44, 396, 86], studio: [388, 138, 194, 86], theater: [590, 138, 194, 86],
    lounge: [16, 268, 260, 70], room351: [286, 268, 160, 70], room354: [456, 268, 160, 70],
    around: [16, 382, 768, 58]
  };

  var MOOD = {
    find:    { l: 'Find me!',      b: 'b-find' },
    session: { l: 'In a session',  b: 'b-session' },
    busy:    { l: 'Unavailable',   b: 'b-busy' },
    off:     { l: 'Off the clock', b: 'b-off' }
  };

  /* The public schedule. d = day, s/e = start/end, t = title, pl = place,
     p = mood, x = detail, g = words the bot matches on. */
  var EV = [
    { d: 'sun', s: 615,  e: 695,  p: 'busy' },
    { d: 'mon', s: 780,  e: 990,  p: 'busy' },
    { d: 'tue', s: 510,  e: 600,  t: 'Opening keynote: Charles Lamanna and Ryan Cunningham', pl: 'keynote', p: 'session', g: 'keynote opening' },
    { d: 'tue', s: 600,  e: 660,  t: 'Expo Hall opens: come and say hi', pl: 'expo', p: 'find', g: 'expo booth makers' },
    { d: 'tue', s: 660,  e: 750,  p: 'busy' },
    { d: 'tue', s: 750,  e: 840,  t: 'Women in Power Networking Luncheon', pl: 'studio', p: 'find', x: 'Red carpet, photographers, themed tables. Open to everyone, allies included.', g: 'lunch luncheon women in power wip networking' },
    { d: 'tue', s: 1020, e: 1170, t: 'Night Market and Women in Power meetup', pl: 'expo', p: 'find', x: 'Meet the Women in Power crew first and walk in together. The meeting point goes out in the WhatsApp group.', g: 'night market reception party meetup evening' },
    { d: 'wed', s: 675,  e: 750,  p: 'busy' },
    { d: 'wed', s: 825,  e: 840,  p: 'busy' },
    { d: 'wed', s: 840,  e: 900,  t: 'Women in Power panel: Owning Your Power, Claiming Your Seat', pl: 'boulevard', p: 'session', x: 'Moon hosts a fireside chat with Laura Martelli, then the Women in Power panel takes the stage.', g: 'panel fireside women in power wip ms69 stage' },
    { d: 'wed', s: 1200, e: 1320, t: 'Attendee celebration with Pitbull, live', pl: 'around', p: 'find', x: 'In the Grand Garden Arena. Details in the PPCC app.', g: 'party pitbull celebration concert evening' },
    { d: 'thu', s: 540,  e: 600,  t: 'Closing keynote: Charles Lamanna with Chris Paul', pl: 'keynote', p: 'session', g: 'keynote closing chris paul' },
    { d: 'thu', s: 645,  e: 705,  t: 'Roundtable: Make Your Network Your Net Worth', pl: 'room351', p: 'session', x: 'Co-hosted with Sravani Seethi and Delia Zuniga.', g: 'roundtable network linkedin women in power wip' },
    { d: 'fri', s: 750,  e: 830,  p: 'busy' }
  ];

  var BUSY_T = 'Unavailable: booked';

  function di(k) { for (var i = 0; i < DAYS.length; i++) if (DAYS[i].k === k) return i; return 2; }
  function day(k) { return DAYS[di(k)]; }
  function pl(id) { for (var i = 0; i < PLACES.length; i++) if (PLACES[i][0] === id) return PLACES[i]; return null; }
  function ord(m) { return di(m.d) * 1440 + m.m; }
  function fmt(n) {
    var h = Math.floor(n / 60) % 24, m = n % 60, ap = h >= 12 ? 'PM' : 'AM', hh = h % 12 === 0 ? 12 : h % 12;
    return m ? hh + ':' + (m < 10 ? '0' : '') + m + ' ' + ap : hh + ' ' + ap;
  }
  function title(e) { return e.p === 'busy' ? BUSY_T : e.t; }

  // The current moment in Pacific time, or null outside the conference week.
  function ptNow() {
    try {
      var f = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
      var g = function (t) { for (var i = 0; i < f.length; i++) if (f[i].type === t) return f[i].value; return ''; };
      var ds = g('year') + '-' + g('month') + '-' + g('day');
      for (var i = 0; i < DAYS.length; i++) if (DAYS[i].d === ds) return { d: DAYS[i].k, m: +g('hour') * 60 + +g('minute') };
    } catch (err) { /* no Intl time zones: treat as outside the week */ }
    return null;
  }

  // Where is Moon at moment a = { d, m }?
  function locate(a) {
    var hits = EV.filter(function (e) { return e.d === a.d && e.s <= a.m && a.m < e.e; })
      .sort(function (x, y) { return (y.p === 'busy' ? 1 : 0) - (x.p === 'busy' ? 1 : 0) || y.s - x.s; });
    var e = hits[0];
    if (e && e.p === 'busy') return { mood: 'busy', place: null, head: BUSY_T, detail: 'Moon is booked right now. She is free again after ' + fmt(e.e) + ', or book a slot on her calendar.', until: e.e, ev: e };
    if (e) return { mood: e.p, place: e.pl, head: e.t, detail: e.x || '', until: e.e, ev: e };
    var h = day(a.d).h;
    if (h && a.m >= h[0] && a.m < h[1]) return { mood: 'find', place: 'lounge', head: 'Between sessions, roaming the conference', detail: 'Best bets: the Women in Power desk in the Community Lounge on level 3, or a lap of the Expo Hall.' };
    return { mood: 'off', place: null, head: 'Off the clock, recharging under the Vegas lights', detail: 'Catch Moon during conference hours.' };
  }

  // The moon icon, with a phase per mood.
  function moonSvg(mood, size) {
    var shade = {
      find: '',
      session: '<path d="M16 3 A13 13 0 0 0 16 29 Z" fill="#2D164C"/>',
      busy: '<circle cx="16" cy="16" r="13" fill="#2D164C"/>',
      off: '<path d="M16 3 A13 13 0 0 0 16 29 A8 13 0 0 1 16 3 Z" fill="#2D164C"/>'
    }[mood];
    return '<svg viewBox="0 0 32 32" width="' + size + '" height="' + size + '" aria-hidden="true"><circle cx="16" cy="16" r="13" fill="#fdf2c4"/><circle cx="11" cy="12" r="2.2" fill="#eadb9a"/><circle cx="20" cy="20" r="3" fill="#eadb9a"/>' + shade + '</svg>';
  }

  window.WIP_MOON = {
    DAYS: DAYS, PLACES: PLACES, HINT: HINT, ZONES: ZONES, MOOD: MOOD, EV: EV,
    di: di, day: day, pl: pl, ord: ord, fmt: fmt, title: title, ptNow: ptNow, locate: locate, moonSvg: moonSvg
  };
})();
