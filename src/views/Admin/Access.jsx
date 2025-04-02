import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../AppContext";

const Access = ({ children }) => { 
    const { accessToken } = useContext(AppContext);

    if (!accessToken) { 
        return<Navigate to="/signin" replace/>
    }
    return children;
    //children = admin page
   
}
export default Access;