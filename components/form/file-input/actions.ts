'use server';

import { createFile, stageUploadFile, uploadFile } from 'lib/shopify';
import { UploadInput } from 'lib/shopify/types';

export const createStagedUploadFiles = async (params: UploadInput) => {
  try {
    const stagedTargets = await stageUploadFile(params);
    if (!stagedTargets || stageUploadFile.length === 0) return null;

    return JSON.parse(JSON.stringify(stagedTargets[0]));
  } catch (error) {
    console.log(error);
  }
};

export const onUploadFile = async ({
  url,
  formData,
  fileName,
  resourceUrl
}: {
  url: string;
  formData: FormData;
  fileName: string;
  resourceUrl: string;
}) => {
  try {
    await uploadFile({ url, formData });
    await createFile({
      alt: fileName,
      contentType: 'FILE',
      originalSource: resourceUrl
    });
  } catch (error) {
    console.log(error);
  }
};
