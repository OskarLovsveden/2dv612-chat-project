import { BaseContext } from "koa";
import TestService from "../services/test-service";
import { db } from "../db/postgres";

export default class TestController {
  private testService: TestService = new TestService();

  public async test(ctx: BaseContext): Promise<void> {
    try {
      const message: string = this.testService.sayHello();

      ctx.body = {
        message,
      };
    } catch (e) {
      console.error(e);
    }
  }

  public async getUsers(ctx): Promise<void> {
    try {
      const users = await db.from("users").select("*");
      ctx.body = users;
    } catch (e) {
      console.error(e);
    }
  }

  // Work in progress
  public async addUser(ctx): Promise<void> {
    try {
      const user = ctx.request.body;
      await db.insert({});
    } catch (e) {
      console.error(e);
    }
  }
}
