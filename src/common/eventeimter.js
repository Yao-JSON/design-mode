/**
 * EventEimtter 用于消息分发
 *
*/

class EventEimtter {
  static EventEimtter = EventEimtter;

  constructor() {
    // 创建消息对象
    this.$event = {};
  }

  /**
   * 检测消息对象是否存在，不存在则初始化该消息
   * @param {*} event
   */
  checkEvent(event) {
    if (!this.$event) {
      this.$event = {};
    }

    if (!this.$event[event]) {
      this.$event[event] = [];
    }
  }

  /**
   * 订阅消息
   * @param {*} type 消息类型
   * @param {*} action
   * @param {*} context 消息作用域上下文
   */
  on(type, action, context = null) {
    this.checkEvent(type);
    this.$event[type].push(action.bind(context));
    return this;
  }

  /**
   * 发送消息
   * @param {*} type
   * @param  {...any} args
   */
  emit(type, ...args) {
    if (!this.$event[type]) {
      this.$event[type] = [];
    }
    this.$event[type].forEach((func) => {
      func(...args);
    });
    return this;
  }

  /**
   * 仅能发送一次
   * @param {*} type
   * @param {*} action
   * @param {*} scope 作用域
   */
  once(type, action, scope = null) {
    this.checkEvent(type);
    const newfn = (...args) => {
      this.off(type, action);
      action.call(scope, ...args);
    };
    this.on(type, newfn);
    return this;
  }

  /**
   * 移除已经订阅的消息
   * @param {*} type
   * @param {*} action
   */
  off(type, action) {
    const $event = this.$event[type];
    if ($event) {
      for (const i in $event) {
        if ($event[i] === action) {
          $event.splice(i, 1);
          break;
        }
      }

      if (!$event.length) {
        delete this.$event[type];
      }
    }
    return this;
  }

  /**
   * 移除某个的类型消息
   * @param {*} type
   */
  removeListener(type) {
    delete this.$event[type];
    return this;
  }

  /**
   * 移除所有订阅消息
   */
  removeAllListener() {
    this.$event = null;
    return this;
  }

  /**
   * 获取所有的消息类型
   */
  getEvent() {
    return this.$event;
  }
}


export default new EventEimtter();
