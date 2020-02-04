import React from "react";
import Menu from "./components/Menu/Menu";
import Block from "./components/Block/Block";


import "./global.scss";

export default () => (
  <>
    <div className="outer-wrp">
        <Menu title={'menu test'}/>
        <h1>Welcome to React Parcel Micro App!</h1>
        <Block title={'hii111'}/>
        <p>Hard to get more minimal than this React app.</p>
    </div>
  </>
);
