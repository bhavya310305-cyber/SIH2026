require('dotenv').config();
const pool = require("../connection");


// get emergencyReports and for a user

const handleGetUser = async (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM "users" WHERE user_id = $1;';
  try {
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Record Not Found.",
      });
    }

    return res.status(200).json({
      message: "Record Fetched Successfully.",
      data: result.rows[0], // object is returned
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error from the server.",
    });
  }
};

// getProject for a user capable of getting the from 
// GET /api/projects?status=ONGOING
// GET /api/projects?mp=Kangana Ranaut
// GET /api/projects?state=Karnataka
// GET /api/projects?status=NOT_STARTED&state=Jharkhand
// GET /api/projects?district=NONEXISTENT

// Whitelist: query param -> actual DB column
const FILTERABLE_FIELDS = {
  mp: "mp",
  constituency: "constituency",
  da: "da",
  ida: "ida",
  state: "state",
  district: "district",
  block: "block",
  village: "village",
  status: "current_status",
};

// const getProjects = async (req, res) => {
//   try {
//     const { page = "1", limit = "20", ...filters } = req.query;

//     const whereClauses = [];
//     const values = [];
//     let paramIndex = 1;

//     for (const [key, column] of Object.entries(FILTERABLE_FIELDS)) {
//       const value = filters[key];
//       if (value !== undefined && value !== "") {
//         whereClauses.push(`${column} = $${paramIndex}`);
//         values.push(value);
//         paramIndex++;
//       }
//     }

//     const whereSQL = whereClauses.length
//       ? `WHERE ${whereClauses.join(" AND ")}`
//       : "";

//     // Pagination
//     const limitNum = Math.min(parseInt(limit, 10) || 20, 100);
//     const pageNum = Math.max(parseInt(page, 10) || 1, 1);
//     const offset = (pageNum - 1) * limitNum;

//     const dataQuery = `
//       SELECT *
//       FROM projects
//       ${whereSQL}
//       ORDER BY project_id
//       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
//     `;
//     const countQuery = `SELECT COUNT(*) FROM projects ${whereSQL}`;

//     const dataValues = [...values, limitNum, offset];

//     const [dataResult, countResult] = await Promise.all([
//       pool.query(dataQuery, dataValues),
//       pool.query(countQuery, values),
//     ]);

//     const total = parseInt(countResult.rows[0].count, 10);

//     res.status(200).json({
//       success: true,
//       data: dataResult.rows,
//       pagination: {
//         page: pageNum,
//         limit: limitNum,
//         total,
//         totalPages: Math.ceil(total / limitNum),
//       },
//     });
//   } catch (err) {
//     console.error("getProjects error:", err);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

const getProjects = async (req, res) => {
  try {
    const { page = "1", limit = "20", ...filters } = req.query;

    const whereClauses = [];
    const values = [];
    let paramIndex = 1;

    // --------------------------------
    // Logged-in MP restriction
    // --------------------------------
    whereClauses.push(`
      EXISTS (
        SELECT 1
        FROM users u
        WHERE u.user_id = $${paramIndex}
          AND u.role = 'MP'
          AND LOWER(TRIM(u.name)) = LOWER(TRIM(projects.mp))
      )
    `);

    values.push(req.user.id);
    paramIndex++;

    // --------------------------------
    // Existing filters
    // --------------------------------
    for (const [key, column] of Object.entries(FILTERABLE_FIELDS)) {
      const value = filters[key];

      if (value !== undefined && value !== "") {
        whereClauses.push(`${column} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    }

    const whereSQL = `WHERE ${whereClauses.join(" AND ")}`;

    // --------------------------------
    // Pagination
    // --------------------------------
    const limitNum = Math.min(parseInt(limit, 10) || 20, 100);
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const offset = (pageNum - 1) * limitNum;

    const dataQuery = `
      SELECT *
      FROM projects
      ${whereSQL}
      ORDER BY project_id
      LIMIT $${paramIndex}
      OFFSET $${paramIndex + 1}
    `;

    const countQuery = `
      SELECT COUNT(*)
      FROM projects
      ${whereSQL}
    `;

    const dataValues = [...values, limitNum, offset];

    const [dataResult, countResult] = await Promise.all([
      pool.query(dataQuery, dataValues),
      pool.query(countQuery, values),
    ]);

    const total = parseInt(countResult.rows[0].count, 10);

    return res.status(200).json({
      success: true,
      data: dataResult.rows,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    console.error("getProjects error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET PROGRESS UPDATES FOR A PROJECT
const getProgressUpdates = async (req, res) => {
    try {
        const { project_id } = req.params;

        if (!project_id) {
            return res.status(400).json({
                message: "Project ID is required."
            });
        }

        // Check whether project exists
        const projectQuery = `
            SELECT project_id
            FROM projects
            WHERE project_id = $1;
        `;

        const projectResult = await pool.query(projectQuery, [
            project_id
        ]);

        if (projectResult.rows.length === 0) {
            return res.status(404).json({
                message: "Project not found."
            });
        }

        // Get all progress updates for the project
        const query = `
            SELECT
                update_id,
                project_id,
                updated_by,
                progress_percentage,
                expenditure,
                amount_paid,
                status,
                description,
                update_date,
                location,
                photograph
            FROM project_updates
            WHERE project_id = $1
            ORDER BY update_date DESC;
        `;

        const result = await pool.query(query, [
            project_id
        ]);

        return res.status(200).json({
            message: "Progress updates fetched successfully.",
            project_id: project_id,
            count: result.rows.length,
            data: result.rows
        });

    } catch (err) {
        console.error("Get Progress Updates Error:", err);

        return res.status(500).json({
            message: "Error occurred while fetching progress updates."
        });
    }
};


// GET EMERGENCY REPORTS FOR A PROJECT
const getEmergencyReports = async (req, res) => {
    try {
        const { project_id } = req.params;

        if (!project_id) {
            return res.status(400).json({
                message: "Project ID is required."
            });
        }

        // Check whether project exists
        const projectQuery = `
            SELECT project_id
            FROM projects
            WHERE project_id = $1;
        `;

        const projectResult = await pool.query(projectQuery, [
            project_id
        ]);

        if (projectResult.rows.length === 0) {
            return res.status(404).json({
                message: "Project not found."
            });
        }

        // Get all emergency reports for the project
        const query = `
            SELECT
                emergency_id,
                project_id,
                reported_by,
                emergency_type,
                description,
                date,
                location,
                impact,
                supporting_document
            FROM emergency_reports
            WHERE project_id = $1
            ORDER BY date DESC;
        `;

        const result = await pool.query(query, [
            project_id
        ]);

        return res.status(200).json({
            message: "Emergency reports fetched successfully.",
            project_id: project_id,
            count: result.rows.length,
            data: result.rows
        });

    } catch (err) {
        console.error("Get Emergency Reports Error:", err);

        return res.status(500).json({
            message: "Error occurred while fetching emergency reports."
        });
    }
};


// POST PROJECT UPDATE
const postProjectUpdate = async (req, res) => {
    try {
        
        const {
            project_id,
            progress_percentage,
            expenditure,
            amount_paid,
            status,
            description,
            location,
            photograph
        } = req.body;

        // Project ID is required
        if (!project_id) {
            return res.status(400).json({
                message: "Project ID is required."
            });
        }

        // Check whether project exists
        const projectQuery = `
            SELECT project_id
            FROM projects
            WHERE project_id = $1;
        `;

        const projectResult = await pool.query(projectQuery, [
            project_id
        ]);

        if (projectResult.rows.length === 0) {
            return res.status(404).json({
                message: "Project not found."
            });
        }

        // Insert project update
        const insertQuery = `
            INSERT INTO project_updates (
                project_id,
                updated_by,
                progress_percentage,
                expenditure,
                amount_paid,
                status,
                description,
                location,
                photograph
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9
            )
            RETURNING *;
        `;

        const result = await pool.query(insertQuery, [
            project_id,
            req.user.user_id,
            progress_percentage ?? null,
            expenditure ?? null,
            amount_paid ?? null,
            status ?? null,
            description ?? null,
            location ?? null,
            photograph ?? null
        ]);

        return res.status(201).json({
            message: "Project update submitted successfully.",
            update: result.rows[0]
        });

    } catch (err) {
        console.error("Post Project Update Error:", err);

        return res.status(500).json({
            message: "Error occurred while submitting project update."
        });
    }
};

// POST EMERGENCY REPORT
const postEmergencyReport = async (req, res) => {
    try {

        const {
            project_id,
            emergency_type,
            description,
            date,
            location,
            impact,
            supporting_document
        } = req.body;

        // Project ID is required
        if (!project_id) {
            return res.status(400).json({
                message: "Project ID is required."
            });
        }

        // Check whether project exists
        const projectQuery = `
            SELECT project_id
            FROM projects
            WHERE project_id = $1;
        `;

        const projectResult = await pool.query(projectQuery, [
            project_id
        ]);

        if (projectResult.rows.length === 0) {
            return res.status(404).json({
                message: "Project not found."
            });
        }

        // Insert emergency report
        const insertQuery = `
            INSERT INTO emergency_reports (
                project_id,
                reported_by,
                emergency_type,
                description,
                date,
                location,
                impact,
                supporting_document
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8
            )
            RETURNING *;
        `;

        const result = await pool.query(insertQuery, [
            project_id,
            req.user.user_id,
            emergency_type ?? null,
            description ?? null,
            date ?? null,
            location ?? null,
            impact ?? null,
            supporting_document ?? null
        ]);

        return res.status(201).json({
            message: "Emergency report submitted successfully.",
            emergency: result.rows[0]
        });

    } catch (err) {
        console.error("Post Emergency Error:", err);

        return res.status(500).json({
            message: "Error occurred while submitting emergency report."
        });
    }
};

// const getTotalProjects = async (req, res) => {
//     try {
//         const query = `
//             SELECT COUNT(*) AS total_projects
//             FROM projects;
//         `;

//         const result = await pool.query(query);

//         return res.status(200).json({
//             message: "Total projects fetched successfully.",
//             data: result.rows[0]
//         });

//     } catch (err) {
//         console.error("Get Total Projects Error:", err);

//         return res.status(500).json({
//             message: "Error occurred while fetching total projects."
//         });
//     }
// };

// const getActiveProjects = async (req, res) => {
//     try {
//         const query = `
//             SELECT COUNT(*) AS active_projects
//             FROM projects
//             WHERE current_status = 'ONGOING';
//         `;

//         const result = await pool.query(query);

//         return res.status(200).json({
//             message: "Active projects fetched successfully.",
//             data: result.rows[0]
//         });

//     } catch (err) {
//         console.error("Get Active Projects Error:", err);

//         return res.status(500).json({
//             message: "Error occurred while fetching active projects."
//         });
//     }
// };


// const getCompletedProjects = async (req, res) => {
//     try {
//         const query = `
//             SELECT COUNT(*) AS completed_projects
//             FROM projects
//             WHERE current_status = 'COMPLETED';
//         `;

//         const result = await pool.query(query);

//         return res.status(200).json({
//             message: "Completed projects fetched successfully.",
//             data: result.rows[0]
//         });

//     } catch (err) {
//         console.error("Get Completed Projects Error:", err);

//         return res.status(500).json({
//             message: "Error occurred while fetching completed projects."
//         });
//     }
// };



// const getNotStartedProjects = async (req, res) => {
//     try {
//         const query = `
//             SELECT COUNT(*) AS not_started_projects
//             FROM projects
//             WHERE current_status = 'NOT_STARTED';
//         `;

//         const result = await pool.query(query);

//         return res.status(200).json({
//             message: "Not started projects fetched successfully.",
//             data: result.rows[0]
//         });

//     } catch (err) {
//         console.error("Get Not Started Projects Error:", err);

//         return res.status(500).json({
//             message: "Error occurred while fetching not started projects."
//         });
//     }
// };



// const getOnHoldProjects = async (req, res) => {
//     try {
//         const query = `
//             SELECT COUNT(*) AS on_hold_projects
//             FROM projects
//             WHERE current_status = 'ON_HOLD';
//         `;

//         const result = await pool.query(query);

//         return res.status(200).json({
//             message: "On hold projects fetched successfully.",
//             data: result.rows[0]
//         });

//     } catch (err) {
//         console.error("Get On Hold Projects Error:", err);

//         return res.status(500).json({
//             message: "Error occurred while fetching on hold projects."
//         });
//     }
// };



// const getCompletionPercentage = async (req, res) => {
//     try {
//         const query = `
//             SELECT
//                 COUNT(*) FILTER (
//                     WHERE current_status = 'COMPLETED'
//                 ) * 100.0
//                 / NULLIF(COUNT(*), 0) AS completion_percentage
//             FROM projects;
//         `;

//         const result = await pool.query(query);

//         return res.status(200).json({
//             message: "Completion percentage fetched successfully.",
//             data: result.rows[0]
//         });

//     } catch (err) {
//         console.error("Get Completion Percentage Error:", err);

//         return res.status(500).json({
//             message: "Error occurred while fetching completion percentage."
//         });
//     }
// };


// const getTotalEstimatedCost = async (req, res) => {
//     try {
//         const query = `
//             SELECT COALESCE(
//                 SUM(estimated_cost),
//                 0
//             ) AS total_estimated_cost
//             FROM projects;
//         `;

//         const result = await pool.query(query);

//         return res.status(200).json({
//             message: "Total estimated cost fetched successfully.",
//             data: result.rows[0]
//         });

//     } catch (err) {
//         console.error("Get Total Estimated Cost Error:", err);

//         return res.status(500).json({
//             message: "Error occurred while fetching total estimated cost."
//         });
//     }
// };

// const getTotalSanctionedAmount = async (req, res) => {
//     try {
//         const query = `
//             SELECT COALESCE(
//                 SUM(sanctioned_amount),
//                 0
//             ) AS total_sanctioned_amount
//             FROM projects;
//         `;

//         const result = await pool.query(query);

//         return res.status(200).json({
//             message: "Total sanctioned amount fetched successfully.",
//             data: result.rows[0]
//         });

//     } catch (err) {
//         console.error("Get Total Sanctioned Amount Error:", err);

//         return res.status(500).json({
//             message: "Error occurred while fetching total sanctioned amount."
//         });
//     }
// };


// const getHighRiskProjectsByDistrict = async (req, res) => {
//     try {
//         const query = `
//             SELECT
//                 district,
//                 COUNT(*) AS high_risk_projects
//             FROM projects
//             WHERE risk_level = 'High'
//             GROUP BY district
//             ORDER BY high_risk_projects DESC;
//         `;

//         const result = await pool.query(query);

//         return res.status(200).json({
//             message: "High-risk projects by district fetched successfully.",
//             data: result.rows
//         });

//     } catch (err) {
//         console.error(
//             "Get High Risk Projects By District Error:",
//             err
//         );

//         return res.status(500).json({
//             message: "Error occurred while fetching high-risk projects."
//         });
//     }
// };


// const getDistrictStatistics = async (req, res) => {
//     try {
//         const query = `
//             SELECT
//                 district,

//                 COUNT(*) AS total_projects,

//                 COUNT(*) FILTER (
//                     WHERE current_status = 'COMPLETED'
//                 ) AS completed_projects,

//                 ROUND(
//                     COUNT(*) FILTER (
//                         WHERE current_status = 'COMPLETED'
//                     ) * 100.0
//                     / NULLIF(COUNT(*), 0),
//                     2
//                 ) AS completion_percentage

//             FROM projects
//             GROUP BY district
//             ORDER BY district;
//         `;

//         const result = await pool.query(query);

//         return res.status(200).json({
//             message: "District statistics fetched successfully.",
//             data: result.rows
//         });

//     } catch (err) {
//         console.error("Get District Statistics Error:", err);

//         return res.status(500).json({
//             message: "Error occurred while fetching district statistics."
//         });
//     }
// };


// GET MONITORING DASHBOARD METRICS
// GET /getMonitoringMetrics

// const getMonitoringMetrics = async (req, res) => {
//     try {

//         // ----------------------------------------------------
//         // 1. TOTAL PROJECTS
//         // ----------------------------------------------------

//         const totalProjectsQuery = `
//             SELECT COUNT(*) AS total_projects
//             FROM projects;
//         `;


//         // ----------------------------------------------------
//         // 2. ACTIVE PROJECTS
//         // ----------------------------------------------------

//         const activeProjectsQuery = `
//             SELECT COUNT(*) AS active_projects
//             FROM projects
//             WHERE current_status = 'ONGOING';
//         `;


//         // ----------------------------------------------------
//         // 3. COMPLETED PROJECTS
//         // ----------------------------------------------------

//         const completedProjectsQuery = `
//             SELECT COUNT(*) AS completed_projects
//             FROM projects
//             WHERE current_status = 'COMPLETED';
//         `;


//         // ----------------------------------------------------
//         // 4. NOT STARTED PROJECTS
//         // ----------------------------------------------------

//         const notStartedProjectsQuery = `
//             SELECT COUNT(*) AS not_started_projects
//             FROM projects
//             WHERE current_status = 'NOT_STARTED';
//         `;


//         // ----------------------------------------------------
//         // 5. ON HOLD PROJECTS
//         // ----------------------------------------------------

//         const onHoldProjectsQuery = `
//             SELECT COUNT(*) AS on_hold_projects
//             FROM projects
//             WHERE current_status = 'ON_HOLD';
//         `;


//         // ----------------------------------------------------
//         // 6. COMPLETION PERCENTAGE
//         // ----------------------------------------------------

//         const completionPercentageQuery = `
//             SELECT
//                 ROUND(
//                     COUNT(*) FILTER (
//                         WHERE current_status = 'COMPLETED'
//                     ) * 100.0
//                     / NULLIF(COUNT(*), 0),
//                     2
//                 ) AS completion_percentage
//             FROM projects;
//         `;


//         // ----------------------------------------------------
//         // 7. TOTAL ESTIMATED COST
//         // ----------------------------------------------------

//         const totalEstimatedCostQuery = `
//             SELECT
//                 COALESCE(SUM(estimated_cost), 0)
//                 AS total_estimated_cost
//             FROM projects;
//         `;


//         // ----------------------------------------------------
//         // 8. TOTAL SANCTIONED AMOUNT
//         // ----------------------------------------------------

//         const totalSanctionedAmountQuery = `
//             SELECT
//                 COALESCE(SUM(sanctioned_amount), 0)
//                 AS total_sanctioned_amount
//             FROM projects;
//         `;


//         // ----------------------------------------------------
//         // 9. TOTAL HIGH-RISK PROJECTS
//         // ----------------------------------------------------

//         const highRiskProjectsQuery = `
//             SELECT COUNT(*) AS high_risk_projects
//             FROM projects
//             WHERE risk_level = 'High';
//         `;


//         // ----------------------------------------------------
//         // 10. HIGH-RISK PROJECTS BY DISTRICT
//         // ----------------------------------------------------

//         const highRiskByDistrictQuery = `
//             SELECT
//                 district,
//                 COUNT(*) AS high_risk_projects
//             FROM projects
//             WHERE risk_level = 'High'
//             GROUP BY district
//             ORDER BY high_risk_projects DESC;
//         `;


//         // ----------------------------------------------------
//         // 11. DISTRICT STATISTICS
//         // ----------------------------------------------------

//         const districtStatisticsQuery = `
//             SELECT
//                 district,

//                 COUNT(*) AS total_projects,

//                 COUNT(*) FILTER (
//                     WHERE current_status = 'COMPLETED'
//                 ) AS completed_projects,

//                 ROUND(
//                     COUNT(*) FILTER (
//                         WHERE current_status = 'COMPLETED'
//                     ) * 100.0
//                     / NULLIF(COUNT(*), 0),
//                     2
//                 ) AS completion_percentage

//             FROM projects

//             GROUP BY district

//             ORDER BY district;
//         `;


//         // ----------------------------------------------------
//         // EXECUTE ALL QUERIES IN PARALLEL
//         // ----------------------------------------------------

//         const [
//             totalProjectsResult,
//             activeProjectsResult,
//             completedProjectsResult,
//             notStartedProjectsResult,
//             onHoldProjectsResult,
//             completionPercentageResult,
//             totalEstimatedCostResult,
//             totalSanctionedAmountResult,
//             highRiskProjectsResult,
//             highRiskByDistrictResult,
//             districtStatisticsResult
//         ] = await Promise.all([

//             pool.query(totalProjectsQuery),

//             pool.query(activeProjectsQuery),

//             pool.query(completedProjectsQuery),

//             pool.query(notStartedProjectsQuery),

//             pool.query(onHoldProjectsQuery),

//             pool.query(completionPercentageQuery),

//             pool.query(totalEstimatedCostQuery),

//             pool.query(totalSanctionedAmountQuery),

//             pool.query(highRiskProjectsQuery),

//             pool.query(highRiskByDistrictQuery),

//             pool.query(districtStatisticsQuery)

//         ]);


//         // ----------------------------------------------------
//         // CONVERT POSTGRESQL STRING NUMBERS TO JS NUMBERS
//         // ----------------------------------------------------

//         const metrics = {

//             total_projects:
//                 Number(totalProjectsResult.rows[0].total_projects),

//             active_projects:
//                 Number(activeProjectsResult.rows[0].active_projects),

//             completed_projects:
//                 Number(completedProjectsResult.rows[0].completed_projects),

//             not_started_projects:
//                 Number(notStartedProjectsResult.rows[0].not_started_projects),

//             on_hold_projects:
//                 Number(onHoldProjectsResult.rows[0].on_hold_projects),

//             completion_percentage:
//                 Number(
//                     completionPercentageResult
//                         .rows[0]
//                         .completion_percentage || 0
//                 ),

//             total_estimated_cost:
//                 Number(
//                     totalEstimatedCostResult
//                         .rows[0]
//                         .total_estimated_cost || 0
//                 ),

//             total_sanctioned_amount:
//                 Number(
//                     totalSanctionedAmountResult
//                         .rows[0]
//                         .total_sanctioned_amount || 0
//                 ),

//             high_risk_projects:
//                 Number(
//                     highRiskProjectsResult
//                         .rows[0]
//                         .high_risk_projects
//                 ),

//             high_risk_by_district:
//                 highRiskByDistrictResult.rows.map(row => ({
//                     district: row.district,
//                     high_risk_projects:
//                         Number(row.high_risk_projects)
//                 })),

//             district_statistics:
//                 districtStatisticsResult.rows.map(row => ({
//                     district: row.district,

//                     total_projects:
//                         Number(row.total_projects),

//                     completed_projects:
//                         Number(row.completed_projects),

//                     completion_percentage:
//                         Number(row.completion_percentage || 0)
//                 }))
//         };


//         // ----------------------------------------------------
//         // RESPONSE
//         // ----------------------------------------------------

//         return res.status(200).json({
//             success: true,
//             message: "Monitoring dashboard metrics fetched successfully.",
//             data: metrics
//         });


//     } catch (err) {

//         console.error(
//             "Get Monitoring Metrics Error:",
//             err
//         );

//         return res.status(500).json({
//             success: false,
//             message:
//                 "Error occurred while fetching monitoring dashboard metrics."
//         });
//     }
// };
const getMonitoringMetrics = async (req, res) => {
  try {
    const mpId = req.user.id;

    // ---------------------------------------
    // OVERALL CONSTITUENCY METRICS
    // ---------------------------------------
    const overallQuery = `
      SELECT
        COUNT(*) AS total_projects,

        COUNT(*) FILTER (
          WHERE p.current_status = 'ONGOING'
        ) AS active_projects,

        COUNT(*) FILTER (
          WHERE p.current_status = 'COMPLETED'
        ) AS completed_projects,

        COUNT(*) FILTER (
          WHERE p.current_status = 'NOT_STARTED'
        ) AS not_started_projects,

        COUNT(*) FILTER (
          WHERE p.current_status = 'ON_HOLD'
        ) AS on_hold_projects,

        ROUND(
          COUNT(*) FILTER (
            WHERE p.current_status = 'COMPLETED'
          ) * 100.0
          / NULLIF(COUNT(*), 0),
          2
        ) AS completion_percentage,

        COALESCE(
          SUM(p.estimated_cost),
          0
        ) AS total_estimated_cost,

        COALESCE(
          SUM(p.sanctioned_amount),
          0
        ) AS total_sanctioned_amount

      FROM projects p

      INNER JOIN users u
        ON LOWER(TRIM(p.mp)) = LOWER(TRIM(u.name))

      WHERE u.user_id = $1
        AND u.role = 'MP';
    `;


    // ---------------------------------------
    // DISTRICT STATISTICS
    // ---------------------------------------
    const districtQuery = `
      SELECT
        p.district,

        COUNT(*) AS total_projects,

        COUNT(*) FILTER (
          WHERE p.current_status = 'COMPLETED'
        ) AS completed_projects,

        COUNT(DISTINCT p.village) AS villages,

        ROUND(
          COUNT(*) FILTER (
            WHERE p.current_status = 'COMPLETED'
          ) * 100.0
          / NULLIF(COUNT(*), 0),
          2
        ) AS completion_percentage

      FROM projects p

      INNER JOIN users u
        ON LOWER(TRIM(p.mp)) = LOWER(TRIM(u.name))

      WHERE u.user_id = $1
        AND u.role = 'MP'

      GROUP BY p.district

      ORDER BY p.district;
    `;


    // ---------------------------------------
    // HIGH-RISK PROJECTS BY DISTRICT
    // ---------------------------------------
    const highRiskQuery = `
      SELECT
        p.district,
        COUNT(*) AS high_risk_projects

      FROM projects p

      INNER JOIN users u
        ON LOWER(TRIM(p.mp)) = LOWER(TRIM(u.name))

      WHERE u.user_id = $1
        AND u.role = 'MP'
        AND p.risk_level = 'High'

      GROUP BY p.district

      ORDER BY high_risk_projects DESC;
    `;


    const [
      overallResult,
      districtResult,
      highRiskResult
    ] = await Promise.all([
      pool.query(overallQuery, [mpId]),
      pool.query(districtQuery, [mpId]),
      pool.query(highRiskQuery, [mpId])
    ]);


    const overall = overallResult.rows[0];


    // ---------------------------------------
    // RESPONSE OBJECT
    // ---------------------------------------
    const metrics = {

      total_projects:
        Number(overall.total_projects),

      active_projects:
        Number(overall.active_projects),

      completed_projects:
        Number(overall.completed_projects),

      not_started_projects:
        Number(overall.not_started_projects),

      on_hold_projects:
        Number(overall.on_hold_projects),

      completion_percentage:
        Number(overall.completion_percentage || 0),

      total_estimated_cost:
        Number(overall.total_estimated_cost || 0),

      total_sanctioned_amount:
        Number(overall.total_sanctioned_amount || 0),

      high_risk_projects:
        highRiskResult.rows.reduce(
          (sum, row) =>
            sum + Number(row.high_risk_projects),
          0
        ),

      high_risk_by_district:
        highRiskResult.rows.map((row) => ({
          district: row.district,
          high_risk_projects:
            Number(row.high_risk_projects)
        })),

      district_statistics:
        districtResult.rows.map((row) => ({
          district: row.district,

          total_projects:
            Number(row.total_projects),

          completed_projects:
            Number(row.completed_projects),

          villages:
            Number(row.villages),

          completion_percentage:
            Number(row.completion_percentage || 0)
        }))
    };


    return res.status(200).json({
      success: true,
      message: "MP monitoring metrics fetched successfully.",
      data: metrics
    });

  } catch (err) {

    console.error(
      "Get Monitoring Metrics Error:",
      err
    );

    return res.status(500).json({
      success: false,
      message:
        "Error occurred while fetching monitoring metrics."
    });
  }
};


module.exports = {
    handleGetUser,
    getProjects,
    getProgressUpdates,
    getEmergencyReports,
    postProjectUpdate,
    postEmergencyReport,


    getMonitoringMetrics

    // getTotalProjects,
    // getActiveProjects,
    // getCompletedProjects,
    // getNotStartedProjects,
    // getOnHoldProjects,
    // getCompletionPercentage,
    // getTotalEstimatedCost,
    // getTotalSanctionedAmount,
    // getHighRiskProjectsByDistrict,
    // getDistrictStatistics
};