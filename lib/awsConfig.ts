import { Amplify } from 'aws-amplify';

const authConfig = {
  region: process.env.NEXT_PUBLIC_COGNITO_REGION!,
  userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
  oauth: {
    domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN!,
    scope: ['email', 'openid', 'profile'],
    redirectSignIn: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_SIGNIN!,
    redirectSignOut: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_SIGNOUT!,
    responseType: 'code',
  },
};

Amplify.configure({ Auth: authConfig as any });