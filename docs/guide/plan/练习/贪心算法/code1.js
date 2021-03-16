var findContentChildren = function(g, s) {
  g = g.sort((a,b)=>b-a)
  s= s.sort((a,b)=>b-a)
  let g1 = 0
  let s1 = 0
  let res = 0
  while(g1 <= g && s1 <= s){
    if(s[s1] >= g[g1]){
      g1++
      s1++
      res++
    }else{
      g1++
    }
  }
  return res
}

var eraseOverlapIntervals = function(intervals) {
  if(!intervals.length)return 0
  intervals = intervals.sort((a,b)=>a[1]-b[1])
  let endX = intervals[0][1]
  let count = 1
  for(let interval of intervals){
    let start = interval[0]
    if(start >= endX){
      count++
      endX = interval[1]
    }
  }
  return intervals.length - count
}

var merge = function(intervals) {
  if(!intervals.length)return []
  let res = []
  intervals.sort((a,b)=>a[1]-b[1])
  let pre = intervals[0]
  for(let i= 0;i<intervals.length;i++){
    let cur = intervals[i]
    if(pre[1] >cur[0]){
      pre[1] = Math.max(cur[1],pre[1])
    }else{
      res.push(pre)
      pre = cur
    }
  }
  res.push(pre)
  return res
}

