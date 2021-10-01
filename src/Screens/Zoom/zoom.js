import React, { useEffect, useState } from "react";
import firebase from "../../firebaseConfig/fbConfig";
import MainCardDesign from "./MainCardDesign";

export default function Zoom() {
  const [data, setData] = useState([]);
  // const [bookedTime, setBookedTime] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    return db
      .collection("booking")
      .orderBy("time")
      .onSnapshot((snapshot) => {
        const getData = [];
        // const getBookingTime = [];
        snapshot.forEach((doc) => 
        getData.push({ ...doc.data(), id: doc.id }),
        // getBookingTime.push({ ...doc.data().time}),
        );
        setData(getData);
      });
  }, []);

  return (
    <>
      <MainCardDesign data={data} />
    </>
  );
}
