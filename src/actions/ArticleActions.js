import { ARTICLE_LIST_REQUEST,
    ARTICLE_LIST_SUCCESS,
    ARTICLE_LIST_FAIL,
    ARTICLE_CREATE_REQUEST,
    ARTICLE_CREATE_SUCCESS,
     ARTICLE_CREATE_FAIL,
     ARTICLE_CREATE_RESET
   } from '../Constants/ArticleConstant';

import firebase from '../firebaseConfig/fbConfig';

export const listArticles = () => async (dispatch) => {
    try {
        dispatch({ type: ARTICLE_LIST_REQUEST })
const firestore = firebase.firestore();
  let bookItem = [];
firestore
    .collection('articles')
    .get()
    .then(snapshot => {
      snapshot
        .docs
        .forEach(doc => {
            console.log('22222222222222222222222')
            bookItem.push(doc.data())

        });
        dispatch({
            type: ARTICLE_LIST_SUCCESS,
            payload: bookItem
        })
        console.log(bookItem)
           
    });
  
    } catch (error) {
        dispatch({
            type: ARTICLE_LIST_FAIL,
            payload: error.message,
        })
    }
  }


  export const createArticles = (singleArticle) => async (dispatch, getState) => {
  
    try {
        dispatch({
            type: ARTICLE_CREATE_REQUEST
        })

        const firestore = firebase.firestore();
   getState()
  
        firestore
    .collection('demo2').add(singleArticle)
  

        dispatch({
            type: ARTICLE_CREATE_SUCCESS,
            success:true,
            payload: data,
        })
  
  
    } catch (error) {
        dispatch({
            type: ARTICLE_CREATE_FAIL,
            payload:error.message,
        })
    }
  }