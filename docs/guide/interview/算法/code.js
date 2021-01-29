// 字母组合

function letterCombinations(digits){
  /**
   * 思路：回溯算法
   * 1. 路径：这里是数字代表的字母之间的组合
   * 2. 选择列表：选择数字代表的字符列表
   * 3. 结束条件：当前选择到的数字下标等于digits的长度，代表遍历完了
   */
  if(!digits.length){
    return []
  }
  let map = [
    "", // 0
    "", // 1
    "abc", // 2
    "def", // 3
    "ghi", // 4
    "jkl", // 5
    "mno", // 6
    "pqrs", // 7
    "tuv", // 8
    "wxyz", // 9
  ]
  let res = []
  // 代表已经确定的字母组合
  let path = []
  // index代表选择到的数字下标
  function backTrack(digits,index){
    // 终止
    if(index === digits.length){
      res.push(path.join(''))
      return
    }
    // 遍历选择列表
    let digit = Number(digits[index])
    // 当前字符串
    let letter = map[digit]
    for(let i =0 ;i<letter.length;i++){
      // 做选择
      path.push(letter[i])
      backTrack(digits,index+1)
      path.pop()
    }
  }
  backTrack(digits,0)
  return res
}


// 生成括号

function generateParenthesis(n){
  /**
   * 思路：回溯
   * 路径: 已拼接的字符
   * 选择列表：左括号和右括号
   * 结束条件：
   * 1. 左括号数量等于右括号
   * 2. 左括号 + 右括号数量 = 2 * n
   * 
   * === > l === r  === n
   * 
   * 剪枝：左括号数小于右括号
   */
  let res = []
  // 传入已用做右括号数量和当前拼接的字符
  function backtrack(l,r,str){
    if(l === n && r === n){
      res.push(str)
    }
    // 剪枝
    if(l < r){
      return
    }
    // 添加左括号
    if(l<n){
      backtrack(l+1,r,str + '(')
      // 这里无需撤销 因为是字符
    }
    // 添加右括号
    if(l > r){
      backtrack(l,r+1,str + ')')
    }
  }
  backtrack(0,0,'')
  return res
}


//反转区间m===>n的链表
/**
 * dummy => a=>b=>...=>d=>c=>..null
 * 首先找到a，d位置，反转m-n之间的链表，最后将a,b指针指向d,c
 */

 function reverseBetween(head,m,n){
   //base-case
   if(m === n){
     return head
   }
   let dummy = new ListNode(0)
   dummy.next = head
   // 确定a,d位置
   // 反转m。。。n
   let b = a.next
   let c = d.next
   for(let p2 = b;p1=p2.next;p1!==c){
     let temp = p1.next
     p1.next = p2
     p2 = p1
     p1 = temp
   }
   a.next = b
   d.next = c
   return dummy.next
 }

 // 删除链表的重复元素
 function delete(head){
   while(p && p.next){
     if(p.val === p.next.val){
       p.next = p.next.next
     }else{
       p = p.next
     }
   }
   return head
 }


 function quicksort(arr){
   let recc =(array)=>{
     if(array.length<=1){
       return array
     }
     let left = []
     let right = []
     let mid = array[0]
     for(let i =0;i<array.length;i++){
       if(array[i] < mid){
         left.push(array[i])
       }else{
         right.push(array[i])
       }
     }
     return [...recc(left),mid,...recc(right)]
   }
   return recc(arr)

 }
