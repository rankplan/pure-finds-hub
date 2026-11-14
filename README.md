# Naturals Index (Pure Finds Hub)

A curated catalogue of natural products, compared side by side: grass-fed tallow soaps,
tallow skincare and creams, natural toothpaste, and sustainable textiles. 190+ products
with prices, price per pound, shipping costs and country of origin, searchable and
sortable in the browser.

Live: https://rankplanmuse-ops.github.io/pure-finds-hub/

Featured brand: [Less Is King](https://lessisking.com), hand-whipped tallow cream and
charcoal soap (USA), linked from its catalogue cards.

## Run locally

```sh
bun install
bun run dev
```

## Build

```sh
bun run build
```

The production build is a static site (base path `/pure-finds-hub/`) deployed with
GitHub Pages from this repo's main branch. Product data lives in
`src/lib/sampleProducts.ts`; add a `url` to any product to show a "Visit shop" link
on its card.

## SEO

The page ships with full title, description, canonical and Open Graph tags, an
index/follow robots directive, a crawlable noscript summary, `robots.txt` open to all
crawlers, and `sitemap.xml`, all pointed at the live Pages URL.
