import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { TitlePage, Input, Button, Loading } from '../components';
import { changePass } from '../actions/actions';

interface Props {
  submitChangePass: Function;
  statusChangePass: any;
}

interface State {
  password: string;
  cfmPassword: string;
  errorSubmit: ErrorType;
  successSubmit: any;
} 
type ErrorType = {
  readonly statusCode: number;
  readonly error: string;
  readonly message: string;
};

const DivCenter = styled.div`{
  text-align: center;
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
  position: relative;
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

class User extends React.Component<Props, State> {

  state = {
    password: '',
    cfmPassword: '',
    successSubmit: false,
    errorSubmit: {
      statusCode: 0,
      error: '',
      message: '',
    }
  };

  submit = (e: any) => {
    const { submitChangePass } = this.props;
    const { password, cfmPassword } = this.state;

    if (password === '' 
        || cfmPassword === '' 
        || password !== cfmPassword 
        && (password.length < 8 && password.length > 64)) {
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
    
    submitChangePass(password);
    
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    });

  }

  async componentWillReceiveProps(nextProps: any) {
    const { error, result } = nextProps.statusChangePass;
    if (error !== undefined || result !== undefined) {
      const res = error ? await error : '';
      
      this.setState({
        errorSubmit: res,
        successSubmit: !res ? true : false
      });
      
    }
  }

  render() {
    const { isLoading } = this.props.statusChangePass;
    const { errorSubmit, successSubmit } = this.state;

    return (
      <>
        <DivCenter>
          <TitlePage title="Change Password" />

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
                      <label>New Password</label>
                      <Input type="password" name="password" placeHolder="Password" value={this.state.password} onChange={this.onChange} />
                    </div>
                    <div className="control-group">
                      <label>Confirm New Password</label>
                      <Input type="password" name="cfmPassword" placeHolder="Confirm Password" value={this.state.cfmPassword} onChange={this.onChange} />
                    </div>

                    <BtnLogin>
                      <Button RootComponent="button" className="btnChangePass" onClick={this.submit}>
                        CHANGE PASSWORD
                      </Button>
                    </BtnLogin>

                  </>
                )
              }
              {
                successSubmit && (
                  <DivNotification>Change password successfully!</DivNotification>
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
    statusChangePass: state.userChangePass
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    submitChangePass: (password: string) => { 
      dispatch(changePass(password)); 
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User as any);