function Service() {
  this.layDanhSachSPApi = function () {
    var promise = axios({
      url: "https://64a92b9c8b9afaf4844a5706.mockapi.io/api/Product",
      method: "GET",
    });
    return promise;
  };
  this.xoaSPApi = function (id) {
    var promise = axios({
      url: `https://64a92b9c8b9afaf4844a5706.mockapi.io/api/Product/${id}`,
      method: "DELETE",
    });
    return promise;
  };
  this.themSPApi = function (product) {
    var promise = axios({
      url: "https://64a92b9c8b9afaf4844a5706.mockapi.io/api/Product",
      method: "POST",
      data: product,
    });
    return promise;
  };
  this.laySPApi = function (id) {
    var promise = axios({
      url: `https://64a92b9c8b9afaf4844a5706.mockapi.io/api/Product/${id}`,
      method: "GET",
    });
    return promise;
  };
  this.capNhatSPApi = function (product) {
    var promise = axios({
      url: `https://64a92b9c8b9afaf4844a5706.mockapi.io/api/Product/${product.id}`,
      method: "PUT",
      data: product,
    });
    return promise;
  };
}
