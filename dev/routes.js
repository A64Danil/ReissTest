import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { createHistory, useBasename } from "history";

import { browserHistory } from "react-router";

import App from "./views/app";
export default () => (
	<BrowserRouter history={browserHistory}>
		<Route path="/" component={App} />
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
