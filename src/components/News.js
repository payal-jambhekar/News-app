import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  constructor(props) {
    super(props);
    console.log("article");

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalize(this.props.category)}- NewsMonkey`;
  }
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0d3691949791491899604e3eb303c2e6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0d3691949791491899604e3eb303c2e6&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  // handleNextClick = async () => {
  //   this.setState({page : this.state.page+1})
  //   this.updateNews();
  // };

  // handlePrevClick = async () => {
  //    this.setState({page : this.state.page-1})
  //   this.updateNews();
  // };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0d3691949791491899604e3eb303c2e6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading:false
    });
  };
  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: '40px 0px' }}>NewsMonkey - Top {this.capitalize(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < Math.min(this.state.totalResults, 100)}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      imgUrl={element.urlToImage}
                      newsUrl={element.url}
                      description={
                        element.description ? element.description.slice(0, 88) : ""
                      }
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
