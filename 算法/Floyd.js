// Floyd算法是一种计算图中最短路径的动态规划算法
// 三层循环, 判断A到B的 + B到C的距离 与A到C的距离比较大小

function Floyd() {
    var Inf = Number.MAX_SAFE_INTEGER;
    var graph = [[Inf,2,4,Inf,Inf,Inf],
                 [Inf,Inf,2,4,2,Inf],
                 [Inf,Inf,Inf,Inf,3,Inf],
                 [Inf,Inf,Inf,Inf,Inf,2],
                 [Inf,Inf,Inf,3,Inf,2],
                 [Inf,Inf,Inf,Inf,Inf,Inf]];
    this.floydWarshall = function () {
        var dist = [],
            length = graph.length,
            i,
            j,
            k;
        for (i = 0; i < length; i++) {
            dist[i] = [];
            for (j = 0; j < length; j++) {
                dist[i][j] = graph[i][j];
            }
        }
        for (k = 0; k < length; k++) {
            for (i = 0; i < length; i ++) {
                for (j = 0; j< length; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }
        return dist;
    }
}












