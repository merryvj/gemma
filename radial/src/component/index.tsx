import React from "react";
import "./style.css"

type MenuProps = {
    children: [];
}

type MenuItemProps = {
    title?: string;
    action?: () => void;
    index: number;
    angle: number;
}

export const MenuItem = (props: MenuItemProps) => {
    const {title, action, index, angle} = props;

    return (
        <li data-pie-item style={{"--pie-item-index": index, "--pie-item-angle": angle+"deg"} as React.CSSProperties} onClick={action}>
            <span data-pie-item-content>{title}</span>
        </li>
    )
}

const Menu = (props: MenuProps) => {
    const {children} = props;
    const angle = 360 / children.length;

    return (
        <ul data-pie-menu>
            {children?.map((child, index) => (
                React.cloneElement(child, {index, angle}) 
            ))}
        </ul>
    )
}



export default Menu;