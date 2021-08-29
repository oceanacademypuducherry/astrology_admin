import React, { useState ,useEffect} from "react";
import GoogleDocsViewer from "react-google-docs-viewer";
import firebase from "../firebaseConfig/fbConfig";
import {useParams} from 'react-router-dom'

export default function BookView() {
  const firestore = firebase.firestore();
  const {id}=useParams()
  const[pdfLink,setPdfLink] = React.useState('')

  console.log(id)

  function getBookData() {
    const bookData = firestore.collection('books').doc(id).get();
    bookData
      .then((data) => {
        console.log(data.data());
        setPdfLink(data.data()['pdfLink']);
        
        console.log(data.data()['pdfLink'])
        
      })
      .catch((error) => alert(error.message));
  }

  useEffect(() => {
    console.log('11111111111111111111111')
    getBookData();
    console.log(pdfLink);
    
  },[pdfLink])

  return (
    <div>
      <GoogleDocsViewer
        width="100%"
        height="100vh"
//  fileUrl={pdfLink}
         fileUrl = 'https://firebasestorage.googleapis.com/v0/b/astrology-7cec1.appspot.com/o/bookPdf%2FHow%20to%20connect%20firebase%20to%20flutter%20app.pdf?alt=media&token=f09c634f-cc3c-4729-b722-b27083bca327'
      />
    </div>
  );
}
