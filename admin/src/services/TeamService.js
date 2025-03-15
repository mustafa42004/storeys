import { API_URL } from "../util/API_URL";
import axios from "axios";

const create = async (formData) => {
  const response = await axios.post(`${API_URL}/teams`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

const fetch = async () => {
  const response = await axios.get(`${API_URL}/teams`);
  return response.data;
};

const update = async (dataModel) => {
  const response = await axios.put(
    `${API_URL}/teams/${dataModel?.id}`,
    dataModel?.formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};

const deleteMember = async (id) => {
  const response = await axios.delete(`${API_URL}/teams/${id}`);
  return response.data;
};

export { create, update, deleteMember, fetch };
