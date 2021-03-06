import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {  articleListReducer,articleCreateReducer,articleDeleteReducer} from './reducers/ArticleReducer'




const reducer = combineReducers({
    articleList : articleListReducer,
    createArticle : articleCreateReducer,
    // articleDelete : articleDeleteReducer,
});
 const initialState = {
    article : articleListReducer,
 }

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store