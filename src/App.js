import React, {useEffect} from "react";// import {BrowserRouter as Router} from 'react-router-dom'

import { createBrowserHistory } from "history";
import {BrowserRouter} from 'react-router-dom'

import Menu from "./components/Menu/Menu";
import StoreProvider from './model/Store'
import Routes from './routes'

import "./global.scss";

const App = () => {
    const testHistory = createBrowserHistory();
    return (
        <StoreProvider>
            <div className={"outerWrp"}>
                <BrowserRouter >
                        <Menu/>
                        <Routes history={testHistory}/>
                </BrowserRouter>
            </div>
        </StoreProvider>
    )

}

export default App;