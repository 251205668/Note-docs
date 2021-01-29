Array.prototype.quickSort = function () {
  const rec = (arr)=>{
    if(arr.length <= 1){
      return arr
    }
    const left =[]
    const right =[]
    const mid = arr[0]
    for(let i =1;i < arr.length;i++){
      if(arr[i] < mid){
        left.push(arr[i])
      }else{
        right.push(arr[i])
      }
    }
    return [...rec(left),mid,...rec(right)]
  }
  const result = rec(this)
  result.forEach((n,i)=>{
    this[i] = n
  })
}
var arr = [1,991,2,3,3,4,5,6,7]
arr.quickSort()
console.log(arr)
