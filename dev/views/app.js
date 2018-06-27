import React from 'react';

import Menu from '../components/menu';
import Main from '../components/main';

// Global CSS styles
import styles from './global.css';

const App = () => (
    <div className={styles["app-container"]}>
        <Menu />
        <Main />
    </div>
);

export default App;