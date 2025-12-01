import http from 'k6/http';
import { expect } from "https://jslib.k6.io/k6-testing/0.5.0/index.js";
import { sleep, check, group } from 'k6';
import { randomEmail, BASE_PASSWORD } from './helpers.js';

export const options = {
  vus: 10,
  //interation: 1,
  duration: '20s',
  thresholds: {
    http_req_duration: ['p(90)<=100', 'p(95)<=140'], 
    http_req_failed:['rate<0.01']
  }
};

const email = randomEmail('test');
const password = BASE_PASSWORD;

export default function() {
  let responseUser = '';
  
  group('Registro do Usuario na Biblioteca', function() {
    responseUser = http.post('http://localhost:3000/users/register', 
      JSON.stringify(
        { name: email, 
          password: password 
        }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  })
  

  group('Login do Usuario na Biblioteca', function() {
    responseUser = http.post('http://localhost:3000/users/login', 
      JSON.stringify(
        { name: email,
          password: password 
        }),
      {
        headers: { 'Content-Type': 'application/json' } }
    )
  })

  group('Cadastrando um novo livro (JWT obrigatorio)', function() {
    let responseLibrary = http.post('http://localhost:3000/library/addLibrary',
      JSON.stringify({
      title:"Como adestrar seu dragão", 
        year:"2023",
      }),
      {
        headers: { 'Authorization': `Bearer ${responseUser.json('token')}`, 'Content-Type': 'application/json' }
      })
      console.log('Resposta do registro: ' + responseLibrary.body);
  check(responseLibrary, { 
    "status deve ser igual a 201": (r) => r.status === 201
  });

  expect.soft(responseLibrary.status).toBe(201);
  })
  sleep(1);
}