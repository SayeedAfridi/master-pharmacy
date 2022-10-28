import { CheckDBResponse } from '@src/lib/types/dbapi.types';
import { HTTPService } from '@src/services';
import { AxiosInstance } from 'axios';

export class DBApi extends HTTPService {
  constructor(instance: AxiosInstance) {
    super(instance);
  }
  async checkConnection(): Promise<CheckDBResponse> {
    const res = await this.post({
      endpoint: '/sql',
      data: 'INFO FOR NS;',
    });
    return res.data[0] as CheckDBResponse;
  }
}
