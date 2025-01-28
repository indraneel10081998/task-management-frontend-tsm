import { get, post, put, remove } from "./api";

const getAll = async (data) => {    
  try {
    const page = data?.page || 1;
    const limit = data?.limit || 5;
    const search = data?.search || "";
    const response = await get(`/tasks?page=${page}&limit=${limit}&search=${search}`);
    return response;
  } catch (error) {
    throw error;
  }
};

const create = async (data) => {
    try {
        const response = await post(`/tasks/`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

const update = async (id, data) => {
    try {
        const response = await put(`/tasks/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

const removeTask = async (id) => {
    try {
        const response = await remove(`/tasks/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export default {
    getAll,
    create,
    update,
    removeTask
}