import React from 'react';
import { Switch, Route } from 'react-router-dom';


import Home from '../../views/home';
import About from '../../views/about';
import Quest from '../../views/quest';


import styles from './style.css';

const Main = () => (
    <main className={styles.main}>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/quests" component={Quest}/>
        </Switch>
    </main>
)

export default Main;
