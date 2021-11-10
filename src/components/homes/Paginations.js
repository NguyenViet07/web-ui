import React, { Component } from "react";
import { Pagination ,PaginationItem, PaginationLink } from "reactstrap";

class Paginations extends Component {
  render() {
    return (
      <>
        <Pagination aria-label="Page navigation example">
          <PaginationItem disabled>
            <PaginationLink href="#" previous></PaginationLink>
          </PaginationItem>
          <PaginationItem secondary>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" next />
          </PaginationItem>
        </Pagination>
      </>
    );
  }
}

export default Paginations;
