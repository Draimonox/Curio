"use client";
import { hasCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

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

  if (!isAllowed) {
    return null;
  }

  return (
    <>
      <div>Hellow World</div>;
    </>
  );
}

export default MainPage;
