export const transformData = datas => {
  return datas.reduce((acc,item) => {
    const variable = item.type.id === 1 ? `-${item.percent} %` : item.type.id === 2 ? `${item.price} $` : "Au prix d'achat total"
    return [...acc,{
      ...item,variable,type:item.type.name,
    }]
  },[])
}
