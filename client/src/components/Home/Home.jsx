import React, { useEffect } from "react";
import "../Home/Home.css";
import TestimonialSlider from "./TestimonialSlider";
import Axios from "axios";
import SingleList from "../OurListing/SingleList";

function Home() {

  const [listing, setListing] = React.useState([]);

  useEffect(() => {
    try {
      Axios.get(`${process.env.REACT_APP_API_BASE_URL}/listings`).then((response) => {
      setListing(response.data);
    });
    } catch (error) {
      console.log(error);
    }
    
  }, []);


  return (
    <div className="container-fluid">
      {/* Section 1: Search */}
      <div className="row banner_search pt-5" style={{
        height: "300px",
        backgroundSize: "cover",
      
        backgroundImage: `url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=875&q=80")`,
      }}>
        <h1 className="text-center pt-5" style={{ color: "black" }}>
          - Pankaj Patel Realtor -
        </h1>
        <h2 className="text-center mb-2">Welcome to Real Estates </h2>
        {/* <div className="input-group justify-content-center">
          <div className="form-outline col-md-6 p-0">
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search"
            />
          </div>
          <button type="button" className="btn btn-primary">Search</button>

        </div> */}
      </div>

      {/*Section 2: About Agent*/}
      <div className="container-md text-center">
        <div className="col-md-12 mt-5">
        <i class="bi bi-person" style={{fontSize: "30px"}}></i>
          <h2>Hello! I am Pankaj Patel </h2>
          <p>
            I specialize in bringing you the best homes for sale and real estate
            listings in the area. Whether you are buying a home, selling a home
            or need help securing a Home Mortgage, I’ve got you covered.
          </p>
        </div>
      </div>

      {/*Section 4: Featured Listings*/}
      <div className="container-md mt-5">
      <h2 className="text-center">Our Featured Listings </h2>
        <hr />
        <div className="text-center mt-2">
          <a href="../our-listing" className="link-light">View Listing</a>
        </div>
        <SingleList listing={listing} />
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
      

        <div className="container-md mt-5">
        <h2 className="text-center">Newly Listed</h2>
        <hr />
        <SingleList listing={listing} />
          
        </div>

      {/*Section 6: Testimonials */}
      <div className="row mb-5">
        <h2 className="text-center mb-4"> Testimonials </h2>
        <TestimonialSlider />
      </div>

      {/*Section 7: Contact Info*/}
      <div className="row">
        <h2 className="text-center"> Contact Information </h2>
      </div>
      <h4 className="text-center mb-3">
        Please contact me for any more information or inquiry..!!
      </h4>
      <a href="../contact" className="link-light d-flex justify-content-center mb-5">
        <button type="button" className="btn btn-primary">
          Contact Us
        </button>
      </a>
    </div>
  );
}

export default Home;
