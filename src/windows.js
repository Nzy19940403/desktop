
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
        $('<button class="dropdown-button"><i class="fa fa-angle-down"></i></button>').prependTo(me.toolbuttons)
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
            // isnavClicked=false;

        TaskWindow.fn.init.call(me);

        var el = me.element;

        el.addClass("GithubWindow");
        me.repobar=$(me.repoInit()).appendTo(el.contentwrap)  
        me.githubNav=$('<div class="github-nav nav"></div>').appendTo(el.contentwrap); 
        me.content=$('<div class="content"></div>').appendTo(el.contentwrap)
        me.mask=$('<div class="mask"></div>').appendTo(el.contentwrap)

        me.githubNavInit();
        //....
        el.on('click','.currentRepo',function(e){
            me.showRepoByClick(e);
        })

    }, 
    repoInit:function(){
        var me=this,
            template;
        
            template=   '<div class="repo-select-bar">'+
                            '<div class="currentRepo">'+
                                '<span class="repo-title">Current Repository</span>'+
                                '<span class="repo-info">No Repositories</span>'+
                            '</div>'+
                        '</div>'

            return template
    },
    showRepoByClick:function(e){
        $(e.currentTarget).toggleClass('active')
    },
  
    //menu的组件化
    githubNavInit:function(){
        var me=this,
            menu;
      

        menu=new DropDownMenu(me.githubNav,me.element.contentwrap,{dropdownmenu:[
            {name:'file-nav',rows:'5',spliteRow:[1,3,4],cls:'file-dropdown',navText:'File',forbidRow:[],
            rowText:['New repository','Add local repository','clone repository','options','exit',],
            shortCut:['Crtl+N','Crtl+O','Crtl+Shift+O','Crtl+,','']},

            {name:'edit-nav',rows:'6',spliteRow:[2],cls:'edit-dropdown',navText:'Edit',forbidRow:[],
            rowText:['Undo','Redo','cut','Copy','Paste','Select all'],
            shortCut:['Crtl+Z','Crtl+Y','Crtl+X','Crtl+C','Crtl+V','Crtl+A']},

            {name:'view-nav',rows:'9',spliteRow:[4,5,8],cls:'view-dropdown',navText:'view',forbidRow:[0,1,3],
            rowText:['Changes','History','Repository list','Branches list','Toggle full sereen','Reset zoom','Zoom in','Zoom out','Toggle developer tools'],
            shortCut:['Crtl+1','Crtl+2','Crtl+T','Crtl+B','F11','Ctrl+0','Ctrl+=','Ctrl+-','Ctrl+Shift+l']},

            {name:'repo-nav',rows:'8',spliteRow:[3,7],cls:'repo-dropdown',navText:'Repository',forbidRow:[0,1,2,3,4,5,6,7],
            rowText:['Push','Pull','Remove','View on Github','Open in Command Prompt','Show in Explorer','Open in external editor','Repository settings'],
            shortCut:['Crtl+P','Crtl+Shift+P','','Crtl+Shift+G','Crtl+','Crtl+Shift+F,','Crtl+Shift+A','']},

            {name:'branch-nav',rows:'8',spliteRow:[3,6],cls:'branch-dropdown',navText:'Branch',forbidRow:[0,1,2,3,4,5,7],
            rowText:['New branch','Rename','Delete','Update from default branch','Compare to branch','Merge into current branch','Compare on Github','Create pull request'],
            shortCut:['Crtl+Shift+N','','','Crtl+Shift+U','Crtl+Shift+B','Crtl+Shift+M','Crtl+Shift+C','Crtl+R']},

            {name:'help-nav',rows:'5',spliteRow:[4],cls:'help-dropdown',navText:'Help',forbidRow:[],
            rowText:['Report issue','Contact Github support','Show User Guides','Show logs in Explorer','About Github Desktop',],
            shortCut:[]},           
        ]}) 
       
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

        el.addClass("ChromeWindow window-max");
        me.frameWrapper=$('<div class="framwrap"></div>').appendTo(el.contentwrap);
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




















////////////////////////////////////github-nav-dropdownMenu  

// var Menu = function (element,menuWrap,options) {
//     this.element = $(element);
//     this.menuWrap = $(menuWrap);
//     this.options = $.extend({}, this.options, options);
//     this.init();
// }
// Menu.prototype={
//     constructor:Menu,
//     options:{},
//     init:function(){
//         var me=this,
//             el=this.element,
//             wrap=this.menuWrap,
//             isnavClicked=false;
           
//         me.dropdownmenuInit()
        




//         wrap.on("click",".github-nav div",function(e){   
//             if(isnavClicked==true){
//                 $(e.target).removeClass('active')
//                 isnavClicked=false;
//                 $('.github-nav div').removeClass('open');
//                 $(me.menuWrap[0]).children('.mask').removeClass('active')
//                 for(let i=0;i<me.dropdownmenu.length;i++){
//                     me.dropdownmenu.eq(i).addClass('hide')
//                 }
//             }else{
//                 me.navClick(e);      
//                 isnavClicked=true;
//             }
            
//         });
//         wrap.on("mouseenter",".github-nav div",function(e){
//             if(isnavClicked==false) return;    
//             me.navHover(e);
//         });
        
//         wrap.on("click",'.mask',function(e){
            
//             $(e.target).removeClass('active')
            
//             isnavClicked=false;

//             $('.github-nav div').removeClass('open');
//             for(let i=0;i<me.dropdownmenu.length;i++){
//                 me.dropdownmenu.eq(i).addClass('hide')
//             }
//         });
//         wrap.on('click','.menu .optionWrap',function(){
        
//             $('.github-nav div').removeClass('open');
//             for(let i=0;i<me.dropdownmenu.length;i++){
//                 me.dropdownmenu.eq(i).addClass('hide')
//             }
//             $(me.menuWrap[0]).children('.mask').removeClass('active')
//             // $('.mask').removeClass('active');
//             isnavClicked=false;
//         })
       
        
//     },
//     dropdownmenuInit:function(){
//         var me=this,
//             el=this.element,
//             wrap=this.menuWrap,
//             nav,
//             temp;
//         temp=me.createDropDownMenu();
//         nav=me.createDropDownNav();
//         me.dropdownnav=$(nav).appendTo(el)
//         me.dropdownmenu=$(temp).appendTo(wrap);
//         me.forbidRow();

//     },
//     createDropDownMenu:function(){
//         var me=this,
//             opt=me.options.dropdownmenu,
//             temp='';
        
        
//         for(let j=0;j<opt.length;j++){
//             temp+='<div style=" " class="menu '+opt[j].cls+' hide">'
//             for(let i=0;i<opt[j].rows;i++){
//                 if(!opt[j].shortCut[i])opt[j].shortCut[i]='';
//                 if($.inArray(i,opt[j].spliteRow)=='-1'){
//                     temp+='<div class="optionWrap"><div><span class="nav-func-text">'+opt[j].rowText[i]+'</span><span class="shortcut">'+opt[j].shortCut[i]+'</span></div></div>'
//                 }else{
//                     temp+='<div class="split optionWrap"><div><span class="nav-func-text">'+opt[j].rowText[i]+'</span><span class="shortcut">'+opt[j].shortCut[i]+'</span></div></div>'
//                 }
            
//             }
//             temp+='</div>'
//         }
        
        

//         return temp
//     },
//     forbidRow:function(){
//         var me=this,
//             rows,BannedRow
//             opt=me.options.dropdownmenu;

//         for(let j=0;j<opt.length;j++){
//             rows=opt[j].forbidRow;

//             if(rows.length>0){
//                 for(let i=0;i<rows.length;i++){
//                     BannedRow=rows[i],
//                     me.dropdownmenu[j].childNodes[BannedRow].classList.add('forbid')
//                 }
//             } 
//         }
//     },
//     createDropDownNav:function(){
//         var me=this,
//         opt=me.options.dropdownmenu,
//         nav='';

        
//         for(let i=0;i<opt.length;i++){
//             nav+='<div class="'+opt[i].name+'">'+opt[i].navText+'</div>'
//         }
     
//         return nav
//     },
//     navClick:function(event){
//         this.showNavDropdownMenuByClick(event)
//     },
//     navHover:function(event){
//         this.showNavDropdownMenuByHover(event)
//     },
//     getPos:function(){
//         var me=this,
//             x,
//             nav=me.dropdownnav;

//         for(let i=0;i<nav.length;i++){
//             x=nav.eq(i).position().left 

//             me.dropdownmenu.eq(i).css('left',x)
            
//         }
        
        

//     },
//     showNavDropdownMenuByClick:function(event){
//         var index,
//             win,
//             me=this;

//         me.getPos();
//         index=$(event.target).index();
//         win=me.dropdownmenu.eq(index);

//         $(event.target).addClass('open').siblings().removeClass('open');
//         $(me.menuWrap[0]).children('.mask').addClass('active')

//         for(let i=0;i<me.dropdownmenu.length;i++){
//             me.dropdownmenu.eq(i).addClass('hide')
//         }
     
//         win.removeClass('hide');
        
        
//         // $('.mask').addClass('active');
//     },
//     showNavDropdownMenuByHover:function(event){
//         var name= event.target.className,
//         index,win,
//         me=this;
//         $(event.target).addClass('open').siblings().removeClass('open')
//         index=$(event.target).index();
//         win=me.dropdownmenu.eq(index);

//         for(let i=0;i<me.dropdownmenu.length;i++){
//             me.dropdownmenu.eq(i).addClass('hide')
//         }
//         win.removeClass('hide')
//         $(me.menuWrap[0]).children('.mask').addClass('active')
//     }
    
    
// }