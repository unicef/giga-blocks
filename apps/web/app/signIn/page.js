"use client";
import React from "react";
import Navbar from "../components/navbar";
import { Button, Checkbox, Column, Form, Grid, TextInput } from "@carbon/react";
import { Tile } from "@carbon/react";
import Link from "next/link";
import "./signIn.scss";

const SignUp = () => {
  return (
    <>
      <Navbar />
      <Grid className="landing-page preview1Background signUp-grid" fullWidth>
        <Column className="form" md={4} lg={8} sm={4}>
          <Tile className="signUp-tile">
            <h1>Sign In To Your Account</h1>
            <Form>
              <TextInput
                id="Your registered email address"
                name="email"
                style={{ marginBottom: "25px", height: "48px" }}
                invalidText="Invalid error message."
                labelText="Email"
                placeholder="Enter you email here"
              />
              <br />
              <Button className="submit-btn" type="submit">
                Submit
              </Button>
              <Checkbox className="checkbox" labelText="Remember ID" />
            </Form>
          </Tile>
          <p style={{ marginLeft: "20px" }}>
            Dont have an account ?{" "}
            <Link className="link" href={"/signUp"}>
              {" "}
              Sign Up
            </Link>
          </p>
        </Column>
      </Grid>
    </>
  );
};

export default SignUp;
