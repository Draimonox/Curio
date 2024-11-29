"use client";

import {
  Anchor,
  Button,
  Center,
  Divider,
  FileInput,
  Input,
  PasswordInput,
  Textarea,
  Title,
} from "@mantine/core";
import logo from "../../public/trimmies.png";
// import fallback from "./icon.ico";
import Image from "next/image";
// import { useEffect, useState } from "react";

function SignUp() {
  return (
    <>
      <Center style={{ padding: "20px" }}>
        <Image src={logo} alt="Logo" height={50} />
      </Center>
      <Center style={{ marginTop: "5vh" }}>
        <form
          style={{ width: "20%" }}
          //  onSubmit={handleRegister}
        >
          <div>
            <Title order={1}>Sign Up</Title>
            <Divider my="md" />
          </div>

          <FileInput
            variant="unstyled"
            size="md"
            radius="lg"
            label="Profile Picture"
            placeholder="Click Here"
            style={{ marginTop: "10px" }}
            // onChange={handleImageChange}
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
          <div style={{ position: "relative", marginBottom: "10px" }}>
            <Input
              variant="filled"
              size="lg"
              radius="xl"
              placeholder="Name"
              style={{ width: "100%", marginBottom: "10px" }}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
            />
            <div style={{ position: "relative", marginBottom: "10px" }}>
              <Input
                variant="filled"
                size="lg"
                radius="xl"
                placeholder="Username"
                style={{ width: "100%" }}
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
              />
              <span
                style={{
                  color: "red",
                  position: "absolute",
                  top: "50%",
                  right: "-20px",
                  transform: "translateY(-50%)",
                }}
              >
                *
              </span>
            </div>
          </div>
          <div style={{ position: "relative", marginBottom: "10px" }}>
            <Input
              variant="filled"
              size="lg"
              radius="xl"
              placeholder="Email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%" }}
            />
            <span
              style={{
                color: "red",
                position: "absolute",
                top: "50%",
                right: "-20px",
                transform: "translateY(-50%)",
              }}
            >
              *
            </span>
          </div>
          <div style={{ position: "relative", marginBottom: "10px" }}>
            <PasswordInput
              variant="filled"
              size="lg"
              radius="xl"
              placeholder="Password"
              style={{ width: "100%" }}
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
            />
            <span
              style={{
                color: "red",
                position: "absolute",
                top: "50%",
                right: "-20px",
                transform: "translateY(-50%)",
              }}
            >
              *
            </span>
          </div>
          <Textarea
            placeholder="Bio"
            label="Write something about yourself for others to see!"
            radius="xl"
            variant="filled"
            autosize
            maxLength={100}
            minRows={1}
            size="md"
            // value={bio}
            // onChange={(e) => setBio(e.target.value)}
            style={{ marginTop: "15px" }}
          />
          <Button
            variant="filled"
            size="lg"
            color="#B76E79"
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
