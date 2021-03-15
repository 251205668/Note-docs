var hasCycle = function(head) {
  let fast = head
  let slow = head
  while(fast && fast.next){
    fast = fast.next.next
    slow = slow.next
    if(fast === slow)return true
  }
  return false
}

var getIntersectionNode = function(headA,headB){
  let p1 = headA
  let p2 = headB
  while(p1 !== p2){
    p1 = p1 ? p1.next : headA
    p2 = p2 ? p2.next : headB
  }
  return p1
}

var detectCycle = function(head) {
  let fast = head
  let slow = head
  while(fast && fast.next){
    fast = fast.next.next
    slow = slow.next
    if(fast !== slow)break
  }
  if(!fast || !fast.next)return null
  fast = head
  while(fast !== slow){
    fast = fast.next
    slow = slow.next
  }
  return slow
}

var middleNode = function(head) {
  let fast = head
  let slow = head
  while(fast && fast.next){
    fast = fast.next.next
    slow = slow.next
  }
  return slow
}

var removeNthFromEnd = function(head, n) {
  let fast = head
  let slow = head
  for(let i= 0;i<n;i++){
    fast = fast.next
  }
  if(fast === null){
    return head.next
  }
  while(fast && fast.next){
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next
  return head
}

var isPalindrome = function(head) {
  let fast = head
  let slow = head
  while(fast && fast.next){
    fast = fast.next.next
    slow = slow.next
  }
  let reverseLinkNode = reverse(slow.next)
  while(reverseLinkNode){
    if(head.val !== reverseLinkNode.val){
      return false
    }
    reverseLinkNode = reverseLinkNode.next
    head = head.next
  }
  function reverse(head){
    let p1 = head
    let p2 = null
    while(p1){
      let temp = p1.next
      p1.next = p2
      p2 = p1 
      p1 = temp
    }
  }
}

var reverseString = function(s) {
  return s.trim().split('').reverse().join('')
}

function isPalindrome(s){
  let left = 0
  let right = s.length - 1
  while(left <= right){
    if(s[left] !== s[right])return false
    left++
    right--
  }
  return true
}

var merge = function(nums1, m, nums2, n) {
  let i = m - 1
  let j = n -1
  let k = nums1.length -1
  while(i>=0 && j>=0){
    if(nums1[i] > nums2[j]){
      nums1[k] = nums1[i]
      i--
    }else{
      nums1[k] = nums2[j]
      j--
    }
    k--
  }
  while(j>=0){
    nums1[k] = nums1[j]
    j--
    k--
  }
}

var maxArea = function(height) {
  let left = 0
  let right = height.length -1
  let res = 0
  while(left < right){
    if(left < right){
      let maxArea = (right - left) * height[left]
      res = Math.max(maxArea,res)
      left++
    }else{
      let maxArea = (right - left) * height[right]
      res = Math.max(maxArea,res)
      right--
    }
  }
  return res
}

var trap = function(height) {
  let left = 0
  let right = height.length -1
  let leftHeight = 0
  let rightHeight = 0
  let res = 0
  while(left < right){
    if(left < right){
      leftHeight = Math.max(leftHeight,height[left])
      res += leftHeight - height[left]
      left++
    }else{
      rightHeight = Math.max(rightHeight,height[right])
      res += rightHeight - height[right]
      right--
    }
  }
  return res
}
