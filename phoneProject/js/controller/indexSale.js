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
