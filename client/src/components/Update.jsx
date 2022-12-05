import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
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

export default function Update() {

    const navigate = useNavigate();


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    })

    const [selectedPlace, setSelectedPlace] = React.useState(null);

    const [listing, setListing] = useState({});
    const { id } = useParams();

    const [listingId, setListingId] = useState();
    const [image, setImage] = useState();
    const [listingName, setListingName] = useState('');
    const [listingDescription, setListingDescription] = useState("");
    const [listingPrice, setListingPrice] = useState(0);
    const [beds, setBeds] = useState(0);
    const [baths, setBaths] = useState(0);
    const [status, setStatus] = useState(0);
    const [street, setStreet] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [addressId, setAddressId] = useState(0);
    const [zipCode, setZipCode] = useState(0);

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

    useEffect(() => {

        try {
            Axios.get(`${process.env.REACT_APP_API_BASE_URL}/our-listing/${id}`).then((response) => {
                setListing(response.data[0]);
                setListingId(response.data[0].listing_id);
                setImage(response.data[0].images);
                setListingName(response.data[0].listing_name);
                setListingDescription(response.data[0].listing_description);
                setListingPrice(response.data[0].listing_price);
                setBeds(response.data[0].listing_number_of_beds);
                setBaths(response.data[0].listing_number_of_baths);
                setStatus(response.data[0].listing_status);
                setStreet(response.data[0].listing_street);
                setState(response.data[0].listing_state);
                setCity(response.data[0].listing_city);
                setZipCode(response.data[0].listing_zipcode);
                setAddressId(response.data[0].address_id);
            });
        } catch (error) {
            console.log(error);
        }

    }, []);


    const updateListing = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('listing_id', listingId);
        formData.append('listing_name', listingName);
        formData.append('listing_description', listingDescription);
        formData.append('listing_price', listingPrice);
        formData.append('listing_number_of_beds', beds);
        formData.append('listing_number_of_baths', baths);
        formData.append('lat', selectedPlace.lat);
        formData.append('lng', selectedPlace.lng);
        formData.append('listing_status', status);
        formData.append('listing_street', street);
        formData.append('address_id', addressId);
        formData.append('listing_state', state);
        formData.append('listing_city', city);
        formData.append('listing_zipcode', zipCode);

        // loop through the images array and append each image to the form data
        for (let i = 0; i < image.length; i++) {
            formData.append('file', image[i]);
        }

        Axios.post("http://localhost:3200/listings/updateListing", formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        ).then((response) => {
            console.log(response);
            // navigate('/admin');
        });
    };

    return (
        <div className='container-md mt-5'>
            <h2 className='text-center'>Update Listing</h2>
            <div className='col-md-6 offset-md-3 mb-5'>
                <form onSubmit={(e) => updateListing(e)}>
                    <div className="mb-3">
                        <label htmlFor="listingName" className="form-label">Listing Name</label>
                        <input type="text" className="form-control" id="listingName" value={listingName}
                            ref={listing_image_ref}
                            onChange={(e) => setListingName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="listingDescription" className="form-label">Listing Description</label>
                        <input type="text" className="form-control" id="listingDescription" value={listingDescription} onChange={(e) => setListingDescription(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="image" className="form-label">Image</label>
                        <input type="file" className="form-control" id="image" name='file'
                            multiple
                            onChange={(e) => setImage(e.target.files)} />
                        <div className='d-flex'>
                            {/* {
                        image && image.length > 0 && image.map((img, index) => {
                            return (
                                <div key={index} className="m-2">
                                    <img src={process.env.PUBLIC_URL + '/images/' + img.filename} alt="" height="100"/>
                                </div>
                            )
                        })
                    } */}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="listingPrice" className="form-label">Listing Price</label>
                        <input type="number" className="form-control" id="listingPrice" value={listingPrice} onChange={(e) => setListingPrice(e.target.value)} />
                    </div>
                    {
                        isLoaded && (
                            <PlacesAutoCompleted setSelectedPlace={setSelectedPlace} />
                        )
                    }
                    <div className="mb-3">
                        <label htmlFor="beds" className="form-label">Beds</label>
                        <input type="number" className="form-control" id="beds" value={beds} onChange={(e) => setBeds(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="baths" className="form-label">Baths</label>
                        <input type="number" className="form-control" id="baths" value={baths} onChange={(e) => setBaths(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <input type="number" className="form-control" id="status" value={status} onChange={(e) => setStatus(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="street" className="form-label">Street</label>
                        <input type="text" className="form-control" id="street" value={street} onChange={(e) => setStreet(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="state" className="form-label">State</label>
                        <input type="text" className="form-control" id="state" value={state} onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="zipCode" className="form-label">Zip Code</label>
                        <input type="number" className="form-control" id="zipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form></div>
        </div>
    )
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
