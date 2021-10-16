import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Users = ({ data }) => {
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>tuan@gmail.com</td>
            <td>tuan</td>
            <td colSpan="2">
              <Button variant="outline-primary">Edit</Button>{" "}
              <Button variant="outline-danger">Danger</Button>{" "}
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>khai@gmail.com</td>
            <td>khai</td>
            <td colSpan="2">
              <Button variant="outline-primary">Edit</Button>{" "}
              <Button variant="outline-danger">Danger</Button>{" "}
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>viet@gmail.com</td>
            <td>viet</td>
            <td colSpan="2">
              <Button variant="outline-primary">Edit</Button>{" "}
              <Button variant="outline-danger">Danger</Button>{" "}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
