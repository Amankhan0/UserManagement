import { ObjIsEmpty } from "../../utils/utils";
import CustomTable from "../../components/ui/table/CustomTable";
import { buttonClass, deleteUser, searchRole, searchUser, tableThClass } from "../../constants/constants";
import { setUserData } from "../../features/userreducer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { ApiHit } from "../../constants/Apihit";
import CustomTitle from "../../components/ui/title/CustomTitle";
import { NavLink } from "react-router-dom";
import AddUser from "./AddUser";
import CustomIconWithText from "../../components/ui/CustomStatus/CustomIconWithText";
import { editSmallTrashBinIcon, smallTrashBinIcon } from "../../components/icons/icons";
import toast from "react-hot-toast";

const UserManagement = () => {

    var th = ['S.No.', 'Full Name', 'Email', 'Contact', 'Role Type', 'State', 'City', 'Address', 'Action']

    const UserManagementReducer = useSelector((state: RootState) => state.UserManagementReducer);
    const PaginationReducer = useSelector((state: RootState) => state.PaginationReducer);
    const dispatch = useDispatch()

    const [screen, setScreen] = useState('view')

    useEffect(() => {
        if (ObjIsEmpty(UserManagementReducer?.doc)) {
            fetchData()
        }
    }, [UserManagementReducer, PaginationReducer])

    const fetchData = () => {
        var json = {
            page: PaginationReducer?.pagination?.page,
            limit: PaginationReducer?.pagination?.limit,
            search: {

            }
        }
        ApiHit(json, searchUser).then((result) => {
            if (result?.statusCode === 200) {
                dispatch(setUserData(result))
            }
        })
    }

    const setDataNull = () => {
        dispatch(setUserData({}))
    }

    let td
    td = UserManagementReducer?.doc?.data?.map((ele: any, index: any) => {
        return (
            <tr>
                <th className={tableThClass}><b>{index + 1}.</b></th>
                <th className={tableThClass}>{ele.fullName}</th>
                <th className={tableThClass}>{ele.email}</th>
                <th className={tableThClass}>{ele.contactNo}</th>
                <th className={tableThClass}>{ele.roleType}</th>
                <th className={tableThClass}>{ele.state}</th>
                <th className={tableThClass}>{ele.city}</th>
                <th className={tableThClass}>{ele.address}</th>
                <th className={tableThClass}>
                    <div className='flex gap-2 items-center'>
                        <CustomIconWithText onClick={() => setScreen(ele?._id + "")} icon={editSmallTrashBinIcon} title="Edit" />
                        <CustomIconWithText onClick={() => ele._id && DeleteUser(ele?._id)} icon={smallTrashBinIcon} title="Delete" />
                    </div>
                </th>
            </tr>
        )
    })

    const DeleteUser = (id: string) => {
        var confirmation = window.confirm('Are you sure to delete user')
        if(confirmation){
            var json = {
                _id:id
            }
            ApiHit(json,deleteUser).then(res=>{
                if(res?.statusCode === 200){
                    toast.success('User Delete Successfully')
                    dispatch(setUserData({}))
                }
            })
        }
    }

    return (
        screen === 'view' ?
            <div className="m-10">
                <div className="w-full bg-lightGray p-4 rounded-lg flex justify-between items-center">
                    <CustomTitle title="User Management" />
                    <div className={`${buttonClass} text-white`} onClick={() => setScreen('adduser')}>
                        Add User
                    </div>
                </div>
                <div className="mt-10">
                    <CustomTable setDataNull={setDataNull} th={th} td={td} totalPages={UserManagementReducer?.doc?.totalPages} />
                </div>
            </div>
            :
            <AddUser setPage={setScreen} />
    );
};

export default UserManagement;
