import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import {
    browserHistory
} from 'react-router';


import App from './views/app';
export default () => (
    <BrowserRouter>
        <Route path='/' component={App} />
    </BrowserRouter>
);
//
// export default () => (
//     <Router history={browserHistory}>
//         <div>
//             <Route path='/' component={App} />
//             <Route path='/' component={Home} />
//         </div>
//     </Router>
// );


/*
            <div></div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/quests">Quests</Link></li>
            </ul>

            <hr/>
  * */