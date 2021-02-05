


const updateReceiptsInRedux = (receiptsInRedux, receiptChange) => {

  const idx = receiptsInRedux.findIndex((item) => item.id == receiptChange.id)

  if(idx !== 0){
    receiptsInRedux[idx - 1].electricIndexOld = receiptChange.electricIndex
    receiptsInRedux[idx - 1].waterIndexOld = receiptChange.waterIndex
    receiptsInRedux.splice(idx, 1, receiptChange)
  }
  else{
    receiptsInRedux.splice(idx, 1, receiptChange)
  }

  return receiptsInRedux
}


export {updateReceiptsInRedux}









