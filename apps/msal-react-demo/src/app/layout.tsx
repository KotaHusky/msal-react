'use client';

import 'tailwindcss/tailwind.css';
import { MsalProviderComponent } from '@my-workspace/lib-msal-react';
import { Metadata } from 'next';

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
          <div id="layout-children">{children}</div>
        </MsalProviderComponent>
      </body>
    </html>
  );
}
