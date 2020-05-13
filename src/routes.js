import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Main from './pages/Main';
import NewClass from './pages/NewClass';
import NewCourse from './pages/NewCourse';
import ClassPage from './pages/ClassPage';
import Classes from './pages/Classes';
import QuestionBank from './pages/QuestionBank';
import Quizzes from './pages/QuizzesPage';


export default function Routes() {
    return (
        <BrowserRouter>
            <Sidebar />
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" exact component={Register} />
                <Route path="/main" exact component={Main} />
                <Route path="/newclass" exact component={NewClass} />
                <Route path="/newcourse" exact component={NewCourse} />
                <Route path="/class" exact component={ClassPage} />
                <Route path="/classes" exact component={Classes} />
                <Route path="/questionbank" exact component={QuestionBank} />
                <Route path="/quizzes" exact component={Quizzes} />
            </Switch>
        </BrowserRouter>
    )
}