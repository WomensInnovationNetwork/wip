# Image assets

| File | What it is | Used on |
|---|---|---|
| `wip-wordmark.png` | Women in Power wordmark, charcoal ink (`#35363A`) on transparent. Black text lockup only — no silhouette. | Light backgrounds. Style guide. |
| `wip-wordmark-reverse.png` | Same mark, white ink on transparent. | **Every masthead** — they are all dark navy in both themes. |
| `win-logo.png` | WIN wordmark — navy `WIN` with the cyan→violet→magenta ribbon above and the "Women's Innovation Network" tagline beneath. | Page footers. Light grounds only. |

## Provenance, and why that matters

Both wordmark PNGs were rebuilt from a supplied **JPEG** (`WIPlogo.jpg`, 2000×1011, ink on white). JPEG has no transparency, so the alpha channel was reconstructed from luminance with a levels curve — near-white to fully transparent, near-ink to fully opaque, ramped in between so the script lettering keeps its anti-aliasing. The white variant is the same alpha with the ink flattened to white.

They are 1200px wide, so they are sharp everywhere they are currently used (168px in mastheads, 210px in the style guide — a 6–7× downscale). **They will soften if scaled much larger**, and the fine script and the power-button "in" are the first details to go.

`win-logo.png` is worse off: it was extracted from a chat screenshot at 405px, and is only adequate at footer size.

## Still wanted

- [ ] **`wip-wordmark.svg`** — vector master of the Women in Power wordmark. Replaces both PNGs; the reversed version becomes a `fill` change rather than a second file.
- [ ] **`win-logo.svg`** — vector master of the WIN mark, plus a reversed/white variant for dark grounds.
- [ ] **`og-card.png`** — 1200×630 social preview card, so shared links look like us.

## How the marks are wired in

Mastheads use the reversed file directly:

```html
<a class="lockup" href="…">
  <img class="lockup-img" src="<path>/assets/img/wip-wordmark-reverse.png"
       alt="Women in Power" width="1200" height="607">
</a>
```

Intrinsic `width`/`height` stay on the tag so the row reserves space while the image loads; display size comes from `.lockup-img` in `wip.css` (168px, 132px under 520px wide).

There is still a CSS-only fallback lockup in `wip.css` (`.lockup-mark` + `.lockup-text`) for any page that has no image to hand. It is not used by the current pages.

## Rules

- Never re-color, stretch, rotate or shadow either mark.
- The WiP wordmark is the **black text lockup only**. The silhouette is not used in page furniture.
- On dark grounds use the reversed file. Never place the navy WIN mark on navy.
- The ribbon always runs cyan → violet → magenta, left to right.
- WIN mark minimum width 120px, so the tagline stays legible.
- Clear space around the WIN mark = the height of its `W`.

### One trap worth knowing

Dark mode gives dark-ink marks a white plate so they stay visible. That rule is scoped `.logo-plate:not(.dark) img` — it must **never** apply to a reversed (white) mark, or you get white ink on a white box. If you add a new mark, put reversed ones inside `.logo-plate.dark`.
