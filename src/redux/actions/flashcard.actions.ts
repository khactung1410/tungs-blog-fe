// src/redux/actions.ts
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { authHeader } from '../../helpers';

export const SUBMIT_REQUEST = 'SUBMIT_REQUEST';
export const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS';
export const SUBMIT_FAILURE = 'SUBMIT_FAILURE';

export const submitRequest = () => ({ type: SUBMIT_REQUEST });
export const submitSuccess = (fileUrl: string) => ({ type: SUBMIT_SUCCESS, payload: fileUrl });
export const submitFailure = (error: string) => ({ type: SUBMIT_FAILURE, payload: error });
// Thunk action creator

export const submitText = ({...obj}): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch: Dispatch) => {
      console.log(obj.withPhonics)
      dispatch(submitRequest());
      const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({vocabs: obj.vocabs, withPhonics : obj.withPhonics})
      };
      console.log(requestOptions)
  
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/teachers/flashcard-pdf`, requestOptions)
        .then(handleResponseToPdf)
        .catch(err => console.log(err))
      } catch (error: any) {
        dispatch(submitFailure(error.message));
      }
    };
  };

  async function handleResponseToPdf(response: any) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'flashcard.pdf');
    document.body.appendChild(link);
    link.click();
    if (link.parentNode) link.parentNode.removeChild(link);
  }