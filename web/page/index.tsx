import React from 'react';
import { MultipleRender } from '../decorator/MultipleRender';

interface IAppProps {

}

@MultipleRender()
export default class App extends React.Component<IAppProps> {

    constructor(props: IAppProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div>测试首页</div>
        );
    }
}


