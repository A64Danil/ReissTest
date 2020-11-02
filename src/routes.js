import {Switch, Route } from 'react-router-dom';
import React from 'react';

import StartPage from './pages/startpage/index'
import NamePage  from './pages/name/index'
import GuidePage from "./pages/guide";
import Quests from './pages/quests/index'
import Result from './pages/result/index'
import Compare from './pages/compare/index'
import AllResults from './pages/allresults/'
import Contacts from './pages/contacts/index'

export default (props) => {
    return (
        <Switch>
            <Route path='/' component={StartPage} exact />
            <Route path='/name' component={NamePage} history={props.history} />
            <Route path='/guide' component={GuidePage} history={props.history} />
            <Route path='/quests' component={Quests} history={props.history} />
            <Route path='/result' component={Result} history={props.history} />
            <Route path='/compare' component={Compare} history={props.history} />
            <Route path='/allresults' component={AllResults} />
            <Route path='/contacts' component={Contacts} />
        </Switch>
    )
}