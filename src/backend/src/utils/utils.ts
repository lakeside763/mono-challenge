import { Response, NextFunction } from "express";

export const errorResponse = (error: any, res: Response, next: NextFunction) => {
  if (error.name) {
    if (error.code === 11000) {
      const [keyValue] = Object.entries(error.keyValue);
      return res.status(400).json({ errors: [{ message: `Existing ${keyValue[0]} with ${keyValue[1]}`}]})
    }
    return res.status(400).json({ errors: [{ message: error.message }]});
  }
  return next(error);
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