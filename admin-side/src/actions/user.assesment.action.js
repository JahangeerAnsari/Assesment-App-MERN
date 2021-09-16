import { userAssesmentConstant } from "./constant";
import Axios from "../Axios";

export const writeAnAssement = (result) => {
  return async (dispatch) => {
    dispatch({
      type: userAssesmentConstant.ADD_NEW_ASSESMENT_TEST_REQUEST,
    });
    const res = await Axios.post(`/writeAseesment`, { ...result });
    console.log("USER RES ================> res.status ", res.status, res);
    // userAssements:
    // assesments: []

    if (res.status === 201) {
      const { userAssements } = res.data;
      console.log("res.data===================>", res.data);
      console.log("userAssements===================>", userAssements);
      dispatch({
        type: userAssesmentConstant.ADD_NEW_ASSESMENT_TEST_SUCCESS,
        payload: {
          userAssements,
        },
      });
    }

    if (res.status === 400) {
      dispatch({
        type: userAssesmentConstant.ADD_NEW_ASSESMENT_TEST_SUCCESS,
        payload: {
          error: res.data.error,
        },
      });
    }

    return res;
  };
};

export const getUserAssesmentResult = () => {
  return async (dispatch) => {
    console.log("=====> getAllAssesments ");
    dispatch({
      type: userAssesmentConstant.GET_NEW_ASSEMENT_TEST_REQUEST,
    });

    const res = await Axios.get("/getAssements");
    console.log("GET ASSE,EMTD:", res);

    const { assesments } = res.data;
    if (res.status === 200) {
      dispatch({
        type: userAssesmentConstant.GET_NEW_ASSEMENT_TEST_SUCCESS,
        payload: {
          resultAssesments :assesments,
        },
      });
    }

    if (res.status === 400) {
      dispatch({
        type: userAssesmentConstant.GET_NEW_ASSEMENT_TEST_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }

    return res;
  };
};
