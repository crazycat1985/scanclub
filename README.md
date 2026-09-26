# ScanClub

A phone app for practising point-of-care ultrasound (POCUS) together. Pick an area, follow the probe steps, check your image against the examples, then run through the "Could you…?" list.

**For practice on healthy volunteers only.**

You don't need to know how to code to update it. All the medical text lives in plain text files, one per area, in the folder [`src/content/areas`](src/content/areas). You change them on the GitHub website.

---

## Publishing: the live app only changes when you press Publish

The live app shows whatever is on the `live` branch. Merging a draft into `main` does **not** change the live app and costs nothing, so merge as often as you like.

When `main` is ready to go live:

1. On GitHub, open the **Actions** tab.
2. Click **Publish to live app** on the left, then **Run workflow** → **Run workflow**.
3. After a couple of minutes, the live app shows everything that's on `main`.

Each publish uses 15 of Netlify's 300 monthly credits (about 20 publishes a month). To see what the next publish would contain, open `main--fantastic-fenglisu-a376b7.netlify.app`. It's free and always shows the latest `main`.

## Why edits go through a draft first

Netlify's free plan gives **about 20 updates of the live app a month** (each costs 15 of the plan's 300 monthly credits). If they run out, the app goes offline until the next month. **Drafts are free and unlimited.** So:

- Make changes in a **draft** (on GitHub, a "pull request"). Each draft gets its own preview link to try on your phone. It's free, however many times you change it.
- When the draft looks right, **merge** it into `main`. That's free.
- When you're ready for the group to see everything merged so far, press **Publish** (above). That's the only step that uses up one of the ~20 monthly updates.

## Edit an area's text

1. On GitHub, open [`src/content/areas`](src/content/areas) and click the file for the area, e.g. `aorta.yaml`.
2. Click the **pencil icon** (top right of the file) to edit.
3. Change the words you want. Keep everything else as it is (see "Rules for the file" below).
4. Click **Commit changes…** and write a short note of what you changed (e.g. "Add real probe steps for aorta").
5. **Important:** choose **"Create a new branch for this commit and start a pull request"**, not "Commit directly to the main branch". Click **Propose changes**, then **Create pull request**.
6. After a minute or two, a Netlify comment or check appears on the pull request with a **Deploy Preview** link. The link looks like `deploy-preview-2--fantastic-fenglisu-a376b7.netlify.app`, with the pull request's number after `deploy-preview-`. Try it on your phone.
7. Need more changes? Open the file again **from the pull request's branch** and edit it there. The preview updates each time, for free.
8. Happy with it? On the pull request, click **Merge pull request**, then **Confirm merge**. Then press **Publish** (see above) when you want it in the live app, straight away or after bundling more changes. Phones pick up the new version the next time the app is opened with internet.

If something in your edit breaks the rules, the preview **won't** build and the live app is untouched, so you can't break it by accident. See "If an update doesn't show up" below.

## What's in an area file

Here's a cut-down example. Lines starting with `#` are notes and are ignored by the app.

```yaml
status: ready            # "ready" shows the area; "coming-soon" shows a greyed-out card
order: 1                 # position on the home screen (1 = top)
name: Abdominal aorta    # the card title
screensFor: AAA screening
viewCount: 2 views       # optional, shown on the card after the dot
comingSoonNote: fasting till then   # optional joke on a "coming-soon" card: "Coming soon · fasting till then"

views:
  - name: Transverse     # only needed if the area has more than one view
    steps:               # one screen per step, in order
      - title: Set up
        text: Curved probe, abdominal preset. Patient lying flat.
        chips: ["Probe: curved", "Preset: abdomen"]   # the small tags under the text
        photo:           # optional picture of where the probe goes
          image: /images/aorta/probe-setup.webp
          alt: Patient lying flat, with the machine on their right
          # credit: "Photo: ScanClub"   # only if not the usual AI-generated credit

    image:               # the main picture on the black panel (optional)
      image: /images/aorta/seagull-sign.webp
      still: /images/aorta/seagull-sign-still.jpg      # optional still version
      alt: Short description of what the picture shows
      contributor: Name of the person who made it
      link: https://www.thepocusatlas.com/...          # the original page

    landmarks:           # "Landmarks to find"
      - title: Spine
        text: Bright curved line at the bottom with a black shadow beneath it.

    normal:              # shown when the Normal toggle is on
      - title: Round, under 3 cm
        text: A normal aorta stays roughly the same width all the way down.
        example:         # optional picture, same fields as "image" above
          ...

    abnormal:            # shown when the Abnormal toggle is on
      - title: 3 cm or more
        text: Aneurysm (AAA).

keyLearnings:            # the summary screen
  - The spine is your anchor.

selfCheck:               # the "Could you…?" tick-list
  - Find the spine first
```

To give an area **several views** (like the heart's four), add more entries under `views:`, each starting with `- name:` and with its own `steps`, `landmarks`, `normal` and `abnormal`. The app walks through them one after another.

## Rules for the file

These are the things that most often go wrong:

- **Indentation matters.** Use spaces, never tabs. Line new items up exactly under the ones above them.
- **Each list item starts with `- `** (a dash and a space).
- **If a line contains a colon (`:`)** anywhere in the text itself, wrap the whole text in double quotes, e.g. `text: "Aorta: round, thick wall"`.
- **Square brackets need quotes too:** `text: "[TBC]"`, not `text: [TBC]`.
- **Every finding needs a `title` and a `text`.** Every view needs at least one step, one landmark, one normal and one abnormal finding.
- **Links must start with `https://`.**

## Add a new area (or make a "Coming soon" one live)

1. Open the area's file (e.g. `lungs.yaml`). If it doesn't exist, click **Add file → Create new file** in `src/content/areas` and name it e.g. `gallbladder.yaml`. The file name becomes the web address (`/gallbladder/`), so use lowercase and dashes.
2. Change `status: coming-soon` to `status: ready`.
3. Add `views`, `keyLearnings` and `selfCheck` as in `aorta.yaml`. Copying `aorta.yaml` and changing the words is the easiest way to start.
4. Commit, as above.

While an area is still "Coming soon", you can give its card a short joke with `comingSoonNote:` (e.g. `comingSoonNote: holding its breath`). It shows in small grey letters as "Coming soon · holding its breath". Leave it out and the card just says "Coming soon". Once the area is `ready`, the note is ignored, so it's fine to leave it in.

Each card has a small drawing (a mascot) of the area's best-known sign: the seagull for the aorta, Mickey Mouse for the gallbladder, the bat for the lungs, a heart, and a squashed vein for the leg veins. The drawing is picked by the **file name**, so `lungs.yaml` gets the bat. A new area with a different file name gets the ScanClub fan instead, so nothing breaks. Asleep, in grey, means "Coming soon". When someone ticks every "Could you…?" box, the mascot flies across the screen (for the aorta, just the gull's wings).

## Pictures and credits

- Every picture must show who it came from. The app builds the credit line from `contributor`, `source` and `licence`. If you leave out `source` and `licence`, it assumes **The POCUS Atlas, CC BY-NC 4.0**.
- **Probe pictures** (the `photo` under a step) show where the probe goes. They're made by the group, e.g. generated with Gemini and checked by Shaked, and are credited "Image: AI-generated, checked by ScanClub" unless the `photo:` block gives its own `credit:` (use `credit: "Photo: ScanClub"` for a real photo). A step with no `photo:` shows an empty diagram space. Never show a face, and get the volunteer's OK for real photos.
- **Only use pictures you're allowed to.** The POCUS Atlas is fine (non-commercial use with credit). Pictures from other sites or papers need either an open licence or the owner's permission. Otherwise, link to the page instead (see below).
- To add a picture, put the file in `public/images/<area>/` (**Add file → Upload files** on GitHub), then point to it as `/images/<area>/<file>`. Keep pictures small (under ~300 KB each) because the app stores them all on the phone for offline use.
- To link to a page without copying its picture, give the finding a `link` instead of an `example`:

  ```yaml
  link:
    label: See the POCUS 101 guide
    url: https://www.pocus101.com/...
    source: POCUS 101
  ```

  Links open inside the app in a panel that slides up. They need internet.

## If an update doesn't show up

1. Wait a couple of minutes, then close and reopen the app with internet on.
2. Still old? The edit probably broke a rule. Open the project on [Netlify](https://app.netlify.com), click **Deploys**, and open the failed one (marked in red). Near the bottom, the log says which file and which field is wrong, e.g. `views.0.normal.1.text: Required`, which means "in the first view, the second normal finding is missing its text".
3. Fix it on GitHub the same way you edited it, and commit again.

---

## For whoever maintains the code

- Built with [Astro](https://astro.build) as a static site, hosted on Netlify. Netlify's production branch is `live`, which only moves when the **Publish to live app** workflow runs (`.github/workflows/publish.yml`). `main` has a free branch deploy, and pull requests get free Deploy Previews.
- `src/content.config.ts` defines the content format, and the build fails on invalid content.
- `scripts/build-sw.mjs` runs after the build and writes `dist/sw.js`, which caches every file for offline use. The cache name changes with every deploy.
- `scripts/make-icons.mjs` regenerates the app icons from `scripts/icon-square.svg`.
- Nothing is stored on the device: ticks on the summary screen reset when you leave.
- Run locally with `npm install` then `npm run dev`. Use `npm run build && npm run preview` to test offline behaviour.
