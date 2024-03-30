/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const b2cAuthority = 'msalreact';

const client = jwksClient({
  jwksUri: `https://${b2cAuthority}.b2clogin.com/${process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID}.onmicrosoft.com/discovery/v2.0/keys`,
});

function getKey(header: any, callback: any) {
  client.getSigningKey(header.kid, (err: any, key: any) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

export async function verifyToken(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
}
