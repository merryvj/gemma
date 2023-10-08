import React, { useState } from 'react';
import './App.css';
import Menu, { MenuItem } from './PieMenu';

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showMenu) {
      const { clientX, clientY } = e;
      setClickPosition({ x: clientX, y: clientY });
      setShowMenu(true);
    }
  };

  const handleAction = () => {
    console.log('pressed');
    setShowMenu(false);
  };

  return (
    <>
      <div className='content' onMouseDown={handleMenuClick}>
        <Menu isOpen={showMenu} position={clickPosition} kind="wheel">
            <MenuItem label="Test" action={handleAction}>
              <span>:D</span>
            </MenuItem>
            <MenuItem label="Ho" action={handleAction}>
              <span>:D</span>
            </MenuItem>
            <MenuItem label="He" action={handleAction}>
              <span>:D</span>
            </MenuItem>
        </Menu>
      </div>
    </>
  );
}

export default App;