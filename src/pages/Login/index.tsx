import React, { useCallback, useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';
import WelcomeModal from '../../components/WelcomeModal';

import Logo from '../../assets/logo-orange.png';
import IsValidEmail from '../../services/IsValidEmail';
import { ToastSuccess, ToastWarning } from '../../services/ShowToaster';

import User from '../../types/User';

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showWelcomes, setShowWelcomes] = useState(true);

  const handleLogin = useCallback(
    (e: FormEvent): void => {
      e.preventDefault();

      if (email === 'test@test.com' && password === 'test')
        return history.push('/dashboard');

      if (!email || !IsValidEmail(email)) return ToastWarning('Email missing');

      if (!password) return ToastWarning('Password missing');

      const data = localStorage.getItem('@MyFranchise-User');

      let user;

      if (data) user = JSON.parse(data) as User;

      if (user?.email === email && user?.password === password)
        return ToastSuccess('Welcome back!');

      return ToastWarning('Email or password wrong');
    },
    [email, history, password],
  );

  return (
    <div className="flex justify-center items-center bg-blue-500 h-screen w-screen">
      <WelcomeModal isShowing={showWelcomes} onClose={setShowWelcomes} />
      <div className="max-w-sm px-3">
        <figure className="mb-8">
          <img src={Logo} alt="My franchise" />
        </figure>
        <form onSubmit={handleLogin} className="flex flex-col items-center">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />

          <Button type="submit" label="LOG IN" />

          <span className="text-white my-4">
            {"Don't have an account? "}
            <Link className="duration-200 hover:opacity-60" to="/register">
              <strong>SIGN UP</strong>
            </Link>
          </span>

          <span className="text-white">
            {'Forgot your password? '}
            <Link
              className="duration-200 hover:opacity-60"
              to="/forgot-password"
            >
              <strong>CLICK HERE</strong>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
