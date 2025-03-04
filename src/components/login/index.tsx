"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { getErrorMessage, loginUser } from "@/src/services/BlogServices";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface LoginCredentials {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  localStorage.removeItem("theme");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const token = await loginUser(data);
      localStorage.setItem("token", token);
      toast({
        className: "bg-green-600 text-[#fff] font-bold",
        description: "Login Successfully",
      });
      router.push("/blog");
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <div className="w-full flex justify-center items-center md:h-screen h-[calc(100vh-64px)]">
      <div className="w-[80%] md:w-1/4 space-y-2">
        <h5 className="mb-6">Login Blog</h5>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-full">
          <div>
            <Label>Email :</Label>
            <div className="relative flex items-center rounded-md border pl-2">
              <MailIcon className="h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email"
                className="border-0 focus-visible:ring-0 shadow-none w-full"
                autoComplete="off"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label>Password :</Label>
            <div className="relative flex items-center rounded-md border px-2 mb-2">
              <LockIcon className="h-5 w-5 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border-0 focus-visible:ring-0 shadow-none w-full"
                autoComplete="off"
                {...register("password")}
              />
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          <Button type="submit" className="w-full">
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
}
