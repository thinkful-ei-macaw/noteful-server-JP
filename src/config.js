module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV,
  DB_URL: process.env.DB_URL || "postgresql://postgres@localhost/noteful",
  TEST_DB_URL:
    process.env.TEST_DB_URL || "postgresql://postgres@localhost/noteful-test",
};
