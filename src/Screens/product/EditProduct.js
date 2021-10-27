import React, { useEffect, useState } from "react";
import firebase from "../../firebaseConfig/fbConfig";
import { useParams } from "react-router";
import "./editProduct.css";
import StarRatings from "react-star-ratings";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CancelIcon from "@material-ui/icons/Cancel";

export default function EditProduct() {
  let { docId } = useParams();
  const firestore = firebase.firestore();
  const storage = firebase.storage();
  const productData = firestore.collection("Products").doc(docId).get();
  const [loadImage, setLoadImage] = useState(0);
  const [getDataDb, setGetDataDb] = useState(true);
  const [rating, setRating] = useState(5.0);
  const [product, setProduct] = useState({
    productDescription: "",
    productDisplayImage: null,
    productName: "",
    productPrice: null,
    productRating: 5,
    discount: 0,
  });
  function getItemData() {
    const productData = firestore.collection("Products").doc(docId).get();
    productData
      .then((response) => {
        let responseData = response.data();
        setProduct({
          ...product,
          productDescription: responseData.productDescription,
          productDisplayImage: responseData.productDisplayImage,
          productName: responseData.productName,
          productPrice: responseData.productPrice,
          productRating: responseData.productRating,
          discount: responseData.discount,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function uploadImage(e) {
    setLoadImage(0);
    setProduct({
      ...product,
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
            setProduct({
              ...product,
              productDisplayImage: imageUrl,
            });
          });
      }
    );
  }
  function ratingController(e) {
    setRating(e.target.value);
    setProduct({ ...product, productRating: e.target.value * 0.5 });
  }
  function inputFiledHandler(e) {
    const { name, value } = e.target;
    if (name === "productPrice" || name === "discount") {
      setProduct({ ...product, [name]: parseInt(value) });
    } else {
      setProduct({ ...product, [name]: value });
    }
  }
  function submitFunction() {
    console.log(product);
    firestore
      .collection("Products")
      .doc(docId)
      .set(product)
      .then((response) => {
        window.location.href = "/seeAll/products";
      })
      .catch((e) => {
        console.log(e);
      });

    document.getElementById("editFile").value = null;

    setLoadImage(0);
  }
  useEffect(() => {
    if (getDataDb) {
      getItemData();
      setGetDataDb(false);
    }
  }, [product, loadImage]);
  return (
    <div className="editProduct">
      <div className="edit-inputs">
        <label className="pl">Choose Product Image</label>
        <input type="file" id="editFile" onChange={uploadImage} />
        <hr />
        <label className="pl">Product Name</label>
        <div className="p-text-inp">
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={product.productName}
            onChange={inputFiledHandler}
          />
        </div>
        <hr />
        <label className="pl">Product Description</label>
        <div className="p-text-inp">
          <textarea
            type="text"
            style={{ height: 150 }}
            name="productDescription"
            placeholder="Description"
            value={product.productDescription}
            onChange={inputFiledHandler}
          />
        </div>
        <hr />
        <label className="pl">Product Price</label>
        <div className="p-text-inp">
          <input
            type="number"
            name="productPrice"
            placeholder="Price"
            value={product.productPrice}
            onChange={inputFiledHandler}
          />
        </div>
        <hr />
        <label className="pl">Discount</label>
        <div className="p-text-inp">
          <input
            min="0"
            type="number"
            name="discount"
            placeholder="discount"
            value={product.discount}
            onChange={inputFiledHandler}
          />
        </div>
        <hr />
        <label className="pl">Product Rating</label>
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
      <div className="edit-output">
        <p>
          Note: Product Image size <b>200 x 200</b>
        </p>
        <div
          className="eo-img"
          onClick={() => {
            const filePicker = document.getElementById("editFile");
            filePicker.click();
          }}
        >
          <img src={product.productDisplayImage} alt="" />
        </div>
        <div className="eo-title">{product.productName}</div>
        <hr />
        <div className="eo-dec">{product.productDescription}</div>

        <div className="r-p">
          <span className="rating-value">
            <StarRatings
              rating={product.productRating}
              starDimension="25px"
              starSpacing="5px"
              starRatedColor="#f76342"
            />
          </span>
          <span>
            <div className="price">
              ₹
              {(
                product.productPrice -
                (product.discount * product.productPrice) / 100
              ).toFixed(2)}
            </div>
            {product.discount > 0 && (
              <div>
                <span className="price total"> ₹{product.productPrice} </span>
                <span
                  className="price total"
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  {`(${product.discount}%  off)`}
                </span>
              </div>
            )}
          </span>
        </div>
        <button className="add-to-cart" onClick={submitFunction}>
          <ShoppingCartIcon fontSize="large" style={{ marginRight: 10 }} />
          Update
        </button>
        <button
          className="add-to-cart remove"
          onClick={() => {
            document.getElementById("editFile").value = null;
            setLoadImage(0);
            window.location.href = "/seeAll/products";
          }}
        >
          <CancelIcon fontSize="large" style={{ marginRight: 10 }} /> Cancel
        </button>
      </div>
    </div>
  );
}
