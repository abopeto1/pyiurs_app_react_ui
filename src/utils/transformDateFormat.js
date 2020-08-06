export const transformDateFormat = (d,format) => {
  if(!d) return true
  
  let newD = null
  if(typeof d === 'string'){
    newD = new Date(d)
  } else {
    newD = d
  }
  const newDate = new Date(newD.toUTCString())
  if(format === 'Y-m-d H:i'){
    return `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`
  } else if(format === 'Y-m'){
    return newDate.getMonth() < 9 ? `${newDate.getFullYear()}-0${newDate.getMonth()+1}` : `${newDate.getFullYear()}-${newDate.getMonth()+1}`
  } else if(format === 'Ym'){
    return newDate.getMonth() < 9 ? `${newDate.getFullYear()}0${newDate.getMonth()+1}` : `${newDate.getFullYear()}${newDate.getMonth()+1}`
  } else if(format === 'Ymd'){
    return newDate.getMonth() < 9 ? `${newDate.getFullYear()}0${newDate.getMonth()+1}${newDate.getDate()}` : `${newDate.getFullYear()}${newDate.getMonth()+1}${newDate.getDate()}`
  } else {
    return `${newDate.getFullYear()}-${newDate.getMonth() > 9 ? newDate.getMonth()+1 : `0${newDate.getMonth()+1}`}-${newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`}`
  }
}
