// 冒泡

// 快速

// 归并

// 二分

// 二分左边界第一个元素

// 二分右边界第一个元素

/**
 * 栈和队列
 */

// 最近请求次数，求出请求时间t在[t-3000,t]的次数

RecentCounter.prototype.ping = function(t) {}
// 判断是否是有效地括号 () [] {}
var isValid = function(s) {}
//计算二进制子串出现次数如 00110011 输出6，借助counts数组计算出0,1次数数组，最后计算Math.min(counts[i-1],counts[i])

var countBinarySubstrings = function(s) {}

// 最小栈

class MinStack{
  constructor(){
    this.stack = []
  }
  get size(){}
  push(x){}
  pop(){}
  top(){}
  getMin(){}
}

// 栈实现队列
class MyQueue {
constructor() {
  this.stack1 = []; // 原始栈
  this.stack2 = []; // 辅助栈 其实可以看成队列
}
push(x) {
}
pop() {
    
}
peek() {
}
empty() {
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
     
  }
  pop(){
  }
  top(){
     
  }
  empty(){
     
  }
}
// 字符串解码 s="3[a]2[bc]“ 输出aaabcbc  
var decodeString = function(s) {}

// 根据身高重建队列  如果身高相同则人数多排后面，

// 判断栈的亚茹和弹出序列 输入pushed[1,2,3,4,5],pop[4,5,3,2,1] 输出true
var validateStackSequences = function(pushed, popped) {}


/**
 * 链表 + 双指针
 */

 // 反转链表
 var revirseListNode = (head)=>{}

 // m-n反转链表

 var reverseBetween = function(head, m, n) {}
 // 删除链表重复节点
 var deleteNode = function(node) {}

 // 两个链表两数相加，返回新的链表
 var addTwoNumbers = function(l1, l2) {}
 // 两两交换链表的节点
 var swapPairs = function(head) {}
 // 合并两个有序链表
 var mergeTwoLists = function(l1, l2) {}
 //合并k个有序链表
 var mergeKLists = function(lists) {}

 // 环形链表
 var hasCycle = function(head) {}

// 求双链表的第一个公共节点
var getIntersectionNode = function(headA,headB){}

// 环形链表|| 求入环点
var detectCycle = function(head) {}
// 求链表中间节点
var middleNode = function(head) {}

// 删除链表倒数第N个节点
var removeNthFromEnd = function(head, n) {}

// 判断回文链表
var isPalindrome = function(head) {}

// 反转字符串
var reverseString = function(s) {}

// 合并两个有序数组
var merge = function(nums1, m, nums2, n) {}

// 盛最多水的容器
var maxArea = function(height) {}

/**
 * 二叉树
 */

// 基础知识 dfs bfs 前中后序遍历

// 层序遍历 
var levelOrder = function(root) {}

// 锯齿形层序遍历
var zigzagLevelOrder = function(root) {}

// 二叉树的最小深度

var minDepth = function(root) {}

// 二叉树的直径

var diameterOfBinaryTree = function(root) {}

// 二叉树的深度
var maxDepth = function(root) {        }

// 二叉树的最近公共祖先 找到p,q最近公共祖先
var lowestCommonAncestor = function(root, p, q) {}

// 左叶子和
var sumOfLeftLeaves = function(root) {}

// 二叉树的右视图

var rightSideView = function(root) {}

// 翻转二叉树  二叉树的镜像

var invertTree = function(root) {}

// 对称二叉数
var isSymmetric = function(root) {}

// 平衡二叉树
var isBalanced = function(root) {}

// 验证二叉搜索树
var isValidBST = function(root) {}

// 有序数组转换为二叉搜索树
var sortedArrayToBST = function(nums) {}

// 前序和中序遍历构造二叉树
var buildTree = function(preorder, inorder) {}

// 合并二叉树
var mergeTrees = function(t1, t2) {}

//判断A是否是B的子结构
var isSubStructure = function(A, B) {}

// 判断连棵树是否是相同的树
var isSameTree = function(p, q) {}

// 路径总和

var hasPathSum = function(root, sum) {}

// 求跟到叶子结点数字之和

var sumNumbers = function(root) {}

//二叉树中和为某一值的路径，输出集合

var pathSum = function(root, sum) {}

// 二叉树展开链表

var flatten = function(root) {}


/**
 * 堆
 */

// 数组第K个最大元素
var findKthLargest = function(nums, k) {}

// 前K个高频元素
var topKFrequent = function(nums, k) {}

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




