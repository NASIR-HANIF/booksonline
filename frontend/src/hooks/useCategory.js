import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = process.env.NODE_ENV === "production"
? "https://booksonline-server.vercel.app"
: "http://localhost:5000";


export const host = `${API_URL}`;

const API = axios.create({
  baseURL: host,
});

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get cat
  const getCategories = async () => {
    try {
      const { data } = await API.get("/api/v1/category/get-category");
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
