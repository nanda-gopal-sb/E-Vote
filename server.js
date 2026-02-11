import express from 'express';
import Gun from 'gun';
const app = express();
const port = process.env.PORT || 8765;

app.use(Gun.serve);

const server = app.listen(port, () => {
    console.log("Relay server listening on port " + port);
});

Gun({ web: server });
