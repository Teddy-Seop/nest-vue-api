module.exports = {
    application: {
      port: 3000,
      cors: true,
      rateLimitPerSecond: 100,
    },
    database: {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '1111',
      database: 'study',
      migrationsTableName: '_migrations',
      migrations: ['./dist/migrations/*.js'],
      synchronize: false,
      logging: ['query', 'error'],
      extra: {
        connectionLimit: 30,
      },
      cli: {
        migrationsDir: 'migrations',
      },
    },
    logger: {
      level: 'verbose',
      transports: ['console', 'http'],
      httpTransportOptions: {
        host: 'localhost',
        port: 10000,
      },
    },
  };