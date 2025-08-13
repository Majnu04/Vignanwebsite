import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:5000"
    // const [food_list, setFoodList] = useState([]);
    // const [cartItems, setCartItems] = useState({});
    const [render,setRender] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                setRender(false)
            }
    }, []);

    const contextValue = {
        url,
        token,
        setToken,
        render,
        setRender,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;

