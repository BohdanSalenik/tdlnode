'use strict'
const { Client } = require('tdlnode')
const configExample = require('./config')

const api_id = '1942394'
const api_hash = '853f20c9036da43d237ab488b82dd219'
const phone_number = '+380731563436' // or token


const up = async () => {
    const client = new Client({ api_id, api_hash, phone_number }, configExample)

    const clb = msg => {console.log('event', msg)}

    client.on('chats', clb)

    client.once('chats', clb)
    
    await client.init()

    await client.fetch({
        '@type': 'getChats',
        'offset_order': '9223372036854775807',
        'offset_chat_id': 0,
        'limit': 100,
    })

    client.off('chats', clb)

    const chats = await client.fetch({
        '@type': 'getChats',
        'offset_order': '9223372036854775807',
        'offset_chat_id': 0,
        'limit': 100,
    })

    console.log(chats)

    client.stop()
}

up()