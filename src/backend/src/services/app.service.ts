import { DB } from "../models/db.model";

class AppService {
  db: DB;
  constructor(db: DB) {
    this.db = db;
  }
}

export default AppService;