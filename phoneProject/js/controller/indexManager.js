//tao class
var api = new Service();
var validation = new Validation();
//tao function
function getId(id) {
  return document.getElementById(id);
}
//DOM lay gia tri
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
//lay danh sach Api
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
//render man hinh
function renderUI(data) {
 //tao bien rong
  var content = "";
  //duyet mang
  for (var i = 0; i < data.length; i++) {
   //tao bien hung doi tuong cua tung vi tri them vao bien rong:
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
//tao function rieng cho phan validation
function themValidation() {
 //tao bien co mang gia tri true(co gia tri)
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
    "errorTypeSP",
    "(*) Vui lòng chọn type"
  );
  return isValid;
}
//click vao nut them san pham:
getId(`btnThemSP`).onclick = function () {
 //validation
 lamMoiError();
 lamMoiInput();
 //tao nut them ket noi voi ham themSP():
  var btnThem = `<button id="btnThem" onclick='themSP()' class="btn btn-success" style="background: rgb(83, 110, 174);background: linear-gradient(90deg,rgba(83, 110, 174, 1) 0%,rgba(89, 122, 161, 1) 50%,rgba(171, 0, 255, 1) 100%);">Thêm</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnThem;
};
//tinh nang them SP:
function themSP() {
//goi ham lay value va validation:
layGiaTri();
themValidation();

 //validation dang ham keyup(callback function)
 function keyUpThemSP() {
  //lay gia tri (ko goi layGiaTri() vi con cua ham ko  tim dc doi tuong)
   TenSP = getId(`TenSP`).value;
   GiaSP = getId(`GiaSP`).value;
   ManHinhSP = getId(`ManHinhSP`).value;
   CamSauSP = getId(`CamSauSP`).value;
   CamTruocSP = getId(`CamTruocSP`).value;
   HinhAnhSP = getId(`HinhAnhSP`).value;
   MoTaSP = getId(`MoTaSP`).value;
   TypeSP = getId(`TypeSP`).value;
   //validation (ko goi themValidation() vi con cua ham ko  tim dc doi tuong)
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
     "errorTypeSP",
     "(*) Vui lòng chọn type"
   );
   //thao tac click nut Them ko the goi function themSP() vi dang dung vi trong trong con cua 1 function khac nen goi se ko function se ko hiu:
   getId(`btnThem`).onclick = function () {
    //neu bien co isValid la true(co gia tri)
     if (isValid) {
      //tao san pham qua class
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
        //goi api
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
 //them callback tu bien function o tren(keyUpThemSP()):
 getId(`TenSP`).addEventListener("keyup", keyUpThemSP);
 getId(`GiaSP`).addEventListener("keyup", keyUpThemSP);
 getId(`ManHinhSP`).addEventListener("keyup", keyUpThemSP);
 getId(`CamSauSP`).addEventListener("keyup", keyUpThemSP);
 getId(`CamTruocSP`).addEventListener("keyup", keyUpThemSP);
 getId(`HinhAnhSP`).addEventListener("keyup", keyUpThemSP);
 getId(`MoTaSP`).addEventListener("keyup", keyUpThemSP);
 getId(`TypeSP`).addEventListener("keyup", keyUpThemSP);
}
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
  getId(`exampleModalLabel`).innerHTML = `Sửa Sản Phẩm`;
  var btnCapNhat = `<button id="btnCapNhat" onclick='capNhatSP(${id})' class="btn btn-success" style="background: rgb(83, 110, 174);background: linear-gradient(90deg,rgba(83, 110, 174, 1) 0%,rgba(89, 122, 161, 1) 50%,rgba(171, 0, 255, 1) 100%);">Cập Nhật</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnCapNhat;
  var promise = api.laySPApi(id);
  promise
    .then(function (result) {
      lamMoiError();
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
      "errorTypeSP",
      "(*) Vui lòng chọn type"
    );
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
    lamMoiError();
  }

  //validation
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
