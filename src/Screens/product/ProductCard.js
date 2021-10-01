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
            starDimension="20px"
            starSpacing="5px"
            starRatedColor="#f76342"
          />
          <h4>₹ {product.productPrice}</h4>
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
