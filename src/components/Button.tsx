import React, { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export const Button = ({
  isOutlined = false,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button {...props} className={`button ${isOutlined ? 'outlined' : ''}`} />
  );
};
