# PPCC photos

## What the page is looking for

| File | Used for |
|---|---|
| `ppcc-2025-crowd.jpg` | The hero background on `/ppcc-2026/`. A wide band of faces, cropped from the full photo. |
| `ppcc-2025-group.jpg` | The "Last year" section, at full size. Also the source the crowd crop is cut from. |

**Why two files.** The full frame has *"Hi, Women in Power!"* on the screen
behind everyone. Behind the hero that lands directly under the page's own
headline — two headlines competing, one of them blurred and half-covered. The
crowd crop takes the band of faces *below* the screen, which was doing the
emotional work anyway. The full photo still appears further down, at full
size, where that screen is the whole point.

To recut the crop after replacing the group photo:

```python
from PIL import Image
im = Image.open('ppcc-2025-group.jpg')
im.crop((0, 282, 1024, 624)).save('ppcc-2025-crowd.jpg', quality=88,
                                  optimize=True, progressive=True)
```

Adjust the box so the top edge sits just below the screen. Aim for roughly
3:1 — it is a wide band behind a headline, not a portrait.

Drop the files in with those exact names and they appear. **Nothing to edit in the
HTML.** `wip.js`'s sibling script on that page preloads the image and only
reveals it once it has actually loaded, so until then the hero renders on its
gradient alone — which it is designed to do. A missing photo costs nothing and
there is never a broken image or a half-loaded flash.

## Specs

- **Landscape, wide.** It sits behind the headline as a full-bleed background,
  cropped to `center 32%` so faces stay in frame as the viewport narrows.
- **1600px wide minimum**, 2400px is better. It goes edge to edge on a large
  monitor.
- **JPEG, under ~400 KB.** It is the first thing that loads on the page.
- Busy is fine. It sits at 38% opacity under a dark scrim, so it reads as
  texture and crowd rather than as a photo you study.

## Before you publish a photo of people

A group shot at a public conference is a lower bar than a portrait, but it is
not no bar:

- Check the photographer is happy for it to be used. If it came from the PPCC
  event photographer rather than one of us, ask.
- If anyone in the frame asks to be removed, remove it the same day. Crop or
  swap rather than argue.
- Do not add names to a crowd photo. Nobody in a group shot consented to being
  identified by name on a public page.
