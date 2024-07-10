import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import NewsItem from './Component/NewsItem'
import Lodar from './lodar';

import './Gallery.css'

export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        this.setState({loading:true});  
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=fbaff53357234b11a80f2f4d1ef4afe7&category=${this.props.category}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            loading:false,

            articles: parsedData.articles,
                // loading:false
            totalResults: parsedData.totalResults
        })
    }
    handlePreviousPage = async () => {
        console.log("previous");
        this.setState({loading:true});  

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=fbaff53357234b11a80f2f4d1ef4afe7&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page - 1} `;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading : false
        })
    }
    handleNexpage = async () => {
        console.log("next");
        if(! (this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize))) {



            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=fbaff53357234b11a80f2f4d1ef4afe7&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page + 1} `;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1,
            loading : false

            })
        }
    }

    render() {
        return (
            <div className={'container news-haldelin'}>
                <h1 className='text-center'>Today's top Headlines   </h1>
                        {/* <Lodar /> */}
                        {
                            this.state.loading && <Lodar />

                        }

                <div className='row'>

                    {!this.state.loading && this.state.articles.map(
                        (element) => {
                            return <div className='col-md-4' key={element.url}>

                                <NewsItem title={element.title ? element.title.slice(0, 55) : " "} description={element.description ? element.description.slice(0, 88) : " "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author}  date={element.publishedAt} source={element.source.name} />

                            </div>
                        }
                    )}



                </div>
                <div className='d-flex justify-content-between my-3'>
                    <button type="button" disabled={this.state.page <= 1} onClick={this.handlePreviousPage} className="btn btn-outline-danger">previuos &larr;</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.page)} onClick={this.handleNexpage} className="btn btn-outline-dark">Next&rarr;</button>
                </div>
            </div>
        )
    }
}

export default News

