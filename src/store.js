import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {  articleListReducer,articleCreateReducer} from './reducers/ArticleReducer'




const reducer = combineReducers({
    articleList : articleListReducer,
    createArticle : articleCreateReducer,
});
 const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store