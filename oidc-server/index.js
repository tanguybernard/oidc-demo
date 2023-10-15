import express from 'express';
import Provider from 'oidc-provider';
import path from 'path';

import { fileURLToPath } from 'url';
import fs from "fs"

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import https from 'https';

let options = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem'),
};



const app = express();




//Middlewares
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

import cors from 'cors'
app.use(cors()) // this uses default values


const clients =  [{
  client_id: "oidcCLIENT",
  client_secret: "Some_super_secret",
  grant_types: ["authorization_code"],//CodeFlow: authorization_code, //Implicit: implicit
  redirect_uris: ["https://client24.local.com:4200/home"],
  response_types: ["code"],//CodeFlow: code  // Implicit: id_token
  //token_endpoint_auth_method: 'none',


  //other configurations if needed

  //http://localhost:3000/oidc/.well-known/openid-configuration


}];


const configuration = {

  features: {
    introspection: { enabled: true },
    revocation: { enabled: true },
  },
  formats: {
    AccessToken: 'jwt',
  },
  claims: {
    openid: ['sub'],
  },
  clients,
  pkce: {
    required: () => false,
  },
};

const oidc = new Provider('https://localhost:3000', configuration);

app.use("/",oidc.callback());



// your express configuration here

let httpsServer = https.createServer(options, app);

httpsServer.listen(3000);
