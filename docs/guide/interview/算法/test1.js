// 冒泡
Array.prototype.bubleSort = function(){
  let arr = this
  for(let i = 0;i<arr.length-1;i++){
    for(let j = 0;j<arr.length-i-1;j++){
      if(arr[j] > arr[j+1]){
        let temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
      }
    }
  }
}
// test 
let arr = [1,2,4,1,2,55,3]
arr.bubleSort()
console.log(arr)

// 快速
Array.prototype.quickSort = function(){
  let recc = (arr)=>{
    if(arr.length <=1){
      return arr
    }
    let left = []
    let right = []
    let mid = arr[0]
    for(let i =1;i<arr.length;i++){
      if(arr[i] < mid){
        left.push(arr[i])
      }else{
        right.push(arr[i])
      }
    }
    return [...recc(left),mid,...recc(right)]
  }
  const result = recc(this)
  result.forEach((item,i)=>{
    this[i] = item
  })
}
// test
arr.quickSort()
console.log(arr)

// 归并
Array.prototype.mergeSort = function(){
  let recc = (arr)=>{
    if(arr.length <=1){
      return arr
    }
   // 将数组劈成两半
   let mid = Math.floor(arr.length/2)
   let left = arr.slice(0,mid)
   let right = arr.slice(mid,arr.length)
   let orderLeft = recc(left)
   let orderRight = recc(right)

   // 合并两个数组 也就是比较对头,对头小先的入队
   const res = []
   while(orderLeft.length || orderRight.length){
     if(orderLeft.length && orderRight.length){
       res.push(orderLeft[0] < orderRight[0] ? orderLeft.shift() : orderRight.shift())
     }else if(orderLeft.length){
       res.push(orderLeft.shift())
     }else if(orderRight.length){
       res.push(orderRight.shift())
     }
   }
   return res
  }
  const result = recc(this)
  result.forEach((item,index)=>{
    this[index] = item
  })
}

// test
arr.mergeSort()
console.log(arr)

// 二分

function binarySearch(item,arr){
  let left = 0
  let right = arr.length - 1
  while(left<=right){
    let mid = Math.floor((left + right)/2)
    let element = arr[mid]
    if(element > item){
      right = mid - 1
    }else if(element < item){
      left = mid + 1
    }else if(element === item) {
      return mid
    }
  }
  return -1
}
console.log(binarySearch(4,[2,3,4,5,1]))

// 二分左边界第一个元素

function binaryLeftSearch(item,arr){
  let left = 0 
  let right = arr.length - 1
  while(left <= right){
    const mid = Math.floor((left + right) / 2)
    const element = arr[mid]
    if(item === element){
      right = mid - 1
    }else if(item > element){
      left = mid + 1
    }else if(item < element){
      right = mid - 1
    }
  }
  // 判断数组是否越界
  if(left >= arr.length || arr[left] !== item){
    return -1
  }
  return left
}
console.log(binaryLeftSearch(4,[2,3,4,5,4,1]))

// 二分右边界第一个元素

function binaryRightSearch(item,arr){
  let left = 0 
  let right = arr.length - 1
  while(left <= right){
    const mid = Math.floor((left + right)/2)
    const element = arr[mid]
    if(item === element){
      left = mid + 1
    }else if(item > element){
      left = mid + 1
    }else {
      right = mid - 1
    }
  }
  if(right < 0 || arr[right] !== item){
    return -1
  }
  return right
}
console.log(binaryRightSearch(4,[2,3,4,5,4,1]))

/**
 * 栈和队列
 */

// 最近请求次数，求出请求时间t在[t-3000,t]的次数

RecentCounter.prototype.ping = function(t) {
  this.q.push(t)
  while(this.q[0] < t-3000){
    this.q.shift()
  }
  return this.q.length
}
// 判断是否是有效地括号 () [] {}
var isValid = function(s) {
  if(s.length%2 !==0){
    return false
  }
  let stack = []
  for(let i = 0;i<s.length;i++){
    let s = s[i]
    if(s === '(' || s === '[' || s === '{'){
      stack.push(s)
    }else{
      // 出栈
      let p = stack[stack.length-1]
      if(p === '(' && s===')' || p==='[' && s===']' || p==='{' && s==='}'){
        stack.pop()
      }else{
        return false
      }
    }
  }
  return stack.length === 0
}
//计算二进制子串出现次数如 00110011 输出6，借助counts数组计算出0,1次数数组，最后计算Math.min(counts[i-1],counts[i])

var countBinarySubstrings = function(s) {
  let counts = []
  let res = 0
  let left = 0
  while(left < s.length){
    let c = s.charAt(left)
    let count = 0
    if(s.charAt(left) === c){
      count++
      left++
    }
    counts.push(count)
  }
  for(let i = 1;i<counts.length;i++){
    res = Math.min(counts[i-1],counts[i])
  }
  return res
}

// 最小栈

class MinStack{
  constructor(){
    this.stack = []
  }
  get size(){
    return this.stack.length
  }
  push(x){
    this.stack.push({
      val:x,
      min:this.size ? Math.min(x,this.getMin()) : x
    })
  }
  pop(){
    this.stack.pop()
  }
  top(){
    return this.stack[this.stack.length - 1].val
  }
  getMin(){
    return this.stack[this.stack.length - 1].min
  }
}

// 栈实现队列
class MyQueue {
constructor() {
  this.stack1 = []; // 原始栈
  this.stack2 = []; // 辅助栈 其实可以看成队列
}
push(x) {
  this.stack1.push(x)
}
pop() {  
  while(this.stack1.length){
    this.stack2.push(this.stack1.pop())
  }
  let res = this.stack2.pop()
  while(this.stack2.length){
    this.stack1.push(this.stack2.pop())
  }
  return res
}
peek() {
  while(this.stack1.length){
    this.stack2.push(this.stack1.pop())
  }
  let res = this.stack2[this.stack2.length - 1]
  while(this.stack2.length){
    this.stack1.push(this.stack2.pop())
  }
  return res
  
}
empty() {
  return !this.stack1.length
}
}

// 队列实现栈
class MyStack{
  /**
   * 队列实现栈 出栈也就是相当于删掉队尾，这里需要借助中间队列，将原队列出队至一个元素也就是剩队尾，出队元素保存到中间队列，原队列出队即代表出队，最后恢复原队列
   */
  constructor(){
      this.queue = []
  }
  push(x){
    this.queue.push(x)
  }
  pop(){
    let q = []
    // 出队至一个元素
    while(this.queue.length > 1){
      q.push(this.queue.shift())
    }
    let res = this.queue.shift()
    while(q.length){
      this.queue.push(this.q.shift())
    }
    return res
  }
  top(){
    // 栈顶就是队尾
    return this.queue[this.queue.length-1]
  }
  empty(){
    return !this.queue.length
  }
}
// 字符串解码 s="3[a]2[bc]“ 输出aaabcbc  
var decodeString = function(s) {
  /**
   * 定义四个变量 repeatStack reStrStack repeat resStr
   * 遇到数字(可能连续): repeat = repeat * 10 + (cur - '0')
   * 遇到'[' 入栈，置空两个变量
   * 遇到']',出repeatStack栈，然后拼接参数temp，最后取出resStrStack.pop() + temp 
   */
  let repeatStack = []
  let resStrSTack = []
  let repeat = 0
  let resStr = ''
  for(let i =0;i<s.length;i++){
    let cur = s[i]
    if(cur === '['){
      repeatStack.push(repeat)
      resStrSTack.push(resStr)
      repeat = 0
      resStr = ''
    }else if(cur === ']'){
      let temp = ''
      let nums = repeatStack.pop()
      for(let i = 0;i<nums;i++){
        temp+=resStr
      }
      resStr = resStrSTack.pop() + temp
    }else if(cur >='0' && cur<='9'){
      repeat = repeat * 10 + (cur - '0')
    }else{
      resStr +=cur
    }
  }
  return resStr

}

// 根据身高重建队列  如果身高相同则人数多排后面，

// 判断栈的亚茹和弹出序列 输入pushed[1,2,3,4,5],pop[4,5,3,2,1] 输出true
var validateStackSequences = function(pushed, popped) {
  let stack = []
  let k= 0
  for(let i =0;i<push.length;i++){
    stack.unshift(pushed[i])
    while(stack.length && popped[k]!==null && popped[k] === stack[0]){
      stack.shift()
      k++
    }
  }
  return stack.length === 0
}


/**
 * 链表 + 双指针
 */

 // 反转链表
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

 // m-n反转链表
 // dummy ===> a->b----->d->c--null
 //               m      n

 var reverseBetween = function(head, m, n) {
   if(m === n){
     return head
   }
   let dummy = new ListNode(0)
   dummy.next = head
   let a = dummy
   let d = dummy
   for(let i = 0;i<m-1;i++){
     a = a.next
   }
   for(let i = 0;i<n;i++){
     d = d.next
   }
   let b = a.next
   let c = d.next
   for(let p2 = b,p1 = p2.next;p1!==c;){
     let temp = p1.next 
     p1.next = p2
     p2 = p1 
     p1 = temp
   }
   a.next = b
   d.next = c
   return dummy.next
 }
 // 删除链表重复节点
 var deleteNode = function(head) {
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

 // 两个链表两数相加，返回新的链表
 var addTwoNumbers = function(l1, l2) {
   let p1 = l1
   let p2 = l2
   let l3 = new ListNode(0)
   let p3 = l3
   // 十分位数
   let carry = 0
   while(l1 || l2){
     let v1 = p1 ? p1.val : 0
     let v2 = p2 ? p2.val : 0
     let v3 = v1 + v2 + carry
     carry = Math.floor(v3 / 10)
     p3.next = new ListNode(v3 % 10)
     if(p1) ; p1 = p1.next
     if(p2) ; p2 = p2.next
     p3 = p3.next
   }
   // 最后一位还存在carry时
   if(carry){
     p3.next = new ListNode(carry)
   }
   return l3.next
 }
 // 合并两个有序链表
 var mergeTwoLists = function(l1, l2) {
   // 链表中小的节点连在排序好的链表后面
   if(!l1){
     return l2
   }
   if(!l2){
     return l1
   }
   if(l1.val > l2.val){
     l2.next = mergeTwoLists(l1,l2.next)
     return l2
   }else{
     l1.next = mergeTwoLists(l1.next,l2)
     return  l1
   }
 }
 //合并k个有序链表
 var mergeKLists = function(lists) {
   if(!lists.length){
     return null
   }
   let res = lists[0]
   for(let i = 1;i<lists.length;i++){
     if(lists[i]){
       res = mergeTwoLists(res,lists[i])
     }
   }
   return res
 }

 // 环形链表
 var hasCycle = function(head) {
   let fast = head
   let slow = head
   while(fast && fast.next){
     fast = fast.next.next
     slow = slow.next
     if(fast === slow){
       return true
     }
   }
   return false
 }

// 求双链表的第一个公共节点
var getIntersectionNode = function(headA,headB){
  let p1 = headA
  let p2 = headB
  while(p1 !== p2){
    p1 = p1 ? p1.next : headA
    p2 = p2 ? p2.next : headB
  }
  return p1
}

// 环形链表|| 求入环点
var detectCycle = function(head) {
  let fast = head
  let slow = head
  while(fast && fast.next){
    fast = fast.next.next
    slow = slow.next
    if(fast === slow){
      break
    }
  }
  if(!fast || !fast.next){
    return null
  }
  slow = head
  while(slow !== fast){
    fast = fast.next
    slow = slow.next
  }
  return slow
}
// 求链表中间节点
var middleNode = function(head) {
  let fast = head
  let slow = head
  while(fast && fast.next){
    fast = fast.next.next
    slow = slow.next
  }
  return slow
}

// 删除链表倒数第N个节点
var removeNthFromEnd = function(head, n) {
  let fast = head
  let slow = head
  for(let i =0;i<n;i++){
    fast = fast.next
  }
  if(fast === null){
    return head.next
  }
  while(fast && fast.next){
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next
  return head
}

// 判断回文链表
var isPalindrome = function(head) {
  let fast = head
  let slow = head
  while(fast && fast.next){
    fast = fast.next.next
    slow = slow.next
  }
  let reverList = revirseListNode(slow.next)
  while(reverList){
    if(reverList.val !== head.val){
      return false
    }
    reverList = reverList.next
    head = head.next
  }
  return true
}

// 反转字符串
var reverseString = function(s) {
  let left = 0 
  let right = s.length - 1
  while(left < right){
    let temp = s[left]
    s[left] = s[right]
    s[right] = temp
    left++
    right--
  }
}

// 合并两个有序数组
var merge = function(nums1, m, nums2, n) {
  let i = m-1
  let j = n-1
  let k = nums1.length - 1
  while(i>=0 && j>=0){
    if(nums1[i] > nums[j]){
       nums1[k] = nums1[i]
       i--
    }else{
       nums1[k] = nums2[j]
       j--
    }
    k--
  }
  while(j>=0){
    nums[k] = nums2[j]
    k--
    j--
  }

}

// 盛最多水的容器
var maxArea = function(height) {
  if(!height.length){
    return 0
  }
  let res = 0
  let left = 0
  let right = height.length -1
  while(left < right){
    if(height[left] <height[right]){
      let cur = height[left] * (right - left)
      res = Math.max(cur,res)
      left++
    }else{
      let cur = height[right] * (right - left)
      res = Math.max(cur,res)
      right--
    }
  }
  return res
}

/**
 * 二叉树
 */

// 基础知识 dfs bfs 前中后序遍历
let dfs = (root)=>{
  if(!root){
    return
  }
  if(root.left){
    dfs(roo.left)
  }
  if(root.right){
    dfs(root.right)
  }
  if(!root.right &&!root.left){
    console.log(root.val)
  }
}
let bfs = (root)=>{
  if(!root){
    return
  }
  let q = [root]
  while(q.length){
    let n = q.shift()
    if(n.left){
      q.push(n.left)
    }
    if(n.right){
      q.push(n.right)
    }
    if(!n.left && !n.right){
      console.log(n.val)
    }
  }
}

let preOrder = (root)=>{
  if(!root){
    return
  }
  let stack = [root]
  while(stack.length){
    let n = stack.pop()
    if(n.right){
      stack.push(n.right)
    }
    if(n.left){
      stack.push(n.left)
    }
  }
}
let inOrder = (root)=>{
  if(!root){
    return
  }
  let stack = []
  let p = root
  while(stack.length || p){
    while(p){
      stack.push(p)
      p = p.next
    }
    const n = stack.pop()
    p = n.right
  }

}
let postOrder = (root)=>{
  if(!root){
    return
  }
  let stack = [root]
  let outputStack = []
  while(stack.length){
    let n = stack.pop()
    outputStack.push(n)
    if(n.left){
      stack.push(n.left)
    }
    if(n.right){
      stack.push(n.right)
    }
  }
  return outputStack.reverse()

}

// 层序遍历 
var levelOrder = function(root) {
  
  
}

// 锯齿形层序遍历
var zigzagLevelOrder = function(root) {}

// 二叉树的最小深度

var minDepth = function(root) {
  if(!root){
    return 0
  }
  let q = [[root,1]]
  let res =0
  while(q.length){
    let [n,depth] = q.shift()
    if(!n.left && !n.right && depth){
      res = depth
    }
    if(n.left){
      q.push([n.left,depth+1])
    }
    if(n.right){
      q.push([root.right,depth+1])
    }
  }
  return res
}

// 二叉树的直径

var diameterOfBinaryTree = function(root) {}

// 二叉树的深度
var maxDepth = function(root) {        }

// 二叉树的最近公共祖先 找到p,q最近公共祖先
var lowestCommonAncestor = function(root, p, q) {
  if(!root){
    return null
  }
  if(root === p || root === q){
    return root
  }
  let left = lowestCommonAncestor(root.left,p,q)
  let right = lowestCommonAncestor(root.right,p,q)
  if(!left){
    return right
  }
  if(!right){
    return left
  }
}

// 左叶子和
var sumOfLeftLeaves = function(root) {
  let sum = 0
  let isLeafNode = function(node){
    return node && !node.left && node.right
  }
  let dfs = (node)=>{
    if(!node){
      return
    }
    if(isLeafNode(node.left)){
      sum +=node.left.val
    }
    dfs(node.left)
    dfs(node.right)
  }
  dfs(root)
  return sum
}

// 二叉树的右视图

var rightSideView = function(root) {
  if(!root){
    return []
  }
  let q = [root]
  let res = []
  while(q.length){
    let length = q.length
    let last = 0
    for(let i=0;i<length;i++){
      let n = q.shift()
      if(n.left){
        q.push(n.left)
      }
      if(n.right){
        q.push(n.right)
      }
      if(n !== undefined){
        last = n.val
      }
    }
    res.push(last)
  }  
  return res
}

// 翻转二叉树  二叉树的镜像

var invertTree = function(root) {
  if(!root){
    return null
  }
  [root.left,root.right] = [root.right,root.left]
  invertTree(root.left)
  invertTree(root.right)
  return root 
}

// 对称二叉数
var isSymmetric = function(root) {
  var isEqual = (left,right)=>{
    if(!left && !right){
      return true
    }
    if(!left || !right){
      return false
    }
    return left.val === right.val && isEqual(left.left,root.right) && isEqual(left.right,root.left)
  }
  return isEqual(root.left,root.right)
}

// 平衡二叉树
var isBalanced = function(root) {
  // 求高度
  if(!root){
    return true
  }
  return Math.abs(treeDepth(root.left) - treeDepth(root.right)) <=1 &&
  isBalanced(root.left)&&
  isBalanced(root.right)
}

// 验证二叉搜索树
var isValidBST = function(root) {
  let healper = (node,upper,lower)=>{
    if(!node){
      return true
    }
    // 不在合法范围
    if(node.val >upper || node.val <lower){
      return false
    }
    return healper(node.left,node.val,lower) && healper(node.right,upper,node.val)
  }
  return healper(root,Infinity,-Infinity)
}

// 有序数组转换为二叉搜索树
var sortedArrayToBST = function(nums) {}

// 前序和中序遍历构造二叉树
var buildTree = function(preorder, inorder) {
  if(!preOrder || !inOrder){
    return null
  }
  let key = 0
  for(let i =0;i<inOrder.length;i++){
    if(inOrder[i] === preOrder[0]){
      key = i
    }
  }
  let root =  new TreeNode(preorder[0]) 
  root.left = buildTree(preOrder.slice(1,key+1),inorder.slice(0,key))
  root.right = buildTree(preOrder.slice(key+1),inorder.slice(key+1))
  return root
}

// 合并二叉树
var mergeTrees = function(t1, t2) {
  if(t1&& t2){
    t1.val +=t2.val
    t1.left = mergeTrees(t1.left,t2.left)
    t1.right = mergeTrees(t1.right,t2.right)
  }
  return t1 || t2
}

//判断A是否是B的子结构
var isSubStructure = function(A, B) {}

// 判断连棵树是否是相同的树
var isSameTree = function(p, q) {
  if(!q && !p){
    return true
  }
  if(!q && p){
    return false
  }
  if(!p && q){
    return false
  }
  if(p.val !== q.val){
    return false
  }
  if(isSameTree(p.left,q.left) && isSameTree(p.right,q.right)){
    return true
  }else{
    return false
  }
}

// 路径总和

var hasPathSum = function(root, sum) {
  if(!root)return false
  let dfs = (node,s)=>{
    if(!node.left && !node.right && s === sum){
      return true
    }
    if(node.left){
      dfs(node.left,s + node.left.val)
    }
    if(node.right){
      dfs(node.right,s + node.right.val)
    }
  }
  dfs(root,root.val)
  return false
}

// 求跟到叶子结点数字之和

var sumNumbers = function(root) {
  let res = 0
  let dfs = (node,num)=>{
    if(!node){
      return
    }
    // 拼接到叶子节点 最后求和时候转为Number
    num += node.val
    if(!node.left && !node.right){
      res +=Number(num)
    }
    dfs(node.left,num)
    dfs(node.right,num)
  }
  dfs(root)
  return res
}

//二叉树中和为某一值的路径，输出集合

var pathSum = function(root, sum) {
  let res = [] 
  let stack = []
  let dfs = (node,sum)=>{
    if(!node){
      return
    }
    // 做选择
    sum -=node.val
    if(sum === 0 && !node.left && !node.right){
      res.push(...[stack])
    }
    // 递归
   node.left && dfs(node.left,sum)
   node.right && dfs(node.right,sum)
    // 撤销选择
    stack.pop()
  }
  dfs(root,0)
  return res
}

// 二叉树展开链表

var flatten = function(root) {
  let dfs = (root)=>{
    if(!root){
      return
    }
    dfs(root.left)
    dfs(root.right)
    // 寻找二叉树左子树最右节点 然后将原二叉树的右子树拼接上去
    let pre = root.left
    while(pre.right){
      pre = pre.right
    }
    pre.right = root.right
    // 最后将二叉树的右子树变为根节点的左子树，左子树置空
    root.right = root.left
    root.left = null
  }
  dfs(root)
  return root
}


/**
 * 堆
 */

// 数组第K个最大元素
var findKthLargest = function(nums, k) {}

// 前K个高频元素

class MinHeep{
  constructor(){
    this.heep = []
  }
  shiftUp(index){
    if(index === 0){
      return 
    }
    let parentIndex = Math.floor(i-1/2)
    if(this.heep[parentIndex] > this.heep[index]){
      this.swap(parseInt,index)
      this.shiftUp(parentIndex)
    })
  }
  shifDown(index){
    let leftChildIndex = 2 * index +1 
    let rightChildIndex = 2 * index + 2
    if(this.heep[index] > this.heep[leftChildIndex]){
      this.swap(leftChildIndex,index)
      this.shifDown(leftChildIndex)
    }
    ...
  }
  // push进去 然后保证父节点必须小于子节点，所以需要做上移操作
  push(value){
    this.heep.push(value)
    this.shiftUp(this.heep.length - 1)
  }
  pop(value){

  }
  top(){
    return this.heep[0]
  }
  size(){
    return this.heep.length
  }
}
var topKFrequent = function(nums, k) {
  var map = new Map()
  nums.forEach(num=>{
    map.set(num,map.has(num) ? map.get(num) + 1 : 1)
})
map.forEach((value,key)=>{
  h1.insert({value,key})
  if(h1.length > k){
    h1.pop()
  }
})
return h1.heep.map(item=>item.key)

// 直接使用排序
nums = [...map].sort((a,b)=>b[1] -a[1])
return nums.map(item=>item[0]).slice(0,k)
}

/**
 * N数之和
 */

 // 两数之和 [2,7,11,15] target=9 输出0,1
 var twoSum = function(nums, target) {}

 // 两数之和 有序数组
 var twoSum = function(numbers, target) {}
 // 三数之和 寻找三个数相加为0的集合数组
 var threeSum = function(nums) {}

 /**
  * 滑动窗口
  */

  // 最小覆盖子串 + 字符串排列 + 找到字符串的所有字母异位词
  var minWindow = function(s, t) {}
  var checkInclusion = function(s1, s2) {}
  var findAnagrams = function(s, p) {}

  // 字无重复字符的最长子串长度
  var lengthOfLongestSubstring = function(s){}

  /**
   * 动态规划
   */

   // 斐波那契
   var fib = function(n) {}

   // 爬楼梯
   var climbStairs = function(n) {}

   // 打家劫舍

   var rob = function(nums) {}

   // 最长递增子序列

   function lengthOfLIS(nums){}

   // 买卖股票最佳时机

   var maxProfit = function(prices) {}

   // 最长回文子串

   let longestPalindrome = function (s) {}


  /**
   * 贪心算法
   */

   // 分配饼干

   // 无重叠区间

   // 跳跃游戏

   // 剪绳子

/**
 * 字符串
 */

 // 电话号码字母组合

 // 回文子串个数

 // 括号生成

 // 最长公共前缀




