import React, {useState} from "react";
import "./style.css"

interface MenuProps {
    isOpen: boolean;
    children: React.ReactElement<MenuItemProps>[];
    position?: Position;
    kind?: "wheel" | "bubble";
    outerRadius?: number;
    innerRadius?: number;
}

type Position = {
    x: number;
    y: number;
}

interface MenuItemProps {
    label?: string;
    children?: React.ReactElement<HTMLElement>;
    action?: () => void;
    close?: () => void;
    index?: number;
    angle?: number;
    isActive?: boolean;
    offset?: number;
}



export const MenuItem = (props: MenuItemProps) => {
    const {children, label, action, close, index, isActive, angle, offset} = props;

    return (
        <li data-pie-item data-pie-item-index={index} data-pie-item-active={isActive} style={{"--pie-item-index": index, "--pie-item-angle": angle+"deg"} as React.CSSProperties}
        role="menuitem" aria-label={label}
        onMouseEnter={action} onMouseUp={close} onClick={close}
        tabIndex={index + 1}
        >
            <div data-pie-item-content style={{"--offset": offset + "px"} as React.CSSProperties}>{children}</div>
        </li>
    )
}

const Menu = (props: MenuProps) => {
    const {isOpen = false, children, position, kind = "wheel", outerRadius = 300, innerRadius = 100} = props;
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
        <>
        {isOpen && (
            <div data-pie-menu
            data-pie-kind={kind}
            style={{ "--pie-x": position?.x + "px", "--pie-y": position?.y + "px", "--radius-outer": outerRadius + "px"}as React.CSSProperties}
            >
                <div data-pie-label style={{"--radius-inner": innerRadius + "px"} as React.CSSProperties}>
                    {activeItem !== null && children[activeItem]?.props.label}
                </div>
                <ul onMouseMove={(e) => handleSetActive(e)} role="menu" aria-label="radial menu">
                {children?.map((child, index) => ( 
                    React.cloneElement(child, {index, angle, isActive: index === activeItem, offset: (outerRadius - innerRadius)/2}) 
                ))}
                </ul>
            </div>
        )}
        </>
    )
}



export default Menu;