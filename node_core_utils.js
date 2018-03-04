//
//  Created by Mingliang Chen on 17/8/23.
//  illuspas[a]gmail.com
//  Copyright (c) 2017 Nodemedia. All rights reserved.
//
const Crypto 		= require('crypto');
const EventEmitter 	= require('events');
const Mysql         = require('promise-mysql');
const fetch         = require('node-fetch');



function generateNewSessionID(sessions) {
    let SessionID = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWKYZ0123456789';
    const numPossible = possible.length;
    do {
        for (var i = 0; i < 8; i++) {
            SessionID += possible.charAt((Math.random() * numPossible) | 0);
        }
    } while (sessions.has(SessionID))
    return SessionID;
}

async function test(signStr, streamId, secretKey) {

    let githubResponse = await fetch(`https://api.github.com/users/`+signStr);
    let githubUser = await githubResponse.json();

    if(githubUser.login){
        return "success";
    }else{
        return "error";
    }


}


function verifyAuth(signStr, streamId, secretKey) {

    return new Promise(function (resolve,reject) {

        test(signStr, streamId, secretKey).then(function (result) {
            resolve(result);
        },function(error){
            reject(error);
        })
    });
}



module.exports.generateNewSessionID = generateNewSessionID;
module.exports.verifyAuth = verifyAuth;
module.exports.nodeEvent = new EventEmitter();