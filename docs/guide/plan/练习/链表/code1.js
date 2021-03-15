// 非递归版本
var revirseListNode = (head)=>{
  let p1 = head
  let p2 = null
  while(p1){
    let temp = p1.next
    p1.next = p2
    p2 = p1
    p1 = temp
  }
  return p2
}

// 递归版本
var revirseListNode = (head)=>{
  let reverse = (p2,p1)=>{
    if(!p1){
      return p2
    }
    let temp = p1.next
    p2 = p1
    p1 = temp
    return reverse(p1,temp)
  }
  reverse(null,head)
}

var reverseBetween = function(head, m, n) {
  // 如果m等于n，直接返回head
  if(m===n)return head
  let dummyNode = new ListNode(0)
  dummyNode.next = head
  let a = dummyNode
  let d = dummyNode
  for(let i=0;i<m-1;i++){
    a = a.next
  }
  for(let i=0;i<n;i++){
    d= d.next
  }
  let b = a.next
  let c = d.next
  for(let p2 = b,p1=p2.next;p1!==c;){
    let temp = p1.next
    p1.next = p2
    p2 = p1
    p1 = temp
  }
  // 反转指向
  a.next = d
  b.next = c
  return dummyNode.next
}

function oddEvenList( head ) {
  if(!head)return null
  let odd = head
  let even = head.next
  let evenHead = even
  while(even && even.next){
    odd.next = odd.next.next
    even.next = even.next.next
    odd = odd.next
    even = even.next
  }
  odd.next = evenHead
  return head
}

var exchange = (nums)=>{
  let i =0
  for(let j =0;j<nums.length;j++){
    if(nums[j] % 2 !== 0){
      let temp = nums[j]
      nums[j] = nums[i]
      nums[i] = temp
    }
  }
  return nums
}

var deleteNode = function(node) {
  node.val = node.next.val
  node.next = node.next.next
}


var deleteDuplicates = function(head) {
  let p = head
  while(p && p.next){
    if(p.val === p.next.val){
      p.next = p.next.next
    }else{
      p = p.next
    }
  }
  return head
}

var addTwoNumbers = function(l1, l2) {
  let p1 = l1
  let p2 = l2
  let l3 = new ListNode(0)
  let p3 = l3
  let carry = 0
  while(p1||p2){
    let v1 = p1 ? p1.val : 0
    let v2 = p2 ? p2.val : 0
    let v3 = v1 + v2 +carry
    carry = Math.floor(v3 / 10)
    p3.next = new ListNode(v3 % 10)
    p1 && (p1 = p1.next)
    p2 && (p2 = p2.next)
    p3 = p3.next
  }
  if(carry){
    p3.next = new ListNode(carry)
  }
  return l3.next
}

var swapPairs = function(head){
  if(head === null || head.next === null){
    return head
  }
  let p1 = head
  let p2 = head.next
  p1.next = swapPairs(p2.next)
  p2.next = p1
  return p2
}

var mergeTwoLists = function(l1, l2) {
  if(l1 === null){
    return l2
  }
  if(l2 === null){
    return l1
  }
  if(l1.val > l2.val){
    l2 = mergeTwoLists(l1,l2.next)
    return l2
  }else{
    l1 = mergeTwoLists(l1.next,l2)
    return l1
  }
}


var mergeKLists = function(lists) {
  if(!lists.length){
    return null
  }
  let res = lists[0]
  for(let i=1;i<lists.length;i++){
    res = mergeTwoLists(res,lists[i])
  }
  return res
}
