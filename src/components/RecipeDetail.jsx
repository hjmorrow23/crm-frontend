import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecipe, updateRecipe, createRecipe, getRecipes } from '../store/actions/recipe';
import { Form, Input, Button, Icon, Image } from 'semantic-ui-react'
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const Section = styled.section`
    width: 100%;
    padding: 50px;
`;

const UL = styled.ul`
    list-style: none;
    padding: 0;
`;

const OL = styled.ol`
    padding: 0;
`;


const IngredientLI = styled.li`
    display: flex;
    justify-content: flex-start;
    .field {
        width: 25%;
        margin-right: 20px !important;
    }
    .button {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        padding: 0;
        align-self: center;

        .icon {
            margin: 0 !important;
        }
    }
`;

const StepLI = styled.li`
display: flex;
justify-content: flex-start;
.field {
    width: 50%;
    margin-right: 20px !important;
}
.button {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    padding: 0;
    align-self: center;

    .icon {
        margin: 0 !important;
    }
}
`;

const ViewHeader = styled.h3`
    display: inline-block;
`;


const EditHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
  h3 {
    display: inline-block;
    margin-right: 50px;
  }
`;





const RecipeDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const creating = id === "creating";
    const [editing, setEditing] = useState(creating);
    useEffect(() => {
        dispatch(getRecipe(id));
    }, []);
    const {currentRecipe} = useSelector(state => state.recipe);
    const [recipe, setRecipe] = useState({
        name: "",
        tags: [],
        ingredients: [{
            quantity: "",
            quantityType: "",
            name: "",
            _id: uuidv4()
        }],
        steps: [{
            _id: uuidv4(),
            text: "",
            order: 1,
        }]
    });
    useEffect(() => {
        if(currentRecipe) {
            setRecipe(currentRecipe);
        }
    }, [currentRecipe]);
    let ingredientsList = [];
    let stepsList = [];
    const addIngredient = () => {
        const updatedRecipe = {...recipe};
        const updatedIngs = [...updatedRecipe.ingredients, {
            quantity: "",
            quantityType: "",
            name: "",
            _id: uuidv4()
        }];
        updatedRecipe.ingredients = updatedIngs;
        setRecipe(updatedRecipe);
    }
    const removeIngredient = (recipeId) => {
        const updatedRecipe = {...recipe};
        updatedRecipe.ingredients = recipe.ingredients.filter(ing => ing._id !== recipeId);
        setRecipe(updatedRecipe);
    };
    const addStep = () => {
        const updatedRecipe = {...recipe};
        const updatedSteps = [...updatedRecipe.steps, {
            _id: uuidv4(),
            text: "",
            order: recipe.steps.length + 1,
        }];
        updatedRecipe.steps = updatedSteps;
        setRecipe(updatedRecipe);
    };
    const removeStep = (stepId) => {
        const updatedRecipe = {...recipe};
        updatedRecipe.steps = recipe.steps.filter(step => step._id !== stepId);
        setRecipe(updatedRecipe);
    };
    if(currentRecipe && !editing) {
        const { ingredients, steps } = recipe;
        ingredientsList = ingredients.map(ing => <li key={`${ing._id}`}>{ing.quantity} {ing.quantityType} {ing.name}</li>)
        stepsList = steps.map(step => <li key={`${step._id}`}>{step.text}</li>)
    } else if ((currentRecipe && editing) || creating) {
        const { ingredients, steps } = recipe;
        ingredientsList = ingredients.map(ing => {
            return (<IngredientLI key={`${ing._id}`}>
                <Form.Input label="Quantity" type="text" value={ing.quantity} onChange={(e) => updateRecipeForm(e, "ingredients", ing._id, "quantity")} /> 
                <Form.Input label="Quantity Type" type="text" value={ing.quantityType} onChange={(e) => updateRecipeForm(e, "ingredients", ing._id, "quantityType")} />
                <Form.Input label="Ingredient Name" type="text" value={ing.name} onChange={(e) => updateRecipeForm(e, "ingredients", ing._id, "name")} />
                <Button type="button" onClick={() => removeIngredient(ing._id)}><Icon name="minus" /></Button>
                
            </IngredientLI>);
        });
        stepsList = steps.map((step, index) => {
            return (<StepLI key={`${step._id}`}>
                <Form.Input label={`Step #${index + 1}`} type="text" value={step.text} onChange={(e) => updateRecipeForm(e, "steps", step._id, "text")} />
                <Button type="button" onClick={() => removeStep(step._id)}><Icon name="minus" /></Button>
            </StepLI>);
        });
    }
    const updateRecipeForm = (event, key, id, subKey) => {
        const updatedRecipe = {
            ...recipe
        };
        switch(key) {
            case "ingredients":
                const updatedIngIndex = updatedRecipe[key].findIndex(ing => ing._id === id);
                const updatedIng = updatedRecipe[key][updatedIngIndex];
                const formattedIng = {...updatedIng};
                formattedIng[subKey] = event.target.value;
                const formattedIngs = [...updatedRecipe[key]];
                formattedIngs.splice(updatedIngIndex, 1, formattedIng);
                updatedRecipe[key] = formattedIngs;
                break;
            case "steps":
                const updatedStepIndex = updatedRecipe[key].findIndex(step => step._id === id);
                const updatedStep = updatedRecipe[key][updatedStepIndex];
                const formattedStep = {...updatedStep};
                formattedStep[subKey] = event.target.value;
                const formattedSteps = [...updatedRecipe[key]];
                formattedSteps.splice(updatedStepIndex, 1, formattedStep);
                updatedRecipe[key] = formattedSteps;
                break;
            case "tags":
                const tags = event.target.value.split(',');
                updatedRecipe[key] = tags;
                break;
            default:
                updatedRecipe[key] = event.target.value;
        }
        
        setRecipe(updatedRecipe)
    }
    const toggleEdit = () => {
        setEditing(!editing);
    };
    const saveForm = () => {
        if(creating) {
            const formattedRecipe = { ...recipe };
            delete formattedRecipe._id;
            formattedRecipe.ingredients.forEach(ing => delete ing._id);
            formattedRecipe.steps.forEach(step => delete step._id);
            dispatch(createRecipe(recipe));
            navigate('/')
            dispatch(getRecipes());
        } else {
            dispatch(updateRecipe(recipe._id, recipe))
            toggleEdit();
        }
    }
    return ( 
        <Section>
            { !editing && (<>
                <h1>{recipe.name}</h1>
                {recipe.image && <Image src={recipe.image} />}
                <ViewHeader>Tags</ViewHeader>
                <h4>{recipe.tags.join(", ")}</h4>
                <ViewHeader>Ingredients</ViewHeader>
                <ul>{ingredientsList}</ul>
                <ViewHeader>Steps</ViewHeader>
                <ol>{stepsList}</ol>
                <Button onClick={() => toggleEdit()}>Edit Recipe</Button>
                </>
            )}
            { (editing) && 
                (<>
                    <Form onSubmit={() => saveForm()}>
                        <Form.Input label="Recipe Name" type="text" value={recipe.name} onChange={(e) => updateRecipeForm(e, "name")} />
                        <Form.Input label="Tags" type="text" value={recipe.tags} onChange={(e) => updateRecipeForm(e, "tags")} />
                        <Form.Input label="Image" type="text" value={recipe.image} onChange={(e) => updateRecipeForm(e, "image")} />
                        <EditHeader>
                            <h3>Ingredients</h3>
                            <Button type="button" onClick={() => addIngredient()}>Add Ingredient</Button>
                        </EditHeader>
                        <UL>{ingredientsList}</UL>
                        <EditHeader>
                            <h3>Steps</h3>
                            <Button type="button" onClick={() => addStep()}>Add Step</Button>
                        </EditHeader>
                        <OL>{stepsList}</OL>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </>)
            }
        </Section>
     );
}
 
export default RecipeDetail;