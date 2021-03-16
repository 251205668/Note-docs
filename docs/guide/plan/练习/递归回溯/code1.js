var subsets = function(nums) {
  let n =nums.length
  if(!n)return[]
  let res = []
  function backTrack(track,i){
    if(i<=n){
      res.push(track.slice())
    }
    for(let j = i;j<n;j++){
      track.push(nums[i])
      backTrack(track,j+1)
      track.pop()
    }
  }
  backTrack([],0)
  return res
}


function f (nums){
  let n = nums.length
  if(!n)return []
  let res = []
  function backTrack(track){
    if(track.length === n){
      return res.push(track.slice())
    }
    for(let i=0;i<n;i++){
      if(track.includes(nums[i]))continue
      track.push(nums[i])
      backTrack(track.slice())
      track.pop()
    }
  }
  backTrack([])
  return res
}

var combinationSum = function(candidates, target) {
  if(!target)return []
  let n = candidates.length
  let res = []
  candidates.sort((a,b)=>a-b)
  function backTrack(track,i,rest){
    if(rest === 0){
      res.push(track)
      return
    }
    for(let j =i;j<n;j++){
      if(rest < candidates[j])break
      track.push(candidates[j])
      backTrack(track.slice(),j,target - rest)
      track.pop()
    }
  }
  backTrack([],0,target)
  return res

}

var letterCasePermutation = function(S) {
  let n = S.length
  let res = []
  function backTrack(str,i){
    if(i === n){
      return res.push(str.slice())
    }
    let s = S[i]
    if(s >= 'a' && s <= 'z' || s>= 'A' && s <= 'Z'){
      let upper = str + s.toUpperCase()
      let lower = str + s.toLowerCase()
      backTrack(upper,i+1)
      backTrack(lower,i+1)
    }else{
      backTrack(str+s,i+1)
    }
  }
  backTrack('',0)
  return res
}

var permutation = function(S) {
  let n = S.length
  let res = []
  let visited = Array(n).fill(0)
  S = S.split('').sort().join('')
  function backTrack(str){
    if(str.length === n){
      return res.push(str.slice())
    }
    for(let i=0;i<n;i++){
      if(visited[i] === 1)continue
      if(visited[i-1] === 0 && S[i-1] === S[i])continue
      visited[i] = 1
      backTrack(str + S[i])
      visited[i] = 0
    }
  }
  backTrack('')
  return res

}

var permuteUnique = function(nums) {
  let n = nums.length
  let res = []
  let visited = Array(n).fill(0)
  nums.sort((a,b)=>a-b)
  function backTrack(path){
    if(path.length === n){
      return res.push(path)
    }
    for(let i=0;i<n;i++){
      if(visited[i] === 1)continue
      if(visited[i-1] === 0 && i-1>=0 && nums[i] === nums[i-1])continue
      visited[i] = 1
      path.push(nums[i])
      backTrack(path)
      visited[i] = 0
      path.pop()
    }
  }
  backTrack('')
return res
}

var partition = function(str) {
  let n = str.length
  let res = []
  function f(s){
    let left = 0
    let right = s.length -1
    while(left <= right){
      if(s[left]!==s[right])return false
      left++
      right--
    }
  }
  function backTrack(path,start){
    if(start === str.length){
      res.push(s)
      return
    }
    for(let i = start;i<n;i++){
      let c = str.slice(start,i+1)
      if(!f(c))continue
      path.push(str.slice(start,i+1))
      backTrack(path,i+1)
      path.pop()
    }
  }
  backTrack('',0)
  return res
}

var restoreIpAddresses = function(s) {
  let len = s.length
  if(len < 4 || len> 12)return []
  let res = []
  function backTrack(start,p,path){
    if(p === 4){
      if(start === len){
        res.push(path.slice())
        return 
      }
    }
    let c = ''
    for(let i = start;i < start + 3;i++){
      c += s[i]
      if(s[start] === '0' || parseInt(c) > 255)break
      backTrack(i+1,p+1,path + c + (p === 3 ? '' : '.'))
    }
  }
  backTrack(0,0,'')
  return res
}

// 记一下
var validIPAddress = function(IP) {}

var divingBoard = function(shorter, longer, k) {
  let res = []
  if(k===0){
    return []
  }
  if(shorter === longer){
    return [shorter * k]
  }
  for(let i=0;i<k;i++){
    let longerCount = i
    let shortCount = k - i
    res.push(shortCount * shorter + longer * longerCount)
  }
  return res
}

var exist = function(board, word) {
  
}

