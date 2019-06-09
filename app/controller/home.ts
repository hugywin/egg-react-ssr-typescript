import { Controller } from 'egg';
import { origin } from '../decorator/origin';
import { Router } from '../decorator/route';

@origin()
export default class HomeController extends Controller {

  @Router()
  @Router('/news/:id')
  public async index() {
    const { ctx } = this;
    try {
      ctx.type = 'text/html'
      ctx.status = 200
      const stream = await await ctx.renderToStream("Page");
      ctx.body = stream;
    } catch (error) {
      ctx.logger.error(`page controller error ${error}`)
    }
  }
}
