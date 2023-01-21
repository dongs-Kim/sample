import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const WorkSpace = loadable(() => import('@layouts/Workspace'));

// import LogIn from '@pages/LogIn';
// import SignUp from '@pages/SignUp';

const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login"></Redirect>
      <Route path="/login" component={LogIn}></Route>
      <Route path="/signup" component={SignUp}></Route>
      <Route path="/workspace/:workspace" component={WorkSpace}></Route>

    </Switch>
  );
};

export default App;
