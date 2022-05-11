## Adding config files to test the deployment

Create a config folder and two json files `cypress/config/local.json`, `cypress/config/dev.json`.

`local.json` file looks exactly like a copy of our root `cypress.json`.

```json
{
  "baseUrl": "http://localhost:3000",
  "viewportHeight": 1000,
  "viewportWidth": 1280,
  "projectId": "pefcjb"
}
```

`dev.json` file has an updated `baseUrl` to represent our deployment.

```json
{
  "baseUrl": "https://nextjs-cypress-j6ls5tggc-muratkeremozcan.vercel.app/",
  "viewportHeight": 1000,
  "viewportWidth": 1280,
  "projectId": "pefcjb"
}
```

We slightly modify our `package.json` scripts to use the respective config files:

```json
"scripts": {
  "build": "turbo run build --scope=next-commerce --include-dependencies --no-deps",
  "dev": "turbo run dev",
  "start": "turbo run start",
  "types": "turbo run types",
  "prettier-fix": "prettier --write .",
  "cy:open-local": "cypress open --config-file cypress/config/local.json",
  "cy:run-local": "cypress run --config-file cypress/config/local.json",
  "cy:open-dev": "cypress open --config-file cypress/config/dev.json",
  "cy:run-dev": "cypress run --config-file cypress/config/dev.json"
},
```

We test the new scripts.

```bash
# on one tab
yarn dev
# on the second tab
yarn cy:open-local

# for the deployment, we do not need the app served, we just test the deployment
yarn cy:open-dev
```

## Enhancing the CI pipeline architecture

We want local deployments to execute against the app being locally served.

In contrast, after the feature branch is merged, we want to execute e2e tests against the deployment.

For the app being locally served, in Github Actions, we can accomplish this task by using `pull_request` vs `push`. We also need to specify the config file we are using.

> We will also add a group property to the Cypress GHA in order make things a bit more clear on the Cypress Dashboard.

`main.yml`:

```yml
name: E2E on Chrome localhost:3000

on:
  pull_request:

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Cypress run
        uses: cypress-io/github-action@v3.0.4
        with:
          browser: chrome
          start: yarn dev
          # property to specify the config file we are using
          config-file: cypress/config/local.json
          wait-on: 'http://localhost:3000'
          wait-on-timeout: 120000
          record: true
          group: local
        env:
          COMMERCE_PROVIDER: ${{ secrets.COMMERCE_PROVIDER }}
          NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: ${{ secrets.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN }}
          NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: ${{ secrets.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN }}
          NEXT_PUBLIC_COMMERCE_SEARCH_ENABLED: true
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

For the deployment test, we need a new yml file, using `push`, and it will have slightly different settings so that it only runs on the `main` branch.
Since we are testing the deployment, we do not need `start` and `wait-on` properties of the Cypress Github Action.

`deployment.yml`:

```yml
name: E2E on Chrome deployment

on:
  push:
    branches: ['main']

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Cypress run
        uses: cypress-io/github-action@v3.0.4
        with:
          browser: chrome
          record: true
          config-file: cypress/config/dev.json
          group: deployment
        env:
          COMMERCE_PROVIDER: ${{ secrets.COMMERCE_PROVIDER }}
          NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: ${{ secrets.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN }}
          NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: ${{ secrets.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN }}
          NEXT_PUBLIC_COMMERCE_SEARCH_ENABLED: true
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
          # pass GitHub token to allow accurately detecting a build vs a re-run build
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

After the feature branch push, we can observe the tests running against the locally served app as usual.

And after the merge to main, we can observe the group name and see video recording on the Cypress Dashboard where the app is running against the deployment.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8tg6nbxiamruwpelsk1d.png)
