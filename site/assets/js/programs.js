/* Programs page: chips and #hash select one program panel at a time; the photo arrows (and left/right keys) cycle that program's photos. */
(function(){
  var arts=[].slice.call(document.querySelectorAll('.prog-article'));
  if(!arts.length) return;
  var chips=[].slice.call(document.querySelectorAll('.prog-chip'));
  function idx(){var h=location.hash.slice(1);for(var i=0;i<arts.length;i++)if(arts[i].id===h)return i;return 0;}
  function show(i,scroll){
    arts.forEach(function(a,j){a.hidden=j!==i;});
    chips.forEach(function(c,j){c.classList.toggle('on',j===i);c.setAttribute('aria-current',j===i?'true':'false');});
    if(scroll){var sp=document.querySelector('.prog-strip'),p=sp&&sp.closest('section');if(p)p.scrollIntoView({behavior:'smooth'});}
  }
  window.addEventListener('hashchange',function(){show(idx(),true);});
  function go(stage,n){
    var list=stage.dataset.imgs.split(',');n=(n+list.length)%list.length;
    stage.dataset.n=n;stage.style.backgroundImage="url('"+list[n]+"')";
    [].forEach.call(stage.parentNode.querySelectorAll('.prog-bars i'),function(e,k){e.classList.toggle('on',k===n);});
  }
  function step(stage,d){go(stage,+stage.dataset.n+d);}
  document.addEventListener('click',function(e){
    var b=e.target.closest('.prog-chev'),seg=e.target.closest('.prog-bars i');
    if(b){step(b.parentNode.querySelector('.prog-stage'),b.classList.contains('prog-next')?1:-1);}
    else if(seg){go(seg.parentNode.parentNode.querySelector('.prog-stage'),+seg.dataset.k);}
  });
  document.addEventListener('keydown',function(e){
    if(e.target.closest&&e.target.closest('input,textarea,select'))return;
    var vis=arts.filter(function(a){return !a.hidden;})[0];if(!vis)return;
    var st=vis.querySelector('.prog-stage');if(!st)return;
    if(e.key==='ArrowRight')step(st,1);
    if(e.key==='ArrowLeft')step(st,-1);
  });
  show(idx(),false);
})();
