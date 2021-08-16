import { ARTICLE_LIST_REQUEST,
    ARTICLE_LIST_SUCCESS,
    ARTICLE_LIST_FAIL, } from '../Constants/ArticleConstant'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ARTICLE_LIST_REQUEST })
  
        // const { data } = await axios.get(`/api/products${keyword}`)
  
        dispatch({
            type: ARTICLE_LIST_SUCCESS,
            payload: data
        })
  
    } catch (error) {
        dispatch({
            type: ARTICLE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
  }