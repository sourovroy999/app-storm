import { Outlet } from "react-router";
import Navbar from "../components/Outlets/Navbar";
import Footer from "../components/Outlets/Footer";





const MainLayout = () => {
    
    return (
        <div>
            <Navbar />

         <div className=' min-h-[calc(100vh-68px)]'>
                <Outlet />
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;