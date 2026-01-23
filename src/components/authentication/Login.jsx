import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Button from "../ui/Button";
import { auth } from "../../firebase/firebaseSetup";
import { loginUser } from "../../firebase/firebaseAuth";
import useAuth from "../../hook/AuthStatus";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [authError, setAuthError] = useState("");

  const onSubmit = async (data) => {
    setAuthError("");
    try {
      const respose = loginUser(data);
      if (respose) {
        useAuth();
      }
    } catch (error) {
      setAuthError("No account found with these credentials.");
    }
  };

  return (
    <div className="max-h-full flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-sm h-[580px] bg-white rounded-3xl border border-gray-100 shadow-xl p-8 flex flex-col justify-center">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Secure Login
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            Please enter your credentials
          </p>
        </div>

        {authError && (
          <div className="flex justify-center mb-6">
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-full text-xs font-semibold">
              {authError}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="relative">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Invalid email address",
                },
              })}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 text-slate-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="text-center text-red-500 text-xs mt-2 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: PWD_REGEX,
                  message:
                    "Must include: Uppercase, Lowercase, Number, & Special Char",
                },
              })}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 text-slate-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-center text-red-500 text-xs mt-2 font-medium leading-relaxed px-4">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            variant="none"
            size="none"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 mt-4"
          >
            {isSubmitting ? "Verifying..." : "ACCESS ACCOUNT"}
          </Button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-8">
          Protected by Firebase Authentication
        </p>
      </div>
    </div>
  );
}

export default Login;
