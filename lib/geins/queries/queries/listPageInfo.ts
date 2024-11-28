import listInfoFragment from '../fragments/list-info';

export const listPageInfoQuery = /* GraphQL */ `
  query listPageInfo($url: String!, $channelId: String, $languageId: String, $marketId: String) {
    listPageInfo(url: $url, channelId: $channelId, languageId: $languageId, marketId: $marketId) {
      ...ListInfo
    }
  }
  ${listInfoFragment}
`;
