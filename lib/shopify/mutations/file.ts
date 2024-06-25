export const createStageUploads = /* GraphQL */ `
  mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      stagedTargets {
        url
        resourceUrl
        parameters {
          name
          value
        }
      }
    }
  }
`;

export const createFileMutation = /* GraphQL */ `
  mutation fileCreate($files: [FileCreateInput!]!) {
    fileCreate(files: $files) {
      files {
        fileStatus
        ... on MediaImage {
          id
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;
