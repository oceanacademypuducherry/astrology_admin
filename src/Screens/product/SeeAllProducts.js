import React, { useState, useEffect } from "react";
import firebase from "../../firebaseConfig/fbConfig";
import ProductCard from "./ProductCard";
import "./productCard.css";
import { Link } from "react-router-dom";

export default function SeeAllProducts() {
  const firestore = firebase.firestore();
  const [products, setProducts] = useState([]);

  function getProductsData() {
    const dbData = firestore.collection("Products");
    let productDatas = [];
    dbData.onSnapshot((querySnapshot) => {
      querySnapshot.docs.map((item) => {
        let fieldData = item.data();
        fieldData["docId"] = item.id;
        productDatas.push(fieldData);
      });
      setProducts(productDatas);
    });
  }

  useEffect(() => {
    const dbData = firestore.collection("Products");
    let productDatas = [];
    dbData.onSnapshot((querySnapshot) => {
      querySnapshot.docs.map((item) => {
        let fieldData = item.data();
        fieldData["docId"] = item.id;
        productDatas.push(fieldData);
      });
      setProducts(productDatas);
    });
  }, [products]);
  return (
    <div className="product">
      <Link to="/add/product" className="to-link">
        <button className="add-btn">Add Product</button>
      </Link>
      <div className="all-products">
        {products.map((item) => (
          <ProductCard
            productName={item.productName}
            productDescription={item.productDescription}
            productDisplayImage={item.productDisplayImage}
            productPrice={item.productPrice}
            productRating={item.productRating}
            docId={item.docId}
            product={item}
          />
        ))}
      </div>
    </div>
  );
}
