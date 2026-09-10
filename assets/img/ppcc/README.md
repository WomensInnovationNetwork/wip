# PPCC photos

## What the page is looking for

| File | Used for |
|---|---|
| `ppcc-2025-group.jpg` | The framed photo in the hero. |
| `ppcc-2025-luncheon.jpg` | Inside the Tuesday luncheon card. |
| `ppcc-2025-panel.jpg` | Inside the Wednesday panel card. |
| `ppcc-2025-swag.jpg` | The "Last year's table" feature under "All week long". Portrait, so it gets its own two-column block rather than being squeezed into a card. |

**Every photo on this page evidences the claim next to it.** The packed room
proves 600 seats is real; the stage proves the panel is a proper production;
the swag table proves the swag is worth queueing for. A photo that is not
doing that job does not belong on the page — this is not a gallery.

All four are from PPCC 2025 and captioned as last year's, which is honest and
also does useful work: it says this has happened before and it filled up.

### Two we deliberately left out

- Four women on the giant Copilot laptop. Lovely photo, but it is the same
  set and backdrop as the hero. Two shots of one backdrop reads as thin.
- Two women posing at the same laptop. Backlit, faces in shadow, mid-motion.
  A good candid, not a marketing image.

### The swag photo is deliberately uncropped

It shows last year's **Connection Bingo** card alongside the merch, and the
squares are legible — meet someone from a partner company, hear a speaker say
"agent", find a first-time attendee. That is the most interesting thing in the
frame, so it stays, and the copy beside it says plainly that it was 2025 and
there is more this year.

It is portrait, which is why it has its own two-column block instead of
sitting inside one of the three small cards. Dropped in there it would be a
tall sliver with unreadable detail, and it would stretch the whole row.

## Specs

- **Landscape.** It sits in a rounded frame about half the hero wide, so
  anything from 4:3 to 16:9 works.
- **1024px wide minimum**, 1600px is better. It displays around 640px on a
  large monitor, so 1024 is comfortable and 1600 is crisp on a retina screen.
- **JPEG, under ~400 KB.** It is the first thing that loads on the page.
- **Faces matter more than composition.** It is shown at full opacity now, not
  scrimmed, so it is a photo people will actually look at.

## Before you publish a photo of people

A group shot at a public conference is a lower bar than a portrait, but it is
not no bar:

- Check the photographer is happy for it to be used. If it came from the PPCC
  event photographer rather than one of us, ask.
- If anyone in the frame asks to be removed, remove it the same day. Crop or
  swap rather than argue.
- Do not add names to a crowd photo. Nobody in a group shot consented to being
  identified by name on a public page.

## Keep the page short

Photos inside a programme slot sit **beside** the text on screens 900px and
up, not underneath it, so they cost no vertical height at all. Stacked below,
these two were 808px each — most of a screen per photo — and the programme
section alone ran to 3,539px. Moving them alongside took the whole page from
7,248px to 5,554px.

Below 900px they stack, and are cropped to 16:9 with `object-fit: cover`,
because 4:3 at full width is tall on a phone.

If you add another photo to a slot, give the article `class="slot slot-split"`
and wrap the text in `<div class="slot-main">`. Otherwise it will stack and
add a screenful.
