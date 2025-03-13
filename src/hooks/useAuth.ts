"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createHmac } from "crypto";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
    } else {
      const [headerEncoded, payloadEncoded, signatureEncoded]: string[] =
        token.split(".");

      const data = `${headerEncoded}.${payloadEncoded}`;
      const computedSignature = createHmac(
        "sha256",
        process.env.NEXT_PUBLIC_APP_SECRET ?? ""
      )
        .update(data)
        .digest("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      const isValid = computedSignature === signatureEncoded;
      if (isValid) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("token");
        router.push("/");
      }
    }
  }, [router]);

  return { isAuthenticated };
}
