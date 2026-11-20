(function(){
  var dir=document.getElementById('dir'); if(!dir) return;
  var cards=[].slice.call(dir.querySelectorAll('.tc'));
  var q=document.getElementById('dq'), s=document.getElementById('ds');
  var chips=[].slice.call(document.querySelectorAll('.chips button'));
  var count=document.getElementById('dc'), empty=document.getElementById('de');
  var cat='all';
  function price(c){var p=c.getAttribute('data-p');return p===''?null:parseFloat(p)}
  function name(c){return c.querySelector('h3').textContent.toLowerCase()}
  function run(){
    var term=(q.value||'').trim().toLowerCase(), n=0;
    cards.forEach(function(c){
      var ok=(cat==='all'||c.getAttribute('data-cat')===cat)&&(!term||c.textContent.toLowerCase().indexOf(term)>-1);
      c.hidden=!ok; if(ok) n++;
    });
    var mode=s.value;
    cards.slice().sort(function(a,b){
      if(mode==='az') return name(a)<name(b)?-1:1;
      var pa=price(a), pb=price(b);
      if(pa===null&&pb===null) return name(a)<name(b)?-1:1;
      if(pa===null) return 1; if(pb===null) return -1;
      return mode==='lo'?pa-pb:pb-pa;
    }).forEach(function(c){dir.appendChild(c)});
    count.textContent=n===cards.length?'Showing all '+n+' tools':'Showing '+n+' of '+cards.length+' tools';
    empty.hidden=n>0;
  }
  function pick(c){
    cat=c; chips.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-c')===c?'true':'false')}); run();
  }
  chips.forEach(function(b){b.addEventListener('click',function(){pick(b.getAttribute('data-c'))})});
  [].forEach.call(document.querySelectorAll('[data-pick]'),function(a){a.addEventListener('click',function(){pick(a.getAttribute('data-pick'))})});
  q.addEventListener('input',run); s.addEventListener('change',run);
  document.getElementById('dr').addEventListener('click',function(){q.value='';pick('all')});
  run();
})();
