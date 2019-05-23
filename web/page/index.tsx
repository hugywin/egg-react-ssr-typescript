import React from 'react';
import { HomeComponent } from '../components/index';
// import { MultipleRender } from '../decorator/MultipleRender';

interface IAppProps {

}

// @MultipleRender()
export default class App extends React.Component<IAppProps> {

    constructor(props: IAppProps) {
        super(props);
    }

    public a: any;

    render(): JSX.Element {
        return (
            <div>
                <HomeComponent />
                <div>测试首页</div>
            </div>
        );
    }
}


