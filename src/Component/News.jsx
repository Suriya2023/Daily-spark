import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import NewsItem from './Component/NewsItem'
// import Lodar from './lodar';
// import './Gallery.css'
import InfiniteScroll from "react-infinite-scroll-component"

export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        }
        console.log("welcome to Constrctor")
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    async UpadateNews(pageNo) {
        this.props.setProgress(10);


        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${pageNo}`;
        this.setState({ loading: true });
        this.props.setProgress(30);
        let data = await fetch(url);
        this.props.setProgress(70);

        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            loading: false,

            articles: parsedData.articles,
            // loading:false
            totalResults: parsedData.totalResults
        });
        document.title = `${this.capitalizeFirstLetter(this.props.category)}  - Dark Spark`;
        this.props.setProgress(100);

    }

    async componentDidMount() {
        this.UpadateNews(this.state.page);
    }

    fetchMoreData = async (pageNo) => {
        this.setState({ page: this.state.page + 1 })
        this.setState({ loading: true });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=fbaff53357234b11a80f2f4d1ef4afe7&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${pageNo}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles.concat(this.state.articles),
            totalResults: parsedData.totalResults,
            loading: false,
        })
    };
    render() {
        return (
            <div className={'container news-haldelin'}>
                <h1 className='text-center'>Today's top Headlines  About {this.capitalizeFirstLetter(this.props.category)}  </h1>
                {/* <Lodar /> */}
                {
                    // this.state.loading && <Lodar />

                }

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >

                    <div className="container">
                        <div className='row'>

                            {this.state.articles.map(
                                (element) => {
                                    return <div className='col-md-4' key={element.url}>

                                        <NewsItem title={element.title ? element.title.slice(0, 55) : " "} description={element.description ? element.description.slice(0, 88) : " "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />

                                    </div>
                                }
                            )}



                        </div>
                    </div>
                </InfiniteScroll>

            </div>
        )
    }
}

export default News

