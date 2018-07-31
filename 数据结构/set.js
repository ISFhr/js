function Set() {
    let item = {};
    this.has = function (value) {
        return item.hasOwnProperty(value);
    }
    this.add = function (value) {
        if (!this.has(value)) {
            items[value] = value;
            return true;
        }
        return false;
    }
}









