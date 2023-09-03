import React, { useEffect } from "react";
import styles from "./FeatureProducts.module.css";
import axios from "axios";

export default function FeatureProducts() {
  async function getProducts() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    console.log(data);
  }
  useEffect(() => {
    getProducts();
  }, []);




  return <div>FeatureProducts</div>; 
}
