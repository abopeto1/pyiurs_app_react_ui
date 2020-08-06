export const setMarge = (product) => {
  if(product && product.sold){
    let min = 0
    if(product.sold.type.id === 1){
      min = product.pv * ((100-product.sold.percent)/100)
      return min
    }
    if(product.sold.type.id === 2){
      min = product.sold.price
      return min
    }
    if(product.sold.type.id === 3){
      min = product.pu + product.caa
    }
    return min
  }
  
  if(product && product.pv){
    const min = product.pv*.75
    return min
  } else {
    return 0
  }
}
