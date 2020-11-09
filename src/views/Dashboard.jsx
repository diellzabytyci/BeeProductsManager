
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { NavLink } from "react-router-dom";


//icons
import { BsSearch } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from "components/CustomButton/CustomButton.jsx";

import PostCard from "components/Card-Post/CardPost.jsx";
import Posts from "../posts-data.js";
import NotificationSystem from "react-notification-system";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FavoritePosts: []
    }
  }

  componentWillMount() {

    let stringifiedData = (localStorage.getItem('favoritePosts'));
    var favPosts = [];
    console.log(stringifiedData);
    // localStorage.removeItem('favoritePosts')
    if (stringifiedData != null)
      favPosts = JSON.parse(stringifiedData);

    if (favPosts != null) {
      favPosts = this.populateFavorites(favPosts);
    }
    this.setState({ FavoritePosts: favPosts })

  }

  populateFavorites = (posts) => {
    let list = [];
    console.log(posts)
    for (let originalPost of Posts) {
      for (let localPost of posts.postsArray) {
        if (localPost.PostID == originalPost.PostID) {
          list.push(originalPost);
          break;
        }
      }
    }
    return list;
  }
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  favorite = (e, post) => {
    e.preventDefault();
    this.notify(true, post.PostTitle + ' added to favorites')

    this.addToFavorites(post);
    //add to backend data

  }

  notify = (added, text) => {
    if (added)
      toast.success(text, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    else
      toast.warn(text, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
  }

  addToFavorites = (post) => {
    let postsArray = this.state.FavoritePosts;
    postsArray.push(post);
    this.setState({
      FavoritePosts: postsArray
    })
    localStorage.setItem('favoritePosts', JSON.stringify({ postsArray: postsArray }));
  }

  unFavorite = (e, FavPost) => {
    e.preventDefault();
    const favPosts = this.state.FavoritePosts.filter(post => post != FavPost);
    this.notify(false, FavPost.PostTitle + ' removed from favorites')
    this.setState({
      FavoritePosts: favPosts
    })

    localStorage.setItem('favoritePosts', JSON.stringify({ postsArray: favPosts }));
  }


  render() {
    return (
      <div className="content">
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />
        {/* <Grid fluid> */}
        {/* <Row> */}
        <div className="post-container d-inline-flex">

          {Posts.map(
            element => {
              return (
                // <Col lg={3} sm={6} key={element.PostID}>
                <NavLink
                  to={{
                    pathname: "/admin/post-details",
                    Post: { element }
                  }}
                  key={element.PostID}
                >
                  <PostCard
                    post={element}
                    socials={
                      <div>

                        <div className="card-post-btn">
                          <BsSearch />
                        </div>
                        {this.state.FavoritePosts.includes(element) ?
                          <div className="card-post-btn" onClick={e => this.unFavorite(e, element)}>
                            <AiTwotoneHeart />
                          </div>
                          :
                          <div className="card-post-btn" onClick={e => this.favorite(e, element)}>
                            <AiOutlineHeart />
                          </div>
                        }
                        <div className="card-post-btn" >
                          <BsSearch />
                        </div>
                        {/* <Button simple onClick={e => this.favorite(e)}>
                            <i className="card-post-btn pe-7s-like2" />
                          </Button>
                          <Button simple>
                            <i className="card-post-btn pe-7s-cash" />
                          </Button> */}
                      </div>
                    }
                  />
                </NavLink>
                // </Col>
              )
            }
          )}
          {/* <Col lg={3} sm={6}>
              <PostCard

              />
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Capacity"
                statsValue="105GB"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Revenue"
                statsValue="$1,345"
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Errors"
                statsValue="23"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Followers"
                statsValue="+45"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Users Behavior"
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Email Statistics"
                category="Last Campaign Performance"
                stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="2014 Sales"
                category="All products including Taxes"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>

            <Col md={6}>
              <Card
                title="Tasks"
                category="Backend development"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col>*/}
        </div>
        {/* </Row> */}
        {/* </Grid> */}
      </div >
    );
  }
}

export default Dashboard;
