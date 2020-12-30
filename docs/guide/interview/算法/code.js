var longestCommonSubsequence = function(text1, text2) {
  // 定义：s1[0..i-1] 和 s2[0..j-1] 的 lcs 长度为 dp[i][j]
  // 目标：s1[0..m-1] 和 s2[0..n-1] 的 lcs 长度，即 dp[m][n]
  // base case: dp[0][..] = dp[..][0] = 0
  let m = text1.length
  let n = text2.length
  const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      let str1 = text1[i - 1]
      let str2 = text2[j - 1]
      if (str1 === str2) {
        dp[i][j] = 1 + dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  return dp[m][n]
}
