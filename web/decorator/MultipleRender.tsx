import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, StaticRouter } from 'react-router-dom'
import { Context } from 'egg';
import { Layout } from '@/layout';
import { clientroutelist } from './Route';

export function MultipleRender() {

    let routelist = clientroutelist;

    return function (target) {
        console.log('startup');
        /**
         * 客户端渲染方法
         */
        const clientRender = () => {
            ReactDOM.hydrate(
                <BrowserRouter>
                    <Layout>
                        {
                            routelist.length > 0 ? (
                                <Switch>
                                    {
                                        routelist.map((item, index) => {
                                            let baseprops = (window as any).__INITIAL_DATA__;
                                            return (
                                                <Route key={index} path={item.routeUrl} render={(props) => React.createElement(item.component, Object.assign(baseprops, props))} />
                                            )
                                        })
                                    }
                                </Switch>
                            )
                                : React.createElement(target)
                        }
                    </Layout>
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
        const serverRender = async (ctx: Context) => {


            let component: any;
            if (routelist.length > 0) {
                component = routelist.findIndex(p => p.routeUrl.indexOf(ctx.path) > -1) > -1 ? routelist.find(p => p.routeUrl.indexOf(ctx.path) > -1)!.component : target
            }
            else {
                component = target;
            }

            const serverData = component!.getInitialProps ? await component.getInitialProps(ctx) : {}
            ctx.serverData = serverData;

            return (
                <StaticRouter location={ctx.req.url} context={ctx.serverData}>
                    <Layout>
                        {
                            React.createElement(component, serverData)
                        }
                    </Layout>
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