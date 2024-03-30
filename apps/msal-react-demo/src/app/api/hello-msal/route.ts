export async function GET(request: Request) {
  try {
    // Extract the token from the Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response('Unauthorized', { status: 401 });
    }

    const token = authHeader.substring(7); // Remove the "Bearer " prefix to get the actual token
    const { verifyToken } = await import('@my-workspace/lib-msal-react');
    await verifyToken(token); // Verify the token

    // Proceed with your API logic after successful token verification
    return new Response('Hello, from protected API!');
  } catch (error) {
    // Handle errors (e.g., token verification failure)
    return new Response((error as Error).message || 'Error during token verification', { status: 401 });
  }
}
