import request from 'supertest';
import app from '../../src/app';

import { APIResponse } from '../../src/controllers/vibrations/index.d';

import vibrations from '../mock_files/firestore_vibrations.json';

const vibration = vibrations[0];

describe('Vibration routes', () => {
  describe('Create', () => {
    const newValues = {
      category: 'new_category',
      name: 'new_name',
      data: {
        duration: 1,
        pattern: [
          { name: 1, value: 2 }
        ],
      },
    };

    describe('when VibrationId is provided', () => {
      it('should edit existing vibration', async () => {
        const result = await request(app).post('/vibrations').send(
          { id: vibration.id, ...newValues }
        );

        expect(result.status).toBe(200);
        expect(result.body).toEqual({ id: vibration.id, ...newValues });
      });
    });

    describe('when VibrationId is not provided', () => {
      it('should create a new vibration', async () => {
        const result = await request(app).post('/vibrations').send(
          { ...newValues }
        );

        expect(result.status).toBe(201);
        expect(result.body).toEqual({ id: 'abc123', ...newValues });
      });
    });

    describe('when mandatory fields are missing', () => {
      it('should return 422 status', () => {
        Object.keys(newValues).forEach(async (key) => {
          const values = { ...newValues };
          // @ts-ignore
          delete (values[key]);

          const result = await request(app).post('/vibrations').send(
            { ...values }
          );

          expect(result.status).toBe(422);
          expect(result.text).toEqual('Invalid format.');
        });
      });
    });
  });

  describe('Index', () => {
    it('should return vibrations list', async () => {
      const result = await request(app).get('/vibrations').send();

      expect(result.status).toBe(200);
      expect(result.body).toHaveLength(2);

      result.body.forEach((vibration: APIResponse) => {
        expect(vibration).toHaveProperty('id');
        expect(vibration).toHaveProperty('name');
        expect(vibration).toHaveProperty('category');
        expect(vibration).toHaveProperty('data');
      });
    });
  });

  describe('Delete', () => {
    it('should return no-content response', async () => {
      const result = await request(app).delete(`/vibrations/${vibration.id}`).send();

      expect(result.status).toBe(204);
    });
  });

  describe('Details', () => {
    describe('when vibration exists', () => {
      it('should return vibration details', async () => {
        const { id, name, category, data } = vibration;

        const result = await request(app).get(`/vibrations/${vibration.id}`).send();

        expect(result.status).toBe(200);
        expect(result.body).toEqual({ id, name, category, data });
      });
    });

    describe('when vibration does not exists', () => {
      it('should return not found response', async () => {
        const result = await request(app).get('/vibrations/FAKE_ID').send();

        expect(result.status).toBe(404);
      });
    });
  });
});
