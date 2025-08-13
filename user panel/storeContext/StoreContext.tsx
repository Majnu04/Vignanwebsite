import { createContext, useEffect, useState } from "react";
import axios from "axios";

// export const StoreContext = createContext(null);
interface StoreContextType {
  newsEventsList: any[]; // Replace `any` with your proper type
  heroList: any[];
  announcementList: any[];
  departmentList: any[];
  placementList: any[];
}

export const StoreContext = createContext<StoreContextType>({
  newsEventsList: [],
  heroList: [],
  announcementList: [],
  departmentList: [],
  placementList: [],
});

const StoreContextProvider = (props) => {
    const url = "http://localhost:5000";
    const [newsEventsList, setNewsEventsList] = useState([]);
    const [heroList, setHeroList] = useState([]);
    const [announcementList, setAnnouncementList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [placementList, setPlacementList] = useState([]);

   const newsListFetchData = async () => {
    try {
        const res = await axios.get(url + "/api/newsEvents/list");
        // console.log("API Response:", res.data); // Add this
        setNewsEventsList((prevData) => {
            if (JSON.stringify(prevData) !== JSON.stringify(res.data)) {
                return res.data;
            }
            return prevData;
        });
    } catch (err) {
        console.error("Error fetching newsEvents data:", err);
    }
};

const heroListFetchData = async () => {
    try {
        const res = await axios.get(url + "/api/heroImage/list");
        console.log("API Response:", res.data); // Add this
        setHeroList((prevData) => {
            if (JSON.stringify(prevData) !== JSON.stringify(res.data)) {
                return res.data;
            }
            return prevData;
        });
    } catch (err) {
        console.error("Error fetching heroImages data:", err);
    }
};

const announcementListFetchData = async () => {
    try {
        const res = await axios.get(url + "/api/announcement/list");
        console.log("API Response:", res.data); // Add this
        setAnnouncementList((prevData) => {
            if (JSON.stringify(prevData) !== JSON.stringify(res.data)) {
                return res.data;
            }
            return prevData;
        });
    } catch (err) {
        console.error("Error fetching announcements data:", err);
    }
};

const placementListFetchData = async () => {
    try {
        const res = await axios.get(url + "/api/placement/list");
        console.log("API Response:", res.data); // Add this
        setPlacementList((prevData) => {
            if (JSON.stringify(prevData) !== JSON.stringify(res.data)) {
                return res.data;
            }
            return prevData;
        });
    } catch (err) {
        console.error("Error fetching departments data:", err);
    }
};

    useEffect(() => {
        // Initial load
        // console.log("hello");
        // const fetchData = ()=>{
        newsListFetchData();
        heroListFetchData();
        announcementListFetchData();
        placementListFetchData();
        // departmentListFetchData();
        // }

        // Polling every 5 seconds
        // const interval = setInterval(fetchData, 5000);

        // return () => clearInterval(interval); // cleanup on unmount
    }, []);

    const contextValue = {
        url,
        newsEventsList,
        heroList,
        announcementList,
        setDepartmentList,
        departmentList,
        placementList,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;


