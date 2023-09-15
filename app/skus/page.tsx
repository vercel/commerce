import { createProductSKUs } from 'lib/helpers/skus';
import { getProducts } from 'lib/shopify';

import { Dropbox, DropboxResponse, files } from 'dropbox';

// how to get new Dropbox refresh token
// 1. go to https://www.dropbox.com/oauth2/authorize?client_id=YOUR_APP_KEY&token_access_type=offline&response_type=code&redirect_uri=https://www.dropbox.com/1/oauth2/display_token
// 2. copy code from URL after redirect
// 3. curl
// curl -X POST https://api.dropboxapi.com/oauth2/token \
// -d 'grant_type=authorization_code' \
// -d 'code=CODE_HERE' \
// -d 'client_id=CLIENT_ID' \
// -d 'client_secret=CLIENT_SECRET' \
// -d 'redirect_uri=https://www.dropbox.com/1/oauth2/display_token'


export default async function SKUCheckPage() {
  const products = await getProducts({});

  let dbxFiles: DropboxResponse<files.ListFolderResult> | undefined;
  let dbxError: string | undefined;

  try {
    const dbx = new Dropbox({
      clientId: process.env.DROPBOX_APP_KEY,
      clientSecret: process.env.DROPBOX_APP_SECRET,
      refreshToken: process.env.DROPBOX_REFRESH_TOKEN
    });
  
    dbxFiles = await dbx.filesListFolder({
      path: '/scape squared/004 print ready - print files'
    });
  } catch (e) {
    dbxError = e + ""
  }

  // sabotage?
  // dbxFiles.result.entries.splice(5, 1);

  return (
    <div>
      {products.map((product) => {
        const skus = createProductSKUs(product.title);

        // sabotage?
        // product.variants[3]!.sku = 'SCSQ10001_STTU781_M_C002_B_NT';

        const productFiles = dbxFiles?.result.entries
          .filter((file) => file.name.startsWith(skus[0]!.split('_')[0]!))

        return (
          <div key={product.id} className="mt-10 lg:grid lg:grid-cols-12 gap-x-4 gap-y-1">
            <h1 className="text-2xl lg:col-span-10 lg:col-start-3">{product.title}</h1>
            <div
              className={
                'mb-4 lg:col-span-4 lg:col-start-3 rounded ' +
                (productFiles?.length !== 2 ? 'bg-amber-300' : '')
              }
            >
               Dropbox: {productFiles?.map(file => file.name).join(", ")}{dbxError}
            </div>
            {product.variants.map((variant, i) => (
              <>
                <div className="lg:col-span-1 lg:col-start-2 text-right">
                  {variant.selectedOptions[0]?.value}
                </div>
                <div
                  className={
                    'tabular-nums lg:col-span-4 rounded ' +
                    (variant.sku === skus[i] ? '' : 'bg-amber-300')
                  }
                >
                  {variant.sku.split('').map((letter, lIdx) => (
                    <span className="relative">
                      {letter}
                      {letter === skus[i]![lIdx] ? null : (
                        <div className="absolute left-0 right-0 top-0 bottom-0 bg-red-500 animate-ping rounded" />
                      )}
                    </span>
                  ))}{' '}
                  (Shopify)
                  <br />
                  {skus[i]} (Expected)
                </div>
              </>
            ))}
          </div>
        );
      })}
    </div>
  );
}
