import sequilize from 'sequelize';

const conn = new sequilize( {
  database: "chat_limiter_db",
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "KSInzayn&123",
})

export default conn;