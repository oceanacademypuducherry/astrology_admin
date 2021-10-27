import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import firebase from "../../firebaseConfig/fbConfig";

export default function ProductCard({ product }) {
  const firestore = firebase.firestore();
  function deleteProduct() {
    firestore.collection("Products").doc(product.docId).delete();
  }

  return (
    <div className="product-scale">
      <div className="product-card">
        <div className="pc-image">
          <img src={product.productDisplayImage} alt="" />
        </div>
        <div className="product-title">
          {product.productName.slice(0, 40)}...
        </div>
        <div className="product-description">
          {product.productDescription.slice(0, 100)}...
        </div>
        <div className="p-r-p">
          <StarRatings
            rating={product.productRating}
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
                product.productPrice -
                (product.productPrice * product.discount) / 100
              ).toFixed(2)}
            </h4>
            {product.discount > 0 ? (
              <p style={{ margin: 0, color: "rgb(243, 54, 54)", fontSize: 12 }}>
                <span style={{ textDecoration: "line-through" }}>
                  ₹ {product.productPrice}
                </span>
                <span>{`(${product.discount}% off)`}</span>
              </p>
            ) : (
              <p style={{ margin: 0, color: "rgb(243, 54, 54)", fontSize: 12 }}>
                No offer
              </p>
            )}
          </div>
        </div>
        <div className="p-buttons">
          <Link
            className="product-button"
            to={`/edit/products/${product.docId}`}
          >
            <div className="edit-product ">Edit</div>
          </Link>
          <button
            className="delete-product product-button"
            onClick={deleteProduct}
          >
            Sold Out
          </button>
        </div>
      </div>
    </div>
  );
}
