import React, { useEffect, useRef, useContext } from "react";
import Axios from "axios";
import { UserContext } from "../user.context";
import { useNavigate } from "react-router-dom";

export default function Admin() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // if user role is not admin, redirect to home page
  // if (user && user.role !== "admin" || user === null) {
  //   navigate("/");
  // }

  const [listing, setListing] = React.useState([]);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [singleListing, setSingleListing] = React.useState([{
    listingId: 0,
    listingName: "",
    listingPrice: 0,
    listingDescription: "",
    beds: 1,
    baths: 2,
    status: 1,
    addressId: 4,
    street: "",
    city: "",
    state: "",
    zipcode: 0

  }]);

  // const listingImage = useRef(null);
  const listingName = useRef();
  const listingPrice = useRef();
  const listingDescription = useRef();
  const beds = useRef();
  const baths = useRef();
  const status = useRef();
  const addressId = useRef();
  const street = useRef();
  const city = useRef();
  const state = useRef();
  const zipcode = useRef();

  const updateListing = async (id) => {
    console.log(id)
    setIsUpdating(true);
    await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/our-listing/${id}`).then((response) => {
      setSingleListing(response.data);
    });
  };

  console.log(singleListing);
  console.log(isUpdating);

  const submitUpdate = (e) => {
    e.preventDefault();
    const data = {
      listingId: singleListing[0]["listings_id"],
      listingName: listingName.current.value,
      listingPrice: Number(listingPrice.current.value),
      listingDescription: listingDescription.current.value,
      beds: Number(beds.current.value),
      baths: Number(baths.current.value),
      status: Number(status.current.value),
      addressId: Number(addressId.current.value),
      street: street.current.value,
      city: city.current.value,
      state: state.current.value,
      zipcode: Number(zipcode.current.value),
    }

    console.log(data);
    Axios.put("http://localhost:3200/listings/updateListing", data).then(() => {
      console.log("success");
      // close modal here
      window.location.reload();
    });
  }

  const formHandler = (e) => {
    e.preventDefault();

    const data = {
      listingName: listingName.current.value,
      listingPrice: Number(listingPrice.current.value),
      listingDescription: listingDescription.current.value,
      beds: Number(beds.current.value),
      baths: Number(baths.current.value),
      status: Number(status.current.value),
      addressId: Number(addressId.current.value),
      street: street.current.value,
      city: city.current.value,
      state: state.current.value,
      zipcode: Number(zipcode.current.value),
    }
    console.log(data)
    Axios.post("http://localhost:3200/listings/post", data).then(() => {
      console.log("success");
      // close modal here
      window.location.reload();
    });

  };

  const deleteListing = async (id) => {
    console.log(id);

    const data = {
      "listings_id": id
    }
    console.log(data)
    await Axios.delete("http://localhost:3200/listings/deleteListing", { data }
    ).then(() => {

      console.log("success");
      window.location.reload();
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3200/listings").then((response) => {
      setListing(response.data);
    });
  }, []);



  return (
    <div className="container-sm pt-5">
      <div className="row d-flex">
        <div className="col">
          <h1 className="h1">
            Listing
          </h1>
        </div>
        <div className="col">
          <button onClick={() => setIsUpdating(false)} className="btn btn-lg btn-primary" style={{ float: "right" }} data-bs-toggle="modal" data-bs-target="#exampleModal">Add Listing</button>
        </div>

      </div>
      <div className="row d-flex">
        {listing.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card border-0">
              {/* <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" className="card-img-top" alt="..." /> */}
              <img src="\image.avif" className="card-img-top" alt="..." />
              
              <div>
                <div className="p-2 bg-info">
                  <span className="me-3">{item['listing_number_of_beds']} Beds</span>
                  -
                  <span className="ms-3">{item['listing_number_of_baths']} Baths</span>
                </div>

              </div>
              <div className="card-body">
                <h5 className="card-title">
                  {item['listing_name']}
                </h5>
                <p className="card-text">
                  {item['listing_description']}
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
                <a href={`/our-listing/${item['listings_id']}`}
                  className="btn btn-primary btn-sm block mt-3 me-2">View Details</a>

                <button className="btn btn-danger btn-sm mt-3 me-2" onClick={() => deleteListing(item['listings_id'])}>Delete</button>
                <button onClick={() => updateListing(item['listings_id'])} className="btn btn-outline-primary btn-sm mt-3 me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>

              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {isUpdating ? "Update Listing" : "Add Listing"}
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form encType="multipart/form-data" onSubmit={
                isUpdating ? submitUpdate : formHandler
              }>
                <div className="mb-3">
                  <label htmlFor="listing_name" className="form-label
                  ">Listing Name</label>
                  <input type="text" className="form-control" id="listing_name"
                    defaultValue={isUpdating ? singleListing[0]['listing_name'] : ""}
                    aria-describedby="listing_name" ref={
                      listingName
                    } />
                </div>
                <div className="mb-3">
                  <label htmlFor="listing_price" className="form-label
                  ">Listing Price</label>
                  <input type="number" className="form-control" id="listing_price"
                    defaultValue={isUpdating ? singleListing[0]['listing_price'] : ""}
                    ref={listingPrice}
                    aria-describedby="listing_price" />
                </div>
                <div className="mb-3">
                  <label htmlFor="listing_description" className="form-label
                  ">Listing Description</label>
                  <input type="text" className="form-control" id="listing_description"
                    defaultValue={isUpdating ? singleListing[0]['listing_description'] : ""}
                    ref={listingDescription}
                    aria-describedby="listing_description" />
                </div>
                {
                  // image upload
                }
                {/* <div className="mb-3">
                  <label htmlFor="listing_image" className="form-label
                  ">Select Image</label>
                  <input type="file" className="form-control" id="listing_image"
                    ref={listingImage}
                    name="listing_image"
                    // accept="image/*"
                    aria-describedby="listing_image" />
                </div> */}
                <div className="mb-3">
                  <label htmlFor="listing_number_of_beds" className="form-label
                  ">Number of Beds</label>
                  <input type="number" className="form-control"
                    defaultValue={isUpdating ? singleListing[0]['listing_number_of_beds'] : ""}
                    id="listing_number_of_beds"
                    ref={beds}
                    aria-describedby="listing_number_of_beds" />
                </div>
                <div className="mb-3">
                  <label htmlFor="listing_number_of_baths" className="form-label
                  ">Number of Baths</label>
                  <input type="number" className="form-control"
                    defaultValue={isUpdating ? singleListing[0]['listing_number_of_baths'] : ""}
                    id="listing_number_of_baths"
                    ref={baths}
                    aria-describedby="listing_number_of_baths" />
                </div>
                <div className="mb-3">
                  <label htmlFor="listing_status" className="form-label
                  ">Listing Status</label>
                  <input type="number" className="form-control" id="listing_status"
                    defaultValue={isUpdating ? singleListing[0]['listing_status'] : ""}
                    ref={status}
                    aria-describedby="listing_status" />
                </div>
                <div className="mb-3">
                  <label htmlFor="address_id" className="form-label
                  ">Address ID</label>
                  <input type="number" className="form-control" id="address_id" ref={addressId}
                    defaultValue={isUpdating ? singleListing[0]['address_id'] : ""}
                    aria-describedby="address_id" />
                </div>
                <div className="mb-3">
                  <label htmlFor="street" className="form-label
                  ">Street</label>
                  <input type="text" className="form-control" id="street" aria-describedby="street"
                    defaultValue={isUpdating ? singleListing[0]['street'] : ""}
                    ref={street}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label
                  ">City</label>
                  <input type="text" className="form-control" id="city" aria-describedby="city"
                    defaultValue={isUpdating ? singleListing[0]['city'] : ""}
                    ref={city}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="state" className="form-label
                  ">State</label>
                  <input type="text" className="form-control" id="state" aria-describedby="state"
                    defaultValue={isUpdating ? singleListing[0]['state'] : ""}
                    ref={state}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="zip" className="form-label
                  ">Zip</label>
                  <input type="number" className="form-control" id="zip" aria-describedby="zip"
                    defaultValue={isUpdating ? singleListing[0]['zipcode'] : ""}
                    ref={zipcode}
                  />
                </div>


                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}