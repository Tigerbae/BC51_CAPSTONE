var api = new Service();
var validation = new Validation();
function getId(id) {
  return document.getElementById(id);
}
function layGiaTri() {
  TenSP = getId(`TenSP`).value;
  GiaSP = getId(`GiaSP`).value;
  ManHinhSP = getId(`ManHinhSP`).value;
  CamSauSP = getId(`CamSauSP`).value;
  CamTruocSP = getId(`CamTruocSP`).value;
  HinhAnhSP = getId(`HinhAnhSP`).value;
  MoTaSP = getId(`MoTaSP`).value;
  TypeSP = getId(`TypeSP`).value;
}
layGiaTri();
function layDanhSachSP() {
  var promise = api.layDanhSachSPApi();
  promise
    .then(function (result) {
      console.log(result.data);
      renderUI(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
layDanhSachSP();
function renderUI(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var product = data[i];
    content += `
 <tr>
  <td>${[i + 1]}</td>
  <td>${product.name}</td>
  <td>${product.price}</td>
  <td>${product.screen}</td>
  <td>${product.backCamera}</td>
  <td>${product.frontCamera}</td>
  <td><img src="${product.img}" width = "50"/></td>
  <td>${product.desc}</td>
  <td>${product.type}</td>
  <td>
  <button id="btnSua" data-bs-toggle="modal"
  data-bs-target="#exampleModal" onclick="suaSP('${
    product.id
  }')" class="btn btn-warning">Sửa</button>
  <button onclick="xoaSP('${product.id}')" class="btn btn-danger">Xóa</button>
  </td>
  
 </tr>
 `;
  }
  getId(`tblDanhSachSP`).innerHTML = content;
}
function themValidation() {
  var isValid = true;
  isValid &= validation.kiemTraRong(
    TenSP,
    "errorTenSP",
    "(*)Vui lòng nhập tên"
  );
  isValid &=
    validation.kiemTraRong(GiaSP, "errorGiaSP", "(*) Vui lòng nhập giá") &&
    validation.kiemTraPattern(
      GiaSP,
      "errorGiaSP",
      "(*) Vui lòng nhập giá bằng số",
      /^[0-9]+$/
    );
  isValid &= validation.kiemTraRong(
    ManHinhSP,
    "errorManHinhSP",
    "(*) Vui lòng nhập kích thước màn hình"
  );
  isValid &= validation.kiemTraRong(
    CamSauSP,
    "errorCamSauSP",
    "(*) Vui lòng nhập camera sau"
  );
  isValid &= validation.kiemTraRong(
    CamTruocSP,
    "errorCamTruocSP",
    "(*) Vui lòng nhập camera trước"
  );
  isValid &= validation.kiemTraRong(
    HinhAnhSP,
    "errorHinhAnhSP",
    "(*) Vui lòng nhập hình ảnh"
  );
  isValid &= validation.kiemTraRong(
    MoTaSP,
    "errorMoTaSP",
    "(*) Vui lòng nhập mô tả"
  );
  isValid &= validation.kiemTraSelect(
    "TypeSP",
    "errorType",
    "(*) Vui lòng chọn type"
  );
  return isValid;
}
function themSP() {
  layGiaTri();
  //validation
  themValidation();
  getId(`btnThem`).onclick = function () {
    if (isValid) {
      var product = new Product(
        "",
        TenSP,
        GiaSP,
        ManHinhSP,
        CamSauSP,
        CamTruocSP,
        HinhAnhSP,
        MoTaSP,
        TypeSP
      );
      //validation
      if (confirm(`Bạn có chắc muốn thêm sản phẩm?`)) {
        var promise = api.themSPApi(product);
        promise
          .then(function () {
            layDanhSachSP();
            getId("btnClose").click();
            lamMoiInput();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        getId("btnClose").click();
      }
    }
  };
}
getId(`btnThemSP`).onclick = function () {
  getId(`btnThem`).style.display = "block";
  function keyUpThemSP() {
    TenSP = getId(`TenSP`).value;
    GiaSP = getId(`GiaSP`).value;
    ManHinhSP = getId(`ManHinhSP`).value;
    CamSauSP = getId(`CamSauSP`).value;
    CamTruocSP = getId(`CamTruocSP`).value;
    HinhAnhSP = getId(`HinhAnhSP`).value;
    MoTaSP = getId(`MoTaSP`).value;
    TypeSP = getId(`TypeSP`).value;
    //validation
    var isValid = true;
    isValid &= validation.kiemTraRong(
      TenSP,
      "errorTenSP",
      "(*)Vui lòng nhập tên"
    );
    isValid &=
      validation.kiemTraRong(GiaSP, "errorGiaSP", "(*) Vui lòng nhập giá") &&
      validation.kiemTraPattern(
        GiaSP,
        "errorGiaSP",
        "(*) Vui lòng nhập giá bằng số",
        /^[0-9]+$/
      );
    isValid &= validation.kiemTraRong(
      ManHinhSP,
      "errorManHinhSP",
      "(*) Vui lòng nhập kích thước màn hình"
    );
    isValid &= validation.kiemTraRong(
      CamSauSP,
      "errorCamSauSP",
      "(*) Vui lòng nhập camera sau"
    );
    isValid &= validation.kiemTraRong(
      CamTruocSP,
      "errorCamTruocSP",
      "(*) Vui lòng nhập camera trước"
    );
    isValid &= validation.kiemTraRong(
      HinhAnhSP,
      "errorHinhAnhSP",
      "(*) Vui lòng nhập hình ảnh"
    );
    isValid &= validation.kiemTraRong(
      MoTaSP,
      "errorMoTaSP",
      "(*) Vui lòng nhập mô tả"
    );
    isValid &= validation.kiemTraSelect(
      "TypeSP",
      "errorType",
      "(*) Vui lòng chọn type"
    );
    getId(`btnThem`).onclick = function () {
      if (isValid) {
        var product = new Product(
          "",
          TenSP,
          GiaSP,
          ManHinhSP,
          CamSauSP,
          CamTruocSP,
          HinhAnhSP,
          MoTaSP,
          TypeSP
        );
        //validation
        if (confirm(`Bạn có chắc muốn thêm sản phẩm?`)) {
          var promise = api.themSPApi(product);
          promise
            .then(function () {
              layDanhSachSP();
              getId("btnClose").click();
              lamMoiInput();
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          getId("btnClose").click();
        }
      }
    };
  }
  getId(`TenSP`).addEventListener("keyup", keyUpThemSP);
  getId(`GiaSP`).addEventListener("keyup", keyUpThemSP);
  getId(`ManHinhSP`).addEventListener("keyup", keyUpThemSP);
  getId(`CamSauSP`).addEventListener("keyup", keyUpThemSP);
  getId(`CamTruocSP`).addEventListener("keyup", keyUpThemSP);
  getId(`HinhAnhSP`).addEventListener("keyup", keyUpThemSP);
  getId(`MoTaSP`).addEventListener("keyup", keyUpThemSP);
  getId(`TypeSP`).addEventListener("keyup", keyUpThemSP);
};

function xoaSP(id) {
  if (confirm(`Bạn có chắc chắn xóa sản phẩm không?`)) {
    var promise = api.xoaSPApi(id);
    promise
      .then(function (result) {
        alert(`Đã xóa Id ${result.data.id} thành công`);
        layDanhSachSP();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
function suaSP(id) {
  getId(`btnCapNhat`).style.display = "block";
  var promise = api.laySPApi(id);
  promise
    .then(function (result) {
      getId(`TenSP`).value = result.data.name;
      getId(`GiaSP`).value = result.data.price;
      getId(`ManHinhSP`).value = result.data.screen;
      getId(`CamSauSP`).value = result.data.backCamera;
      getId(`CamTruocSP`).value = result.data.frontCamera;
      getId(`HinhAnhSP`).value = result.data.img;
      getId(`MoTaSP`).value = result.data.desc;
      getId(`TypeSP`).value = result.data.type;
    })
    .catch(function (error) {
      console.log(error);
    });
  //validation
  function keyUpThemSP() {
    // layGiaTri();
    TenSP = getId(`TenSP`).value;
    GiaSP = getId(`GiaSP`).value;
    ManHinhSP = getId(`ManHinhSP`).value;
    CamSauSP = getId(`CamSauSP`).value;
    CamTruocSP = getId(`CamTruocSP`).value;
    HinhAnhSP = getId(`HinhAnhSP`).value;
    MoTaSP = getId(`MoTaSP`).value;
    TypeSP = getId(`TypeSP`).value;

    // themValidation();
    var isValid = true;
    isValid &= validation.kiemTraRong(
      TenSP,
      "errorTenSP",
      "(*)Vui lòng nhập tên"
    );
    isValid &=
      validation.kiemTraRong(GiaSP, "errorGiaSP", "(*) Vui lòng nhập giá") &&
      validation.kiemTraPattern(
        GiaSP,
        "errorGiaSP",
        "(*) Vui lòng nhập giá bằng số",
        /^[0-9]+$/
      );
    isValid &= validation.kiemTraRong(
      ManHinhSP,
      "errorManHinhSP",
      "(*) Vui lòng nhập kích thước màn hình"
    );
    isValid &= validation.kiemTraRong(
      CamSauSP,
      "errorCamSauSP",
      "(*) Vui lòng nhập camera sau"
    );
    isValid &= validation.kiemTraRong(
      CamTruocSP,
      "errorCamTruocSP",
      "(*) Vui lòng nhập camera trước"
    );
    isValid &= validation.kiemTraRong(
      HinhAnhSP,
      "errorHinhAnhSP",
      "(*) Vui lòng nhập hình ảnh"
    );
    isValid &= validation.kiemTraRong(
      MoTaSP,
      "errorMoTaSP",
      "(*) Vui lòng nhập mô tả"
    );
    isValid &= validation.kiemTraSelect(
      "TypeSP",
      "errorType",
      "(*) Vui lòng chọn type"
    );
    getId(`btnCapNhat`).onclick = function () {
      if (isValid) {
        var product = new Product(
          "",
          TenSP,
          GiaSP,
          ManHinhSP,
          CamSauSP,
          CamTruocSP,
          HinhAnhSP,
          MoTaSP,
          TypeSP
        );
        //validation
        if (confirm(`Bạn có chắc muốn thêm sản phẩm?`)) {
          var promise = api.capNhatSPApi(product);
          promise
            .then(function () {
              layDanhSachSP();
              getId("btnClose").click();
              lamMoiInput();
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          getId("btnClose").click();
        }
      }
    };
  }
  getId(`TenSP`).addEventListener("keyup", keyUpThemSP);
  getId(`GiaSP`).addEventListener("keyup", keyUpThemSP);
  getId(`ManHinhSP`).addEventListener("keyup", keyUpThemSP);
  getId(`CamSauSP`).addEventListener("keyup", keyUpThemSP);
  getId(`CamTruocSP`).addEventListener("keyup", keyUpThemSP);
  getId(`HinhAnhSP`).addEventListener("keyup", keyUpThemSP);
  getId(`MoTaSP`).addEventListener("keyup", keyUpThemSP);
  getId(`TypeSP`).addEventListener("keyup", keyUpThemSP);
}
function capNhatSP(id) {
  layGiaTri();
  //validation
  var isValid = true;
  isValid &= validation.kiemTraRong(
    TenSP,
    "errorTenSP",
    "(*)Vui lòng nhập tên"
  );
  isValid &=
    validation.kiemTraRong(GiaSP, "errorGiaSP", "(*) Vui lòng nhập giá") &&
    validation.kiemTraPattern(
      GiaSP,
      "errorGiaSP",
      "(*) Vui lòng nhập giá bằng số",
      /^[0-9]+$/
    );
  isValid &= validation.kiemTraRong(
    ManHinhSP,
    "errorManHinhSP",
    "(*) Vui lòng nhập kích thước màn hình"
  );
  isValid &= validation.kiemTraRong(
    CamSauSP,
    "errorCamSauSP",
    "(*) Vui lòng nhập camera sau"
  );
  isValid &= validation.kiemTraRong(
    CamTruocSP,
    "errorCamTruocSP",
    "(*) Vui lòng nhập camera trước"
  );
  isValid &= validation.kiemTraRong(
    HinhAnhSP,
    "errorHinhAnhSP",
    "(*) Vui lòng nhập hình ảnh"
  );
  isValid &= validation.kiemTraRong(
    MoTaSP,
    "errorMoTaSP",
    "(*) Vui lòng nhập mô tả"
  );
  isValid &= validation.kiemTraSelect(
    "TypeSP",
    "errorType",
    "(*) Vui lòng chọn type"
  );
  getId(`btnCapNhat`).onclick = function () {
    if (isValid) {
      var product = new Product(
        id,
        TenSP,
        GiaSP,
        ManHinhSP,
        CamSauSP,
        CamTruocSP,
        HinhAnhSP,
        MoTaSP,
        TypeSP
      );
      //validation
      if (confirm(`Bạn có chắc muốn thêm sản phẩm?`)) {
        var promise = api.capNhatSPApi(product);
        promise
          .then(function () {
            layDanhSachSP();
            getId("btnClose").click();
            lamMoiInput();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        getId("btnClose").click();
        lamMoiInput();
      }
    }
  };
}
function timKiemSP() {
  var txtSearch = getId(`timKiemSP`).value;
  var promise = api.layDanhSachSPApi();
  promise
    .then(function (result) {
      var searchArr = [];
      for (var i = 0; i < result.data.length; i++) {
        var product = result.data[i];
        var keyWordSearch = txtSearch.toLowerCase();
        var productName = result.data[i].name.toLowerCase();
        if (productName.indexOf(keyWordSearch) !== -1) {
          searchArr.push(product);
        }
      }
      renderUI(searchArr);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getId(`timKiemSP`).addEventListener("keyup", timKiemSP);
function locGiaSP() {
  var sort = getId(`locGiaSP`).value;
  if (sort === "nhoDenLon") {
    var promise = api.layDanhSachSPApi();
    promise
      .then(function (result) {
        for (var i = 0; i < result.data.length; i++) {
          for (var j = i + 1; j < result.data.length; j++) {
            if (
              parseFloat(result.data[i].price) >
              parseFloat(result.data[j].price)
            ) {
              var temp = result.data[i];
              result.data[i] = result.data[j];
              result.data[j] = temp;
            }
          }
        }
        renderUI(result.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else if (sort === "lonDenNho") {
    var promise = api.layDanhSachSPApi();
    promise
      .then(function (result) {
        for (var i = 0; i < result.data.length; i++) {
          for (var j = i + 1; j < result.data.length; j++) {
            if (
              parseFloat(result.data[i].price) <
              parseFloat(result.data[j].price)
            ) {
              var temp = result.data[i];
              result.data[i] = result.data[j];
              result.data[j] = temp;
            }
          }
        }
        renderUI(result.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    layDanhSachSP();
  }
}
function lamMoiInput() {
  getId(`TenSP`).value = "";
  getId(`GiaSP`).value = "";
  getId(`ManHinhSP`).value = "";
  getId(`CamSauSP`).value = "";
  getId(`CamTruocSP`).value = "";
  getId(`HinhAnhSP`).value = "";
  getId(`MoTaSP`).value = "";
  getId(`TypeSP`).selectedIndex = 0;
}
function lamMoiError() {
  getId(`errorTenSP`).innerHTML = "";
  getId(`errorGiaSP`).innerHTML = "";
  getId(`errorManHinhSP`).innerHTML = "";
  getId(`errorCamSauSP`).innerHTML = "";
  getId(`errorCamTruocSP`).innerHTML = "";
  getId(`errorHinhAnhSP`).innerHTML = "";
  getId(`errorMoTaSP`).innerHTML = "";
  getId(`errorTypeSP`).innerHTML = "";
}
