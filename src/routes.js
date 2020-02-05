import {Switch, Route } from 'react-router-dom';
// import {Switch, Route } from 'react-router';
import React from 'react';

import StartPage from './pages/startpage/index'
import Quests from './pages/quests/index'

export default () => {
    return (
        <Switch>
            <Route path='/' component={StartPage} exact />
            <Route path='/quests' component={Quests} />
        </Switch>
    )
}