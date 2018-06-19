import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import history from '../../utility/history';
import { auth } from '../../utility/auth';
import { register } from '../actions/actions';
import { emailFormat } from '../../utility/validate';
import { TitlePage, Input, Button, Image, Loading } from '../components';

type ErrorType = {
  readonly statusCode: number;
  readonly error: string;
  readonly message: string;
};

interface State {
  username: string;
  password: string;
  cfmPassword: string;
  email: string;
  errorSubmit: ErrorType;
  successSubmit: any;
}
interface Props {
  submitRegister: Function;
  statusRegister: any;
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

const DivNotification = styled.div`{
  background-color: #333;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  padding: 15px;
  margin-bottom: 20px;
  a {
    color: #fff;
  }
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

class Register extends React.Component<Props, State> {
  
  state = {
    username: '',
    password: '',
    email: '',
    cfmPassword: '',
    successSubmit: false,
    errorSubmit: {
      statusCode: 0,
      error: '',
      message: '',
    }
  };

  componentWillMount() {
    if (auth()) {
      history.push('/');
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    });

  }
  
  submit = (e: any) => {
    const { submitRegister } = this.props;
    const { username, password, email, cfmPassword } = this.state;
    const body = {
      username, password, email
    };
    
    if (username === '' 
        || password === '' 
        || email === '' 
        || password !== cfmPassword 
        || (password.length < 8 || password.length > 64)) {
          return this.setState({
            errorSubmit: {
              statusCode: 0,
              error: 'Error',
              message: password !== cfmPassword 
                ? 'Confirm password is wrong' 
                : (password.length < 8 || password.length > 64) ? 'Password must be from 8 to 64 characters'
                : 'All field is required' 
            }
          });
    } 
    if (!emailFormat(email)) {
      return this.setState({
        errorSubmit: {
          statusCode: 0,
          error: 'Error',
          message: 'Format email is wrong'
        }
      });
    }
    
    submitRegister(body);
    
  }
  
  async componentWillReceiveProps(nextProps: any) {
    const { error, user } = nextProps.statusRegister;

    if (error !== undefined || user !== undefined) {
      const res = error ? await error : '';

      this.setState({
        errorSubmit: res,
        successSubmit: !res ? true : false
      });
      
    }
  }

  render() {
    const { isLoading } = this.props.statusRegister;
    const { errorSubmit, successSubmit } = this.state;
    return (
      <>
        <DivCenter>
          <Image src={require('../../assets/images/jbc-logo.png')} width={70} />
          <TitlePage title="Login" />

          <Form>
            <InnerForm>
              {
                errorSubmit && errorSubmit.error 
                  && <DivNotification>{errorSubmit.message}</DivNotification>
              }
              {
                !successSubmit && (
                  <>
                    <div className="control-group">
                      <label>Username</label>
                      <Input type="text" name="username" placeHolder="Username" value={this.state.username} onChange={this.onChange} />
                    </div>
                    <div className="control-group">
                      <label>Email</label>
                      <Input type="email" name="email" placeHolder="Email" value={this.state.email} onChange={this.onChange} />
                    </div>
                    <div className="control-group">
                      <label>Password</label>
                      <Input type="password" name="password" placeHolder="Password" value={this.state.password} onChange={this.onChange} />
                    </div>
                    <div className="control-group">
                      <label>Confirm Password</label>
                      <Input type="password" name="cfmPassword" placeHolder="Confirm Password" value={this.state.cfmPassword} onChange={this.onChange} />
                    </div>

                    <BtnLogin>
                      <Button RootComponent="button" icon="log-in" className="btnLogin" onClick={this.submit}>
                        REGISTER
                      </Button>
                    </BtnLogin>

                    <NavLink to="/login">Login</NavLink>
                  </>
                )
              }
              {
                successSubmit && (
                  <DivNotification>Register successfully! <NavLink to="/login">Login</NavLink></DivNotification>
                )
              }
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
    statusRegister: state.userRegister
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    submitRegister: (body: any) => {
      dispatch(register(body));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register as any);