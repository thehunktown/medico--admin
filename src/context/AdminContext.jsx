import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify'

export const AdminContext = createContext();


const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'');
    const [staffs, setAllStaffs ] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const getAllStaffs = async () =>{
        try{
            const { data } = await axios.post(`${backendUrl}/api/admin/all-staffs`, {}, {
                headers: { aToken }
            });
            if(data.success){
                console.log("getting inside data fetch block in admin context..");
                setAllStaffs(data.staff);
                console.log(data.staff);
            }else{
                toast.error(data.message);
            }
        }catch(error){
            toast.error(error.response?.data?.message || "An error occurred while fetching staff data");
        }
    }

    const changeAvailability = async (Id) => {  // Accept docId as an argument
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/change-availability`, { Id }, {
                headers: { aToken }
            });
    
            if (data.success) {
                toast.success(data.message);
                getAllStaffs();  // Refresh the staff list to reflect availability change
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred while changing availability");
        }
    };
    
    const value = {
        aToken, setAToken, backendUrl, staffs, getAllStaffs, changeAvailability
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider