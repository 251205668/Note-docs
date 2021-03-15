// 寻找矩阵元素
function findElement( mat ,  m , n ,  x ) {
  let row = mat.length
  let col = mat[0].length
  if(row !== m || col !== n || mat.length){
    return []
  }

  let x = 0
  let y = col -1
  while(x <= row-1 && y>=0){
    if(mat[x][y] === x){
      return [x,y]
    }else if(mat[x][y] > x){
      y--
    }else{
      x++
    }
  }
  return []
}

// 顺时针打印矩阵
var spiralOrder = function(matrix) {
  let res = []
  while(matrix.length){
    let topArray = matrix.shift()
    let rightArray = matrix.map(item=>item.pop())
    let bottomArray = matrix.pop()
    let leftArray = matrix.map(item=>item.shift())

    topArray.length && res.push(...topArray)
    rightArray.length && res.push(...rightArray)
    bottomArray.length && res.push(...bottomArray.reverse())
    leftArray.length && res.push(...leftArray.reverse())
  }
  return res.filter(item=>item!==undefined)
}

// 矩阵旋转180
function fn(array){
  let res = []
  res = array.map((item,index)=>{
    let arr = []
    for(let i = item.length-1;i>=0;i++){
      arr.push(array[i][index])
    }
    return arr
  })
  return res
}


// 矩阵转置+对折
function f(matrix){
  let m = matrix.length
  for(let i =0;i<m;i++){
    for(let j = i;j<m;j++){
      [matrix[i][j],matrix[j][i]] = [matrix[j][i],matrix[i][j]]
    }
  }
  return matrix.map(item=>item.reverse())
}

// 矩阵置零 0元素的行和列都置为零

// for(k=0;k<matrix.length;k++){if(k !== i)}

var setZeroes = function(matrix) {
  for(let i = 0;i<matrix.length;i++){
    for(let j = 0;j<matrix[i].length;j++){
      if(Object.is(matrix[i][j],0)){
        // 将不等于0的行和列都需要置为-0，然后如果当前已经等于零，则直接跳过
        for(let k =0;k<matrix.length;k++){
          if(k !== i && Object.is(matrix[k][j],0))continue
          else matrix[k][j] = -0
        }
        for(let k =0;k<matrix[i].length;k++){
          if(k !== j && Object.is(matrix[i][k],0))continue
          else matrix[i][k] = -0
        }
      }
    }
  }
}
