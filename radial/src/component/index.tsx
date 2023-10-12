import React, {useState} from "react";
import "./style.css"

interface MenuProps {
    isOpen: boolean;
    children: React.ReactElement<MenuItemProps>[];
    position?: Position;
    kind?: "wheel" | "bubble";
    outerRadius?: number;
    innerRadius?: number;
    backgroundColor?: string;
    activeColor?: string;
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
    length?: number;
    offset?: number;
    backgroundColor?: string;
    activeColor?: string;
}


export const MenuItem = (props: MenuItemProps) => {
    const {children, label, action, close, index, isActive, angle, length, offset, backgroundColor, activeColor} = props;
    const angleInRadians = (angle || 0)/2 * (Math.PI / 180);
    const offsetX = Math.sin(angleInRadians) * (offset ?? 0);
    const offsetY = Math.cos(angleInRadians) * (offset ?? 0);

    return (
        <li data-pie-item data-pie-item-index={index} data-pie-item-active={isActive} style={{"--pie-item-index": index, "--pie-item-angle": angle+"deg", "--pie-item-length": length + "px", "--pie-item-offset-x": offsetX + "px", "--pie-item-offset-y": offsetY + "px" , backgroundColor: backgroundColor, "--active-color": activeColor} as React.CSSProperties}
        role="menuitem" aria-label={label}
        onMouseEnter={action} onMouseUp={close} onClick={close}
        tabIndex={index + 1}
        >
            <div data-pie-item-content>{children}</div>
        </li>
    )
}

const Menu = (props: MenuProps) => {
    const {isOpen = false, children, position, kind = "wheel", outerRadius = 300, innerRadius = 100, backgroundColor, activeColor} = props;
    const [activeItem, setActiveItem] = useState<number | null>(null);
    const angle = 360 / children.length;
    
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
                    React.cloneElement(child, {
                        index,
                        angle,
                        isActive: index === activeItem,
                        length: (outerRadius - innerRadius) / 2,
                        offset: innerRadius/2,
                        backgroundColor: backgroundColor || child.props.backgroundColor || "#efefef",
                        activeColor: activeColor || child.props.activeColor || "#d6d6d6"
                    })
                ))}
                </ul>
            </div>
        )}
        </>
    )
}



export default Menu;