import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import path from 'path';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1557754893255_3783';

  config.static = {
    prefix: '/',
    dir: path.resolve(process.cwd(), 'dist')
  }

  // add your egg config in here
  config.middleware = [];

  config.template = path.resolve(process.cwd(), 'web/public/index.html');

  // 手动设置的路由
  config.routes = [
    {
      path: '/',
      exact: true,
      Component: () => (require('@/page/index').default), // 这里使用一个function包裹为了让它延迟require
      controller: 'page',
      handler: 'index'
    },
    {
      path: '/news/:id',
      exact: true,
      Component: () => (require('@/page/news').default),
      controller: 'page',
      handler: 'index'
    }
  ];

  // 客户端需要加载的静态样式表
  config.injectCss = (chunkName) => [
    `/static/css/${chunkName}.chunk.css`
  ];

  // 客户端需要加载的静态资源文件表
  config.injectSrcipt = (chunkName) => [
    `<script src='/static/js/runtime~${chunkName}.js'></script>`,
    `<script src='/static/js/vendor.chunk.js'></script>`,
    `<script src='/static/js/${chunkName}.chunk.js'></script>`
  ];

  // 服务端渲染的数据
  config.serverJs = (chunkName) => path.resolve(process.cwd(), `dist/${chunkName}.server.js`);

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
