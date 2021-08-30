import React from "react";

export default function Product() {
  return (
    <div className="wrapper">
      <form>
        <label>
          <input name="name" placeholder="Product Name" />
        </label>
        <br />
        <label>
          <input name="name" placeholder="Product Price" />
        </label>
        <br />
        <label>
          <input name="img" type="file" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
