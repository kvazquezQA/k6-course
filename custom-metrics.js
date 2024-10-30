import http from 'k6/http';
import { check, sleep } from 'k6';
import exec from 'k6/execution';
import {Counter, Trend } from 'k6/metrics';
// https://grafana.com/docs/k6/latest/using-k6/metrics/reference/

export const options = {
    vus: 10,
    duration: '10s',
    thresholds:{
        http_req_duration: ['p(95)<120'],
        http_req_duration: ['max<200'],
        http_req_failed : ['rate<0.01'],
        http_reqs: ['count>20'],
        http_reqs: ['rate>4'],
        checks: ['rate>=0.98'],
        my_counter :['count>10'],
        response_time_news_page : ['p(95)<120']
    }
}

let myCounter = new Counter('my_counter');
let newsPageResponseTrend = new Trend('response_time_news_page');



export default function(){
   let res = http.get('https://test.k6.io/' + (exec.scenario.iterationInTest === 1 ? 'foo': ''));
   myCounter.add(1);
 //  console.log(exec.scenario.iterationInTest);
   //console.log(res.status);
  // console.log(res.body);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'page is startpage': (r) => r.body.includes('Collection of simple web-pages suitable for load testing.')
    });
    sleep(2);


    res = http.get('https://test.k6.io/news.php');
    newsPageResponseTrend.add(res.timings.duration);
    /*
  check(res, {
    'page is startpage': (r) => r.body.includes('Collection of simple web-pages suitable for load testing.')
    });
    */
}