// 父类

function News() {
  this.children = [];
  this.element = null;
}

News.prototype = {
  init() {
    throw new Error('New init');
  },
  add() {
    throw new Error('New add');
  },
  getElement() {
    throw new Error('New Element', this.element);
  }
};

function Container(id, parent) {
  // 设置构造函数继承
  News.call(this);
  this.id = id;
  this.parent = parent;
}


// function _inherits(subClass, superClass) {
//   if (typeof superClass !== 'function' && superClass !== null) {
//     throw new TypeError(`Super expression must either be null or a function, not ${typeof superClass}`);
//   }
//   subClass.prototype = Object.create(superClass && superClass.prototype, {
//     constructor: {
//       value: subClass, enumerable: false, writable: true, configurable: true
//     }
//   });
//   if (superClass) {
//     Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
//   }
// }

Object.setPrototypeOf(Container, News);

// Container.prototype.init = function () {
//   this.element = document.createElement('ul');
//   this.element.id = this.id;
//   this.element.className = 'new-container';
// };

// // 添加子元素

// Container.prototype.add = function (child) {
//   this.children.push(child);
//   return this;
// };


const test = new Container(1, '90');

window.test = test;
