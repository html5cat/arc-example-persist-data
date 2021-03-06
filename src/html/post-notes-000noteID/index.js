// src/html/post-notes-000noteID/index.js
let arc = require('@architect/functions')
let data = require('@architect/data')
let auth = require('@architect/shared/middleware/auth')

async function route(req, res) {
  try {
    let note = req.body
    note.accountID = req.session.account.accountID
    note.updated = new Date(Date.now()).toISOString()
    // save the note
    let result = await data.notes.put(note)
    // log it to stdout
    console.log(result)
  }
  catch(e) {
    console.log(e)
  }
  res({
    location: req._url('/')
  })
}

exports.handler = arc.html.post(auth, route)
