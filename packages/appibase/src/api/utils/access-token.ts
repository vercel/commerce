import Cookies from 'js-cookie'
import Kitsu from "kitsu";
import { API_URL, SCOPE, CLIENT_ID_STOREFRONT } from '../../const'

const GetAccessToken = async () => {

  const fromCookies = Cookies.get('access_token');
  
  if(!fromCookies) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Basic ${Buffer.from(CLIENT_ID_STOREFRONT).toString('base64')}`);
    myHeaders.append("Accept", "application/json");

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("scope", SCOPE);
    
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
    };

    const response = await fetch(API_URL + "/oauth/token", requestOptions)
    const { access_token, expires_in } = await response.json()
    
    Cookies.set('access_token', access_token, { expires: expires_in / 60 / 60 / 24 })
    return access_token
  }
  else return fromCookies
}


export { GetAccessToken }