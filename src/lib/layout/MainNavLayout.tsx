import {
  ReactNode,
  FC,
  useState,
  useEffect,
  Fragment,
  useMemo,
  useCallback,
} from 'react';
import { Layout, Menu } from 'antd';
import classes from './mainlayout.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '@src/config/routes';
import { excludedPaths, MenuItems } from '@src/lib/layout/data';
import { MenuInfo } from 'rc-menu/lib/interface';
import { motion } from 'framer-motion';
import logo from '@src/assets/images/logo.png';

const { Sider, Content } = Layout;

export const MainNavLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const navigateToRoute = useCallback(
    (to: MenuInfo) => {
      navigate(to.key, { replace: true });
    },
    [navigate],
  );

  useEffect(() => {
    if (excludedPaths.includes(location.pathname)) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [location]);

  const Comp = useMemo(() => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Layout style={{ width: '100%', height: '100vh' }}>
          <Sider trigger={null} collapsible breakpoint='lg'>
            <div className={classes.logo}>
              <img src={logo} alt='logo' />
            </div>
            <Menu
              theme='dark'
              mode='inline'
              selectedKeys={[location.pathname]}
              defaultSelectedKeys={[routes.dashboard]}
              onClick={navigateToRoute}
            >
              {MenuItems.map((item) => {
                return (
                  <Menu.Item key={item.path} icon={<item.Icon />}>
                    {item.title}
                  </Menu.Item>
                );
              })}
            </Menu>
          </Sider>
          <Content
            style={{
              margin: 0,
              padding: 0,
              minHeight: 280,
              background: 'white',
            }}
          >
            {children}
          </Content>
        </Layout>
      </motion.div>
    );
  }, [children, location.pathname]);

  if (!visible) {
    return <Fragment>{children}</Fragment>;
  }

  return Comp;
};
