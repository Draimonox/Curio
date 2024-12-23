"use client";
import { hasCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import Header from "../components/header";

function MainPage() {
  const [isAllowed, setIsAllowed] = useState(false);
  const cookieCheck = hasCookie("JWT");

  useEffect(() => {
    if (!cookieCheck) {
      window.location.href = "/login";
    } else {
      setIsAllowed(true);
    }
  }, []);

  // FAKE API (https://jsonplaceholder.typicode.com/posts)

  if (!isAllowed) {
    return null;
  }

  return (
    <>
      <Header />
      <div>Hellow World</div>
    </>
  );
}

export default MainPage;
