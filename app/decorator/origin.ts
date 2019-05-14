import "reflect-metadata";

/**
 * 设置Controller区域
 *
 * @export
 * @param {Function} target
 */
export function origin(scope: string) {
    return (target: Function) => {
        Reflect.defineMetadata("origin", scope, target.prototype);
        /** 启动mock配置 || 启动路由配置 */
        Object.getOwnPropertyNames(target.prototype).forEach(p => {
            if (Reflect.getMetadata("configMock", target.prototype, p)) {
                const configMock: Function = Reflect.getMetadata("configMock", target.prototype, p);
                configMock(scope);
            }
            if (Reflect.getMetadata("configRoute", target.prototype, p)) {
                const configRoute: Function = Reflect.getMetadata("configRoute", target.prototype, p);
                configRoute(scope);
            }
            if (Reflect.getMetadata("configSwagger", target.prototype, p)) {
                const configSwagger: Function = Reflect.getMetadata("configSwagger", target.prototype, p);
                configSwagger(scope);
            }
        });
    }
}