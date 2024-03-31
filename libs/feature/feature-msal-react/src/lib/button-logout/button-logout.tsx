import { useMsal } from '@azure/msal-react';

export function ButtonLogout() {
  const { instance } = useMsal();

  const logoutHandler = () => {
    instance.logoutRedirect();
  };

  return (
    <div className="ml-3 inline-flex rounded-md shadow">
      <a
        href="#"
        onClick={logoutHandler}
        className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
      >
        Logout
      </a>
    </div>
  );
}

export default ButtonLogout;
