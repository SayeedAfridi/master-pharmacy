import store from '@src/lib/redux/store';
import { DBApi } from '@src/api/db.api';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class _Api {
  private instance: AxiosInstance;
  db: DBApi;

  constructor() {
    this.instance = axios.create();
    this.instance.interceptors.request.use(this.requestInterceptor);
    this.db = new DBApi(this.instance);
  }

  private requestInterceptor(config: AxiosRequestConfig) {
    const { app } = store.getState();
    const { url, user, pass, db } = app.databaseCred;
    config.baseURL = url;
    config.headers = {
      ...config.headers,
      Accept: 'application/json',
      Authorization: 'Basic ' + btoa(`${user}:${pass}`),
      NS: db,
      DB: db,
    };

    return config;
  }
}

export const api = new _Api();
