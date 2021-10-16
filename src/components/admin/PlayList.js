import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const PlayList = ({ data }) => {
  return (
      
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th colSpan='2'>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>EDM</td>
          <td colSpan="2">
            <Button variant="outline-primary">Edit</Button>{" "}
            <Button variant="outline-danger">Delete</Button>{" "}
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Pop</td>
          <td colSpan="2">
            <Button variant="outline-primary">Edit</Button>{" "}
            <Button variant="outline-danger">Delete</Button>{" "}
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Rock</td>
          <td colSpan="2">
            <Button variant="outline-primary">Edit</Button>{" "}
            <Button variant="outline-danger">Delete</Button>{" "}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default PlayList;