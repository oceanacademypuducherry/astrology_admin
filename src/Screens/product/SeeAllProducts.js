import React, { useState, useEffect } from "react";
import firebase from "../../firebaseConfig/fbConfig";
import ProductCard from "./ProductCard";
import "./productCard.css";
import { Link } from "react-router-dom";

export default function SeeAllProducts() {
  const firestore = firebase.firestore();
  const [products, setProducts] = useState([]);

  function souldOut(docId) {
    firestore.collection("Products").doc(docId).update({ stocks: 0 });
  }

  // function getProductsData() {
  //   const dbData = firestore.collection("Products");
  //   let productDatas = [];
  //   dbData.onSnapshot((querySnapshot) => {
  //     querySnapshot.docs.map((item) => {
  //       let fieldData = item.data();
  //       fieldData["docId"] = item.id;
  //       productDatas.push(fieldData);
  //     });
  //     setProducts(productDatas);
  //   });
  // }
  const dbData = firestore.collection("Products");
  useEffect(() => {
    let productDatas = [];
    dbData.onSnapshot((querySnapshot) => {
      querySnapshot.docs.map((item) => {
        let fieldData = item.data();
        fieldData["docId"] = item.id;
        productDatas.push(fieldData);
      });
      setProducts(productDatas);
    });
  });
  return (
    <div className="product">
      <Link to="/add/product" className="to-link">
        <button className="add-btn">Add Product</button>
      </Link>
      <div className="all-products">
        {products.map((item) => (
          <ProductCard product={item} />
        ))}
      </div>
    </div>
  );
}
