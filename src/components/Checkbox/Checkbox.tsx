import React, { useEffect, useState } from 'react';
import { SpaceProps } from 'styled-system';

import { CheckboxContainer, CheckboxInput } from './Checkbox.styles';
import type { CheckboxProps } from './Checkbox.types';

const Icon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="16" height="16" rx="4" fill="#D8D8D8" />
    <mask
      id="mask0_0_3319"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="16"
      height="16"
    >
      <rect width="16" height="16" rx="4" fill="white" />
    </mask>
    <g mask="url(#mask0_0_3319)">
      <rect width="16" height="16" fill="#F8FAFB" />
    </g>
    <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="#B3C0CE" />
  </svg>
);

const CheckedIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="16" height="16" rx="4" fill="#D8D8D8" />
    <mask
      id="mask0_0_3376"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="16"
      height="16"
    >
      <rect width="16" height="16" rx="4" fill="white" />
    </mask>
    <g mask="url(#mask0_0_3376)">
      <rect width="16" height="16" fill="currentColor" />
    </g>
    <g filter="url(#filter0_d_0_3376)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7917 4.2358C13.0798 4.53914 13.0675 5.01865 12.7642 5.30682L6.7036 11.0644C6.40574 11.3474 5.93663 11.3413 5.64613 11.0508L3.22189 8.6266C2.92604 8.33074 2.92604 7.85107 3.22189 7.55522C3.51774 7.25937 3.99741 7.25937 4.29326 7.55522L6.19538 9.45734L11.7206 4.20834C12.024 3.92016 12.5035 3.93246 12.7917 4.2358Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_0_3376"
        x="1"
        y="3"
        width="14"
        height="11.2727"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.266667 0 0 0 0 0.337255 0 0 0 0 0.423529 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_0_3376"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_0_3376"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

const Checkbox = ({
  checked: propChecked,
  onChange,
  disabled = false,
  ...props
}: CheckboxProps & SpaceProps) => {
  const [checked, setChecked] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    } else {
      setChecked(e.target.checked);
    }
  };

  useEffect(() => {
    setChecked(propChecked);
  }, [propChecked]);

  return (
    <CheckboxContainer
      color={disabled ? 'gray' : 'brandPrimary'}
      disabled={disabled}
      mb={2}
      {...props}
    >
      <CheckboxInput
        type="checkbox"
        checked={checked}
        onChange={handleInputChange}
        disabled={disabled}
      />
      {checked ? <CheckedIcon /> : <Icon />}
    </CheckboxContainer>
  );
};

export default Checkbox;
