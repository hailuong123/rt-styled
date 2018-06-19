import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
const Cookies = require('universal-cookie');

interface Props {
  exact: boolean;
  path: string;
  Component?: any;
}
interface State {}
class RouteAuthen extends React.Component<Props, State> {
  
  render () {
    const { Component } = this.props;
    const cookies = new Cookies();
    return (
      <div>
        <Route 
          {...this.props.exact}
          path={this.props.path}
          render={props => ( cookies.get('JBCUser')
              ? <Component {...props} />
              : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )} 
        />
      </div>
    );
  }
}

export default RouteAuthen;