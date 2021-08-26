import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import firebase from "../../firebaseConfig/fbConfig";
import EditVideo from "./EditVideo";
import DeleteVideo from "./DeleteVideo";

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

export default function MediaCard({
  videoInfo,
  // imageUrl,
  // title,
  // description,
  docId,
  videoType,
}) {
  const { title, description, videoImage, type } = videoInfo;
  const [allVideos, setAllVideos] = useState([]);
  const firestore = firebase.firestore();
  const storage = firebase.storage();

  // function getVideoData() {
  //   let dbVideos = [];
  //   firestore
  //     .collection("PaidVedios")
  //     .get()
  //     .then((response) => {
  //       response.docs.forEach((videoData) => {
  //         let dbField = videoData.data();
  //         dbField["docId"] = videoData.id;
  //         dbVideos.push(dbField);
  //       });
  //       setAllVideos([...allVideos, dbVideos]);
  //     })
  //     .catch((e) => {
  //       alert(e.message);
  //     });
  //   firestore
  //     .collection("youtubeVedios")
  //     .get()
  //     .then((response) => {
  //       let dbVideo = [];
  //       response.docs.forEach((videoData) => {
  //         let dbField = videoData.data();
  //         dbField["docId"] = videoData.id;
  //         dbVideos.push(dbField);
  //       });
  //       setAllVideos([...allVideos, dbVideos]);
  //     })
  //     .catch((e) => {
  //       alert(e.message);
  //     });
  // }

  // useEffect(() => {
  //   getVideoData();
  // }, []);

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={videoImage} title={title} />
        <CardContent className={classes.conten}>
          <Typography gutterBottom variant="h5" component="h2">
            {title.length < 55 ? title : `${title.slice(0, 55)}...`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description.length < 150
              ? description
              : `${description.slice(0, 170)}...`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <EditVideo videoInfo={videoInfo} docId={docId} videoType={videoType} />
        <DeleteVideo
          videoInfo={videoInfo}
          docId={docId}
          videoType={videoType}
        />
      </CardActions>
    </Card>
  );
}
