var findKthLargest = function(nums, k) {
  nums = nums.sort((a,b)=>b-a)
  return nums[k-1]
}

var findK = function(nums, k) {
  let map = new Map()
  for(let item of nums){
    map.set(item,map.has(item) ? map.get(item) + 1: 1)
  }
  let sortArray = [...map].sort((a,b)=>b[1] - a[1])
  return sortArray.map(item=>item[0]).slice(0,k)

}

class MinHeap{
  constructor(){
    this.heep = []
  }
  swap(m,n){
    let temp = this.heep[m]
    this.heep[m] = this.heep[n]
    this.heep[n] = temp
}
  upperShift(index){
    if(index === 0)return
    let parentIndex = Math.floor((index - 1)/2)
    if(this.heep[parentIndex] > this.heep[index]){
      this.swap(parentIndex,index)
      this.upperShift(parentIndex)
    }
  }
  push(x){
    this.heep.push(x)
    this.upperShift(this.size - 1)
  }
  pop(){
    this.heep[0] = this.heep.pop()
    this.downShift(0)
  }
  size(){
    return this.heep.length
  }
}
