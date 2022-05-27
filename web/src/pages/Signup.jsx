import React, { useState } from "react";
import Signup from "../components/Registration";
import { useStyletron } from 'baseui';
import useAuth from "../hooks/useAuth";
import banner from "../banner.png";
import { Block } from "baseui/block";
import { Link } from "react-router-dom";
const Page = () => {
    const [css, theme] = useStyletron();
    const { signup: { request, loading } } = useAuth();
    return (<Block width={["100%", "100%", "50%", "30%"]} margin="auto">
        <img className={css({
            width: '100%',
        })} src={banner} alt="logo" />
        <h2
            className={css({
                fontFamily: "Poppins",
                fontStyle: "normal",
                color: theme.colors.primary600,
                fontWeight: 500,
                textAlign: "center",
                fontSize: "32px",
                lineHeight: "48px"
            })}
        >
            Register a new Account
        </h2>

        <Signup onSubmit={request} isLoading={loading} />
        <p>Already have an account? <Link to="/login" >Login</Link></p>
    </Block>)
}
export default Page;