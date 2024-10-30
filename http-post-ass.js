import http from 'k6/http';
import { check } from 'k6';

export default function () {

    let userName= 'test_' + Date.now()
    let body = JSON.stringify(
        {
            username: 'test_' + Date.now(),
            password: 'test'
        }
);

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    http.post('https://test-api.k6.io/user/register/', body, params);

  let  res= http.post('https://test-api.k6.io/auth/token/login/', body, params);
  let resBody= res.json();
  console.log(resBody.access)
}