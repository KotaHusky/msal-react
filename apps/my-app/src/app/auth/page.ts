'use client'

import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";

export default function AuthPage() {
  const { instance } = useMsal();

  useEffect(() => {
    const handleRedirectPromise = instance.handleRedirectPromise();
    handleRedirectPromise.catch((error) => {
      console.error(error);
    });
  }, [instance]);

  return null;
}