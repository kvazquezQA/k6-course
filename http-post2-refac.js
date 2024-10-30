import http from 'k6/http';
import { check } from 'k6';

export default function () {

    const credentials= {
        username: 'test_' + Date.now(),
        password: 'test' + Date.now()
    }

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    http.post('https://test-api.k6.io/user/register/',
                JSON.stringify({
                     username: credentials.username,
                     password: credentials.password
                } ),
                params);

    let res = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(credentials ),
        params
    );

    const accessToken = res.json().access;
    console.log(accessToken);


    http.get(
        'https://test-api.k6.io/my/crocodiles/',{
            headers: {
                'Authorization': 'Bearer ' + accessToken 
            }
        }

    )

    res = http.post(
        'https://test-api.k6.io/my/crocodiles/',
         JSON.stringify({
            name: 'randowm c',
            sex: 'M',
            date_of_birth: '2024-01-01'
       }),
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken ,
                     'Content-Type': 'application/json'
            }
        }
    )
    let newCrocodileId= res.json().id
    res = http.get(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken ,
                     'Content-Type': 'application/json'
            }
        }

    )
    check(res, {'status is 200' : (r) => r.status ===200,
        'crocodrile name is the same' : (r) => res.json().id ===newCrocodileId})
}