export const transformDate = d => {
  let newDate = null
  if(typeof d === 'string'){
    newDate = new Date(d)
  } else {
    newDate = d
  }

  return `${newDate.getFullYear()}${newDate.getMonth()+1}${newDate.getDate()}`
}
