# Leadership photos

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
| Sally Nguyen | `sally-nguyen.jpg` |

Adding someone new? Put `data-photo="her-name.jpg"` on her `.person-avatar` in
`about/index.html` and drop the file here.

## Specs

- **Square.** The avatar is a circle, so anything else gets cropped from the
  center — heads end up off-frame.
- **400×400 minimum.** Displayed at 72px (92px for the featured card), but
  that's 2–3× on a retina screen. Larger than 800×800 is wasted bytes.
- **JPEG, under ~150 KB.** Ten of these load on one page.
- **Face roughly centered**, cropped somewhere between the shoulders and the
  top of the head. A full-body shot disappears at 72px.

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
