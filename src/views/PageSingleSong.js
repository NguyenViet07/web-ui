import React, { useEffect } from "react";
import { useState } from "react";
// import sections
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import RandomSong from "../components/elements/RandomSong";
import SongItem from "../components/elements/SongItem";
import Album from "../components/homes/Album";
import { useHistory, useParams } from "react-router-dom";
import { useMutation } from "react-fetching-library";
import { findBySongId } from "../api/actions/song";
import { createLike, deleteLike } from "../api/actions/like";
import { toast } from "react-toastify";
import { createComment, getListComment } from "../api/actions/comment";
import { useForm } from "react-hook-form";
import {
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
  CardImg,
  ModalFooter,
} from "reactstrap";
import InputController from "../components/input-controller/input-controller";
import { reset } from "react-tabs/lib/helpers/uuid";
import { Music, Play, ThumbsUp } from "react-feather";
import { useDispatch } from "react-redux";
import { Group } from "../components/form-group/form-group";
import ValidateMessage from "../components/validate-message";
import SelectBox from "../components/select-box/select-box";
import { listStyleSong, listTypeSong } from "../untility/mock";
import AddSongPlayList from "./AddSongPlayList";

const defaultValueSearch = {
  description: null,
};

const PageSingleSong = () => {
  const songId = useParams().id;

  const [url, setUrl] = useState("");
  const [urlTest, setUrlTest] = useState("");
  const [songInfo, setSongInfo] = useState(null);

  const [checkLike, setCheckLike] = useState(false);
  const [listComment, setListComment] = useState([]);
  const [modal, setModal] = useState(false);
  const [userNameView, setUserNameView] = useState(null);


  const { mutate: _findBySongId } = useMutation(findBySongId);
  const { mutate: _getListComment } = useMutation(getListComment);
  const { mutate: _createComment } = useMutation(createComment);
  const { mutate: _createLike } = useMutation(createLike);
  const { mutate: _deleteLike } = useMutation(deleteLike);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
    register,
  } = useForm({
    reValidateMode: "onChange",
    defaultValues: defaultValueSearch,
  });

  const dispatch = useDispatch();

  const history = useHistory();

  const like = async () => {
    const response = checkLike
      ? await _deleteLike({ songId: songId })
      : await _createLike({ songId: songId });
    if (response.payload?.errorCode === "200") {
      setCheckLike(!checkLike);
    } else {
      toast.error(response.payload?.message);
    }
  };

  const listCmt = async () => {
    const response = await _getListComment({ songId: songId });
    if (response.payload?.errorCode === "200") {
      setListComment(response.payload?.data);
    } else {
      toast.error(response.payload?.message);
    }
  };

  const onSubmit = async (data) => {
    const dataInput = {
      songId: songId,
      description: data.description,
    };
    const response = await _createComment(dataInput);
    if (response.payload?.errorCode === "200") {
      reset();
      listCmt();
    } else {
      toast.error(response.payload?.message);
    }
  };

  const listerToMusic = (songValue) => {
    const action = {
      type: "SONG_VALUE",
      data: songValue,
    };
    dispatch(action);
  };

  const toggle = async () => {
    setModal(!modal);
  };

  useEffect(async () => {
    if (songId) {
      const data = {
        songId: songId,
      };

      const response = await _findBySongId(data);
      if (response.payload?.errorCode === "200") {
        const linkUrlSong = response.payload.data.url;
        setUrl(`http://localhost:9000/api/v1/song/download?url=${linkUrlSong}`);
        const res = response.payload.data;
        setSongInfo(res);
        if (res.like === 1) {
          setCheckLike(true);
        } else setCheckLike(false);
      } else {
        toast.error(response.payload?.message);
      }


      const userData = JSON.parse(localStorage.getItem("userData"));
      // setUserData(userData1)

      setUserNameView(userData?.user?.userName);
    }

    listCmt();
  }, []);

  return (
    <>
      <div className="p-4">
        <div className="row">
          <div className="col-md-3">
            <div className="h5pibw-2 p-4 pt-0 ">
              {songInfo?.image ? (
                <img className="antedm-1 fZPioS" src={songInfo?.image} alt="" />
              ) : (
                <img
                  className="antedm-1 fZPioS"
                  src="https://avatar-ex-swe.nixcdn.com/song/2021/10/21/c/d/d/a/1634807126106_300.jpg"
                  alt=""
                />
              )}
            </div>
          </div>
          <div className="col-md-9">
            <div>
              <div className="sc-jEKYNM bdIIfT">
                <span className="sc-dYTRRX krDxsF">Tên bài hát: </span>
                <span className="sc-hxPjim iJtgKn">{songInfo?.songName}</span>
              </div>
              <div className="d-flex align-items-center">
                <Play
                  onClick={() => listerToMusic(songInfo)}
                  style={{ cursor: "pointer", color: "#2daaed" }}
                />
                {
                  userNameView && <div className="add_playlist_wrap">
                    <Music
                        onClick={() => {
                          toggle();
                        }}
                        style={{
                          cursor: "pointer",
                          color: "#2daaed",
                          margin: "0px 10px 0px 10px",
                        }}
                    />
                    <span className="add_playlist">thêm vào playlist</span>
                  </div>
                }


                <div>
                  {checkLike ? (
                    <ThumbsUp
                      onClick={() => like()}
                      style={{ cursor: "pointer", color: "#2daaed " }}
                    />
                  ) : (
                    <ThumbsUp
                      onClick={() => like()}
                      style={{ cursor: "pointer", color: "#6e6b7b" }}
                    />
                  )}
                </div>
              </div>

              <div className="sc-bLPcC ixRSYj w3-row">
                <div className="sc-mfyeg cHbucU w3-rest">25/10/2021</div>
              </div>
              <div className="sc-gjtWyx idAWVU">{songInfo?.description}</div>
            </div>
          </div>
          <div className="chWPSK">
            <div className="sc-dNvYHJ bwIDZC w3-col">
              <div className="sc-lkKZoo kqVftK">Tạo bởi:</div>
              <div className="sc-gpQvLH gOzSIw __3dot-content">
                {songInfo?.singerName}
              </div>
            </div>
          </div>
          <div>
            <div className="sc-OGyct hVIUVP mt-3">Bình luận</div>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              class="box_form_comment form-comment-0 mb-5"
            >
              <div className="form-group emoji-picker-container">
                <InputController
                  class="form-control comment"
                  control={control}
                  name="description"
                  type="text"
                  placeholder="Viết bình luận của bạn tại đây."
                  data-emojiable="true"
                />
                <Button
                  type="submit"
                  class="btn my-2 my-sm-0 waves-effect waves-light btn-upload btn_cloud_up"
                >
                  Đăng Bình Luận
                </Button>
              </div>
            </Form>
            {listComment?.map((el) => {
              return (
                <div className="media comment-item mt-3">
                  <div className="media-left">
                    <figure className="image is-rounded is-50x50">
                      {el.image ? (
                        <img src={el.image} alt="" />
                      ) : (
                        <img
                          src="https://s120-ava-talk.zadn.vn/4/f/d/7/0/120/5d6327375053a2f74af896a85b3a35e6.jpg"
                          alt=""
                        />
                      )}
                    </figure>
                  </div>
                  <div className="media-content">
                    <div className="username">
                      {el.userName}{" "}
                      <span className="post-time">{el.createDate}</span>
                    </div>
                    <div className="idAWVU ct-cmt">{el.description}</div>

                    <div className="comment-reply-list-wrapper"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-5">
          <Album title={"Bạn cũng có thể thích"} data={[1, 2, 3, 4, 5, 6, 7]} />
        </div>
      </div>

      <Modal size="md" isOpen={modal} centered={true}>
        <ModalHeader toggle={toggle}>Add vào playlist của bạn</ModalHeader>
        <AddSongPlayList
          songIdAdd={songId}
          toggleSelect={toggle}
        ></AddSongPlayList>
      </Modal>
    </>
  );
};

export default PageSingleSong;
