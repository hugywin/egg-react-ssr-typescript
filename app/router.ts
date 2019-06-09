import { Application } from 'egg';
import { routelist, RouteInfo } from './decorator/route';

export default (app: Application) => {

  const { controller, router } = app;

  /** 自动注入路由 */
  const list = new Array<RouteInfo>().concat(routelist);
  console.log(list);
  list.forEach(p => {
    if (p.origin !== "") {
      router.all(p.routeUrl, Reflect.get(Reflect.get(Reflect.get(controller, p.origin), p.controller), p.action));
    }
    else {
      router.all(p.routeUrl, Reflect.get(Reflect.get(controller, p.controller), p.action));
    }
  });

};
