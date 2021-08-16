import { ARTICLE_LIST_REQUEST,
    ARTICLE_LIST_SUCCESS,
    ARTICLE_LIST_FAIL, } from '../Constants/ArticleConstant'


    export const articleListReducer = (state = { articles: {} }, action) => {
        switch (action.type) {
            case ARTICLE_LIST_REQUEST:
                return { loading: true, articles: {} }
    
            case ARTICLE_LIST_SUCCESS:
                return {
                    loading: false,
                    products: action.payload.articles,
                
                }
    
            case ARTICLE_LIST_FAIL:
                return { loading: false, error: action.payload }
    
            default:
                return state
        }
    }