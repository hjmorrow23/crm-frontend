import { leadActions } from "../slices/lead";
import api from '../../api'
import { Lead } from "../../components/leads/types";

const { getLeadsSuccess, getLeadSuccess, updateLeadSuccess } = leadActions;
const apiBase = process.env.REACT_APP_API_URL;

export const getLeads: () => (dispatch: any) => Promise<void> = () => async dispatch => {
    try {
        let myHeaders = api.getHeaders();
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow' as RequestRedirect
        };
        const res = await fetch(`${apiBase}/leads`, requestOptions);
        const result = await res.text();
        const data = JSON.parse(result);
        dispatch(getLeadsSuccess(data));
    } catch(err) {
        console.error(err);
    }
}

export const getLead: (id: string | undefined) => (dispatch: any) => Promise<void> = (id) => async dispatch => {
    try {
        let myHeaders = api.getHeaders();
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow' as RequestRedirect
        };
        const res = await fetch(`${apiBase}/leads/${id}`, requestOptions);
        const result = await res.text();
        const data = JSON.parse(result);
        if(!data.message) {
            dispatch(getLeadSuccess(data));
        }
        
    } catch(err) {
        console.error(err);
    }
}

export const updateLead = (id: string | undefined, lead: Lead) => async (dispatch: any) => {
    try {
        let myHeaders = api.getHeaders();
        let requestOptions = {
            method: 'PUT',
            body: JSON.stringify(lead),
            headers: myHeaders,
            redirect: 'follow' as RequestRedirect
        };
        const res = await fetch(`${apiBase}/leads/${id}`, requestOptions);
        const result = await res.text();
        const data = JSON.parse(result);
        dispatch(updateLeadSuccess(data));
    } catch(err) {
        console.error(err);
    }
}

export const createLead = (lead: Lead) => async (dispatch: any) => {
    try {
        let myHeaders = api.getHeaders();
        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(lead),
            headers: myHeaders,
            redirect: 'follow' as RequestRedirect
        };
        const res = await fetch(`${apiBase}/leads`, requestOptions);
        const result = await res.text();
        const data = JSON.parse(result);
        dispatch(updateLeadSuccess(data));
    } catch(err) {
        console.error(err);
    }
}

export const deleteLead = (id: string | undefined) => async (dispatch: any) => {
    try {
        let myHeaders = api.getHeaders();
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow' as RequestRedirect
        };
        const res = await fetch(`${apiBase}/leads/${id}`, requestOptions);
        const result = await res.text();
        console.log(result)
        const data = JSON.parse(result);
        console.log(data);
    } catch(err) {
        console.error(err);
    }
}