import { useMsal } from '@azure/msal-react';

export function ButtonLogin() {
  const { instance } = useMsal();

  const loginHandler = () => {
    instance.loginRedirect();
  };

  return (
    <div className="inline-flex rounded-md shadow">
      <a
        href="#"
        onClick={loginHandler}
        className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Log In
      </a>
    </div>
  );
}

export default ButtonLogin;
