import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
const app = express();
import cors from "cors";
import { errorHandler } from "./utils/handle-error.js";
import boardRoutes from "./routes/boards.route.js";
import classRoutes from "./routes/class.route.js";
import contentRoutes from "./routes/content.route.js";
import domainRoutes from "./routes/domain.route.js";
import institutetypeRoutes from "./routes/instituteType.route.js";
import methodologyRoutes from "./routes/methodology.route.js";
import skillRoutes from "./routes/skill.route.js";
import subjectRoutes from "./routes/subject.route.js";
import taxonomyRoutes from "./routes/taxonomy.route.js";
import versionRoutes from "./routes/version.route.js";
import courseCatgoryRoutes from "./routes/course-category.route.js";
import academicYearRoutes from "./routes/academic-year.route.js";
import topicRoutes from "./routes/topic.route.js";
import subTopicRoutes from "./routes/subTopic.route.js";
import courseAccessRoutes from "./routes/course-access.route.js";
import courseRoutes from "./routes/course.route.js";
import authRoutes from "./routes/auth.route.js";
import roleRoutes from "./routes/role.route.js";
import adminCourseRoutes from "./routes/adminCourse.route.js";
import adminSubjectRoutes from "./routes/adminSubject.route.js";
import courseOverviewRoutes from "./routes/course-overview.route.js";
import courseContentRoutes from "./routes/course-content.route.js";
import entityRoutes from "./routes/entity.route.js";
import instituteRoutes from "./routes/institute.route.js";
import bundleRoutes from "./routes/bundle.route.js";
import bundlePricingRoutes from "./routes/bundlePricing.route.js";
import branchRoutes from "./routes/branch.route.js";
import branchRoleRoutes from "./routes/branchRole.route.js";
import adminSchoolRoutes from "./routes/adminSchool.route.js";
import capricsUsersRoutes from "./routes/capricsUser.route.js";
import subTopicTabRoutes from "./routes/sub-topic-tab.route.js";
import path from "path";

// school admin
import schoolAdminStaffRoutes from "./routes/SchoolAdmin/staff.routes.js";

import { fileURLToPath } from "url";
import { isAdmin, isUser } from "./middlewares/auth.middleware.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, PATCH, ",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "uploads")));

const dbConnect = () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Database connected successfully");
  });
};

app.get("/", (req, res) => res.send("Home page"));
app.use("/api/auth", authRoutes);
app.use("/api/board", boardRoutes);
app.use("/api/class", classRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/domain", domainRoutes);
app.use("/api/institutetype", institutetypeRoutes);
app.use("/api/methodology", methodologyRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/taxonomy", taxonomyRoutes);
app.use("/api/version", versionRoutes);
app.use("/api/course-category", courseCatgoryRoutes);
app.use("/api/academicyear", academicYearRoutes);
app.use("/api/topic", topicRoutes);
app.use("/api/subtopic", subTopicRoutes);
app.use("/api/courseaccess", courseAccessRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/admin-course", adminCourseRoutes);
app.use("/api/admin-subject", adminSubjectRoutes);
app.use("/api/course-overview", courseOverviewRoutes);
app.use("/api/course-content", courseContentRoutes);
app.use("/api/bundle", bundleRoutes);
app.use("/api/bundlePricing", bundlePricingRoutes);
app.use("/api/entity", isUser, isAdmin, entityRoutes);
app.use("/api/institute", isUser, isAdmin, instituteRoutes);
app.use("/api/branch", isUser, branchRoutes);
app.use("/api/branch-role", isUser, branchRoleRoutes);
app.use("/api/admin-school", isUser, isAdmin, adminSchoolRoutes);
app.use("/api/caprics-users", isUser, isAdmin, capricsUsersRoutes);
app.use("/api/sub-topic-tab", subTopicTabRoutes);
app.use(errorHandler);

// School Admin
app.use("/api/staff", schoolAdminStaffRoutes);

const start = () => {
  dbConnect();
  app.listen(process.env.PORT || 4256, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};
start();