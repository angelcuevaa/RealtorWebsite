import React, { useEffect } from "react";
import Axios from "axios";

function OurListing() {

  const [listing, setListing] = React.useState([]);


  useEffect(() => {
    Axios.get("http://localhost:3200/listings").then((response) => {
      setListing(response.data);
    });
  }, []);

  return (
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
  )
}

export default OurListing;
