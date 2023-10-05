import React, {useState} from "react";
import "./style.css"

type MenuProps = {
    children: React.ReactElement<MenuItemProps>[];
}

type MenuItemProps = {
    title?: string;
    action?: () => void;
    index?: number;
    angle?: number;
    isActive?: boolean;
}

export const MenuItem = (props: MenuItemProps) => {
    const {title, action, index, angle, isActive} = props;

    return (
        <li data-pie-item data-pie-item-index={index} data-pie-item-active={isActive} style={{"--pie-item-index": index, "--pie-item-angle": angle+"deg"} as React.CSSProperties}
        onClick={action}
        >
            <span data-pie-item-content>{title}</span>
        </li>
    )
}

const Menu = (props: MenuProps) => {
    const {children} = props;
    const angle = 360 / children.length;
    const [activeItem, setActiveItem] = useState<number | null>(null);

    const handleSetActive = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        const target = e.target as HTMLElement;
        if (target.hasAttribute("data-pie-item")) {
            const index = parseInt(target.getAttribute("data-pie-item-index") || "0");
            setActiveItem(index);
        }
    }

    return (
        <ul data-pie-menu onMouseMove={(e) => handleSetActive(e)}>
            {children?.map((child, index) => (
                React.cloneElement(child, {index, angle, isActive: index === activeItem}) 
            ))}
        </ul>
    )
}



export default Menu;