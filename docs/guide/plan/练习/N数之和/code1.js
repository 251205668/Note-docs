var twoSum = function(nums, target) {
  let map = new Map()
  for(let i=0;i<nums.length;i++){
    if(map.has(nums[i])){
      return [map.get(nums[i]),i]
    }else{
      map.set(target-nums[i],i)
    }
  }
}

// 有序数组
var twoSum = function(numbers, target) {
  let left = 0
  let right = numbers.length
  while(left <=right){
    let sum = numbers[left] + numbers[right]
    if(sum === target){
      return [left-1,right-1]
    }else if(sum >target){
      right--
    }else{
      left++
    }
  }
  return [-1,-1]
}


// 三数之和

var threeSum = function(nums) {
  function twoSum(nums,target){
    let result = []
    let map =new Map()
    for(let i=0;i<nums.length;i++){
      if(map.has(nums[i])){
        result.push([nums[map.get(nums[i]),nums[i]]])
      }else{
        map.set(target-nums[i],i)
      }
    }
  }
  // 记住排序
  nums.sort((a,b)=>a-b)
  let results = []
  let set = new Set()
  for(let i=0;i<nums.length-2;i++){
    let find = twoSum(nums.slice(i+1),-nums[i])
    find.forEach(item=>{
      if(!set.has(item.join(''))){
        results.push([nums[i],...item])
      }
      set.add(item.join(''))
    })

  }
  return results
}
