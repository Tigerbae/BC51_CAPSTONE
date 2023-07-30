
//lop doi tuong api
var api = new Service();
var cart = new Cart();
//ham DOM
function getId(id) {
  return document.getElementById(id);
}
//lay danh sach tu api
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
//loc type sp
function locTypeSP() {
  var locSP = getId(`locSP`).value;
  if (locSP == "Iphone") {
    var promise = api.layDanhSachSPApi();
    promise
      .then(function (result) {
        var keyWordLocSP = locSP.toLowerCase();
        var searchType = [];
        for (var i = 0; i < result.data.length; i++) {
          var product = result.data[i];
          var keyWordType = product.type.toLowerCase();
          if (keyWordType == keyWordLocSP) {
            searchType.push(product);
          }
        }
        renderUI(searchType);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else if (locSP == "Samsung") {
    var promise = api.layDanhSachSPApi();
    promise
      .then(function (result) {
        var keyWordLocSP = locSP.toLowerCase();
        var searchType = [];
        for (var i = 0; i < result.data.length; i++) {
          var product = result.data[i];
          var keyWordType = product.type.toLowerCase();
          if (keyWordType == keyWordLocSP) {
            searchType.push(product);
          }
        }
        renderUI(searchType);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    layDanhSachSP();
  }
}
//render ra man hinh
function renderUI(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var product = data[i];
    content += `
  <div class="col">
            <div class="card">
              <img
                src="${product.img}"
                class="card-img-top"
                alt="item1"
              />
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <div class="gia">
                  <p class="gia__ban">${product.price} $</p>
                  <p class="gia__goc">
                    <del>2000 $</del>
                  </p>
                  </div>
                            <button type="button" class="btn btn-success" style="background: rgb(83, 110, 174);background: linear-gradient(90deg,rgba(83, 110, 174, 1) 0%,rgba(89, 122, 161, 1) 50%,rgba(171, 0, 255, 1) 100%);" onclick="themVaoGio('${product.id}')">Thêm Vào Giỏ</button>
                        </div>
                </div>
              </div>
            </div>
          </div>
  `;
  }
  getId(`product__list`).innerHTML = content;
}

//CART - CARTITEM
//tao su kien click show gio hang:
getId(`cart`).onclick = function () {
  getId(`myModal`).style.display = "block";
};
//tao su kien click dong gio hang:
getId(`btnDongGioHang`).onclick = function () {
  getId(`myModal`).style.display = "none";
};
getLocalStorage();
function renderGioHang(dataCart) {
  var content = "";
  for (var i = 0; i < dataCart.length; i++) {
    var cartItem = dataCart[i];
    cartItem.quality = 1;
    content += `
    <div class="cart-row">
                    <div class="cart-item cart-column">
                        <img class="cart-item-image" src="${
                          cartItem.img
                        }" width="100" height="100">
                        <span class="cart-item-title">${cartItem.name}</span>
                    </div>
                    <span class="cart-price cart-column">${
                      cartItem.price
                    } $</span>
                    <div class="cart-quantity cart-column">
                        <input onchange="doiSoLuong()" class="cart-quantity-input" type="number" value="${
                          cartItem.quality
                        }">
                        <button onclick="xoaGioHang('${
                          cartItem.id
                        }')" class="btn btn-danger" type="button">Xóa</button>
                    </div>
                    <span class="cart-price cart-column">${
                      cartItem.price * cartItem.quality
                    } $</span>
                </div>
    `;
  }
  getId(`gioHang`).innerHTML = content;
}
//them sp vao gio
function themVaoGio(id) {
  var promise = api.layDanhSachSPApi();
  promise
    .then(function (result) {
      for (var i = 0; i < result.data.length; i++) {
        var product = result.data[i];
        if (product.id === id) {
          cart.themSP(product);
          renderGioHang(cart.arr);
          setLocalStorage();
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
function setLocalStorage() {
  var dataString = JSON.stringify(cart.arr);
  localStorage.setItem(`cart`, dataString);
}
function getLocalStorage() {
  if (localStorage.getItem(`cart`)) {
    var dataString = localStorage.getItem(`cart`);
    var dataJSON = JSON.parse(dataString);
    cart.arr = dataJSON;
    renderGioHang(cart.arr);
  }
}
//render ra gio va tao obj cartItem them quality
function doiSoLuong() {
  var cart_item = document.getElementsByClassName("cart-items")[0];
  var cart_rows = cart_item.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cart_rows.length; i++) {
    var cart_row = cart_rows[i];
    var price_item = cart_row.getElementsByClassName("cart-price")[0];
    var quantity_item = cart_row.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    // chuyển chuỗi sang number
    var price = parseFloat(price_item.innerText);
    // console.log(price);
    // lấy giá trị trong thẻ input
    var quantity = quantity_item.value;
    total = total + price * quantity;
    // console.log(total);
  }
  document.getElementsByClassName("cart-total-price")[0].innerText =
    total + "$";
}

//quanlity
var quanlity_input = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quanlity_input.length; i++) {
  var input = quanlity_input[i];
  input.addEventListener("change", function (event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    doiSoLuong();
  });
}

//xoa sp trong gio
function xoaGioHang(id) {
  cart.xoaSP(id);
  renderGioHang(cart.arr);
  setLocalStorage();
  doiSoLuong();
}

