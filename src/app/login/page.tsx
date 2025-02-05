"use client";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("@/src/components/login/index"), {
  ssr: false,
});

export default function Page() {
  return <Login />;
}
