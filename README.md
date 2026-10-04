# Designing Your Life

**Live site: [designing-your-life.pinkoa2.lol](https://designing-your-life.pinkoa2.lol)**

Our answers to the exercises in
**_Designing Your Life: How to Build a Well-Lived, Joyful Life_** by
**Bill Burnett & Dave Evans** (2016), presented as a small personal website.

So far it has the first exercise, **Start Where You Are**: a check-in on Health,
Work, Play, and Love. Each area is a test tube filled to its score, with a short
note on why each of us gave it that score.

## Local development

```sh
npm install
npm run dev            # http://localhost:5173 (add `-- --host` to open it on a phone)
npm run build          # static site in build/
npm run check          # type-check
```

Built with SvelteKit 3 and Svelte 5, prerendered to static HTML with
`@sveltejs/adapter-static`.

## Accounts and answers

Each person signs in with an emailed link (invite-only) and edits their own dashboard
on the page. Anyone with a person's share link can view their answers read-only.
Answers are stored in [Supabase](https://supabase.com); `supabase/schema.sql` sets up
the tables and access rules.

## Deployment

Every push to `main` builds the site with GitHub Actions
(`.github/workflows/deploy.yml`) and publishes it to GitHub Pages.
`static/CNAME` sets the custom domain, with a `CNAME` record for
`designing-your-life` on `pinkoa2.lol` pointing to `pinkoa2.github.io`.

## More

- `PRODUCT.md`: what the site is for and its constraints
- `DESIGN.md`: the design system (colors, type, the test-tube gauge)
