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
              </div>
            </div>
          </div>
  `;
  }
  getId(`product__list`).innerHTML = content;
}
function ThemSP()

// LA

const products = [
  // Các sản phẩm 
  {
    name: "Iphone 11 Pro Max (Green)",
    type: "iphone",
    price: 24000000,
    discountPrice: 29000000,
    image: "./img/iphone-11-pro-max-green.png",
  },
  // Thêm các sản phẩm khác tương tự
];

const cart = []; // Mảng giỏ hàng

function filterProducts() {
  const selectedType = document.getElementById("filter__select").value;
  let filteredProducts = [];
  if (selectedType === "all") {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter((product) => product.type === selectedType);
  }
  renderProducts(filteredProducts);
}

function renderProducts(filteredProducts) {
  const productListContainer = document.getElementById("product__list-container");
  productListContainer.innerHTML = ""; // Xóa danh sách sản phẩm hiện tại

  // Tạo giao diện cho từng sản phẩm trong danh sách filteredProducts
  filteredProducts.forEach((product, index) => {
    const productCard = `
      <div class="col">
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="item${index}" />
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <div class="gia">
              <p class="gia__ban">${product.price} VND</p>
              <p class="gia__goc">
                <del>${product.discountPrice} VND</del>
              </p>
            </div>
            <button onclick="addToCart(${index})">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
    productListContainer.innerHTML += productCard; // Thêm sản phẩm vào danh sách
  });
}

function addToCart(productIndex) {
  const productToAdd = products[productIndex];

  // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
  const existingCartItem = cart.find(item => item.product.name === productToAdd.name);

  if (existingCartItem) {
    // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
    existingCartItem.quantity++;
  } else {
    // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào mảng cart
    const cartItem = {
      product: productToAdd,
      quantity: 1,
    };
    cart.push(cartItem);
  }

  // Hiển thị số lượng sản phẩm trong giỏ hàng
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById("cart__list");
  const totalElement = document.getElementById("total__price");
  cartList.innerHTML = ""; // Xóa danh sách giỏ hàng hiện tại
  let totalPrice = 0;

  // Tạo giao diện cho từng sản phẩm trong giỏ hàng
  cart.forEach((cartItem) => {
    const { product, quantity } = cartItem;
    const cartItemElement = document.createElement("li");
    cartItemElement.innerHTML = `${product.name} x ${quantity} = ${product.price * quantity} VND`;
    cartList.appendChild(cartItemElement);
    totalPrice += product.price * quantity;
  });

  // Hiển thị tổng giá tiền
  totalElement.innerText = totalPrice;
}

function checkout() {
  alert("Thank you for your purchase!");
  cart.length = 0; // Clear giỏ hàng
  renderCart(); // Hiển thị giỏ hàng rỗng
}

// Load giỏ hàng từ localStorage
const cartData = localStorage.getItem("cart");
if (cartData) {
  cart.push(...JSON.parse(cartData));
  renderCart();
}

// Lưu giỏ hàng vào localStorage mỗi khi thay đổi giỏ hàng
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Gắn sự kiện cho nút tăng giảm số lượng
function changeQuantity(cartItemId, isIncrease) {
  const cartItem = cart.find(item => item.product.name === cartItemId);
  if (cartItem) {
    if (isIncrease) {
      cartItem.quantity++;
    } else {
      cartItem.quantity--;
      if (cartItem.quantity <= 0) {
        const indexToRemove = cart.indexOf(cartItem);
        if (indexToRemove !== -1) {
          cart.splice(indexToRemove, 1);
        }
      }
    }
  }

  // Hiển thị lại giỏ hàng sau khi thay đổi số lượng
  renderCart();
}

// Lưu giỏ hàng vào localStorage mỗi khi thay đổi giỏ hàng
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
