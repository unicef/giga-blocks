// import { execSync } from 'child_process';

// // Set the DATABASE_URL env var for the test server and also runs the migrations
// beforeAll(async () => {
//   execSync(
//     `DATABASE_URL=postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME} npx prisma migrate deploy --preview-feature`,
//     { stdio: 'inherit' },
//   );
// });

// // Reset the test database after all tests
// afterAll(async () => {
//   execSync('npx prisma migrate reset --force --skip-seed --preview-feature', {
//     stdio: 'inherit',
//   });
// });
