import React, {useEffect, useState} from "react";
import {
  Row,
  Col,
  Form,
  ModalBody,
  Label,
  ModalFooter,
  Button
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import sections
import {useMutation} from "react-fetching-library";
import {addSongToAlbum, addSongToPlayList} from "../api/actions/song";
import {Group} from "../components/form-group/form-group";
import SelectBox from "../components/select-box/select-box";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {getListMyPlaylist} from "../api/actions/playlist";

const defaultValueSearch = {
  playListId: null
}

const AddSongPlayList = ({toggleSelect, songIdAdd}) => {

  const {mutate: _addSongToPlayList} = useMutation(addSongToPlayList)
  const {mutate: _getListMyPlaylist} = useMutation(getListMyPlaylist)


  const [listMyPlaylist, setListMyPlaylist] = useState([])


  const {control, handleSubmit, formState: {errors}, watch, setValue, register} = useForm({
    reValidateMode: "onChange",
    defaultValues: defaultValueSearch
  })

  const getListMyAlbumView = async () => {
    let res = []
    const response = await _getListMyPlaylist({})
    if (response.payload?.errorCode === '200') {
      const options = response.payload?.data?.map(el => ({
        value: el.playlistId,
        label: el.namePlaylist
      }))
      res = options
      setListMyPlaylist(options)
    } else {
      toast.error(response.payload?.message)
    }
    return res
  }

  const onSubmit = async (data) => {

    const dataInput = {
      songId : songIdAdd,
      playListId: data.playListId
    }

    const response = await _addSongToPlayList(dataInput)
    if (response.payload?.errorCode === '200') {
      // setIsOpen(!isOpen)
      // getListMySong()
      toggleSelect()
      toast.success('Thêm bài hát thành công')
    } else {
      toast.error(response.payload?.message)
    }

  };


  useEffect(() => {
    getListMyAlbumView()
  }, [])

  return (
    <>
        <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <ModalBody>
            <Row>
              <Col>
                <Group className="mb-3" controlId="formBasicEmail" style={{paddingTop: '5px'}}>
                  <Label>Danh sách Playlist</Label>
                  <SelectBox
                      name="playListId"
                      valueOpt="value"
                      labelOpt="label"
                      control={control}
                      options={listMyPlaylist}
                      placeholder={''}
                  />
                </Group>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" type="submit">
              Thêm vào playlist của tôi
            </Button>
            <Button color="secondary" onClick={toggleSelect}>Đóng</Button>
          </ModalFooter>
        </Form>
    </>
  );
};

export default AddSongPlayList;
