import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { GROUP_IDS } from './lib/groups';

const guides = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

const components = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/components' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    group: z.enum(GROUP_IDS),
    /** Exported components documented on the page; each gets a props table. The first is the main one. */
    components: z.array(z.string()).min(1),
  }),
});

export const collections = { guides, components };
