// The shape every area file in src/content/areas/ must follow.
// If a content file breaks these rules, the build stops with a message naming
// the file and the field, so a bad edit never reaches the live app.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.string().trim().min(1);

// A picture or clip from another source, always shown with its credit.
const example = z.object({
  image: text, // path inside public/, e.g. /images/aorta/seagull-sign.webp
  still: text.optional(), // still frame, shown when the phone asks for less motion
  alt: text,
  contributor: text.optional(), // person credited by the source, if listed
  source: text.default('The POCUS Atlas'),
  licence: text.default('CC BY-NC 4.0'),
  link: z.url(), // the original page, opened in the in-app viewer
});

// A reference without a picture (e.g. a page we're not allowed to copy from).
const link = z.object({
  label: text.default('Open in Atlas'),
  url: z.url(),
  source: text.default('The POCUS Atlas'),
  licence: text.optional(),
});

// A picture of where the probe goes, shown on the step card.
const probePhoto = z.object({
  image: text, // path inside public/, e.g. /images/heart/probe-plax.webp
  still: text.optional(), // still frame for moving images, shown when the phone asks for less motion
  alt: text,
  credit: text.default('Image: AI-generated, checked by ScanClub'),
  link: z.url().optional(), // a page to open in the in-app viewer, if there is one
});

const step = z.object({
  title: text,
  text: text,
  chips: z.array(text).default([]),
  photo: probePhoto.optional(),
});

const finding = z.object({
  title: text,
  text: text.optional(),
  example: example.optional(),
  link: link.optional(),
});

const view = z.object({
  name: text.optional(), // only needed when an area has more than one view
  steps: z.array(step).min(1),
  image: example.optional(),
  landmarks: z.array(finding).min(1),
  // A view can skip findings when they're taught in a neighbouring view.
  normal: z.array(finding).default([]),
  abnormal: z.array(finding).default([]),
});

const areas = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/areas' }),
  schema: z.discriminatedUnion('status', [
    z.object({
      status: z.literal('ready'),
      order: z.number(),
      name: text,
      screensFor: text,
      viewCount: text.optional(),
      comingSoonNote: text.optional(), // allowed so the note can stay when an area goes live
      views: z.array(view).min(1),
      keyLearnings: z.array(text).min(1),
      selfCheck: z.array(text).min(1),
    }),
    z.object({
      status: z.literal('coming-soon'),
      order: z.number(),
      name: text,
      screensFor: text,
      viewCount: text.optional(),
      comingSoonNote: text.optional(), // the joke after "Coming soon" on the card
    }),
  ]),
});

export const collections = { areas };
