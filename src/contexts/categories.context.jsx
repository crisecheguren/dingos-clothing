import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";



export const CategoriesContext = createContext({
    categoriesMap: {},
    setCategoriesMap: () => null,
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesMap = await getCategoriesAndDocuments();
            console.log(categoriesMap)
            setCategoriesMap(categoriesMap);
        };

        getCategoriesMap();
    }, []);

    const value = { categoriesMap, setCategoriesMap };

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
}