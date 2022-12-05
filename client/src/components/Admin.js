import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from "../user.context";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useLoadScript } from "@react-google-maps/api";

export default function Admin() {

  // use for google map api
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  })

  const [selectedPlace, setSelectedPlace] = React.useState(null);

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // if user role is not admin, redirect to home page
  // if (user && user.role !== "admin" || user === null) {
  //   navigate("/");
  // }

  const [listing, setListing] = useState([]);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [singleListing, setSingleListing] = React.useState({});

  const [image, setImage] = useState(null);
  const [listingName, setListingName] = useState('');
  const [listingDescription, setListingDescription] = useState("");
  const [listingPrice, setListingPrice] = useState(0);
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [status, setStatus] = useState(0);
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("file", image[i]);
    }
    formData.append("listingName", listingName);
    formData.append("listingDescription", listingDescription);
    formData.append("listingPrice", listingPrice);
    formData.append("beds", beds);
    formData.append("baths", baths);
    formData.append("status", status);
    formData.append('lat', selectedPlace.lat);
    formData.append('lng', selectedPlace.lng);
    formData.append("street", street);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("zipCode", zipCode);


    await Axios.post("http://localhost:3200/listings/post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      console.log(res);
      window.location.reload();
    });
  }

  const updateListing = async (id) => {
    setIsUpdating(true);
    console.log(id);
    try {
      await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/our-listing/${id}`).then((response) => {
        setSingleListing(response.data[0]);
      });
    } catch (error) {
      console.log(error);
    }
  };


  const listing_name_ref = useRef();
  const listing_description_ref = useRef();
  const listing_price_ref = useRef();
  const listing_image_ref = useRef();
  const listing_number_of_beds_ref = useRef();
  const listing_number_of_baths_ref = useRef();
  const lat = useRef();
  const lng = useRef();
  const street_ref = useRef();
  const city_ref = useRef();
  const state_ref = useRef();
  const status_ref = useRef();
  const zipcode_ref = useRef();

  const submitUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('listingId', singleListing[0]["listing_id"]);
    formData.append("image", listing_image_ref.current.files[0]);
    formData.append("listingName", listing_name_ref.current.value);
    formData.append("listingDescription", listing_description_ref.current.value);
    formData.append("listingPrice", listing_price_ref.current.value);
    formData.append("beds", listing_number_of_beds_ref.current.value);
    formData.append("baths", listing_number_of_baths_ref.current.value);
    formData.append("status", status_ref.current.value);
    formData.append('lat', selectedPlace.lat);
    formData.append('lng', selectedPlace.lng);
    formData.append('address_id', singleListing[0]["address_id"]);
    formData.append("street", street_ref.current.value);
    formData.append("state", state_ref.current.value);
    formData.append("city", city_ref.current.value);
    formData.append("zipCode", zipcode_ref.current.value);

    // console log the form data to see what it looks like
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    Axios.put("http://localhost:3200/listings/updateListing", formData,
    ).then(() => {
      console.log("success");
      // close modal here
      // window.location.reload();
    });
  }

  const deleteListing = async (id) => {
    console.log(id);

    const data = {
      "listings_id": id
    }
    console.log(data)
    await Axios.delete("http://localhost:3200/listings/deleteListing", { data }
    ).then(() => {

      console.log("success");
      // window.location.reload();
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    // get all listings in async function
    async function getListings() {
      try {
        Axios.get("http://localhost:3200/listings").then((response) => {
          setListing(response.data);
          console.log(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    }

    getListings();

  }, []);

  console.log(listing)

  return (
    <div className="container-sm pt-5">
      <div className="row d-flex mb-3">
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
        {listing.length != 0 ? listing.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card border-1" style={{ height: "100%" }}>
              {/* <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" className="card-img-top" alt="..." /> */}
              <img src={process.env.PUBLIC_URL + '/images/' + item['images'][0].filename} className="card-img-top" alt="..." />

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
                  {item['listing_description'].substring(0, 60)}...
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
                <a href={`/our-listing/${item['listing_id']}`}
                  className="btn btn-primary btn-sm block mt-3 me-2">View Details</a>

                <button className="btn btn-danger btn-sm mt-3 me-2" onClick={() => deleteListing(item['listing_id'])}>Delete</button>
                <Link to={"update/"+item['listing_id']}>
                  <button className="btn btn-warning btn-sm mt-3 me-2">Update</button>
                  
                </Link>
              </div>
            </div>
          </div>
        )) : <p>No Listing</p>}
      </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {isUpdating ? "Update Listing" : "Add Listing"}
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={isUpdating ? submitUpdate : handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="listing_name" className="form-label
                  ">Listing Name</label>
                  <input type="text" className="form-control" id="listing_name"
                    defaultValue={isUpdating ? singleListing[0]["listing_name"] : ""}
                    ref={listing_name_ref}
                    onChange={(e) =>
                      setListingName(e.target.value)
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="listing_price" className="form-label
                  ">Listing Price</label>
                  <input type="number" className="form-control" id="listing_price"
                    defaultValue={isUpdating ? singleListing[0]['listing_price'] : ""}
                    ref={listing_price_ref}
                    onChange={(e) => setListingPrice(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="listing_description" className="form-label
                  ">Listing Description</label>
                  <input type="text" className="form-control" id="listing_description"
                    defaultValue={isUpdating ? singleListing[0]['listing_description'] : ""}
                    ref={listing_description_ref}
                    onChange={(e) => setListingDescription(e.target.value)} />
                </div>

                <div className="mb-3">
                  <label htmlFor="listing_image" className="form-label
                  ">Select Image</label>
                  <input type="file" className="form-control" id="file"
                    name="file"
                    multiple
                    // ref={listing_image_ref}
                    // defaultValue={isUpdating ? process.env.PUBLIC_URL + '/images/' + singleListing[0]['image'] : ""}
                    onChange={(e) => setImage(e.target.files)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="listing_number_of_beds" className="form-label
                  ">Number of Beds</label>
                  <input type="number"
                    min="0"
                    className="form-control"
                    defaultValue={isUpdating ? singleListing[0]['listing_number_of_beds'] : ""}
                    ref={listing_number_of_beds_ref}
                    id="listing_number_of_beds" onChange={(e) => setBeds(e.target.value)} />

                </div>
                <div className="mb-3">
                  <label htmlFor="listing_number_of_baths" className="form-label
                  ">Number of Baths</label>
                  <input type="number"
                    min="0"
                    className="form-control"
                    defaultValue={isUpdating ? singleListing[0]['listing_number_of_baths'] : ""}
                    ref={listing_number_of_baths_ref}
                    id="listing_number_of_baths" onChange={(e) => setBaths(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="listing_status" className="form-label
                  ">Listing Status</label>
                  <input type="number" className="form-control" id="listing_status"
                    min="0"
                    max="1"
                    defaultValue={isUpdating ? singleListing[0]['listing_status'] : ""}
                    ref={status_ref}
                    onChange={(e) => setStatus(e.target.value)} />

                </div>

                {
                  isLoaded && (
                    <PlacesAutoCompleted setSelectedPlace={setSelectedPlace} />
                  )
                }
                <div className="mb-3">
                  <label htmlFor="street" className="form-label
                  ">Street</label>
                  <input type="text" className="form-control" id="street"
                    defaultValue={isUpdating ? singleListing[0]['street'] : ""}
                    ref={street_ref}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label
                  ">City</label>
                  <input type="text" className="form-control" id="city"
                    defaultValue={isUpdating ? singleListing[0]['city'] : ""}
                    ref={city_ref}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="state" className="form-label
                  ">State</label>
                  <input type="text" className="form-control" id="state"
                    defaultValue={isUpdating ? singleListing[0]['state'] : ""}
                    ref={state_ref}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="zip" className="form-label
                  ">Zip</label>
                  <input type="number"
                    min="0"

                    className="form-control" id="zip" aria-describedby="zip"
                    defaultValue={isUpdating ? singleListing[0]['zipcode'] : ""}
                    ref={zipcode_ref}
                    onChange={(e) => setZipCode(e.target.value)}
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

const PlacesAutoCompleted = ({ setSelectedPlace }) => {

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (value) => {
    setValue(value, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: value });
      const { lat, lng } = getLatLng(results[0]);
      setSelectedPlace({ lat, lng });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const getCurrLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  return <>
    <Combobox onSelect={handleSelect}>
      <label htmlFor="address" className="form-label">Address</label>
      <ComboboxInput className="form-control mb-3" value={value} onChange={(e) => {
        setValue(e.target.value);
      }} disabled={!ready} placeholder="Search an address" />
      <ComboboxPopover style={{ zIndex: "100000" }}>
        <ComboboxList className="pac-container" style={{ backgroundColor: "white" }}>
          {status === "OK" && data.map(({ placeId, description }) => <ComboboxOption key={placeId} value={description} />)}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  </>
}
