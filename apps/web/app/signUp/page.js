"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useForm, Controller } from "react-hook-form";
import { Button, Checkbox, Column, Form, Grid, TextInput } from "@carbon/react";
import { Tile } from "@carbon/react";
import "./signup.scss";
import Link from "next/link";
import { useOtp } from "../hooks/useOtp";
import { useSignUp } from "../hooks/useSignUp";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const { handleSubmit, control } = useForm();
  const signUp = useSignUp();
  const sendOtp = useOtp();

  const onSubmit = async (data) => {
    setEmail(data.email);
    await signUp.mutateAsync(data);
    if (signUp.isSuccess) {
      await sendOtp.mutateAsync({ email });
    } else {
      console.log("User registration failed");
    }
  };
  
  return (
    <>
      <Navbar />
      <Grid className="landing-page preview1Background signUp-grid" fullWidth>
        <Column className="form" md={4} lg={8} sm={4}>
          <Tile className="signUp-tile">
            <h1>Create Your Account</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Full Name is required" }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    id="name"
                    style={{ marginBottom: "25px", height: "48px" }}
                    // invalid={!!errors.fullname}
                    labelText="Full Name"
                    placeholder="Enter your fullname here"
                    onChange={(e) => {
                      field.onChange(e);
                      setEmail(e.target.value);
                    }}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    id="email"
                    style={{ marginBottom: "25px", height: "48px" }}
                    // invalid={!!errors.email}
                    labelText="Email"
                    placeholder="Enter your email here"
                  />
                )}
              />
              <br />
              <Button className="submit-btn" type="submit">
                Submit
              </Button>
              <Checkbox
                className="checkbox"
                labelText="By creating an account, you agree to the Terms and conditions and our Privacy Policy"
              />
            </Form>
          </Tile>
          <p style={{ marginLeft: "20px" }}>
            Already have an account? <Link href="/signIn">Sign In</Link>
          </p>
        </Column>
      </Grid>
    </>
  );
};

export default SignUp;
