import {Navbar,Container,Nav} from 'react-bootstrap'
const NavBar = ({ data }) => {
  return (
    // <div className="navbar">
    //   <ul class="metismenu">
    //     <li class="">
    //       <a class="ai-icon" aria-expanded="false" href="/products">
    //         <span class="nav-text">Thông tin tài khoản</span>
    //       </a>
    //     </li>
    //     <li class="">
    //       <a class="ai-icon" aria-expanded="false" href="/orders">
    //         <span class="nav-text">Danh sách yêu thích</span>
    //       </a>
    //     </li>
    //     <li class="">
    //       <a class="ai-icon" aria-expanded="false" href="/users">
    //         <span class="nav-text">Playlist</span>
    //       </a>
    //     </li>
    //   </ul>
    //   <ul class="metismenu">
    //     <div>
    //       <p>Ca sĩ</p>
    //     </div>
    //     <li class="">
    //       <a class="ai-icon" aria-expanded="false" href="/orders">
    //         <span class="nav-text">Album</span>
    //       </a>
    //     </li>
    //     <li class="">
    //       <a class="ai-icon" aria-expanded="false" href="/products">
    //         <span class="nav-text">Bài hát</span>
    //       </a>
    //     </li>
    //   </ul>
    //   <ul class="metismenu">
    //     <div>
    //       <p>Admin</p>
    //     </div>
    //     <li class="">
    //       <a class="ai-icon" aria-expanded="false" href="/orders">
    //         <span class="nav-text">Tài khoản</span>
    //       </a>
    //     </li>
    //   </ul>
    // </div>

    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/admin">Admin</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/admin/users">Thong tin tai khoan</Nav.Link>
            <Nav.Link href="/admin/playlists">PlayList</Nav.Link>
            <Nav.Link href="/admin/lists">Danh sach yeu thich</Nav.Link>
            <Nav.Link href="/admin/albums">Album</Nav.Link>
            <Nav.Link href="/admin/song">Bai hat</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
