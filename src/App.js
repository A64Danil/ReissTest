import React from "react";

import {BrowserRouter as Router} from 'react-router-dom'

import Menu from "./components/Menu/Menu";
import Block from "./components/Block/Block";

import Routes from './routes'
// import styles from "./global.scss";
import "./global.scss";

export default () => (
  <>
    <div className={"outerWrp"}>
        <Router>
            <Menu />
            <Routes/>
        </Router>
    </div>
  </>
);
