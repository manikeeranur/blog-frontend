"use client";
import axios from "axios";
import { HtmlBlogType, LoginDetails } from "./blog.types";

const BASE_URL = "https://my-own-block-api.onrender.com";

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

export const postHtmlBlog = async (
  data: HtmlBlogType
): Promise<HtmlBlogType | null> => {
  try {
    const response = await axios.post(`${BASE_URL}/htmlBlog`, data);
    return response.data;
  } catch (error: unknown) {
    console.error("Error posting blog:", getErrorMessage(error));
    return null;
  }
};

export const putHtmlBlog = async (
  id: string,
  data: HtmlBlogType
): Promise<HtmlBlogType | null> => {
  try {
    const response = await axios.put(`${BASE_URL}/htmlBlog/${id}`, data);
    return response.data;
  } catch (error: unknown) {
    console.error("Error updating blog:", getErrorMessage(error));
    return null;
  }
};

export const deleteHtmlBlog = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${BASE_URL}/htmlBlog/${id}`);
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
