import {Switch, Route } from 'react-router-dom';
import React from 'react';

import StartPage from './pages/startpage/index'
import Quests from './pages/quests/index'
import Result from './pages/result/index'
import Contacts from './pages/contacts/index'

export default () => {
    return (
        <Switch>
            <Route path='/' component={StartPage} exact />
            <Route path='/quests' component={Quests} />
            <Route path='/result' component={Result} />
            <Route path='/contacts' component={Contacts} />
        </Switch>
    )
}