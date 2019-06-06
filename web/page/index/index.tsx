import { MultipleRender } from '../../decorator/MultipleRender';
import { Link } from 'react-router-dom'
import React from 'react';
import styles from './index.module.scss';


interface IPageProps {
    news: any[];
}

@MultipleRender()
export default class Page extends React.Component<IPageProps> {

    constructor(props: IPageProps) {
        super(props);
    }

    componentDidMount(): void {
        console.log(123);
    }

    render(): JSX.Element {
        return (
            <div className="normal">
                <ul className={styles.list}>
                    {
                        this.props.news && this.props.news.map((item, index) => (
                            <li key={`news${index}`}>
                                <div>文章标题: {item.title}</div>
                                <div className='toDetail'><Link to={`/news/${item.id}`}>点击查看详情</Link></div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}







