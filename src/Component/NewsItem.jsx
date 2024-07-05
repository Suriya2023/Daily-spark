import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl } = this.props;
        return (
            <div className='my-3'>
                <div className="card" style={{ }}>
                    <img src={imageUrl  ? imageUrl : "https://th.bing.com/th/id/OIP.2Yl82xphvP0N_GO982HQlAHaE8?w=227&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}....</p>
                        <a href={newsUrl} className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
