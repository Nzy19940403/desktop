
var QQWindow = TaskWindow.extend({

    options: {
        dragTitle:"腾讯QQ"
    },

    init: function () {
        var me = this,
            opt = me.options;

        TaskWindow.fn.init.call(me);

        var el = me.element;

        el.addClass("qqwindow");

        //....

    }

});





// github desktop///////////////////////////////////////
var GithubWindow = TaskWindow.extend({

    options: {
        dragTitle:""
    },

    init: function () {
        var me = this,
            opt = me.options;

        TaskWindow.fn.init.call(me);

        var el = me.element;

        el.addClass("GithubWindow");
        me.repobar=$('<div class="repo-select-bar"></div>').appendTo(el)
        //....

    }

});




// google iframe///////////////////////////////////////////////////
var ChromeWindow = TaskWindow.extend({

    options: {
        dragTitle:""
    },

    init: function () {
        var me = this,
            opt = me.options;

        TaskWindow.fn.init.call(me);

        var el = me.element;
        console.log(el)
        el.addClass("ChromeWindow window-max");
        me.frameWrapper=$('<div class="framwrap"></div>').appendTo(el);
        var myframe=me.frame=$('<iframe src="https://cn.vuejs.org/"></iframe>').appendTo(me.frameWrapper);
        $('<button class="user-button"><i class="fa fa-user"></i></button>').prependTo(me.toolbuttons)
        myframe.css({
            'width':'100%',
            'height':'100%',
            'border':'none'
        })
        //....

    }

});