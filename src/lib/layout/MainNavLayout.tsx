import { ReactNode, FC, useState, useEffect, Fragment, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { excludedPaths } from '@src/lib/layout/data';
import { motion } from 'framer-motion';

export const MainNavLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [visible, setVisible] = useState<boolean>(false);
  // const navigate = useNavigate();

  // const navigateToRoute = useCallback(
  //   (to: MenuInfo) => {
  //     navigate(to.key, { replace: true });
  //   },
  //   [navigate],
  // );

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
        {children}
      </motion.div>
    );
  }, [children, location.pathname]);

  if (!visible) {
    return <Fragment>{children}</Fragment>;
  }

  return Comp;
};
