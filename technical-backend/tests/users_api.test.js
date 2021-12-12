const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('when database first populates', () => {
  test('notes returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('database starts with 1000 users', async () => {
    const response = await api.get('/api/users');
    expect(response.body).toHaveLength(1000);
  });

  test('specific user within starting users', async () => {
    const response = await api.get('/api/users');
    const allNames = response.body.map((x) => x.first_name);

    expect(allNames).toContain('Keen');
  });
});

describe('adding users to db', () => {
  test('adding user succesful with valid data', async () => {
    const newUser = {
      first_name: 'Brendan',
      last_name: 'Horton',
      email: 'myemail',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/users');
    expect(response.body).toHaveLength(1001);

    const names = response.body.map((x) => x.first_name);
    expect(names).toContain('Brendan');
  });

  test('adding user fails with missing data', async () => {
    const newUser = {
      first_name: 'Brendan',
      last_name: 'Horton',
    };

    await api.post('/api/users').send(newUser).expect(400);

    const response = await api.get('/api/users');
    expect(response.body).toHaveLength(1001);
  });
});

describe('viewing users by id', () => {
  test('get user by id succesfully', async () => {
    const response = await api.get('/api/users');
    const firstUserID = response.body[0].id;

    await api
      .get(`/api/users/${firstUserID}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('get by id fails if invalid', async () => {
    await api.get('/api/users/3151661').expect(404);
  });
});

describe('deleting users', () => {
  test('delete user by correct id returns 200', async () => {
    const response = await api.get('/api/users');
    const firstID = response.body[0].id;

    await api.delete(`/api/users/${firstID}`).expect(200);
  });

  test('delete user fails with invalid id returns 400', async () => {
    await api.delete('/api/users/123145151').expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
