import React from 'react';
import { MultipleRender } from '../decorator/MultipleRender';
import style from './index.module.scss';

interface IAppProps {

}

@MultipleRender()
export default class App extends React.Component<IAppProps> {

    constructor(props: IAppProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div className={style.homepage}>
                <div>测试首页</div>
            </div>
        );
    }
}

