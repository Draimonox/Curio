"use client";
import {
  Anchor,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  PasswordInput,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/trimmies.png";
import { setCookie } from "cookies-next";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const lowerCaseUsername = username.toLowerCase();
    const lowerCasePassword = password.toLowerCase();
    try {
      const response = await fetch("/api/logIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: lowerCaseUsername,
          password: lowerCasePassword,
        }),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        window.location.href = "/home";
        console.log(data.token);
        setCookie("JWT", data.token, { maxAge: 3600 });
      }
    } catch {}
  }
  return (
    <>
      <Center style={{ padding: "20px" }}>
        <Image src={logo} alt="Logo" height={50} />
      </Center>
      <Center style={{ marginTop: "15vh" }}>
        <form style={{ width: "20%" }} onSubmit={handleLogin}>
          <Title order={1}>Log in</Title>
          <Divider my="md" />
          <Flex style={{ marginBottom: "10px" }} align="center" gap={10}>
            <Input
              variant="filled"
              size="lg"
              radius="xl"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "100%" }}
            />
            <span style={{ color: "red" }}>*</span>
          </Flex>
          <Flex align="center" gap={10} style={{ marginBottom: "10px" }}>
            <PasswordInput
              variant="filled"
              size="lg"
              radius="xl"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%" }}
            />
            <span style={{ color: "red" }}>*</span>
          </Flex>
          <Button
            variant="filled"
            size="lg"
            color="#5fd3dc"
            radius="xl"
            style={{ marginTop: "15px" }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </Button>
          <Divider
            my="xl"
            label={
              <Anchor href="/signup" target="_self" inherit>
                Sign up
              </Anchor>
            }
          />
        </form>
      </Center>
    </>
  );
}

export default LogIn;
