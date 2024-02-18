/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Staff {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role: number;
    created_at: string;
    updated_at: string;
}

export interface StaffState {
    staffs: Staff[];
    selectedStaff: string[];
}

const initialState: StaffState = {
    staffs: [],
    selectedStaff: [],
};

const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        setStaffs(state, action: PayloadAction<Staff[]>) {
            state.staffs = action.payload;
        },
        updateStaff(state, action: PayloadAction<Staff>) {
            const index = state.staffs.findIndex((staff) => staff.id === action.payload.id);
            state.staffs[index] = action.payload;
            // Make sure the state is updated
            state.staffs = [...state.staffs];
        },
        addStaff(state, action: PayloadAction<Staff>) {
            state.staffs.push(action.payload);
        },
        removeStaff(state, action: PayloadAction<string>) {
            state.staffs = state.staffs.filter((staff) => staff.id !== Number(action.payload));
        },
        removeStaffList(state, action: PayloadAction<string[]>) {
            state.staffs = state.staffs.filter(
                (staff) => !action.payload.includes(String(staff.id)),
            );
        },
        setSelectedStaff(state, action: PayloadAction<string[]>) {
            state.selectedStaff = action.payload;
        },
        addSelectedStaff(state, action: PayloadAction<string>) {
            if (!state.selectedStaff.includes(action.payload)) {
                state.selectedStaff.push(action.payload);
            } else {
                state.selectedStaff = state.selectedStaff.filter(
                    (staff) => staff !== action.payload,
                );
            }
        },
        removeSelectedStaff(state, action: PayloadAction<string>) {
            state.selectedStaff = state.selectedStaff.filter((staff) => staff !== action.payload);
        },
        clearSelectedStaff(state) {
            state.selectedStaff = [];
        },
    },
});

export const {
    setStaffs,
    updateStaff,
    addStaff,
    removeStaff,
    removeStaffList,
    setSelectedStaff,
    addSelectedStaff,
    removeSelectedStaff,
    clearSelectedStaff,
} = staffSlice.actions;
export default staffSlice.reducer;
