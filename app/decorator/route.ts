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
                    routeUrl: `${origin !== '' ? `/${origin}` : ``}${controller != "home" ? `/${controller}` : ``}/${CharService.toLine(methodName)}`,
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


class CharService {

    // 下划线转换驼峰
    public static toHump(word: string) {
        // Support: IE9-11+
        return word.replace(/-([a-z])/g, (_all, letter) => {
            return letter.toUpperCase();
        });
    }


    // 驼峰转换下划线
    public static toLine(name): string {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
    }

    public static toSmallHump(word: string) {
        return word.substring(0, 1).toLowerCase() + word.substring(1, word.length);
    }
}