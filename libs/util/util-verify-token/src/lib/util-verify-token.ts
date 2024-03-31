import jwt from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';
import { b2cAuthority, policyNames } from '@my-workspace/data-access-msal-config';

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

export async function verifyB2CToken(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getSigningKey,
      {
        audience: process.env['NEXT_PUBLIC_AZURE_AD_CLIENT_ID'],
        issuer: `https://${b2cAuthority}.b2clogin.com/${process.env['NEXT_PUBLIC_AZURE_AD_TENANT_ID']}/v2.0/`,
        algorithms: ['RS256'],
      },
      (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      },
    );
  });
}
