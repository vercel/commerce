import Cookies from 'js-cookie'

const getCustomerCookie = () => {
  const customerCookieObj = Cookies.get("user_token");
  if(customerCookieObj) {
    try {
      return JSON.parse(customerCookieObj);
    } catch(err) {
      return false;
    } 
  } else {
    return false;
  }
}
export default getCustomerCookie;