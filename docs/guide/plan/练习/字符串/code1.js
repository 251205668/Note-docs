var letterCombinations = function(digits) {}

var countSubstrings = function(s) {}

var generateParenthesis = function(n) {
  let res = []
  let n = strs.length
  function backTrack(l,r,str){
    if(l === n && r === n){
      res.push(str)
      return 
    }
    if(l <r){
      return
    }
    if(l < n){
      backTrack(l +1,r,str + '(')
    }
    if(r<l){
      backTrack(l,r+1,str+ ')')
    }
  }
  backTrack(0,0,'')
  return res
}

var longestCommonPrefix = function(strs) {

}

let addString = (num1,num2)=>{
  while(num1.length > num2.length) num2 = '0' + num1
  while(num1.length < num2.length) num1 = '0' + num2
  let res = ''
  let carry = 0
  for(let i = num1.length;i>=0;i--){
    let sum = +num1[i] + +num2[i] + carry
    res = sum %10 + res 
    carry = sum > 9 ?  1: 0
  }
  if(carry === 1){
    return '1' + res
  }else{
    return res
  }
}

var reverseWords = (s)=>{}
