// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { createHmac } from "crypto";
// import axios from "axios";

// export function useAuth() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     (async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         router.push("/");
//       } else {
//         try {
//           const { data } = await axios.get(
//             "https://my-own-block-api-v8ol.onrender.com/api/auth/checkAuth",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           const isValid = data?.isValid;
//           console.log(isValid);
//           if (isValid) {
//             setIsAuthenticated(true);
//           } else {
//             localStorage.removeItem("token");
//             router.push("/");
//           }
//         } catch (error) {
//           localStorage.removeItem("token");
//           router.push("/");
//         }
//       }
//     })();
//   }, [router]);

//   return { isAuthenticated };
// }

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/");
        return;
      }

      try {
        const { data } = await axios.post(
          "https://my-own-block-api-v8ol.onrender.com/api/auth/checkAuth",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data?.isValid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          router.push("/");
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        localStorage.removeItem("token");
        router.push("/");
      }
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated };
}
