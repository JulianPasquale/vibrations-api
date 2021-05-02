import { NextFunction, Request, Response } from 'express';
import CreateController from '../../../src/controllers/vibrations/create';

import mockedVibrations from '../../mock_files/firestore_vibrations.json';

// @ts-ignore
import { mockDoc, mockSet } from 'firestore-jest-mock/mocks/firestore';

const mockedVibration = mockedVibrations[0];

describe('Test CreateController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  const validBody = {
    category: 'Category 1',
    name: 'Vibration 1',
    data: {
      duration: 1,
      pattern: [
        { name: 1, value: 100 }
      ]
    },
  };

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('when id is provided', () => {
    it('should update vibration', async () => {
      mockRequest.body = { id: mockedVibration.id, ...validBody };

      await CreateController(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockDoc).toBeCalledTimes(1);
      expect(mockDoc).toBeCalledWith(mockedVibration.id);

      expect(mockSet).toBeCalledTimes(1);
      expect(mockSet).toBeCalledWith(validBody);
    });

    it('should respond with 200 HTTP code', async () => {
      mockRequest.body = { id: mockedVibration.id, ...validBody };

      await CreateController(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toBeCalledTimes(1);
      expect(mockResponse.status).toBeCalledWith(200);

      expect(mockResponse.send).toBeCalledTimes(1);
      expect(mockResponse.send).toBeCalledWith({
        id: mockedVibration.id,
        ...validBody
      });
    });
  });

  describe('when id is not provided', () => {
    it('should create new vibration', async () => {
      mockRequest.body = { ...validBody };

      await CreateController(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockDoc).toBeCalledTimes(1);
      /**
       * doc(id = 'abc123') from firestore-jest-mock
       */
      expect(mockDoc).toBeCalledWith('abc123');

      expect(mockSet).toBeCalledTimes(1);
      expect(mockSet).toBeCalledWith(validBody);
    });

    it('should respond with 201 HTTP code', async () => {
      mockRequest.body = { ...validBody };

      await CreateController(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toBeCalledTimes(1);
      expect(mockResponse.status).toBeCalledWith(201);

      expect(mockResponse.send).toBeCalledTimes(1);
      /**
       * doc(id = 'abc123') from firestore-jest-mock
       */
      expect(mockResponse.send).toBeCalledWith({
        id: 'abc123',
        ...validBody
      });
    });
  });

  describe('when parameters are invalid', () => {
    it('should return invalid format response', () => {
      ['name', 'category', 'data'].forEach(async (field) => {
        jest.clearAllMocks();

        mockRequest.body = { ...validBody };
        delete (mockRequest.body[field]);

        await CreateController(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.status).toBeCalledTimes(1);
        expect(mockResponse.status).toBeCalledWith(422);

        expect(mockResponse.send).toBeCalledTimes(1);
        expect(mockResponse.send).toBeCalledWith('Invalid format.');
      });
    });
  });

  describe('when raises an exception', () => {
    describe('where parameters are valid', () => {
      it('calls next function with exception', async () => {
        mockRequest.body = { ...validBody };
        mockResponse.send = jest.fn().mockImplementation(() => {
          throw new Error();
        });

        await CreateController(mockRequest as Request, mockResponse as Response, (err: any) => {
          expect(err).toBeDefined();
          expect(err).toBeInstanceOf(Error);
        });
      });
    });

    describe('where parameters are invalid', () => {
      it('calls next function with exception', async () => {
        mockRequest = {};

        await CreateController(mockRequest as Request, mockResponse as Response, (err: any) => {
          expect(err).toBeDefined();
          expect(err).toBeInstanceOf(Error);
        });
      });
    });
  });
});
