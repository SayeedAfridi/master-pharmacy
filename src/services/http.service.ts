import store from '@src/lib/redux/store';

export interface Request {
  endpoint: string;
}

export interface PostRequest<T> {
  endpoint: string;
  data: T;
}

type Response<D = any> = {
  url: string;
  headers: Headers;
  data: D;
};

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class HTTPService {
  private async constructFetch(endpoint: string, method: Method, data?: any) {
    const { app } = store.getState();
    const { url, user, pass, db } = app.databaseCred;
    const d = await fetch(url + endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`${user}:${pass}`),
        NS: db,
        DB: db,
      },
      body: data,
    });
    const res = await d.json();
    return {
      url: d.url,
      headers: d.headers,
      data: res,
    };
  }

  protected async get<R = any>({ endpoint }: Request): Promise<Response<R>> {
    return this.constructFetch(endpoint, 'GET');
  }

  protected async post<T = any, R = any>({
    endpoint,
    data,
  }: PostRequest<T>): Promise<Response<R>> {
    return this.constructFetch(endpoint, 'POST', data);
  }

  protected async delete<R = any>({ endpoint }: Request): Promise<Response<R>> {
    return this.constructFetch(endpoint, 'DELETE');
  }

  protected async put<T = any, R = any>({
    endpoint,
    data,
  }: PostRequest<T>): Promise<Response<R>> {
    return this.constructFetch(endpoint, 'PUT', data);
  }

  protected async patch<T = any, R = any>({
    endpoint,
    data,
  }: PostRequest<T>): Promise<Response<R>> {
    return this.constructFetch(endpoint, 'PATCH', data);
  }
}
