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
