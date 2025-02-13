"use client";
import axios from "axios";
import { HtmlBlogType, LoginDetails } from "./blog.types";

const BASE_URL = "https://my-own-block-api.onrender.com";
// const BASE_URL = "http://localhost:3001";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Something went wrong!";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred.";
};

export const getHtmlBlog = async (): Promise<HtmlBlogType[] | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/htmlBlog`);
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching blogs:", getErrorMessage(error));
    return null;
  }
};

// export const postHtmlBlog = async (
//   data: HtmlBlogType
// ): Promise<HtmlBlogType | null> => {
//   try {
//     const response = await axios.post(`${BASE_URL}/htmlBlog`, data);
//     return response.data;
//   } catch (error: unknown) {
//     console.error("Error posting blog:", getErrorMessage(error));
//     return null;
//   }
// };

export const postHtmlBlog = async (
  data: HtmlBlogType
): Promise<HtmlBlogType | null> => {
  try {
    const response = await axios.post(`${BASE_URL}/blog`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is stored
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error posting blog:", getErrorMessage(error));

    // Optional: Throw error for better handling in calling functions
    throw new Error(getErrorMessage(error));
  }
};

export const putHtmlBlog = async (
  id: string,
  data: HtmlBlogType
): Promise<HtmlBlogType | null> => {
  try {
    const response = await axios.put(`${BASE_URL}/blog/${id}`, data);
    return response.data;
  } catch (error: unknown) {
    console.error("Error updating blog:", getErrorMessage(error));
    return null;
  }
};

export const deleteHtmlBlog = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${BASE_URL}/blog/${id}`);
    return true;
  } catch (error: unknown) {
    console.error("Error deleting blog:", getErrorMessage(error));
    return false;
  }
};

export const loginUser = async (data: LoginDetails): Promise<string> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, data);
    return response.data.token;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};
