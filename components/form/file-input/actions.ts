'use server';

import { createFile, stageUploadFile, uploadFile } from 'lib/shopify';
import { StagedUploadsCreatePayload, UploadInput } from 'lib/shopify/types';

const prepareFilePayload = ({
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

const createStagedUploadFiles = async (params: UploadInput) => {
  try {
    const stagedTargets = await stageUploadFile(params);
    if (!stagedTargets || stageUploadFile.length === 0) return null;

    return JSON.parse(JSON.stringify(stagedTargets[0]));
  } catch (error) {
    console.log(error);
  }
};

const onUploadFile = async ({
  url,
  formData,
  fileName,
  resourceUrl,
  contentType = 'FILE'
}: {
  url: string;
  formData: FormData;
  fileName: string;
  resourceUrl: string;
  contentType?: 'FILE' | 'IMAGE';
}) => {
  try {
    await uploadFile({ url, formData });
    return await createFile({
      alt: fileName,
      contentType,
      originalSource: resourceUrl
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleUploadFile = async ({ file }: { file: File }) => {
  if (!file) return;
  try {
    const stagedTarget = await createStagedUploadFiles({
      filename: file.name,
      fileSize: String(file.size),
      httpMethod: 'POST',
      resource: 'FILE',
      mimeType: file.type
    });

    if (stagedTarget) {
      const data = prepareFilePayload({ file, stagedFileUpload: stagedTarget });

      const result = await onUploadFile({
        ...data,
        fileName: file.name,
        resourceUrl: stagedTarget.resourceUrl
      });

      return result?.[0]?.id;
    }
  } catch (error) {
    console.log(error);
  }
};
