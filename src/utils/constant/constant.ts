/* eslint-disable import/prefer-default-export */
/* eslint-disable no-shadow */
// Define constant for user role
export enum USER_ROLE {
    USER = 0,
    ADMIN = 1,
}

// Define constant for path list of the app
// Require admin: true if the path is only for admin
export const NavBarItem = [
    {
        id: "0",
        name: "Tổng quan",
        path: "/admin",
        requireAdmin: true,
    },
    {
        id: "1",
        name: "Hàng hoá",
        path: "/admin/product",
        requireAdmin: true,
    },
    {
        id: "2",
        name: "Hóa đơn",
        path: "/billing",
        requireAdmin: false,
    },
    {
        id: "3",
        name: "Khách hàng",
        path: "/admin/customer",
        requireAdmin: true,
    },
    {
        id: "4",
        name: "Nhân viên",
        path: "/admin/staff",
        requireAdmin: true,
    },
    {
        id: "5",
        name: "Voucher",
        path: "/admin/voucher",
        requireAdmin: true,
    },
    {
        id: "6",
        name: "Bán hàng",
        path: "/checkout",
        requireAdmin: false,
    },
];

// Define constant for product type
export const productTypes = ["Đồ ăn", "Đồ uống", "Khác"];

// Define enum for product type
export enum PRODUCT_TYPE {
    FOOD = "Đồ ăn",
    DRINK = "Đồ uống",
    OTHER = "Khác",
}

// Const for status filter
export const statusList = ["pending", "finish", "allStatus"];

export const dateRange: { [key: string]: string } = {
    allTime: "Mọi thời điểm",
    yesterday: "Hôm qua",
    threeDays: "3 ngày qua",
    oneWeek: "1 tuần qua",
    oneMonth: "1 tháng qua",
};

// Const for voucher type
export const voucherTypeList = ["direct", "percent"];
