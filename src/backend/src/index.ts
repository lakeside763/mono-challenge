import { server, port, app, router, logger, shutdown } from "./server";

app.use('/api', router);

server.listen(port, () => logger.info(`Listen on server http://localhost:${port}`));

process.on('SIGINT', async () => {
  await shutdown(server);
});

process.on('SIGTERM', async () => {
  await shutdown(server);
});
