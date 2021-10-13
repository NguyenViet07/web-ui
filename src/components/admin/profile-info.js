const ProfileInfo = ({ data }) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <ul class="metismenu">
              <li class="">
                <a class="ai-icon" aria-expanded="false" href="/products">
                  <i class="fa fa-tags"></i>
                  <span class="nav-text">Sản phẩm</span>
                </a>
              </li>
              <li class="">
                <a class="ai-icon" aria-expanded="false" href="/orders">
                  <i class="fa fa-shopping-cart"></i>
                  <span class="nav-text">Đơn hàng</span>
                </a>
              </li>
              <li class="">
                <a class="ai-icon" aria-expanded="false" href="/users">
                  <i class="fa fa-users"></i>
                  <span class="nav-text">Người dùng</span>
                </a>
              </li>
              <li class="">
                <a class="ai-icon" aria-expanded="false" href="/roles">
                  <i class="fa fa-key"></i>
                  <span class="nav-text">Phân quyền</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
