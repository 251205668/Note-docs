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

