# People photos

One photo per person, for every page. `/about/` uses most of them, and the PPCC
page's Hype Squad uses five (two of them shared with `/about/`). Reuse a file
rather than adding a second copy of the same person.

Drop a photo in this folder and it appears on `/about/` automatically. There is
**nothing to edit in the HTML** — the page looks for a file by name, and falls
back to the person's initials on a gradient until one exists.

## Filenames

Lowercase, hyphenated, `.jpg`. These are the names `/about/` is already
looking for:

| Person | File |
|---|---|
| Danielle Moon | `danielle-moon.jpg` |
| Sravani Seethi | `sravani-seethi.jpg` |
| Shriya Malhotra | `shriya-malhotra.jpg` |
| Drew Tattam | `drew-tattam.jpg` |
| Jessica Edwards | `jessica-edwards.jpg` |
| Samantha Inquieti | `samantha-inquieti.jpg` |
| Geetha Sivasailam | `geetha-sivasailam.jpg` |
| Delia Zuniga | `delia-zuniga.jpg` |
| Suparna Banerjee | `suparna-banerjee.jpg` |
| Hanh Nguyen | `hanh-nguyen.jpg` |
| Krystal Velez | `krystal-velez.jpg` |
| Ragavendar Swaminatha Subramanian | `ragavendar-swaminatha.jpg` |
| Kimberly Tiong | `kimberly-tiong.jpg` |
| Veronica Fair | `veronica-fair.jpg` |
| Asad Fathima | `asad-fathima.jpg` |
| Brittany Bolden | `brittany-bolden.jpg` — PPCC Hype Squad only |
| Michelle Johnston | `michelle-johnston.jpg` — PPCC Hype Squad only |

`jessica-edwards.jpg` exists as of 14 Oct 2026, for the PPCC Hype Squad. The
About page shows Jessica on the shared committee card, which has no photos,
so it does not pick the file up. Put it on her own card only if she gets one.

Adding someone new? Put `data-photo="her-name.jpg"` on her `.person-avatar` in
`about/index.html` and drop the file here.

## Specs

- **Square, or close to it.** The avatar is a circle (80px, 100px on the
  featured card). A photo is centre-cropped to fill it, so anything much
  taller or wider than square loses its edges. 600×600 is plenty.
  The 600×750 portraits already in this folder still work: a 4:5 crop loses
  a little top and bottom to the circle, which is why the face wants to sit
  in the middle rather than high in the frame.
- **400×400 minimum.** Displayed at 80px (100px for the featured card), but
  that's 2–3× on a retina screen. Larger than 800×800 is wasted bytes.
- **JPEG, under ~150 KB.** Ten of these load on one page.
- **Face centered**, cropped somewhere between the shoulders and the top of
  the head. A circle cuts the corners off, so leave a little room around the
  head rather than filling the frame with it. A full-body shot disappears at
  80px.

## Consent

**Ask each person before publishing her photo, and use the image she gives
you.** Do not take pictures from LinkedIn, conference sites or event
photography:

- The photographer holds the copyright, not the subject and not us.
- LinkedIn's terms prohibit it.
- Someone may be perfectly happy being named and not want her face on a
  public page. Those are two separate permissions — ask for both.

A missing photo costs nothing here. The initials fallback is deliberately
designed to look finished on its own, so an incomplete set still looks
intentional rather than broken.

## If a photo looks wrong

The image is only inserted after it loads, so a typo in the filename shows the
initials instead of a broken image — check the name against the table above
first.
