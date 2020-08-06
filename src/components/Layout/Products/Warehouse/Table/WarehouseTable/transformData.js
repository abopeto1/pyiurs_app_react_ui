export const transformData = datas => {
  const result  = groupByType(datas);
  
  return result.reduce((a,i) => {
    const wh = {
      key: i.id, name: i.name,
      types: i.types.reduce((acc, item) => {
        const productWh = item.products.reduce((r, i) => {
          return i.stock === undefined ? r + 1 : r
        }, 0)
        const buyValueWh = item.products.reduce((r, i) => {
          return i.stock === undefined ? parseFloat(i.pu) + parseFloat(i.caa) + r : r
        }, 0).toFixed(0)
        const sellValueWh = item.products.reduce((r, i) => {
          return i.stock === undefined ? parseFloat(i.pv) + r : r
        }, 0).toFixed(0)
        const productShop = item.products.reduce((r, i) => {
          return i.stock !== undefined && i.stock.qte - i.stock.out_qte > 0 && i.move_status === 1 ? r + 1 : r
        }, 0)
        const buyValueShop = item.products.reduce((r, i) => {
          return i.stock !== undefined && i.stock.qte - i.stock.out_qte > 0 && i.move_status === 1 ? parseFloat(i.pu) + parseFloat(i.caa) + r : r
        }, 0).toFixed(0)
        const sellValueShop = item.products.reduce((r, i) => {
          return i.stock !== undefined && i.stock.qte - i.stock.out_qte > 0 && i.move_status === 1 ? parseFloat(i.pv) + r : r
        }, 0).toFixed(0)

        const obj = {
          key: item.id, name: item.name, productWh, buyValueWh, sellValueWh, productShop, buyValueShop, sellValueShop
        }

        return [...acc, obj]
      }, [])
    }
    return [...a, wh]
  },[])
}

const groupByType = (datas) => {
  return datas.map(d => {
    return {
      ...d, types: d.products.reduce((a,i) => {
        a[i.type.id] = a[i.type.id] === undefined ? 
          { ...i.type, products: [ i ] } : { ...a[i.type.id], products: [...a[i.type.id]["products"], i] }

        return a
      },[])
    }
  })
}