import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { getAllProducts } from "../../api";

const Products = () => {
  const { currentUser } = JSON.parse(localStorage.getItem("user"));
  const { data, error, isError, isFetching, isFetched, isLoading, isSuccess } =
    useQuery("getProducts", () => getAllProducts(currentUser));

  const filteredData = useMemo(() => {
    const uniqueProductsMap =
      isFetched &&
      Object.keys(data.products).reduce(
        ({ keys, values }, product) => {
          console.log(product);
          const { linkedProducts, ...products } = data.products[product];
          console.log(linkedProducts, products);
          if (!keys[product]) {
            keys[product] = product;
            values.push({ id: product, ...products });
          }
          if (linkedProducts) {
            Object.keys(linkedProducts).forEach((item) => {
              if (!keys[item]) {
                keys[item] = item;
                values.push({ id: item, ...linkedProducts[item] });
              }
            });
          }
          return { keys, values };
        },
        { keys: [], values: [] }
      );

    return uniqueProductsMap.values;
  }, [data?.products]);

  console.log(filteredData.filter((item) => item.name === "Product name1"));

  return <div></div>;
};

export default Products;
