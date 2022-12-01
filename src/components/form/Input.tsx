import { forwardRef, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  touched?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, className, error, touched, ...props }, ref) => {
    const isError = error && touched;
    const borderColor = isError ? 'border-red-500' : 'border-purple-500';
    const ringColor = isError ? 'border-red-500' : 'border-purple-500';

    return (
      <div>
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-700'
        >
          {props.label}
        </label>
        <div className='mt-1 flex h-10'>
          <input
            ref={ref}
            name={name}
            className={
              className +
              `block w-full flex-1 border-[1px] ${borderColor} rounded px-1  focus:${borderColor} outline-none focus:${ringColor}`
            }
            {...props}
          />
        </div>
        <span className='text-xs text-red-500'>{error}</span>
      </div>
    );
  },
);
