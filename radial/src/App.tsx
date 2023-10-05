import { useState } from 'react'
import './App.css'
import Menu, { MenuItem } from './component'

function App() {

  
  const handleAction = () => {
    console.log('pressed')
  }

  return (
    <>
      <Menu>
        <MenuItem title="hello" action={handleAction}/>
        <MenuItem title="testing" action={handleAction}/>
        <MenuItem title="whoop" action={handleAction}/>
        <MenuItem title="scoop" action={handleAction}/>
        <MenuItem title="whoop" action={handleAction}/>
        <MenuItem title="hello" action={handleAction}/>
      </Menu>
    </>
  )
}

export default App
