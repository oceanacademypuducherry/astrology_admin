import React, { useEffect, useState } from "react";
import firebase from "../../firebaseConfig/fbConfig";
import MainCardDesign from "./MainCardDesign";

export default function Zoom() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    return db
      .collection("booking")
      .orderBy("time")
      .onSnapshot((snapshot) => {
        const getData = [];
        // console.log(Date.now());
        snapshot.forEach((doc) => 
        // console.log(doc.data().time, "////////time"),
        getData.push({ ...doc.data(), id: doc.id }),
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
