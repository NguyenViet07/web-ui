import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useMutation} from "react-fetching-library";
import {findAllUser} from "../../api/actions/admin";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

const defaultValueSearch = {
  name: null,
  username: null,
  password: null,
  passwordConfirm: null,
  isSinger: false,
  company: null,
  identityCard: null,
}

const Users = ({ data }) => {

  const {mutate: _findAllUser} = useMutation(findAllUser)

  const [listUser, setListUser] = useState([])

  const {control, handleSubmit, formState: {errors}, watch} = useForm({
    reValidateMode: "onChange",
    defaultValues: defaultValueSearch
  })

  const getListUser = async () => {
    const response = await _findAllUser({})
    if (response.payload?.errorCode === '200') {
      setListUser(response.payload?.data)
    }
  }

  useEffect(async () => {
    getListUser()
  }, [])

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
