import { BASE_URL } from "../utils/constants";

const headers = {
  "Content-Type": "application/json",
};

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const request = (url, options) => {
  return fetch(url, options).then(handleServerResponse);
};

/* ---------- PUBLIC ---------- */
export const getItems = () => {
  return request(`${BASE_URL}/items`, {
    headers,
  });
};

/* ---------- PROTECTED ---------- */
export const addItem = (item, token) =>
  request(`${BASE_URL}/items`, {
    method: "POST",
    headers: { ...headers, authorization: `Bearer ${token}` },
    body: JSON.stringify(item),
  });

export const removeItem = (itemId, token) =>
  request(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
    headers: { ...headers, authorization: `Bearer ${token}` },
  });

export const updateUser = ({ name, avatar }, token) =>
  request(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: { ...headers, authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, avatar }),
  });

/* ---------- LIKES ---------- */
export const addCardLike = (itemId, token) =>
  request(`${BASE_URL}/items/${itemId}/likes`, {
    method: "PUT",
    headers: { ...headers, authorization: `Bearer ${token}` },
  });

export const removeCardLike = (itemId, token) =>
  request(`${BASE_URL}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: { ...headers, authorization: `Bearer ${token}` },
  });
