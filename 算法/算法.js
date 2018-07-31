function ArrayList() {
    var array = [];
    this.insert = function (item) {
        array.push(item);
    };

    this.toString = function (item) {
        return array.join();
    }
    
    //冒泡
    this.bubbleSort = function () {
        var length = array.length;
        for(var i = 0; i < length; i ++) {
            for(var j = 0; j < length - 1; j ++) {
                if(array[j] > array[j+1]) {
                    swap(array, j, j+1)
                }   
            }
        }
    }
    function swap(arr, index1, index2) {
        var variable = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = variable; 
    }
    //改进冒泡，减少内循环不必要的比较次数，每一轮最后两个数下一次没必要再比较
    this.modifedBubbleSort = function() {
        var length = array.length;
        for(var i=0; i<length; i++) {
            for(var j=0; j<length-1-i; j++) {
                if(array[j] > array[j+1]) {
                    swap(array, j, j+1);
                }
            }
        }
    }
    //选择排序，每轮循环选出最小项的索引，将最小项依次排列
    this.selection = function () {
        var length = array.length,
            indexMin;
        for (var i=0; i<length-1; i++) {
            indexMin = i;
            for(var j=i; j<length; j++) {
                if(array[indexMin] > array[j]) {
                    indexMin = j;
                }
            }
            if(indexMin !== i) {
                swap(array, indexMin, i)
            }
        }
    }
    //插入排序,假定第一位已经排好，第二位选择插入第一位之后还是之前
    this.insertionSort = function () {
        var length = array.length;
        var j,  //记录当前索引
            temp; //记录当前值
        for (var i=1; i<length; i++) {
            j = i;
            temp = arrar[i];
            while (j>0 && array[j-1] > temp) {
                array[j] == array[j-1];//如果当前值的前一位大于当前值，就把前一位赋值给当前位置
                j--;                   //然后继续向前判断，直到循环跳出，就找到j的合适位置
            }
            array[j] = temp;           //将之前储存的最初的值赋给j
        }
    }
    //归并排序 Firefox采用的是归并排序作为Array.prototype.sort()的方法实现，chrome采用的是另一种方法
    //归并排序是一种分治算法，就是将数组分割成若干小数组，直到每个小数组只有一个成员，然后将小数组合并成较大数组
    this.mergeSort = function () {
        array = mergeSortRec(array);
    }
    function mergeSortRec(arr) {
        var length = arr.length;
        if(length == 1) {
            return arr;
        }
        var mid = Math.floor(length/2);
        var left = arr.slice(0, mid);
        var right = arr.slice(mid, length);
        return merge(mergeSortRec(left), mergeSortRec(right))
    }
    function merge(left, right) {
        var leftInd = 0,
            rightInd = 0,
            result = []
        while(leftInd < left.length && rightInd < right.length) {
            if(left[leftInd] < right[rightInd]) {
                result.push(left[leftInd])
                leftInd++;
            }else {
                result.push(right[rightInd]);
                rightInd++;
            }
        }
        while (leftInd < left.length) {
            result.push(left[leftInd]);
            leftInd++;
        }
        while (rightInd < right.length) {
            result.push(right[rightInd]);
            rightInd++;
        }
        return result;        
    }
    //快速排序，最常用之一，chrome里的sort实现，也是采用分治的方法
    //将数组划分成小数组，但是没有分割开
    this.quickSort = function () {
        quick(array, 0, array.length - 1);
    }
    var quick = function (arr, left, right) {
        var index;
        if (arr.length > 1) {
            index = partition(arr, left, right);//接收中间元
            if (left < index - 1) {
                quick(arr, left, index - 1);
            }
            if (index < right) {
                quick(arr, index, right)
            }
        }
    }
    var partition = function (arr, left, right) {
        var pivot = arr[Math.floor((right + left) / 2)], //中间元素为中间元
            i = left, 
            j = right;
        while (i <= j) {
            while (arr[i] < pivot) {
                i++;
            }
            while (arr[j] > pivot) {
                j--;
            }
            // if (i <= j) {
            swap(arr, i, j);
            i++;
            j--;
            // }
        }
        return i;
    }
    //堆排序  首先，我们从最下面一层向上遍历，第一次buildHeap将每一个子数中最大的值给父节点
    this.heapSort = function () {
        var heapSize = array.length;
        buildHeap(array);7
        while(heapSize) {
            heapSize--;
            swap(array, 0, heapSize);
            heapify(array, heapSize, 0);
        }
    }
    //先对数组进行二叉树的排序，先检查最左边子节点，其索引值一定是length的一半（如果二叉树是满树的话）
    //比较左右子节点，大的放中间
    function buildHeap(array) {
        var heapSize = array.length;
        for(var i = Math.floor(array.length / 2); i >= 0; i--) {
            heapify(array, heapSize, i);
        }
    }
    //比较左右子节点，大的放中间，然后递归，从最大的索引值向下继续查找
    function heapify(array, heapSize, i) {
        var left = i * 2 + 1,
            right = i * 2 + 2,
            largest = i;
        if (left < heapSize && array[left] > array[largest]) {
            largest = left;
        }
        if (right < heapSize && array[right] > array[largest]) {
            largest = right;
        }
        if (largest !== i) {
            swap(array, i, largest);
            heapify(array, heapSize, largest)
        }
    }

    //搜索算法
    // 1.顺序算法  ----   略，太低效
    
    // 2.二分搜索,要求数据结构已排序
    this.binarySearch = function (item) {
        this.quickSort();
        var low = 0,
            height = array.length - 1,
            mid,
            element;
        while (low <= height) {
            mid = Math.floor((low + height) / 2);
            element = array[mid];
            if (element < item) {
                low = mid + 1;
            }else if (element > item) {
                height = mid -1;
            }else {
                return mid;
            }
        }
        return -1;
    }
    


}


















