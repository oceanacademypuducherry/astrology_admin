import { ARTICLE_LIST_REQUEST,
    ARTICLE_LIST_SUCCESS,
    ARTICLE_LIST_FAIL,
    ARTICLE_CREATE_REQUEST,
    ARTICLE_CREATE_SUCCESS,
     ARTICLE_CREATE_FAIL,
     ARTICLE_CREATE_RESET
     } from '../Constants/ArticleConstant'


    export const articleListReducer = (state = { articles: [] }, action) => {
        switch (action.type) {
            case ARTICLE_LIST_REQUEST:
                return { loading: true, articles: [] }
    
            case ARTICLE_LIST_SUCCESS:
                console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
                return {
                    loading: false,
                    articles: action.payload,
                
                }
    
            case ARTICLE_LIST_FAIL:
                return { loading: false, error: action.payload }
    
            default:
                return state
        }
    }
    export const articleCreateReducer = (state ={},action) =>{
        switch(action.type){
            case ARTICLE_CREATE_REQUEST:
                return {loading:true}
            case ARTICLE_CREATE_SUCCESS:
                return {loading:false , success:true,article:action.payload}
            case ARTICLE_CREATE_FAIL:
                return {loading:false , error:action.payload}
            case ARTICLE_CREATE_RESET:
                return {}
            default:
                return state
        }
    }