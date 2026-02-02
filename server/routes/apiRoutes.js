const express = require("express");
const userRoutes = require("./userRoutes.js");
const homeRoutes = require("./homeRoutes.js");
const crmRoutes = require("./crmRoutes.js");
const salesRoutes = require("./salesRoutes.js");
const servicesRoutes = require("./servicesRoutes.js");
const stockRoutes = require("./stockRoutes.js");
const accountingRoutes = require("./accountingRoutes.js");
const privateRoutes = require("./privateRoutes.js");

const router = express.Router();

router.use("/user", userRoutes);
router.use("/home", homeRoutes);
router.use("/crm", crmRoutes);
router.use("/sales", salesRoutes);
router.use("/services", servicesRoutes);
router.use("/stock", stockRoutes);
router.use("/accounting", accountingRoutes);
router.use("/private-route", privateRoutes);

module.exports = router;
