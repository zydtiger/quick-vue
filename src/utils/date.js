Date.prototype.toString = function () {
  return `${this.getFullYear()}/${this.getMonth() + 1}/${this.getDate()} ${this.getHours()}:${this.getMinutes()}`;
}