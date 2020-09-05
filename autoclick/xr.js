// ==UserScript==
// @name         xr-bank-money
// @namespace    https://github.com/yeild-web/script/blob/master/autoclick/xr.js
// @version      0.2
// @description  自动答题-银行真假币识别调查
// @author       Yeild
// @match        https://news.qq.com/hdh5/bank2020.htm*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /**
   * 休眠
   * @param time    休眠时间，单位秒
   * @param desc
   * @returns {Promise<unknown>}
   */
  function sleep(time, desc = 'sleep') {
    return new Promise(resolve => {
      //sleep
      setTimeout(() => {
        resolve(time)
      }, Math.floor(time * 1000))
    })
  }


  /**
   * 查找元素
   */
  function obsDom(tagName,name,value){
    var selectDom = [];
    var dom=document.getElementsByTagName(tagName);
    for (var i=0; i<dom.length; i++) {
        if(value===dom[i].getAttribute(name)){
            selectDom.push(dom[i]);
        }
    }
    if (selectDom.length < 1) {
        return undefined;
    }
    return selectDom;
  }

  /**
   * 监测页面地址
   * @param path    页面地址片段
   * @param desc
   * @returns {Promise<unknown>}
   */
  function obsPage(path, desc = 'page') {
    return new Promise(resolve => {
      //obs page
      let page = setInterval(() => {
        if (location.href.search(path) > -1) {
          clearInterval(page)
          console.log(desc, path)
          resolve(path)
        } else {
          return
        }
      }, 1000)
    })
  }

  /**
   * 监测input节点设置内容
   * @param selector    CSS选择器
   * @param text        设置的内容
   * @param desc
   * @returns {Promise<unknown>}
   */
  function obsValue(selector, text, desc = 'value') {
    return new Promise(resolve => {
      //obs node
      let timer = setInterval(() => {
        let target = document.querySelector(selector)
        if (!!target) {
          clearInterval(timer)
          target.value = text
          console.log(desc, text)
          resolve(selector)
        } else {
          return
        }
      }, 1000)
    })
  }

  /**
   * 监测到节点后点击
   * @param selector    CSS选择器
   * @param desc
   * @returns {Promise<unknown>}
   */
  function obsClick(selector, desc = 'click') {
    return new Promise(resolve => {
      //obs node
      let timer = setInterval(() => {
        let target = document.querySelector(selector)
        if (!!target) {
          clearInterval(timer)
          target.click()
          console.log(desc, selector)
          resolve(selector)
        } else {
          return
        }
      }, 1000)
    })
  }

  /**
   * 监测节点是否存在
   * @param selector    CSS选择器
   * @param desc
   * @returns {Promise<unknown>}
   */
  function obsHas(selector, desc = 'has') {
    return new Promise(resolve => {
      //obs node
      let timer = setInterval(() => {
        let target = document.querySelector(selector)
        if (!!target) {
          clearInterval(timer)
          console.log(desc, selector)
          resolve(selector)
        } else {
          return
        }
      }, 1000)
    })
  }

  /**
   * 监测节点内容
   * @param selector    CSS选择器
   * @param text        节点内容
   * @param desc
   * @returns {Promise<unknown>}
   */
  function obsText(selector, text, desc = 'text') {
    return new Promise(resolve => {
      //obs node
      let timer = setInterval(() => {
        let target = document.querySelector(selector)
        if (!!target && target.textContent.trim() == text) {
          clearInterval(timer)
          console.log(desc, text)
          resolve(selector)
        } else {
          return
        }
      }, 1000)
    })
  }

  /**
   * 监测节点内容点击
   * @param selector    CSS选择器
   * @param text        节点内容
   * @param desc
   * @returns {Promise<unknown>}
   */
  function obsTextClick(selector, text, desc = 'text') {
    return new Promise(resolve => {
      //obs node
      let timer = setInterval(() => {
        let targets = document.querySelectorAll(selector)
        for (var target of targets) {
            if (!!target && target.textContent.trim() == text) {
                clearInterval(timer)
                target.click()
                console.log(desc, text)
                resolve(selector)
                break
            }
        }
        return
      }, 1000)
    })
  }

  /**
   * 监测节点非内容
   * @param selector    Css选择器
   * @param text        节点内容
   * @param desc
   * @returns {Promise<unknown>}
   */
  function obsNotText(selector, text, desc = 'not text') {
    return new Promise(resolve => {
      //obs node
      let timer = setInterval(() => {
        let target = document.querySelector(selector)
        if (!!target) {
          if (target.textContent.trim() == text) {
            return
          } else {
            clearInterval(timer)
            console.log(desc, text)
            resolve(selector)
          }
        } else {
          return
        }
      }, 1000)
    })
  }

  /**
   * 函数返回真继续执行
   * @param func    函数，返回真继续执行
   * @param desc
   * @returns {Promise<unknown>}
   */
  function obsTrueFunc(func, desc = 'func=>true') {
    return new Promise(resolve => {
      if (!!func) {
        let ret = func()
        if (ret) {
          console.log(desc, ret)
          resolve('func=>true')
        }
      }
    })
  }

  /**
   * 执行函数
   * @param func    函数
   * @param desc
   * @returns {Promise<unknown>}
   */
  function obsFunc(func, desc = 'func') {
    return new Promise(resolve => {
      if (!!func) {
        func()
        console.log(desc)
        resolve('func')
      }
    })
  }

  /**
   * 变量为真继续执行
   * @param isTrue    bool变量
   * @param desc
   * @returns {Promise<unknown>}
   */
  function obsTrue(isTrue, desc = 'true') {
    return new Promise(resolve => {
      if (!!isTrue) {
        console.log(desc, isTrue);
        resolve(isTrue)
      }
    })
  }

  /**
   * 监测节点内容点击
   * @param selector    CSS选择器
   * @param text        节点内容
   * @param desc
   * @returns {Promise<unknown>}
   */
  function obsTextSelect(selector, text, index, desc = 'selector') {
    return new Promise(resolve => {
      //obs node
      let timer = setInterval(() => {
        let target = obsDom(selector, 'value', text)
        if (!!target && target) {
          clearInterval(timer)
          let option = target[0]
          let select = option.parentNode
          option.selected = true;
          select.selectIndex = index;
          select.value = option.value;
          var evt = document.createEvent("HTMLEvents");
          evt.initEvent("change", false, true);
          select.dispatchEvent(evt);
          console.log(desc, text)
          resolve(selector)
        } else {
          return
        }
      }, 1000)
    })
  }

  function reload() {
      console.log('脚本运行结束')
      location.reload()
  }

  var url = 'https://news.qq.com/hdh5/bank2020.htm#/'
  sleep(2)
    .then(() => obsPage(url))
    .then(() => sleep(1))
    .then(() => obsClick('.b_start'))
    .then(() => sleep(1))
    .then(() => obsTextSelect('option', '四川省', 23))
    .then(() => sleep(1))
    .then(() => obsTextSelect('option', '成都市', 1))
    .then(() => sleep(1))
    .then(() => obsTextSelect('option', '城市', 1))
    .then(() => sleep(1))
    .then(() => obsTextClick('.b_select', '确定'))
    .then(() => sleep(3))
    .then(() => obsTextClick('.btn', 'A. 红色、绿色之间变化'))
    .then(() => sleep(1))
    .then(() => obsTextClick('.b_submit', '继续答题'))
    .then(() => sleep(1))
    .then(() => obsTextClick('.btn', 'A. 在金色和绿色之间变化，亮光带上下滚动'))
    .then(() => sleep(1))
    .then(() => obsTextClick('.b_submit', '继续答题'))
    .then(() => sleep(1))
    .then(() => obsTextClick('.btn', 'A. 在蓝色和绿色之间变化'))
    .then(() => sleep(1))
    .then(() => obsTextClick('.b_submit', '继续答题'))
    .then(() => sleep(3))
    .then(() => obsTextClick('.btn', 'A. 票面正面毛泽东头像、国徽、“中国人民银行”行名、盲文标识等多处'))
    .then(() => sleep(1))
    .then(() => obsTextClick('.b_submit', '继续答题'))
    .then(() => sleep(1))
    .then(() => obsTextClick('.btn', 'A. 人像、花卉图案水印'))
    .then(() => sleep(1))
    .then(() => obsTextClick('.b_submit', '继续答题'))
    .then(() => sleep(1))
    .then(() => obsTextClick('.btn', 'B. 票面正面左下角、右上角'))
    .then(() => sleep(1))
    .then(() => obsTextClick('.b_submit', '继续答题'))
    .then(() => sleep(1))
    .then(() => obsTextClick('.btn', 'A. 上交中国人民银行、公安机关或者办理人民币存取款业务的金融机构'))
    .then(() => sleep(1))
    .then(() => obsTextClick('.b_submit', '继续答题'))
    .then(() => sleep(1))
    .then(() => obsTextClick('.btn', 'B. 监督银行工作人员双人当面完成假币收缴程序'))
    .then(() => sleep(1))
    .then(() => obsTextClick('.b_submit', '继续答题'))
    .then(() => sleep(1))
    .then(() => obsTextClick('.btn', 'B. 每次退回的钞票，都要辨真假。'))
    .then(() => sleep(1))
    .then(() => obsTextClick('.b_submit', '继续答题'))
    .then(() => sleep(3))
    .then(() => obsTextClick('.btn', 'B. 错误'))
    .then(() => sleep(1))
    .then(() => obsTextClick('.b_submit', '答题结束'))
    .then(() => sleep(1))
    .then(() => reload())
})();
