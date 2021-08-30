export const documentListDocumentsQuery = /* GraphQL */`
query {
    documentListDocuments(documentListName:"siteSnippets@mozu"){
      items {
        id
        name
        listFQN
        properties
      }
    }
  }`;