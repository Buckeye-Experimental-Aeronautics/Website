/* Per-program Roadmap timeline (GitHub-style month header + date bars,
   colored by status, no per-status folding — just one continuous list).
   One widget per program page (program.html), each marked with
   class="wt-app" and a data-program attribute matching a Projects (v2)
   board's own title (e.g. "Vehicle 01"). Fetches /assets/data/work.json
   (produced by the private-repo sync job — see work-sync/README.md) and
   filters its items to the matching program.

   Expected JSON shape:
     {"items":[{"title":"...","status":"Backlog|Ready|In Progress|On Hold|In Review|Done",
                "program":"Vehicle 01","start":"2026-09-01","end":"2026-09-20"}, ...]}
   Items missing either "start" or "end" are left out of the timeline
   entirely (rather than guessing a placeholder position) — a task with no
   real dates has nothing meaningful to plot.

   If the fetch fails, or a given program has no items yet, that widget falls
   back to a small labeled example dataset and keeps its "Example data" tag
   visible rather than showing fake data as if it were real. */
(function(){
  var apps=document.querySelectorAll('.wt-app');
  if(!apps.length)return;
  var DAY=86400000, today=new Date();today.setHours(0,0,0,0);
  function d(off){return new Date(today.getTime()+off*DAY);}
  var MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function key(s){return String(s).toLowerCase().replace(/ /g,'');}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}

  var FALLBACK=[
    {title:'Airframe CAD baseline',status:'Done',start:d(-24),end:d(-10)},
    {title:'Static thrust test',status:'In Review',start:d(-12),end:d(2)},
    {title:'CFD setup template',status:'In Progress',start:d(-10),end:d(12)},
    {title:'Fuel system layout',status:'On Hold',start:d(-6),end:d(20)},
    {title:'Interface control sheet',status:'Ready',start:d(2),end:d(28)},
    {title:'Flight test logistics',status:'Backlog',start:d(30),end:d(60)}
  ];

  function roadmap(items){
    var dated=items.filter(function(i){return i.start&&i.end;});
    if(!dated.length){
      return '<div class="rm-empty">No tasks have start/target dates set yet.</div>';
    }
    var first=new Date(today.getFullYear(),today.getMonth()-1,1);        // start one month back
    var last=new Date(first.getFullYear(),first.getMonth()+5,1);         // 5 months shown
    var span=last-first, pct=function(x){return Math.max(0,Math.min(100,(x-first)/span*100));};
    var months='';
    for(var m=0;m<5;m++){var a=new Date(first.getFullYear(),first.getMonth()+m,1),b=new Date(first.getFullYear(),first.getMonth()+m+1,1);
      months+='<div class="rm-m" style="left:'+pct(a)+'%;width:'+(pct(b)-pct(a))+'%">'+MON[a.getMonth()]+' '+a.getFullYear()+'</div>';}

    function row(i){
      var l=pct(i.start), w=Math.max(1.2,pct(i.end)-l);
      return '<div class="rm-row"><div class="rm-name" title="'+esc(i.title)+'">'+esc(i.title)+'</div><div class="rm-track"><div class="rm-bar st-'+key(i.status)+'" style="left:'+l+'%;width:'+w+'%" title="'+i.status+'"></div></div></div>';
    }
    function byStart(a,b){return a.start-b.start;}

    var active=dated.filter(function(i){return i.status!=='Done';}).sort(byStart);
    var done=dated.filter(function(i){return i.status==='Done';}).sort(byStart);

    var doneSection=done.length?(
      '<details class="rm-group"><summary><span class="rm-group-label">Done <span class="rm-group-count">'+done.length+'</span></span>'+
      '<svg class="rm-chevron" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></summary>'+
      done.map(row).join('')+'</details>'
    ):'';

    return '<div class="rm-scroll"><div class="rm">'+
      '<div class="rm-headrow"><div class="rm-side">Task</div><div class="rm-months">'+months+'</div></div>'+
      active.map(row).join('')+
      doneSection+
      '<div class="rm-overlay"><div class="rm-today" style="left:'+pct(today)+'%"><em>Today</em></div></div>'+
      '</div></div>';
  }

  function renderInto(root,items){ root.querySelector('.wt-view').innerHTML=roadmap(items); }

  function showFallback(){
    apps.forEach(function(root){
      renderInto(root,FALLBACK);
      root.setAttribute('data-example','true');
    });
  }

  fetch('/assets/data/work.json',{cache:'no-store'}).then(function(r){
    if(!r.ok)throw new Error('no feed');
    return r.json();
  }).then(function(data){
    var raw=data.items||[];
    apps.forEach(function(root){
      var program=root.dataset.program;
      var items=raw.filter(function(i){return i.program===program;}).map(function(i){
        return {
          title:i.title,
          status:i.status,
          start:i.start?new Date(i.start):null,
          end:i.end?new Date(i.end):null
        };
      });
      if(!items.length){
        renderInto(root,FALLBACK);
        root.setAttribute('data-example','true');
        return;
      }
      renderInto(root,items);
      root.removeAttribute('data-example');
    });
  }).catch(showFallback);
})();
