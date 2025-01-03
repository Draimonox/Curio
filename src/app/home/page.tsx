"use client";
import { hasCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { Center } from "@mantine/core";

function MainPage() {
  const [isAllowed, setIsAllowed] = useState(false);
  const [data, setData] = useState<{ id: number; body: string }[]>([]);

  const cookieCheck = hasCookie("JWT");
  useEffect(() => {
    if (!cookieCheck) {
      window.location.href = "/login";
    } else {
      setIsAllowed(true);
      const fetchData = async () => {
        try {
          const result = await fakeAPI();
          setData(result);
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
    }
  }, []);

  // FAKE API (https://jsonplaceholder.typicode.com/posts)

  async function fakeAPI() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  if (!isAllowed) {
    return null;
  }

  return (
    <>
      <Header />
      {data.map((post) => (
        <Center key={post.id}>
          <div style={{ width: "25vw", padding: "50px" }}>
            <h3>{post.id}</h3>
            <p>{post.body}</p>
          </div>
        </Center>
      ))}
    </>
  );
}

export default MainPage;
