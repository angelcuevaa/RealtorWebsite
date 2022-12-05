import React, { useEffect } from "react";
import Axios from "axios";
import SingleList from "./SingleList";

function OurListing() {

  const [listing, setListing] = React.useState([]);
  // sort by price
  const [sort, setSort] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // on sort change
  const handleSortChange = (e) => {
    setSort(e.target.value);
    if (sort === "asc") {
      setListing([...listing].sort((a, b) => a.listing_price - b.listing_price));
    } else if (sort === "desc") {
      setListing([...listing].sort((a, b) => b.listing_price - a.listing_price));
    }
  };
  
  useEffect(() => {
    try {
      setIsLoading(true);
      Axios.get(`${process.env.REACT_APP_API_BASE_URL}/listings`).then((response) => {
        setListing(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    
  }, []);

  console.log(listing);

  return (
    <div className="container-md mt-5">
      <div className="col-md-3 offset-md-9 mb-3">
        <select className="form-select" onChange={handleSortChange} disabled={listing.length === 0}>
          <option value="asc">Price: High to Low</option>
          <option value="desc">Price: Low to High</option>
        </select>
      </div>

      {
        isLoading ? <div className="text-center">Loading...</div> : ""
      }

      {
        listing.length === 0 ? (
          <div className="text-center mb-5">
            <h3>No Listing Found</h3>
          </div>
        ) : (
          <SingleList listing={listing} />
        )
      }
    </div>
  )
}

export default OurListing;
