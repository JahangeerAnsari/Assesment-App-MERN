
import { assesmentConstants } from "../actions/constant";

const initialState = {
    loading: true,
    error: null,
    assesments: [],
}


const assementReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case assesmentConstants.ADD_NEW_ASSESMENT_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case assesmentConstants.ADD_NEW_ASSESMENT_SUCCESS:
            state = {
                ...state,
                loading: false,
                Questions: action.payload.assements
            }
            break;
        case assesmentConstants.ADD_NEW_ASSESMENT_FAILURE:
            state = {
                ...initialState
            }
            break;
        case assesmentConstants.GET_ALL_ASSESMENT_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;

        case assesmentConstants.GET_ALL_ASSESMENT_SUCCESS:
            state = {
                ...state,
                assesments: action.payload.assesments,
                loading: false,
            }
            break;
        case assesmentConstants.GET_ALL_ASSESMENT_FAILURE:
            state = {
                ...state,
                error: action.payload.error

            }
            break;

        case assesmentConstants.GET_ASSESMENT_BYID_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;

        case assesmentConstants.GET_ASSESMENT_BYID_SUCCESS:
            state = {
                ...state,
                assesmentById: action.payload.assesmentById,
                loading: false

            }
            break;
        case assesmentConstants.GET_ASSESMENT_BYID_FAILURE:
            state = {
                ...state,
                error: action.payload.error

            }
            break;
        default:
            break;
    }

    return state;

}
export default assementReducer;