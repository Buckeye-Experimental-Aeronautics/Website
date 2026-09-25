/* "Tasks completed per day" activity grid. Fetches /assets/data/work.json
   (same feed as the Roadmap timelines — see work-sync/README.md) for its
   "completions.bySource" object: one {"YYYY-MM-DD": count} map per
   contributing repo, written independently by each repo's own copy of
   sync-heatmap.mjs. This script sums all of them together per day, so every
   repo's closed tasks count here — a task doesn't need to be tagged to a
   vehicle program to count toward this grid, unlike the per-program Roadmap
   timelines on program.html. If the feed is missing, has no completions
   yet, or the fetch fails, falls back to a seeded pseudo-random example grid
   and keeps the "Example data" tag visible rather than showing fake data as
   if it were real. */
(function(){
  var g=document.getElementById('hm');if(!g)return;
  var wrap=g.closest('.wrap');
  var totalEl=document.getElementById('hm-total');
  function showTotal(n){if(totalEl)totalEl.textContent=' · '+n+(n==1?' task':' tasks')+' completed';}
  var DAYS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var today=new Date();today.setHours(0,0,0,0);
  var start=new Date(today);start.setDate(start.getDate()-today.getDay()-52*7);        /* Sunday, 52 weeks back */

  function iso(dt){return dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0')+'-'+String(dt.getDate()).padStart(2,'0');}
  function level(c){return c<=0?0:c<2?1:c<4?2:c<7?3:4;}

  function renderReal(counts){
    var h='',total=0;
    for(var w=0;w<53;w++){h+='<div class="hm-w">';for(var d=0;d<7;d++){
      var dt=new Date(start);dt.setDate(start.getDate()+w*7+d);
      if(dt>today){h+='<i class="hm-x"></i>';continue;}
      var c=counts[iso(dt)]||0,lv=level(c);total+=c;
      h+='<i class="l'+lv+'" data-c="'+c+'" data-d="'+DAYS[dt.getDay()]+', '+MON[dt.getMonth()]+' '+dt.getDate()+', '+dt.getFullYear()+'"></i>';}
      h+='</div>';}
    g.innerHTML=h;
    showTotal(total);
  }

  function renderExample(){
    var seed=7;function r(){seed=(seed*1664525+1013904223)%4294967296;return seed/4294967296;}
    var COUNT=[[0,0],[1,2],[3,4],[5,6],[7,9]];                                           /* tasks completed per level (example data) */
    var h='',total=0;
    for(var w=0;w<53;w++){h+='<div class="hm-w">';for(var d=0;d<7;d++){
      var dt=new Date(start);dt.setDate(start.getDate()+w*7+d);
      if(dt>today){h+='<i class="hm-x"></i>';continue;}
      var v=r(),lv=v<.42?0:v<.66?1:v<.83?2:v<.94?3:4;if(d==0||d==6)lv=Math.max(0,lv-1);
      var c=COUNT[lv][0]+(COUNT[lv][1]>COUNT[lv][0]&&r()>.5?1:0);total+=c;
      h+='<i class="l'+lv+'" data-c="'+c+'" data-d="'+DAYS[dt.getDay()]+', '+MON[dt.getMonth()]+' '+dt.getDate()+', '+dt.getFullYear()+'"></i>';}
      h+='</div>';}
    g.innerHTML=h;
    showTotal(total);
  }

  function wireTooltip(){
    var tip=document.createElement('div');tip.className='hm-tip';tip.setAttribute('role','tooltip');document.body.appendChild(tip);
    function move(e){var t=e.target.closest('#hm i[data-c]');if(!t){tip.style.opacity=0;return;}
      var c=+t.dataset.c;tip.innerHTML=(c?'<b>'+c+(c==1?' task':' tasks')+' completed</b>':'<b>No tasks completed</b>')+' on '+t.dataset.d;
      var b=t.getBoundingClientRect();tip.style.opacity=1;
      var x=b.left+b.width/2-tip.offsetWidth/2;x=Math.max(8,Math.min(innerWidth-tip.offsetWidth-8,x));
      tip.style.left=x+'px';tip.style.top=(b.top-tip.offsetHeight-8)+'px';}
    g.addEventListener('mouseover',move);g.addEventListener('mouseleave',function(){tip.style.opacity=0;});
  }

  fetch('/assets/data/work.json',{cache:'no-store'}).then(function(r){
    if(!r.ok)throw new Error('no feed');
    return r.json();
  }).then(function(data){
    var bySource=(data.completions&&data.completions.bySource)||{};
    var counts={};
    Object.keys(bySource).forEach(function(source){
      var days=bySource[source]||{};
      Object.keys(days).forEach(function(day){counts[day]=(counts[day]||0)+days[day];});
    });
    if(!Object.keys(counts).length)throw new Error('no completions yet');
    renderReal(counts);
    if(wrap)wrap.removeAttribute('data-example');
  }).catch(function(){
    renderExample();
    if(wrap)wrap.setAttribute('data-example','true');
  });

  wireTooltip();
})();
