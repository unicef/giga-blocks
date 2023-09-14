"use client";
import React from "react";
import Navbar from "../components/navbar";
import { Button, Checkbox, Column, Form, Grid, TextInput } from "@carbon/react";
import { Tile } from "@carbon/react";
import Link from "next/link";
import "./otp.scss";

const SignUp = () => {
  return (
    <>
      <Navbar />
      <Grid className="landing-page preview1Background signUp-grid" fullWidth>
        <Column className="form" md={4} lg={8} sm={4}>
          <Tile className="signUp-tile">
            <h1>OTP Verification</h1>
            <Form>
              <TextInput
                id="Your registered email address"
                name="email"
                style={{ marginBottom: "25px", height: "48px" }}
                invalidText="Invalid error message."
                labelText="We have just sent a verification code to your email address"
                placeholder="Enter verification code"
              />
              <br />
              <Button className="submit-btn" type="submit">
                Submit
              </Button>
            </Form>
          </Tile>
        </Column>
      </Grid>
    </>
  );
};

export default SignUp;
