import { FC, Fragment } from 'react';
import Lottie from 'lottie-react';
import classes from './startup.module.css';
import transferAnimation from '@src/assets/animations/transfer-files.json';
import { Typography } from 'antd';
// import { api } from '@src/api';

export const Startup: FC = () => {
  // const [checkingDb, setCheckingDb] = useState<boolean>(false);
  // const [dbError, setDbError] = useState<any>();

  // const checkDB = async () => {
  //   try {
  //     const res = await api.db.checkConnection();
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   checkDB();
  // }, []);

  return (
    <div className={classes.container}>
      <Checking />
    </div>
  );
};

const Checking: FC = () => {
  return (
    <Fragment>
      <Lottie animationData={transferAnimation} />
      <Typography.Text>Checking Database</Typography.Text>
    </Fragment>
  );
};
