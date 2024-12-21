"use client";
import { hasCookie } from "cookies-next";
import React, { useEffect } from "react";

function MainPage() {
  const cookieCheck = hasCookie("JWT");

  useEffect(() => {
    if (!cookieCheck) {
      window.location.href = "/login";
    }
  });
  return <div>Hellow World</div>;
}

export default MainPage;
