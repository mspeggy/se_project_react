const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

export const handleServerResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

/* ---------- PUBLIC ---------- */
export const getItems = () =>
  fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);

/* ---------- PROTECTED ---------- */
export const addItem = (item, token) =>
  fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { ...headers, authorization: `Bearer ${token}` },
    body: JSON.stringify(item),
  }).then(handleServerResponse);

export const removeItem = (itemId, token) =>
  fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: { ...headers, authorization: `Bearer ${token}` },
  }).then(handleServerResponse);

export const updateUser = ({ name, avatar }, token) =>
  fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: { ...headers, authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);

/* ---------- LIKES ---------- */
export const addCardLike = (itemId, token) =>
  fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: { ...headers, authorization: `Bearer ${token}` },
  }).then(handleServerResponse);

export const removeCardLike = (itemId, token) =>
  fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: { ...headers, authorization: `Bearer ${token}` },
  }).then(handleServerResponse);