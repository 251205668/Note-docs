// // 冒泡

// Array.prototype.bunbleSort = function (){
//   for(let i = 0 ;i < this.length-1;i++){
//     for(let j = 0;j < this.length-1-i;j++){
//       if(this[j] > this[j+1]){
//         const temp = this[j]
//         this[j] = this[j+1]
//         this[j+1] = temp
//       }
//     }
//   }
// }

// //插入: 从第二个数开始往前比 如果前面某个数比第二个数要大，就将这个数往后排，如果不大就停止，最后获取到的j就是要插入的位置

// Array.prototype.insertSort = function (){
//   // 从 1 开始是因为要从第二个数开始往前比
//   for(let i = 1;i < this.length;i++){
//      // 刚开始假设 取第二个元素 
//       const temp = this[i]
//       let j = i
//       while(j > 0){
//         if(this[j-1] > temp){
//           // 往后排
//           this[j] = this[j-1]
//         }else{
//           break
//         }
//         j--
//       }
//       // 获取到的 j 就是插入位置
//       this[j] = temp
    
//   }
 

// // }


// // 快速: 选择基准 ，将数组拆分左右数组，直到array的长度小于等于1递归结束

// Array.prototype.quickSort = function () {
//   const rec = (arr)=>{
//     if(arr.length <= 1){
//       return arr
//     }
//     const left =[]
//     const right =[]
//     const mid = arr[0]
//     for(let i =1;i < arr.length;i++){
//       if(arr[i] < mid){
//         left.push(arr[i])
//       }else{
//         right.push(arr[i])
//       }
//     }
//     return [...rec(left),mid,...rec(right)]
//   }
//   const result = rec(this)
//   result.forEach((n,i)=>{
//     this[i] = n
//   })
// }

// // 归并 先分成子有序数组 最后合并为大数组，合并有效数组就是比较对头，将较小者对头推入新数组中即可
// Array.prototype.mergeSort = function () {
//   const rec = (arr)=>{
//     if(arr.length <= 1){
//       return arr
//     }
//     const mid = Math.floor(arr.length / 2)
//     const left = arr.slice(0,mid)
//     // 注意这里是arr.length 而不是-1
//     const right = arr.slice(mid,arr.length)
//     // 递归 去最后分成功的有序数组 此时数组长度为1
//     const orderLeft = rec(left)
//     const orderRight = rec(right)
    

//     // 合并有序数组
//     const res = []
//     while(orderLeft.length || orderRight.length){
//       if(orderLeft.length && orderRight.length){
//         res.push(orderLeft[0] < orderRight[0] ? orderLeft.shift() : orderRight.shift())
//       }else if(orderLeft.length){
//         res.push(orderLeft.shift())
//       }else if(orderRight.length){
//         res.push(orderRight.shift())
//       }
//     }
//     return res
//   }
//  const result =  rec(this)
//  result.forEach((n,i)=>{
//    this[i] = n
//  })
// }



// // 选择 : 每一轮开始假设当前最小值第i个元素，然后遍历数组找到最小值，如果找到的最小值比当前元素小就交换，否则就将最小值更新，

// Array.prototype.selectionSort = function (){
//   for(let i = 0 ;i < this.length-1;i++){
//     let minIndex = i
//     for(let j = i;j<this.length;j++){
//       if(this[j] < this[minIndex]){
//         minIndex = j
//       }
//     }
//     if(minIndex !== i){
//       const temp = this[i]
//       this[i] = this[minIndex]
//       this[minIndex] = temp
//     }
//   }
// }



// console.log(a)


// function sequenceSearch(item){
//   for(let i = 0;i <this,length;i++){
//     if(item === this[i] ){
//       return i
//     }
//   }
//   return -1
// }

function binarySearch(arr,item) {
  let high = arr.length -1
  let low =0
  while(low<=high){
    const mid = Math.floor((high+low)/2)
    const element = arr[mid]
    if(element < item){
      low = mid + 1
    }else if(element >item){
      high = mid - 1
    }else{
      return mid
    }
  }
  return -1
}
console.log(binarySearch([1,2,3],4))


function miniDepth(root){
  if(!root){
    return
  }
  let q = [[root,1]]
  while(q.length){
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
}

/**
 * 堆是完全二叉树
 * 堆的父节点下标: Math.floor(i-1/2)
 * 堆的左子节点下标： 2i+1
 * 堆的右子节点下标： 2i+2
 */


class MiniHeap {
  constructor(){
    // 定义堆
    this.heap = []
  }
  swap(m,n){
    let temp = m
    m = n
    n = temp
  }
  /**
   * 插入: 插入元素到底部，然后将该元素做上移操作(需要满足父节点必须小于等于子节点)
   * @param {*} value 插入元素值
   */
  insert(value){
    this.heap.push(value)
    this.shiftUp(this.heap.length - 1)
  }
  // 上移，比较父节点和子节点的大小,如果不符合条件就交换元素，然后对新的元素继续进行上移操作
  shiftUp(index){
    // 堆顶不上移
    if(index === 0){
      return
    }
    const parentIndex = Math.floor(index - 1 / 2)
    if(this.heap[parentIndex] > this.heap[index]){
      this.swap(parentIndex,index)
      this.shiftUp(parentIndex)
    }
  }

  /**
   * 删除: 不能直接删除堆顶元素，需要用数组尾元素替换堆顶元素，然后进行下移操作
   */
  delete(){
    // 替换堆顶元素先
    this.heap[0] = this.heap.pop()
    // 下移
    this.shiftDown(0)
  }
  // 下移操作，这里我们需要保证子节点是大于等于父节点的
  shiftDown(index){
    const leftChildIndex = 2 * index + 1
    const rightChildIndex = 2 * index + 2
    if(this.heap[index] > this.heap[leftChildIndex]){
      this.swap(index,leftChildIndex)
      this.shiftDown(leftChildIndex)
    }
    if(this.heap[index] > this.heap[rightChildIndex]){
      this.swap(index,rightChildIndex)
      this.shiftDown(rightChildIndex)
    }
  }

  // 获取最小堆的大小
  size(){
    return this.heap.length
  }
  // 获取堆顶元素
  heep(){
    return this.heap[0]
  }
}

let h1 = new MiniHeap()

console.log('堆元素 '+ h1.heap,'堆大小 '+ h1.size(),'堆顶 '+h1.heap)

h1.insert(4)
console.log('堆元素 '+ h1.heap,'堆大小 '+ h1.size(),'堆顶 '+h1.heap)
h1.insert(3)
h1.insert(2)
h1.insert(1)
console.log('堆元素 '+ h1.heap,'堆大小 '+ h1.size(),'堆顶 '+h1.heap)
h1.delete()
console.log('堆元素 '+ h1.heap,'堆大小 '+ h1.size(),'堆顶 '+h1.heap)


/**
 * 思路： 堆排序需要三个方法：主体函数 + 构建堆 + 调整堆
 */

// 主方法: 首先构建堆，遍历数组，这个时候第一个元素就是最大值，将堆头和尾元素更换位置，length-1，继续调整堆调换位置

function heapsort(arr){
  buildHeap(arr)
  for(let i = arr.length - 1;i>0;i--){
    // 交换
    swap(arr,0,i)
    // 下移调整
    heapify(arr,0,i)
  }
  return arr
}
function buildHeap(arr){
  if(!arr.length){
    return
  }
  // 只有Math.floor(len/2-1)需要调整，记得此处i可以等于0
  for(let i = Math.floor(arr.length / 2 - 1);i>=0;i--){
      heapify(arr,i,arr.length)
  }
}

// 堆调整：找到子节点最大的，然后交换父子节点，循环结束要重新赋值父节点，表示找到了位置,可以理解为下移操作
function heapify(arr,parent,length){
  let temp = arr[parent]
  let childIndex = 2 * parent + 1
  // 找到最大节点下标
  while(childIndex < length){
    if(childIndex + 1 < length && arr[childIndex + 1] > arr[childIndex]){
      childIndex ++
    }
    // 不符合大顶堆则跳出循环
    if(arr[childIndex] <= arr[parent]){
      break
    }
    arr[parent] = arr[childIndex]
    parent = childIndex
    childIndex = 2 * parent + 1
  }
  //循环结束要重新赋值父节点
  arr[parent] = temp
}

function swap(arr,i,j){
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
let arr1 = [1,21,12312312,3312,234,-1]
console.log(heapsort(arr1))



// 实现JSONP
/**
 * 参数： 对象中包含url,params,callback
 * 1. 声明全局函数，函数名为callback，函数做的事情就是resolve(data)，然后移除标签
 * 2. params和callback拼接，获取参数，最后拼接url 
 * 3. 创建script标签，append到文档
 */

 function JSONP({url,params,callback}){
   return new Promise((resolve,reject)=>{
     let scipt = document.createElement('script')
     // 全局callback函数
     window[callback] = (data)=>{
       resolve(data)
       document.removeChild(scipt)
     }
     // 拼接参数
     params = {...params,callback}
     let arr = []
     for(let key in params){
       arr.push(`${key} = ${params[key]}`)
     }
     url = `${url}?${arr.join('&')}`
     scipt.src = url
     document.body.append(scipt)
   })
 }
