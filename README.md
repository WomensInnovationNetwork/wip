# Women in Power — member pages

Static pages for the [Women in Power](https://www.linkedin.com/company/women-in-power-platform)
community, a program of the **Women's Innovation Network (WIN)**.

Published with GitHub Pages from `main` at
**https://womensinnovationnetwork.github.io/wip/**

## Pages

| Path | Live URL | What it is |
|---|---|---|
| `index.html` | [`/`](https://womensinnovationnetwork.github.io/wip/) | Women in Power overview — who we are, what we do |
| `mentoring/` | [`/mentoring/`](https://womensinnovationnetwork.github.io/wip/mentoring/) | What mentoring is, five cohorts of track record, the two tiers |
| `mentoring/2026-cohort2/` | [`/mentoring/2026-cohort2/`](https://womensinnovationnetwork.github.io/wip/mentoring/2026-cohort2/) | Cohort 2, Autumn 2026 — journeys, calendar, certificates |
| `mentoring/mentorship-prompts/` | [`/mentoring/mentorship-prompts/`](https://womensinnovationnetwork.github.io/wip/mentoring/mentorship-prompts/) | Mentor-Ask Prompt Pack (originally EPPC 2026) |
| `ppcc-2026/` | [`/ppcc-2026/`](https://womensinnovationnetwork.github.io/wip/ppcc-2026/) | Women in Power at the Power Platform Community Conference, Oct 2026 |
| `about/` | [`/about/`](https://womensinnovationnetwork.github.io/wip/about/) | Leadership, and the community roll |
| `style-guide/` | [`/style-guide/`](https://womensinnovationnetwork.github.io/wip/style-guide/) | Living style guide. **Maintainers only; not linked from member pages.** |

## Information architecture

Three pillars at the top level. Everything else lives inside one of them.

```
/                              Women in Power — overview
├── /mentoring/                pillar 1
│     ├── 2026-cohort2/
│     └── mentorship-prompts/
├── /skilling/                 pillar 2 — not built yet
├── /networking/               pillar 3 — not built yet
└── /about/                    site-level, not a pillar
```

Two levels of navigation carry this:

- **Primary (masthead)** — pages you can open first (Mentoring, About), then
  pillars with no page yet, quiet and unlinked. It does not grow when a pillar
  gains a page: Skilling turns from placeholder into link, in place.
- **Secondary (`.subnav`)** — appears on pages *inside* a pillar and lists
  that pillar's pages, labelled with the pillar name.

Cohort 2 and the Prompt Pack are Mentoring pages, so they belong in the
sub-nav, not the masthead. That is what keeps the top level readable once
Skilling and Networking arrive.

Pillars without pages render as `.nav-soon` spans, not links — a nav item that
404s is worse than one that admits it is not ready. They sit *after* the real
links and stay visually quiet: a placeholder must never outrank a page someone
can actually open.

### Adding the Skilling pillar

1. Create `skilling/index.html` from any existing page.
2. In **every** page's masthead, swap the `<span class="nav-soon">Skilling…`
   for a real link at the right relative depth.
3. If Skilling gains a second page, add a `.subnav` with its label set to
   "Skilling".
4. Update the pillar card on the overview page and the table above.

Section 02 of the style guide has the same rules with examples.

## How this is built

Plain HTML and one shared stylesheet. No build step, no dependencies — edit a
file, commit, and GitHub Pages publishes it.

```
├── assets/
│   ├── css/wip.css        ← design tokens + components. Single source of truth.
│   ├── js/wip.js          ← theme, back-to-top, journey explorer, roster
│   ├── data/people.json   ← the community roll. Names live ONLY here.
│   └── img/               ← logos (see img/README.md for what's still needed)
├── style-guide/           ← documents and previews everything in wip.css
├── index.html             ← Women in Power overview (site root)
└── mentoring/
    ├── 2026-cohort2/
    └── mentorship-prompts/
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

The interactive walkthrough on the cohort page reads its content from the four
plain `<ol class="timeline">` lists already in the markup, so there is one copy
of the words. With JavaScript off — and on paper — those lists simply render in
full. To add a journey, add a `.je-journey` block; no JavaScript changes.

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

Then open `http://localhost:8000/mentoring/2026-cohort2/`.

Before merging, check: 320px width, 200% browser zoom, keyboard tab order,
**both light and dark**, and print preview (people print the cohort calendar).

## Audiences

`index.html` and `mentoring/**` are **member-facing** — mentors and mentees. `style-guide/`
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

## The PPCC 2026 page

`ppcc-2026/` is a time-boxed campaign page, deliberately at the root rather
than under a pillar: the URL goes on QR codes, slides and LinkedIn posts, so it
is kept short and stable.

An announcement bar links to it from every member page. **When the event is
over**, move the page under `networking/` and leave a one-line meta-refresh
stub at `ppcc-2026/index.html` — the old URL will be on printed material that
cannot be recalled. Delete the `.announce` block from each page at the same
time.

The hero photo is a drop-in: put `ppcc-2025-group.jpg` in `assets/img/ppcc/`
and it appears behind the headline and un-hides the "Last year" section. The
hero is designed to look finished without it. See that folder's README for
specs and for the consent rules on publishing photos of people.
