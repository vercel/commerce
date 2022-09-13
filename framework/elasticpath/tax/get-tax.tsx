import axios from "axios";
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import useCart from "@framework/cart/use-cart";

const cartId = getCookie('cartId');
  console.log("cartId " , cartId );

const getTax = () => {

    const { data, isLoading, isEmpty } = useCart();
    console.log(data);
    axios({
        url: 'http://localhost:3000/events/store/get-tax',
        method: 'POST',
        data: {
            payload:{
                data:{
                    cartId:cartId?.toString(),
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