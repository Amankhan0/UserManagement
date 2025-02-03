import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { errorInputClass, normalInputClass } from "../../../constants/constants";
import { setApiJson } from "../../../features/apireducer";
import cn from "../../../utils/class-names";

interface props {
  name: string; // imp
  type: string; // imp
  title?: string;
  className?: string;
  titleClass?: string;
  errorLabelClass?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  style?: React.CSSProperties;
  disabled?:boolean;
  error?:boolean;
  errorMsg?:string;
}

const CustomInput = ({ title, className, name, placeholder, onChange, id, style, type, titleClass, errorLabelClass,disabled,error,errorMsg }: props) => {

  const ApiReducer = useSelector((state: RootState) => state.ApiReducer);
  const dispatch = useDispatch()

  const onTextChange = (value: string) => {
    const updatedJson = {
      ...ApiReducer?.apiJson,
      [name]: type === 'Number' ? parseInt(value) : value,
    };
    dispatch(setApiJson(updatedJson))
  }

  return (
    <div>
      <p className={`text-sm mb-1.5 font-medium ${titleClass}`}>{title}</p>
      <input disabled={disabled} onChange={onChange ? onChange : (e) => onTextChange(e.target.value)} className={cn(`${ApiReducer?.apiJsonError?.[name] ? errorInputClass : normalInputClass} ${className}`)} name={name} placeholder={placeholder} value={ApiReducer?.apiJson?.[name]? ApiReducer?.apiJson?.[name]+"":""} id={id} style={style} type={type} />
      {error?<div className={cn(`text-red text-[13px] mt-0.5 ${errorLabelClass}`)}>{errorMsg?errorMsg:ApiReducer?.apiJsonError?.[name]}</div>:''}
      </div>
  );
};

export default CustomInput;
