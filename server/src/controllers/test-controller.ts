import { BaseContext } from 'koa';
import TestService from '../services/test-service';

export default class TestController {
    private testService: TestService = new TestService();
    
    public async test(ctx: BaseContext): Promise<void> {
        try {
            const message: string = this.testService.sayHello();

            ctx.body = {
                message
            };
        } catch (e) {
            console.error(e);
        }
    }
}