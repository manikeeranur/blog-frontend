"use client";
import axios from "axios";

const BASE_URL = "https://my-own-block-api.onrender.com/htmlBlog";

export const getHtmlBlog = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    return null;
  }
};

export const postHtmlBlog = async (data) => {
  try {
    const response = await axios.post(BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error posting blog:", error.message);
    return null;
  }
};

export const putHtmlBlog = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error.message);
    return null;
  }
};

export const deleteHtmlBlog = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting blog:", error.message);
    return false;
  }
};
