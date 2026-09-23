const test = require('node:test');
const assert = require('node:assert/strict');
const {EventEmitter} = require('node:events');
const {createApp} = require('../server');
const weather = name => ({cod:200,name,main:{temp:20,humidity:40},wind:{speed:2},weather:[{id:800,main:'Clear',description:'ясно'}]});
let receivedLang;
function get(url, callback) {
 const req = new EventEmitter(); req.destroy = () => {};
 const city=url.searchParams.get('q'); receivedLang=url.searchParams.get('lang');
 if(city==='timeout')return req;
 setImmediate(()=>{
  if(city==='network'){req.emit('error',new Error('network'));return;}
  const res=new EventEmitter();res.statusCode=({missing:404,limit:429,auth:401})[city]||200;
  callback(res);res.emit('data',city==='invalid'?'broken':JSON.stringify(weather(city)));res.emit('end');
 });return req;
}

test('weather proxy and public file boundaries', async () => {
 const server=createApp({apiKey:'test',get,timeoutMs:60}).listen(0,'127.0.0.1');
 await new Promise(resolve=>server.once('listening',resolve));
 const base=`http://127.0.0.1:${server.address().port}`;
 try {
  for(const [url,status] of [['/',200],['/main/scripts/scripts.js',200],['/server.js',404],['/.env',404],['/package.json',404],['/node_modules/express/package.json',404],['/api/weather?q=missing',404],['/api/weather?q=limit',429],['/api/weather?q=auth',502],['/api/weather?q=invalid',502],['/api/weather?q=network',502],['/api/weather?q=timeout',504],['/api/weather?q=',400],['/api/weather?q[]=x',400],['/api/weather?q=Tokyo&lang=jp',200]]){
   assert.equal((await fetch(base+url,{signal:AbortSignal.timeout(3000)})).status,status,url);
  }
  assert.equal(receivedLang,'ja');

 } finally { server.closeAllConnections(); await new Promise(resolve=>server.close(resolve)); }
});
