# Gemma Menu

np
Gemma is a wheel/radial/pie menu component for React 🍭


https://github.com/merryvj/gemma/assets/41601131/3adda17a-59e7-4d8c-a5fd-d14d48cd9764



### Install

```
npm i gemma-menu
```

## Usage

Simple example:

```javascript
import React, {useState} from 'react'
import {Menu, MenuItem} from 'gemma-menu'

function MyComponent() {
   const [isOpen, setIsOpen] = useState(false)
   const [position, setPosition] = useState({ x: 0, y: 0 })

   const handleTriggerClick = () => {
      setPosition({ x: clientX, y: clientY })
      setIsOpen(true)
   }

   const handleItemAction = (event, index, data) => {
      console.log(`${data} clicked`)
      setIsOpen(false)
   }

  return (
    <div onClick={handleTriggerClick}>
      <Menu>
         <MenuItem label="Item 1" action={handleItemAction}>
            Item 1 {/*This can be a component e.g. an SVG icon */}
         </MenuItem>
         <MenuItem label="Item 1" action={handleItemAction}>
            Item 2
         </MenuItem>
         <MenuItem label="Item 1" action={handleItemAction}>
            Item 3
         </MenuItem>
      <Menu>
    </div>
  );
}
```

## API Reference

### Menu Props:

| Name              | Type    | Default | Description                                                                  |
| ----------------- | ------- | ------- | ---------------------------------------------------------------------------- |
| `isOpen`          | boolean | false   | whether menu is open or closed                                               |
| `kind`            | string  | 'wheel' | visual style of menu - wheel (background included) or bubble (no background) |
| `outerRadius`     | number  | 300     | width of entire menu in 'px'                                                 |
| `innerRadius`     | number  | 150     | width of an optional inner label in 'px' (use 0 for no inner label)          |
| `backgroundColor` | string  | #efefef | background color of the menu (can be overwritten by MenuItem)                |
| `activeColor`     | string  | #d6d6d6 | color of the selected menu item (can be overwritten by MenuItem)             |

### MenuItem Props

| Name              | Type     | Default | Description                                                                                                                                                                   |
| ----------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`           | string   | N/A     | Visual label associated with the menu item (displays in center of menu)                                                                                                       |
| `action`          | function | N/A     | Function called when the menu item is clicked. The function while recieve 3 parameters (the event object, the index of menu item, and its label data passed from props.label) |
| `backgroundColor` | string   | #efefef | background color of this menu item (inherited from Menu if not specified)                                                                                                     |
| `activeColor`     | string   | #d6d6d6 | background color of this menu item when selected (inherited from Menu if not specified)                                                                                       |
