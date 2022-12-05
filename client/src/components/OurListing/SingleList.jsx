import React from 'react'

export default function SingleList(props) {

  const listings = props.listing

  console.log(listings)

  return (
    <div className="row d-flex">
      {listings.map((item, index) => (
        <div className="col-md-4 mb-4" key={index}>
          <div className="card border-1" style={{ height: "100%" }}>
            <img src={process.env.PUBLIC_URL + '/images/' + item['images'][0].filename} className="card-img-top img-fluid mh-100" alt="..." />
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
                      {item['listing_street']}, {item['listing_city']}, {item["listing_state"]}, {item["listing_zipcode"]}
                    </small>
                  </p>
                </div>
              </div>
              <div className="d-grid">
                <a href={`/our-listing/${item['listing_id']}`}
                  className="btn btn-primary btn-sm block">View Details</a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
