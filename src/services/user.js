import http from './http';

export const userService = {
    login,
    register,
    add,
    getById,
    getAll,
    fetchOnlyUsers,
    update,
    delete: _delete
}

async function login(username, password) {
    const { data } = await http.post('/authenticate', { username, password });
    return data;
}

async function register(user) {
    const { data } = await http.post('/register', user);
    return data;
}

async function add(user) {
    const { data } = await http.post('/api/users', user);

    return data;
}

async function getById(id) {
    const { data } = await http.get(`/api/users/${id}`);

    return data;
}

async function getAll() {
    const { data } = await http.get('/api/users');
    return data;
}

async function fetchOnlyUsers() {
    const { data } = await http.get('/api/users?fetchOnlyUsers=true');
    return data;
}

function update(id, data) {
    return http.put(`/api/users/${id}`, data);
}

function _delete(id) {
    return http.delete(`/api/users/${id}`);
}
