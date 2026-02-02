import { useForm } from "react-hook-form";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Button from "../ui/Button";
import { createAccount } from "../../firebase/firebaseAuth";
import { useDispatch } from "react-redux";
import { closeAll, openLogin } from "../../store/cardStatus";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;

function Signup() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [authError, setAuthError] = useState("");

  const onSubmit = async (data) => {
    setAuthError("");
    const result = await createAccount(data);
    if (result.error) {
      setAuthError(result.message);
    } else {
      dispatch(closeAll());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="absolute inset-0" />

      <div className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl border border-white/20 p-8 flex flex-col animate-in fade-in zoom-in duration-300">
        <Button
          variant="none"
          size="none"
          onClick={() => {
            dispatch(closeAll());
          }}
          className="absolute top-6 right-6 text-gray-400 hover:text-slate-900 transition-colors p-1"
        >
          <IoClose size={24} />
        </Button>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Create Account
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            Join us by filling the details
          </p>
        </div>

        {authError && (
          <div className="flex justify-center mb-4">
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider text-center">
              {authError}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-1">
            <input
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: USERNAME_REGEX,
                  message: "3-16 chars, start with letter, no special chars",
                },
              })}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 text-slate-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-center text-red-500 text-[10px] font-medium leading-tight">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Invalid email address",
                },
              })}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 text-slate-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="text-center text-red-500 text-[10px] font-medium leading-tight">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: PWD_REGEX,
                  message: "Need: Upper, Lower, Num, & Special Char",
                },
              })}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 text-slate-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-center text-red-500 text-[10px] font-medium leading-tight px-4">
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
            {isSubmitting ? "CREATING..." : "GET STARTED"}
          </Button>
        </form>

        <p className="text-center text-slate-600 text-sm mt-6">
          Already have an account?{" "}
          <Button
            variant="none"
            size="none"
            type="button"
            onClick={() => {
              dispatch(closeAll());
              dispatch(openLogin());
            }}
            className="text-blue-600 font-bold hover:underline underline-offset-4"
          >
            Login
          </Button>
        </p>

        <p className="text-center text-gray-400 text-[10px] mt-6 uppercase tracking-widest font-semibold">
          Secure Registration
        </p>
      </div>
    </div>
  );
}

export default Signup;
