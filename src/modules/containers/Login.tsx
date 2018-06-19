import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import history from '../../utility/history';
import { auth } from '../../utility/auth';
import { login } from '../actions/actions';

import { TitlePage, Input, Button, Image, Loading } from '../components';

type ErrorType = {
  readonly statusCode: number;
  readonly error: string;
  readonly message: string;
};

interface State {
  username: string;
  password: string;
  errorSubmit: ErrorType;
}
interface Props {
  submitLogin: Function;
  statusLogin: any;
}

const DivCenter = styled.div`{
  text-align: center;

  > img {
    margin: 20px 0;
  }
  > h1 {
    font-size: 20px;
  }
}`;

const Form = styled.form`{
  margin: 30px 0;
  font-size: 12px;

  .control-group {
    margin-bottom: 10px;
    text-align: left;
    label {
      display: block;
      font-size: 14px;
      margin-bottom: 4px;
      font-weight: 700;
    }
    input {
      width: 100%;
      border: 1px solid #f7f7f7;
      padding: 8px 15px;
      box-sizing: border-box;
    }
  }
}`;

const InnerForm = styled.div`{
  width: 300px;
  margin: 0 auto;
}`;

const BtnLogin = styled.div`{
  button{ 
    border: 0;
    background-color: #d3191b;
    width: 100%;
    height: 34px;
    text-align: center;
    font-size: 14px;
    text-transform: uppercase;
    margin-bottom: 10px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;

    i {
      margin-right: 3px;
    }
  }
}`;

const DivError = styled.div`{
  background-color: #333;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  padding: 15px;
  margin-bottom: 20px;
}`;

const DivLoading = styled.div`{
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background-color: rgba(247,247,247,0.8);
  z-index: 1;

  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    height: 40px;
    width: 40px;
  }
}`;

class Login extends React.Component<Props, State> {
  
  state = {
    username: '',
    password: '',
    errorSubmit: {
      statusCode: 0,
      error: '',
      message: '',
    }
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    });

  }
  
  submitLogin = (e: any) => {
    const { submitLogin } = this.props;
    const { username, password } = this.state;
    submitLogin(username, password);
  }
  
  componentWillMount() {
    if (auth()) {
      history.push('/');
    }
  }

  async componentWillReceiveProps(nextProps: any) {
    const { error } = nextProps.statusLogin;
    const errorRes = await error;
    this.setState({ 
      errorSubmit: errorRes
    });
  }

  render() {
    const { isLoading } = this.props.statusLogin;
    const { errorSubmit } = this.state;

    return (
      <>
        <DivCenter>
          <Image src={require('../../assets/images/jbc-logo.png')} width={70} />
          <TitlePage title="Login" />

          <Form>
            <InnerForm>
              {
                errorSubmit && errorSubmit.error 
                  && <DivError>{errorSubmit.message}</DivError>
              }
              <div className="control-group">
                <label>Username</label>
                <Input type="text" name="username" placeHolder="Username" value={this.state.username} onChange={this.onChange} />
              </div>
              <div className="control-group">
                <label>Password</label>
                <Input type="password" name="password" placeHolder="Password" value={this.state.password} onChange={this.onChange} />
              </div>

              <BtnLogin>
                <Button RootComponent="button" icon="log-in" className="btnLogin" onClick={this.submitLogin}>
                  LOGIN
                </Button>
              </BtnLogin>

              <NavLink to="/register">Register</NavLink>
              {
                isLoading && <DivLoading><div><Loading /></div></DivLoading>
              }
            </InnerForm>
            
          </Form>
        </DivCenter>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    statusLogin: state.userAuthen
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    submitLogin: (username: string, password: string) => {
      dispatch(login(username, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login as any);