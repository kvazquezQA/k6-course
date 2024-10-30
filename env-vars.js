import http from 'k6/http';


export default function(){
   // console.log(__ENV.BASE_URL);

    http.get(`${__ENV.BASE_UR}/public/crocodiles/`)
}


//cambia el comando en el cli para environemnts
// k6 run -e BASE_URL=https://test-api.k6.io env-vars.js

