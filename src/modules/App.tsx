import * as React from 'react';
import { 
  Route,
  Switch
} from 'react-router-dom';

import styled from 'styled-components';
import { Header, Container } from './components';
import AuthenRoute from './routeAuthen';
import AccountBalance from '../modules/containers/AccountBalance';
import User from '../modules/containers/User';
import Login from '../modules/containers/Login';
import Register from '../modules/containers/Register';

import '../assets/css/main.min.css';

class App extends React.Component {

  render() {

    const DivWrapper = styled.div`
      color: #333;
      font-size: 30px;
    `;

    return (
      <Container>
        <DivWrapper>
          <Header />
          <div>
            <Switch>
              <AuthenRoute exact={true} path="/" Component={AccountBalance} />
              <AuthenRoute exact={true} path="/user" Component={User} />
              <Route exact={true} path="/login" render={props => <Login {...props} />} />
              <Route exact={true} path="/register" render={props => <Register {...props} />} />
            </Switch>
          </div>
        </DivWrapper>
      </Container>  
    );
  }
}

export default App;