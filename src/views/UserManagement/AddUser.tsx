import CustomSelect from "../../components/ui/forms/CustomSelect";
import CustomButton from "../../components/ui/forms/CustomButton";
import CustomInput from "../../components/ui/forms/CustomInput";
import React, { useEffect, useState } from "react";
import { ApiHit } from "../../constants/Apihit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { searchRole } from "../../constants/constants";
import { DistrictData } from "../../views/districtData";
import { checkUserValidation } from "./userValidation";
import { ObjIsEmpty, regexEmail } from "../../utils/utils";
import { setApiJsonError } from "../../features/apireducer";

const AddUser = () => {

    const ApiReducer = useSelector((state: RootState) => state.ApiReducer);
    const dispatch = useDispatch()

    const [role,setRole] = useState([])
    const [city, setCity] = useState<string[]>([]);
    const [state, setState] = useState<string[]>([]);

    useEffect(() => {
        if (state.length === 0) {
            let tempArr: string[] = [];
            DistrictData.states?.forEach((ele) => {
                tempArr.push(ele.state); // Push state names into tempArr
            });
            if (DistrictData.states.length === tempArr.length) {
                setState(tempArr);
            }
        }
        if (city?.length === 0 && ApiReducer?.apiJson?.state) {
            const stateIndex = DistrictData.states.findIndex(
                (ele) => ele.state === ApiReducer.apiJson.state
            );
            if (stateIndex !== -1) {
                const cityData = DistrictData.states[stateIndex].districts;
                setCity(cityData);
            }
        }
    }, [ApiReducer,state,city]);    

    const onChangeRoleType = (value:string) =>{
        var json = {
            roleType:ApiReducer?.apiJson?.roleType
        }
        ApiHit(json,searchRole).then(res=>{
            console.log('res',res);
        })
    }

    const onClickSubmit = () => {
        dispatch(setApiJsonError({}))
        checkUserValidation(ApiReducer?.apiJson).then((res: Record<string, string>) => {
            if (!ObjIsEmpty(res)) {
                dispatch(setApiJsonError(res))
            }else{
                console.log('done');
            }
        });
    };

    return (
        <div className="m-10 w-1/2 bg-lightGray p-5 rounded-lg">
            <div className="grid grid-cols-3 gap-3 mt-5">
                <CustomInput type="string" name="fullName" placeholder="Enter full name" title="Full Name" error={!ApiReducer?.apiJson?.fullName}/>
                <CustomInput type="string" name="email" placeholder="Enter email" title="Email" error={!regexEmail.test(ApiReducer?.apiJson?.email+"")}/>
                <CustomInput type="string" name="contactno" placeholder="Enter contact" title="Contact" error={!ApiReducer?.apiJson?.contactno ? true : typeof ApiReducer?.apiJson?.contactno === "string" && ApiReducer?.apiJson?.contactno.length !== 10} />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-5">
                <CustomSelect options={state} name="state" placeholder="Enter state" title="State" error={!ApiReducer?.apiJson?.state}/>
                <CustomSelect disabled={city.length === 0} options={city} name="city" placeholder="Enter city" title="City"  error={!ApiReducer?.apiJson?.city} />
                <CustomInput type="string" name="address" placeholder="Enter address" title="Address"  error={!ApiReducer?.apiJson?.address} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-5">
                <CustomSelect onChange={(e)=>onChangeRoleType(e.target.value)} placeholder={'Select role type'} options={['Super Admin', 'Client Admin']} name="roleType" title="Select Role Type" error={!ApiReducer?.apiJson?.roleType}/>
                <CustomSelect disabled={role?.length === 0} placeholder={'Select role'} options={role} name="roleId" title="Select Role" error={!ApiReducer?.apiJson?.roleId}/>
            </div>
            <div className="mt-5">
                <CustomButton onClick={()=>onClickSubmit()} title="Submit" />
            </div>
        </div>
    );
};

export default AddUser;
