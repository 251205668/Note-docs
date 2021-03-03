// 矩阵转置 (两种方法)

// 1.先遍历列再遍历行，借助中间矩阵交换
function transform(matrix){
  let m = matrix.length
  let n = matrix[0].length
  let res =[]
  for(let j =0;j<n;j++){
    res[j] = []
    for(let i=0;i<m;i++){
      res[j][i] = matrix[i][j]
    }
  }
  return res
}
// 直接交换对角线元素，两层循环，第一层0到len 第二层 i到len
// 交换

function transform(matrix){
  let m = matrix.length
  for(let i=0;i<m;i++){
    for(let j =i;j<m;j++){
      [matrix[i][j],matrix[j][i]] = [matrix[j][i],matrix[i][j]]
    }
  }
  return matrix
}

// 水平翻转矩阵
matrix.map(item=>item.reverse())
