import { FC, useCallback, useState } from 'react';
import Lottie from 'lottie-react';
import errAnimation from '@src/assets/animations/no-internet.json';
import { LinkIcon } from '@heroicons/react/24/outline';
import { Input } from '@src/components';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@src/lib/hooks';
import { selectDbCred } from '@src/lib/redux/app/app.selsectors';
import { appActions } from '@src/lib/redux/app/app.slice';
import { api } from '@src/api';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { DbValidationObject } from '@src/features/Startup/validations';

interface DbConnectFormProps {
  onConnect?: () => void;
}

export const DbConnectForm: FC<DbConnectFormProps> = ({ onConnect }) => {
  const dbCred = useAppSelector(selectDbCred);
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm<typeof dbCred>({
    resolver: zodResolver(DbValidationObject),
  });
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = useCallback(
    async (d: typeof dbCred) => {
      if (loading) return;
      try {
        setLoading(true);
        const res = await api.db.checkConnection();
        if (res.status !== 'OK') {
          throw new Error('Status not ok');
        }
        dispatch(
          appActions.setDBCreds({ ...d, url: 'http://' + d.url + ':8000' }),
        );
        toast.success('Database connected!');
        setLoading(false);
        onConnect?.();
      } catch (error) {
        setLoading(false);
        toast.error("Can't connect to database!");
      }
    },
    [dispatch, loading],
  );
  console.log(errors);
  return (
    <div className='grid grid-flow-col p-10 h-full'>
      <div className='col-span-9'>
        <Lottie style={{ height: '80vh' }} animationData={errAnimation} />
        <p className='text-center'>
          Database is not running or something went wrong. Please try again.
        </p>
      </div>
      <form onSubmit={handleSubmit(onFinish)} className='col-span-3 '>
        <div className='shadow rounded-md overflow-hidden pb-8'>
          <div className='p-4 bg-gray-100'>
            <p className='text-center text-lg font-bold'>
              Database Credentials
            </p>
          </div>
          <div className='mt-4 px-8'>
            <div>
              <label
                htmlFor='url'
                className='block text-sm font-medium text-gray-700'
              >
                Database URL
              </label>
              <div className='mt-1 flex h-10'>
                <span className='inline-flex items-center border border-r-0 rounded-l bg-gray-50 px-3 text-sm text-gray-500'>
                  http://
                </span>
                <input
                  type='text'
                  {...register('url')}
                  className='block w-full flex-1 rounded-none border outline-none focus:border-purple-500 focus:ring-purple-500 px-1'
                  placeholder='Ip address / URl'
                  defaultValue={new URL(dbCred.url).hostname}
                />
                <span className='inline-flex items-center border border-l-0 rounded-r bg-gray-50 px-3 text-sm text-gray-500'>
                  8000
                </span>
              </div>
            </div>
            <div className='mt-4' />
            <Input
              type='text'
              {...register('db')}
              placeholder='Database Name'
              label='Database Name'
              defaultValue={dbCred.db}
              error={errors.db?.message}
              touched={touchedFields.db}
            />
            <div className='mt-4' />
            <Input
              {...register('user')}
              type='text'
              placeholder='Database Username'
              label='Database Username'
              defaultValue={dbCred.user}
              error={errors.user?.message}
              touched={touchedFields.user}
            />
            <div className='mt-4' />
            <Input
              type='password'
              {...register('pass')}
              placeholder='Database Password'
              label='Database Password'
              defaultValue={dbCred.pass}
              error={errors.pass?.message}
              touched={touchedFields.pass}
            />
          </div>
          <div className='mt-8 flex justify-end px-8'>
            <button
              type='submit'
              className='px-4 py-2 text-white bg-purple-500 rounded'
            >
              <LinkIcon className='inline w-4 mr-2' />
              Connect
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
