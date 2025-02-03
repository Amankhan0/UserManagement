import React from "react";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { errorInputClass, normalInputClass } from "../../../constants/constants";
import { setApiJson } from "../../../features/apireducer";
import cn from "../../../utils/class-names";

interface props {
    options: string[]; // imp
    name: string // imp
    title?: string;
    className?: string;
    errorLabelClass?: string;
    titleClass?: string;
    iconClass?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    id?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    error?: boolean;
    errorMsg?: string;
    
}

const CustomSelect = ({ title, className, onChange, name, titleClass, options, errorLabelClass, placeholder,disabled,errorMsg,error }: props) => {

    const ApiReducer = useSelector((state: RootState) => state.ApiReducer);
    const dispatch = useDispatch()

    const onTextChange = (value: string) => {
        const updatedJson = {
            ...ApiReducer?.apiJson,
            [name]: value,
        };
        dispatch(setApiJson(updatedJson))
    }

    return (
        <div>
            <p className={cn(`rizzui-input-label block text-sm mb-1.5 font-medium ${titleClass}`)}>{title}</p>
            <select disabled={disabled} value={ApiReducer?.apiJson?.[name] + ""} onChange={onChange ? onChange : (e) => onTextChange(e.target.value)} className={cn(`${ApiReducer?.apiJsonError?.[name] ? errorInputClass : normalInputClass} ${className}`)}>
                {!ApiReducer?.apiJson?.[name] && <option selected={true}>{placeholder}</option>}
                {

                    options?.map((ele, i) => {
                        return (
                            <option key={i} selected={ele === ApiReducer?.apiJson?.[name] ? true : false}>{ele}</option>
                        )
                    })
                }
            </select>
            {error?<div className={cn(`text-red text-[13px] mt-0.5 ${errorLabelClass}`)}>{errorMsg?errorMsg:ApiReducer?.apiJsonError?.[name]}</div>:''}
        </div>
    );
};

export default CustomSelect;