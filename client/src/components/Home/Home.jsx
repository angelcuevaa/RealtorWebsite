import React, { useState, useEffect } from "react";
import "../Home/Home.css";
import logo from "../../img/image.jpeg";
import cardImage from "../../img/property.jpeg";
import TestimonialSlider from "./TestimonialSlider";
import Axios from "axios";

import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBInputGroup,
  MDBRow
} from "mdb-react-ui-kit";

function Home() {

  const [listing, setListing] = React.useState([]);


  useEffect(() => {
    Axios.get("http://localhost:3200/listings").then((response) => {
      setListing(response.data);
    });
  }, []);


  return (
    <div className="container-fluid">
      {/* Section 1: Search */}
      <div className="row banner_search">
        <h1 className="heading" style={{ color: "black" }}>
          - ABC Real Estates -
        </h1>
        <h2>Welcome to Real Estates </h2>
        <div className="input-group">
          <div className="form-outline col-md-6 m-3 w-65">
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search"
            />
          </div>
          {/*<i className="col-md-1 fas fa-search m-3"></i>*/}
          <button type="button" className="btn btn-primary col-md-1 m-3">
            <i className="fas fa-search"></i>
          </button>
          <button
            type="button"
            className="btn col-md-1 m-3 more-options-button"
          >
            <a href="../Search">More Options</a>
          </button>
        </div>
      </div>

      {/*Section 2: About Agent*/}
      <div className="row about_agent">
        <div className="col-md-3 mr-3 person_image">
          <img src={logo} alt="BigCo Inc. logo" />
        </div>
        <div className="col-md-8 mt-5">
          <h2>Hello! I am (Agent Name) </h2>
          <p>
            I specialize in bringing you the best homes for sale and real estate
            listings in the area. Whether you are buying a home, selling a home
            or need help securing a Home Mortgage, I’ve got you covered.
          </p>
        </div>
      </div>

      {/*Section 3: Featured Homes*/}
      <div className="row featured_section">
        <div className="col-md-12 view_property_image ">
          <h2 className="mt-4">Featured House</h2>
          <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-success m-3">
              View Homes
            </button>
          </div>
        </div>
      </div>

      {/*Section 4: Featured Listings*/}
      <div className="mb-4">
        <h2>Our Featured Listings </h2>
        <hr />
        <div className="text-center mt-2">
          <a href="../our-listing" className="link-light">View Listing</a>
        </div>
      </div>
      <div className="container-md mt-5">
        <div className="row d-flex">
          {listing.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card border-0">
                <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" className="card-img-top" alt="..." />
                <div>
                  <div className="p-2 bg-info">
                    <span className="me-3">{item['listing_number_of_beds']} Bed</span>
                    -
                    <span className="ms-3">{item['listing_number_of_baths']} Bath</span>
                  </div>

                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    {item['listing_name'].substring(0, 50)}
                  </h5>
                  <p className="card-text">
                    {item['listing_description'].substring(0, 50)}
                  </p>
                  <div className="row">
                    <div className="col">
                      <p className="card-text">
                        Price: <small className="text-muted">
                          ${item['listing_price']}
                        </small>
                      </p>
                    </div>
                    <div className="col">
                      <p className="card-text">
                        <small className="text-muted">
                          {item['street']}, {item['city']}, {item["state"]}, {item["zipcode"]}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="d-grid">
                    <a href={`/our-listing/${item['listings_id']}`}
                      className="btn btn-primary btn-sm block">View Details</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="row d-flex justify-content-center listing listing-section">
        
        <div className="col-md-3 m-3 card">
          <img className="card-img-top" src={cardImage} alt="Card image cap" />
          <div className="card-body bottom-left">
            <p className="card-text">$745,000</p>
            <p className="card-text">4536 Falcon Avenue</p>
            <p className="card-text">Long Beach, CA 90807</p>
            <button type="button" className="btn btn-success">
              <a href="../OurListing">View Listing</a>
            </button>
          </div>
        </div>
        <div className="col-md-3 m-3 card">
          <img className="card-img-top" src={cardImage} alt="Card image cap" />
          <div className="card-body bottom-left">
            <p className="card-text">$745,000</p>
            <p className="card-text">4536 Falcon Avenue</p>
            <p className="card-text">Long Beach, CA 90807</p>
            <button type="button" className="btn btn-success">
              <a href="../OurListing">View Listing</a>
            </button>
          </div>
        </div>
        <div className="col-md-3 m-3 card">
          <img className="card-img-top" src={cardImage} alt="Card image cap" />
          <div className="card-body bottom-left">
            <p className="card-text">$745,000</p>
            <p className="card-text">4536 Falcon Avenue</p>
            <p className="card-text">Long Beach, CA 90807</p>
            <button type="button" className="btn btn-success">
              <a href="../OurListing">View Listing</a>
            </button>
          </div>
        </div>
        <div className="col-md-3 m-3 card">
          <img className="card-img-top" src={cardImage} alt="Card image cap" />
          <div className="card-body bottom-left">
            <p className="card-text">$745,000</p>
            <p className="card-text">4536 Falcon Avenue</p>
            <p className="card-text">Long Beach, CA 90807</p>
            <button type="button" className="btn btn-success">
              <a href="../OurListing">View Listing</a>
            </button>
          </div>
        </div>
        <div className="col-md-3 m-3 card">
          <img className="card-img-top" src={cardImage} alt="Card image cap" />
          <div className="card-body bottom-left">
            <p className="card-text">$745,000</p>
            <p className="card-text">4536 Falcon Avenue</p>
            <p className="card-text">Long Beach, CA 90807</p>
            <button type="button" className="btn btn-success">
              <a href="../OurListing">View Listing</a>
            </button>
          </div>
        </div>
        <div className="col-md-3 m-3 card">
          <img className="card-img-top" src={cardImage} alt="Card image cap" />
          <div className="card-body bottom-left">
            <p className="card-text">$745,000</p>
            <p className="card-text">4536 Falcon Avenue</p>
            <p className="card-text">Long Beach, CA 90807</p>
            <button type="button" className="btn btn-success">
              <a href="../OurListing">View Listing</a>
            </button>
          </div>
        </div>
      </div> */}

      {/*Section 5: New Listings*/}
      <div className="">
        <div className="mb-4">
          <h2>Newly Listings ::: What your Neighbors are Saying </h2>
          <hr />
          <div className="text-center mt-2">
            <a href="../OurListing">View All</a>
          </div>
        </div>
        <div className="container-md mt-5">
          <div className="row d-flex">
            {listing.map((item, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card border-0">
                  <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" className="card-img-top" alt="..." />
                  <div>
                    <div className="p-2 bg-info">
                      <span className="me-3">{item['listing_number_of_beds']} Bed</span>
                      -
                      <span className="ms-3">{item['listing_number_of_baths']} Bath</span>
                    </div>

                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {item['listing_name'].substring(0, 50)}
                    </h5>
                    <p className="card-text">
                      {item['listing_description'].substring(0, 50)}
                    </p>
                    <div className="row">
                      <div className="col">
                        <p className="card-text">
                          Price: <small className="text-muted">
                            ${item['listing_price']}
                          </small>
                        </p>
                      </div>
                      <div className="col">
                        <p className="card-text">
                          <small className="text-muted">
                            {item['street']}, {item['city']}, {item["state"]}, {item["zipcode"]}
                          </small>
                        </p>
                      </div>
                    </div>
                    <div className="d-grid">
                      <a href={`/our-listing/${item['listings_id']}`}
                        className="btn btn-primary btn-sm block">View Details</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*Section 6: Testimonials */}
      <div className="row">
        <h2 className="sub-heading"> Section 6: Testimonials Slider </h2>
        <TestimonialSlider />
      </div>

      {/*Section 7: Contact Info*/}
      <div className="row">
        <h2 className="sub-heading"> Section 7: Contact Information </h2>
      </div>
      <div className="sub-heading">
        {" "}
        Please contact me for any more information or inquiry..!!
      </div>
    </div>
  );
}

export default Home;
