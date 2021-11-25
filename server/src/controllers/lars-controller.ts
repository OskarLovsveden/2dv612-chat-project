import { BaseContext } from 'koa';
import LarsService from '../services/lars-service';

export default class LarsController {
    private larsService: LarsService = new LarsService();
    
    public async lars(ctx: BaseContext): Promise<void> {
        try {
            const message: string = this.larsService.sayHello();

            ctx.body = {
                message
            };
        } catch (e) {
            console.error(e);
        }
    }
}