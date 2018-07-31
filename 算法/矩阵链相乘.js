function MatrixChainOrder() {
    this.matrixChainOrder = function (p, n) {
        var i, j, k, l, q, m = [];
        var s = [];
        for (var i = 0; i <= n ; i++) {
            s[i] = [];
            for (var j = 0; j <= n; j++) {
                s[i][j] = 0;
            }
        }
        
        for (i = 1; i <= n; i++) {
            m[i] = [];
            m[i][i] = 0;
        }

        for (l = 2; l < n; l++) {
            for (i = 1; i <= n-l+1; i ++) {
                j = i+l-1;
                m[i][j] = Number.MAX_SAFE_INTEGER;
                for (k = i; k <= j-1; k++ ) {
                    q = m[i][k] + m[k+1][j] + p[i-1]*p[k]*p[j];
                    if (q < m[i][j]) {
                        m[i][j] = q;
                        s[i][j] = k;
                    }
                }
            }
        }
        printOptimalParenthesis(s, 1, n-1)
        return m[1][n-1];
    }

    function printOptimalParenthesis(s, i, j) {
        if (i == j) {
            console.log('A[' + i + ']');
        }else {
            console.log('(');
            printOptimalParenthesis(s, i, s[i][j]);
            printOptimalParenthesis(s, s[i][j] + 1, j);
            console.log(')');
        }
    }
}










