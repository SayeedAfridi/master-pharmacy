import { FC, Fragment } from 'react';
import Lottie from 'lottie-react';
import transferAnimation from '@src/assets/animations/transfer-files.json';

export const Checking: FC = () => {
  return (
    <Fragment>
      <Lottie
        style={{ height: '600px' }}
        width={400}
        animationData={transferAnimation}
      />
      <p className='text-center text-lg'>Checking Database</p>
    </Fragment>
  );
};
