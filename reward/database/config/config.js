module.exports = {
  development: {
    dialect: 'sqlite',
    storage: 'db.sqlite'
  },
  test: {
    dialect: 'sqlite',
    storage: 'test-db.sqlite'
  },
  production: {
    dialect: 'postgres',
    username: "postgres",
    password: "postgres",
    database: "postgres",
    host: "reward-postgres",
  }
}
