import { ObjIsEmpty } from "../../utils/utils";
import CustomTable from "../../components/ui/table/CustomTable";
import { buttonClass, searchRole, searchUser, tableThClass } from "../../constants/constants";
import { setUserData } from "../../features/userreducer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { ApiHit } from "../../constants/Apihit";
import CustomTitle from "../../components/ui/title/CustomTitle";
import { NavLink } from "react-router-dom";

const UserManagement = () => {

    var th = ['S.No.', 'Full Name','Email','Contact','Role Type','State','City','Address','Action']

    const UserManagementReducer = useSelector((state: RootState) => state.UserManagementReducer);
    const PaginationReducer = useSelector((state: RootState) => state.PaginationReducer);
    const dispatch = useDispatch()

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
    td = UserManagementReducer?.doc?.data?.map((ele:any, index:any) => {
        return (
            <tr>
                <th className={tableThClass}><b>{index + 1}.</b></th>
                <th className={tableThClass}>{ele.firstName+' '+ele.lastName}</th>
                <th className={tableThClass}>{ele.email}</th>
                <th className={tableThClass}>{ele.contactNo}</th>
                <th className={tableThClass}>{ele.roleType}</th>
                <th className={tableThClass}>{ele.state}</th>
                <th className={tableThClass}>{ele.city}</th>
                <th className={tableThClass}>{ele.address}</th>
            </tr>
        )
    })

    return (
        <div className="m-10">
            <div className="w-full bg-lightGray p-4 rounded-lg flex justify-between items-center">
                <CustomTitle title="Role Management" />
                <NavLink className={`${buttonClass} text-white`} to={'/adduser'}>
                    Add User
                </NavLink>
            </div>
           <div className="mt-10">
                <CustomTable setDataNull={setDataNull} th={th} td={td} totalPages={UserManagementReducer?.doc?.totalPages} />
            </div>
        </div>
    );
};

export default UserManagement;
