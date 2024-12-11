"use client";

import {
  Anchor,
  Button,
  Center,
  Divider,
  FileInput,
  Flex,
  Input,
  PasswordInput,
  Title,
  Tooltip,
} from "@mantine/core";
import logo from "../../public/trimmies.png";
import Image from "next/image";
// import { useEffect, useState } from "react";
import { ChangeEvent, useState } from "react";
import user from "../../public/user.png";
import { StaticImageData } from "next/image";
import { setCookie } from "cookies-next";

//
function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [image, setImage] = useState<File | StaticImageData | null>(null);
  // const [bio, setBio] = useState("");

  // Check if email is valid
  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  // Handling the upload of user info to Database
  async function handleRegister(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !username || !password) {
      alert("Please fill in all required fields");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    //
    const lowerCaseUsername = username.toLowerCase();
    const lowerCaseEmail = email.toLowerCase();
    try {
      const response = await fetch("/api/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: lowerCaseEmail,
          username: lowerCaseUsername,
          password,
          image,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setCookie("token", data.token);
        alert("Account created successfully");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating your account");
    }
  }

  return (
    <>
      <Center style={{ padding: "20px" }}>
        <Image src={logo} alt="Logo" height={50} />
      </Center>
      <Center style={{ marginTop: "10vh" }}>
        <form style={{ width: "20%" }} onSubmit={handleRegister}>
          <div>
            <Title order={1}>Sign up</Title>
            <Divider my="md" />
          </div>

          <FileInput
            variant="unstyled"
            size="md"
            radius="lg"
            label="Profile picture"
            placeholder="Click here"
            style={{ marginTop: "10px" }}
            onChange={(file) => {
              if (!file) {
                setImage(user);
                console.log(image);
              } else {
                setImage(file);
              }
            }}
          />
          <Center>
            {/* {url && (
              <>
                <Image
                  src={url}
                  alt="Profile Preview"
                  width={100}
                  height={100}
                  style={{ marginBottom: "15px" }}
                />
                <Button
                  variant="transparent"
                  color="red"
                  radius="xl"
                  onClick={handleRemoveImage}
                >
                  x
                </Button>
              </>
            )} */}
          </Center>

          <Flex
            style={{ marginBottom: "10px" }}
            align="center"
            gap={10}
            // justify="center"
          >
            <Input
              variant="filled"
              size="lg"
              radius="xl"
              placeholder="Username"
              style={{ width: "100%" }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Tooltip label="You will not be able to change your username as we are in beta">
              <p>?</p>
            </Tooltip>
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </Flex>

          <Flex align="center" gap={10} style={{ marginBottom: "10px" }}>
            <Input
              variant="filled"
              size="lg"
              radius="xl"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%" }}
            />
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </Flex>
          <Flex
            align="center"
            gap={10}
            style={{ position: "relative", marginBottom: "10px" }}
          >
            <PasswordInput
              variant="filled"
              size="lg"
              radius="xl"
              placeholder="Password"
              style={{ width: "100%" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </Flex>

          <Button
            variant="filled"
            size="lg"
            color="#5fd3dc"
            radius="xl"
            style={{ marginTop: "15px" }}
            type="submit"
          >
            Register
          </Button>
          <Divider
            my="xl"
            label={
              <Anchor href="/login" target="_self" inherit>
                Login
              </Anchor>
            }
          />
        </form>
      </Center>
    </>
  );
}

export default SignUp;
