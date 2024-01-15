import axios from "./axios";

export const login = async (params) => {
  const { data } = await axios.post("/api/login/", { ...params });

  return data;
};

export const signup = async (params) => {
  const { data } = await axios.post("/api/register/", { ...params });

  return data;
};

export const getAllProducts = async (token) => {
  const { data } = await axios.get("/api/products/", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return data;
};
