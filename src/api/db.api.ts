import { HTTPService } from '@src/services';

export class DBApi extends HTTPService {
  async checkConnection(): Promise<any> {
    const res = await this.post({
      endpoint: '/sql',
      data: 'INFO FOR NS;',
    });

    return res.data;
  }
}
