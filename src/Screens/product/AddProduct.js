import React, { useState, useEffect } from "react";
import "./product.css";
import firebase from "../../firebaseConfig/fbConfig";
import StarRatings from "react-star-ratings";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CancelIcon from "@material-ui/icons/Cancel";

export default function AddProduct() {
  const storage = firebase.storage();
  const firestore = firebase.firestore();
  const [rating, setRating] = useState(5.0);
  const [loadImage, setLoadImage] = useState(0);
  const [validator, setValidator] = useState(false);

  const [productDetails, setProductDetails] = useState({
    productDescription: "",
    productDisplayImage: null,
    productName: "",
    productPrice: null,
    productRating: rating * 0.5,
  });

  // function imagePicker(e) {
  //   console.log(e.target.files[0]);
  //   setLocalImage(e.target.files[0]);
  // }

  function uploadImage(e) {
    setLoadImage(0);
    setProductDetails({
      ...productDetails,
      productDisplayImage: null,
    });

    const uploadTask = storage
      .ref(`allProduct/${e.target.files[0].name}`)
      .put(e.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
        setLoadImage(progress);
      },
      (error) => {
        alert(error.message);
      },

      () => {
        storage
          .ref("allProduct")
          .child(e.target.files[0].name)
          .getDownloadURL()
          .then((imageUrl) => {
            console.log(imageUrl);
            setProductDetails({
              ...productDetails,
              productDisplayImage: imageUrl,
            });
          });
      }
    );
  }

  function ratingController(e) {
    setRating(e.target.value);
  }
  function inputFiledHandler(e) {
    const { name, value } = e.target;
    if (name === "productPrice") {
      setProductDetails({ ...productDetails, productPrice: parseInt(value) });
    } else {
      setProductDetails({ ...productDetails, [name]: value });
    }
  }
  function submitFunction() {
    if (validator || productDetails.productDisplayImage === null) {
      alert("Field is empty");
    } else {
      console.log(productDetails);
      firestore.collection("Products").add(productDetails);

      setProductDetails({
        productDescription: "",
        productDisplayImage: null,
        productName: "",
        productPrice: 0,
        productRating: rating * 0.5,
      });
      document.getElementById("filePicker").value = null;
      setRating(5);
      setLoadImage(0);
    }
  }

  useEffect(() => {
    setValidator(
      Object.keys(productDetails).some(function (i) {
        return productDetails[i] === "";
      })
    );

    return () => {
      console.log("product clean up");
    };
  }, [productDetails, loadImage]);
  return (
    <div className="add-product">
      <div className="product-field">
        <div className="p-text-inp">
          <input
            type="file"
            id="filePicker"
            accept="image/*"
            name="productDisplayImage"
            // onChange={imagePicker}
            onChange={uploadImage}
          />
        </div>
        <div className="p-text-inp">
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={productDetails.productName}
            onChange={inputFiledHandler}
          />
        </div>
        <div className="p-text-inp">
          <textarea
            type="text"
            name="productDescription"
            placeholder="Description"
            value={productDetails.productDescription}
            onChange={inputFiledHandler}
          />
        </div>
        <div className="p-text-inp">
          <input
            type="number"
            name="productPrice"
            placeholder="Price"
            value={productDetails.productPrice}
            onChange={inputFiledHandler}
          />
        </div>

        <div className="p-text-inp">
          <span>Set Rating</span>
          <input
            className="slider"
            type="range"
            min="1"
            max="10"
            value={rating}
            onChange={ratingController}
          />
        </div>
      </div>
      <div className="viewProduct">
        <div
          className="p-img"
          onClick={() => {
            const filePicker = document.getElementById("filePicker");
            filePicker.click();
          }}
        >
          {productDetails.productDisplayImage !== null ? (
            <img
              src={productDetails.productDisplayImage}
              width="100%"
              height="100%"
              alt=""
            />
          ) : loadImage === 0 ? (
            <span>Upload Image</span>
          ) : (
            <span>{loadImage}% Completed</span>
          )}
        </div>
        <div className="p-title">{productDetails.productName}</div>
        <div className="r-p">
          <span className="rating-value">
            <StarRatings
              rating={rating * 0.5}
              starDimension="25px"
              starSpacing="5px"
              starRatedColor="#f76342"
            />
          </span>
          <span className="price">Rs. {productDetails.productPrice}</span>
        </div>
        <div className="p-d">{productDetails.productDescription}</div>

        <button className="add-to-cart" onClick={submitFunction}>
          <ShoppingCartIcon fontSize="large" style={{ marginRight: 10 }} />
          Add to Cart
        </button>
        <button
          className="add-to-cart remove"
          onClick={() => {
            setProductDetails({
              productDescription: "",
              productDisplayImage: null,
              productName: "",
              productPrice: 0,
              productRating: rating * 0.5,
            });
            document.getElementById("filePicker").value = null;
            setRating(5);
            setLoadImage(0);
          }}
        >
          <CancelIcon fontSize="large" style={{ marginRight: 10 }} /> Cancel
        </button>
      </div>
    </div>
  );
}