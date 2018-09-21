class Promise {
  constructor() {
    this.callbacks = []
  }
  then(onsuccess, onerror) {
    this.callbacks.push({
      resolve: onsuccess,
      reject: onerror
    })
    return this
  }
  resolve(result) {
    this.complete('resolve', result)
  }
  reject(result) {
    this.complete('reject', result)
  }
  complete(type, result) {
    if (type === 'reject' && this.oncatch) {
      this.callbacks = [];
      this.oncatch(result)
    } else if (this.callbacks[0]) {
      let callbackType = this.callbacks.shift();
      if(callbackType[type]) callbackType[type](result)
    }
  }
  catch (onerror) {
    this.oncatch = onerror
    return this
  }
}


let p = new Promise();

function fn() {
  setTimeout(function () {
    p.reject('data1');
  }, 1000)
  return p
}

function fn1(result) {
  setTimeout(function () {
    p.resolve('data2')
  }, 2000)
}

function fn2(result) {
  console.log('fn2执行了', result)
}

// fn().then(fn1).then(fn2)
fn().then(fn1, fn2)
