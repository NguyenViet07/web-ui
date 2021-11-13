import React, { useEffect, useState } from "react";
import {
  Row,
  Container,
  Col,
  CardImg,
  Form,
  Label,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,

} from "reactstrap";
import { useMutation } from "react-fetching-library";
import {
  getListMySongByLike
} from "../../api/actions/song";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";




const SongLike = ({}) => {


  const { mutate: _getListMySongByLike } = useMutation(getListMySongByLike);



  const [listMySong, setListMySong] = useState([]);



  const history = useHistory();

  const dispatch = useDispatch();

  const listerToMusic = (songValue) => {
    const action = {
      type: "SONG_VALUE",
      data: songValue,
    };
    dispatch(action);
  };

  const getListMySongLike = async () => {
    const response = await _getListMySongByLike({});
    if (response.payload?.errorCode === "200") {
      setListMySong(response.payload?.data);
    } else {
      setListMySong([]);
    }
  };


  useEffect(() => {
    getListMySongLike();
  }, []);

  return (
    <>
      <Container className="profile-info mt-4">
        <Row>
          {listMySong.map((el) => {
            return (
              <Col md={3} className="mb-3">
                <Card
                  onClick={() => {
                    listerToMusic(el);
                  }}
                >
                  {el.image ? (
                    <CardImg
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      variant="top"
                      src={el.image}
                    />
                  ) : (
                    <CardImg
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      variant="top"
                      src="/imgs/pika.jpg"
                    />
                  )}
                  <CardBody className="">
                    <div>
                      <span style={{ fontSize: "20px" }}>{el.songName}</span>
                    </div>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                      {el.createDate}
                    </CardSubtitle>
                    <CardText>{el.description}</CardText>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SongLike;
