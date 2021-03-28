import { Request, Response } from 'express';
import DeleteController from '../../../src/controllers/vibrations/delete';

import * as db from '../../../src/db';

import mockedVibrations from '../../mock_files/firestore_vibrations.json';

const mockedVibration = mockedVibrations[0];

describe('Test DeleteController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {
      params: { vibrationId: mockedVibration.id, },
    };
    mockResponse = {
      sendStatus: jest.fn(),
      locals: {},
    };
  });

  it('should delete vibration from Firestore', async () => {
    const expectedVibration = db.vibration(mockedVibration.id);
    mockResponse.locals = {
      vibration: expectedVibration,
    };

    await DeleteController(mockRequest as Request, mockResponse as Response, () => {
      expect(expectedVibration.delete).toBeCalledTimes(1);
      expect(db.vibration(mockedVibration.id)).toBeFalsy();
    });
  });

  it('should respond with 204 HTTP code', async () => {
    const expectedVibration = db.vibration(mockedVibration.id);
    mockResponse.locals = {
      vibration: expectedVibration,
    };

    await DeleteController(mockRequest as Request, mockResponse as Response, () => {
      expect(mockResponse.sendStatus).toBeCalledTimes(1);
      expect(mockResponse.sendStatus).toBeCalledWith(204);
    });
  });

  describe('when raises an exception', () => {
    it('calls next function with exception', async () => {
      await DeleteController(mockRequest as Request, mockResponse as Response, (err: any) => {
        expect(err).toBeDefined();
        expect(err).toBeInstanceOf(Error);
      });
    });
  });
});
