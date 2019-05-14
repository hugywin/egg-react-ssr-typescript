import { Extend } from '../decorator/extend';
import { Context } from 'egg';
import * as path from 'path';
const { renderToNodeStream } = require('react-dom/server')

@Extend
class ContextExtend {

    public serverData = null;

    async renderToStream() {
        const self: Context = this as any;
        self.type = 'text/html'
        self.status = 200
        const isLocal = self.app.config.env === 'local'
        if (isLocal) {
            // 本地开发环境下每次刷新的时候清空require服务端文件的缓存，保证服务端与客户端渲染结果一致
            delete require.cache[path.resolve(__dirname, '../../dist/Page.server.js')]
        }
        let serverStream = require('../../dist/Page.server')
        const serverRes = await serverStream.default.$serverRender(self);
        const stream = renderToNodeStream(serverRes)
        self.body = stream
    }


}
export default Reflect.getOwnMetadata("core-enum", ContextExtend.prototype) as ContextExtend;