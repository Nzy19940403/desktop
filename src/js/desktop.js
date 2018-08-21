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
            opt = me.options,
            allowdrag=false,
            dragWin,offsetX,offsetY,resizeX,resizeY;

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
        el.on("click",".toolbuttons button",function(e){
            var jq = $(e.currentTarget);
            var index=jq.parents(".window").index();
            var  window = me.windows[index-1];
            window.windowToolButton(jq)
        });
        el.on("click", ".desktop-taskbar-icon", function(event) {
            me.taskIconClick(event)

//            if (window.isMax()) {
//                window.restore();
//            } else {
//                window.max();
//            }
        });
        el.on("mousedown",".window",function(e){
            var index =$(e.currentTarget).index();
            var selectedWin=me.windows[index-1]
            me.activeWindow(selectedWin)
        })



        //拖拽事件
        el.on("mousedown",".window .dragArea",function(e){
            allowdrag=true
            oldx=me.windowDragstart(e).x;
            oldy=me.windowDragstart(e).y;
            dragWin=me.windowDragstart(e).mytarget;
            offsetX=me.windowDragstart(e).offset.left;
            offsetY=me.windowDragstart(e).offset.top;
        });
        el.on("mousemove",function(e){
            if(allowdrag==false) return    
            me.windowDrag(e,dragWin,oldx,oldy,offsetX,offsetY);
        });

        el.on("mouseup",function(){
            allowdrag=false
        });



        el.on("click",".desktop-startbutton",function(){
            loading.testfunc();
        })




        el.on("mousedown",".window",function(e){
            var x,y;
            x=me.getClient(e).x;
            y=me.getClient(e).y;
            console.log(x,y)
        })
        me.tellTime();
    },
    taskIconClick:function(event){
        var jq = $(event.currentTarget),
        me=this,
        index = jq.index(),         // 用数组的方式
        window = me.windows[index],
        winL=me.windows.length;

        switch(winL){
            case 1:
            if(window.isMin()){
                
                window.restore();
            }else{
                window.min()      
            }
            break;

            default:
            if (window.isMin()) {
                window.restore();              
            } else if(!window.isMin()&&!window.isFront()){  //window没有min并且window不在最上面的时候 
                app.activeWindow(window);
            }else if(!window.isMin()&&window.isFront()){  //window没有min并且window在最上面的时候
                
                window.min();

                for(var i=winL-1;i>=0;i--){         //一共有几个taskbaricon 就遍历几次 找到没有最小化的 并让她front

                    var mywin=me.windows[i].element;

                    if(!$(mywin).hasClass("window-min")){
                        $.each(me.windows, function (index, win) {
                            win.taskBarIcon.removeClass("desktop-window-active");
                            win.element.removeClass("front")
                
                        });

                        me.windows[i].element.addClass("front")
                        me.windows[i].taskBarIcon.addClass("desktop-window-active")
                        return
                    }
                }
                
            }else{
                window.min();
            }

            break;

        }
    },
    initIcons: function () {
        var me = this,
            html = "",
            iconPos;
        

        iconPos=me.getIconPos();
        $.each(iconPos,function(index,i){
            html += '<div class="desktop-icon" style="left:' + i.Pos.x + 'px;top:' + i.Pos.y + 'px;"><image class="desktop-icon-image" src="';
            html += i.iconPage;
            html += '"/><div class="desktop-icon-text">';
            html += i.text;
            html += '</div></div>';
        })
    
        me.iconWrapper.html(html);

    },
    getIconCoordinate:function(x,y){
        //获得调整后的新的坐标row/ col
    },
    getIconPos:function(){
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
            iconPos=[],
            newrow,
            newcol;
        

            $.each(icons, function (index, icon) {
                // if (icon.row == null|| icon.column ==null){} return 
                var x = icon.column * (cellWidth+width%cellWidth/(columns+1));
                var y = icon.row * (cellHeight+height%cellHeight/(rows+1));
                if(index+1>rows&&index+1<rows*columns){
                    newrow=index%rows;
                    newcol=(index-index%rows)/rows;
                    var y = newrow * (cellHeight+height%cellHeight/(rows+1));
                    var x = newcol * (cellWidth+width%cellWidth/(columns+1));
                }else if(index+1>rows*columns){
                    alert('请调整窗口大小');     
                }
                
                var iconPage=icon.icon,
                    Pos={x:x,y:y},
                    text=icon.text;
                iconPos.push({Pos:Pos,iconPage:iconPage,text:text})
            });    
            return iconPos;


    },
    tellTime:function(){
        var me=this
        setInterval(function(){
            me.time();
        },1000)
        
    },
    time:function(){
        var me=this,
            html='';
        html+='<div class="timeTeller"></div>';
        html+='<div class="yearTeller"></div>';
        me.timebar.html(html)
        function p(s) {
            return s < 10 ? '0' + s: s;
        }
        var myDate = new Date();
        //获取当前年
        var year=myDate.getFullYear();
        //获取当前月
        var month=myDate.getMonth()+1;
        //获取当前日
        var date=myDate.getDate(); 
        var h=myDate.getHours();       //获取当前小时数(0-23)
        var m=myDate.getMinutes();     //获取当前分钟数(0-59)
        var s=myDate.getSeconds();  
        
        var now1=year+'-'+p(month)+"-"+p(date)
        var now2=p(h)+':'+p(m)+":"+p(s);
        $('.timeTeller').html(now2)
        $('.yearTeller').html(now1)

    },
    regiterWindow: function (window) {
        var me = this;

        me.windows.push(window);
        me.viewport.append(window.element);
        window.app = me;
        window.taskBarIcon = $('<div class="desktop-taskbar-icon"><i class="'+window.options.taskIcon+'"></i></div>').appendTo(me.taskbar);
    
    },

    unregisterWindow: function (window) {

        // var index=window.element.index()
        // this.windows.splice(index,1)
        // console.log(this.windows)
        this.windows.remove(window); // ?????????????????????????????????
        
        window.element.remove();
        window.taskBarIcon.remove();
        
    },

    activeWindow: function (window) {
        this.activedWindow = window;

        $.each(this.windows, function (index, win) {
            win.taskBarIcon.removeClass("desktop-window-active");
            win.element.removeClass("front")
        });

        window.taskBarIcon.addClass("desktop-window-active");
        window.element.addClass("front")
    },
    windowDrag:function(e,dragWin,oldx,oldy,offsetX,offsetY){
        var x,y,newx,newy;
        newx=e.clientX;
        newy=e.clientY;
        x=newx-oldx+offsetX;
        y=newy-oldy+offsetY;
        
        // console.log(offset.left,offset.top)

        dragWin.css({'left':x,'top':y});

    },
    windowDragstart:function(e){
        var x,y,mytarget,offset;
        x=e.clientX;
        y=e.clientY;
        mytarget=$(e.currentTarget).parents(".window");
        offset=mytarget.offset();
        return {x:x,y:y,mytarget:mytarget,offset:offset}    
    },
    startButtonClick:function(){

    },
    winResize:function(){

    },
    getClient:function(e){
        var x,y;
        x=e.clientX;
        y=e.clientY;
        return {x:x,y:y}
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
        height: 200,
        dragTitle:null          //
    },

    init: function () {
        var me = this,
            opt = me.options,
            allowdrag=false;

        var win=me.element = $('<div class="window"></div>');
        var wincontentWrap=me.element.contentwrap=$('<div class="content-wrap"></div>').appendTo(win)
        me.element.css("width", opt.width + "px");
        me.element.css("height", opt.height + "px");
        me.toolbuttons=$('<div class="toolbuttons"><button class="min-button"><i class="fa fa-minus"></i></button><button class="max-button"><i class="fa fa-square-o"></i></button><button class="close-button"><i class="fa fa-close"></i></button></div>').appendTo(wincontentWrap);
        me.dragArea=$('<div class="dragArea"><span>'+opt.dragTitle+'</span></div>').appendTo(wincontentWrap)
        
       
        //...

    },

    show: function (x, y) {
        var me = this,
            el = me.element;

        if(x==null||y==null){
            var width=el.width(),
                height=el.height(),
                Vheight=this.app.viewport.height(),
                Vwidth=this.app.viewport.width(),          
                newL=(Vwidth-width)/2,
                newT=(Vheight-height)/2;

            el.css({
                left: newL+"px",
                top: newT+"px"
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
    isFront:function(){

        return this.element.hasClass("front");
    },
    clearFront:function(){
        $.each(this.app.windows,function(index,win){
            win.element.removeClass("front");
        })
    },
    restore: function () {
        // this.element.removeClass("window-max");
        $.each(this.app.windows, function (index, win) {
            win.taskBarIcon.removeClass("desktop-window-active");
            win.element.removeClass("front")
        });

        this.element.fadeIn().removeClass("window-min").addClass("front");
        this.taskBarIcon.addClass("desktop-window-active")
    },

    min: function () {
        // this.element.removeClass("window-max");
        this.element.addClass("window-min");
        this.element.removeClass("front");
        this.taskBarIcon.removeClass("desktop-window-active");

    },

    max: function () {
        this.element.removeClass("window-min");
        this.element.toggleClass("window-max");
    },
    close: function () {
        this.app.unregisterWindow(this);
    },
    AutoPickWinAfterMin:function(index){
        if(index>1){
            for(var i=index-1;i>=0;i--){         //一共有几个taskbaricon 就遍历几次 找到没有最小化的 并让她front

                var mywin=this.app.windows[i].element;

                if(!$(mywin).hasClass("window-min")){
                    $.each(this.app.windows, function (index, win) {
                        win.taskBarIcon.removeClass("desktop-window-active");
                        win.element.removeClass("front")
            
                    });

                    this.app.windows[i].element.addClass("front")
                    this.app.windows[i].taskBarIcon.addClass("desktop-window-active")
                    return
                }
            }
        }
    },
    AutoPickWinAfterClose:function(index){
        switch (index){
            case "0":
            
            break;

            case "1":
            var mywin=this.app.windows[0];
            if(!$(mywin.element).hasClass("window-min")){
                mywin.element.addClass("front");
                mywin.taskBarIcon.addClass("desktop-window-active")

            }
            break;

            default:
            for(var i=index-1;i>=0;i--){         //一共有几个taskbaricon 就遍历几次 找到没有最小化的 并让她front

                var mywin=this.app.windows[i].element;

                if(!$(mywin).hasClass("window-min")){
                    $.each(this.app.windows, function (index, win) {
                        win.taskBarIcon.removeClass("desktop-window-active");
                        win.element.removeClass("front")
            
                    });

                    this.app.windows[i].element.addClass("front")
                    this.app.windows[i].taskBarIcon.addClass("desktop-window-active")
                    return
                }
            }
            break;
        }

        
    },
    windowToolButton:function(e){
        var cls=e["0"].className;
        switch (cls){
            case "max-button":
            this.max();
            break;
            case "min-button":
            this.min();
            
            var index=this.app.windows.length;
            this.AutoPickWinAfterMin(index)
          
            break;
            case "close-button":
            this.close()
            var index=this.app.windows.length;
            this.AutoPickWinAfterClose(index);  
            break;
        }
        
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



///////////////////////////////////////////////////////////////////

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


