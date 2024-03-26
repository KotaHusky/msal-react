'use client';

import React from 'react';
import { ButtonLogin, ButtonLogout } from '@my-workspace/lib-msal-react';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';

export default function Page() {
  return (
    <div>
      <div className="bg-slate-900 h-screen w-screen">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-300 sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-indigo-600">
              Start your free trial today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <AuthenticatedTemplate>
              <ButtonLogout />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <ButtonLogin />
            </UnauthenticatedTemplate>
          </div>
        </div>
      </div>
    </div>
  );
}
