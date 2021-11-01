import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../../firebaseConfig/fbConfig";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  CardActions,
  Grid,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    card: {
        width: 280,
        height: 300,
    },
    media: {
        height: 150,
        maxWidth: 300,
        boxShadow: "5px 5px #F5F5F5",
        backgroundColor: "#e6e6e6",
    },

    cardTitle: {
        fontSize: "18px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        height: "30px",
        color: "grey",
        fontWeight: "500",
    },

    cardDescription: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        height: "30px",
    },
    addArticle: {
        marginBottom: "20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    paper: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    inputRoot: {
        display: "flex",
        flexDirection: "row",
    },
    inputPaper: {
        padding: theme.spacing(5),
        maxWidth: 500,
    },
    image: {
        width: 200,
        height: 200,
    },
    img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function UnrestrictTime() {
    const [unRestrictTime, setUnrestrictTime] = useState([])
    const [currentId, setCurrentId] = useState("")
    const [confirmationAlert, setConfirmationAlert] = useState(false)
    const classes = useStyles()
    let monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    useEffect(() => {
        const db = firebase.firestore();
        return db.collection("booking").orderBy("time").onSnapshot((snapshot) => {
            const getRestrictTime = [];
            snapshot.forEach((doc) => {
                var seconds = new Date().getTime() / 1000;
                seconds = Math.ceil(seconds)
                if (doc.data().userName === "Restricted Time" && doc.data().time.seconds >= seconds) {
                    console.log(doc.id);
                    getRestrictTime.push({ ...doc.data(), id: doc.id })
                }
            });
            setUnrestrictTime(getRestrictTime)
            console.log(getRestrictTime, "getRestrictTime");
        })
    }, [])


    const unRestrict = (id) => {
        setCurrentId(id);
        setConfirmationAlert(true);
    };

    const unRestrictAlert = () => {
        const db = firebase.firestore();
        db.collection("booking").doc(currentId).delete();
        setCurrentId();
        setConfirmationAlert(false);
      };



    return (
        <div>
            {/* alert delete */}
            <Dialog
                open={confirmationAlert}
                onClose={() => setConfirmationAlert(false)}
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle>Are you sure want to Release</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className={classes.root}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Button
                                        onClick={() => setConfirmationAlert(false)}
                                        variant="outlined"
                                        style={{
                                            background: "#1F6DE2",
                                            width: "13%",
                                            height: "55px",
                                            color: "white",
                                            marginLeft: "25px",
                                        }}
                                    >
                                        NO
                                    </Button>

                                    <Button
                                        onClick={unRestrictAlert}
                                        variant="contained"
                                        style={{
                                            backgroundColor: "rgba(255, 0, 0, 0.8)",
                                            marginLeft: "60px",
                                            width: "13%",
                                            height: "55px",
                                            color: "white",
                                        }}
                                    >
                                        Yes
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>




            {/* article Design start */}
            <Grid container direction="row" justifyContent="flex-start" spacing={10}>
                {/* {JSON.stringify(data)} */}
                {unRestrictTime.map((item, index) => (
                    <Grid item key={index}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={item.jadhagam}
                                />
                                {/* <img  style={{height: "80px", width: "80px", borderRadius: "200px"}} src={item.profile} /> */}
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                        className={classes.cardTitle}
                                    >
                                        Restricted Time
                                    </Typography>
                                    <p
                                        variant="subtitle2"
                                        color="textSecondary"
                                        style={{
                                            marginTop: "0px",
                                            marginBottom: "0px",
                                            color: "grey",
                                            fontFamily: "Ubuntu",
                                        }}
                                    >
                                        {`${item.time.toDate().getDate()} ${monthNames[item.time.toDate().getMonth()]
                                            }  
                    ${item.time.toDate().getFullYear()}  
                    ${item.time.toDate().getHours() % 12 || 12}:${item.time
                                                .toDate()
                                                .getMinutes()}
                    ${item.time.toDate().getHours() >= 12 ? "PM" : "AM"}
                  `}
                                    </p>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button
                                    onClick={unRestrict.bind(this, item.id)}
                                    style={{ width: "100%" }}
                                    variant="outlined"
                                    color="primary">
                                    Release this Time
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}


