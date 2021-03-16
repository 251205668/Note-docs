function buildingSaw(arrOri) {
        let len = arrOri.length;
        let arr = arrOri;
        let right= new Array(len);
        let stack = new Stack();
        let resBuild = [];
 
        for (let i = len - 1; i >= 0; i--) {
            right[i] = stack.length();
            while (stack.length() && arr[i] >= arr[stack.peek()]) {
                stack.pop();
            }
            stack.push(i);
        }
        stack.clear();
        for (let j = 0; j < len; j++) {
            let total = right[j] + 1 + stack.length();
            while (stack.length() && arr[j] >= arr[stack.peek()]) {
                stack.pop();
            }            
            resBuild.push(total);
            stack.push(j);
        }
        return resBuild;
         
    }
 
    function Stack() {
        this.dataStore = []; //Init
        this.top = 0; //栈顶位置
        this.pop = pop; //出栈
        this.push = push; //入栈
        this.peek = peek; //栈顶元素
        this.length = length; //栈内元素总数
        this.clear = clear; //清空栈
    }
 
    function push(e) {
        this.dataStore[this.top++] = e;
    }
 
    function pop() {
        return this.dataStore[--this.top];
    }
 
    function peek() {
        if (this.top > 0) return this.dataStore[this.top - 1];
        else return 'Empty';
    }
 
    function length() {
        return this.top;
    }
 
    function clear() {
        delete this.dataStore;
        this.dataStore = [];
        this.top = 0;
    }
 
let result = buildingSaw([5,3,8,3,2,5]).join(' ');
console.log(result)
