export const transformDate = d => {
  let newDate = null
  if(typeof d === 'string'){
    newDate = new Date(d)
  } else {
    newDate = d
  }

  return `${newDate.getFullYear()}${newDate.getMonth()+1}${newDate.getDate()}`
}

export const transformDateFormat = d => {
  let newDate = null
  if(typeof d === 'string'){
    newDate = new Date(d)
  } else {
    newDate = d
  }

  return `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`
}

export const transformData = (datas) => {
  const open = datas.filter( d => console.log(typeof d.stock.created) || (d.stock && d.stock.available &&
    (parseInt(transformDate(d.stock.created)) < parseInt(transformDate(new Date())))
    && (d.bill_details && transformDate(d.bill_details[d.bill_details.length - 1].created) === transformDate(new Date()))
  ))
  const add = datas.filter(d =>  d.stock && transformDate(d.stock.created) === transformDate(new Date()))

  const sell = datas.filter(d => d.stock && !d.stock.available && transformDate(d.stock.created) === transformDate(new Date()))

  const rest = datas.filter(d => d.stock && d.stock.available)

  return {
    open:{
      title: "Stock D'Ouverture", qte: open.length,
      val: open.reduce((acc,item) => parseInt(item.pv) + acc, 0), pat:open.reduce((acc,item) => parseInt(item.pu) + parseInt(item.caa) + acc, 0)
    },
    add:{
      title: "Stock Ajouté", qte: add.length,
      val: add.reduce((acc,item) => parseInt(item.pv) + acc, 0), pat:add.reduce((acc,item) => parseInt(item.pu) + parseInt(item.caa) + acc, 0)
    },
    sell:{
      title: "Stock Vendus", qte: sell.length,
      val: sell.reduce((acc,item) => parseInt(item.pv) + acc, 0), pat:sell.reduce((acc,item) => parseInt(item.pu) + parseInt(item.caa) + acc, 0)
    },
    rest:{
      title: "Stock Restants", qte: rest.length,
      val: rest.reduce((acc,item) => parseInt(item.pv) + acc, 0), pat:rest.reduce((acc,item) => parseInt(item.pu) + parseInt(item.caa) + acc, 0)
    },
  }
}
