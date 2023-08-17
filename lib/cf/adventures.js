/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 */

import AEMHeadless from '@adobe/aem-headless-client-js';
// import { PUBLIC_AEM_HOST, PUBLIC_GRAPHQL_ENDPOINT } from '$env/static/public';
// import { AEM_AUTH } from '$env/static/private';

const PUBLIC_AEM_HOST = 'https://publish-p64257-e147834-cmstg.adobeaemcloud.com';
const PUBLIC_GRAPHQL_ENDPOINT = '/content/_cq_graphql/aem-demo-assets/endpoint.json';
export class AdventureClient {
  static fromEnv() {
    if (!this.__envClient) {
      this.__envClient = new AdventureClient({
        serviceURL: PUBLIC_AEM_HOST,
        endpoint: PUBLIC_GRAPHQL_ENDPOINT,
        auth: ''
      });
    }
    return this.__envClient;
  }
  constructor({ serviceURL, endpoint, auth }) {
    this.aemHeadlessClient = new AEMHeadless({
      serviceURL,
      endpoint,
      auth,
      fetch
    });
  }

  async getAllAdventures() {
    // const queryAdventuresAll = 'aem-demo-assets/adventures-all';
    // const res = await this.aemHeadlessClient.runPersistedQuery(queryAdventuresAll);
    const query = `{
      adventureList {
        items {
          _path
            title
            activity
            adventureType
            price
            tripLength
            groupSize
            difficulty
            primaryImage {
              ... on ImageRef {
                _path
                mimeType
                width
                height
              }
            }
            description {
                html
            }
            itinerary {
              html
            }
        }
      }
    }
    `;
    const res = await this.aemHeadlessClient.runQuery(query);
    return res;
  }

  async getAdventurePaths() {
    const res = await this.getAllAdventures();
    const adventures = res?.data?.adventureList?.items || [];
    const paths = adventures.map((item) => ({
      params: {
        path: [item.slug]
      }
    }));
    return paths;
  }

  async getAdventureByPath(path) {
    const query = `{
      adventureByPath (_path: "${path}") {
        item {
          _path
            title
            activity
            adventureType
            price
            tripLength
            groupSize
            difficulty
            primaryImage {
              ... on ImageRef {
                _path
                mimeType
                width
                height
              }
            }
            description {
              html
            }
            itinerary {
              html
            }
        }
      }
    }
    `;
    const res = await this.aemHeadlessClient.runQuery(query);
    return res;
  }
}

export const winterCollection = {
  handle: 'winter-collection',
  title: 'Winter',
  description: 'Adventures for the winter.',
  seo: {
    title: 'Winter Collection',
    description: 'Adventures for the winter.'
  },
  updatedAt: '2023-08-10T00:00:00Z'
};

export const summerCollection = {
  handle: 'summer-collection',
  title: 'Summer',
  description: 'Adventures for the summer.',
  seo: {
    title: 'Summer Collection',
    description: 'Adventures for the summer.'
  },
  updatedAt: '2023-08-10T00:00:00Z'
};

export const europeCollection = {
  handle: 'europe-collection',
  title: 'Europe',
  description: 'Adventures in Europe.',
  seo: {
    title: 'Europe Collection',
    description: 'Adventures in Europe.'
  },
  updatedAt: '2023-08-10T00:00:00Z'
};

export const tcPage = {
  id: 'tc',
  title: 'Terms & Conditions',
  handle: 'tc',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  bodySummary: 'Summary',
  seo: {
    title: 'Terms & Conditions Page',
    description: 'This is a sample page.'
  },
  createdAt: '2023-08-01T00:00:00Z',
  updatedAt: '2023-08-10T00:00:00Z'
};

export const aboutPage = {
  id: 'about',
  title: 'About',
  handle: 'about',
  body: 'This website is built with Next.js Commerce, which is a ecommerce template for creating a headless storefront. ',
  bodySummary: 'Summary of about page',
  seo: {
    title: 'About Page',
    description: 'This is a sample page.'
  },
  createdAt: '2023-08-01T00:00:00Z',
  updatedAt: '2023-08-10T00:00:00Z'
};

export const faqPage = {
  id: 'faq',
  title: 'FAQ',
  handle: 'faq',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  bodySummary: 'Summary of about page',
  seo: {
    title: 'About Page',
    description: 'This is a sample page.'
  },
  createdAt: '2023-08-01T00:00:00Z',
  updatedAt: '2023-08-10T00:00:00Z'
};

export const ppPage = {
  id: 'pp',
  title: 'Privacy Policy',
  handle: 'pp',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  bodySummary: 'Summary of about page',
  seo: {
    title: 'Privacy Page',
    description: 'This is a sample page.'
  },
  createdAt: '2023-08-01T00:00:00Z',
  updatedAt: '2023-08-10T00:00:00Z'
};

export const srPage = {
  id: 'sr',
  title: 'Shipping & Return Policy',
  handle: 'sr',
  body: 'Shipping & Return Policy Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  bodySummary: 'Summary of about page',
  seo: {
    title: 'Privacy Page',
    description: 'This is a sample page.'
  },
  createdAt: '2023-08-01T00:00:00Z',
  updatedAt: '2023-08-10T00:00:00Z'
};

export const pages = [tcPage, aboutPage, ppPage, faqPage, srPage];

export const collections = [winterCollection, summerCollection, europeCollection];
