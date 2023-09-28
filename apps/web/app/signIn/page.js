"use client";
import React, {useState} from "react";
import Navbar from "../components/navbar";
import { Button, Checkbox, Column, Form, Grid, TextInput } from "@carbon/react";
import { Tile } from "@carbon/react";
import Link from "next/link";
import "./signIn.scss";
import { useForm, Controller } from "react-hook-form";
import { useOtp } from "../hooks/useOtp";
import CarbonModal from '../components/modal/index'

const SignUp = () => {
  const { handleSubmit, control } = useForm();
  const sendOtp = useOtp();
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState(false)

  const onSubmit = async (data) => {
      sendOtp.mutate({ email: data.email })
      if(sendOtp.isSuccess){
        setOpenModal(true)
        setEmail(data.email)
        saveCurrentUser(currentUser)
      saveAccessToken(loginWalletData.data.access_token)
      }
      else{
        console.log(sendOtp.error)
      }
  };

  const onClose = () => {
    setOpenModal(false)
  }

  return (
    <>
    <CarbonModal 
      open = {openModal}
      onClose={onClose}
      email = {email}
    />
      <Navbar />
      <Grid className="landing-page preview1Background signUp-grid" fullWidth>
        <Column className="form" md={4} lg={8} sm={4}>
          <Tile className="signUp-tile">
            <h1>Sign In To Your Account</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>

            <Controller
                name="email"
                control={control}
                rules={{ required: "Full Name is required" }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    id="email"
                    style={{ marginBottom: "25px", height: "48px" }}
                    // invalid={!!errors.fullname}
                    labelText="Full Name"
                    placeholder="Enter your fullname here"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                )}
              />

              {/* <TextInput
                id="Your registered email address"
                name="email"
                style={{ marginBottom: "25px", height: "48px" }}
                invalidText="Invalid error message."
                labelText="Email"
                placeholder="Enter you email here"
              /> */}
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
