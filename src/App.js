import React, {useEffect} from "react";// import {BrowserRouter as Router} from 'react-router-dom'
import {BrowserRouter} from 'react-router-dom'

import Menu from "./components/Menu/Menu";
import StoreProvider from './model/Store'
import Routes from './routes'

import "./global.scss";


const App = () => {
    return (
        <StoreProvider>
            <div className={"outerWrp"}>
                <BrowserRouter>
                        <Menu/>
                        <Routes/>
                </BrowserRouter>
            </div>
        </StoreProvider>
    )

}

export default App