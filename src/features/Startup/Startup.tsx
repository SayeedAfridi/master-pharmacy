import { FC, useEffect, useState } from 'react';

import { api } from '@src/api';
import { Visibility } from '@src/components/Visibility';
import { useNavigate } from 'react-router-dom';
import { routes } from '@src/config/routes';
import { DbConnectForm } from '@src/features/Startup/components/DbConnectForm';
import { Checking } from '@src/features/Startup/components/DbChecking';

const timeOut = 3 * 1000;

export const Startup: FC = () => {
  const [checkedDb, setCheckedDb] = useState<boolean>(false);
  const [dbError, setDbError] = useState<any>();
  const navigate = useNavigate();

  const checkDB = async () => {
    try {
      const res = await api.db.checkConnection();
      if (res.status !== 'OK') {
        setDbError(true);
        throw new Error('Status not ok');
      }
      setTimeout(() => {
        setCheckedDb(true);
      }, timeOut);
    } catch (error: any) {
      setTimeout(() => {
        setDbError(true);
      }, timeOut);
    }
  };

  useEffect(() => {
    if (checkedDb) {
      navigate(routes.dashboard, { replace: true });
    }
  }, [checkedDb]);

  useEffect(() => {
    checkDB();
  }, []);

  return (
    <div>
      <Visibility on={dbError}>
        <DbConnectForm onConnect={() => setCheckedDb(true)} />
      </Visibility>
      <Visibility on={!checkedDb && !dbError}>
        <Checking />
      </Visibility>
    </div>
  );
};
