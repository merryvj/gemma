import React from 'react';
import './style.css';

export interface MenuItemProps {
  label?: string;
  children?: React.ReactElement<HTMLElement>;
  action?: () => void;
  close?: () => void;
  index?: number;
  angle?: number;
  isActive?: boolean;
  length?: number;
  offset?: number;
  backgroundColor?: string;
  activeColor?: string;
}

const MenuItem = (props: MenuItemProps) => {
  const {
    children,
    label,
    action,
    close,
    index,
    isActive,
    angle,
    length,
    offset,
    backgroundColor,
    activeColor
  } = props;

  return (
    <li
      data-pie-item
      data-pie-item-index={index}
      data-pie-item-active={isActive}
      style={
        {
          '--pie-item-index': index,
          '--pie-item-angle': angle + 'deg',
          '--pie-item-length': length + 'px',
          '--pie-item-offset': offset + 'px',
          '--bg-color': backgroundColor,
          '--active-color': activeColor
        } as React.CSSProperties
      }
      role="menuitem"
      aria-label={label}
      onMouseEnter={action}
      onMouseUp={close}
      onClick={close}
      tabIndex={index !== undefined ? index + 1 : undefined}
    >
      <div data-pie-item-content>{children}</div>
    </li>
  );
};

export default MenuItem;
