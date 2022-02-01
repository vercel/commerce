export const getAnonymousShopperTokenQuery = /* GraphQL */ `
  query {
    getAnonymousShopperToken {
      accessToken
      accessTokenExpiration
      refreshToken
      refreshTokenExpiration
      jwtAccessToken
    }
  }
`
