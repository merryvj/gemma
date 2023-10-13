import React, { useState } from 'react';
import './style.css';
import { MenuProps, MenuItemProps } from './types';
export const MenuItem = (props: MenuItemProps) => {
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

export const Menu = (props: MenuProps) => {
  const {
    isOpen = false,
    children,
    position,
    kind = 'wheel',
    outerRadius = 300,
    innerRadius = 100,
    backgroundColor,
    activeColor
  } = props;
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const angle = 360 / children.length;

  const handleSetActive = (
    e: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    if (target.hasAttribute('data-pie-item')) {
      const index = parseInt(target.getAttribute('data-pie-item-index') || '0');
      setActiveItem(index);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          data-pie-menu
          data-pie-kind={kind}
          style={
            {
              '--pie-x': position?.x + 'px',
              '--pie-y': position?.y + 'px',
              '--radius-outer': outerRadius + 'px'
            } as React.CSSProperties
          }
        >
          <div
            data-pie-label
            style={
              { '--radius-inner': innerRadius + 'px' } as React.CSSProperties
            }
          >
            {activeItem !== null && children[activeItem]?.props.label}
          </div>
          <ul
            onMouseMove={(e) => handleSetActive(e)}
            role="menu"
            aria-label="radial menu"
          >
            {children?.map((child, index) =>
              React.cloneElement(child, {
                index,
                angle,
                isActive: index === activeItem,
                length: (outerRadius - innerRadius) / 2,
                offset: innerRadius / 2,
                backgroundColor:
                  backgroundColor || child.props.backgroundColor || '#fafafa',
                activeColor: activeColor || child.props.activeColor || '#efefef'
              })
            )}
          </ul>
        </div>
      )}
    </>
  );
};