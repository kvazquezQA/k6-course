import http from 'k6/http';
import { check } from 'k6';

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
  //  console.log(res);  para correr con debug agregar la flag al comando  --http-debug="full" para que salga el body
  //  console.log(res);  para correr con debug agregar la flag al comando  --http-debug   
  const crocodiles= res.json();
   // console.log(crocodiles[0].id); 
   //res = http.get('https://test-api.k6.io/public/crocodiles/'+ crocodileId +'/');   
const crocodileId= crocodiles[0].id
const crocodileName= crocodiles[0].name

    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);
    console.log(res.headers);
    console.log(res.headers.Allow);  
    console.log(res.headers['Content-Type']);  

   //console.log(res.json().name); 
  check(res, {'status is 200' : (r) => r.status ===200,
    'crocodrile name is the same' : (r) => res.json().name ===crocodileName})
}