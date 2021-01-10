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



