import React, {useState} from "react";
import "./style.css"

interface MenuProps {
    children: React.ReactElement<MenuItemProps>[];
    position?: Position;
}

type Position = {
    x: number;
    y: number;
}

interface MenuItemProps {
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
    const {children, position} = props;
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
        <div data-pie-menu
        style={{ "--pie-x": position?.x + "px", "--pie-y": position?.y + "px" }as React.CSSProperties}
        >
            <div data-pie-label>
                {activeItem !== null && children[activeItem]?.props.title}
            </div>
            <ul onMouseMove={(e) => handleSetActive(e)}>
            {children?.map((child, index) => (
                React.cloneElement(child, {index, angle, isActive: index === activeItem}) 
            ))}
            </ul>
        </div>
        
    )
}



export default Menu;