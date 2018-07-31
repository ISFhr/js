function KnapSack(capacity, weights, values, n) {
   this.knapSack = function () {
    var a, b, ks = [];
    
    for (var i = 0; i <= n; i++) {
        ks[i] = [];
    }
    
    for (var i = 0; i <= n; i++) {
        for (var w = 0; w <= capacity; w++) {
            if (i == 0 || w == 0) {
                ks[i][w] = 0;
            } else if (weights[i-1] <= w) {
                a = values[i-1] + ks[i-1][w-weights[i-1]];
                b = ks[i-1][w];
                ks[i][w] = (a > b)? a : b;
            } else {
                ks[i][w] = ks[i-1][w];
            }
        }
    }
    findValues(n, capacity, ks, weights, values);
    return '总价值：' + ks[n][capacity];
   }
   function findValues(n, capacity, ks, weights, values) {
        var i = n,
            k = capacity;
        console.log("解决方案如下：");
        while (i > 0 && k > 0) {
            if (ks[i][k] != ks[i-1][k]) {
                console.log('物品' + i + ' ，重量：' + weights[i-1] + ' ，价值：' + values[i-1]);
                i--;
                k = k - weights[i-1];
            } else {
                i --;
            }
        }
   }
}








