const inorder = (root)=>{
  if(!root){
    return
  }
  let res = []
  let p = root
  let q = []
  while(q.length || p){
    // 遍历左指针
    while(p){
      q.push(p)
      p = p.left
    }
    // 根
    const n = q.pop()
    res.push(n.val)
    // 右指针
    p = n.right
  }
  return res

}
