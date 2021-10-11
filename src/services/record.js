import http from './http';

export const recordService = {
    add,
    getById,
    getAll,
    update,
    delete: _delete
};


async function add(record) {
    const { data } = await http.post(`/api/records`, record);

    return data;
}

async function getById(id) {
    const { data } = await http.get(`/api/records/${id}`);

    return data;
}

async function getAll() {
    const { data } = await http.get('/api/records');

    return data;
}

async function update(id, data) {
    return await http.put(`/api/records/${id}`, data);
}

async function _delete(id) {
    await http.delete(`/api/records/${id}`);
}
