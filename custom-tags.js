import http from 'k6/http';
import { check, sleep } from 'k6';
import exec from 'k6/execution';
import {Counter, Trend } from 'k6/metrics';
// https://grafana.com/docs/k6/latest/using-k6/metrics/reference/
//https://designer.mocky.io/design
export const options = {
    vus: 1,
    duration: '10s',
    thresholds:{
        http_req_duration: ['p(95)<200'],
       'http_req_duration{page:order}': ['p(95)<250'],
        http_errors:['count===0'],
        'http_errors{page:order}':['count===0'],
        'checks{page:order}':['rate>=0.99']


}}

let httpErrros= new Counter('http_errors');


export default function(){
  let res = http.get('https://run.mocky.io/v3/ca6548f5-471d-47a2-b6cf-7d552b2a1e8e')
  if (res.error){
    httpErrros.add(1);
  }
    check(res, {
      'is status code 200': (r) => r.status === 200
    });

  res = http.get(
    'https://run.mocky.io/v3/09fe2efb-097b-402a-abac-b46bbcc39bab?mocky-delay=100ms',
    {
      tags: {
        page: 'order'
      }
    }
  );
  if (res.error){
    httpErrros.add(1, {page: 'order'});
  }
    check(res,
       {'is status code 201': (r) => r.status === 201 },
       {page: 'order'});
}