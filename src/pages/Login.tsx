import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CommonModal from "@/components/Common/CommonModal";

const loginSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    content: "",
  });

  const openModal = (title: string, content: string) => {
    setModalConfig({ isOpen: true, title, content });
  };

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login Data:", data);
    navigate("/");
  };

  return (
    <div className="flex  justify-center max-w-[500px] mx-auto h-auto scroll-y-auto">
      <div className="w-full p-6 shadow-md">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          {/* Phone Field */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-3">
              Phone
            </label>
            {/* Input Wrapper */}
            <div className="flex items-center border-1 border-gray-400 rounded-md focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden">
              <span className="bg-gray-100 px-3 py-2 border-r border-gray-400 text-gray-600 font-medium">
                +880
              </span>
              <input
                type="number"
                {...register("phone")}
                placeholder="1XXXXXXXXX"
                className="w-full p-2 focus:outline-none"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-3">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="my-7">
            <p>
              <Link to="/forgot-password" className="text-blue-500">
                Forgot Password?
              </Link>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-golden text-white text-xl font-bold p-2 cursor-pointer rounded-md hover:bg-gray-800"
          >
            Sign In
          </button>
        </form>
        <div className="mt-12 mb-4 flex flex-col gap-5">
          <h1 className="text-lg font-bold">Don't have an account?</h1>
          <p className="text-md">
            Create one and join Freedom to view your orders and earn Freedom
            rewards
          </p>
          <Link
            to="/signup"
            type="submit"
            className="w-full border-2 text-black border-black cursor-pointer text-xl font-bold p-2 rounded-md hover:border-golden hover:bg-golden hover:text-white"
          >
            Register
          </Link>
        </div>
        <p>
          By creating an account, you agree to our{" "}
          <span
            onClick={() =>
              openModal("Terms & Conditions", "Your long terms text here...")
            }
            className="underline me-1 text-blue-500 cursor-pointer"
          >
            Terms & Conditions,
          </span>
          <span
            onClick={() =>
              openModal(
                "Privacy Policy",
                "Your long privacy policy text here..."
              )
            }
            className="underline text-blue-500 cursor-pointer"
          >
            Privacy Policy
          </span>{" "}
          and{" "}
          <span
            onClick={() =>
              openModal("Agreement", "Your long terms text here...")
            }
            className="underline text-blue-500 cursor-pointer"
          >
            Agreement
          </span>
        </p>
      </div>
      <CommonModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      >
        <p>{modalConfig.content}</p>
      </CommonModal>
    </div>
  );
};

export default Login;
