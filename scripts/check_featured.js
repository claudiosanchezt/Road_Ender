const http = require('http');
http.get('http://api:4000/api/home/featured-places?limit=5', (res)=>{
  let d='';
  res.on('data', c=> d+=c);
  res.on('end', ()=>{
    console.log('STATUS:'+res.statusCode);
    try{ const j = JSON.parse(d); console.log(JSON.stringify(j.data?.places?.slice(0,5), null, 2)); }catch(e){ console.log(d.slice(0,2000)); }
  });
}).on('error', e=> console.error('ERR', e.message));
