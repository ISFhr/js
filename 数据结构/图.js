function Dictionary() {  // 构造一个字典
    var items = [];
    this.has = function (key) {
        return key in items;
    }

    this.set = function (key, value) {
        items[key] = value; 
    }

    this.get = function (key) {
        return this.has(key) ? items[key] : undefined;
    }
}
function Queue() {  // 构造一个队列
    var queue = [];
    this.enqueue = function (item) {
        queue.push(item);
    }
    this.dequeue = function () {
        return queue.shift();
    }
    this.isEmpty = function () {
        return queue.length === 0;
    }
    this.length = function () {
        return queue.length;
    }
}

var myVertices = ['A', 'B', 'c', 'D', 'E', 'F', 'G'];    // 定义顶点数组



function Graph() {                           // 构造一个图
    var vertices = [];                       // 储存所有顶点
    var adjList = new Dictionary();          // 储存每个顶点的邻接表
    
    this.addVertex = function (v) {          // 添加顶点
        vertices.push(v);
        adjList.set(v, []);
    }

    this.addEdge = function (v, w) {         // 添加路径
        adjList.get(v).push(w);
        adjList.get(w).push(v);
    }

    this.toString = function () {
        var s = '';
        for (var i = 0; i < vertices.length; i++) {
            s += vertices[i] + ' -> ';
            var neighbors = adjList.get(vertices[i]);
            for (var j = 0; j < neighbors.length; j++) { 
                s += neighbors[j] + ' ';
            }
            s += '\n';  
        }
        return s;
    }


// 注意, 广度优先算法不适合加权图

    //广度优先搜索：将定点存入队列中，最先入队列的先被探索
    //广度优先算法会从指定的第一个顶点开始遍历图，先访问其所有相邻点
    //这里现将未被访问的设为白色，访问的设为灰色，被访问且被探索的设为黑色
   
    var initializeColor = function () {         // 这里初始化颜色
        var color = [];
        for (var i = 0; i < vertices.length; i ++) {
            color[vertices[i]] = 'white';
        }
        return color;
    }

    this.bfs = function (v, callback) {         // 深度优先搜索
        var queue = new Queue(),                // 创建队列,存放顶点
            color = initializeColor();
            queue.enqueue(v);                   // 向对列添加用户输入的起始顶点
        
        while (!queue.isEmpty()) {              
            var u = queue.dequeue();            // 取出顶点
            var neighbors = adjList.get(u);     // 找到顶点的路径数组(上文的字典)
            color[u] = 'grey';                  
            for (var j = 0; j< neighbors.length; j++) {  
                var w = neighbors[j];
                if (color[w] === 'white') {
                    color[w] = 'grey';
                    queue.enqueue(w);           // 循环将路径数组内的顶点依次入栈
                }
            }
            color[u] = 'black';                 // 该顶点访问探索完毕
            if (callback) {
                callback(u)
            }
        }
    }
    function printNode(value) {
        console.log('Visited vertex:' + value);
    }
    //改进的广度搜索优化
    this.BFS = function (v) {
        var queue = new Queue(),
            d = [],                     // 创建一个储存各顶点距离的数组
            pred = [],                  // 储存各点的前一顶点
            color = initializeColor();
        queue.enqueue(v);

        for (var i = 0; i<vertices.length; i++) {
            d[vertices[i]] = 0;                  // 设置各点初始距离都为0
            pred[vertices[i]] = null;            // 各点初始的前顶点都为空
        }

        while (!queue.isEmpty()) {
            var u = queue.dequeue();
            neighbors = adjList.get(u);
            color[u] = 'grey';
            for (i=0; i<neighbors.length; i++) {
                var w = neighbors[i];
                if (color[w] === 'white') {
                    color[w] = 'grey';
                    d[w] = d[u] + 1;                // 本顶点的距离为前一顶点加一
                    pred[w] = u;                    // 设置上一顶点
                    queue.enqueue(w);
                }
            }
            color[u] == 'black';
        }
        return {
            distances: d,
            predecessors: pred
        }
    }

    // 通过溯点数组, 构建从其他顶点到所选顶点的路径
    // 这里的vertices是包含所有顶点的数组,如['A', 'B', 'c', 'D', 'E', 'F', 'G']

    var fromVertex = myVertices[0];                  // 传入所选的起始顶点,这里的顶点A
    for (var i = 1; i < myVertices.length; i++) {    // 从不是A的点开始循环

        var toVertex = myVertices[i],             // 获取一个顶点
            path = new Stack();                   // 创建一个栈,储存顶点(因为栈先进后出)

        // 这里是将不是顶点A的顶点入栈, 然后让v等于他的前一顶点(shortTestPathA是上文BFS方法的返回对象)
        
        for (var v = toVertex; v !== fromVertex; v = shortTestPathA.predecessors[v]) {
            path.push(v);                   // 将顶点入栈
        }
        path.push(fromVertex);              // 将A入栈
        var s = path.pop();                 // A出栈
        while(!path.isEmpty()) {
            s = ' - ' + path.pop();
        }
        console.log(s);                     // 打印路径
    }





    // 深度优先搜索算法：从第一个顶点开始遍历图，沿着路径直到这条路径的最后一个顶点被访问，接着原路返回
    // 并搜索下一条路径。
    // 使用栈递归

    this.dfs = function (callback) {
        var color = initializeColor();
        for (var i=0; i<vertices.length; i++) {
            if (color[vertices[i]] == 'white') {
                dfsVisit(vertices[i], color, callback);
            }
        }
    }
    var dfsVisit = function (u, color, callback) {
        color[u] = 'grey';                  // 设置该顶点被访问过 颜色为灰
        if (callback) { 
            callback(u);                    // 执行回调
        }
        var neighbors = adjList.get(u);
        for (var i=0; i<neighbors.length; i++) {
            var w = neighbors[i];
            if (color[w] === 'white') {
                dfsVisit(w, color, callback)        // 未被访问的点再次递归访问 
            }
        }
        color[u] = 'black';                 // 该顶点被探索完毕
    }


    // 改进的深度优先搜索算法
    var time = 0;
    this.DFS = function () {
        var color = initializeColor(),
            d = [],
            f = [],
            p = [];
        time = 0;

        for  (var i = 0; i < vertices.length; i++) {
            f[vertices[i]] = 0;
            d[vertices[i]] = 0;
            p[vertices[i]] = null;
        }

        for (i = 0; i < vertices.length; i++) {
            if (color[vertices[i]] === 'white') {
                DFSVisit(vertices[i], color, d, f, p);
            }
        }

        return {
            discover: d,
            finished : f,
            predecessors : p
        }
    }

    var DFSVisit = function (u, color, d, f, p) {
        console.log('discovered' + u);
        color[u] = 'grey';
        d[u] = ++time;
        var neighbors = adjList.get(u);
        for (var i = 0; i < neighbors.length; i++) {
            if (color[w] === 'white') {
                p[w] = u;
                DFSVisit(w, color, d, f, p);
            }
        }

        color[u] = 'balck';
        f[u] = ++ time;
        console.log('explored' + u);
    }

}









