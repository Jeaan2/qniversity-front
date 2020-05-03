import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Main from './pages/Main';
import NewClass from './pages/NewClass';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" exact component={Register} />
                <Route path="/main" exact component={Main} />
                <Route path="/newclass" exact component={NewClass} />
            </Switch>
        </BrowserRouter>
    )
}