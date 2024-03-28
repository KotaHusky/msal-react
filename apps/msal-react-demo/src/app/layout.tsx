'use client';

import 'tailwindcss/tailwind.css';
import { MsalProviderComponent } from '@my-workspace/lib-msal-react';
import { Metadata } from 'next';
import { Header } from '@my-workspace/ui';

// export const metadata: Metadata = {
//   title: 'Home',
//   description: 'Welcome to Next.js',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MsalProviderComponent>
          <Header />
          <div id="layout-children">{children}</div>
        </MsalProviderComponent>
      </body>
    </html>
  );
}
