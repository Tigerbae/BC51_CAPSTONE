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
  <button onclick="suaSP('${product.id}')" class="btn btn-warning">Sửa</button>
  <button onclick="xoaSP('${product.id}')" class="btn btn-danger">Xóa</button>
  </td>
  
 </tr>
 `;
  }
  getId(`tblDanhSachSP`).innerHTML = content;
}
function xoaSP(id) {
  var promise = api.xoaSPApi(id);
  promise
    .then(function (result) {
      console.log(result.data);
      layDanhSachSP();
    })
    .catch(function (error) {
      console.log(error);
    });
}
function ThemSP() {
  var TenSP = getId(`TenSP`).va;
}
