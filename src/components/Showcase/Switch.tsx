import React from "react";
import { Switch as SwitchUI } from "../ui/Switch";
interface SwitchProps {
    title?:string;
    className?:string;
}
const Switch:React.FC<SwitchProps> = ({title,className}) => {
    return (
        <div className="flex items center justify-between w-full">
            <SwitchUI className={className}/>
            <h3 className=" text-sm">
                {title}
                </h3>
        </div>
    );
}

export default Switch;