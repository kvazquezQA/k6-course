import http from 'k6/http';
import { sleep } from 'k6';
//https://grafana.com/docs/k6/latest/using-k6/test-lifecycle/
export const options = {
    vus: 1,
    duration: '5s'
}

console.log(' -- init stage --');

export default function (data) {
    console.log('-- VU stage --');
    // console.log(data);
    sleep(1);
}

export function setup() {
    console.log('-- setup stage --');
    sleep(10);
    const data = { foo: 'bar' };
    return data;
}



export function teardown(data) {
    console.log('-- Teardown stage --');
}