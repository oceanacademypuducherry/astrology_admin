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
        snapshot.forEach((doc) => getData.push({ ...doc.data(), id: doc.id }));
        setData(getData);
        console.log(getData, "//////////////////////");
      });
  }, []);

  return (
    <>
      <MainCardDesign data={data} />
    </>
  );
}
