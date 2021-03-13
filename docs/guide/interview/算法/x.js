var levelOrder = function(root) {
  if (!root) return []
  let res = []
  let q = [root]
  while(q.length){
    let len = q.length
    let levelList = []
    for (let i = 0; i < len; i++) {
      const n = q.shift()
      if(n.left){
        q.push(n.left)
      }
      if(n.right){
        q.push(n.right)
      }
      if(n !== undefined){
        levelList.push(n.val)
      }
      
    }
    res.push(levelList)
  }
  return res
}

var inorderTraversal = function(root){
  if(!root)return
  let res = []
  let q = []
  let p = root
  while(q.length || p){
    while(p){
      q.push(p)
      p = p.left
    }
    const n = q.pop()
    res.push(n.val)
    p = n.right
  }
  return res
}

var zigzagLevelOrder = function(root){
  if(!root)return []
  let res = []
  let isSequlize =  true
  let q = [root]
  while(q.length){
    let levelList = []
    let len = q.length
    for(let i =0;i<len;i++){
      const n = q.pop()
      if(n.left){
        q.push(n.left)
      }
      if(n.right){
        q.push(n.right)
      }
      if(isSequlize){
        n !== undefined && levelList.push(n.val)
      }else{
        n !== undefined && levelList.unshift(n.val)
      }
    }
    res.push(levelList)
    isSequlize = !isSequlize
  }
  return res
}

var minDepth = function(root){
  if(!root)return 0
  let q = [[root,1]]
  while(q.length){
    let [n,depth] = q.shift()
    if(!n.left && !n.right && depth){
      return depth
    }
    if(n.left){
      q.push([n.left,depth + 1])
    }
    if(n.right){
      q.push([n.right,depth + 1])
    }
  }
}

var diameterOfBinaryTree = function(root){
  function height(node){
    if(!node)return 0
    return 1 + Math.max(height(node.left),height(node.right))
  }
  if(!root)return 0
  var maxHeight = height(root.left) + height(root.right)
  return Math.max(diameterOfBinaryTree(root.left),diameterOfBinaryTree(root.right),maxHeight)
}

var lowestCommonAncestor = function(root,p,q){
  if(!root)return null
  if(p === root || q === root)return root
  let left = lowestCommonAncestor(root.left,p,q)
  let right = lowestCommonAncestor(root.right,p,q)
  if(!left)return right
  if(!right)return left
  return root
}

var sumOfLeftLeaves = function(root){
  function isLeftNode(node){
    return node && !node.left && !node.right
  }
  if(!root)return 0
  let sum = 0
  let dfs = (node)=>{
    if(!node)return
    if(isLeftNode(node.left)){
      sum+=node.left.val
    }
    dfs(node.left)
    dfs(node.right)
  }
  dfs(root)
  return sum
}

var rightSideView = function(root){
  if(!root)return []
  let q = [root]
  let res = []
  while(q.length){
    let len = q.length
    let last 
    for(let i=0;i<len;i++){
      const n = q.shift()
      if(n.left){
        q.push(n.left)
      }
      if(n.right){
        q.push(n.right)
      }
      if(n!==undefined){
        last = n.val
      }
    }
    res.push(last)
  }
  return res
}

var kthSmallest = function(root,k){
  if(!root)return 
  let p = root
  let q = []
  while(q.length || p){
    while(p){
      q.push(p)
      p = p.left
    }
    const n = q.pop()
    if(--k === 0){
      return n.val
    }
    p = n.right
  }
}

var inverTree = function(root){
  if(!root)return null
  [root.left,root.right] = [root.right,root.left]
  inverTree(root.left)
  inverTree(root.right)
  return root
}

var isSymmetric = function(root){
  if(!root)return true
  let isEqual = (left,right)=>{
    if(!left && !right)return true
    if(!left || !right)return false
    return (
      left.val === right.val &&
      isEqual(left.left,right.right) &&
      isEqual(left.right,right.left)
    )
  }
  return isEqual(root.left,root.right)
}

var isBalanced = function(root){
  let height = (node)=>{
    if(!node)return 0
    return 1 + Math.max(height(node.left),height(node.right))
  }
  if(!root)return true
  return (
    Math.abs(height(root.left) - height(root.right)) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  )

}

var isValidBST = function(root){
  let help = (node,lower,upper)=>{
    if(!node)return true
    if(node.val >= upper || node.val <= lower)return false
    return help(node.left,lower,node.val) && help(node.right,node.val,upper)
  }
  return help(root,-Infinity,Infinity)
}

var verifyPostorder = function(postorder){
  // 二叉树的后序遍历，找到根节点，然后找到中间i，保证右子树全部元素大于根节点

  let len = postorder.length
  let i = 0
  for(;i<len -1;i++){
    if(postorder[i] > postorder[len-1])break
  }
  // 此时 i 就是分界点,保证右子树全部元素大于根节点
  let result = postorders.slice(i,len-1).every(item=>item > postorder[len - 1])
  if(result){
    return verifyPostorder(postorder.slice(0,i)) && verifyPostorder(postorder.slice(i,len-1))
  }else{
    return false
  }
}

var sortedArrayToBST = function(nums) {
  let n = nums.length
  if(!n)return null
  let mid = Math.floor(n / 2)
  let root = new TreeNode(nums[mid])
  root.left = sortedArrayToBST(nums.slice(0,mid))
  root.right = sortedArrayToBST(nums.slice(mid+1))
  return root
}


var sortedListToBST = function(head){
  let stack = []
  while(head){
    stack.push(head.val)
    head = head.next
  }
  function sortedNumsTOBST(nums){
    let len = nums.length
    let mid = Math.floor(len / 2)
    let root = new TreeNode(nums[mid])
    root.left = sortedNumsTOBST(nums.slice(0,mid))
    root.right = sortedNumsTOBST(nums.slice(mid + 1))
    return root
  }
  return sortedNumsTOBST(stack)
}

var buildTree = function(preorder,inorder){
  if(!preorder || !inorder.length){
    return null
  } 
  let key = 0
  let root = new TreeNode(preorder[0])
  for(let i=0;i<inorder.length;i++){
    if(preorder[0] === inorder[key]) key = i
  }
  root.left = buildTree(preorder.slice(1,key+1),inorder(0,key))
  root.right = buildTree(preorder.slice(key + 1),inorder.slice(key + 1))
  return root
}

var mergeTree = function(t1,t2){
  if(t1 && t2){
    t1.val += t2.val
    t1.left = mergeTree(t1.left,t2.left)
    t2.right = mergeTree(t1.right,t2.right)
  }
  return t1 || t2
}

var isSubStructure = function(A,B){
  // 判断B是否是A的子结构
  let isSubtree = (root1,root2)=>{
    if(!root1)return false
    if(!root2)return true
    if(root1.val !== root2.val)return false
    return isSubtree(root1.left,root2.left) && isSubtree(root1.right,root2.right)
  }
  if(!A || !B)return false
  return isSubtree(root.left,root.right) && isSubStructure(root.left) && isSubStructure(root.right)
}

var isSameTree = function(p,q){
  if(!p && !q)return true
  if(!p && q)return false
  if(p && !q)return false
  return (
    p.val !== q.val &&
    isSameTree(p.left,q.left) &&
    isSameTree(p.right,q.right)
  )
}

var hasPathSum = function(root,sum){
  if(!root)return false
  let res= false
  let dfs = (root,s)=>{
    if(!root.left && !root.right && s === sum){
      res = true
    }
    if(root.left){
      dfs(root.left,s + root.left)
    }
    if(root.right){
      dfs(root.right,s + root.right)
    }
  }
  dfs(root,root.val)
  return res
}

var sumNumbers = function(root){
  let res = 0
  let dfs = (root,num)=>{
    if(!root)return
    num += root.val
    if(!root.left && !root.right){
      res += Number(num)
    }
    dfs(root.left,num)
    dfs(root.right,num)
  }
  dfs(root,'')
  return res
}


var pathSUm = function(root,sum){
  let res = []
  let stack = []
  function backTrack(node,sum){
    if(!node)return
    sum -= node.val
    stack.push(node.val)
    if(!node.left && !node.right && sum === 0){
      res.push(...(stack))
    }
    node.left && backTrack(node.left,sum)
    node.right && backTrack(node.right,sum)
    stack.pop()
  }
  backTrack(root,sum)
  return res
}

var flatten = function(root){
  // 左右子树拉平 将右子树拼在左子树的最右叶子节点 然后将整棵树左子树置空 右子树置位拼接好的子树
  let dfs = (root)=>{
    if(!root)return
    dfs(root.left)
    dfs(root.right)
    let pre = root.left
    if(pre){
      while(pre.right){
        pre = pre.right
      }
      pre.right = root.right
      root.right = root.left
      root.left = null
    }
  }
  dfs(root)
  return root
}


// 动态规划 + 贪心算法 +  双指针 + 滑动窗口 + 链表 + 栈和队列 + 堆 + 回溯和递归 + 二分


