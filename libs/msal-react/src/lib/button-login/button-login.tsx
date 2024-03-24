// libs/msal-react/src/lib/ButtonLogin.tsx
import React from 'react';
import { useMsal } from '@azure/msal-react';
import Button from '@mui/material/Button'; // Assuming you're using MUI for styling

export const ButtonLogin = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      await instance.loginPopup({
        scopes: ["User.Read"],
        prompt: "select_account",
      });
      // Handle response if needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={handleLogin} variant="contained" color="primary">
      Log In
    </Button>
  );
};
