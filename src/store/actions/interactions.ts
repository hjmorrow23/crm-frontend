import { interactionActions } from "../slices/interaction";
import api from '../../api'
import { InteractionTypes } from "../../enums/interactions";

const { getInteractionsSuccess } = interactionActions;
const apiBase = process.env.REACT_APP_API_URL;

export const getInteractionTypes: () => (dispatch: any) => Promise<void> = () => async dispatch => {
    try {
        let myHeaders = api.getHeaders();
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow' as RequestRedirect
        };
        const res = await fetch(`${apiBase}/interactions/interactionTypes`, requestOptions);
        console.log(res);
        const result = await res.text();
        const data: InteractionTypes = JSON.parse(result);
        dispatch(getInteractionsSuccess(data));
    } catch(err) {
        console.error(err);
    }
}



