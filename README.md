# Women in Power — member pages

Static pages for the [Women in Power](https://www.linkedin.com/company/women-in-power-platform)
community, a program of the **Women's Innovation Network (WIN)**.

Published with GitHub Pages from `main` at
**https://womensinnovationnetwork.github.io/wip/**

## Pages

| Path | Live URL | What it is |
|---|---|---|
| `index.html` | [`/`](https://womensinnovationnetwork.github.io/wip/) | Women in Power overview — who we are, what we do |
| `mentoring/` | [`/mentoring/`](https://womensinnovationnetwork.github.io/wip/mentoring/) | What mentoring is, five cohorts of track record, the AMPLIFY tracks |
| `mentoring/2026-fall/` | [`/mentoring/2026-fall/`](https://womensinnovationnetwork.github.io/wip/mentoring/2026-fall/) | AMPLIFY, the Fall 2026 cohort — Power Hour schedule, tracks, journeys |
| `mentoring/mentorship-prompts/` | [`/mentoring/mentorship-prompts/`](https://womensinnovationnetwork.github.io/wip/mentoring/mentorship-prompts/) | Mentor-Ask Prompt Pack (originally EPPC 2026) |
| `skilling/` | [`/skilling/`](https://womensinnovationnetwork.github.io/wip/skilling/) | The Skilling Series — what it is, the fall plan, the December advent calendar, the session archive |
| `skilling/speaker-guide/` | [`/skilling/speaker-guide/`](https://womensinnovationnetwork.github.io/wip/skilling/speaker-guide/) | For people speaking in the series: the six steps, the day itself, a first-talk package |
| `networking/` | [`/networking/`](https://womensinnovationnetwork.github.io/wip/networking/) | Introducing yourself, the question to ask next, ten things that work at a conference |
| `ppcc-2026/` | [`/ppcc-2026/`](https://womensinnovationnetwork.github.io/wip/ppcc-2026/) | Women in Power at the Power Platform Community Conference, Oct 2026 |
| `about/` | [`/about/`](https://womensinnovationnetwork.github.io/wip/about/) | Leadership, and the community roll |
| `style-guide/` | [`/style-guide/`](https://womensinnovationnetwork.github.io/wip/style-guide/) | Living style guide. **Maintainers only; not linked from member pages.** |

## Information architecture

Three pillars at the top level. Everything else lives inside one of them.

```
/                              Women in Power — overview
├── /mentoring/                pillar 1
│     ├── 2026-fall/
│     └── mentorship-prompts/
├── /skilling/                 pillar 2
│     └── speaker-guide/
├── /networking/               pillar 3
└── /about/                    site-level, not a pillar
```

Two levels of navigation carry this:

- **Primary (masthead)** — the three pillars, then About: Mentoring, Skilling,
  Networking, About us. All three pillars have pages as of 6 Oct 2026, so there
  are no `.nav-soon` placeholders left anywhere on the site. About moved to the
  end when the last one went live: it is the only item that is not a pillar, and
  with nothing greyed out behind it there was nothing for it to sit in front of.
- **Secondary (`.subnav`)** — appears on pages *inside* a pillar and lists
  that pillar's pages, labelled with the pillar name.

The cohort page, the Prompt Pack and the speaker guide sit inside a pillar, so
they belong in a sub-nav, not the masthead. Four items is the ceiling up there:
three pillars and About.

Pillars without pages render as `.nav-soon` spans, not links — a nav item that
404s is worse than one that admits it is not ready. They sit *after* the real
links and stay visually quiet: a placeholder must never outrank a page someone
can actually open.

### Adding a fourth pillar

All three exist now: Mentoring (29 Aug 2026), Skilling (28 Sep), Networking
(6 Oct). If a fourth is ever justified — and the bar should be high, because
four top-level items is where a nav starts to need thinking about — this is
the recipe both of the others went through.

1. Create `<pillar>/index.html` from `networking/index.html` or
   `skilling/index.html`. Both are one level deep and carry the full furniture:
   masthead, jump bar, footer.
2. Add it to **every** page's masthead, after the existing pillars and before
   About us. Add `.nav-soon` first only if the page will not land the same day;
   a nav item that 404s is worse than one that admits it is not ready.
3. Add a `.subnav` once the pillar has a second page, labelled with the pillar
   name. Skilling is the worked example.
4. Add a line to every footer nav, add a pillar card to the overview page, and
   update the table above.

Section 02 of the style guide has the same rules with examples.

## How this is built

Plain HTML and one shared stylesheet. No build step, no dependencies — edit a
file, commit, and GitHub Pages publishes it.

```
├── assets/
│   ├── css/wip.css        ← design tokens + components. Single source of truth.
│   ├── js/wip.js          ← theme, back-to-top, journey explorer, roster
│   ├── data/people.json   ← the community roll. Names live ONLY here.
│   └── img/               ← logos, people, event photos, QR codes
│       └── qr/            ← codes for the site URL. No page uses them: they
│                            are for slides, print and conference handouts.
├── style-guide/           ← documents and previews everything in wip.css
├── index.html             ← Women in Power overview (site root)
├── mentoring/
│   ├── 2026-fall/
│   ├── 2026-cohort2/      ← meta-refresh stub only; the cohort page moved
│   └── mentorship-prompts/
└── skilling/
    └── speaker-guide/
```

### Light and dark

Every page ships in both, following the reader's device by default with a
toggle in the masthead to override. Colours are defined once on bare `:root`
and only *redefined* for dark — in a `prefers-color-scheme` block and again
under `[data-theme="dark"]` so the toggle wins either way. Never give a color
its only definition inside a media query. Section 05 of the style guide has
the full rule and the list of which tokens are themed.

Use `--heading` for headings (not `--win-navy`) and `--accent` for eyebrows and
markers, or they will vanish in dark mode.

### The journey explorer

The interactive walkthrough reads its content from the plain
`<ol class="timeline">` lists already in the markup, so there is one copy of the
words. With JavaScript off — and on paper — those lists simply render in full.
To add a journey, add a `.je-journey` block; no JavaScript changes.

It is used on two pages now: the cohort page, with four journeys behind a pair
of segmented controls, and the speaker guide, with a single six-step sequence
and no controls at all. For one journey, leave `.je-controls` out and set
`data-tier` and `data-role` on the `.journey-explorer` to match the one
`.je-journey`; they are only a lookup key and can name anything. Two more
things bit us the first time round: a step renders the **first** `.tl-body` it
finds, so a step with two paragraphs needs `.tl-body` to be a `<div>` wrapping
them; and the "show everything" button takes its wording from
`data-label-closed` / `data-label-open`, falling back to the cohort page's
"Show all four journeys as a list", which is wrong anywhere else.

### Making a change

1. **Color, type, spacing, radius** live as CSS custom properties in `:root`
   at the top of `assets/css/wip.css`. Change the token, not the page.
   If you're about to type a hex value into a page, add a token instead.
2. **Page-specific CSS** stays in that page's `<style>` block. Promote it into
   `wip.css` only when a second page needs it.
3. **New component?** Add it to the style guide in the same pull request, or
   the next person will reinvent it.
4. Bump the version and add a change-log row in `style-guide/index.html`.

### Checking a change locally

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/mentoring/2026-fall/`.

Before merging, check: 320px width, 200% browser zoom, keyboard tab order,
**both light and dark**, and print preview (people print the cohort calendar).

## Audiences

`index.html`, `mentoring/**`, `skilling/**` and `networking/**` are **member-facing** — mentors and mentees. `style-guide/`
is **maintainers only**: it is `noindex`ed and must stay unlinked from every
member page. Don't add it to a member masthead or footer.

It is still served by Pages, so treat it as publicly reachable by anyone with
the URL — it holds design and voice guidance, nothing sensitive.

## What never goes on member pages

Committee staffing, participant counts, coverage gaps, unconfirmed decisions
and anything said in a leadership channel stay off them.

## Testimonials

The "In their words" block on `mentoring/index.html` is **commented out and
empty on purpose**. Attributed quotes must be real and used with the speaker's
permission — never write filler to fill the space. Cohort feedback forms and
the LinkedIn testimonial posts are the source. Uncomment the block once you
have three you can attribute, and ask each speaker before publishing her name.

## People, and consent

`/about/` has two very different lists.

**Leadership** is hand-written in `about/index.html` — roughly 15 people is the
ceiling before a grid of cards becomes a wall; group them by area past that.
Photos are drop-in: `data-photo="first-last.jpg"` on the avatar plus a file in
`assets/img/people/`. `wip.js` preloads and only inserts the image once it has
loaded, so a missing photo falls back to initials rather than a broken image.
See `assets/img/people/README.md`.

**The community roll** is data — `assets/data/people.json`, rendered with search
and role filters, tested at 1,000 names. Never write those names into HTML.

Two rules that are not negotiable:

1. **Nobody is listed without agreeing to it.** Being named and having your
   photo published are separate permissions. Ask for both. The final feedback
   form is the natural place.
2. **Never take a photo from LinkedIn or conference photography.** The
   photographer holds the copyright, and LinkedIn's terms prohibit it. Use the
   image the person gives you.

Leadership roles on the page came from the Feb 2026 planning assignments, which
the source document notes have **not** been re-confirmed for FY27. Validate
before treating the page as authoritative.

## The Skilling pages

`skilling/` is the member-facing cut of two internal documents: the Skilling
Committee's 2026 progress-and-plan dashboard and the speaker guide. The long
comment at the top of `skilling/index.html` lists what was deliberately left
off, and why. The short version:

- **No attendance numbers.** A page that advertises how few people came to a
  session is an argument against attending it.
- **No bench list.** Nobody should learn from a web page that they were the
  backup.
- **No open decisions**, no unscheduled-talk counts, no speaker contact details.
- **No speaker names for a session that has not been announced.** The series
  promises a speaker that her name goes out only once she has confirmed, and the
  page has to keep that promise. Themes are the committee's own framing, so they
  are safe; the line-up is not.
- **No per-speaker "first-time speaker" flag.** The aggregate share is a good
  number to publish. Labelling a named woman as inexperienced next to her own
  talk is not.

Two parts of that page are **dated** and will go stale: the fall plan under
"What's on" and the December advent calendar. Replace them with the next season
rather than leaving them up. The session list under "This season" is the public
archive — add a row once a session has run, and only for sessions that were
publicly announced.

The speaker guide has no contact email: the source document has a placeholder
where one should be. Every "contact us" on the page points at LinkedIn instead.
When there is an address to publish, put it in the FAQ only, not in six places.

## The PPCC 2026 page

`ppcc-2026/` is a time-boxed campaign page, deliberately at the root rather
than under a pillar: the URL goes on QR codes, slides and LinkedIn posts, so it
is kept short and stable.

An announcement bar links to it from every member page. **When the event is
over**, move the page under `networking/` and leave a one-line meta-refresh
stub at `ppcc-2026/index.html` — the old URL will be on printed material that
cannot be recalled. Delete the `.announce` block from each page at the same
time.

### Where's Moon?

`ppcc-2026/wheres-moon/` is Danielle Moon's live tracker for the week: where
she is right now (Pacific time), a venue sketch, her week, a small bot and her
booking link. It is her own interactive, rebuilt in the site's frame. The PPCC
page shows a one-line live summary of it under the Hype Squad.

**The schedule lives in `ppcc-2026/wheres-moon/moon.js` and nowhere else.**
Both pages read that file, so a changed time is changed once. Rules it keeps,
which any edit has to keep too:

- A `busy` block publishes only that she is unavailable, and until when. No
  title, no place, no detail.
- Off-hours name no location.
- Venue names follow the official PPCC schedule where it has one, so they match
  what attendees see in the conference app.

The bot runs entirely in the page. Nothing typed into it goes anywhere.

Booking is open to the public by Danielle's choice (20 Oct 2026). Both the
tracker and the teaser come down with the rest of the event content.

The hero photo is a drop-in: put `ppcc-2025-group.jpg` in `assets/img/ppcc/`
and it appears behind the headline and un-hides the "Last year" section. The
hero is designed to look finished without it. See that folder's README for
specs and for the consent rules on publishing photos of people.
