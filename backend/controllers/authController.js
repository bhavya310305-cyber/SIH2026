const pool = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleSignUp = async (req, res) => {
  try {
    const body = req.body;

    console.log("Request Body:", body);

    // Validate required fields
    if (!body.name || !body.email || !body.password || !body.role) {
      return res.status(400).json({
        message: "Name, email, password and role are required.",
      });
    }

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(
      body.password,
      saltRounds
    );

    const query = `
      INSERT INTO users (
        name,
        email,
        hash_password,
        role,
        agency_name,
        agency_type,
        parliamentry_constituency,
        designation,
        district,
        state
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;

    const result = await pool.query(query, [
      body.name,
      body.email,
      hashedPassword,
      body.role,
      body.agency_name || null,
      body.agency_type || null,
      body.parliamentry_constituency || null,
      body.designation || null,
      body.district || null,
      body.state || null,
    ]);

    return res.status(201).json({
      message: "User Registered",
      user: result.rows[0],
    });

  } catch (err) {
    console.error(err);

    // PostgreSQL unique violation
    if (err.code === "23505") {
      return res.status(409).json({
        message: "Email already registered.",
      });
    }

    // PostgreSQL CHECK constraint violation
    if (err.code === "23514") {
      return res.status(400).json({
        message: "Invalid user role.",
      });
    }

    return res.status(500).json({
      message: "Error occurred in the server.",
    });
  }
};


const handleLogin = async (req, res) => {
  try {
    const body = req.body;

    console.log("Request Body:", body);

    // Validate input
    if (!body.email || !body.password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    // Find user
    const query = 'SELECT * FROM "users" WHERE email = $1';
    const result = await pool.query(query, [body.email]);

    const user = result.rows[0];

    // User doesn't exist
    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials.",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(
      body.password,
      user.hash_password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials.",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Successful login
    return res.status(200).json({
      token,
      message: "Log In Success.",

      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
        parliamentry_constituency: user.parliamentry_constituency,
        state: user.state,
      },
    });

  } catch (err) {
    console.error("Login Error:", err);

    return res.status(500).json({
      message: "Error from the server.",
    });
  }
};


module.exports = {
  handleSignUp,
  handleLogin,
};


