import { paymentActions } from "../slices/payment";
import api from '../../api'
import { PaymentTypes } from "../../enums/payments";

const { getPaymentsSuccess } = paymentActions;
const apiBase = process.env.REACT_APP_API_URL;

export const getPaymentTypes: () => (dispatch: any) => Promise<void> = () => async dispatch => {
    try {
        let myHeaders = api.getHeaders();
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow' as RequestRedirect
        };
        const res = await fetch(`${apiBase}/payments/types`, requestOptions);
        const result = await res.text();
        const data: PaymentTypes = JSON.parse(result);
        dispatch(getPaymentsSuccess(data));
    } catch(err) {
        console.error(err);
    }
}



