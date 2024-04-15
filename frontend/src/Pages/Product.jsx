import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext.jsx";
import Breadcrum from "../Components/Breadcrums/Breadcrum.jsx";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay.jsx";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox.jsx";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  const product = all_product.find((e) => e.id === Number(productId));

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
    </div>
  );
};

export default Product;
