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

