import jwt from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';
import { b2cAuthorityDomain, b2cPolicies } from '@my-workspace/data-access-msal-config';

const jwksClient = jwksRsa({
  jwksUri: `https://${b2cPolicies.authorities.signUpSignIn.authority}/discovery/v2.0/keys`,
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

export async function verifyAzureB2CToken(request: Request, requiredScope: string) {
  return new Promise((resolve, reject) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      reject('Unauthorized, missing or invalid token');
      return;
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
      token,
      getSigningKey,
      {
        audience: process.env['AZURE_B2C_CLIENT_ID'],
        issuer: `${b2cAuthorityDomain}/${process.env['AZURE_B2C_TENANT_ID']}/v2.0/`,
        algorithms: ['RS256'],
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err, decoded:any) => {
        if (err) {
          reject(err);
        } else {
          // Check if the token has the required scope
          if (!decoded.scp || !decoded.scp.includes(requiredScope)) {
            reject('Unauthorized, missing or invalid scope');
            return;
          }

          resolve(decoded);
        }
      },
    );
  });
}
