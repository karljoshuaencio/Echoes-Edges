'use client';

import { useState } from 'react';
import { CognitoUser, AuthenticationDetails, userPool } from '../../../lib/cognito';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = new CognitoUser({ Username: email, Pool: userPool });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result: import('amazon-cognito-identity-js').CognitoUserSession) => {
        console.log('✅ Logged in!', result);
        // You can store tokens here or redirect to dashboard
      },
      onFailure: (err: any) => {
        console.error('❌ Login error', err);
        setError(err.message || 'Login failed');
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/glass-bg.jpg')] bg-cover bg-center">
      <div className="w-full max-w-md bg-white/10 border border-white/30 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">🔐 Login to Your Journey</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div>
            <label className="block text-white mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-white/20 text-white border border-white/30 hover:bg-white/30 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
