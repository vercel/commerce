import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      customer_id: number;
      token: string;
      user_email: string;
      user_nicename: string;
      user_display_name: string;
    };
  }

  interface User {
    customer_id: number;
    token: string;
    user_email: string;
    user_nicename: string;
    user_display_name: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      customer_id: number;
      token: string;
      user_email: string;
      user_nicename: string;
      user_display_name: string;
    };
  }
}
