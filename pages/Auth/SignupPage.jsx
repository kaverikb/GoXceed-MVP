import { useState } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authService";

export default function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSignup =
    async () => {

      if (
        !email.trim() ||
        !password.trim()
      ) {
        alert(
          "Fill all fields."
        );
        return;
      }

      setLoading(true);

      try {

        await signup({
          email,
          password,
        });

        alert(
          "Account created successfully."
        );

        navigate(
          "/login"
        );

      } catch (error) {

        alert(
          "Unable to create account."
        );
      }

      setLoading(false);
    };

  return (
    <div className="h-screen bg-[#F6F7FB] flex items-center justify-center px-6">

      <div className="w-full max-w-130 bg-white border border-slate-200 rounded-2xl shadow-sm p-8">

        <div className="flex justify-center mb-5">

          <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-sm">
            📄
          </div>

        </div>

        <h1 className="text-center text-[28px] font-bold text-slate-900">
          Join your team
        </h1>

        <p className="text-center text-slate-500 text-base mt-2">
          Create an account to start collaborating on proposals
        </p>

        <div className="flex items-center gap-4 my-5">
          <div className="flex-1 h-px bg-slate-200"></div>

          <span className="text-slate-500 text-sm">
            SIGN UP
          </span>

          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        <label className="block text-sm font-medium mb-2">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          placeholder="you@company.com"
          className="w-full h-12 border border-slate-200 rounded-xl px-4 mb-5 outline-none focus:border-indigo-500"
        />

        <label className="block text-sm font-medium mb-2">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          placeholder="Min. 6 characters"
          className="w-full h-12 border border-slate-200 rounded-xl px-4 outline-none focus:border-indigo-500"
        />

        <button
          onClick={
            handleSignup
          }
          disabled={
            loading
          }
          className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold mt-6 transition"
        >
          {loading
            ? "Creating..."
            : "Create Account"}
        </button>

        <p className="text-center text-slate-500 mt-6 text-sm">
          Already have an account?{" "}

          <Link
            to="/login"
            className="text-indigo-600"
          >
            Sign in
          </Link>

        </p>

      </div>

    </div>
  );
}