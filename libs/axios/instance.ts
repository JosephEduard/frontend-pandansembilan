import type { Session } from "next-auth";

import axios from "axios";
import { getSession } from "next-auth/react";

import environment from "@/config/environment";

interface CustomSession extends Session {
  accessToken?: string;
}

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  async (request) => {
    const session = (await getSession()) as CustomSession | null;

    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return request;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
