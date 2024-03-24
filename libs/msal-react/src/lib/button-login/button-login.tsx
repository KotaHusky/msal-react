import React from 'react';
import { useMsal } from '@azure/msal-react';
import Button from '@mui/material/Button'; // Import MUI Button component

/**
 * SignInButton Component
 * A button that triggers the MSAL sign-in process using a popup.
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    /**
     * Triggers the sign-in process using MSAL's loginPopup method.
     */
    const handleLogin = () => {
        instance.loginPopup()
            .catch(e => {
                console.error(e);
            });
    };

    // Render a styled MUI Button to initiate the sign-in process
    return (
        <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{
                fontSize: 16,
                padding: '6px 12px',
                borderRadius: 4,
            }}
        >
            Sign In
        </Button>
    );
};
