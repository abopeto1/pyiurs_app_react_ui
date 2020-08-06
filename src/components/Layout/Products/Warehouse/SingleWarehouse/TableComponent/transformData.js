export const transformData = (datas,filter) => {
  const dataTransformed = datas.reduce((acc,item) => {
    return [
      ...acc,{
        ...item,type:"",key:item.id,
      }
    ]
  },[])

  if(filter === "En Boutique"){
    return dataTransformed.filter(d => d.stock && d.available && d.move_status === 1)
  }

  return []
}
