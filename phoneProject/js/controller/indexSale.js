var api = new Service();
function getId(id) {
  return document.getElementById(id);
}
function LayDanhSachSP() {
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
LayDanhSachSP();
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
                            <button type="button" class="btn btn-cart">Thêm Vào Giỏ</button>
                        </div>
                </div>
              </div>
            </div>
          </div>
  `;
  }
  getId(`product__list`).innerHTML = content;
}

// CART
// DOM ID
var modal = getId("myModal");
var btn = getId("cart");
var close = document.getElementsByClassName("close")[0];
var close_footer = document.getElementsByClassName("close-footer")[0];
var order = document.getElementsByClassName("order")[0];
btn.onclick = function () {
  modal.style.display = "block";
};
close.onclick = function () {
  modal.style.display = "none";
};
close_footer.onclick = function () {
  modal.style.display = "none";
};
order.onclick = function () {
  alert("Cảm ơn bạn đã thanh toán. HẸN GẶP LẠI ");
};

// xóa item
var xoaItem = document.getElementsByClassName("btn-danger");
for (var i = 0; i < xoaItem.length; i++) {
  var button = xoaItem[i];
  button.addEventListener("click", function () {
    var button_remove = event.target;
    button_remove.parentElement.parentElement.remove();
  });
}

// cập nhật cart
function updateCart() {
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
    console.log(price);
    // lấy giá trị trong thẻ input
    var quantity = quantity_item.value;
    total = total + price * quantity;
    console.log(total);
  }
  document.getElementsByClassName("cart-total-price")[0].innerHTML =
    total + "VND";
}

// update quanlity
var quanlity_input = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quanlity_input.length; i++) {
  var input = quanlity_input[i];
  input.addEventListener("change", function (event) {
    var input = event.target;
    if ((isNaN(input.value), input.value <= 0)) {
      input.value = 1;
    }
    updateCart();
  });
}
