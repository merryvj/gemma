import React, { useState } from 'react';
import './style.css';
import { MenuItemProps } from './MenuItem';

export interface MenuProps {
  isOpen: boolean;
  children: React.ReactElement<MenuItemProps>[];
  position?: Position;
  kind?: 'wheel' | 'bubble';
  outerRadius?: number;
  innerRadius?: number;
  backgroundColor?: string;
  activeColor?: string;
}

type Position = {
  x: number;
  y: number;
};

const Menu = (props: MenuProps) => {
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

export default Menu;
