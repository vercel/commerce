# Feedback on Real World Testing with Cypress course

At Extend, Shopify is one of the merchants we integrate with to sell warranties (alongside BigCommerce and Magento), so this course is also domain relevant for learning.

I will capture any feedback here while going through the content, for the purpose of making the content as frictionless as possible, so that adoption is higher for Extend as well as any Cypress users who want to perform self-learning.

## [Part 1- Creating a Shopify Partners Store](https://learn.cypress.io/tutorials/creating-a-shopify-partners-store)

Shopify must have made updates. One can figure out their way through it, but on Cypress side we need to update the screenshots and also slightly update the instructions.

## [Part 2- Creating the Nex.js App](https://learn.cypress.io/tutorials/creating-the-next-js-app)

Vercel must have made updates to their repo. There are many `tsconfig.json` files now, and the one we need is `./site/tsconfig.json`

The `src` suffix is extra now, we are missing that in the current instructions.

We have:

```json
"@framework": ["framework/local"],
"@framework/*": ["framework/local/*"]
```

They have:

```json
"@framework": ["../packages/local/src"],
"@framework/*": ["../packages/local/src/*"]
```

We have to aggregate `src` to our update instructions.

We have:

```json
"@framework": ["framework/shopify"],
"@framework/*": ["framework/shopify/*"]
```

We should have:

```json
"@framework": ["framework/shopify/src"],
"@framework/*": ["framework/shopify/src/*"]
```

---

We should update the app screenshot as we launch localhost:3000

---

## [Part 3 - Writing e2e tests with Cypress](https://learn.cypress.io/tutorials/writing-end-to-end-tests-with-cypress)

Not that I am a TS fanatic, it's good in places, but the cloned Vercel repo is in TS. At minimum we can refer to real world app or the docs for a TS setup reference. If the user chooses to, we can make it easier for them.

---

We want to show latest and greatest ways of writing Cypress code. There are certain reasons we might not be able to implement it -the helper `data-test` command may be difficult later- but we should do the due diligence and let the audience know about some knowledge they can use the the future as side notes.

One side node we should insert here is below.

Instead of this
`cy.get('[data-test="product-tag"]').eq(0)`
I would use
`cy.get('[data-test="product-tag"]:nth(0)')`

It is less pretty, but it can be more stable with element-detached-from-the dom errors.
Recently I had to wrestle the CI for our own Shopify app at Extend with this exact issue. At minimum we can refer to this video https://www.youtube.com/watch?v=deNl1q1el0E, letting the audience know about these concerns.

---

The app has been updated, we should update:
`cy.get('[data-test="product-name"]').should("contain", "Code Shirt")`
to
`cy.get('[data-test="product-name"]').should('contain', 'Sleeve T-Shirt')`

The audience should be able to copy paste from the instructions and get things to just work. It is important to keep the dopamine going with these kind of resources.

---

The app has been updated and the `contains` strings are different. Use this:

```js
describe('Home Page', () => {
  it('displays all 3 products on the home page', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-test="product-tag"]')
      .eq(0)
      .within(() => {
        cy.get('[data-test="product-name"]').should(
          'contain',
          'tshirt-stack-overflow'
        )
        cy.get('[data-test="product-price"]').should('contain', '$25.00 USD')
      })

    cy.get('[data-test="product-tag"]')
      .eq(1)
      .within(() => {
        cy.get('[data-test="product-name"]').should(
          'contain',
          'Lightweight Jacket'
        )
        cy.get('[data-test="product-price"]').should('contain', '$249.99 USD')
      })

    cy.get('[data-test="product-tag"]')
      .eq(2)
      .within(() => {
        cy.get('[data-test="product-name"]').should('contain', 'Shirt')
        cy.get('[data-test="product-price"]').should('contain', '$25.00 USD')
      })
  })
})
```

---

When checking the urls, we should use the opportunity to show off the documentation for `cy.location` when it gets introduced. "If you want to learn more about `cy.location`...".

---

When the viewport is modified in `cypress.json`, perhaps it's a good opportunity to have the audience navigate to Settings > Configuration to confirm this change. This is a simple and solid troubleshooting tool. Also, another good excuse to link to the relevant docs.

---

The app has changed, and `data-test="nav-link-hom-page">` is under a list. Therefore clicking it with the given code causes en error due to multiple elements. Instead of `eq(0)` or `first()` we can modify the attribute like this:

```js
{
  links?.map((l) => (
    <Link href={l.href} key={l.href}>
      <a className={s.link} data-test={`nav-link-home-page-${l.label}`}>
        {l.label}
      </a>
    </Link>
  ))
}
```

The attributes will look like:
`nav-link-home-page-New Arrivals`
`nav-link-home-page-Featured`

And here we can also talk about `cy.getBySelLike()`, because if you want to go to _New Arrivals_, the space between the words would require taming the attribute, and we don't really want to do that so much. We can just use `cy.getBySelLike('nav-link-home-page-New').click()`.

We have to update the `cy.location` path check as well. Here's the full code.

```js
describe('Home Page', () => {
  it('displays all 3 products on the home page', () => {
    cy.visit('http://localhost:3000')
    cy.getBySel('product-tag')
      .eq(0)
      .within(() => {
        cy.getBySel('product-name').should('contain', 'tshirt-stack-overflow')
        cy.getBySel('product-price').should('contain', '$25.00 USD')
      })

    cy.getBySel('product-tag')
      .eq(1)
      .within(() => {
        cy.getBySel('product-name').should('contain', 'Lightweight Jacket')
        cy.getBySel('product-price').should('contain', '$249.99 USD')
      })

    cy.getBySel('product-tag')
      .eq(2)
      .within(() => {
        cy.getBySel('product-name').should('contain', 'Shirt')
        cy.getBySel('product-price').should('contain', '$25.00 USD')
      })
  })
})

describe('Header', () => {
  it('links to the correct pages', () => {
    cy.visit('http://localhost:3000')
    cy.getBySel('logo').click()
    cy.location('pathname').should('eq', '/')

    cy.getBySel('nav-link-search').click()
    cy.location('pathname').should('eq', '/search')

    cy.getBySelLike('nav-link-home-page-New').click()
    cy.location('pathname').should('eq', '/search/new-arrivals')
  })
})
```

---

`components/common/Searchbar/Searchbar.tsx` is under `site` now. We should update to `site/components/common/Searchbar/Searchbar.tsx`.

For this to work, first we need a 4th environment variable in `.env.local`:

```
COMMERCE_PROVIDER=@vercel/commerce-shopify
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_COMMERCE_SEARCH_ENABLED=true
```

Mind `COMMERCE_PROVIDER=@vercel/commerce-shopify` and not just `shopify`. This is in the readme.

And we have to make the following change at `site/components/common/Navbar/Navbar.tsx`.
TL, DR; replace `process.env.COMMERCE_SEARCH_ENABLED` with `process.env.NEXT_PUBLIC_COMMERCE_SEARCH_ENABLED`

Before:

```js
 {process.env.COMMERCE_SEARCH_ENABLED && (
    <div className="justify-center flex-1 hidden lg:flex">
      <Searchbar />
    </div>
  )}
  <div className="flex items-center justify-end flex-1 space-x-8">
    <UserNav />
  </div>
</div>
{process.env.COMMERCE_SEARCH_ENABLED && (
  <div className="flex pb-4 lg:px-6 lg:hidden">
    <Searchbar id="mobile-search" />
  </div>
)}

```

After

```js
  {process.env.NEXT_PUBLIC_COMMERCE_SEARCH_ENABLED && (
    <div className="justify-center flex-1 hidden lg:flex">
      <Searchbar />
    </div>
  )}
  <div className="flex items-center justify-end flex-1 space-x-8">
    <UserNav />
  </div>
</div>
{process.env.NEXT_PUBLIC_COMMERCE_SEARCH_ENABLED && (
  <div className="flex pb-4 lg:px-6 lg:hidden">
    <Searchbar id="mobile-search" />
  </div>
)}

```

---

We should update the code used in the .only aside section now.

Before:

```js
it.only('the search bar returns the correct search results', () => {
  cy.getBySel('search-input').eq(0).type('linux{enter}')

  cy.get('[data-test="product-tag"]').within(() => {
    cy.get('[data-test="product-name"]').should('contain', 'Linux Shirt')
    cy.get('[data-test="product-price"]').should('contain', '$25.00 USD')
  })
})
```

After:

```js
it.only('the search bar returns the correct search results', () => {
  cy.getBySel('search-input').eq(0).type('tshirt-stack-overflow{enter}')

  cy.getBySel('product-tag')
    .eq(0)
    .within(() => {
      cy.getBySel('product-name').should('contain', 'tshirt-stack-overflow')
      cy.getBySel('product-price').should('contain', '$25.00 USD')
    })
})
```

But even then, the search feature does not filter results. If you can make this work in the latest app template, then please let me know. If it is not possible for the app to filter products, we should remove this section from the instructions.

It is painful to work with environment variables in Vercel. In fact. Some troubleshooting reveals the env vars defined in the `.env.local` file are undefined. Try this console.log in `Navbar.tsx` file.

```js
console.log('COMMERCE_PROVIDER: ', process.env.COMMERCE_PROVIDER)
console.log(
  'NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: ',
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
)
console.log(
  'NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: ',
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
)
console.log(
  'NEXT_PUBLIC_COMMERCE_SEARCH_ENABLED: ',
  process.env.NEXT_PUBLIC_COMMERCE_SEARCH_ENABLED
)
```

---

## [Part 4 Running Our Tests with GitHub Actions](https://learn.cypress.io/tutorials/running-our-tests-with-github-actions)

Cypress GHA is at `v3.0.4` . Let's at least use v3.

---

The job does more than install. We should name it in a better way, perhaps call it with the end goal of the job; for example `e2e`.

---

Question here; why do we need to run `npm run build` ? We are just serving the app here. Is it a NextJs requirement to build the app before it can be served? We did not need it locally. I have left it out and things kept working.

https://github.com/muratkeremozcan/nextjs-cypress/runs/6289265533?check_suite_focus=true#step:3:60

---

We need to add `NEXT_PUBLIC_COMMERCE_SEARCH_ENABLED=true` from the above section, since we did this change in the `.env.local` file.

```yml
env:
  COMMERCE_PROVIDER: ${{ secrets.COMMERCE_PROVIDER }}
  NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: ${{ secrets.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN }}
  NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: ${{ secrets.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN }}
  NEXT_PUBLIC_COMMERCE_SEARCH_ENABLED: true
```

Something we can additionally mention here is that 3 things have to match for CI to work:

- local environment variables (`.env` , `cypress.env.json`, or our machine),
- the yml file above
- Github secrets

Yes, we are performing these in the guide, but the rule of 3 is key knowledge, concise, and they can take that away.

---

When did we create a `header.spec.js` file? It is possible that one might miss this. Perhaps at the end of Part 3 we give a tree structure and the final, ready-to-copy code for the spec files.

```bash
├── fixtures
│   └── example.json
├── integration
│   ├── header.spec.js
│   └── home.spec.js
├── plugins
│   └── index.js
└── support
    ├── commands.js
    └── index.js
```

---

The new Vercel repo advises yarn to be used as opposed to npm.

At the time of writing, there is a hard-blocker with CI.

https://github.com/muratkeremozcan/nextjs-cypress/runs/6289885177?check_suite_focus=true

Here is an attempt to make it work:

```yml
name: E2E on Chrome

on: [push]

jobs:
  install:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Cypress run
        uses: cypress-io/github-action@v3.0.4
        with:
          browser: chrome
          start: yarn dev
          wait-on: 'http://localhost:3000'
          wait-on-timeout: 120000
        env:
          COMMERCE_PROVIDER: ${{ secrets.COMMERCE_PROVIDER }}
          NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: ${{ secrets.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN }}
          NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: ${{ secrets.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN }}
          NEXT_PUBLIC_COMMERCE_SEARCH_ENABLED: true
```

---

Again, the search feature does not really work.

```js
it('the search bar returns the correct search results', () => {
  cy.getBySel('search-input').eq(0).type('tshirt-stack-overflow{enter}')

  // does not work
  // cy.get('[data-test="product-card"]').within(() => {
  //  cy.get('[data-test="product-name"]').should("contain", "Linux Shirt")
  //  cy.get('[data-test="product-price"]').should("contain", "$25.00 USD")
  // })
})
```

---

## [Part 5 Running Our Tests in Parallel with Cypress Dashboard](https://learn.cypress.io/tutorials/running-our-tests-in-parallel-with-cypress-dashboard)

As of today May 4th, 2022, Cypress Dashboard looks different and those screen shots should be updated.

---

Question about `GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}`. Cypress Dashboard requires unique runIds. For example if we re-run a CI action, what happens is the job passes without actually running any tests. How does this setting effect that?

---

Running things in CI and seeing it on the dashboard, I have lost the relevance between a locally served app and what runs in the CI. The two are entirely different! Somehow the app in CI has the Shopify concept. But the local app is the template app.

This is because the environment variables are not working using the `.env.local` file. The users will need help getting these to work in a solid way. For now I am exporting them in the command line.
