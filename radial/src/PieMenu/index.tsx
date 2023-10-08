import React, {useState} from "react";
import "./style.css"

interface MenuProps {
    isOpen: boolean;
    children: React.ReactElement<MenuItemProps>[];
    position?: Position;
    kind?: "wheel" | "bubble";
}

type Position = {
    x: number;
    y: number;
}

interface MenuItemProps {
    label?: string;
    children?: React.ReactElement<HTMLElement>;
    action?: () => void;
    index: number;
    angle?: number;
    isActive?: boolean;
}

export const MenuItem = (props: MenuItemProps) => {
    const {children, label, action, index, angle, isActive} = props;
    
    return (
        <li data-pie-item data-pie-item-index={index} data-pie-item-active={isActive} style={{"--pie-item-index": index, "--pie-item-angle": angle+"deg"} as React.CSSProperties}
        role="menuitem" aria-label={label}
        onMouseUp={action} onClick={action}
        tabIndex={index + 1}
        >
            <div data-pie-item-content>{children}</div>
        </li>
    )
}

const Menu = (props: MenuProps) => {
    const {isOpen, children, position, kind} = props;
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
            style={{ "--pie-x": position?.x + "px", "--pie-y": position?.y + "px" }as React.CSSProperties}
            >
                <div data-pie-label>
                    {activeItem !== null && children[activeItem]?.props.label}
                </div>
                <ul onMouseMove={(e) => handleSetActive(e)} role="menu" aria-label="radial menu">
                {children?.map((child, index) => ( 
                    React.cloneElement(child, {index, angle, isActive: index === activeItem}) 
                ))}
                </ul>
            </div>
        )}
        </>
        
    )
}



export default Menu;