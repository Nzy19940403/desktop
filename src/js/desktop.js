var DeskTop = function (element, options) {
    this.element = $(element);
    this.options = $.extend({}, this.options, options);
    this.init();
}
DeskTop.prototype = {

    options: {
        backgroundImage: "",
        icons: null,
        taskIcon:null,
        iconClick: null,
        iconDblClick: null,
        cellWidth: 90,
        cellHeight: 100
    },

    init: function () {
        var me = this,
            el = me.element,
            opt = me.options;

        me.windows = [];

        if (!opt.icons) opt.icons = [];

        // var resizeTimer = null;
        $(window).bind('resize', function (){
            
            // if (resizeTimer) clearTimeout(resizeTimer);
            // resizeTimer = setTimeout(function(){
                me.initIcons();
            // } , 500);
        });
        
        el.addClass("desktop");
        me.viewport = $('<div class="desktop-viewport"></div>').appendTo(el);
        var toolbar = me.toolbar = $('<div class="desktop-toolbar"></div>').appendTo(el);
        el.append('<img class="desktop-background" src="' + opt.backgroundImage + '"/>');
        me.startbutton = $('<div class="desktop-startbutton"></div>').appendTo(toolbar);
        me.searchbar = $('<div class="desktop-searchbar"></div>').appendTo(toolbar);
        me.taskbar = $('<div class="desktop-taskbar"></div>').appendTo(toolbar);
        me.timebar = $('<div class="desktop-timebar"></div>').appendTo(toolbar);

        me.iconWrapper = $('<div class="desktop-icon-wrapper"></div>').appendTo(me.viewport);
        
        me.initIcons();

        // el.on("click", ".desktop-icon", function (event) {
        //     var jq = $(event.currentTarget),
        //         index = jq.index(),
        //         icon = opt.icons[index];
        //     if (opt.iconClick) opt.iconClick.call(me, event, icon);
        // });

        el.on("dblclick", ".desktop-icon", function (event) {
            var jq = $(event.currentTarget),
                index = jq.index(),
                icon = opt.icons[index];
            
            
            if (opt.iconDblClick) opt.iconDblClick.call(me, event, icon);
            
        });

        el.on("click", ".desktop-taskbar-icon", function (event) {
            var jq = $(event.currentTarget),
                index = jq.index(),         // 用数组的方式
                window = me.windows[index];

                // console.log(index)
            //alert(window.options.icon);

            //window.close();
            //window.min();

            if (window.isMin()) {
                window.restore();
            } else {
                window.min();
            }

//            if (window.isMax()) {
//                window.restore();
//            } else {
//                window.max();
//            }
        });
    },

    initIcons: function () {
        var me = this,
            opt = me.options,
            icons = opt.icons,
            el = me.viewport,
            width = el.width(),
            height = el.height(),
            cellWidth = opt.cellWidth,
            cellHeight = opt.cellHeight,
            rows = (height-height%cellHeight)/cellHeight,
            columns = (width-width%cellWidth)/cellWidth,
            html = "";
        console.log(columns)
        console.log(rows)
        $.each(icons, function (index, icon) {
            if (icon.row == null || icon.column == null) return;
                var x = icon.column * (cellWidth+width%cellWidth/(columns+1));
                var y = icon.row * (cellHeight+height%cellHeight/(rows+1));
                if(index+1>rows&&index+1<rows*columns){
                    var newrow=index%rows;
                    var newcol=(index-index%rows)/rows;
                    var y = newrow * (cellHeight+height%cellHeight/(rows+1));
                    var x = newcol * (cellWidth+width%cellWidth/(columns+1));
                }else if(index+1>rows*columns){
                    alert('请调整窗口大小');     
                }
                // var newrow=index%rows
                // console.log(newrow)
                // var y = newrow * (cellHeight+height%cellHeight/(rows+1));
                // if(newrow<icon.row&&index>rows-1){
                //     var x = (icon.column+1) * (cellWidth+width%cellWidth/(columns+1));
             
                // }
                // var x = icon.column * (cellWidth+width%cellWidth/(columns+1));
                html += '<div class="desktop-icon" style="left:' + x + 'px;top:' + y + 'px;"><image class="desktop-icon-image" src="';
                html += icon.icon;
                html += '"/><div class="desktop-icon-text">';
                html += icon.text;
                html += '</div></div>';
            
            
        });

        me.iconWrapper.html(html);

    },

    regiterWindow: function (window) {
        var me = this;

        me.windows.push(window);
        me.viewport.append(window.element);

        window.app = me;

        window.taskBarIcon = $('<div class="desktop-taskbar-icon"><i class="'+window.options.taskIcon+'"></i></div>').appendTo(me.taskbar);
    
    },

    unregisterWindow: function (window) {
        this.windows.remove(window);
        window.element.remove();
        window.taskBarIcon.remove();
    },

    activeWindow: function (window) {
        this.activeWindw = window;

        $.each(this.windows, function (index, win) {
            win.taskBarIcon.removeClass("desktop-window-active");
        });

        window.taskBarIcon.removeClass("desktop-window-active");
    }

}


var TaskWindow = function (options) {
    this.options = $.extend({}, this.options, options);
    this.init();
}
TaskWindow.prototype = {

    options: {
        icon: "",
        width: 300,
        height: 200             //
    },

    init: function () {
        var me = this,
            opt = me.options;

        me.element = $('<div class="window"></div>');

        me.element.css("width", opt.width + "px");
        me.element.css("height", opt.height + "px");
        //...

    },

    show: function (x, y) {
        var me = this,
            el = me.element;

        if(x==null||y==null){
            var width=el.width();
            console.log(width)
            el.css({
                left: "200px",
                top: "200px"
            });
        }else{
            el.css({
                left: x + "px",
                top: y + "px"
            });
        }
        

        //me.taskBarIcon.addClass("

        this.app.activeWindow(this);
    },

    isMax: function () {
        return this.element.hasClass("window-max");
    },

    isMin: function () {
        return this.element.hasClass("window-min");
    },

    restore: function () {
        this.element.removeClass("window-max");
        this.element.removeClass("window-min");
    },

    min: function () {
        this.element.removeClass("window-max");
        this.element.addClass("window-min");
    },

    max: function () {
        this.element.removeClass("window-min");
        this.element.addClass("window-max");
    },

    close: function () {
        this.app.unregisterWindow(this);
    }



}

TaskWindow.extend = function (props, statics) {
    props = props || {};
    if (props.constructor === Object.prototype.constructor) props.constructor = null;

    var base = this;
    var sub = props.constructor = props.constructor || function () { base.apply(this, arguments) };

    var F = function () { };
    F.prototype = base.prototype;
    var fn = sub.prototype = new F();

    for (var name in props) {
        if (name == "options") {
            fn[name] = $.extend(true, {}, fn[name], props[name]);
        } else {
            fn[name] = props[name];
        }
    }

    
    sub.extend = base.extend;
    sub.fn = sub.prototype;
    base.fn = base.prototype;

    return sub;
}



































//////////////////////////////////////////////////////////////////////////////////

//只放置原生JS已支持的方法，帮助在IE6下也运行正常。


////////////////////////////////////////////////////////////////////////////////////////
// javascrpit
////////////////////////////////////////////////////////////////////////////////////////

//if (!String.format) {
//    //var s = String.format("{0} ... {1} ... ", 'aaa', 'bbb');
//    String.format = function (format) {
//        var args = Array.prototype.slice.call(arguments, 1);
//        format = format || "";
//        return format.replace(/\{(\d+)\}/g, function (m, i) {
//            return args[i];
//        });
//    }
//}

//trim
//if (!String.prototype.trim) {
//    String.prototype.trim = function () {
//        var re = /^\s+|\s+$/g;
//        return function () { return this.replace(re, ""); };
//    } ();
//}

//bind
if (!Function.prototype.bind) {
    Function.prototype.bind = function (scope) {
        var fn = this;
        return function () {
            return fn.apply(scope, arguments);
        }
    }
}

//now
if (!Date.now) {
    Date.now = function () {
        return new Date().getTime();
    }
}

////////////////////////////////////////////////////////////////////////////////////////
// Array
////////////////////////////////////////////////////////////////////////////////////////
var ap = Array.prototype;
$.extend(ap, {
    add: ap.enqueue = function (item) {
        this[this.length] = item;
        return this;
    },
    addRange: function (array) {
        for (var i = 0, j = array.length; i < j; i++) this[this.length] = array[i];
        return this;
    },
    clear: function () {
        this.length = 0;
        return this;
    },
    clone: function () {
        if (this.length === 1) {
            return [this[0]];
        }
        else {
            return Array.apply(null, this);
        }
    },
    contains: function (item) {
        return (this.indexOf(item) >= 0);
    },
    indexOf: ap.indexOf || function (item, from) {
        var len = this.length;
        for (var i = (from < 0) ? Math.max(0, len + from) : from || 0; i < len; i++) {
            if (this[i] === item) return i;
        }
        return -1;
    },
    dequeue: function () {
        return this.shift();
    },
    insert: function (index, item) {
        this.splice(index, 0, item);
        return this;
    },
    insertRange: function (index, items) {
        if (index < 0 || index > this.length) index = this.length;
        for (var i = items.length - 1; i >= 0; i--) {
            var item = items[i];
            this.splice(index, 0, item);
        }
        return this;
    },
    remove: function (item) {
        var index = this.indexOf(item);
        if (index >= 0) {
            this.splice(index, 1);
        }
        return (index >= 0);
    },
    removeAt: function (index) {
        var ritem = this[index];
        this.splice(index, 1);
        return ritem;
    },
    removeRange: function (items) {
        items = items.clone();
        //if (items == this) items = items.clone();
        for (var i = 0, l = items.length; i < l; i++) {
            this.remove(items[i]);
        }
    },
    filter: ap.filter || function (fn, scope) {
        var scope = scope || window,
        i = 0,
        l = this.length,
        results = [],
        o;
        for (; i < l; i++) {
            o = this[i];
            if (fn.call(scope, o, i, this)) {
                results.push(o);
            }
        }
        return results;
    },
    map: ap.map || function (fn, scope) {
        var scope = scope || window,
        i = 0,
        l = this.length,
        results = [];
        for (; i < l; i++) {
            results[i] = fn.call(scope, this[i], i, this);
        }
        return results;
    },
    some: ap.some || function (fn, scope) {
        var scope = scope || window,
        i = 0,
        l = this.length;
        for (; i < l; i++) {
            if (fn.call(scope, this[i], i, this)) return true;
        }
        return false;
    },
    every: ap.every || function (fn, scope) {
        var scope = scope || window,
        i = 0,
        l = this.length;
        for (; i < l; i++) {
            if (!fn.call(scope, this[i], i, this)) return false;
        }
        return true;
    },
    forEach: ap.forEach || function (fn, scope) {
        var scope = scope || window,
            i = 0,
            l = this.length;
        for (; i < l; i++) {
            fn.call(scope, this[i], i, this);           //Array.prototype.forEach是无法跳出循环的。return false也不行。
        }
    }
});



