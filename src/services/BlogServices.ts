"use client";
import axios from "axios";
import { BlogType, LoginDetails } from "./blog.types";

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

export const getBlog = async (): Promise<BlogType[] | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/blog`);
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching blogs:", getErrorMessage(error));
    return null;
  }
};

export const postBlog = async (data: BlogType): Promise<BlogType | null> => {
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

export const putBlog = async (
  id: string,
  data: BlogType
): Promise<BlogType | null> => {
  try {
    const response = await axios.put(`${BASE_URL}/blog/${id}`, data);
    return response.data;
  } catch (error: unknown) {
    console.error("Error updating blog:", getErrorMessage(error));
    return null;
  }
};

export const deleteBlog = async (id: string): Promise<boolean> => {
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
