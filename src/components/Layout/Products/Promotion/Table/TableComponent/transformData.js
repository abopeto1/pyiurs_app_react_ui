import { transformDateFormat } from '../../../../../../utils'

export const transformData = datas => {
  return datas.reduce((acc,item) => {
    const variable = item.type.id === 1 ? `-${item.percent} %` : item.type.id === 2 ? `${item.price} $` : "Au prix d'achat total"
    return [...acc,{
      ...item,variable,promotype:item.type.name,key:item.id,
      date_end: item.end_date ? transformDateFormat(item.end_date) : "Indéfinie"
    }]
  },[])
}
