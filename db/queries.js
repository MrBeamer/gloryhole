import pool from "./pool.js";

// export const getAllMessages = () => {
//   pool.queries();
// };

export const getUserById = async (id) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];
    return user;
  } catch (error) {
    throw new Error(`Query getUserById failed: ${error.message}`, {
      cause: error,
    });
  }
};

export const getUserByUsername = async (username) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );
    const user = rows[0];
    return user;
  } catch (error) {
    throw new Error(`Query getUserByUsername failed: ${error.message}`, {
      cause: error,
    });
  }
};

export const addUserToDB = async (
  firstname,
  lastname,
  username,
  email,
  hashedPassword,
  avatar,
) => {
  try {
    await pool.query(
      `
       INSERT INTO users (firstname, lastname, username, email, password, avatar) VALUES ($1, $2, $3, $4, $5, $6); 
        `,
      [firstname, lastname, username, email, hashedPassword, avatar],
    );
  } catch (error) {
    throw new Error(`Query addUserToDB failed: ${error.message}`, {
      cause: error,
    });
  }
};

export const updateUserMembership = async (userId) => {
  try {
    await pool.query(
      `
       UPDATE users SET is_club_member=$1 WHERE id=$2;
        `,
      [true, userId],
    );
  } catch (error) {
    throw new Error(`Update user membership failed: ${error.message}`, {
      cause: error,
    });
  }
};

export const addMessageToDb = async (title, secretMessage, userId) => {
  try {
    await pool.query(
      `INSERT INTO messages (title, text, user_id, created_at)
VALUES ($1, $2, $3, NOW()) RETURNING id, title, text, user_id, created_at`,
      [title, secretMessage, userId],
    );
  } catch (error) {
    throw new Error(`Add message failed: ${error.message}`, {
      cause: error,
    });
  }
};
