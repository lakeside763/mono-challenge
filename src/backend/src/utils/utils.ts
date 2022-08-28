import { Response, NextFunction } from "express";

export const errorResponse = (error: any, res: Response, next: NextFunction) => {
  if (error.name) {
    return res.status(400).json({ errors: [{ message: error.message }]});
  }
  next(error);
};

export const fetch = async (url: string, data: any) => {
  const response: any = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'mono-sec-key': 'value'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};