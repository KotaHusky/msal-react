import jwt from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';

const b2cAuthority = 'msalreact';
const policyNames = {
  signUpSignIn: 'B2C_1_signup_signin',
  forgotPassword: 'B2C_1_reset',
  editProfile: 'B2C_1_edit_profile',
};

const jwksClient = jwksRsa({
  jwksUri: `https://${b2cAuthority}.b2clogin.com/${b2cAuthority}.onmicrosoft.com/${policyNames.signUpSignIn}/discovery/v2.0/keys`,
});

const getSigningKey = (header: any, callback: any) => {
  jwksClient.getSigningKey(header.kid, (err: any, key: any) => {
    if (err) {
      callback(err, null);
    } else {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    }
  });
};

async function verifyB2CToken(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getSigningKey, {
      audience: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
      issuer: `https://${b2cAuthority}.b2clogin.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}/v2.0/`,
      algorithms: ['RS256']
    }, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response('Unauthorized, missing or invalid token', { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    await verifyB2CToken(token);

    return new Response('Hello, from protected API!');
  } catch (error) {
    return new Response((error as Error).message || 'Error during token verification', { status: 401 });
  }
}