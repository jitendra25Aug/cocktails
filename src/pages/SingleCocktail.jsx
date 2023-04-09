import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [cocktail, setCocktail] = useState(null);

    const getCocktail = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${url}${id}`);
            const data = await response.json();

            if (data.drinks) {
                const { strAlcoholic: info, strCategory: catergory, strDrink: name, strDrinkThumb: image, strGlass: glass,
                    strInstructions: instructions, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5,
                } = data.drinks[0];
                const ingredients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5];
                const newCocktail = { name, image, info, catergory, glass, instructions, ingredients };
                setCocktail(newCocktail);
            } else {
                setCocktail(null);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getCocktail();
    }, [id]);

    if (isLoading) {
        return <Loading />
    }
    if (!cocktail) {
        return <h2 className="section-title">no cocktail to display</h2>
    }
    const { name, image, info, catergory, glass, instructions, ingredients } = cocktail;
    return (
        <section className="section cocktail-section">
            <Link to="/" className="btn btn-primary">back home</Link>
            <h2 className="section-title">{name}</h2>
            <div className="drink">
                <img src={image} alt={name} />
                <div className="drink-info">
                    <p><span className="drink-data">name : {name}</span></p>
                    <p><span className="drink-data">catergory : {catergory}</span></p>
                    <p><span className="drink-data">info : {info}</span></p>
                    <p><span className="drink-data">glass : {glass}</span></p>
                    <p><span className="drink-data">instructions : {instructions}</span></p>
                    <p>
                        <span className="drink-data">ingredients : </span>
                        {ingredients.map((ingredient, index)=>{
                            return ingredient ? <span key={index}>{ingredient}</span> : null
                        })}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default SingleCocktail;