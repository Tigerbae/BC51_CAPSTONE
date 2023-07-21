function Service() {
  this.layDanhSachSPApi = function () {
    var promise = axios({
      url: "https://64a92b9c8b9afaf4844a5706.mockapi.io/api/Product",
      method: "GET",
    });
    return promise;
  };
}
