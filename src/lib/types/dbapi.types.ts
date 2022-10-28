export interface CheckDBResponse {
  result: {
    db: Record<any, any>;
    nl: Record<any, any>;
    nt: Record<any, any>;
  };
  status: 'OK';
  time: string;
}
