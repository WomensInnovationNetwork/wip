# Women in Power — member pages

Static pages for the [Women in Power](https://www.linkedin.com/company/women-in-power-platform)
community, a programme of the **Women's Innovation Network (WIN)**.

Published with GitHub Pages from `main` at
**https://womensinnovationnetwork.github.io/mentorship-prompts/**

## Pages

| Path | Live URL | What it is |
|---|---|---|
| `index.html` | [`/`](https://womensinnovationnetwork.github.io/mentorship-prompts/) | Mentor-Ask Prompt Pack (EPPC 2026) |
| `wip/style-guide/` | [`/wip/style-guide/`](https://womensinnovationnetwork.github.io/mentorship-prompts/wip/style-guide/) | Living style guide — tokens, voice, components |
| `wip/mentoring/` | [`/wip/mentoring/`](https://womensinnovationnetwork.github.io/mentorship-prompts/wip/mentoring/) | What WiP mentoring is, and the two tiers |
| `wip/mentoring/2026-cohort2/` | [`/wip/mentoring/2026-cohort2/`](https://womensinnovationnetwork.github.io/mentorship-prompts/wip/mentoring/2026-cohort2/) | Cohort 2, Autumn 2026 — calendar and journeys |

## How this is built

Plain HTML and one shared stylesheet. No build step, no dependencies — edit a
file, commit, and GitHub Pages publishes it.

```
wip/
├── assets/
│   ├── css/wip.css        ← design tokens + components. Single source of truth.
│   ├── js/wip.js          ← theme control + the journey explorer
│   └── img/               ← logos (see img/README.md for what's still needed)
├── style-guide/           ← documents and previews everything in wip.css
└── mentoring/
    └── 2026-cohort2/
```

### Light and dark

Every page ships in both, following the reader's device by default with a
toggle in the masthead to override. Colours are defined once on bare `:root`
and only *redefined* for dark — in a `prefers-color-scheme` block and again
under `[data-theme="dark"]` so the toggle wins either way. Never give a colour
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

1. **Colour, type, spacing, radius** live as CSS custom properties in `:root`
   at the top of `wip/assets/css/wip.css`. Change the token, not the page.
   If you're about to type a hex value into a page, add a token instead.
2. **Page-specific CSS** stays in that page's `<style>` block. Promote it into
   `wip.css` only when a second page needs it.
3. **New component?** Add it to the style guide in the same pull request, or
   the next person will reinvent it.
4. Bump the version and add a change-log row in `wip/style-guide/index.html`.

### Checking a change locally

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/wip/mentoring/2026-cohort2/`.

Before merging, check: 320px width, 200% browser zoom, keyboard tab order,
**both light and dark**, and print preview (people print the cohort calendar).

## What never goes on these pages

They are member-facing. Committee staffing, participant counts, coverage gaps,
unconfirmed decisions and anything said in a leadership channel stay off them.
