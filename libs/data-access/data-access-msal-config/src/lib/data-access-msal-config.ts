import { Configuration, LogLevel, PublicClientApplication } from '@azure/msal-browser';

if (!process.env['NEXT_PUBLIC_AZURE_B2C_CLIENT_ID']) {
  throw new Error('NEXT_PUBLIC_AZURE_B2C_CLIENT_ID is not set');
}

export const b2cAuthorityDomain = `https://${process.env['NEXT_PUBLIC_AZURE_B2C_AUTHORITY']}.b2clogin.com`
const b2cAuthorityUrl = `${b2cAuthorityDomain}/${process.env['NEXT_PUBLIC_AZURE_B2C_AUTHORITY']}.onmicrosoft.com`;
const policyNames = {
  signUpSignIn: process.env['NEXT_PUBLIC_AZURE_B2C_FLOW_SIGN_UP_SIGN_IN'],
  forgotPassword: process.env['NEXT_PUBLIC_AZURE_B2C_FLOW_FORGOT_PASSWORD'],
  editProfile: process.env['NEXT_PUBLIC_AZURE_B2C_FLOW_EDIT_PROFILE'],
};

export const b2cPolicies = {
  names: policyNames,
  authorities: {
    signUpSignIn: {
      authority: `${b2cAuthorityUrl}/${policyNames.signUpSignIn}`,
    },
    forgotPassword: {
      authority: `${b2cAuthorityUrl}/${policyNames.forgotPassword}`,
    },
    editProfile: {
      authority: `${b2cAuthorityUrl}/${policyNames.editProfile}`,
    },
  }
};

export const loginConfig = {
  scopes: [`https://${process.env['NEXT_PUBLIC_AZURE_B2C_AUTHORITY']}.onmicrosoft.com/${process.env['NEXT_PUBLIC_AZURE_B2C_CLIENT_ID']}/ReadUser`]
};

// MSAL Configurationcc
const msalConfig: Configuration = {
  auth: {
    clientId: process.env['NEXT_PUBLIC_AZURE_B2C_CLIENT_ID'],
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cAuthorityDomain],
    redirectUri: process.env['NEXT_PUBLIC_AZURE_B2C_REDIRECT_URI'],
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie:
      typeof window !== 'undefined' &&
      window.navigator.userAgent.indexOf('MSIE') > -1,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            // console.info(message);
            return;
          case LogLevel.Verbose:
            // console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export let msalInstance: PublicClientApplication;

try {
  msalInstance = new PublicClientApplication(msalConfig);
} catch (error) {
  console.error('Failed to initialize MSAL', error);
}
