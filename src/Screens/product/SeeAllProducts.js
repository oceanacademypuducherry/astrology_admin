import React, { useState, useEffect } from "react";
import firebase from "../../firebaseConfig/fbConfig";
import ProductCard from "./ProductCard";
import "./productCard.css";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import StarRatings from "react-star-ratings";

export default function SeeAllProducts() {
  const firestore = firebase.firestore();
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(true);

  function souldOut(docId) {
    firestore.collection("Products").doc(docId).update({ stocks: 0 });
    setEdit(!edit);
  }

  function deleteProduct(docId) {
    firestore.collection("Products").doc(docId).delete();
    setEdit(!edit);
  }
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
  }, [edit]);
  // * continue
  return (
    <div className="product">
      <Link to="/add/product" className="to-link">
        <button className="add-btn">Add Product</button>
      </Link>
      <div className="all-products">
        {products.map((item) => (
          <div className="product-scale">
            <div
              className="product-card"
              style={{ opacity: item.stocks < 1 ? 0.5 : 1 }}
            >
              <div className="pc-image">
                <img src={item.productDisplayImage} alt="" />
              </div>
              <div className="product-title">
                {item.productName.slice(0, 40)}...
              </div>
              <div className="product-description">
                {item.productDescription.slice(0, 100)}...
              </div>
              <div className="p-r-p">
                <StarRatings
                  rating={item.productRating}
                  starDimension="15px"
                  starSpacing="3px"
                  starRatedColor="#f76342"
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start",
                    margin: "10px 0",
                  }}
                >
                  <h4 style={{ margin: 0 }}>
                    ₹
                    {(
                      item.productPrice -
                      (item.productPrice * item.discount) / 100
                    ).toFixed(2)}
                  </h4>
                  {item.discount > 0 ? (
                    <p
                      style={{
                        margin: 0,
                        color: "rgb(243, 54, 54)",
                        fontSize: 12,
                      }}
                    >
                      <span style={{ textDecoration: "line-through" }}>
                        ₹ {item.productPrice}
                      </span>
                      <span>{`(${item.discount}% off)`}</span>
                    </p>
                  ) : (
                    <p
                      style={{
                        margin: 0,
                        color: "rgb(243, 54, 54)",
                        fontSize: 12,
                      }}
                    >
                      No offer
                    </p>
                  )}
                </div>
              </div>
              <div className="p-buttons">
                <Link
                  className="product-button"
                  to={`/edit/products/${item.docId}`}
                >
                  <div className="edit-product ">Edit</div>
                </Link>
                <button
                  className="delete-product product-button"
                  onClick={() => souldOut(item.docId)}
                >
                  Stock ({item.stocks})
                </button>
              </div>

              <div onClick={() => deleteProduct(item.docId)} className="trash">
                <DeleteIcon style={{ color: "white" }} />{" "}
                <p style={{ color: "white", fontSize: 16 }}>Delete Item</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
