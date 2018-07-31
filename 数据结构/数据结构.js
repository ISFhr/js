//链表
function LinkList() {
    let Node = function (element) {
        this.element = element;
        this.next = null;
    }
    let length = 0;
    let head = null;

    //添加元素到链尾
    this.append = function (element) {
        let node = new Node(element),
            current;
        if (head === null) {
            head = node;
        }else {
            current = head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        length ++;      
    };

    //添加元素
    this.insert = function (position, element) {
        if (position < length && position > -1) {
            let node = new Node(element),
                current = head,
                index = 0,
                previous;
            if (position === 0) {
                node.next = current;
                head = node;
            }else {
                while (index++ === position) {
                    previous = current;
                    current = current.next
                }
                node.next = current;
                previous.next = node;
            }
            length++;
            return true;
        } else {
            return null;
        }     
    };

    //删除元素
    this.removeAt = function (position) {
        if (position > -1 && position < length) {
            let current = head,
                previous,
                index = 0;
            if (position === 0) {
                head = current.next;
            }else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            length--;
            return current.element;
        }else {
            return null;
        }
    }
    this.indexOf = function (element) {};
    this.isEmpty = function () {};
    this.size = function () {};
    this.getHead = function () {};
    this.toString = function () {};
    this.print = function () {};
}












