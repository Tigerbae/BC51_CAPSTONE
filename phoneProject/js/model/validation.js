function Validation() {
  this.kiemTraRong = function (value, errorId, mess) {
    if (value === "") {
      getId(errorId).innerHTML = mess;
      getId(errorId).style.display = `block`;
      return false;
    }
    getId(errorId).innerHTML = "";
    getId(errorId).style.display = `none`;
    return true;
  };
  this.kiemTraPattern = function (value, errorId, mess, letter) {
    if (value.match(letter)) {
      getId(errorId).innerHTML = "";
      getId(errorId).style.display = `none`;
      return true;
    }
    getId(errorId).innerHTML = mess;
    getId(errorId).style.display = `block`;
    return false;
  };
  this.kiemTraSelect = function (idSelect, errorId, mess) {
    var selectType = getId(idSelect);
    if (selectType.selectedIndex !== 0) {
      getId(errorId).innerHTML = "";
      getId(errorId).style.display = `none`;
      return true;
    }
    getId(errorId).innerHTML = mess;
    getId(errorId).style.display = `block`;
    return false;
  };
}
