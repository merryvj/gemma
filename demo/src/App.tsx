import React, { useState } from 'react';
import './App.css';
import { Menu, MenuItem } from 'gemma-menu';

const Icon = ({ color }: { color: string }) => {
  return (
    // <svg viewBox='0 0 32 32'>
    //   <circle cx="16" cy="16" r="14" stroke="white" strokeWidth={3} fill={color} ></circle>
    // </svg>
    <div
      className="icon"
      style={{
        width: '32px',
        height: '32px',
        backgroundColor: color,
        borderRadius: '100%',
        border: 'solid 3px white',
        boxShadow: '0 0 3px 0px rgba(0, 0, 0, 0.1)'
      }}
    ></div>
  );
};
function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState<string>('#fafafa');

  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showMenu) {
      const { clientX, clientY } = e;
      setClickPosition({ x: clientX, y: clientY });
      setShowMenu(true);
    }
  };

  const handleAction = (color: string) => {
    setActive(color);
  };

  const handleClose = () => {
    setShowMenu(false);
  };

  const colors = [
    {
      label: 'plum',
      code: '#C099A0'
    },
    {
      label: 'ash',
      code: '#C0C6C9'
    },
    {
      label: 'green',
      code: '#BED3CA'
    },
    {
      label: 'walnut',
      code: '#A58F86'
    },
    {
      label: 'indigo',
      code: '#4f455c'
    },
    {
      label: 'peach',
      code: '#e4d2d8'
    },
    {
      label: 'plum',
      code: '#C099A0'
    },
    {
      label: 'ash',
      code: '#C0C6C9'
    },
    {
      label: 'green',
      code: '#BED3CA'
    },
    {
      label: 'walnut',
      code: '#A58F86'
    },
    {
      label: 'indigo',
      code: '#4f455c'
    },
    {
      label: 'peach',
      code: '#e4d2d8'
    },
    {
      label: 'plum',
      code: '#C099A0'
    },
    {
      label: 'ash',
      code: '#C0C6C9'
    },
    {
      label: 'green',
      code: '#BED3CA'
    },
    {
      label: 'walnut',
      code: '#A58F86'
    },
    {
      label: 'indigo',
      code: '#4f455c'
    },
    {
      label: 'peach',
      code: '#e4d2d8'
    },
    {
      label: 'plum',
      code: '#C099A0'
    },
    {
      label: 'ash',
      code: '#C0C6C9'
    },
    {
      label: 'green',
      code: '#BED3CA'
    },
    {
      label: 'walnut',
      code: '#A58F86'
    },
    {
      label: 'indigo',
      code: '#4f455c'
    },
    {
      label: 'peach',
      code: '#e4d2d8'
    }
  ];

  return (
    <>
      <div className="content" onMouseDown={handleMenuClick}>
        <Menu
          isOpen={showMenu}
          position={clickPosition}
          kind="wheel"
          outerRadius={500}
          innerRadius={300}
        >
          {colors.map((color, index) => (
            <MenuItem
              key={index}
              activeColor={color.code}
              label={color.label}
              action={() => handleAction(color.code)}
              close={handleClose}
            >
              <Icon color={color.code} />
            </MenuItem>
          ))}
        </Menu>

        <div className="demo" style={{ backgroundColor: active }}></div>
      </div>
    </>
  );
}

export default App;
