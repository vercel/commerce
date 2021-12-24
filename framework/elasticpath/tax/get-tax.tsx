import axios from "axios";

const getTax = () => {
    axios({
        url: 'http://206.189.135.123:3030/store-events/615aa7276b3472001db03258/get-tax',
        method: 'POST',
        data: {
            payload:{
                data:{
                    cart_id:"Cart1",
                    shipping_address: {
                        first_name: "Otis",
                        last_name: "Sedmak",
                        phone_number: "(555) 555-1234",
                        company_name: "Sedmak & Co.",
                        line_1: "12 Jennifer Lane",
                        city: "Warren",
                        postcode: "07059",
                        county: "NJ",
                        country: "US",
                        instructions: "Leave in porch"
                    }
                }
            }
        }
    })
    .then(function (response) {
        console.log(response);
        return response
    })
    .catch(function (error) {
        console.log(error);
    })
}

export default getTax;