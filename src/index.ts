import App from './app';

const port: number = (process.env.PORT as unknown as number) || 8000;
const app = new App().app;
app.listen(port, () => {
  console.log(`✅ Server started successfully on http://localhost:${port}`);
});