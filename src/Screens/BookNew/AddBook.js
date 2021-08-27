import React, { useEffect, useState } from "react";
import firebase from "../../firebaseConfig/fbConfig";
import { useParams } from "react-router";
 import BookCard from "./BookScreen";
// import "../video/video.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import AddBookModel from "../BookNew/AddModel";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  togleBtn: {
    margin: 8,
  },

  fabStyle: {
    position: "fixed",
    right: "1.5%",
    bottom: "2%",
    background: "#1F6DE2",
    color: "white",
    "&:hover": {
      background: "#054cb5",
    },
  },

  extendedButton: {
    marginRight: theme.spacing(1),
  },
}));

export default function AddBook() {
  const classes = useStyles();
  const [allBooks, setAllBooks] = useState([]);
  const [bookType, setBookType] = useState(true);
  const { id } = useParams();

  const folder = id !== "free" ? "!=" : "==";
// console.log(folder)

  // firebase functions
const firestore = firebase.firestore();
let fireData = firestore.collection('booktest');
// use effect
  useEffect(() => {
    fireData.where('bookType',`${folder}`,'free').onSnapshot((querySnapshot) => {
      let bookDetails = [];
      querySnapshot.docs.map((doc) => {
        console.log(doc.data());
        let dbField = doc.data();
        dbField["docId"] = doc.id;
        bookDetails.push(dbField);
      });
      setAllBooks(bookDetails);
      console.log(bookDetails)
    });
  }, [id]);

  return (
    <div className="add-video">
      <div className="toggle">
        <div>
          <Link to={`/book/free`} className={"to-link"}>
            <Button
              className={classes.togleBtn}
              variant="outlined"
              color="primary"
              onClick={() => {
                setBookType(true);
              }}
            >
              Free
            </Button>
          </Link>
          <Link to={`/book/paid`} className={"to-link"}>
            <Button
              className={classes.togleBtn}
              variant="outlined"
              color="primary"
              onClick={() => {
                setBookType(false);
              }}
            >
              Paid
            </Button>
          </Link>
        </div>
      </div>

      <div className="all-video">
        {allBooks.map((book) => (
          <BookCard
          bookInfo={book}
            docId={book.docId}
            videoType={book.type}
          />
        ))}
      </div>
      <AddBookModel />
    </div>
  );
}