// @todo 移除jquery依赖

app.loader = (function() {


  function getNow() {
    var now = new Date();
    var ms = now.getTime() % 1000;
    var ts = now.toLocaleTimeString() + '.' + ms;
    return ts;
  }

  function deleteItem(arr, item) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == item) {
        arr[i] = arr[arr.length - 1];
        arr.pop();
      }
    }
  }

  function Preloader(imgs, id, opts) {

    this.imgs = imgs;
    this.id = id; //任务名称
    this.each = opts && opts.each || function() {};
    this.all = opts && opts.all || function() {};
    this.onProcessChange = opts && opts.onProcessChange || function() {};
    this.isFinish = false; //是否结束

    this._paused = false;
    this._numItems = 0;
    this._numLoadings = 0; //正在加载的数量
    this._numItemsLoaded = 0;
    this._loadedPercent = 0;
    this._maxConnections = 4;
    this._loadQueueBackup = [];
    this._loadQueue = []; //还没加载的
    this._loadedQueue = []; //加载完的
    this._loadingQueue = []; //加载中的
    this._loadfiles();
    // this.load();
  }

  Preloader.prototype = {

    // 开始任务
    load: function() {
      this._paused = false;
      this._loadNext();
    },
    pause: function(value) {
      for (var i = 0; i < this._loadingQueue.length; i++) {
        var img = this._loadingQueue[i];
        img.setAttribute('data-loaded', 'unload');
        img.onload = null;
        img.onerror = null;
        img.src = '';
        this._loadQueue.push(img);
      }
      // this._numLoaded -= this._numLoadings;
      this._numLoadings = 0;
      this._loadingQueue = [];

      this._paused = true;
    },

    // 将所有图片
    _loadfiles: function() {
      var ret = [];
      var hash = {};

      this._numItems = this.imgs.length;
      for (var i = 0; i < this.imgs.length; i++) {

        var src = this.imgs[i].getAttribute('data-src');
        if (!src) {
          src = this.imgs[i].src;
          this.imgs[i] = new Image();
        }
        this.imgs[i].url = src;
        this.imgs[i].setAttribute('data-loaded', 'unload');
        this.imgs[i].percent = 0;

        this._loadQueue.push(this.imgs[i]);
        this._loadQueueBackup.push(this.imgs[i]);
      }
    },
    _loadNext: function() {
      // 1，如果暂停，则退出
      // 2，如果当前在加载的>最大连接数，则退出
      // 3，如果可以加载，加载，并从全部队列中移除

      if (this._numItems === 0) {
        var that = this;
        this.isFinish = true;
        this._paused = true;
        $('body').trigger('taskFinished', [that.id]);
        if (that.all) {
          that.all.call(app.loader);
        }
        return;
      }

      if (this._paused) {
        return;
      }

      for (var i = 0; i < this._loadQueue.length; i++) {
        if (this._numLoadings >= this._maxConnections) {
          break;
        }
        var img = this._loadQueue[i];
        img.setAttribute('data-loaded', 'loading');
        this._loadingQueue.push(img);
        this._numLoadings++;
        this._loadQueue.splice(i, 1);
        i--;
        this._loadImg(img);

      }
    },

    _loadImg: function(img) {
      var that = this;
      img.setAttribute('data-loaded', 'loading');

      img.src = img.url;

      if (img.complete) {
        img.setAttribute('data-loaded', 'loaded');
        that._onImgLoaded(img);
      } else {
        img.onload = function() {
          img.setAttribute('data-loaded', 'loaded');
          that._onImgLoaded(img);
          img.onload = null;
        };
        img.onerror = function() {
          img.setAttribute('data-loaded', 'error');
          that._onImgLoaded(img);
          img.onerror = null;
        };
      }
    },
    _onImgLoaded: function(img) {
      this._numLoadings--;
      this._numItemsLoaded++;
      // delete this._loadingQueue[img.url];
      deleteItem(this._loadingQueue, img);


      // this._loadedQueue[img.url]=img.toString();
      this._loadedQueue.push(img);


      var that = this;
      if (this.onProcessChange instanceof Function) {
        that._loadedPercent = this._numItemsLoaded / this._numItems;
        if (that.onProcessChange) {
          this.onProcessChange.call(img, {
            img: img,
            src: img.src,
            index: this._numItemsLoaded,
            percent: that._loadedPercent
          });
        }
      }
      if (this._numItemsLoaded >= this._numItems) {
        that.isFinish = true;
        that._paused = true;
        $('body').trigger('taskFinished', [that.id]);
        if (that.all) {
          this.all.call(app.loader);
        }
      }

      this._loadNext();
    },
  };


  function Controller() {
    this.manifest = null;
    // this.hasFrontloader = true;
    this.useXML = true;
    this.onEachFrontImgLoaded = null;
    this.onAllFrontImgLoaded = null;
    this.onFrontProcessChange = null;
    this.showPageNo = 0;
    this.currentTask = null;
    this._rawTaskQueue = [];
    this._doneTaskQueue = [];
    this._waitingTaskQueue = [];
    // this.nextTask = null;
  }
  Controller.prototype = {

    // 初始化
    init: function(opts) {
      this.manifest = opts.manifest; //任务列表数组
      this.firstTaskId = opts.firstTaskId;
      // this.hasFrontloader = opts.hasFrontloader;
      this.onEachFrontImgLoaded = opts.onEachFrontImgLoaded;
      this.onFrontProcessChange = opts.onFrontProcessChange;
      this.onAllFrontImgLoaded = opts.onAllFrontImgLoaded;

      var that = this;
      var tempList = that.manifest;

      // 将任务添加到任务列表

      for (var i = 0, l = tempList.length; i < l; i++) {
        var selectImgs = this._getImgArray(tempList[i].selector);
        var imgs = [];
        for (var j = 0; tempList[i].imgs && (j < tempList[i].imgs.length); j++) {
          var tempImg = new Image();
          tempImg.setAttribute('data-src', tempList[i].imgs[j]);
          imgs.push(tempImg);
        }
        Array.prototype.push.apply(imgs, selectImgs);
        that.addTask(imgs, tempList[i].id);
      }

      // 任务结束后调用下一个任务
      $('body').on('taskFinished', function(e, taskId) {
        that.currentTask = that.getNextTask();
        if (that.currentTask == -1) {
          that.allTaskDoneCallback();
        } else {
          // 开始下一个任务
          that.currentTask.load();
        }
      });
    },

    // 开始，指定一个taskId 作为第一个任务，并将第一个任务作为loading任务
    start: function(taskId) {
      this.currentTask = this.getNextTask(taskId);
      this.currentTask.onProcessChange = this.onFrontProcessChange;
      this.currentTask.all = this.onAllFrontImgLoaded;
      this.currentTask.load();
    },

    // 新建一个任务
    addTask: function(imgs, id) {
      var task = new Preloader(imgs, id);
      this._rawTaskQueue.push(task);
      this._waitingTaskQueue.push(task);
    },

    // 所有结束的回调
    allTaskDoneCallback: function() {

    },

    // 判断任务是否完成
    isTaskDone: function(taskId) {
      for (var i = 0, l = this._rawTaskQueue.length; i < l; i++) {
        if (this._rawTaskQueue[i].id == taskId) {
          return this._rawTaskQueue[i].isFinish;
        }
      }
      return -1;
    },
    // 找到下一个任务，如果指定任务名，则加载指定任务
    getNextTask: function(taskId) {
      var that = this;
      var i = 0;
      var len = that._rawTaskQueue.length;
      // 指定taskId时，找到执行任务
      if (taskId !== undefined && taskId !== null && taskId !== '') {
        for (i = 0; i < len; i++) {
          if (that._rawTaskQueue[i].id == taskId) {
            return that._rawTaskQueue[i];
          }
        }
      }

      // @todo 优化策略
      // 不指定taskId时，从前往后加载
      for (i = 0; i < len; i++) {
        if (that._rawTaskQueue[i].isFinish === true) {
          continue;
        } else {
          return that._rawTaskQueue[i];
        }
      }
      if (i == len) {
        return -1;
      }
    },

    // 获取图片集合，形参为选择器
    _getImgArray: function() {
      var imgs = [];
      var temps = [];
      for (var i = 0; i <= arguments.length; i++) {
        temps = Array.prototype.slice.call(document.querySelectorAll(arguments[i]));
        Array.prototype.push.apply(imgs, temps);
      }
      return imgs;
    }
  };

  return new Controller();
})();
