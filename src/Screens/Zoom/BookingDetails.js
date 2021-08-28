import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import { Typography } from '@material-ui/core'
import React from 'react'

function BookingDetails() {
    let { id } = useParams();
    console.log(id, "☻☻☻☻☻☻☻");
    return (
        <>
        <Typography> Welcome BookingDetails </Typography>   
        </>
    )
}

export default BookingDetails
