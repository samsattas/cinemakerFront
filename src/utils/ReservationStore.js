import axios from "axios";

//In case of using another port, change the 8080 to the custom port.
const baseUrl = "http://localhost:8080/api/v1/reservations";

export const getAllReservations = async () => {
  const response = await axios.get(baseUrl);
  const data = await response.data;
  return data;
};

export const postReservation = async (payload) => {
  const response = await axios.post(baseUrl, payload);
  const data = await response.data;
  return data;
};

export const deleteReservation = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  const data = await response.data;
  return data;
};
