import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, StaticRouter } from 'react-router-dom'
import { Context } from 'egg';

export function MultipleRender() {
    return function (target: any) {

        const clientRender = () => {
            ReactDOM.hydrate(
                <BrowserRouter>
                    <Switch>
                        <Route path="/" render={(props) => React.createElement(target, { ...props })} />
                    </Switch>
                </BrowserRouter>,
                document.getElementById('root') as HTMLElement
            );

            if (process.env.NODE_ENV === 'development' && module.hot) {
                module.hot.accept()
            }
        }

        const serverRender = (ctx: Context) => {

            return (
                <StaticRouter location={ctx.req.url} context={ctx.serverData}>
                    <Switch>
                        <Route path="/" render={(_props) => React.createElement(target, { ...ctx.serverData })} />
                    </Switch>
                </StaticRouter>
            );
        }

        Reflect.set(target, '$clientRender', clientRender);
        Reflect.set(target, '$serverRender', serverRender);
    }
}