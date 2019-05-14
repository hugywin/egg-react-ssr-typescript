import { Controller } from 'egg';
import { origin } from '../decorator/origin';
import { Router } from '../decorator/route';

@origin('home')
export default class HomeController extends Controller {

  @Router()
  public async index() {
    const { ctx } = this;
    try {
      await ctx.renderToStream()
    } catch (error) {
      ctx.logger.error(`page controller error ${error}`)
    }
  }
}
