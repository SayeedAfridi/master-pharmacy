import { DBApi } from '@src/api/db.api';

class _Api {
  db: DBApi;

  constructor() {
    this.db = new DBApi();
  }
}

export const api = new _Api();
