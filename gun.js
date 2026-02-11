import Gun from 'gun/gun'
import SEA from 'gun/sea'

import 'gun/axe'
import 'gun/lib/webrtc'
import 'gun/lib/radix'
import 'gun/lib/radisk'
import 'gun/lib/rindexed'

const peers = [
  // 'http://localhost:8765/gun', // Optional: Keep for local dev if running local relay
  'https://e-vote-zk13.onrender.com/gun' // YOUR DEPLOYED RELAY URL
];


const gun = Gun({
  peers,
  localStorage: true
})

const user = gun.user().recall({ sessionStorage: true })

export {
  gun,
  SEA,
  user
}
