import fetch from 'node-fetch';
import dbModels from "../models/db.model";
import { services } from "../server";

class RootService {
  baseURL?: string;
  apiKey?: string;
  secretKey?: string;

  get db() {
    return dbModels()
  }

  get services() {
    return services;
  }

  async get(path: string) {
    const url = `${this.baseURL}${path}`
    const response: any = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        [`${this.apiKey}`]: `${this.secretKey}`
      },
    });
    return response.json();
  }

  async post(path: string, data: any) {
    const url = `${this.baseURL}${path}`
    console.log(url);
    const response: any = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [`${this.apiKey}`]: `${this.secretKey}`
      },
      body: JSON.stringify(data)
    });
    console.log(await response.json());
    return response.json();
  }
}

export default RootService;