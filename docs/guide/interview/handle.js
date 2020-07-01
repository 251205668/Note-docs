/**
 * 深拷贝
 * @param {Object} obj 
 */
function deepclone(obj = {}){
  if(typeof obj !== 'object' || obj === null){
    return obj
  }
  let ret
  if(ret instanceof Array){
    ret = []
  }else{
    ret ={}
  }
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      ret[key] = deepclone(obj[key])
    }
  }
  return ret
}
