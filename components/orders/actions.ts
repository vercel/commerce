'use server';

import { handleUploadFile } from 'components/form/file-input/actions';
import { TAGS } from 'lib/constants';
import { updateOrderMetafields } from 'lib/shopify';
import { revalidateTag } from 'next/cache';

export const activateWarranty = async (orderId: string, formData: FormData) => {
  let odometerFileId = null;
  let installationFileId = null;
  const odometerFile = formData.get('warranty_activation_odometer');
  const installationFile = formData.get('warranty_activation_installation');
  if (odometerFile) {
    odometerFileId = await handleUploadFile({ file: odometerFile as File });
  }

  if (installationFile) {
    installationFileId = await handleUploadFile({ file: installationFile as File });
  }

  const rawFormData = [
    { key: 'warranty_activation_odometer', value: odometerFileId, type: 'file_reference' },
    { key: 'warranty_activation_installation', value: installationFileId, type: 'file_reference' },
    {
      key: 'warranty_activation_mileage',
      value: formData.get('warranty_activation_mileage') as string | null,
      type: 'number_integer'
    },
    {
      key: 'warranty_activation_vin',
      value: formData.get('warranty_activation_vin') as string | null,
      type: 'single_line_text_field'
    }
  ];

  try {
    await updateOrderMetafields({
      orderId,
      metafields: rawFormData
    });

    revalidateTag(TAGS.orderMetafields);
  } catch (error) {
    console.log('activateWarranty action', error);
  }
};
