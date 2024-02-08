import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecipes, deleteRecipe } from '../store/actions/recipe';
import { Grid, Card, Button, Icon, Input, Image } from 'semantic-ui-react'
import styled from 'styled-components';

const Section = styled.section`
    margin-top: 50px;

    .image {
        margin-bottom: 10px;
    }
`;

const SearchWrapper = styled.div`
  width: 100%;
  display: flex !important;
  justify-content: center;
  margin-bottom: 50px;

  .input {
  }
`;



const RecipeUL = styled.ul`
    list-style: none;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0;
    }

    li {
        width: 25%;
        margin-bottom: 50px;
        @media (max-width: 768px) {
            width: 70%;
        }

        .extra {
            display: flex;
            justify-content: flex-end;
        }
    }
`;

const AddButton = styled.button`
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    z-index: 101;

    .icon {
        margin: 0;
        font-size: 1.25rem;
    }
`;

const EditButton = styled.button`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background: none;
    z-index: 100;

    .icon {
        margin: 0;
        font-size: 1rem;
    }
`;

const DeleteButton = styled.button`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background: none;
    z-index: 100;

    .icon {
        margin: 0;
        font-size: 1rem;
    }
`;



const RecipeList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getRecipes());
    }, []);
    const { recipes } = useSelector(state => state.recipe);
    const deleteRecipeItem = (e, id) => {
        e.preventDefault();
        dispatch(deleteRecipe(id));
        dispatch(getRecipes());
    };

    const [searchTerm, setSearchTerm] = useState("");

    const updateSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    }

    const filteredRecipes = searchTerm ? recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase())) : recipes;

    const recipeItems = filteredRecipes.map((recipe) => <li key={recipe._id}><Card
        href={`/recipe/${recipe._id}`}
    >
        <Card.Content>
            {recipe.image && <Image src={recipe.image} wrapped ui={true} />}
            <Card.Header>{recipe.name}</Card.Header>
            <Card.Meta>{recipe.tags.join(', ')}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
            <EditButton onClick={() => navigate(`recipe/${recipe._id}`)}><Icon name='edit' /></EditButton>
            <DeleteButton onClick={(e) => deleteRecipeItem(e, recipe._id)}><Icon name='minus' /></DeleteButton>
        </Card.Content>
    </Card>
    </li>);



    return ( 
        <Section>  
            <SearchWrapper>
                <Input icon='search' onChange={(e) => updateSearchTerm(e)} placeholder='Search...' />
            </SearchWrapper>
            <AddButton onClick={() => navigate("/recipe/creating")}><Icon name='plus' /></AddButton>
            <RecipeUL>{recipeItems}</RecipeUL>
        </Section> 
    );
}
 
export default RecipeList;