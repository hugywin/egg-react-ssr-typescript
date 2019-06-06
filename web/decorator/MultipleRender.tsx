import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, StaticRouter } from 'react-router-dom'
import { Context } from 'egg';

export function MultipleRender() {
    return function (target) {

        /**
         * 客户端渲染方法
         */
        const clientRender = () => {
            ReactDOM.hydrate(
                <BrowserRouter>
                    <Switch>
                        <Route path="/" render={(props) => React.createElement(target, { ...props })} />
                    </Switch>
                </BrowserRouter>,
                document.getElementById('app') as HTMLElement
            );

            if (process.env.NODE_ENV === 'development' && module.hot) {
                module.hot.accept()
            }
        }

        /**
         * 服务端渲染方法
         * @param ctx 
         */
        const serverRender = (ctx: Context) => {

            return (
                <StaticRouter location={ctx.req.url} context={ctx.serverData}>
                    <Switch>
                        <Route path="/" render={(_props) => React.createElement(target, { ...ctx.serverData })} />
                    </Switch>
                </StaticRouter>
            );
        }

        /** 赋值给当前渲染原型对象上 */
        Reflect.set(target, '$serverRender', serverRender);
        /** 从装饰器中启动客户端渲染 */
        if (__isBrowser__) {
            clientRender();
        }

    }
}