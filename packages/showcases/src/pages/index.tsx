import React, { useEffect, useState } from "react";
import Router from "next/router";

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const { pathname } = Router;
    if (pathname == "/") {
      Router.push("/e-commerce");
    } else {
      setLoaded(true);
    }
  }, []);

  if (!loaded) {
    return <div></div>;
  }
};
export default Home;
