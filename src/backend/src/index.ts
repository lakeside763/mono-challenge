import { server, port, app, router } from "./server";

app.use('/api', router);
server.listen(port, () => console.log(`Listen on server http://localhost:${port}`));