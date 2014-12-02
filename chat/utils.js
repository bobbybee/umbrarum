Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

Array.prototype.remove = function(val) {
    for (var i = 0; i < this.length; i++) {
        var c = this[i];
        if (c == val || (val.equals && val.equals(c))) {
            this.splice(i, 1);
            break;
        }
    }
};
