import type React from "react";

type Props = {
    id?: string;
    mixed?: boolean;
    style?: React.CSSProperties;
    className?: string;
    checked: boolean;
    onToggle?: () => void;
}

const CheckboxComponent = ({id, mixed, style, className, checked, onToggle}: Props) => {

    return (                            
            <div
                id={id}
                style={style}
                className={`checkbox ${checked ? "checked" : ``} ${mixed ? "mixed" : ""} ${className ?? ""}`}
                role="checkbox"
                aria-checked={mixed 
                    ? "mixed"       
                    : checked
                }
                tabIndex={0}
                onClick={() => {
                    if(onToggle)
                        onToggle();
                }} 
                onKeyDown={(e) => {
                    if(onToggle) {
                        if(e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onToggle();
                        };
                    }
                }}
            >
            </div>
        );
}

export default CheckboxComponent;