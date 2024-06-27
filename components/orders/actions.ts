'use server';

import { handleUploadFile } from 'components/form/file-input/actions';
import { TAGS } from 'lib/constants';
import { updateOrderMetafields } from 'lib/shopify';
import { ShopifyOrderMetafield, UpdateOrderMetafieldInput } from 'lib/shopify/types';
import { revalidateTag } from 'next/cache';

const getMetafieldValue = (
  key: keyof ShopifyOrderMetafield,
  newValue: { value?: string | null; type: string; key: string },
  orderMetafields?: ShopifyOrderMetafield
): UpdateOrderMetafieldInput => {
  return orderMetafields?.[key]?.id
    ? { id: orderMetafields[key]?.id!, value: newValue.value, key: newValue.key }
    : { ...newValue, namespace: 'custom' };
};

export const activateWarranty = async (
  orderId: string,
  formData: FormData,
  orderMetafields?: ShopifyOrderMetafield
) => {
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
  console.log(formData.get('warranty_activation_self_install'));
  // https://shopify.dev/docs/api/admin-graphql/2024-01/mutations/orderUpdate
  const rawFormData = [
    getMetafieldValue(
      'warrantyActivationOdometer',
      {
        key: 'warranty_activation_odometer',
        value: odometerFileId,
        type: 'file_reference'
      },
      orderMetafields
    ),
    getMetafieldValue(
      'warrantyActivationInstallation',
      {
        key: 'warranty_activation_installation',
        value: installationFileId,
        type: 'file_reference'
      },
      orderMetafields
    ),
    getMetafieldValue(
      'warrantyActivationSelfInstall',
      {
        key: 'warranty_activation_self_install',
        value: formData.get('warranty_activation_self_install') === 'on' ? 'true' : 'false',
        type: 'boolean'
      },
      orderMetafields
    ),
    getMetafieldValue(
      'warrantyActivationMileage',
      {
        key: 'warranty_activation_mileage',
        value: formData.get('warranty_activation_mileage') as string | null,
        type: 'number_integer'
      },
      orderMetafields
    ),
    getMetafieldValue(
      'warrantyActivationVIN',
      {
        key: 'warranty_activation_vin',
        value: formData.get('warranty_activation_vin') as string | null,
        type: 'single_line_text_field'
      },
      orderMetafields
    )
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
