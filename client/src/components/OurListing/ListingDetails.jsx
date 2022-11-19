import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios';

export default function ListingDetails() {

    const [listing, setListing] = useState({});

    const { id } = useParams();

    useEffect(() => {
        try {
            Axios.get(`http://localhost:3200/our-listing/${id}`).then((response) => {
                setListing(response.data[0]);
            });
        } catch (error) {
            console.log(error);
        }


    }, []);

    console.log(listing);



    return (
        <div className='container-md mt-5'>
            <h1 className='text-center'>{listing['listing_name']}</h1>
            <div className='row d-flex mt-5'>
                <div className='col-md-8'>
                <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" className="card-img-top" alt="..." />
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
                            <h6><span className='fw-bold'>Location:</span> {listing['street']}, {listing['city']}, {listing['state']}, {listing['zipcode']}</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5 mb-5'>
                <h3 className='mt-5'>Description</h3>
                <p>{listing['listing_description']}</p>
            </div>
        </div>
    )
}
