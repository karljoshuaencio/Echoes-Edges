'use client';

import { useState } from 'react';
import { signUp, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';
import '../../../lib/amplify'; // ensure this configures Amplify

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [signupMessage, setSignupMessage] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [showConfirmForm, setShowConfirmForm] = useState(false);
  const [generatedUsername, setGeneratedUsername] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const username = crypto.randomUUID(); // Use UUID for unique usernames
      setGeneratedUsername(username); // Save to confirm later

      await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });

      setSignupMessage('Signup successful! Check your email for the confirmation code.');
      setShowConfirmForm(true);
    } catch (err: any) {
      setSignupMessage(err.message || 'Signup failed.');
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await confirmSignUp({
        username: generatedUsername,
        confirmationCode,
      });

      setConfirmMessage('Account confirmed! You can now log in.');
    } catch (err: any) {
      setConfirmMessage(err.message || 'Confirmation failed.');
    }
  };

  const handleResendCode = async () => {
    try {
      await resendSignUpCode({ username: generatedUsername });
      setConfirmMessage('Confirmation code resent to your email.');
    } catch (err: any) {
      setConfirmMessage(err.message || 'Could not resend code.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/30 backdrop-blur-2xl">
      <div className="glass p-8 rounded-xl shadow-md text-white w-full max-w-md space-y-4">
        {!showConfirmForm ? (
          <>
            <h2 className="text-2xl font-bold">Create Account</h2>
            <form onSubmit={handleSignup} className="space-y-4">
              <input
                className="w-full p-2 rounded bg-white/10 border border-white/20 focus:outline-none"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
              <input
                className="w-full p-2 rounded bg-white/10 border border-white/20 focus:outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
              <button className="w-full bg-white/20 hover:bg-white/30 py-2 rounded text-white font-semibold" type="submit">
                Sign Up
              </button>
            </form>
            {signupMessage && <p className="text-sm text-yellow-300">{signupMessage}</p>}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold">Confirm Your Email</h2>
            <form onSubmit={handleConfirm} className="space-y-4">
              <input
                className="w-full p-2 rounded bg-white/10 border border-white/20 focus:outline-none"
                placeholder="Confirmation Code"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                required
              />
              <button className="w-full bg-white/20 hover:bg-white/30 py-2 rounded text-white font-semibold" type="submit">
                Confirm Account
              </button>
            </form>
            <button onClick={handleResendCode} className="text-sm underline text-blue-300 mt-2">
              Resend Code
            </button>
            {confirmMessage && <p className="text-sm text-yellow-300">{confirmMessage}</p>}
          </>
        )}
      </div>
    </div>
  );
}
