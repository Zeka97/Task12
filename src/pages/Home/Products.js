import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getAllProducts } from "../../api";
import Input from "../../components/Input/Input";

const Products = () => {
  const [limit, setLimit] = useState(10);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(null);
  const [optionsArray, setOptionsArray] = useState([]);

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

  useEffect(() => {
    setNumberOfPages(filteredData?.length / limit);
  }, [filteredData?.length, limit]);
  useEffect(() => {
    setOptionsArray((prevState) => {
      const array = [];
      for (let i = 1; i <= numberOfPages; i++) {
        array.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
      return array;
    });
  }, [numberOfPages]);

  console.log("filtereddata:", filteredData);
  console.log("number of pages", numberOfPages);
  console.log(optionsArray);

  console.log(name, price);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-around">
        <Input
          label="Name"
          type="text"
          name="name"
          onChange={(e) => setName(e)}
        />
        <Input
          label="Price"
          type="number"
          name="price"
          onChange={(e) => setPrice(e)}
        />
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Product Table</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredData
              ?.filter((item, index) => {
                const regex = new RegExp(`.*${name}.+|${name}`);
                var matchesRegexName = regex.test(item.name);
                const regex2 = new RegExp(`^${price}.+|^${price}$`);
                var matchesRegexPrice = regex2.test(item.price);
                console.log(matchesRegexPrice);
                return matchesRegexName && matchesRegexPrice;
              })
              .filter((item, index, array) => {
                return index < limit;
              })
              .map((product, index) => (
                <tr key={product.id}>
                  <td className="py-2 px-4 border-b">{product.id}</td>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.price}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex justify-between">
          <select onChange={(e) => setLimit(e.target.value)}>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <select onChange={(e) => setPage(e.target.value)}>
            {optionsArray}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Products;
