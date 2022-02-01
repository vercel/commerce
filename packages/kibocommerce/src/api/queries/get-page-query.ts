export const getPageQuery = /* GraphQL */`
query($documentListName: String!, $filter: String!) {
    documentListDocuments(documentListName: $documentListName, filter: $filter){
            startIndex
            totalCount
            items {
                id
                name
                listFQN
                properties
            }
        }
    }
`;