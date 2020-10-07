// export default Number.prototype.format = function (n, x, s, c) {
export default Number.prototype.format = function (n = 0, x = 3, s = '.', c = ',') {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    num = this.toFixed(Math.max(0, ~~n)); // ~~n là toán tử bitwise NOT double, 
  // tương tự hàm Math.floor(n) là làm tròn xuống

  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

