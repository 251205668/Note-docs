function multiRequest(urls= [],maxSum){
  let len = urls.length
  let result = Array(len).fill(false)
  let count = 0
  return new Promise((resolve,reject)=>{
    while(len < maxSum){
      next()
    }
    function next(){
      let current = count++
      // 如果数量足够了，就resolve出去
      if(current >= len){
        !result.includes(false) && resolve(result)
        return
      }
      const url = urls[current]
      fetch(url).then(data=>{
        result[current] = data
        if(current < len){
          next()
        }
      }).catch(err=>{
        result[current] = err
        if(current >  len){
          next()
        }
      })
    }
  })
}

class Scheduler{
  constructor(){
    this.count = 0
    this.waitQueue = []
  }
  add(promiseCreator) {
    if(this.count < 2){
      this.count ++
      this.run(promiseCreator)
    }else{
      return new Promise((resolve,reject)=>{
        this.waitQueue.push(()=>promiseCreator().then(resolve))
      })
    }
  }
  run(promiseCreator) {
    return promiseCreator().then(()=>{
      this.count --
      if(this.waitQueue.length){
        this,run(this.waitQueue.shift())
      }
    })
  }
}

// 长度最小的子数组

// [1,2,3,4,5] 求和大于等于s的最小子数组长度

var minSubArrayLen = function(s, nums) {
  let min = Infinity
  for(let i=0;i<nums.length;i++){
    let sum = 0
    for(let j = i;j<nums.length;j++){
      sum += nums[j]
      if(sum >= s){
        min = Math.min(j-i+1,min)
        if(min === 1)return min
        break
      }
    }
  }
  return min === Infinity ? 0 : min
}


// 目标和 正号和负号 求和为0的方法总数

var findTargetSumWays = function(nums, S) {
  if(nums.length)return 0
  let len = nums.length
  let map = new Map()
  function backTrack(nums,i,rest){
    if(i === len){
      if(rest === 0){
        return 1
      }
      return 0
    }
    let key = `${i}-${rest}`
    if(map.has(key))return map.get(key)
    const result = backTrack(nums,i+1,rest+nums[i]) + backTrack(nums,i+1,rest-nums[i])
    map.set(key,result)
    return result
  }
  return backTrack(nums,0,S)
}

// 最大递增子序列  保证i前面的所有元素严格小于nums[i]的最大+1
function lengthOfLIS(nums){
  // dp存的都是递增子序列长度
  if(!nums.length)return 0
  if(nums.length === 1)return 1
  let dp = Array(nums.length).fill(1)
  for(let i = 1;i<nums.length;i++){
    for(let j = 0;j<nums.length;j++){
      if(nums[j] < nums[i]){
        dp[i] = Math.max(dp[i],dp[j] + 1)
      }
    }
  }
  return Math.max(...dp)
}


// 最大连续子序列和 最大连续子数组和
var maxSubArray = function(nums) {
  // 正负效益
  let n = nums.length
  if(!n)return 0
  let dp = Array(n)
  dp[0] = nums[0]
  let maxSum = nums[0]
  for(let i=1;i<nums.length;i++){
    if(dp[i-1] > 0){
      dp[i] = dp[i-1] + nums[i]
    }else{
      dp[i] = nums[i]
    }
    maxSum = Math.max(maxSum,dp[i])
  }
  return maxSum
}
