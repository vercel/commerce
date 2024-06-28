'use server';

import { renderToBuffer } from '@react-pdf/renderer';
import OrderConfirmationPdf from 'components/orders/order-confirmation-pdf';
import { handleUploadFile } from 'components/form/file-input/actions';
import { TAGS } from 'lib/constants';
import { updateOrderMetafields } from 'lib/shopify';
import { Order, OrderConfirmationContent } from 'lib/shopify/types';
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

async function generateOrderConfirmationPDF(
  order: Order,
  content: OrderConfirmationContent,
  signature1: string,
  signature2: string,
  signDate: string
) {
  return renderToBuffer(
    <OrderConfirmationPdf
      order={order}
      content={content}
      signature1={signature1}
      signature2={signature2}
      date={signDate}
    />
  );
}

type ConfirmOrderOptions = {
  order: Order;
  content: OrderConfirmationContent;
  formData: FormData;
};

export const confirmOrder = async ({ order, content, formData }: ConfirmOrderOptions) => {
  const signature1 = formData.get('signature1') as string;
  const signature2 = formData.get('signature2') as string;
  const signDate = formData.get('date') as string;

  const pdfBuffer = await generateOrderConfirmationPDF(
    order,
    content,
    signature1,
    signature2,
    signDate
  );

  const fileName = `${new Date().getTime()}-${order.name}-signaturePdf.pdf`;
  const file = new File([pdfBuffer], fileName, { type: 'application/pdf' });

  const confirmationPDFId = await handleUploadFile({ file });

  const rawFormData = [
    { key: 'customer_confirmation', value: confirmationPDFId, type: 'file_reference' }
  ];

  try {
    await updateOrderMetafields({
      orderId: order.id,
      metafields: rawFormData
    });

    revalidateTag(TAGS.orderMetafields);
  } catch (error) {
    console.log('activateWarranty action', error);
  }
};
