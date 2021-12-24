import axios from "axios";

const getShippingrates = () => {
    axios({
        url: 'http://localhost:3030/store-events/61a071eb6885c0001ef18569/get-shipping-rates',
        method: 'POST',
        data: {
            payload:{
                data: {
                    cartId :"Cart1",
                    shipping_address: {
                        first_name: "Otis",
                        last_name: "Sedmak",
                        phone_number: "(555) 555-1234",
                        company_name: "Sedmak & Co.",
                        line_1: "1251, Rexmere Ave",
                        line_2: "Farmingville, Suffolk",
                        city: "shipping city",
                        postcode: "11738",
                        county: "Farmingville, Suffolk",
                        country: "US",
                        instructions: "Leave in porch"
                    }
                }
            }
        }
    }).then((response: any) => {
        console.log(response)
        return response;
    }).catch((error: any) => {
        console.log(error)
    })
}

export default getShippingrates;