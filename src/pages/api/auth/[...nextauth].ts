import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  theme: {
    colorScheme: 'dark',
    logo: '',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days

    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    CredentialsProvider({
      name: 'username & password',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log(
          credentials &&
            credentials.username === process.env.AUTH_USERNAME &&
            credentials.password === process.env.AUTH_PASSWORD,
        );
        if (
          credentials &&
          credentials.username === process.env.AUTH_USERNAME &&
          credentials.password === process.env.AUTH_PASSWORD
        ) {
          return {
            user: {
              username: credentials.username,
            },
          };
        } else {
          return null;
        }
      },
    }),
  ],
});
