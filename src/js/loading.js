
    var template,
        num=Math.random(),
        height=($(window).height()-150)/2;

        if(num<0.25){
            template=   '<div id="loadMask">'+
                            '<div class="loader loader1" style="margin-top:'+height+'px;">'+
                                '<div>'+
                                    '<div>'+
                                        '<div>'+
                                            '<div>'+
                                                '<div>'+
                                                    '<div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
        }else if(num>=0.25&&num<0.5){
            template=   '<div id="loadMask">'+
                        '<div class="loader loader2" style="margin-top:'+height+'px;">'+
                            '<div>'+
                                '<div>'+
                                    '<div>'+
                                        '<div>'+
                                            '<div>'+
                                                '<div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
        }else if(num>=0.5&&num<0.75){
            template=   '<div id="loadMask">'+
                        '<div class="loader loader3" style="margin-top:'+height+'px;">'+
                            '<div>'+
                                '<div>'+
                                    '<div>'+
                                        '<div>'+
                                            '<div>'+
                                                '<div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
        }else{
            template=   '<div id="loadMask">'+
                            '<div class="loader loader4" style="margin-top:'+height+'px;">'+
                                '<div>'+
                                    '<div>'+
                                        '<div>'+
                                            '<div>'+
                                                '<div>'+
                                                    '<div>'+
                                                        '<div>'+
                                                            '<div>'+
                                                                '<div>'+
                                                                    '<div>'+
                                                                    '</div>'+
                                                                '</div>'+
                                                            '</div>'+
                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
        }

    
    $(template).appendTo('body')
    // $('#loadMask').delay(5000).hide(0);  

    document.onreadystatechange = completeLoading; 

    function completeLoading(){
        if(document.readyState == "complete"){
            setTimeout(function(){
                $('#loadMask').delay(1000).hide(0);  
            },100)
        }
       
    }
