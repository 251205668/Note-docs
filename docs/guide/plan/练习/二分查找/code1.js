var missingNumber = function(nums) {
  let left = 0
  let right = nums.length -1 
  while(left <=right){
    const mid = Math.floor((left + right) /2)
    if(nums[mid] === mid){
      left = mid +1
    }else{
      right = mid -1
    }
  }
  return left
}

var mySqrt = function(x) {
  let left = 0
  let right = x
  let res = 0
  while(left <= x){
    const mid = Math.floor((left+right)/2)
    if(mid * mid <= x){
      res = mid
      left = mid+1
    }else{
      right = mid - 1
    }
  }
  return res
}

var myPow = function(x, n) {
  if(n ===0){
    return 1
  }
  if(n < 0){
    x = 1/x
    n = -n
  }
  if(n % 2 === 0){
    return myPow(x*x,n/2)
  }else{
    return x * myPow(x,n-1)
  }
}
