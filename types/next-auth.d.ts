import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      token: string;
      user_email: string;
      user_nicename: string;
      user_display_name: string;
    }
  }

  interface User {
    token: string;
    user_email: string;
    user_nicename: string;
    user_display_name: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      token: string;
      user_email: string;
      user_nicename: string;
      user_display_name: string;
    }
  }
}