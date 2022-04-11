import { signIn } from 'next-auth/react';
import { Fragment, useState } from 'react';
import { Button, Variants } from '~/components/Button';
import { Input } from '~/components/Input';
import { Logo } from '~/components/Logo';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: any) => {
    e.preventDefault();
    signIn('credentials', { username, password, callbackUrl: '/' });
  };
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo className="mx-auto h-12 w-auto mb-12" />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-rssx-bg py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={onSubmit}>
            <Input
              label="Username"
              name="email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" className="w-full" variant={Variants.PRIMARY}>
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

SignIn.layout = Fragment;
export default SignIn;
