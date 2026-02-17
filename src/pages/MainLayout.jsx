import { Outlet } from "react-router-dom";
import HeaderWrapper from "../components/common/Header/HeaderWrapper";

export default function MainLayout() {
    return (
        <>
            <HeaderWrapper />
            <Outlet />
        </>
    );
}
