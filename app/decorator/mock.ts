import { CharService } from './../core/char';
import "reflect-metadata";

export const AppMockList: MockInfo[] = [];

/**
 * controller Mock
 * 配置修饰器->全局应用注入配置
 * @export
 * @param {MockInfo} config
 * @returns
 */
export function MockConfig(config: MockInfo) {
    var appmocklist = AppMockList
    return (target: any, methodName: string, _descriptor: PropertyDescriptor) => {
        let configMock = (origin) => {
            if (!config.origin) {
                config.origin = origin;
            }
            config.title = `${config.origin != "home" ? `${config.origin}-` : ""}${String(target.constructor.name).replace("Controller", "").toLowerCase()}-${methodName}`;
            config.NodeApiUrl = `${config.origin != "home" ? `/${config.origin}` : ""}${String(target.constructor.name).replace("Controller", "").toLowerCase() != "home" ? "/" + String(target.constructor.name).replace("Controller", "").toLowerCase() : ""}/${CharService.toLine(methodName)}`;
            appmocklist.push(config);
        }
        Reflect.defineMetadata("configMock", configMock, target.constructor.prototype, methodName);
    }
}

export interface MockInfo {

    /**
     * mock标题
     *
     * @type {string}
     * @memberof MockInfo
     */
    title?: string;

    /**
     * Mock描述
     *
     * @type {string}
     * @memberof MockInfo
     */
    discription: string;

    /**
     * 来源
     * 项目名称
     * @type {string}
     * @memberof MockInfo
     */
    origin?: string;

    /**
     * 数据类型文件
     *
     * @type {string}
     * @memberof MockInfo
     */
    DataClass?: string[];

    /**
     * 模拟数据
     *
     * @type {string}
     * @memberof MockInfo
     */
    DataJson?: string;

    /**
     * Node接口地址
     *
     * @type {string}
     * @memberof MockInfo
     */
    NodeApiUrl?: string;

    /**
     * Java接口地址
     *
     * @type {string}
     * @memberof MockInfo
     */
    JavaApiUrl?: string;

    /**
     * 请求的模拟数据
     *
     * @type {string}
     * @memberof MockInfo
     */
    RequestJson?: string;

    /**
     * 请求的数据类型
     *
     * @type {string}
     * @memberof MockInfo
     */
    RequestClass?: string[];
}