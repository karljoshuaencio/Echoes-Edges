'use server'; // or 'use client' if needed

import { signUp } from 'aws-amplify/auth';

export async function registerUser(email: string, password: string) {
  try {
    const result = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
        },
      },
    });

    console.log('✅ Signup success:', result);
    return result;
  } catch (error) {
    console.error('❌ Signup error:', error);
    throw error;
  }
}
