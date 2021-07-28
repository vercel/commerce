
import Cookies from 'js-cookie'

const getCustomerCookie = () => {
  const customerCookieObj = Cookies.get('customer_token');
  if(customerCookieObj) {
    try {
      return JSON.parse(atob(customerCookieObj));
    } catch(err) {
      return false;
    } 
  } else {
    return false;
  }
}
export default getCustomerCookie;