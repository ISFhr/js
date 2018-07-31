function BinarySearchTree() {
    var Node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
    var root = null;

    // 向树中插入一个新的键
    this.insert = function (key) {
        var newNode = new Node(key);
        if (root === null) {
            root = newNode;
        }else {
            insertNode(root, newNode);
        }
    }
    var insertNode = function (node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                insertNode(node.left, newNode);
            }
        } else {
            if (node.right == null) {
                node.right = newNode;
            }else {
                insertNode(node.right, newNode);
            }
        }
    }

    // 中序遍历, 先访问最左的节点，然后访问父节点，然后访问父节点的右子节点
    this.inOrderTraverse = function (callback) {
        inOrderTraverseNode(root, callback);
    }
    inOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            inOrderTraverseNode(node.left, callback);
            callback(node.key);
            inOrderTraverseNode(node.right, callback);
        }
    }
    // 先序遍历, 从根节点开始访问左侧父节点, 到最小的父节点(最左侧倒数第二行), 然后访问其左子节点, 然后访问其右子节点
    // 后序遍历, 直接访问最左侧子节点, 然后访问右子节点, 最后访问父节点


    // 搜索一个特定的值
    this.search = function (key) {
        return searchNode(root, key);
    }
    var searchNode = function (node, key) {
        if (node === null) {
            return false;
        }
        if (key < node.key) {
            return searchNode(node.left, key);
        }else if (key > node.key) {
            return searchNode(node.right, key)
        }else {
            return true;
        }
    }

    // 移除一个节点
    this.remove = function (key) {
        root = removeNode(root, key);
    }
    var removeNode = function(node, key) {
        if(node === null) { // 如果正在检测的节点是空,就说明key值不在树中,返回一个空节点
            return null;
        }
        if(key < node.key) {
            node.left = removeNode(node.left, key); // 这里注意更新了node.left的值
            return node;   // 所以这里将node节点返回, 就表示removeNode函数这一递归栈每一项都返回一系列的node节点树
        }else if(key > node.key) {
            node.right = removeNode(node.right, key);
            return node;
        }else { // 这里表示找到想删的节点

            // 第一种情况, 一个叶节点,即该节点没有左右子节点
            if  (node.left === null & node.right === null) {
                node = null;
                return node;
            }
            
            // 第二种情况, 只有一个子节点的节点
            if(node.left === null) {
                node = node.right;
                return node;
            }else if (node.right === null) {
                node = node.left;
                return node;
            }

            // 第三种情况, 有两个子节点的节点, 这里注意,当前节点的右子节点的左子节点是最合适替换当前node键值的值
            var aux = findMinNode(node.right); // 判断该节点的右子节点是否存在左子节点
            node.key = aux.key; // 存在的话, 将key值赋给当前node的key值
            node.right = removeNode(node.right, aux.key); // 遍历右子节点树,删除其左子节点的node节点
            return node;
        }
    }
    findMinNode = function(node) {
        if (node & node.left !== null) {
            node = node.left;
        }
        return node;
    }
}



// 自平衡树AVL注意其LL,RR,RL,LR旋转





