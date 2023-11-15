import { NextRequest } from 'next/server';

const isAuthenticated = (request: NextRequest) => {
  const customerAccessToken = request.cookies.get('customerAccessToken')?.value;
  return customerAccessToken;
};

export default isAuthenticated;
