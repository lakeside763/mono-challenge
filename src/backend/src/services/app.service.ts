import dbModels from "../models/db.model";
import { services } from "../server";

class RootService {
  get db() {
    return dbModels()
  }

  get services() {
    return services;
  }
}

export default RootService;