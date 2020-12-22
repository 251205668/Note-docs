# 力扣hot100题刷题

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

## [环形链表](https://leetcode-cn.com/problems/linked-list-cycle/description/)

![](https://image.yangxiansheng.top/img/20201222231824.png?imglist)

```js
var hasCycle = (head)=>{
  let p1 = head
  let p2 = head
  // 保证快指针有值
  while(p1 && p2 && p2.next){
    p1 = p1.next
    p2 = p2.next.next
    if(p1 === p2){
      return true
    }
  }
  return false
}
```

## [反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/description/)

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

}
```

## [求双链表的第一个公共节点](https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/description/)

![](https://image.yangxiansheng.top/img/20201222232003.png?imglist)

思路：定义双指针，同时遍历，需要保证双指针都有值，如果没有值就为初始值

```js
var getIntersectionNode = function(headA,headB){
  let p1 = headA
  let p2 = headB
  while(!p1 === p2){
    p1 = p1 ? p1.next : headA
    p2 = p2 ? p2.next : headB
  }
  return p1
}
```

## [全排列](https://leetcode-cn.com/problems/permutations/)

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

## N皇后

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
