const NavBar = ({ data }) => {
  return (
    <div className="navbar">
      <ul class="metismenu">
        <li class="">
          <a class="ai-icon" aria-expanded="false" href="/products">
            <span class="nav-text">Thông tin tài khoản</span>
          </a>
        </li>
        <li class="">
          <a class="ai-icon" aria-expanded="false" href="/orders">
            <span class="nav-text">Danh sách yêu thích</span>
          </a>
        </li>
        <li class="">
          <a class="ai-icon" aria-expanded="false" href="/users">
            <span class="nav-text">Playlist</span>
          </a>
        </li>
      </ul>
      <ul class="metismenu">
        <div>
          <p>Ca sĩ</p>
        </div>
        <li class="">
          <a class="ai-icon" aria-expanded="false" href="/orders">
            <span class="nav-text">Album</span>
          </a>
        </li>
        <li class="">
          <a class="ai-icon" aria-expanded="false" href="/products">
            <span class="nav-text">Bài hát</span>
          </a>
        </li>
      </ul>
      <ul class="metismenu">
        <div>
          <p>Admin</p>
        </div>
        <li class="">
          <a class="ai-icon" aria-expanded="false" href="/orders">
            <span class="nav-text">Tài khoản</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
