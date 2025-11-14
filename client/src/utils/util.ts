/**
 * 防抖(debounce)
 * @param {Function} fn
 * @param {Number} delay
 * @description 1.解决this指向问题 2.解决 event 事件对象问题
 */
export const debounce = <T extends (...args: any[]) => any>(fn: T, wait: number) => {
  let timer: any;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
};

/**
 * 节流(throttle)
 * @param {Function} fn
 * @param {Number} delay
 * @description 请注意，节流函数并不止上面这种实现方案,例如可以完全不借助setTimeout，可以把状态位换成时间戳，然后利用时间戳差值是否大于指定间隔时间来做判定。
 * 也可以直接将setTimeout的返回的标记当做判断条件-判断当前定时器是否存在，如果存在表示还在冷却，并且在执行fn之后消除定时器表示激活，原理都一样
 */
export const throttle = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let valid = true;
  return function (this: any, ...args: Parameters<T>) {
    if (!valid) {
      return false as unknown as void;
    }
    valid = false;
    setTimeout(() => {
      fn.apply(this, args);
      valid = true;
    }, delay);
  };
};

/**
 * 检验给定字符串是否为有效的电子邮件地址
 *
 * 此函数通过正则表达式检查输入字符串是否符合常见的电子邮件地址格式
 * 它首先定义了一个正则表达式来匹配电子邮件地址的结构，然后检查输入是否为空或非字符串，
 * 最后使用正则表达式测试输入字符串并返回结果
 *
 * @param {string} email - 待验证的电子邮件地址字符串
 * @returns {boolean} - 如果输入是有效的电子邮件地址，返回true；否则返回false
 */
export const isEmail = (email: string) => {
  if (typeof email === "string" && email.trim() === "") {
    return false;
  }
  // 常见邮箱格式正则（不含特殊扩展）
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

  // 处理空值或非字符串输入
  if (typeof email !== "string" || email.trim() === "") {
    return false;
  }

  // 使用正则表达式测试输入并返回结果
  return reg.test(email);
};

const categoryMap: Record<string, string> = {
  web_design: "网页设计",
  wen_design: "网页设计",
  general: "全部",
  development: "开发",
  databases: "数据库",
  seo: "搜索引擎优化",
  marketing: "营销",
};
export const getCategoryName = (category?: string) => {
  return categoryMap[category] || "";
};

// utils/breadcrumbs.js
export const generateBreadcrumbs = (pathname: string) => {
  if (!pathname) return "";
  const paths = pathname.split("=");
  return paths[1];
};

export const calcTime = (time: string | number | Date) => {
  const now = new Date();
  const inputDate = new Date(time);

  const diff = now.getTime() - inputDate.getTime();
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hour = Math.floor(diff / (1000 * 60 * 60));
  const min = Math.floor(diff / (1000 * 60));

  if (day < 1) {
    // 返回前一天的日期
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, "0"); // 月份从0开始
    const dayOfMonth = String(yesterday.getDate()).padStart(2, "0");

    return `${year}-${month}-${dayOfMonth}`;
  } else if (day > 0) {
    return `${day}天前`;
  } else if (hour > 0) {
    return `${hour}小时前`;
  } else if (min > 0) {
    return `${min}分钟前`;
  } else {
    return "刚刚";
  }
};
export const postTime = (time: string | number | Date) => {
  const now = new Date();
  const inputDate = new Date(time);

  const diffInMs = now.getTime() - inputDate.getTime();
  const day = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const hour = Math.floor(diffInMs / (1000 * 60 * 60));
  const min = Math.floor(diffInMs / (1000 * 60));

  if (day < 1) {
    return hour < 1 ? `${min}分钟前` : `${hour}小时前`;
  } else if (day < 7) {
    return `${day}天前`;
  } else {
    // 返回格式化日期：yyyy-mm-dd
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // 月份从0开始
    const date = String(inputDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${date}`;
  }
};
