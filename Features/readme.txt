Thuật toán:
- Hiện icon check.png khi được click
  Khi render lần đầu, chương trình chạy tới hàm map(), nó so sánh itemClicked.price === item.price
  Nhưng lúc này 'itemClicked' là 1 obj rỗng, không có thuộc tính price
  Lúc này itemClicked.price là FALSY => isSelected là FALSE
  Khi ta click item trong list (vd: 5000), ta đưa item này vào 1 state làm mẫu để so sánh vd: setItemClicked()
  Lúc này Component sẽ re-render lại
  Khi chương trình chạy vào map(), nó so sánh itemClicked.price === item.price
  Lúc này itemClicked.price là 5000, và so sánh với item.price => isSelected là TRUE
*** NOTE: như vậy khi ta gọi 1 thuộc tính của obj, mà thuộc tính đó không tồn tại
thì sẽ trả về null,

var [itemClicked, setItemClicked] = useState({})

function _onClick(item){
  setItemClicked(item.price)
}

const icon = {
  checked: require('../assets/icons/checked.png'),
  unChecked: require('../assets/icons/unchecked.png'),
}
const data = [
  { id: '11', price: 5000},
  { id: '22', price: 4000},
  { id: '33', price: 3000},
]

{data.map((item, index) => {
  const isSelected = itemClicked.price === item.price
  const isChecked = icon[isSelected ? 'checked' : 'unChecked']
  return (
    <TouchableOpacity onPress={_onClick(item)}>
      <Text>{item.price}</Text>
      <Image source={isChecked}/>
    </TouchableOpacity>
  )
})}








