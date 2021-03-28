import { NextFunction, Request, Response } from 'express';
import retrieveVibration from '../../src/middlewares/retrieveVibration';
import vibration from '../mock_files/firestore_vibration.json';
import { APIResponse } from '../../src/controllers/vibrations';

describe('Test retrieveVibration middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      sendStatus: jest.fn(),
      locals: {},
    };
  });

  describe('when vibration exists in DB', () => {
    it('set vibration data to response locals', async () => {
      mockRequest = {
        params: {
          vibrationId: 'Rxm6NbpolKAF4QY8lHwq',
        },
      };

      const result = await new Promise(async (resolve, rejects) => {
        await retrieveVibration(mockRequest as Request, mockResponse as Response, (err: any) => {
          // @ts-ignore
          if (!err) resolve(mockResponse.locals.vibration);
          else rejects(err)
        });
      }) as APIResponse;


      expect(result).toHaveProperty('name');
      expect(result.name).toEqual(vibration.name);

      expect(result).toHaveProperty('category');
      expect(result.category).toEqual(vibration.category);

      expect(result).toHaveProperty('data');
      expect(result.data).toEqual(vibration.data);
    });
  });

  describe('when vibration does not exists in DB', () => {
    it('responds with status 404', async () => {
      mockRequest = {
        params: {
          vibrationId: 'FAKE_ID',
        },
      };

      await retrieveVibration(mockRequest as Request, mockResponse as Response, nextFunction)

      expect(mockResponse.sendStatus).toBeCalledWith(404);
    });
  });

  describe('when raises an exception', () => {
    it('calls next function with exception', async () => {
      await retrieveVibration(mockRequest as Request, mockResponse as Response, (err: any) => {
        expect(err).toBeDefined();
        expect(err).toBeInstanceOf(Error);
      });
    });
  });
});

