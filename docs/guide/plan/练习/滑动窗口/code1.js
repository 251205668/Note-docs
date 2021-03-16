var minWindow = function(s, t) {
  let left = 0
  let right = 0
  let need = new Map()
  for(let item of t){
    need.set(item,map.has(item) ? map.get(item) + 1:1)
  }
  let needSize = need.size()
  let res = ''
  while(right < s.length){
    let c1 = s[right]
    if(need.has(c1)){
      need.set(c1,need.get(c1) - 1)
    }
    if(need.get(c1) === 0){
      needSize --
    }
    while(needSize === 0){
      const newString = s.subString(left,right+1)
      if(!res || res.length > newString.length){
        res = newString
      }
      let c2 = s[left]
      if(need.has(c2)){
        need.set(c2,need.get(c2) + 1)
      }
      if(need.get(c2) === 1){
        needSize ++
      }
      left ++
    }
    right--
  }
  return res
}
var lengthOfLongestSubstring = function(s){
  let left = 0
  let res = 0
  for(let right = 0;right < s.length;right++){
    if(map.has(s[right]) && map.get(s[right]) >= left){
      left = map.get(s[right]) + 1
    }
    map.set(s[right],right)
    res = Math.max(res,right-left + 1)
  }
  return res
}

// 和大于等于target的最小连续子数组长度
var minSubArrayLen = function(s, nums) {
  let min = Infinity
  for(let i=0;i<nums.length;i++){
    let sum  = 0
    for(let j = i;j<nums.length;j++){
      sum += nums[j]
      if(sum >=s){
        min = Math.min(j - i + 1,min)
        if(min === 1){
          return min
        }
        break
      }
    }
  }
}
