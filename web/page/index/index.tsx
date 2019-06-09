import { MultipleRender } from '../../decorator/MultipleRender';
import { Link } from 'react-router-dom'
import React from 'react';
import styles from './index.module.scss';
import { Context } from 'egg';
import { Route } from '@/decorator/Route';
import { GetInitialProps } from '@/decorator/GetInitialProps';
import '@/page/news/index'



interface IPageProps {
  news: any[];
}

@MultipleRender()
@Route('/index')
@GetInitialProps
export default class Page extends React.Component<IPageProps> {

  static async getInitialProps(_ctx: Context): Promise<any> {
    return Promise.resolve({
      news: [
        {
          id: '1',
          title: 'Racket v7.3 Release Notes'
        },
        {
          id: '2',
          title: 'Free Dropbox Accounts Now Only Sync to Three Devices'
        },
        {
          id: '3',
          title: 'Voynich Manuscript Decoded by Bristol Academic'
        },
        {
          id: '4',
          title: 'Burger King to Deliver Whoppers to LA Drivers Stuck in Traffic'
        },
        {
          id: '5',
          title: 'How much do YouTube celebrities charge to advertise your product? '
        }
      ]
    })
  }

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







