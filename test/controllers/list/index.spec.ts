import { NextFunction, Request, Response } from 'express';
import IndexController from '../../../src/controllers/vibrations/list';
import { APIResponse } from '../../../src/controllers/vibrations/index.d';

import * as db from '../../../src/db';

// @ts-ignore
import { mockGet } from 'firestore-jest-mock/mocks/firestore';

describe('Test IndexController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      send: jest.fn(),
    };
  });

  it('should return vibrations from Firestore', async () => {
    await IndexController(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockGet).toBeCalledTimes(1);
    expect(mockResponse.send).toBeCalledTimes(1);

    /**
     * Get vibrations sent to response.
     */
    // @ts-ignore
    const receivedVibrations = mockResponse.send.mock.calls[0][0] as APIResponse[];

    expect(receivedVibrations).toHaveLength(2);

    receivedVibrations.forEach(vibration => {
      expect(vibration).toHaveProperty('id');
      expect(vibration).toHaveProperty('name');
      expect(vibration).toHaveProperty('category');
      expect(vibration).toHaveProperty('data');
    });
  });

  describe('when raises an exception', () => {
    it('calls next function with exception', async () => {
      jest.spyOn(db.vibrations, 'get').mockRejectedValue(new Error('Fail'));

      await IndexController(mockRequest as Request, mockResponse as Response, (err: any) => {
        expect(err).toBeDefined();
        expect(err).toBeInstanceOf(Error);
      });
    });
  });
});
