const API = 'http://localhost:4000';

export async function login(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function registerUser(name, email, password) {
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return res.json();
}

export async function listIncidents(query = '') {
  const res = await fetch(`${API}/incidents?q=${query}`);
  return res.json();
}

export async function createIncident(data) {
  const res = await fetch(`${API}/incidents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateIncident(id, data) {
  const res = await fetch(`${API}/incidents/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteIncident(id) {
  await fetch(`${API}/incidents/${id}`, { method: 'DELETE' });
}
