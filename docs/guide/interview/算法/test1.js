// 递归与回溯

// 子集
var subsets = function(nums) {
  const n = nums.length
  let res = []
  function backTrack(track,i){
    if(i <= n){
      res.push(track)
    }
    for(let j =i;j<n;j++){
      track.push(nums[j])
      backTrack(track.slice(),j+1)
      track.pop()
    }
  }
  backTrack([],0)
  return res
}
// 全排列
function a(nums){
  const n =nums.length
  const res = []
  function backTrack(track){
    if(track.length === n){
      return res.push(track.slice())
    }
    for(let i=0;i<n;i++){
      if(track.includes(nums[i])){
        continue
      }
      track.push(nums[i])
      backTrack(track.slice())
      track.pop()
    }
  }
  backTrack([])
  return res
}
// 组合总和
var combinationSum = function(candidates, target) {
  const res = []
  const n = candidates.length
  // 记得排序
  candidates.sort((a,b)=>a-b)
  function backTrack(track,i,rest){
    if(rest === 0){
      res.push(track.slice())
      return
    }
    for(let j =i;j<n;j++){
      if(rest < candidates[j])break
      track.push(candidates[j])
      backTrack(track.slice(),j,rest - candidates[j])
      track.pop()
    }
  }
  backTrack([],0,target)
  return res
}
// 字母大小写全排列
var letterCasePermutation = function(S) {
  const n = S.length
  const res = []
  function backTrack(str,i){
    if(i === n){
      res.push(str)
      return
    }
    const s = S[i]
    if(s >='a' && s<='z' || s<='Z'&&s>='A'){
      // 考虑大写和小写回溯
      const lower = str + s.toLowerCase()
      const upper = str + s.toUpperCase()
      backTrack(lower,i+1)
      backTrack(upper,i+1)
    }else{
      backTrack(str + s)
    }
  }
  backTrack('',0)
  return res
}
// 面试题 08.08. 有重复字符串的排列组合
var permutation = function(S) {
  const n =S.length
  let visited = new Array(n).fill(0)
  let res = []
  S.split().sort().join()
  function backTrack(str){
    if(str.length === n){
      return res.push(str)
    }
    for(let i=0;i<n;i++){
      // 两个剪枝条件: 已经访问过 当前字符和上个字符相同并且上个字符未访问
      if(visited[i] === 1)continue
      if(S[i-1] === S[i] && visited[i-1] === 0)continue
      visited[i] = 1
      backTrack(str+s[i])
      visited[i] = 0
    }
  }
  backTrack('')
  return res
}
// 全排列 II
var permuteUnique = function(nums) {
  const n = nums.length
  let res = []
  nums.sort((a,b)=>a,b)
  const visited = new Array(n).fill(0)
  function backTrack(path){
    if(path.length === n){
      return res.push(path.slice())
    }
    for(let i=0;i<nums.length;i++){
      if(visited[i] === 1)continue
      if(nums[i] === nums[i-1] && visited[i-1] === 0 && i-1 >=0){
        continue
      }
      visited[i] = 1
      path.push(nums[i])
      backTrack(path)
      visited[i] = 0
      path.pop()
    }
  }
  backTrack([])
  return res
}
// 分割回文串
var partition = function(str) {
  // 判断[start,i]是否为回文串，如果是回文串，进行切割
  const n = str.length
  const res = []
  function isPalinerome(s){
    let head = 0
    let tail = s.length - 1
    while(head <= tail){
      if(s[head] !== s[tail])return false
      head++
      tail--
    }
    return true
  }
  function backTrack(start,path){
    if(start === n){
      // 这里有点不一样
       res.push(path.slice())
    }
    // 选择列表 [start,n]，截取[start,i]
    for(let i=start;i<n;i++){
      // [start,i]不为回文串，剪枝
      if(!isPalinerome(str.slice(start,i+1)))continue
      path.push(str.slice(start,i+1))
      backTrack(i+1,path.slice())
      path.pop()
    }
  }
  backTrack(0,[])
  return res

}
// 复原IP地址
var restoreIpAddresses = function(s) {
  const n = s.length
  const res = []
  if(n < 4 || n>12)return []
  function backTrack(start,p,path){
    if(p === 4){
      if(start === s.length)res.push(path)
      return
    }
    let c = ''
    for(let i=start;i<start+3;i++){
      c +=s[i]
      if(s[start] === '0' || parseInt(c) >255)break
      backTrack(i+1,p+1,path + c +(p === 3 ? '' : '.'))
    }
  }
  backTrack(0,0,'')
  return res
}
// 面试题 16.11. 跳水板
var divingBoard = function(shorter, longer, k) {
  if(k === 0)return []
  let res = []
  if(longer === shorter){
    return [shorter * k]
  }
  for(let i=0;i<k;i++){
    let shortCount = i
    let longerCount = k -i
    res.push(shortCount * shorter + longerCount * longer)
  }
  return res
}
// 单词搜索
var exist = function(board, word) {
  // 第一个单词是否存在 然后回溯是否成立
  let m = board.length
  let n = board[0].length
  for(let row=0;row<m;row++){
    for(let col =0;col<n;col++){
      if(word[0] === board[row][col] && backTrack(row,col,0))return true
    }
  }
  // x,y i-当前遍历下标
  function backTrack(y,x,i){
    if(i + 1 === word.length)return true
    // 考虑上右下左
    let temp = board[y][x]
    board[y][x] = false
    if(board[y-1][x] === word[i+1] && backTrack(y-1,x,i+1))return true
    if(board[y][x+1] === word[i+1] && backTrack(y,x+1,i+1))return true
    if(board[y+1][x] === word[i+1] && backTrack(y+1,x,i+1))return true
    if(board[y][x-1] === word[i+1] && backTrack(y,x-1,i+1))return true
    board[y][x] = temp
  }
  return false
}
// N皇后
// 栈和队列
// 最近的请求次数
// 有效的括号
var isValid = function(s) {
  const n = S.length
  if(n % 2 !== 0)return false
  let stack = []
  for(let i=0;i<n;i++){
    let str = s[i]
    if(str === '[' || str === '(' || str === '{'){
      stack.push(str)
    }else{
      let c = stack[stack.length - 1]
      if(c === '[' && str === ']' || c === '{' && str === '}' || c === '(' && str === ')'){
        stack.pop()
      }else{
        return false
      }
    }
  }
  return s.length === 0
}
// 计数二进制子串
var countBinarySubstrings = function(s) {
  let counts = []
  let ptr = 0
  while(ptr < s.length){
    const c = s.charAt(ptr)
    let count = 0
    while(s.charAt(ptr) === c){
      count++
      ptr++
    }
    counts.push(count)
  }
  let countNum = 0
  // 可以拿到u个0 v个1或者u个1v个0，所以子串组合个树min{u,v}
  for(let i = 1;i<=counts.length;i++){
    countNum +=Math.min(counts[i-1],counts[i])
  }
  return countNum

}
// 最小栈
class MinStack{
  /**
   * 思路: 栈的每个元素都保存它前面所有元素的最小值
   */
  constructor(){
    this.stack = []
  }
  get size(){
    return this.stack.length
  }
  push(x){
    this.stack.push({
      val:x,
      min:this.size ? Math.min(this.getMin(),x):x
    })
  }
  pop(){
    return this.stack.pop()
  }
  top(){
    return this.stack[this.stack.length - 1].val
  }
  getMin(){
    return this.stack[this.stack.length - 1].min
  }
}
// 用栈实现队列
class MyQueue {
  /**
   * 上面两张图看完完全可以解释什么思路
   */
constructor() {
}
push(x) {
  this.stack1.push(x);
}
pop() {
    
}
peek() {
}
empty() {
}
}
// 用队列实现栈
class MyStack{
  /**
   */
  constructor(){
  }
  push(x){
     
  }
  pop(){
    
  }
  top(){
     
  }
  empty(){
     
  }
}
// 字符串解码
var decodeString = function(s) {}
// 根据身高重建队列
var reconstructQueue = function(people) {}
// 栈的压入、弹出序列
var validateStackSequences = function(pushed, popped) {}
// 链表
// 反转链表
var revirseListNode = (head)=>{}
// 反转链表 II

var reverseBetween = function(head, m, n) {}
// 链表奇偶重排
function oddEvenList( head ) {}
// 删除链表中的结点
// 删除排序链表中的重复元素
var deleteDuplicates = function(head) {}
// 两数相加
var addTwoNumbers = function(l1, l2) {}
// 两两交换链表中的节点
var swapPairs = function(head) {}
// K 个一组翻转链表
// 合并两个有序链表
var mergeTwoLists = function(l1, l2) {}
// 合并k个有序链表
var mergeKLists = function(lists) {}
// 复杂链表的复制
// 双指针
// 环形链表
var hasCycle = function(head) {}
// 求双链表的第一个公共结点
var getIntersectionNode = function(headA,headB){}
// 环形链表 II
var detectCycle = function(head) {}
// 链表的中间结点
var middleNode = function(head) {}
// 删除链表的倒数第N个结点
var removeNthFromEnd = function(head, n) {}
// 回文链表
var isPalindrome = function(head) {}
// 反转字符串
var reverseString = function(s) {}
// 判断回文字符串
function isPalindrome(s){}
// 合并两个有序数组
var merge = function(nums1, m, nums2, n) {}
// 通过删除字母匹配到字典里最长单词
// 盛最多水的容器
var maxArea = function(height) {}
// 接雨水
var trap = function(height) {}
// 二叉树
// 遍历系列
// 二叉树的层序遍历
var levelOrder = function(root) {}
// 二叉树的中序遍历
var inorderTraversal = function(root) {}
// 二叉树的锯齿形层序遍历
var zigzagLevelOrder = function(root) {}
// 已知二叉树求某值
// 二叉树的最小深度
var minDepth = function(root) {}
// 二叉树的直径
var diameterOfBinaryTree = function(root) {}
// 二叉树的深度
var maxDepth = function(root) {      }
// 二叉树的最近公共祖先
var lowestCommonAncestor = function(root, p, q) {}
// 左叶子之和
var sumOfLeftLeaves = function(root) {}
// 二叉树的右视图
var rightSideView = function(root) {}
// 二叉搜索树中第K小的元素
var kthSmallest = function(root, k) {}
// 特殊的二叉树
// 翻转二叉树
var invertTree = function(root) {}
// 对称二叉树
var isSymmetric = function(root) {}
// 平衡二叉树
var isBalanced = function(root) {}
// 二叉树的镜像
var mirrorTree = function(root) {}
// 验证二叉搜索树
var isValidBST = function(root) {}
// 把二叉搜索树转换为累加树
var convertBST = function(root) {}
// 将有序数组转换为二叉搜索树
var sortedArrayToBST = function(nums) {}
// 有序链表转换二叉搜索树
var sortedListToBST = function(head) {}
// 从前序与中序遍历序列构造二叉树
var buildTree = function(preorder, inorder) {}
// 合并二叉树
var mergeTrees = function(t1, t2) {}
// 树的子结构
var isSubStructure = function(A, B) {}
// 相同的树
var isSameTree = function(p, q) {}
// 求二叉树的路径
var hasPathSum = function(root, sum) {}
// 路径总和
// 求根到叶子节点数字之和
var sumNumbers = function(root) {}
// 二叉树中和为某一值的路径或者路径总和||
var pathSum = function(root, sum) {}
// 其他
// 二叉树展开为链表
var flatten = function(root) {}
// 填充每个节点的下一个右侧节点指针
var connect = function(root) {}
// 堆
// 数组中的第K个最大元素
var findKthLargest = function(nums, k) {}
// 前 K 个高频元素
var topKFrequent = function(nums, k) {}
// 二分查找
// 二分查找
var search = function(nums, target) {}
// 在排序数组中查找元素的第一个和最后一个位置
var searchRange = function(nums, target) {}
// 0～n-1中缺失的数字
var missingNumber = function(nums) {}
// x的平方根
var mySqrt = function(x) {}
// Pow(x, n)
var myPow = function(x, n) {}
// N数之和
// 两数之和
var twoSum = function(nums, target) {}
// 两数之和 II - 输入有序数组
var twoSum = function(numbers, target) {}
// 三数之和
var threeSum = function(nums) {}
// 滑动窗口
// 最小覆盖子串
var minWindow = function(s, t) {
  let left = 0
  let right = 0
  let need = new Map()
  for(let c of t){
    need.set(c,need.has(c) ? need.get(c) + 1 : 1)
  }
  let needSize = need.size
  let res = ''
  while(right < s.length){
    let c1 = s[right]
    // 右滑操作
    if(need.has(c1)){
      need.set(c1,need.get(c1) - 1)
      if(need.get(c1) === 0){
        needSize--
      }
    }
    while(needSize === 0){
      const newString = s.subString(left,right+1)
      if(!res || res.length > newString){
        res = newString
      }
      let c2 = s[left]
      need.set(c2,need.get(c2) + 1)
      if(need.get(c2) === 1){
        needSize++
      }
      left++
    }
    right++
  }
  return res
}
// 字符串的排列
var checkInclusion = function(s1, s2) {}
// 找到字符串中所有字母异位词
// 无重复字符的最长子串长度
var lengthOfLongestSubstring = function(s){}
// 滑动窗口最大值
// 长度最小的子数组
var minSubArrayLen = function(s, nums) {}
// 动态规划
// 斐波那契数🥇
var fib = function(n){
  let dp = [0,1,1]
  for(let i = 3;i<=n;i++){
    dp[i] = dp[i-1] + dp[i-2]
  }
  return dp[n]
}
// 零钱兑换🥇
var coinChange = function(coins,amount){
  let dp = Array(amount+1).fill(amount+1)
  dp[0] = 0
  for(let i=0;i<dp.length;i++){
    for(let coin of coins){
      if(i-coin < 0){
        continue
      }
      // 剩余需要凑的金币
      dp[i] = Math.min(dp[i],dp[i-coin])
    }
  }
  return dp[amount] === amount + 1 ? -1 :dp[amount]
}
// 爬楼梯🥇
// 打家劫舍🥇
// 打家劫舍 II🥇
// 打家劫舍 III🥇
// 目标和🥇
// 最长递增子序列问题🥇
// 最大连续子数组和🥇
// 买卖股票的最佳时机🥇
// 买卖股票的最佳时机 II🥇
// 买卖股票的最佳时机含手续费🥇
// 最佳买卖股票时机含冷冻期🥇
// 最长回文子串🥇
// 最长公共子序列🥇
// 两个字符串的删除操作🥇
// 最长重复子数组🥇
// 最小路径和🥇
// 贪心算法
// 分配饼干
// 无重叠区间
// 合并区间
// 用最少数量的箭引爆气球
// 剪绳子
// 跳跃游戏
// 前缀和
// 和为K的子数组
var subarraySum = function(nums, k) {}
// 字符串
// 电话号码的字母组合
var letterCombinations = function(digits) {}
// 回文子串个数
var countSubstrings = function(s) {}
// 括号生成
var generateParenthesis = function(n) {}
// 最长公共前缀
var longestCommonPrefix = function(strs) {}
// 字符串相加
let addString = (num1,num2)=>{}
// 翻转字符串里的单词
var reverseWords = (s)=>{}
// 排序和搜索
// 冒泡排序
// 插入排序
// 归并排序
// 快速排序
// 选择排序
// 堆排序
// 各排序算法的稳定性，时间复杂度，空间复杂度
// 二分法和进阶
// 矩阵
// 矩阵查找
function findElement( mat ,  n ,  m ,  x ) {}
// 搜索二维矩阵 II
var searchMatrix = function(matrix, target) {}
// 顺时针打印矩阵
var spiralOrder = function(matrix) {}
// 矩阵置零
var setZeroes = function(matrix) {}
