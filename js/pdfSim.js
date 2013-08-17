var $ = jQuery;

/** pdfSim setttings **/
var pdfSim={
     showPage : true,

         path : 'images/pdfs/',   /** must end with / **/
       prefix : '1-2 (',
       suffix : ')',
          ext : 'png',

         imgs : [],
        total : 6   //if imgs is set,then total is invalid
};






$(document).ready(function(){

      var par=document.getElementById('pdf-board');
      var total=(pdfSim.imgs.length)?pdfSim.imgs.length:pdfSim.total;
      for(var i=1;i<=total;i++){
          var htht='<div id="page-'+i+'" class="page">';
          var ht='<a name="page-'+i+'" class="page-hash" id="page-hash-'+i+'"></a>';
              ht+='<div class="wrapper"><div id="viewer'+i+'" class="viewer"></div></div>';

          if(pdfSim.showPage)
            ht+='<span class="page-no" id="page-no-'+i+'">'+i+'</span>';

          htht+=ht+'</div>';
          par.innerHTML+=htht;
      }

      function getSrc(num){
        var src  = pdfSim.path+pdfSim.prefix
            src += (pdfSim.imgs.length)?pdfSim.imgs[num-1]:num.toString();
            src += pdfSim.suffix+'.'+pdfSim.ext;

        return src;
      }

      var iviewer = {};
      $(".viewer").each(function(){
        var page_no = parseInt($(this).attr('id').replace('viewer', ''));
                
        $(this).iviewer({
              src: getSrc(page_no),
              initCallback: function ()
               {
                    var object = this;
                   $("#in").click(function(){ object.zoom_by(1);}); 
                   $("#out").click(function(){ object.zoom_by(-1);}); 
                   $("#fit").click(function(){ object.fit();}); 
                   $("#orig").click(function(){  object.set_zoom(100); }); 
               },
               ui_disabled:true
          });
      });




      /** page navigator  by shonenada **/
    var get_max_page = function(){
        return $(".page-hash").length;
    }

    var get_current_page = function(){
        var current_page_no = 0;
        var location = parseInt($(document).scrollTop());
        $(".page-hash").each(function(){
            var page_no = parseInt($(this).attr('id').replace('page-hash-', ''));
            var page_location = parseInt($(this).offset().top);
            if (location > (page_location-5)){
                current_page_no++;
            }
        });
        return current_page_no;
   }
   
   var show_page = function(){
        var current_page_no = get_current_page();
        current_page_no = current_page_no == 0 ? 1 : current_page_no;
        var total_page = get_max_page();
        var precentage = parseInt(current_page_no * 100 / total_page);
        $("#current-page-no").html(current_page_no + '/' + total_page + '<br />' + precentage + '%');
   };
   show_page();

   /** bind arrow-up & down event to the button **/
   $("#arrow-up").click(function(){
        var current_page = get_current_page();
        if (current_page > 1){
            $.scrollTo($("#page-hash-" + (current_page - 1)), 500);
        }
   })

   $("#arrow-down").click(function(){
        var current_page = get_current_page();
        if (current_page < get_max_page()){
            $.scrollTo($("#page-hash-" + (current_page + 1)), 500);
        }
   })

   $(window).scroll(function(){
        show_page();
   });
});