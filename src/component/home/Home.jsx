import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
const Home = () => {
  const [state, setState] = useState([]);
  const [read, setRead] = useState(true);
  const [data, setData] = useState();
  const [sorts, setSorts] = useState();
  const getApi = async () => {
    const res = await axios.get("https://dummyjson.com/products");
    setState(res?.data?.products);
  };
  const show = (id) => {
    setRead(!read);
    setData(id);
  };
  const sorting = (key) => {
    const sortedState = [...state];
    sortedState.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    setState(sortedState);
  };
  useEffect(() => {
    getApi();
  }, []);
  return (
    <div>
      <table border={1}>
        <tr>
          <th>
            <span>Serial no.</span>
            <span onClick={() => sorting("id")}>🔃</span>
          </th>
          <th>
            <span>Brand</span>
            <span onClick={() => sorting("brand")}>🔃</span>
          </th>
          <th>
            <span>Category</span>
            <span onClick={() => sorting("category")}>🔃</span>
          </th>
          <th>
            <span>Price</span>
            <span onClick={() => sorting("price")}>🔃</span>
          </th>
          <th>
            <span>Description</span>
            <span onClick={() => sorting("description")}>🔃</span>
          </th>
          <th>
            <span>More</span>
          </th>
        </tr>
        {state?.map((elem) => {
          const { id, brand, category, price, description } = elem;
          return (
            <>
              <tr>
                <td>{id}</td>
                <td>{brand}</td>
                <td>{category}</td>
                <td> 💲 {price}</td>

                <td>
                  {read == true && data == id ? (
                    <div
                      style={{
                        width: "15rem",
                      }}
                    >
                      {description}
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "15rem",
                        overflow: "hidden",
                        height: "1rem",
                      }}
                    >
                      {description}
                    </div>
                  )}
                </td>
                <td>
                  <button
                    style={{ background: "red" }}
                    onClick={() => show(id)}
                  >
                    {read == true && data == id ? "Read less" : "Read more"}
                  </button>
                </td>
              </tr>
            </>
          );
        })}
      </table>
    </div>
  );
};

export default Home;
