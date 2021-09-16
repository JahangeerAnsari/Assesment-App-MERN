

const { userAssesmentConstant } = require("../actions/constant");

const initialState = {
  userAssements: [],
  resultAssesments: [],
  loading: true,
  error: null,
};

const userAssemntReducer = (state = initialState, action) => {
  switch (action.type) {
    case userAssesmentConstant.ADD_NEW_ASSESMENT_TEST_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userAssesmentConstant.ADD_NEW_ASSESMENT_TEST_SUCCESS:
       state = {
         ...state,
         userAssements: action.payload.userAssements
       }
      break;
    case userAssesmentConstant.ADD_NEW_ASSESMENT_TEST_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
      case userAssesmentConstant.GET_NEW_ASSEMENT_TEST_REQUEST:
        state = {
          ...state,
          loading : true,

        }
        break;

        case userAssesmentConstant.GET_NEW_ASSEMENT_TEST_SUCCESS:
          state = {
            ...state,
            resultAssesments: action.payload.resultAssesments,
            loading: false

          }
          break;
       
          case userAssesmentConstant.GET_NEW_ASSEMENT_TEST_FAILURE:
            state = {
              ...state,
              error: action.payload.error,
              loading: false,
            };
          break;


    default:
      break;
  }
  return state;
};
export default userAssemntReducer;
