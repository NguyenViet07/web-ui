import {useMutation} from "react-fetching-library";
import {useForm} from "react-hook-form";

import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Card, CardHeader, CardBody, CardTitle,  Row, Col, Label} from 'reactstrap'
import {Form, Button} from 'reactstrap';
import DataTable from "react-data-table-component";
import {SEARCH_BLOCK, SEARCH_RESULT_BLOCK} from "../../constants";
import {Edit} from "react-feather";
import {getDefaultRowsPerPageOptions} from "../../untility/Utils";
import {findAllUser} from "../../api/actions/admin";
import InputController from "../../components/input-controller/input-controller";
import {Group} from "../../components/form-group/form-group";

const defaultValueSearch = {
    username: null
}

const Admin = ({}) => {

    const {mutate: _findAllUser} = useMutation(findAllUser)

    const [listUser, setListUser] = useState([])
    const [searching, setSearching] = useState(false)
    const [resetDataTable, setResetDataTable] = useState(false)
    const [dataSearch, setDataSearch] = useState({})
    const [sizePage, setSizePage] = useState(10)

    const {control, handleSubmit, reset, getValues} = useForm({
        reValidateMode: "onChange",
        defaultValues: defaultValueSearch
    })

    const getListUser = async () => {
        const response = await _findAllUser({})
        if (response.payload?.errorCode === '200') {
            setListUser(response.payload?.data)
        }
    }

    const onChangePage = async (page, totalRows) => {
        const searchParams = dataSearch
        searchParams.page = page
        setSearching(true)
        const res = await _findAllUser(searchParams)
        if (res.payload.errorCode === '00') {
            setListUser(res.payload?.data)
        }
        setSearching(false)
    }

    const onChangeRowPerPage = async (currentRowsPerPage, currentPage) => {
        const searchParams = dataSearch
        setSearching(true)
        searchParams.page = currentPage
        searchParams.size = currentRowsPerPage
        setSizePage(currentRowsPerPage)
        const res = await _findAllUser(searchParams)
        if (res.payload.errorCode === '00') {
            setListUser(res.payload?.data)
        }
        setSearching(false)
    }

    const handleSearch = async () => {
        setSearching(true)
        const formData = getValues()
        setResetDataTable(!resetDataTable)
        setDataSearch(formData)
        formData.size = sizePage
        try {
            const res = await _findAllUser(formData)
            if (res.payload.errorCode === '00') {
                setListUser(res.payload?.data)
            }
        } catch (error) {
            toast.error(error.message)
        }
        setSearching(false)
        reset(getValues())
    }

    useEffect(() => {

        getListUser()

    }, [])


    const columns = [
        // {
        //   name: 'STT',
        //   center: true,
        //   width: '5%',
        //   cell: (row, index) => (listUser ? ((listUser.page) * listUser.size) + (index + 1) : -1)
        // },
        {
            name: 'Trạng thái',
            center: true,
            selector: 'isActive',
            width: '10%',
            style: {
                justifyContent: 'center'
            },
            cell: row => (row.isActive === 1 ? 'Hiệu lực' : 'Không hiệu lực')
        },
        {
            name: 'Tên đăng nhập',
            center: true,
            style: {
                justifyContent: 'center'
            },
            selector: row => row['username']
        },
        {
            name: 'Tên đầy đủ',
            center: true,
            selector: row => row['name'],
            style: {
                justifyContent: 'left'
            }
        },
        {
            name: 'Ca sĩ',
            width: '10%',
            center: true,
            style: {
                justifyContent: 'center'
            },
            cell: row => {
                if (row.isSinger === 1) {
                    return (<div className="nowrap-text">{'Ca sĩ'}</div>)
                } else if (row.isSinger === 0 || row.isSinger === null) {
                    return (<div className="nowrap-text">{'Người nghe'}</div>)
                }
            }
        },
        {
            name: 'Địa chỉ',
            center: true,
            selector: row => row['address'],
            width: '6%',
            style: {
                justifyContent: 'center'
            }
        },
        {
            name: 'Chứng minh thư hoặc hộ chiếu',
            width: '7%',
            center: true,
            selector: row => row['identityCard'],
            style: {
                justifyContent: 'center'
            }
            // cell: row => {
            //   if (row.blockAddnew === 1) {
            //     return (<div className="nowrap-text">{'Chặn'}</div>)
            //   } else if (row.blockAddnew === 0 || row.blockAddnew === null) {
            //     return (<div className="nowrap-text">{'Không chặn'}</div>)
            //   }
            // }
        },
        {
            name: 'Tên công ty chủ quản',
            selector: row => row['company'],
            width: '8%',
            center: true,
            style: {
                justifyContent: 'left'
            }
        },
        {
            name: 'Loại tài khoản',
            width: '7%',
            center: true,
            selector: row => row['roleName'],
            style: {
                justifyContent: 'left'
            }
        },
        // {
        //   name: 'User không chặn combo',
        //   width: '10%',
        //   center: true,
        //   style: {
        //     justifyContent: 'left'
        //   },
        //   cell: row => {
        //     return (<div title={row.useExcludeCombo} className="nowrap-text">{row.useExcludeCombo}</div>)
        //   }
        // },
        // {
        //   name: 'Ghi chú',
        //   maxWidth: '11%',
        //   center: true,
        //   style: {
        //     justifyContent: 'left'
        //   },
        //   cell: row => {
        //     return (<div title={row.description} className="nowrap-text">{row.description}</div>)
        //   }
        // },
        {
            name: 'Thời gian tạo',
            center: true,
            width: '10%',
            cell: row => {
                return (<div title={row.createDate} className="nowrap-text">{row.createDate}</div>)
            }
        },
        {
            name: 'Thời gian cập nhật',
            center: true,
            width: '10%',
            style: {
                justifyContent: 'left'
            },
            cell: row => {
                return (<div title={row.updateDate} className="nowrap-text">{row.updateDate}</div>)
            }
        },
        {
            name: 'Thao tác',
            width: '5%',
            cell: (row) => (<div title={'Sửa'}>
                <Edit style={{cursor: 'pointer', color: '#6e6b7b'}}/>
            </div>),
            center: true
        }
    ]


    return (
        <div border="danger" style={{width: '90%', margin: 'auto', marginTop: '20px'}}>

            <Card>
                <CardHeader>
                    <CardTitle tag='h4' id={SEARCH_BLOCK.key} title={SEARCH_BLOCK.title}>Thông tin cấu hình</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit(handleSearch)}>
                        <Group>
                            <Label>Tên đăng nhập</Label>
                            <InputController
                                control={control}
                                name="username"
                                type="text"
                            />
                        </Group>
                        <Button type={'submit'}>
                            Tìm kiếm
                        </Button>
                    </Form>
                </CardBody>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle id={SEARCH_RESULT_BLOCK.key} title={SEARCH_RESULT_BLOCK.title}>Danh sách tài khoản hệ thống ({listUser.totalElements ? listUser.totalElements : 0})</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <div className="style-table">
                                <DataTable keyField={"id"}
                                           loading={searching}
                                           columns={columns}
                                           data={listUser.content}
                                           paginationTotalRows={listUser.totalElements}
                                           pagination
                                           paginationServer
                                           paginationRowsPerPageOptions={getDefaultRowsPerPageOptions()}
                                           highlightOnHover
                                           paginationResetDefaultPage={resetDataTable}
                                           noHeader={true}
                                           className="style-table table-has-edit"
                                           progressPending={searching}
                                           onChangePage={onChangePage}
                                           onChangeRowsPerPage={onChangeRowPerPage}
                                           noDataComponent={"Không có bản ghi nào"}
                                           paginationComponentOptions={{
                                               rowsPerPageText: 'Số bản ghi của 1 trang:',
                                               rangeSeparatorText: '/'
                                           }}
                                           striped={true}
                                           customStyles={{
                                               headCells: {
                                                   style: {
                                                       textAlign: 'center',
                                                       fontWeight: '600'
                                                   }
                                               }
                                           }}
                                />
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default Admin;
