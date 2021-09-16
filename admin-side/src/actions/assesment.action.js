import Axios from "../Axios";
const { assesmentConstants } = require("./constant")


export const addAssesment = (testPaper) => {
    return async (dispatch) => {

        dispatch({
            type: assesmentConstants.ADD_NEW_ASSESMENT_REQUEST
        })
        console.log("=====> testPaper in dispatch ", testPaper)
        const res = await Axios.post(`/addAssesment`, { ...testPaper });

        const { assememtData } = res.data;
        console.log("assemmet Data", assememtData)
        if (res.status === 201) {
            dispatch({
                type: assesmentConstants.ADD_NEW_ASSESMENT_SUCCESS,
                payload: {
                    assements: assememtData
                }
            })
        }

        if (res.status === 400) {
            dispatch({
                type: assesmentConstants.ADD_NEW_ASSESMENT_FAILURE,
                payload: {
                    error: res.data.error
                }
            })

        }

        return res;

    }
}

// GET ALL ASSESMENT

export const fetchedAllAssesments = () => {
    return async (dispatch) => {
        console.log("=====> getAllAssesments ");
        dispatch({
            type: assesmentConstants.GET_ALL_ASSESMENT_REQUEST,
        })

        const res =   await Axios.get('/getAllAssesment');
        console.log("GET_ALL_Assements:", res);
        const { assesmentList } = res.data;

        if (res.status === 200) {
            dispatch({
                type: assesmentConstants.GET_ALL_ASSESMENT_SUCCESS,
                payload: {
                    assesments: assesmentList
                }

            })

        }


        if (res.status === 400) {
            dispatch({
                type: assesmentConstants.GET_ALL_ASSESMENT_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }

        return res;
    }
}

