import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import styled from 'styled-components';
import { TitlePage, Table, Paginate, Icon, Loading } from '../components';
import { readFileData } from '../actions/actions';
import { ConvertToCSV } from '../../utility/getFiles';

interface Props {
  dataAccountBalance: Function;
  accountBalance: any;
}

interface State {
  data: any;
  headerItem: any;
  start: number;
  end: number;
}

const DivCenter = styled.div`{
  text-align: center;
}`;

const DivLeft = styled.div`{
  float: left;
}`;

const DivRight = styled.div`{
  float: right;
  ul > li {
    display: inline-block;
    margin-left: 4px;
    &.disabled, &.next, &.previous {
      display: none;
    }
    &.active {
      a {
        color: #fff;
        background-color: #333;
        border-color: #333;
      }
    }
    a {
      display: block;
      padding: 3px 5px;
      border: 1px solid #efefef;
      border-radius: 3px;
      font-size: 10px;
      cursor: pointer;
      outline: none;
    }
  }
}`;

const DivFooter = styled.div`{
  overflow: hidden;
}`;

const DivTableMiddle = styled.div`{
  width: 100%;
  margin: 50px auto 0;
  font-size: 12px;
  padding-bottom: 100px;

  & table {
    width: 100%;
    text-align: left;
    margin-bottom: 20px;
    th {
      width: 10%;
      padding: 10px;
      text-transform: uppercase;
      border-bottom: 1px solid #f7f7f7;
    }
    td {
      color: #333;
      padding: 10px;
      border-bottom: 1px solid #f7f7f7;
    }
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

class AccountBalance extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      data: null,
      headerItem: null,
      start: 0,
      end: 10
    };
  }

  componentWillMount() {
    this.getBalance();
  }

  componentWillReceiveProps(nextProps: any) {
    const { accountBalance } = nextProps;

    this.setState({
      data: _.isUndefined(accountBalance.data) ? null : accountBalance.data,
      headerItem: _.isUndefined(accountBalance.data) || Object.keys(accountBalance.data).length <= 0 ? null : Object.keys(accountBalance.data[0])
    });
  }

  getBalance = () => {
    const filePath = '/address';
    this.props.dataAccountBalance(filePath);
  }

  downloadCSV = (e: any) => {
    const { accountBalance } = this.props;
    this.getBalance();

    const convertCSV = accountBalance.data ? ConvertToCSV(accountBalance.data) : '';
    e.currentTarget.attributes['href'].value = 'data:application/csv;charset=UTF-8,' + convertCSV;
  }

  changePage = (page: any) => {
    const { selected } = page;
    this.setState({
      start: selected * 10,
      end: (selected * 10) + 10,
    });
  }

  render() {
    const { isLoading } = this.props.accountBalance;
    const { data, headerItem, start, end } = this.state;
    const RenderTable = () => (
      <>
        {
          _.isNull(data) 
            ? <p>Ko có dữ liệu</p> 
            : (
              <Table headerItem={headerItem} bodyItem={data} start={start} end={end} />
            )
        }
      </>
    );
    
    return (
      <>
        <DivCenter>
          <TitlePage title="Account Balance" />
          <DivTableMiddle>
            {
              !_.isNull(data) 
                && (
                  <>
                    <RenderTable />
                    <DivFooter>
                      <DivLeft>
                        <a href="" download="download.csv" className="download" onClick={this.downloadCSV}><Icon className="download" prefix="fe" /> Download file</a>
                      </DivLeft>

                      <DivRight>
                        <Paginate 
                          changePage={this.changePage} 
                          pageCount={Math.ceil(Object.keys(data).length / 10) || 0} 
                          pageRangeDisplayed={2} 
                        />
                      </DivRight>

                    </DivFooter>
                  </>
                )
            }
            
          </DivTableMiddle>
          {
            isLoading && <DivLoading><div><Loading /></div></DivLoading>
          }
        </DivCenter>
      </>
    ); 
  }
}

const mapStateToProps = (state: any) => {
  return {
    accountBalance: state.dataAccBalance
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    dataAccountBalance: (filePath: any) => {
      dispatch(readFileData(filePath));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountBalance as any);