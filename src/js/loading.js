

document.write("<script type=\"text/javascript\" src=\"src/js/desktop.js\"></script>");

document.write("<link rel=\"stylesheet\" href=\"src/css/desktop.css\" type=\"text/css\" />"); 
document.write("<link rel=\"stylesheet\" href=\"src/css/windowCommon.css\" type=\"text/css\" />"); 
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

    
   

    // $('#loadMask').delay(5000).hide(0);  

    document.onreadystatechange = completeLoading; 

    function completeLoading(){
        if(document.readyState == "complete"){
            setTimeout(function(){
                $('#loadMask').delay(0).hide(0);  
            },100)
        }
       
    }
