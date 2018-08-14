﻿var DeskTop = function (element, options) {
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
            dragWin,offsetX,offsetY;

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
            // if(jq["0"].className=="max-button"){
            //     alert(1)
            // }

        })
        el.on("click", ".desktop-taskbar-icon", function(event) {
            me.taskIconClick(event)

//            if (window.isMax()) {
//                window.restore();
//            } else {
//                window.max();
//            }
        });
        el.on("mousedown",".window .dragArea",function(e){
            allowdrag=true
            
             oldx=me.dragstart(e).x;
             oldy=me.dragstart(e).y;
            dragWin=me.dragstart(e).mytarget;
            offsetX=me.dragstart(e).offset.left;
            offsetY=me.dragstart(e).offset.top;
            // me.dragstart(e)
            
            
        })
        // setInterval(function(){
        //     console.log(oldx,oldy)
        // },1000)
        el.on("mousemove",function(e){
            if(allowdrag==false) return
           
            me.drag(e,dragWin,oldx,oldy,offsetX,offsetY);
        })
        el.on("mouseup",function(){
            allowdrag=false
        })


        me.tellTime()
    },
    taskIconClick(event){
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
                    Pos={x,y}
                    text=icon.text;
                iconPos.push({Pos,iconPage,text})
            });    
            return iconPos;


    },
    tellTime:function(){
        var me=this,
            html='';
        html+='<div class="timeTeller"></div>';
        html+='<div class="yearTeller"></div>'
        me.timebar.html(html)
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
        this.activeWindw = window;
        $.each(this.windows, function (index, win) {
            win.taskBarIcon.removeClass("desktop-window-active");
            win.element.removeClass("front")
        });

        window.taskBarIcon.addClass("desktop-window-active");
        window.element.addClass("front")
    },
    drag:function(e,dragWin,oldx,oldy,offsetX,offsetY){
        var x,y,newx,newy;
        newx=e.clientX;
        newy=e.clientY;
        x=newx-oldx+offsetX;
        y=newy-oldy+offsetY;
        
        // console.log(offset.left,offset.top)

        dragWin.css({'left':x,'top':y});

    },
    dragstart:function(e){
        var x,y,mytarget,offset;
        x=e.clientX;
        y=e.clientY;
        mytarget=$(e.currentTarget).parents(".window");
        offset=mytarget.offset()
        return {x,y,mytarget,offset}    
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
            opt = me.options,
            allowdrag=false;

        var win=me.element = $('<div class="window"></div>');

        me.element.css("width", opt.width + "px");
        me.element.css("height", opt.height + "px");
        me.time=$('<div>'+Date.now()+'</div>').appendTo(win);
        me.toolbuttons=$('<div class="toolbuttons"><button class="max-button">max</button><button class="min-button">min</button><button class="close-button">close</button></div>').appendTo(win);
        me.dragArea=$('<div class="dragArea">按住这里拖动</div>').appendTo(win)
        
       
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
            win.element.removeClass("front")
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
    windowToolButton:function(e){
        var cls=e["0"].className;
        switch (cls){
            case "max-button":
            this.max();
            break;
            case "min-button":
            this.min();
            var index=this.app.windows.length;
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
            break;
            case "close-button":
            this.close()
            
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



