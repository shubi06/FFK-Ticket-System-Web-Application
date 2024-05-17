import axios from 'axios';

const API_URL = 'http://localhost:5178/api/Users';

export const getUsers = async () => {
    return await axios.get(API_URL);
};

export const getUserById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const createUser = async (user) => {
    return await axios.post(API_URL, user);
};

export const updateUser = async (id, user) => {
    return await axios.put(`${API_URL}/${id}`, user);
};

export const deleteUser = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};

export const updateUserRole = async (id, role) => {
    return await axios.put(`${API_URL}/${id}/role`, { role });
};
