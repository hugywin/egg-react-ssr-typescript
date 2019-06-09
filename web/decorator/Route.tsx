export const clientroutelist: ClientRouteInfo[] = [];

/**
 * 页面路由注册组件
 * 
 * @export
 * @param {string} path
 * @returns {Function}
 */
export function Route(path: string): Function {
    console.log('register router');
    let routelist = clientroutelist
    return function (target: any) {
        routelist.push({ routeUrl: path, component: target });
    }

}

/**
 * 客户端路由信息
 *
 * @export
 * @interface ClientRouteInfo
 */
export interface ClientRouteInfo {

    /**
     * 页面组件
     *
     * @type {*}
     * @memberof ClientRouteInfo
     */
    component: any;

    /**
     * 路由地址
     *
     * @type {string}
     * @memberof RouteConfig
     */
    routeUrl: string;
}