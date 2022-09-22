import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import classes from './startup.module.css';
import transferAnimation from '@src/assets/animations/transfer-files.json';
import {
  Typography,
  Layout,
  Row,
  Col,
  Form,
  Card,
  Input,
  Button,
  notification,
} from 'antd';
import { api } from '@src/api';
import { Visibility } from '@src/components/Visibility';
import errAnimation from '@src/assets/animations/no-internet.json';
import { useDispatch, useSelector } from 'react-redux';
import { selectDbCred } from '@src/lib/redux/app/app.selsectors';
import { appActions } from '@src/lib/redux/app/app.slice';
import { useNavigate } from 'react-router-dom';
import { routes } from '@src/config/routes';

const timeOut = 3 * 1000;

export const Startup: FC = () => {
  const [checkedDb, setCheckedDb] = useState<boolean>(false);
  const [dbError, setDbError] = useState<any>();
  const navigate = useNavigate();

  const checkDB = async () => {
    try {
      const res = await api.db.checkConnection();
      if (res[0].status !== 'OK') {
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
    <div className={classes.container}>
      <Visibility on={dbError}>
        <DbConnectForm onConnect={() => setCheckedDb(true)} />
      </Visibility>
      <Visibility on={!checkedDb && !dbError}>
        <Checking />
      </Visibility>
    </div>
  );
};

const { Content } = Layout;

interface DbConnectFormProps {
  onConnect?: () => void;
}

const DbConnectForm: FC<DbConnectFormProps> = ({ onConnect }) => {
  const dbCred = useSelector(selectDbCred);
  const url = new URL(dbCred.url);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = useCallback(
    async (d: typeof dbCred) => {
      dispatch(
        appActions.setDBCreds({ ...d, url: 'http://' + d.url + ':8000' }),
      );
      try {
        setLoading(true);
        const res = await api.db.checkConnection();
        notification.success({
          message: 'Database connected!',
        });
        if (res[0].status !== 'OK') {
          throw new Error('Status not ok');
        }
        setLoading(false);
        onConnect?.();
      } catch (error) {
        setLoading(false);
        notification.error({
          message: "Can't connect to database.",
        });
      }
    },
    [dispatch],
  );

  return (
    <Content style={{ width: '100%', padding: '3rem' }}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col style={{ textAlign: 'center' }} xs={24} md={10}>
          <Lottie style={{ height: '400px' }} animationData={errAnimation} />
          <Typography.Text style={{ marginBottom: '20px' }}>
            Database is not running or something went wrong. Please try again.
          </Typography.Text>
        </Col>
        <Col style={{ margin: '0px auto' }} xs={24} md={10}>
          <Card title='Database Credentials'>
            <Form
              initialValues={{ ...dbCred, url: url.hostname }}
              layout='vertical'
              form={form}
              onFinish={onFinish}
            >
              <Form.Item
                name='url'
                label='Database Url'
                rules={[{ required: true }]}
              >
                <Input addonBefore='http://' addonAfter='8000' />
              </Form.Item>
              <Form.Item
                name='db'
                label='Database Name'
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='user'
                label='Database User'
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='pass'
                label='Database Password'
                rules={[{ required: true }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button loading={loading} type='primary' htmlType='submit'>
                  Connect
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

const Checking: FC = () => {
  return (
    <Fragment>
      <Lottie
        style={{ height: '400px' }}
        width={400}
        animationData={transferAnimation}
      />
      <Typography.Text>Checking Database</Typography.Text>
    </Fragment>
  );
};
