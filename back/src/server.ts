import { app } from "./app";
// import { startDeadlineChecker } from "./cron/checkDeadlines";

const PORT = process.env.PORT || 5000;

// startDeadlineChecker();

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
