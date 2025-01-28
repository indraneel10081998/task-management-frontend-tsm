import axios from "axios";
import store from "../app/store"
import { logout } from '../app/slices/loginSlice';
import { baseURL } from "../../baseURL";

const api = axios.create({
  baseURL: baseURL,
});


api.interceptors.request.use(
  async (config) => {
    const token = store?.getState()?.login?.user?.token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


const get = async (url, headers = {}) => {
  try {
    const response = await api.get(url, {
      headers: {
        ...headers,
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    console.log(error);
    
    return { data: null, error: error.response.data.error };
  }
};

const post = async (url, data, headers = {}) => {
  try {
    const config = {
      headers: {
        ...headers,
      },
    };

    let postData = data;

    if (data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else if (typeof data === "object") {
      postData = JSON.stringify(data);
      config.headers["Content-Type"] = "application/json";
    }

    const response = await api.post(url, postData, config);

    return { data: response.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.error || error.response?.data.errors,
    };
  }
};

const put = async (url, data, headers = {}) => {
  try {
    const response = await api.put(url, data, {
      headers: {
        ...headers,
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.error || error.response?.data.errors,
    };
  }
};

const remove = async (url, headers = {}) => {
  try {
    const response = await api.delete(url, {
      headers: {
        ...headers,
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response.data.error };
  }
};

const patch = async (url, data = "", headers = {}) => {
  try {
    const response = await api.patch(url, data, {
      headers: {
        ...headers,
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response.data.error || error.response?.data.errors,
    };
  }
};

export { get, post, put, remove, patch };
