import { NextFunction, Request, Response } from 'express';
import DeleteController from '../../../src/controllers/vibrations/delete';

import mockedVibrations from '../../mock_files/firestore_vibrations.json';

// @ts-ignore
import { mockDoc, mockDelete } from 'firestore-jest-mock/mocks/firestore';

const mockedVibration = mockedVibrations[0];

describe('Test DeleteController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      params: { vibrationId: mockedVibration.id, },
    };
    mockResponse = {
      sendStatus: jest.fn(),
    };
  });

  it('should delete vibration from Firestore', async () => {
    await DeleteController(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockDoc).toBeCalledTimes(1);
    expect(mockDoc).toBeCalledWith(mockedVibration.id);
    expect(mockDelete).toBeCalledTimes(1);
  });

  it('should respond with 204 HTTP code', async () => {
    await DeleteController(mockRequest as Request, mockResponse as Response, nextFunction)

    expect(mockResponse.sendStatus).toBeCalledTimes(1);
    expect(mockResponse.sendStatus).toBeCalledWith(204);
  });

  describe('when raises an exception', () => {
    it('calls next function with exception', async () => {
      mockRequest = {};

      await DeleteController(mockRequest as Request, mockResponse as Response, (err: any) => {
        expect(err).toBeDefined();
        expect(err).toBeInstanceOf(Error);
      });
    });
  });
});
