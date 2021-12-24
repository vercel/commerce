import axios from 'axios'
// const MoltinGateway = require('@moltin/sdk').gateway
import { gateway as MoltinGateway } from '@moltin/sdk';
import { MoltinClient } from '@moltin/request';

const Moltin = MoltinGateway({
    client_id: process.env.NEXT_PUBLIC_ELASTICPATH_CLIENTID
})

const client = new MoltinClient({
    client_id: process.env.NEXT_PUBLIC_ELASTICPATH_CLIENTID,
    client_secret: process.env.NEXT_PUBLIC_ELASTICPATH_SECRET
})

const getTax = () => {
    Moltin.Cart('Cart1')
        .Items()
        .then((cart: any) => {
            console.log(cart.data)
            let taxItemId = cart?.data[0]?.relationships?.taxes?.data[0]?.id;
            
            if(taxItemId){
                client
                .put(`carts/Cart1/items/12ef6cda-c8bb-483c-9b5f-4e89c7ef70f2/taxes/${taxItemId}`, {
                    type: "tax_item"
                })
                .then((items: any) => {
                    console.log("SUCCESS");
                    console.log(items);
                    return items
                })
                .catch(console.error)
            }

        }
    )
}


export default getTax;