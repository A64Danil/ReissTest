import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createHistory, useBasename } from "history";

import { browserHistory } from "react-router";

import App from "./views/app";

export default () => (
	<Router history={browserHistory}>
		<Route path="/" component={App} />
	</Router>
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
