import { NextFunction, Request, Response } from 'express';
import DetailsController from '../../../src/controllers/vibrations/details';

import vibration from '../../mock_files/firestore_vibration.json';

describe('Test DetailsController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  it('should respond with expected format', () => {
    mockRequest = {
      params: {
        vibrationId: 'Rxm6NbpolKAF4QY8lHwq',
      },
    };

    mockResponse = {
      send: jest.fn(),
      locals: {
        vibration,
      },
    };

    DetailsController(mockRequest as Request, mockResponse as Response, nextFunction);

    const { id, name, category, data } = vibration
    expect(mockResponse.send).toBeCalledTimes(1);

    expect(mockResponse.send).toHaveBeenCalledWith({ id, name, category, data });
  });
});
