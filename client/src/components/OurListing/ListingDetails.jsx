import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { PopupButton } from "react-calendly";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

export default function ListingDetails() {
    const { isLoaded } = useLoadScript(
        {
            googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        }
    )

    const [listing, setListing] = useState({});

    const { id } = useParams();
    useEffect(() => {

        try {
            Axios.get(`${process.env.REACT_APP_API_BASE_URL}/our-listing/${id}`).then((response) => {
                setListing(response.data[0]);
            });
        } catch (error) {
            console.log(error);
        }

    }, []);

    return (
        <div className='container-md mt-5'>
            <h1 className='text-center'>{listing['listing_name']}</h1>
            <div className='row d-flex mt-5'>
                <div className='col-md-8'>
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
                        <div class="carousel-indicators">
                            {
                                listing['images'] ? listing['images'].map((image, index) => {
                                    return (
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} class="active" aria-current="true" aria-label="Slide 1"></button>
                                    )
                                }
                                ) : ""
                            }
                        </div>
                        <div class="carousel-inner">
                            {
                                listing['images'] && listing['images'].map((image, index) => {
                                    return (
                                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                            <img src={process.env.PUBLIC_URL + '/images/' + image.filename} class="d-block w-100" alt={image.filename} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='list-group'>
                        <div className='list-group-item'>
                            <h6><span className='fw-bold'>Property Status: </span>
                                {
                                    listing['listing_status'] === 1 ? 'For Sale' : "Not For Sale"
                                }
                            </h6>
                        </div>
                        <div className='list-group-item'>
                            <h6><span className='fw-bold'>Price:</span> ${listing['listing_price']}</h6>
                        </div>
                        <div className='list-group-item'>
                            <h6><span className='fw-bold'>Bed:</span>  {listing['listing_number_of_beds']}</h6>
                        </div>
                        <div className='list-group-item'>
                            <h6><span className='fw-bold'>Bath:</span>  {listing['listing_number_of_baths']}</h6>
                        </div>
                        <div className='list-group-item'>
                            <h6><span className='fw-bold'>Location:</span> {listing['listing_street']}, {listing['listing_city']}, {listing['listing_state']}, {listing['listing_zipcode']}</h6>
                        </div>
                        <PopupButton
                            className='btn btn-primary'
                            url={process.env.REACT_APP_CALENDLY_URL}
                            rootElement={document.getElementById("root")}
                            text="Click here to schedule!"
                        />
                    </div>
                </div>



            </div>
            <div className='mt-5 mb-5'>
                <h3 className='mt-5'>Description</h3>
                <p>{listing['listing_description']}</p>
            </div>
            {
                isLoaded && (

                    <GoogleMap zoom={13} center={{ lat: listing['listing_lat'], lng: listing['listing_lng'] }} mapContainerStyle={{ height: "400px", width: "100%", marginBottom: "50px" }}
                        options={{
                            fullscreenControl: true,
                            mapTypeControl: true,
                            scaleControl: true,
                            streetViewControl: true,
                            zoomControl: true,
                        }}
                    >
                        <MarkerF
                            position={{ lat: listing['listing_lat'], lng: listing['listing_lng'] }}
                        >
                        </MarkerF>
                    </GoogleMap>
                )
            }

        </div>
    )
}
