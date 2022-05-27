import React from "react";
import { useStyletron } from 'baseui';
import Login from "../components/Login";
import banner from "../banner.png";
import { Block } from "baseui/block";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth"
const Page = () => {
    const [css, theme] = useStyletron();
    const { login: { request, loading } } = useAuth();
    return (
        <Block width={["100%", "100%", "50%", "30%"]} margin="auto">
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
                Login to your account
            </h2>
            <Login onSubmit={request} isLoading={loading} />
            <p>Don't have an account? <Link to="/signup" >Signup</Link></p>
        </Block>)
}
export default Page;