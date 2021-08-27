import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import firebase from "../../firebaseConfig/fbConfig";
// import EditVideo from "./EditVideo";
// import DeleteVideo from "./DeleteVideo";

import DeleteBook from './DeleteBook'
import EditBook from './EditBook'

const useStyles = makeStyles({
  root: {
    width: 345,
    margin: 10,
  },
  media: {
    height: 190,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  conten: {
    height: 170,
  },
});

export default function BookCard({
    bookInfo,
  docId,
  bookType,
}) {
  const { bookName,authorName,image,pdfLink, description} = bookInfo;


 
 
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() => {
          alert("card clicked");
        }}
      >
        <CardMedia className={classes.media} image={image} title={bookName} />
        <CardContent className={classes.conten}>
          <Typography gutterBottom variant="h5" component="h2">
            {bookName.length < 55 ? bookName : `${bookName.slice(0, 55)}...`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description.length < 150
              ? description
              : `${description.slice(0, 170)}...`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <EditBook bookInfo={bookInfo} docId={docId} bookType={bookType} />
        <DeleteBook
          bookInfo={bookInfo}
          docId={docId}
          bookType={bookType}
        />
      </CardActions>
    </Card>
  );
}