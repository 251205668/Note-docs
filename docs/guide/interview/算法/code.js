function knapsack(W,N,weights,values){
  let dp =Array(N).fill(Array(W+1).fill(-1))
  // 首先考虑只有物品0的情况
  for(let j = 0;j<=W;j++){
    dp[0][j] = j >= weights[0] ? values[0] : 0
  }
  // 其次考虑物品0以外的情况
  for(let i = 1;i< N;i++){
    for(let j = 0;i <= W;j++){
        dp[i][j] = dp[i-1][j]
        if(j >= weights[i]){
          dp[i][j] = Math.max(dp[i][j],values[i] + dp[i-1][j-weights[i]])
        }
    }
  }
  return dp[N-1][W]
}
console.log(knapsack(4,3,[2,1,3],[4,2,3]))


