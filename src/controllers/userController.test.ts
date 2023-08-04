import Database from '../config/database';
import userController from './userController';
describe('User endpoints', () => {
  const db = new Database();
  beforeAll(async () => {
    await db.sequelize?.sync();
  });
  afterAll(async () => {
    await db.sequelize?.truncate();
  });
  it('should create a new user', async () => {
    const res = await userController.create({
      name: 'Test',
      email: 'test@gmail.com',
      password: '12344',
    });
    expect(res.status).toEqual(201);
  });

  it('should not create duplicate user record', async () => {
    const res = await userController.create({
      name: 'Test',
      email: 'test@gmail.com',
      password: '12344',
    });
    expect(res.status).toEqual(400);
  });

  it('should get user records', async () => {
    const res = await userController.findAll();
    expect(res.status).toEqual(200);
    expect(res.response).toHaveLength(2);
  });

  it('should get not user when wrong id is applied', async () => {
    const res = await userController.findById('1');
    expect(res.status).toEqual(404);
  });
});
