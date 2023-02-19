import { Response } from "express";

type ControllerFunction = (params: any) => Promise<any>;

interface Params {
  controllerFn: ControllerFunction;
  params?: any;
  res: Response;
}
async function errorWrapper(p: Params) {
  const { params, res, controllerFn } = p;
  try {
    const result = await controllerFn(params);
    res.json({ success: true, data: result });
    res.status(200);
  } catch (e: any) {
    const status = 500;
    const message = e.message || "Something went wrong";
    res.status(status).json({ success: false, error: message });
  }
}

export default errorWrapper;
