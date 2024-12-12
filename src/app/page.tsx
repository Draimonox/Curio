"use client";
import { useState } from "react";
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
  Text,
} from "@mantine/core";
import logo from "../../public/trimmies.png";
// import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import Image from "next/image";
// import user from "../../public/user.png";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [image, setImage] = useState<string>("");
  // const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const router = useRouter();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleRegister(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !username || !password) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    const lowerCaseUsername = username.toLowerCase();
    const lowerCaseEmail = email.toLowerCase();

    try {
      const response = await fetch("/api/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: lowerCaseEmail,
          username: lowerCaseUsername,
          password: password,
          // image: image,
        }),
      });

      if (response.ok) {
        alert("Account created successfully");
        // router.push("/login");
      } else {
        const data = await response.json();
        setError(data.error || "An error occurred while creating your account");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while creating your account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Center style={{ padding: "20px" }}>
        <Image src={logo} alt="Logo" height={50} />
      </Center>
      <Center style={{ marginTop: "10vh" }}>
        <form style={{ width: "20%" }} onSubmit={handleRegister}>
          <Title order={1}>Sign up</Title>
          <Divider my="md" />

          <FileInput
            variant="unstyled"
            size="md"
            radius="lg"
            label="Profile picture"
            placeholder="Click here"
            style={{ marginTop: "10px", maxWidth: "150px" }}
            // onChange={(file) => {
            //   if (!file) setImage(user);
            //   else setImage(file);
            // }}
          />

          {error && <Text color="red">{error}</Text>}

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
            <Tooltip label="You will not be able to change your username as we are in beta">
              <p>?</p>
            </Tooltip>
            <span style={{ color: "red" }}>*</span>
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
            {loading ? "Registering..." : "Register"}
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
