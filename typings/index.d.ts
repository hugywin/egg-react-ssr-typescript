import 'egg';

declare module 'egg' {

    /**
     * 扩展应用程序的配置
     */
    interface EggAppConfig extends NewEggAppConfig {

        /**
         * 使用的模版文件路径
         *
         * @type {string}
         * @memberof EggAppConfig
         */
        template: string;

        /**
         * webpack 构建的css产物
         * 客户端注入的css
         * @param {string} chunkName
         * @returns {string[]}
         * @memberof EggAppConfig
         */
        injectCss(chunkName: string): string[];

        /**
         * webpack 构建的css产物
         * 客户端注入的js
         * @param {*} chunkName
         * @returns {string}
         * @memberof EggAppConfig
         */
        injectSrcipt(chunkName): string[];

        /**
         * 服务端构建产物
         * 服务端读取的基本渲染js
         * @param {*} chunkName
         * @returns {string}
         * @memberof EggAppConfig
         */
        serverJs(chunkName): string;
    }
}