//This file must encoded as Unicode(NOT UTF-8!!!) to show the Chineses Characters correctly


var $ = jQuery;


/** floating box  settings**/
var flowBox={
             from : 'list', //'ul',alt','list'
           fromId : '#indexUL',
     imgContainer : '#pdf-board',   // if 'alt'
       imgElement : '#viewer1',
   indexContainer : '#sidebar',
            title : '社团介绍',
        noneTitle : true,
             list : {
                                // '' :  '1',
                    '社团介绍目录' :  '2',
                                // '' :  '3',
                  '社团联合会简介' :  '4',
                    '社联部门介绍' :  '5',
                                // '' :  '6',
                                // '' :  '7',
                   'B&G模特俱乐部' :  '8',
                          '吉他社' :  '9',
                '火柴天堂音乐协会' : '10',
                          '戏剧社' : '11',
         'HIP-POP街头文化传播协会' : '12',
                        '提琴协会' : '13',
                        '手语协会' : '14',
                        '韩语协会' : '15',
                        '魔方协会' : '16',
                    '手工创艺协会' : '17',
                        '美食协会' : '18',
                    '启言口才协会' : '19',
                          '魔术社' : '20',
                    'ALFA动漫协会' : '21',
                        '日语协会' : '22',
                        '书法协会' : '23',
                        '流风诗社' : '24',
                '汇影世纪电影协会' : '25',
                          '励志社' : '26',
                      '教练学学会' : '27',
                        '摄影协会' : '28',
                  '绿色风环保协会' : '29',
                        '英语协会' : '30',
                        '柔道协会' : '31',
                        '管理学会' : '32',
                '英语议会制辩论社' : '33',
              '社会调查与研究协会' : '34',
                        '旅游协会' : '35',
                        '财经学会' : '36',
                        '天文协会' : '37',
                '电子竞技运动社团' : '38'
             },
         callback : true,

         // For automatically generate links
      autoGenPath : true,             //Enabled when is set to true
             path :'images/pdfs/',
           prefix : '',
           suffix : '',
              ext : '.png'
      };


//cannot put after the pdfSim, because iviewer will delete the alt propertie
$(document).ready(function(){

    //index given by the ul which anchor is the value of the li, and the title is the content of the li
   if(flowBox.from=='ul' && $(flowBox.fromId+'>li').length){
      flowBox.list={};
      var container=flowBox.fromId;
      $(container+'>li').each(function(){
          var anchor=$(this).attr('data-value');
          var text=$(this).html();
          flowBox.list[text]=anchor;
      });
   }

   //index given by images which anchor is the name of the img, and the title is the alt of the img
   else if(flowBox.from=='alt' && $(flowBox.imgContainer+'>img').length){
      flowBox.list={};
      var container=flowBox.imgContainer;
      $(container+'>img').each(function(i){
          var anchor='page-hash-'+(i+1);
          var text=$(this).attr('alt') ;
          flowBox.list[text]=anchor;
      });
   }

   //index given by the flowBox.list
   else{// if(flowBox.from=='list' && flowBox.list.length){
      //pass
   }

   $(flowBox.fromId).remove();

   if(flowBox.autoGenPath){
      $.each(flowBox.list,function(index,item){
          var src = flowBox.path+flowBox.prefix;
              src+= item;
              src+= flowBox.suffix+flowBox.ext;

          flowBox.list[index] = src;
      })
   }


});






/** pdfSim setttings **/
var pdfSim={
    container : '#pdf-board',
     showPage : false,

         path : 'images/',   // must end with /
       prefix : 'test_image',
       suffix : '',
          ext : '.jpg',

         imgs : [2,''],
        total : 2,    //if imgs is set,then total is invalid
      onlyOne : true  //show just one image
};


$(document).ready(function(){
      var container = pdfSim.container;
      var       par = $(pdfSim.container)[0];
      var     total = (pdfSim.imgs.length)?pdfSim.imgs.length:pdfSim.total;
      var      imgs = [];



      //if there's img tag in the container, then load those image in the container
      if($(container+'>img').length){
        $(container+'>img').each(function(){
          imgs.push($(this).attr('src'));
        });

        $(container+'>img').remove();
        pdfSim.path='';
        pdfSim.prefix='';
        pdfSim.suffix='';
        pdfSim.ext='';
      }

      //else load the image which are on the imgs list, if the imgs list are not empty
      else if(pdfSim.imgs.length){
        imgs=pdfSim.imgs;
        total=pdfSim.imgs.length;
      }

      //else load the image which src are generated automatically
      else{
        imgs=[];
        total=pdfSim.total;
      }

      if(pdfSim.onlyOne)
        total=pdfSim.total=1;

      pdfSim.imgs=imgs;



      for(var i=1;i<=total;i++){
          var htht = '<div id="page-'+i+'" class="page">';
          var  ht  = '<a name="page-'+i+'" class="page-hash" id="page-hash-'+i+'"></a>';
               ht += '<div class="wrapper"><div id="viewer'+i+'" class="viewer"></div></div>';

          if(pdfSim.showPage)
            ht+='<span class="page-no" id="page-no-'+i+'">'+i+'</span>';

          htht+=ht+'</div>';
          par.innerHTML+=htht;
      }
});

$(document).ready(function(){

      function getSrc(num){
        var src  = pdfSim.path+pdfSim.prefix
            src += (pdfSim.imgs.length)?pdfSim.imgs[num-1]:num.toString();
            src += pdfSim.suffix+pdfSim.ext;

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
            //added 200 by skys215
            if (location+200 > (page_location-5)){
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






$(document).ready(function(){
   var div=$('<div id="flowBox">').appendTo(flowBox.indexContainer);
   if(!flowBox.noneTitle){
      var titleBox=$('<div>').addClass('flowBox_title').html(flowBox.title);
      div=div.append(titleBox);
   }

   var ul=$('<ul>').appendTo(div);
   
   $.each(flowBox.list,function(index,item){
      var li = $('<li class="flowBox_item">').appendTo(ul);

      var a=$('<a href="#'+item+'">').text(index).appendTo(li);
      if(flowBox.callback){
          a.click(function(){
            $(flowBox.imgElement+'>img').attr('src',item);
            return false;
          });
      };
   });

});