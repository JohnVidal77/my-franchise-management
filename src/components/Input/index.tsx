import React, { InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
}

const Input: React.FC<IProps> = ({ name, placeholder, ...rest }: IProps) => {
  return (
    <input
      className="w-full border-white border-2 rounded mb-2 bg-transparent p-2 placeholder-white text-white duration-200 focus:outline-none focus:border-yellow-500"
      type="text"
      id={name}
      name={name}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default Input;
