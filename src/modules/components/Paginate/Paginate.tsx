import * as React from 'react';
import * as ReactPaginate from 'react-paginate';

interface Props {
  changePage?: Function;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  pageCount: number;
  initialPage?: number;
}

interface State {}

class Paginate extends React.Component<Props, State> {

  handlePageClick = (page: any) => {
    const { changePage } = this.props;
    if (changePage) {
      changePage(page);
    }
  }

  render() {
    const {
      initialPage,
      pageRangeDisplayed,
      pageCount,
      marginPagesDisplayed
    } = this.props;
    return (
      <ReactPaginate
        initialPage={initialPage || 0}
        pageRangeDisplayed={pageRangeDisplayed || 2}
        pageCount={pageCount}
        breakLabel={<a href="">...</a>}
        onPageChange={this.handlePageClick}
        marginPagesDisplayed={marginPagesDisplayed || 15}
        activeClassName={'active'}
        breakClassName={'break-me'}
        nextLabel={''}
        previousLabel={''}
        disabledClassName={'disabled'}
      />
    );
  }
}

export default Paginate;