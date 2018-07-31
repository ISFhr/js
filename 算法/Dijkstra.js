
// 图的最短路径算法, 计算单个源到所有其他源的最短了路径的一种贪心算法


// 步骤  1. 先有一个距离数组(dist),所有值全是infinite
//      2. 规定一个源点,将dist数组的源点索引值设为0
//      3. 源点的距离与相对应的矩阵行相加,与dist数组比较, 小的话,dist数组的值被覆盖
//      4. 找到当前dist数组最小值, 与相对应的矩阵行相加, 与dist数组比较, 小的话, dist数组的值被覆盖
//      5. 循环重复4~5, 直到遍历完毕


function Dijkstra() {
    var graph = [[0,2,4,0,0,0],              // 这是一个加权有方向的图的邻接矩阵
                 [0,0,2,4,2,0],
                 [0,0,0,0,3,0],
                 [0,0,0,0,0,2],
                 [0,0,0,3,0,2],
                 [0,0,0,0,0,0]];            // 因为是有向图,所以最后一点为终点, 一般都为0;


    this.dijkstra = function (src) {        // 这里传入一个源点来开始工作
        var dist = [],
            visited = [],
            length = graph.length;

        for (var i = 0; i < length; i++ ) {
            dist[i] = Infinity;             // 首先定义所有顶点间的距离为无限大
            visited[i] = false;             // 设置顶点都未被访问
        }

        dist[src] = 0;                      // 把源顶点到自己的距离设为0
        
        for (var i = 0; i < length-1; i++) {         // 最后一点是终点, 所以不用访问
            var u = minDistance(dist, visited);      // 第一次返回的一定是源点的索引值
            visited[u] = true;                      // 被访问后设置成true
            for (var v = 0; v < length; v++) {
                if (!visited[v] &&
                    graph[u][v] != 0 &&      // 这里一定注意,判断不为0和infinite
                    dist[u] != Infinity &&
                    dist[u] + graph[u][v] < dist[v])
                {
                    dist[v] = dist[u] + graph[u][v];
                }
            }
        }
        return dist;
    }

    // 返回当前dist数组的最小值的索引
    var minDistance = function (dist, visited) {
        var min = Infinity,
            minIndex = -1;
        for (var v = 0; v < dist.length; v++) {
            if (visited[v] == false && dist[v] <= min) {
                min = dist[v];
                minIndex = v;
            }
        }
        return minIndex;
    }
}








