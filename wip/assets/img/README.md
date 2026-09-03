# Image assets

| File | What it is | Source |
|---|---|---|
| `win-logo.png` | WIN wordmark — navy `WIN` with the cyan→violet→magenta ribbon above and the "Women's Innovation Network" tagline beneath. Light backgrounds only. | Extracted from the approved logo direction. **Replace with the master export when available.** |

## Still needed

- [ ] **`wip-wordmark.svg`** — the Women in Power wordmark, black script-and-block text only (no silhouette). This replaces the CSS `.lockup-mark` + `.lockup-text` fallback currently used in every masthead.
- [ ] **`win-logo-reverse.svg`** — white/reversed WIN mark for dark backgrounds.
- [ ] **`win-logo.svg`** — vector master, so the footer mark stays crisp at any size.
- [ ] **`og-card.png`** — 1200×630 social preview card.

## Swapping in the real WiP wordmark

In each page masthead, replace:

```html
<a class="lockup" href="...">
  <span class="lockup-mark" aria-hidden="true">WiP</span>
  <span class="lockup-text">
    <span class="lockup-name">Women in Power</span>
    <span class="lockup-sub">Women&rsquo;s Innovation Network</span>
  </span>
</a>
```

with:

```html
<a class="lockup" href="...">
  <img src="<path>/assets/img/wip-wordmark-reverse.svg" alt="Women in Power" width="150">
</a>
```

Mastheads are dark, so the masthead needs the **reversed** (white) wordmark. The black wordmark is for light grounds.

## Rules

- Never re-colour, stretch, rotate or shadow either mark.
- The ribbon always runs cyan → violet → magenta, left to right.
- WIN mark minimum width 120px, so the tagline stays legible.
- Clear space around the WIN mark = the height of its `W`.
