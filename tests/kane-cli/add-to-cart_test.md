# Next.js Commerce — add a product to the cart

A Kane CLI natural-language end-to-end test that opens the Commerce demo
storefront, opens a product, adds it to the cart, and verifies the cart updates.
Runs in a real browser (Kane CLI also automates mobile apps on the iOS Simulator
and Android Emulator).

## Add a product to the cart
Go to https://demo.vercel.store.
Wait for the storefront to load.
Click on the first product.
If size or color options are shown, select the first available option for each.
Click the "Add To Cart" button.
Assert that the cart updates to show 1 item (a cart quantity badge or a cart drawer listing the item).
