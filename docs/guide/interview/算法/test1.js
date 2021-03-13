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
/**
 * dp[i] 代表偷[0,...i-1]的房子的价值
 * dp[i] = Math.max(dp[i-2],dp[i-1] + nums[i])
 * @param {*} nums 
 */
var rob = function(nums) {
  let n = nums.length
  if(!n)return 0
  if(n === 1)return nums[0]
  let dp = []
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0],nums[1])
  for(let i=2;i<nums.length;i++){
    dp[i] = Math.max(dp[i-2],dp[i-1] + nums[i])
  }
  return dp[n-1]
}
// 打家劫舍 II🥇 
// 删除首尾即可
// 打家劫舍 III🥇
/**
 * dp(0) dp(1)
 * 根节点偷 左右节点不能偷
 * 根节点不偷 左右节点偷一个，可以同时偷
 * @param {*} root 
 */
var rob = function(root) {
  const dfs = (node)=>{
    if(!node)return 0
    let left = dfs(node.left)
    let right = dfs(node.right)
    let dp = []
    dp[0] = Math.max(left[0],left[1]) + Math.max(right[0],right[1])
    dp[1] = node.val + left[0] + right[0]
    return dp
  }
  let res = dfs(root)
  return Math.max(res[0],res[1])
}
// 目标和🥇
/**
 * 
 * @param {*} nums 
 * @param {*} S 
 */
var findTargetSumWays = function(nums, S) {
  // 备忘录法
  if(!nums.length){
    return 0
  }
  let map = new Map()
  function dp(nums,index,rest){
    // 递归终止条件
    if(index === nums.length){
      if(rest === 0){
        return 1
      }
      return 0
    }
    let key = `${index}-${rest}`
    if(map.has(key)){
      return map.get(key)
    }
    // 加和减法都需要考虑
    const result = dp(nums,index+1,rest - nums[index]) + dp(nums,index+1,rest + nums[index])
    map.set(key,result)
    return result
  }
  return dp(nums,0,S)
}
// 最长递增子序列问题🥇
/**
 * dp[i] 代表到下标i之前严格小于nums[i]的递增子序列长度
 * 所以需要使用双循环来遍历，如果严格满足nums[j] > nums[i],dp[i] = Math.max(dp[i],1+dp[j]) 二者取最大值
 * @param {*} nums 
 */
function lengthOfLIS(nums){
  let n = nums.length
  if(!n)return 0
  if(n === 1)return 1
  // dp数组存放递增子序列长度 默认为1
  let dp = Array(n).fill(1)
  for(let i=1;i<n;i++){
    for(let j=0;j<n;j++){
      if(nums[i] > nums[j]){
        dp[i] = Math.max(dp[i],1+dp[j])
      }
    }
  }
  return Math.max(...dp)
}
// 最大连续子数组和🥇
/**
 * dp[i] 代表数组以 nums[i]结尾的最大连续数组和
 * 如果dp[i-1]>0 ,产生正效果 dp[i] = dp[i-1] + nums[i]
 * 如果dp[i-1]<=0,产生负效果 dp[i] = nums[i],直接丢弃dp[i-1]
 * @param {*} s 
 */
var maxSubArray = function(nums) {
  const n = nums.length
  if(!n)return 0 
  let dp = new Array(n)
  // 假设最大值是第一个元素
  dp[0] = nums[0]
  let maxSum = nums[0]
  for(let i = 1;i<n;i++){
    if(dp[i-1] <= 0){
      dp[i] = nums[i]
    }else{
      dp[i] = dp[i-1] + nums[i]
    }
    maxSum = Math.max(maxSum,dp[i])
  }
  return maxSum
}

// 买卖股票的最佳时机🥇
// 买卖股票的最佳时机 II🥇
// 买卖股票的最佳时机含手续费🥇
// 最佳买卖股票时机含冷冻期🥇
// 最长回文子串🥇
/**
 * 使用中心扩散思想，如果奇数串，那么从s[mid]开始向中心扩散，如果是偶数串，那么从s[mid]和s[mid+1]向中心扩散,需要用到两个关键的参数，一个是begin,一个是max最大值
 * @param {*} s 
 */
let longestPalindrome = function (s) {
  let n = s.length
  if(n < 2)return n
  let begin = 0
  // 最长回文子串长度
  let max = 1
  let spread = (start,end)=>{
    while(s[start] === s[end] && start >=0 && end < n){
      // 计算窗口大小
      let len = end - start + 1
      // 更新最大值和其实点
      if(len > max){
        max = len
        begin = start
      }
      // 向中心扩散
      start--
      end++
    }
  }
  // 遍历字符串考虑两种情况
  for(let mid =0;mid < n;mid++){
    spread(mid)
    spread(mid,mid+1)
  }
  return s.substr(begin,max)
}

// 最长公共子序列🥇
/**
 * 找到最长公共子序列
 * 这道题的思路就是如果s1[i] === s2[j],s1[i]和s2[j]都在lcs中，如果不相等，有三种情况，一种是s1不在一种s2不在,一种二者都不在，但是二者都不在一定是比前者更小的，所以忽略掉
 * dp[i][j] 代表 s1[0,i-1]s2[0,j-1]最长子序列的长度
 * @param {*} text1 
 * @param {*} text2 
 */
var longestCommonSubsequence = function(text1, text2) {
  let m = text1.length
  let n = text2.length
  let dp = Array.from(Array(m+1),()=>Array(n+1).fill(0))
  for(let i=1;i<m+1;i++){
    for(let j=1;j<n+1;j++){
      let s1 = text1[i-1]
      let s2 = text2[j-1]
      if(s1 === s2){
        dp[i][j] = 1 + dp[i-1][j-1]
      }else{
        dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1])
      }
    }
  }
  return dp[m][n]
}
// 两个字符串的删除操作🥇
/**
 * 要想让两个字符窜相同，删除的最小字符数
 * 这道题就是变相的在考 最长公共子序列，然后用word1.length - lcs.length
 * @param {*} word1 
 * @param {*} word2 
 */
var minDistance = function(word1, word2) {
  let m = word1.length
  let n = word2.length
  let dp = Array.from(Array(m+1),()=>Array(n+1).fill(0))
  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      let s1 = word1[i-1]
      let s2 = word2[j-1]
      if(s1 === s2){
        dp[i][j] = 1 + dp[i-1][j-1]
      }else{
        dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1])
      }
    }
  }
  return m - dp[m][n]
}

// 最长重复子数组🥇
/**
 * dp[i][j]代表 数组[0,i-1]，数组[0,j-1]的最长重复子数组的长度
 */
var findLength = function(A,B){
  // 使用双循环保证公共，如果两个数组有公共子树组长度
  let m= A.length
  let n = B.length
  let res =0 
  let dp = Array.from(Array(m+1),()=>Array(m+1).fill(0)) // 定义dp数组，row=m+1,col = n+1
  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      let a = A[i-1]
      let b = B[j-1]
      if(a === b){
        // a和b相同，则开始计数
        dp[i][j] = 1+dp[i-1][j-1]
      }
      res = Math.max(res,dp[i][j])
    }
  }
  return res
}

// 最小路径和🥇
/**
 * dp[i][j] 代表走到[i][j]路径和最小的和
 * 首先走的每一个点都可能是从上方或者左方来的，然后取最小值累加
 * @param {*} nums 
 * @param {*} k 
 */
var minPathSum = function(grid) {
  let row =grid.length
  let col = grid[0].length
  // 处理第一行和第一列
  for(let i =0;i<col;i++){
    grid[0][i] += grid[0][i-1]
  }
  for(let j=0;j<row;j++){
    grid[j][0] += grid[j-1][0]
  }
  for(let i=1;i<row;i++){
    for(let j=1;j<col;j++){
      grid[i][j] += Math.min(grid[i-1][j],grid[i][j-1])
    }
  }
  return grid[row-1][col-1]
}
// 贪心算法
// 分配饼干
/**
 * 直接将最大饼干分给胃口最大小朋友 不满足则放弃喂养这个小朋友，移动指针
 * @param {*} g 
 * @param {*} s 
 */
var findContentChildren = function(g, s) {
  g.sort((a,b)=>b-a)
  s.sort((a,b)=>b-a)
  let g1 = 0
  let s1 = 0
  let res = 0
  while(g1<g.length && s1 <s,length){
    // 满足胃口
    if(g[0] < s[0]){
      g1++
      s1++
      res++
    }else{
      g1++
    }
  }
  return res
}
// 无重叠区间
/**
 * 先将所有区间按照 end排序，然后取出最小的区间的end
 * 遍历集合，拿出每个子集的start，如果star>x_end，重叠区间数量++，更新end_x
 * 最后返回length-count
 * @param {*} intervals 
 */
var eraseOverlapIntervals = function(intervals) {
  if(!intervals.length)return 0
  intervals = intervals.sort((a,b)=>a[1]-b[1])
  let end_x = intervals[0][1]
  let count = 1
  for(let interval of intervals){
    let start = interval[0]
    // 不重叠情况
    if(start > end_x){
      end_x = interval[1]
      count++
    }
  }
  return intervals.length - count
}
// 合并区间
var merge = function(intervals) {
  if(!intervals)return []
  let res = []
  intervals.sort((a,b)=>a[0] - b[0])
  let pre = intervals[0]
  for(let interval of intervals){
    let cur = interval
    // 如果相交 start > end_x,重叠就更新x的end，取值为当前区间end和最小区间的end的最大值
    if(pre[1] > cur[0]){
      pre[1] = Math.max(cur[1],pre[1])
    }else{
      res.push(x)
      pre = cur
    }
  }
  res.push(x)
  return res
}
// 用最少数量的箭引爆气球
// 剪绳子
// 跳跃游戏
var canJump = function(nums) {
  // 元素可跳到的最大位置
  let k =0
  for(let i = 0;i<nums.length;i++){
    if(i > k)return false
    k = Math.max(k,nums[i] + i)
  }
  return true
}
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
function bubleSort(arr){
  for(let i=0;i<arr.length-1;i++){
    for(let j=i;j<arr.length-1-i;j++){
      if(arr[j] > arr[j+1]){
        let temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
      }
    }
  }
  return arr
}
// 插入排序
function insertSort(arr){
  for(let i = 1;i<arr.length;i++){
    let temp = arr[i]
    let j = i
    while(j > 0){
      if(arr[j-1] > arr[j]){
        arr[j] = arr[j-1]
      }else{
        break
      }
      j--
    }
    arr[j] = temp
  }
  return arr
}
// 归并排序
function mergeSort(arr){
  let recc = (array)=>{
    if(array.length <= 1)return array
    const mid = Math.floor(array.length / 2)
    let left = array.slice(0,mid)
    let right = array.slice(mid)
    let orderLeft = recc(left)
    let orderRight = recc(right)
    
    let res = []
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
  return recc(arr)
}
// 快速排序
function quickSort(arr){
  let recc = (array)=>{
    if(array.length <= 1){
      return array
    }
    let left = []
    let right = []
    let mid = array[0]
    for(let i=1;i<array.length;i++){
      if(array[i] > mid){
        right.push(array[i])
      }else{
        left.push(array[i])
      }
    }
    return [...recc(left),mid,...recc(right)]
  }
  return recc(arr)
}
// 选择排序
function selectSrot(arr){
  
}
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
