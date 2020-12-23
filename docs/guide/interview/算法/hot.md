# 力扣hot100题刷题

🥇代表复习过一遍，每道题最少复习三遍

首先热身熟悉一下dfs，bfs，先中后序遍历

```js
// 深度优先 尽量深的遍历数，先访问根节点，再递归访问根节点的子节点
dfs = (root)=>{
  console.log(root.val)
  root.children.forEach(dfs)
}

// 二叉树,携带层级 此时需要判断二叉树的左右子树情况
dfs = (root,level)=>{
  if(!root){
    return
  }
  if(!root.left && !root.right && root.level){
    console.log(root.val,level)
  }
  if(root.left){
    dfs(root.left,level+1)
  }
  if(root.right){
    dfs(root.right,level+1)
  }
}

// 广度优先，新建队列，对头出队，对头的children挨个入队
bfs = (root)=>{
  let q = [root]
  while(q.length > 0){
    const n = q.shift()
    console.log(n.val)
    n.children.forEach(item=>{
      q.push(item)
    })
  }
}

// 二叉树的广度
bfs = (root,level)=>{
  let q =[[root,1]]
  while(q.length > 0){

  }
}

// 先序遍历 非递归版 切记这里使用栈的数据结构

preOrder = (root)=>{
  if(!root){
    return
  }
  let q = [root]
  while(q.length){
    const n = q.pop()
    console.log(n.val)
    if(n.left){
      q.push(n.left)
    }
    if(n.right){
      q.push(n.right)
    }
  }
}

// 空栈 p指针指向root 左根右
inOrder = (root)=>{
  if(!root){
    return
  }
  let q = []
  let p = root
  while(q.length || p){
    while(p){
       q.push(p)
       p = p.next
    }
    const n = q.pop()
    console.log(v.val)
    // 指向右节点 遍历右节点去
    p = n.right
  }
}

// 反向先序即可
postOrder = (root)=>{
  if(!root){
    return
  }
  let q = [root]
  let outputStack = []
  while(q.length){
    const n = q.pop()
    outputStack.push(n)
    if(n.left){
      q.push(n.left)
    }
    if(n.right){
      q.push(n.right)
    }
  }
  // 输出节点
  while(outputStack.length){
    const node = outputStack.pop()
    console.log(node.val)
  }
}
```

## 回溯算法
### [全排列](https://leetcode-cn.com/problems/permutations/)

![](https://image.yangxiansheng.top/img/20201222232114.png?imglist)

思路： 使用回溯算法模板解题

```js
// 1. 选择列表：[1,2,3]
// 2. 路径：track，每次允许重复
// 3. 结束条件: 到达策略树底部，路径元素和选择列表相同

function(nums){
  let res = []
  function backtrack(track){
    if(track.length === nums.length){
      res.push(track)
      return
    }
    for(let i=0;i<nums.length;i++){
      // 筛选条件，不允许路径理由重复的已选择节点
      if(track.includes(nums[i])){
        continue
      }
      // 选择操作
      track.push(nums[i])
      //递归 
      backtrack(track)
      //撤销
      track.pop()
    }

  }
  backtrack([])
  return res
}

```

### [N皇后](https://leetcode-cn.com/problems/n-queens/)

![](https://image.yangxiansheng.top/img/20201222235856.png?imglist)

```js
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    /**
     * 1.选择列表：棋盘第row行的每一列都可以摆放皇后
     * 2. 路径：这里路径比较抽象，凡是小于row的行都已经摆放了皇后，row决定棋盘怎么摆放元素
     * 3. 结束条件；当row=棋盘最大行数N时
     */
    let res = []
    function backstack(board,row){
        if(row === n){
            res.push(board)
            return
        }
        for(let col = 0 ;col < n;col++){
            //筛选不符合条件的节点
            if(!isValid(board,row,col)){
                continue
            }
            // 将决策树每一层拿出来
            const letter = board[row].split('')
            // 选择操作
            letter[col] = 'Q'
            board[row] = letter.join('')
            // 递归 一定记得要做浅拷贝
            backstack(board.slice(),row+1)
            // 撤销
            letter[col] = '.'
            board[row] = letter.join('')
        }
    }
    function isValid(xboard,row,col){
        // 一列都不允许摆放 左上方和右上方都不允许摆放
        for(let i = 0;i < n;i++){
            if(xboard[i][col] === 'Q'){
                return false
            }
        }
        // 左上方
        for(let i = row-1,j = col-1;i>=0 && j>=0;i--,j--){
            if(xboard[i][j] === 'Q'){
                return false
            }
        }
        // 右上方
        for(let i = row-1,j=col+1;i>=0 && j<n;i--,j++){
            if(xboard[i][j] === 'Q'){
                return false
            }
        }
        return true
    }
    // 初始化棋盘
    backstack(Array(n).fill(".".repeat(n)),0)
    return res
};
```


## 链表

### [反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/description/)

![](https://image.yangxiansheng.top/img/20201222231910.png?imglist)

1>2>3>4>null
=>
null>4>3>2>1

思路；要想把链表的箭头全部反向指，就要遍历头部和尾部，遍历过程互相赋值即可

```js
var revirseListNode = (head)=>{
  let p1 = head
  let p2 =null
  while(p1){
    const temp = p1.next
    // p1的下一个指针指向p2
    p1.next = p2
    // 保证链表能走下去
    p2 = p1
    p1 = temp
  }
  return p2
}
```

## 双指针

### [环形链表](https://leetcode-cn.com/problems/linked-list-cycle/description/)

![](https://image.yangxiansheng.top/img/20201222231824.png?imglist)

```js
var hasCycle = function(head) {
    let fast = head
    let slow = head
    while(fast && fast.next){
        slow = slow.next
        fast = fast.next.next
        if(fast === slow){
            return true
        }
    }
    return false
};
```

### [求双链表的第一个公共节点](https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/description/)

![](https://image.yangxiansheng.top/img/20201222232003.png?imglist)

思路：定义双指针，同时遍历，需要保证双指针都有值，如果没有值就为初始值

```js
var getIntersectionNode = function(headA,headB){
  let p1 = headA
  let p2 = headB
  while(p1 !== p2){
    p1 = p1 ? p1.next : headA
    p2 = p2 ? p2.next : headB
  }
  return p1
}
```

### [环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

![](https://image.yangxiansheng.top/img/20201223220421.png?imglist)

```js
var detectCycle = function(head) {
    // 首先快指针和满指针先成环，跑一圈
    let fast = head
    let slow = head
    while(fast && fast.next){
        fast = fast.next.next
        slow = slow.next
        if(fast === slow){
            break
        }
    }
    // 如果没有成环
    if(!fast || !fast.next){
        return null
    }
    // 然后再匀速跑,再次相遇就是第一个入环的节点
    slow = head
    while(fast !== slow){
        fast = fast.next
        slow = slow.next
    }
    return slow

};
```

### [链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

![](https://image.yangxiansheng.top/img/20201223220516.png?imglist)

```js
var middleNode = function(head) {
    let fast = head
    let slow = head
    while(fast && fast.next){
        fast = fast.next.next
        slow = slow.next
        console.log("head", head,"fast",fast,"slow",slow)
    }
    return slow

};
```

### [删除链表的倒数第N个节点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

![](https://image.yangxiansheng.top/img/20201223220327.png?imglist)

```js
var removeNthFromEnd = function(head, n) {
    let fast = head
    let slow = head
    // 快指针先走n步
    for(let i=0;i<n;i++){
        fast = fast.next
    }
    // 如果删除的倒数第n个节点是头结点，直接返回下一节点
    if(fast === null){
        return head.next
    }
    // 快指针走完之后双指针匀速前行，到头则slow.next就是要删除的倒数第n个节点
    while(fast && fast.next){
        fast = fast.next
        slow = slow.next
    }
    slow.next = slow.next.next
    return head
    
};
```
### [回文链表](https://leetcode-cn.com/problems/palindrome-linked-list-lcci/)

![](https://image.yangxiansheng.top/img/20201223233441.png?imglist)

思路: 1.拿到后半部分链表 2.反转链表 3.和原链表进行比对

```js
var isPalindrome = function(head) {
  /**
   * 1. 快满指针获取中间结点
   * 2. 反转中间节点之后的结点
   * 3. 遍历后半部分结点，一一比对前后链表的值，head=head.next reverseHead = reverseHead.next
   * 4. 相同返回true，否则返回false
   */
  if(!head){return true}
  let fast = head
  let slow = head
  while(fast.next && fast.next.next){
      fast = fast.next.next
      slow = slow.next
  }
  // 将中间节点之后的节点反转
  let reverseHead = reverseList(slow.next)
  while(reverseHead){
      if(head.val !== reverseHead.val){
         return false
      }
      reverseHead = reverseHead.next
      head = head.next
  }
  return true
function reverseList(head) {
    let p1 = head;
    let p2 = null;  
    while(p1){
        const temp = p1.next;
        p1.next = p2;
        p2 = p1;
        p1 = temp;
     
    }
    return p2;

};
};
```

### [反转字符串](https://leetcode-cn.com/problems/reverse-string/)

![](https://image.yangxiansheng.top/img/20201223220229.png?imglist)

```js
    var reverseString = function(s) {
        let left = 0
        let right = s.length - 1
        while(left < right){
            const temp = s[left]
            s[left] = s[right]
            s[right] = temp
            left++  
            right--
        }
    };
```

## BFS

### [二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

![](https://image.yangxiansheng.top/img/20201223164148.png?imglist)

```JS
var minDepth = function(root) {
// dfs  if(!root){return 0}
//   if(!root.left && !root.right){
//       return 1
//   }
//   let res = Number.MAX_VALUE
//   if(root.left){
//       res = Math.min(minDepth(root.left),res)
//   }
//   if(root.right){
//       res = Math.min(minDepth(root.right),res)
//   }
//   return res + 1


// bfs 将节点和depth当成数组 然后遍历队列，当访问叶子结点时，返回depth
if(!root){return 0}
let q = [[root,1]]
while(q.length){
    // 取队头
  let [n,depth] = q.shift()
  if(!n.left && !n.right){
      return depth
  }
  if(n.left){
    q.push([n.left,depth+1])
  }
   if(n.right){
    q.push([n.right,depth+1])
  }
}
};
```

## 二分查找

### [二分查找](https://leetcode-cn.com/problems/binary-search/)

![](https://image.yangxiansheng.top/img/20201223164313.png?imglist)

```js
var search = function(nums, target) {
    let low = 0
    let high = nums.length - 1
    while(low <= high){
        let mid = Math.floor((low + high)/2)
        let Element = nums[mid]
        if(Element === target){
            return mid
        }else if(Element > target){
            high = mid -1
        }else if(Element < target){
            low = mid + 1
        }
    }
    return -1

};
```

### [在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

![](https://image.yangxiansheng.top/img/20201223164355.png?imglist)

不要花里胡哨，分开求
```js
var searchRange = function(nums, target) {
   return [getLeftBoundary(),getRightBoundary()]
   function getLeftBoundary(){
       let left = 0
       let right = nums.length -1
       while(left<=right){
           let mid = Math.floor((left + right)/2)
           let element = nums[mid]
           if(element > target){
               right = mid - 1
           }else if(element < target){
               left = mid + 1
           }else{
               right = mid -1
           }
       }
       if(left >= nums.length || nums[left] !== target){
           return -1
       }
       return left
   }
   function getRightBoundary(){
       let left = 0
       let right = nums.length -1
       while(left<=right){
           let mid = Math.floor((left + right)/2)
           let element = nums[mid]
           if(element > target){
               right = mid - 1
           }else if(element < target){
               left = mid + 1
           }else{
               left = mid + 1
           }
       }
       if(right < 0 || nums[right] !== target){
           return -1
       }
       return right
   }
};

```
## N数之和

### [两数之和](https://leetcode-cn.com/problems/two-sum/submissions/)

![](https://image.yangxiansheng.top/img/20201223213604.png?imglist)
**看清楚题目，数组不是有序的，不要用二分法做**

```
这道题可以巧妙利用map数据结构

map存入key为减剩下的数(而这个数一定是2，也就是接下来会出现的数)，value为下标

然后遍历到下几个元素，只需要比对map的key等不等于当前元素即可，相等直接返回`[map的value(第一个数)，i(第二个数)]`
```
```js
var twoSum = function(nums, target) {
    let map = new Map()
    for(let i =0;i<nums.length;i++){
        if(map.has(nums[i])){
            return [map.get(nums[i]),i]
        }else{
            map.set(target-nums[i],i)
        }
    }

};
```

### [ 两数之和 II - 输入有序数组](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/)

![](https://image.yangxiansheng.top/img/20201223214059.png?imglist)

二分法
```js
var twoSum = function(numbers, target) {
    let left = 0
    let right = numbers.length -1
    while(left < right){
        let sum = numbers[left] + numbers[right]
        if(sum === target){
            return [left + 1, right + 1]
        }else if(sum < target){
            // 让sum大点
            left ++
        }else if(sum > target){
            // 让sum小点
            right --
        }
    }
    return [-1,-1]
};
```
