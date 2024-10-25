
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "delete any files older than 30 days",
  { minutes: 43200 },
  internal.files.deleteAllFiles
);

export default crons;