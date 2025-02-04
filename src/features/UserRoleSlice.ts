import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface simplePermission {
    read: boolean;
    write: boolean;
    delete: boolean;
}

export interface SidebarDataItem {
    screenName: string;
    status: string;
    type: string;
}

export interface BodyDataItem {
    componentName: string;
    hits: string;
    permissions: simplePermission;
    status: string;
}


export interface RolePermission {
    applicationSidebarDataId: SidebarDataItem;
    bodyDataId: BodyDataItem;
    bodyDataPermission: simplePermission;
    status: string;
}

export interface roleDataArr {
    roleName: string;
    roleType: string;
    status: string;
    permission: RolePermission[];
    _id:string;
}

export interface roleDoc {
    statusCode?: number;
    data?: roleDataArr[];
}

// Define state structure with `doc` property
export interface FullRole {
    doc: roleDoc;
}

// Initial state with `doc` properly structured
const initialState: FullRole = {
    doc: {},
};

const UserRoleSlice = createSlice({
    name: 'UserRoleSlice',
    initialState,
    reducers: {
        setRoleData: (state, action: PayloadAction<roleDoc>) => {
            state.doc = action.payload; // Ensuring proper assignment
        },
    },
});

export const { setRoleData } = UserRoleSlice.actions;

export default UserRoleSlice.reducer;
