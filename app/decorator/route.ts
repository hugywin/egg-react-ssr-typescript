import { CharService } from '../core/char';


export const routelist: RouteInfo[] = [];

/**
 * 路由配置项
 *
 * @export
 * @param {string} _route
 */
export function Router(route?: string) {
    let approutelist = routelist
    return (target: any, methodName: string, _descriptor: PropertyDescriptor) => {

        /** 控制器名称 */
        const controller = CharService.toSmallHump(String(target.constructor.name).replace("Controller", ""));

        const configRoute = (origin: string) => {
            let routeItem: RouteInfo | null = null;
            if (route && route != "") {
                routeItem = {
                    controller: controller,
                    action: methodName,
                    routeUrl: route,
                    origin: origin
                };
            }
            else {
                routeItem = {
                    controller: controller,
                    action: methodName,
                    routeUrl: `${origin != "home" ? `/${origin}` : ``}${controller != "home" ? `/${controller}` : ``}/${CharService.toLine(methodName)}`,
                    origin: origin
                };
            }
            approutelist.push(routeItem);
        }

        Reflect.defineMetadata("configRoute", configRoute, target.constructor.prototype, methodName);
    }
}


export interface RouteInfo {

    /**
     * 控制器名称
     *
     * @type {string}
     * @memberof RouteConfig
     */
    controller: string;

    /**
     * 动作名称
     *
     * @type {string}
     * @memberof RouteConfig
     */
    action: string;

    /**
     * 域
     *
     * @type {string}
     * @memberof RouteConfig
     */
    origin: string;

    /**
     * 路由地址
     *
     * @type {string}
     * @memberof RouteConfig
     */
    routeUrl: string;
}
