import imageFragment from './image';

const shopFragment = /* GraphQL */ `
  fragment shop on Shop {
    name
    description
    id
    brand {
      shortDescription
      slogan
      colors {
        secondary {
          background
          foreground
        }
        primary {
          background
          foreground
        }
      }
      squareLogo {
        image {
          ...image
        }
      }
      coverImage {
        image {
          ...image
        }
      }
      logo {
        image {
          ...image
        }
      }
    }
    shippingPolicy {
      body
      handle
      id
      title
      url
    }
    refundPolicy {
      body
      handle
      id
      title
      url
    }
    privacyPolicy {
      body
      handle
      id
      title
      url
    }
    primaryDomain {
      url
    }
    subscriptionPolicy {
      body
      handle
      id
      title
      url
    }
    termsOfService {
      body
      handle
      id
      title
      url
    }
  }
  ${imageFragment}
`;

export default shopFragment;
