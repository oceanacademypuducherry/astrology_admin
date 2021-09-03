import React from "react";
import { Link } from "react-router-dom";

export default function Product() {
  return (
    <div>
      <Link to="add/product">
        <button>Add Product</button>
      </Link>
    </div>
  );
}
