import * as React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import NavHref from '../Nav/Nav.link';
import history from '../../../utility/history';
import { auth } from '../../../utility/auth';
const Cookies = require('universal-cookie');
import { Image, Icon } from '../';

interface Props {}

interface State {
  auth: any;
}

const TagHead = styled.header`{
  min-height: 70px;
  margin-bottom: 30px;
}`;

const H1 = styled.h1`{
  margin-top: 10px;
}`;

const LeftHeader = styled.div`{
  text-align: left;
  float: left;
}`;
const RightHeader = styled.div`{
  text-align: right;
  float: right;
  font-size: 14px;
  margin-top: 20px;
  a {
    color: #333;
    text-decoration: none;
  }
  a.logout {
    color: #f00;
    text-decoration: underline;
  }
}`;
class Header extends React.Component<Props, State> {

  state = {
    auth: null
  };

  logout = () => {
    const cookie = new Cookies();
    cookie.remove('JBCUser');
    history.push('/login');
  }
  componentWillMount() {
    this.setState({
      auth: auth() ? true : false
    });
  }
  render() {
    
    return (
      <>
        {
          this.state.auth && (
            <TagHead>
                <LeftHeader>
                  <H1>
                    <NavHref to={'/'}>
                      <Image src={require('../../../assets/images/jbc-logo.png')} width={70} />
                    </NavHref>
                  </H1>
                </LeftHeader>
                <RightHeader>
                  Hi, <NavLink to="/user">Admin <Icon className="user" prefix="fe" /></NavLink>  <NavLink className="logout" to="/" onClick={this.logout}>Logout</NavLink>
                </RightHeader>
            </TagHead>
          )
        }
      </>
    );
  }
}

export default Header;