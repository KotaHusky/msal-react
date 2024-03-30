/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';
import { policyNames } from '../msal-react';

// Assuming your b2cAuthority and policyNames are correctly configured
const b2cAuthority = 'msalreact';

// Initialize the JWKS client
const jwksClient = jwksRsa({
  jwksUri: `https://${b2cAuthority}.b2clogin.com/${b2cAuthority}.onmicrosoft.com/${policyNames.signUpSignIn}/discovery/v2.0/keys`,
});

// Helper function to retrieve the signing key
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

export async function verifyB2CToken(req: any, res: any) {
  console.log('req:', req);
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token missing' });
  }

  try {
    // Verify the token
    jwt.verify(token, getSigningKey, {
      audience: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
      issuer: `https://${b2cAuthority}.b2clogin.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}/v2.0/`,
      algorithms: ['RS256']
    }, (err, decoded) => {
      if (err) {
        // Handle verification errors
        return res.status(401).json({ message: 'Unauthorized', error: err.message });
      } else {
        // Token is valid, proceed with your logic
        res.status(200).json({ message: 'Authorized', decoded });
      }
    });
  } catch (error: any) {
    // Handle unexpected errors
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
