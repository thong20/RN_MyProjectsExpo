Chuẩn hóa chuỗi số của TextInput

<TextInput
  value={}
  onChangeText={str => ...}
/>

Biến 'str' sẽ phụ thuộc vào giá trị của thuộc tính 'value'
Với cách chuẩn hóa thông thường, ta sẽ gặp trường hợp render sai:
  - khi ta nhập tới ký tự số thứ 4, vd: 1111
  => thỏa điều kiện vòng lặp for, nên sẽ thêm 1 ký tự dấu '.' vào, và thành 1.111
  => lúc này thuộc tính 'value' sẽ nhận length là 5 vì: có thêm dấu '.' => 1.111

  => ta nhập thêm 1 ký tự số nữa là 1, lúc này, 'value' có length là 6 => 1.1111
  => thỏa điều kiện vòng lặp for, nên sẽ thêm 1 ký tự dấu '.' vào, và thành => 1.1.111

  => lúc này thuộc tính 'value' sẽ nhận length là 7 vì: có thêm dấu '.' là thành 2 dấu '.' và 5 số      1 => 1.1.111
  => tiếp tục, ta nhập thêm 1 ký tự số nữa là 1, lúc này, 'value' có length là 8 => 1.1.1111
  => thỏa điều kiện vòng lặp for, nễn sẽ thếm 2 dấu '.' vào, và thành: 1..1.1.111
  => do chuỗi đầu vào có tồn tại ký tự dấu '.' do ảnh hưởng của thuộc tính value
  => vì vậy ta phải xử lý chuỗi đầu vào, bảo đảm không có dấu '.' trước khi thực hiện vòng lặp for


