import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import {
    browserHistory
} from 'react-router';


import App from './views/app';
import Home from './views/home';


export default () => (
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <Route path='home' component={Home} />
        </Route>
    </Router>
);