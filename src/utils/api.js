const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

/* ---------- PUBLIC ---------- */

// GET /items (no auth)
export const getItems = () =>
  fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);

/* ---------- PROTECTED ---------- */

// POST /items
export const addItem = (item, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then(handleServerResponse);
};

// DELETE /items/:id
export const removeItem = (itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

//  PATCH /users/me (Edit profile)
export const updateUser = ({ name, avatar }, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);
};
