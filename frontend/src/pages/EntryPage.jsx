import { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";
import { useLogin } from "../hooks/useLogin";

function EntryPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginError, setShowLoginError] = useState(false);
  const { signUpLoading, signUpError, signup } = useSignUp();
  const { loginLoading, loginError, login } = useLogin();

  const handleEmailChange = function (e) {
    setEmail(e.target.value);
  };

  const handlePasswordChange = function (e) {
    setPassword(e.target.value);
  };

  const handleLoginClick = async function (e) {
    e.preventDefault();
    await login(email, password);
    setShowLoginError(true);
  };

  const handleSignUpClick = async function (e) {
    e.preventDefault();
    await signup(email, password);
    setShowLoginError(false);
  };

  return (
    <div className="px-5 pt-10">
      <form className="mx-auto grid grid-cols-[1fr_3fr] grid-rows-[1.5rem_3rem_1.5rem_3rem_4rem_2rem] items-center gap-y-1 rounded-md bg-amber-800 p-4">
        <label className="col-span-2 text-sm font-semibold text-amber-950">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="col-span-2 h-8 w-full self-start rounded-md bg-amber-600 pl-2 text-sm focus:outline-none"
        />
        <label className="col-span-2 text-sm font-semibold text-amber-950">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="col-span-2 h-8 w-full self-start rounded-md bg-amber-600 pl-2 text-sm focus:outline-none"
        />
        <p className="col-span-2 self-start text-xs text-red-300">
          {showLoginError ? loginError : signUpError}
        </p>
        <button
          disabled={loginLoading}
          onClick={handleLoginClick}
          className="h-full w-20 rounded-lg bg-amber-950 text-xs font-semibold text-amber-700"
        >
          Log in
        </button>
        <button
          disabled={signUpLoading}
          onClick={handleSignUpClick}
          className="h-full w-20 justify-self-end rounded-lg bg-amber-950 text-xs font-semibold text-amber-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default EntryPage;
