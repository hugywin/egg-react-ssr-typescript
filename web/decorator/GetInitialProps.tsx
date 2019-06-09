import React from 'react';



interface State {
    getProps: boolean;
    extraProps: any;
}

export function GetInitialProps(WrappedComponent: any) {

    if (__isBrowser__) {
        return class extends React.Component<any, State> {
            constructor(props) {
                super(props);
                this.state = {
                    extraProps: {},
                    getProps: false
                };
            }

            componentDidMount() {
                if ((window as any).__USESSR__) {
                    window.onpopstate = () => {
                        this.getInitialProps();
                    }
                }
                const getProps = !(window as any).__USESSR__ || (this.props.history && this.props.history.action === 'PUSH');
                if (getProps) {
                    this.getInitialProps();
                }
            }

            async getInitialProps() {
                // csr首次进入页面以及csr/ssr切换路由时才调用getInitialProps
                const extraProps = WrappedComponent.getInitialProps ? await WrappedComponent.getInitialProps(this.props) : {};
                this.setState({
                    extraProps,
                    getProps: true
                });
            }

            render(): JSX.Element {
                return <WrappedComponent {...Object.assign({}, this.props, this.state.getProps ? {} : (window as any).__INITIAL_DATA__, this.state.extraProps)} />
            }
        }
    } else {
        return WrappedComponent;
    }

}