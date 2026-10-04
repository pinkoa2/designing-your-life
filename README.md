# Designing Your Life

**Live site: [designing-your-life.pinkoa2.lol](https://designing-your-life.pinkoa2.lol)**

My answers to the exercises in
**_Designing Your Life: How to Build a Well-Lived, Joyful Life_** by
**Bill Burnett & Dave Evans** (2016), presented as a small personal website.

So far it has the first exercise, **Start Where You Are**: a check-in on Health,
Work, Play, and Love. Each area is a test tube filled to its score, with a short
note on why I gave it that score.

## Local development

```sh
npm install
npm run dev            # http://localhost:5173 (add `-- --host` to open it on a phone)
npm run build          # static site in build/
npm run check          # type-check
```

Built with SvelteKit 3 and Svelte 5, prerendered to static HTML with
`@sveltejs/adapter-static`.

## Updating content

The answers live in `src/lib/content/start-where-you-are.ts`, which holds a score
(0–100) and a note for each area. The page has no editing UI; changes are made in
that file.

## Deployment

Every push to `main` builds the site with GitHub Actions
(`.github/workflows/deploy.yml`) and publishes it to GitHub Pages.
`static/CNAME` sets the custom domain, with a `CNAME` record for
`designing-your-life` on `pinkoa2.lol` pointing to `pinkoa2.github.io`.

## More

- `PRODUCT.md`: what the site is for and its constraints
- `DESIGN.md`: the design system (colors, type, the test-tube gauge)
