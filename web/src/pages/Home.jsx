import React, { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import IntroContent from "../content/IntroContent.json";
import AboutContent from "../content/AboutContent.json";
import "antd/dist/antd.css";
const Container = lazy(() => import("../common/Container"));
const ScrollToTop = lazy(() => import("../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../components/ContentBlock"));

const Home = () => {
  const navigate = useNavigate();
  return (

    <Suspense fallback={<div>Loading..</div>}>
      <Container>

        <ScrollToTop />
        <ContentBlock
          type="right"
          title={IntroContent.title}
          content={IntroContent.text}
          button={[
            {
              "title": "Login",
              onClick() { navigate("/login") }
            },
            {
              "title": "New Account",
              "color": "#fff",
              onClick() { navigate("/signup") }
            }
          ]}
          icon="banner.png"
          id="intro"
        />
        <ContentBlock
          type="left"
          title={AboutContent.title}
          content={AboutContent.text}
          section={AboutContent.section}
          icon="product-launch.svg"
          id="about"
        />

      </Container>

    </Suspense>
  );
};

export default Home;