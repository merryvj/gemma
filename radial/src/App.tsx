import React, { useState } from 'react';
import './App.css';
import Menu, { MenuItem } from './component';

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
      <div className='content' onClick={handleMenuClick}>
        {showMenu && (
          <Menu position={clickPosition}>
            <MenuItem title="hello" action={handleAction} />
            <MenuItem title="whoop" action={handleAction} />
            <MenuItem title="scoop" action={handleAction} />
            <MenuItem title="whoop" action={handleAction} />
            <MenuItem title="scoop" action={handleAction} />
            <MenuItem title="whoop" action={handleAction} />
          </Menu>
        )}
      </div>
    </>
  );
}

export default App;