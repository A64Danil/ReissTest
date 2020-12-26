import React from "react";

import { createBrowserHistory } from "history";
import {BrowserRouter } from 'react-router-dom'

import Menu from "./components/Menu/Menu";
import StoreProvider from './model/Store'
import Routes from './routes'

import { YMInitializer } from 'react-yandex-metrika';

import "./global.scss";

const testHistory = createBrowserHistory();

const App = () => {
    // console.log(console);
    console.log(YMInitializer);
    return (
        <StoreProvider>
            <div className={"outerWrp"}>
                <YMInitializer accounts={[61210597]}  options={{webvisor: true}} version="2"/>
                <BrowserRouter >
                        <Menu/>
                        <Routes history={testHistory}/>
                </BrowserRouter>
            </div>
        </StoreProvider>
    )

}

export default App;