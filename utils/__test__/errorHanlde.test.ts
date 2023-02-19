import { Response } from "express";
import errorWrapper from "../errorHandle";

describe("errorWrapper", () => {
  const mockControllerFn = jest.fn();
  const mockParams = {};
  const mockResponse = {
    json: jest.fn(),
    status: jest.fn()
  } as any

  beforeEach(() => {
    mockControllerFn.mockClear();
  });

  it("should call the controller function with the given parameters", async () => {
    await errorWrapper({
      controllerFn: mockControllerFn,
      params: mockParams,
      res: mockResponse
    });
    expect(mockControllerFn).toHaveBeenCalledWith(mockParams);
  });

  it("should send a success response if the controller function returns a value", async () => {
    const mockResult = { id: 1, name: "Test" };
    mockControllerFn.mockResolvedValueOnce(mockResult);
    await errorWrapper({
      controllerFn: mockControllerFn,
      params: mockParams,
      res: mockResponse
    });
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: true,
      data: mockResult
    });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });


});
