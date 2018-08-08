
var QQWindow = TaskWindow.extend({

    options: {
        a: 111
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

