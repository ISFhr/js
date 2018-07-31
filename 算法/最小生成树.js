function MST() {
    var graph = [[0,2,4,0,0,0],
                [0,0,2,4,2,0],
                [0,0,0,0,3,0],
                [0,0,0,0,0,2],
                [0,0,0,3,0,2],
                [0,0,0,0,0,0]];
    this.prim = function () {
        var parent = [],
            key = [],
            visited = [],
            length = graph.length,
            i;
        var INF = Number.MAX_SAFE_INTEGER;
        for (i = 0; i < length; i++) {
            key[i] = INF;
            visited[i] = false;
        }
        key[0] = 0;
        parent[0] = -1;
        for (i = 0; i < length; i ++) {
            var u = minKey(key, visited);
            visited[u] = true;
            for (var v = 0; v < length; v++) {
                if (graph[u][v] && visited[v] === false
                  && graph[u][v] < key[v]) {
                    parent[v] = u;
                    key[v] = graph[u][v];
                }
            }
        }
        return parent;
    }
    var minKey = function (key, visited) {
        var min = Number.MAX_SAFE_INTEGER,
            minIndex = -1;
        for (var i = 0; i < key.length; i++) {
            if (visited[i] == false && key[i] < min) {
                min = key[i];
                minIndex = i;
            }
        }
        return minIndex;
    }
    
    this.kruskal = function () {
        var length = graph.length,
            parent = [],
            cost,
            ne = 0,
            a, b, u, v, i, j, min;
        var Inf = Number.MAX_SAFE_INTEGER;
        cost = initializeCost(graph); // 把邻接矩阵的值复制到cost数组，以方便修改且可以保留原始值；
        while (ne < length -1) {
            for (i = 0, min = Inf; i < length; i++) {
                for (j = 0; j < length; j++) {
                    if (cost[i][j] < min) {
                        min = cost[i][j];
                        u = i;
                        v = j;
                    }
                }
            }
            u = find(u, parent);
            v = find(v, parent);
            if (union(u, v, parent)) {
                ne++;
            }
            cost[u][v] = cost[v][u] = Inf;
        }
        return parent;
    }
    function find(i, parent) {
        while (parent[i]) {
            i = parent[i];
        }
        return i;
    }
    function union(i, j, parent) {
        if (i != j) {
            parent[j] = i;
            return true;
        }
        return false;
    }
    function initializeCost(graph) {
        var cost = [];
        for (var i = 0; i < graph.length; i++) {
            cost[i] = graph[i];
            for (var j = 0; j < graph[i].length; j++) {
                cost[i][j] = graph[i][j];
            }
        }
        return cost;
    }
}








