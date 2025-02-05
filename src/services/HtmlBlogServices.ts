"use client";
import axios from "axios";
import { HtmlBlogType, LoginDetails } from "./blog.types";
const BASE_URL = "https://my-own-block-api.onrender.com";

export const getHtmlBlog = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/htmlBlog`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching blogs:", error.message);
    return null;
  }
};

export const postHtmlBlog = async (data: HtmlBlogType) => {
  try {
    const response = await axios.post(`${BASE_URL}/htmlBlog`, data);
    return response.data;
  } catch (error: any) {
    console.error("Error posting blog:", error.message);
    return null;
  }
};

export const putHtmlBlog = async (id: string, data: HtmlBlogType) => {
  try {
    const response = await axios.put(`${BASE_URL}/htmlBlog/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error("Error updating blog:", error.message);
    return null;
  }
};

export const deleteHtmlBlog = async (id: string) => {
  try {
    await axios.delete(`${BASE_URL}/htmlBlog/${id}`);
    return true;
  } catch (error: any) {
    console.error("Error deleting blog:", error.message);
    return false;
  }
};

export const loginUser = async (data: LoginDetails) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, data);
    return response.data.token;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed.");
    }
    throw new Error("An unexpected error occurred.");
  }
};
