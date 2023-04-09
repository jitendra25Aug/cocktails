import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

// context
const AppContext = createContext();
export const useGlobalContext = () => {
    return useContext(AppContext);
}

// Context Provider
export const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('a');
    const [cocktails, setCocktails] = useState([]);

    const fetchDrinks = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${url}${searchTerm}`);
            const data = await response.json();
            const { drinks } = data;
            if (drinks) {
                const newCocktails = drinks.map((item) => {
                    const { idDrink, strAlcoholic, strDrink, strDrinkThumb, strGlass } = item;
                    return { id: idDrink, info: strAlcoholic, name: strDrink, image: strDrinkThumb, glass: strGlass };
                });
                setCocktails(newCocktails);
            } else {
                setCocktails([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.log("error in fetching drinks : ", error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchDrinks();
    }, [searchTerm]);
    return (
        <AppContext.Provider value={{ isLoading, setSearchTerm, cocktails }}>
            {children}
        </AppContext.Provider>
    );
}