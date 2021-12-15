export const getAllPagesQuery = /* GraphQL */`
query($documentListName: String!) {
    documentListDocuments(documentListName:$documentListName){
      items {
        id
        name
        listFQN
        properties
      }
    }
  }`;