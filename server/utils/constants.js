module.exports = {
  PORT: 3001,
  MONGO_DB_URI: "mongodb://localhost:27017/task-management",
  MONGO_DB_NAME: "task-management",
  MONGO_USERNAME: "",
  MONGO_PASSWORD: "",

  JWT_SECRET: "T@5K_m@N@63M3n1_@Pp",
  JWT_DEFAULT_EXPIRY: "5m",
  JWT_LOGIN_TOKEN_EXPIRY: "5d",

  BCRYPT_SALT_ROUNDS: 10,

  AUTH_TOKEN_REQUIRED: "Authentication token required",
  INVALID_AUTH_TOKEN: "Invalid authentication token",
  AUTH_TOKEN_EXPIRED: "Authentication token expired",

  USER_PASSWORD_MIN_LENGTH: 8,
  USER_ID_REQUIRED: "User id is required",
  USER_EMAIL_DUPLICATE: "User with specified email already exists",
  USER_CREATED_SUCCESSFULLY: "User created successfully!",
  INVALID_USER_CREDENTIALS: "Invalid email or password",
  VALID_USER_CREDENTIALS: "Sign Success!",
  WRONG_PASSWORD: "Wrong password",
  PASSWORD_UPDATED: "Password updated successfully!",

  CATEGORY_CREATED: "Category created!",
  CATEGORY_UPDATED: "Category updated!",
  INVALID_CATEGORY_ID: "Invalid category id",
  CATEGORY_DELETED: "Category deleted",
  INVALID_PRIORITY: "Invalid priority value",

  TASK_DELETED: "Task deleted!",
  TASK_CREATED: "Task created successfully",
  INVALID_TASK_ID: "Invalid task id",
  TASK_COMPLETED: "Task marked as completed",
  TASK_UPDATED: "Task updated successfully",

  INVALID_PAYLOAD: "Invalid Payload.",
  INTERNAL_SERVER_ERROR: "Internal server error. Please try again later.",

  COLOR_HEX_CODE_PATTERN: /^#[0-9A-Fa-f]{6}$|^#[0-9A-Fa-f]{3}$/,
};
