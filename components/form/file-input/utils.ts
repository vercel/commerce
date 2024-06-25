import { StagedUploadsCreatePayload } from 'lib/shopify/types';
import { createStagedUploadFiles, onUploadFile } from './actions';

export const prepareFilePayload = ({
  stagedFileUpload,
  file
}: {
  stagedFileUpload: StagedUploadsCreatePayload;
  file: File;
}) => {
  const formData = new FormData();

  const url = stagedFileUpload.url;

  stagedFileUpload.parameters.forEach(({ name, value }) => {
    formData.append(name, value);
  });

  formData.append('file', file);
  return { url, formData };
};

export const handleUploadFile = async ({ file }: { file: File }) => {
  if (!file) return;
  const stagedTarget = await createStagedUploadFiles({
    filename: file.name,
    fileSize: String(file.size),
    httpMethod: 'POST',
    resource: 'FILE',
    mimeType: file.type
  });

  if (stagedTarget) {
    const data = prepareFilePayload({ file, stagedFileUpload: stagedTarget });

    await onUploadFile({
      ...data,
      fileName: file.name,
      resourceUrl: stagedTarget.resourceUrl
    });
  }
};
