function MaxMilk( grass ,  milk ) {
  // write code here
  let sum = 0
  let len = grass.length
  let map = new Map()
  for(let i =0;i<len;i++){
    map.set(grass[i],milk[i])
  }
  let left = 0
  while(milk.length){
    if(grass[left] == grass[left+1] || milk[left] == milk[left+1] || (grass[left] < grass[left+1] && milk[left] < milk[left+1])){
      sum+=milk[left]
      left++
    }else{
      break
    }
  }
  return sum
}
// [3,5,8,2],[2,3,5,7]  10

console.log(MaxMilk([5,5,5,5,5],[1,5,3,4,2]))

