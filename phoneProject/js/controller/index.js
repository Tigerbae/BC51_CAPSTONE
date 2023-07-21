var api = new Service();
function getId(id) {
  return document.getElementById(id);
}
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
  <div class="col">
            <div class="card">
              <img
                src="./img/${product.img}"
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
