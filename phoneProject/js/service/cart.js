function Cart() {
    this.arr = [];
    this.themSP = function (product) {
      this.arr.push(product);
    };
    this.timViTri = function (id) {
      for (var i = 0; i < this.arr.length; i++) {
        var product = this.arr[i];
        if (product.id === id) {
          index = i;
          break;
        }
      }
    };
    this.xoaSP = function (id) {
      var index = this.timViTri(id);
      if (index !== -1) {
        this.arr.splice(index, 1);
      }
    };
   }
   