/* Scroll-progress arrow in the sticky top bar: the arrowhead's x-position
   tracks how far down the page you are. */
(function(){
  var svg=document.getElementById('progress-bar');
  if(!svg) return;
  var body=svg.querySelector('#pb-body'), head=svg.querySelector('#pb-head');
  var TIP0=120; // arrow tip position at scroll 0; it travels to the right edge at page bottom
  var top=document.querySelector('.site-top');
  function draw(){
    if(top) top.classList.toggle('is-condensed',window.scrollY>160);
    var W=svg.clientWidth||window.innerWidth;
    var max=document.documentElement.scrollHeight-window.innerHeight;
    var p=max>0?Math.min(1,Math.max(0,window.scrollY/max)):0;
    var tip=TIP0+p*(W-TIP0-2);
    if(window.BEXA_ARROW!=='classic'){
      /* dart head traced from the X in the logo; blade ends inside the notch so they connect */
      body.setAttribute('points','0,12 '+(tip-24)+',9.5 '+(tip-24)+',15.5 0,13');
      head.setAttribute('points',tip+',12.5 '+(tip-36)+',1.5 '+(tip-27.5)+',12.5 '+(tip-32.5)+',19.3');
    }else{
      body.setAttribute('points','0,12 '+(tip-28)+',8 '+(tip-28)+',17 0,13');
      head.setAttribute('points',(tip-32)+',3 '+tip+',12.5 '+(tip-32)+',22');
    }
    svg.querySelector('#pb-track').setAttribute('width',W);
  }
  window.addEventListener('scroll',draw,{passive:true});
  window.addEventListener('resize',draw);
  window.addEventListener('load',draw);
  draw();
})();
