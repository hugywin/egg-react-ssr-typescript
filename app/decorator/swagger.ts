import { CharService } from '../core/char';
import "reflect-metadata";

export const AppSwaggerList: ISwaggerItem[] = [];

/**
 * Swagger
 * 配置修饰器->全局应用注入配置
 * @export
 * @param {ISwaggerItem} config
 * @returns
 */
export function Swagger(config: ISwaggerItem) {
    var swaggerList = AppSwaggerList
    return (target: any, methodName: string, _descriptor: PropertyDescriptor) => {
        /** 控制器名称 */
        const controller = CharService.toSmallHump(String(target.constructor.name).replace("Controller", ""));
        let configSwagger = (origin) => {
            if (!config.url) {
                config.url = `${origin != "home" ? `/${origin}` : ``}${controller != "home" ? `/${controller}` : ``}/${CharService.toLine(methodName)}`
            }
            if (!config.tags) { config.tags = [origin]; }
            swaggerList.push(config);
        }
        Reflect.defineMetadata("configSwagger", configSwagger, target.constructor.prototype, methodName);
    }
}



export interface ISwaggerItem {

    /**
     * 接口地址
     * @type {string}
     * @memberof ISwaggerItem
     */
    url?: string;

    /**
     * 标签说明
     * 
     * @type {string}
     * @memberof ISwaggerItem
     */
    tags?: string[];

    /**
     * Swagger标题
     *
     * @type {string}
     * @memberof ISwaggerItem
     */
    summary: string;

    /**
     * Swagger描述
     *
     * @type {string}
     * @memberof ISwaggerItem
     */
    description?: string;

    parameters?: ISwaggerParam[];
}

export interface ISwaggerParam {
    // 参数名称
    name: string;
    // 参数来源类型 "formData"
    in?: string;
    // 参数说明 "要查询指标 指标字段 uv|vv|pv",
    description?: string;
    // 参数是否必须 true
    required?: boolean;
    // 参数类型 "string",
    type?: string;
    // 参数格式
    format?: string;
}