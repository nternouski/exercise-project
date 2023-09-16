import { projectId } from '@services';
import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig = (method: 'get' | 'post', url: string, headers: {}, data?: any) => {
  const config: AxiosRequestConfig = { method, url, headers: { ...headers }, data };
  return config;
};

export const apiGet = (functionPath: string, headers: {} = {}) =>
  axios(axiosConfig('get', `http://127.0.0.1:5001/${projectId}/us-central1/api${functionPath}`, headers, {}));
export const apiPost = <T>(functionPath: string, headers: {} = {}, body: T) =>
  axios(axiosConfig('post', `http://127.0.0.1:5001/${projectId}/us-central1/api${functionPath}`, headers, body));

export const getIdToken = async (email: string, password: string) => {
  const url = `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=any_key_you_want`;
  const res = await axios(axiosConfig('post', url, {}, { email, password }));
  return res.data.idToken;
};

export const signUpAnonymous = async () => {
  const url = `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=any_key_you_want`;
  const res = await axios(axiosConfig('post', url, {}, {}));
  return res.data.idToken;
};
