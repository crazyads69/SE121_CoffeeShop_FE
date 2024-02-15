/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext";
import { RootState } from "@/redux/store";
import { NavBarItem, USER_ROLE } from "@/utils/constant/constant";

export default function NavBar() {
    // State of current active nav bar item
    const user = useSelector((state: RootState) => state.auth.user);
    const [active, setActive] = useState("0");
    const router = useRouter();
    const pathname = usePathname();
    // Ref to keep track of nav bar item each time render
    const newNavBarItem = useRef(NavBarItem);
    // Keep track of current path to set active nav bar item accordingly
    useEffect(() => {
        const currentPath = pathname;
        const currentActive = newNavBarItem.current.find((item) => item.path === currentPath);
        // If current path is not in the list of nav bar items, set active to default else set active to current path
        if (currentActive) {
            setActive(currentActive.id);
        } else {
            setActive("0");
        }
    }, [pathname, newNavBarItem]);
    // Update nav bar item when user change role (admin or user)
    useEffect(() => {
        if (user?.role === USER_ROLE.ADMIN) {
            newNavBarItem.current = NavBarItem;
        } else {
            newNavBarItem.current = NavBarItem.filter((item) => item.requireAdmin === false);
        }
    }, [user]);

    const handleClicked = (id: string, path: string) => {
        setActive(id);
        // Redirect to the clicked path, use window.location.href to force reload the page to reset the state
        // NextJS does not reload target page when using router.push because it is client side navigation
        // The page is already loaded so it does not reload and cache the state
        window.location.href = path;
    };
    return (
        <div className=" flex h-[3.125rem] w-screen flex-row items-center justify-center bg-[#3758F9] px-[16rem] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {newNavBarItem.current.map((item) => (
                <div
                    key={item.id}
                    className={` ${
                        active === item.id ? "bg-[#1C3FB7]" : ""
                    } flex h-full w-[8rem] cursor-pointer select-none flex-row items-center justify-center font-sans text-[1rem] font-bold text-white hover:bg-[#1C3FB7]`}
                    onClick={() => {
                        handleClicked(item.id, item.path);
                    }}
                >
                    {item.name}
                </div>
            ))}
        </div>
    );
}
