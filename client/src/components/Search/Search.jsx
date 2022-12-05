import React from "react";
import Axios from "axios";
import SingleList from "../OurListing/SingleList";

function Search() {

  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");
  const [minBed, setMinBed] = React.useState("");
  const [maxBed, setMaxBed] = React.useState("");
  const [minBath, setMinBath] = React.useState("");
  const [maxBath, setMaxBath] = React.useState("");

  const resetListings = () => {
    setCity("");
    setState("");
    setZip("");
    setMinPrice("");
    setMaxPrice("");
    setMinBed("");
    setMaxBed("");
    setMinBath("");
    setMaxBath("");
  };

  const [listings, setListings] = React.useState([]);

  const [filteredListings, setFilteredListings] = React.useState([]);


  // async function
  const getListings = async () => {
    const response = await Axios.get("http://localhost:3200/listings");
    setListings(response.data);
  };

  React.useEffect(() => {
    getListings();
  }, []);

  console.log(listings);

  const search = async (e) => {
    e.preventDefault();
    const data = {
      city: city,
      state: state,
      zipcode: Number(zip),
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
      minBeds: Number(minBed),
      maxBeds: Number(maxBed),
      minBaths: Number(minBath),
      maxBaths: Number(maxBath),
    };

    try {
      const response = await Axios.post("http://localhost:3200/listings/search", data);
      setFilteredListings(response.data);
    } catch (error) {
      console.log(error);
    }

  };

  return <div className="container-md mt-5">
    <h1 className="heading">- SEARCH PROPERTIES. -</h1>
    <div className="row d-flex justify-content-center">
      
      <div className="col-md-10">
        <form className="row gy-4 d-flex" onSubmit={search}>
          <div className="col-md-6">
            <input name="City" class="form-control" tabindex="1" required placeholder="City" list="datalist1"
              onChange={(e) => {
                setCity(e.target.value)
                console.log(e.target.value)
              }}
              
            />

            <datalist id="datalist1">
              <option value="Whittier">
              </option><option value="La Habra">
              </option><option value="La Habra Heights">
              </option><option value="La Mirada">
              </option><option value="Brea">
              </option><option value="Fullerton">
              </option><option value="Placientia">
              </option><option value="Pico Rivera">
              </option><option value="Norwalk">
              </option><option value="Downey">
              </option><option value="Montebello">
              </option><option value="Hacienda Heights">
              </option><option value="La Puente">
              </option></datalist>

          </div>
          <div className="col-md-3">
            <select name="State" class="form-select" tabIndex="6"
              onChange={(e) => {
                console.log(e.target.value);
                setState(e.target.value);
              }}
            >
              <option value="CA">CA</option>
              <option value="AK">AK</option>
              <option value="AL">AL</option>
              <option value="AR">AR</option>
              <option value="AZ">AZ</option>
              <option value="CO">CO</option>
              <option value="CT">CT</option>
              <option value="DC">DC</option>
              <option value="DE">DE</option>
              <option value="FL">FL</option>
              <option value="GA">GA</option>
              <option value="HI">HI</option>
              <option value="ID">ID</option>
              <option value="IL">IL</option>
              <option value="IN">IN</option>
              <option value="KS">KS</option>
              <option value="KY">KY</option>
              <option value="LA">LA</option>
              <option value="MA">MA</option>
              <option value="MD">MD</option>
              <option value="ME">ME</option>
              <option value="MI">MI</option>
              <option value="MN">MN</option>
              <option value="MO">MO</option>
              <option value="MS">MS</option>
              <option value="MT">MT</option>
              <option value="NC">NC</option>
              <option value="ND">ND</option>
              <option value="NE">NE</option>
              <option value="NH">NH</option>
              <option value="NJ">NJ</option>
              <option value="NM">NM</option>
              <option value="NV">NV</option>
              <option value="NY">NY</option>
              <option value="OH">OH</option>
              <option value="OK">OK</option>
              <option value="OR">OR</option>
              <option value="PA">PA</option>
              <option value="RI">RI</option>
              <option value="SC">SC</option>
              <option value="SD">SD</option>
              <option value="TN">TN</option>
              <option value="TX">TX</option>
              <option value="UT">UT</option>
              <option value="VA">VA</option>
              <option value="VT">VT</option>
              <option value="WA">WA</option>
              <option value="WI">WI</option>
              <option value="WV">WV</option>
              <option value="WY">WY</option>
            </select>
          </div>
          <div className="col-md-3">
            <input type="number" className="form-control" id="inputZip" placeholder="Zip Code"
              min="0"
              onChange={(e) => {
                console.log(e.target.value);
                setZip(e.target.value);
              }}
            />
          </div>
          <div className="col-md-5">
            <select name="PriceMin" class="form-select" tabindex="3"
              onChange={(e) => {
                console.log(e.target.value);
                setMinPrice(e.target.value);
              }}
            >
              <option selected="selected" value="0">- Min. Price -</option>
              <option value="0">$0 Min</option>
              <option value="500">$500 Min</option>
              <option value="1000">$1,000 Min</option>
              <option value="1500">$1,500 Min</option>
              <option value="2000">$2,000 Min</option>
              <option value="5000">$5,000 Min</option>
              <option value="10000">$10,000 Min</option>
              <option value="20000">$20,000 Min</option>
              <option value="30000">$30,000 Min</option>
              <option value="40000">$40,000 Min</option>
              <option value="45000">$45,000 Min</option>
              <option value="50000">$50,000 Min</option>
              <option value="55000">$55,000 Min</option>
              <option value="60000">$60,000 Min</option>
              <option value="70000">$70,000 Min</option>
              <option value="75000">$75,000 Min</option>
              <option value="100000">$100,000 Min</option>
              <option value="125000">$125,000 Min</option>
              <option value="150000">$150,000 Min</option>
              <option value="175000">$175,000 Min</option>
              <option value="200000">$200,000 Min</option>
              <option value="225000">$225,000 Min</option>
              <option value="250000">$250,000 Min</option>
              <option value="275000">$275,000 Min</option>
              <option value="300000">$300,000 Min</option>
              <option value="325000">$325,000 Min</option>
              <option value="350000">$350,000 Min</option>
              <option value="400000">$400,000 Min</option>
              <option value="450000">$450,000 Min</option>
              <option value="500000">$500,000 Min</option>
              <option value="550000">$550,000 Min</option>
              <option value="600000">$600,000 Min</option>
              <option value="650000">$650,000 Min</option>
              <option value="700000">$700,000 Min</option>
              <option value="750000">$750,000 Min</option>
              <option value="800000">$800,000 Min</option>
              <option value="850000">$850,000 Min</option>
              <option value="900000">$900,000 Min</option>
              <option value="1000000">$1,000,000 Min</option>
              <option value="1250000">$1,250,000 Min</option>
              <option value="1500000">$1,500,000 Min</option>
              <option value="1750000">$1,750,000 Min</option>
              <option value="2000000">$2,000,000 Min</option>
              <option value="2250000">$2,250,000 Min</option>
              <option value="2500000">$2,500,000 Min</option>
              <option value="2750000">$2,750,000 Min</option>
              <option value="3000000">$3,000,000 Min</option>
              <option value="3500000">$3,500,000 Min</option>
              <option value="4000000">$4,000,000 Min</option>
              <option value="4500000">$4,500,000 Min</option>
              <option value="5000000">$5,000,000 Min</option>
              <option value="6000000">$6,000,000 Min</option>
              <option value="8000000">$8,000,000 Min</option>
              <option value="10000000">$10,000,000 Min</option>
            </select>
          </div>
          <div className="col-md-1 to">To</div>
          <div className="col-md-6">
            <select name="PriceMax" class="form-select" tabindex="4"
              onChange={(e) => {
                console.log(e.target.value);
                setMaxPrice(e.target.value);
              }}
            >
              <option selected="selected" value="100000000">- Max. Price -</option>
              <option value="500">$500 Max</option>
              <option value="1000">$1,000 Max</option>
              <option value="1500">$1,500 Max</option>
              <option value="2000">$2,000 Max</option>
              <option value="5000">$5,000 Max</option>
              <option value="10000">$10,000 Max</option>
              <option value="20000">$20,000 Max</option>
              <option value="30000">$30,000 Max</option>
              <option value="40000">$40,000 Max</option>
              <option value="45000">$45,000 Max</option>
              <option value="50000">$50,000 Max</option>
              <option value="55000">$55,000 Max</option>
              <option value="60000">$60,000 Max</option>
              <option value="70000">$70,000 Max</option>
              <option value="75000">$75,000 Max</option>
              <option value="100000">$100,000 Max</option>
              <option value="125000">$125,000 Max</option>
              <option value="150000">$150,000 Max</option>
              <option value="175000">$175,000 Max</option>
              <option value="200000">$200,000 Max</option>
              <option value="225000">$225,000 Max</option>
              <option value="250000">$250,000 Max</option>
              <option value="275000">$275,000 Max</option>
              <option value="300000">$300,000 Max</option>
              <option value="325000">$325,000 Max</option>
              <option value="350000">$350,000 Max</option>
              <option value="400000">$400,000 Max</option>
              <option value="450000">$450,000 Max</option>
              <option value="500000">$500,000 Max</option>
              <option value="550000">$550,000 Max</option>
              <option value="600000">$600,000 Max</option>
              <option value="650000">$650,000 Max</option>
              <option value="700000">$700,000 Max</option>
              <option value="750000">$750,000 Max</option>
              <option value="800000">$800,000 Max</option>
              <option value="850000">$850,000 Max</option>
              <option value="900000">$900,000 Max</option>
              <option value="1000000">$1,000,000 Max</option>
              <option value="1250000">$1,250,000 Max</option>
              <option value="1500000">$1,500,000 Max</option>
              <option value="1750000">$1,750,000 Max</option>
              <option value="2000000">$2,000,000 Max</option>
              <option value="2250000">$2,250,000 Max</option>
              <option value="2500000">$2,500,000 Max</option>
              <option value="2750000">$2,750,000 Max</option>
              <option value="3000000">$3,000,000 Max</option>
              <option value="3500000">$3,500,000 Max</option>
              <option value="4000000">$4,000,000 Max</option>
              <option value="4500000">$4,500,000 Max</option>
              <option value="5000000">$5,000,000 Max</option>
              <option value="6000000">$6,000,000 Max</option>
              <option value="8000000">$8,000,000 Max</option>
              <option value="10000000">$10,000,000 + Max</option>
            </select>
          </div>
          <div className="col-md-5">
            <select class="form-select" name="BedMin" tabindex="5"
              onChange={(e) => {
                console.log(e.target.value);
                setMinBed(e.target.value);
              }}
            >
              <option selected="selected" value="0">Minimum Beds</option>
              <option value="1">1 Bed Min</option>
              <option value="2">2 Bed Min</option>
              <option value="3">3 Bed Min</option>
              <option value="4">4 Bed Min</option>
              <option value="5">5 Bed Min</option>
              <option value="6">6 Bed Min</option>
              <option value="7">7 Bed Min</option>
              <option value="8">8 Bed Min</option>
            </select>
          </div>
          <div className="col-md-1 to">To</div>
          <div className="col-md-6">
            <select class="form-select" name="BedMax" tabindex="6"
              onChange={(e) => {
                console.log(e.target.value);
                setMaxBed(e.target.value);
              }}
            >
              <option selected="selected" value="10">Maximum Beds</option>
              <option value="1">1 Bed Max</option>
              <option value="2">2 Bed Max</option>
              <option value="3">3 Bed Max</option>
              <option value="4">4 Bed Max</option>
              <option value="5">5 Bed Max</option>
              <option value="6">6 Bed Max</option>
              <option value="7">7 Bed Max</option>
              <option value="8">8 Bed Max</option>
            </select>
          </div>
          <div className="col-md-5">
            <select class="form-select" name="BathMin" size="1" tabindex="17"
              onChange={(e) => {
                console.log(e.target.value);
                setMinBath(e.target.value);
              }}
            >
              <option selected="selected" value="0">- Min. Baths -</option>
              <option value="1">1 Bath Min</option>
              <option value="2">2 Bath Min</option>
              <option value="3">3 Bath Min</option>
              <option value="4">4 Bath Min</option>
              <option value="5">5 Bath Min</option>
              <option value="6">6 Bath Min</option>
              <option value="7">7 Bath Min</option>
              <option value="8">8 Bath Min</option>
            </select>
          </div>
          <div className="col-md-1 to">To</div>
          <div className="col-md-6">
            <select class="form-select" name="BathMax" size="1" tabindex="7"
              onChange={(e) => {
                console.log(e.target.value);
                setMaxBath(e.target.value);
              }}
            >
              <option selected="selected" value="0">- Min. Baths -</option>
              <option value="1">1 Bath Max</option>
              <option value="2">2 Bath Max</option>
              <option value="3">3 Bath Max</option>
              <option value="4">4 Bath Max</option>
              <option value="5">5 Bath Max</option>
              <option value="6">6 Bath Max</option>
              <option value="7">7 Bath Max</option>
              <option value="8">8 Bath Min</option>
            </select>
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary mb-5 pe-5 ps-5"
            >Search</button>

          </div>
        </form>

      </div>


    </div>
    <h2 className="mb-3">
      Search Results </h2>
      {
        (filteredListings.length > 0) ? 
        filteredListings && <SingleList listing={filteredListings} />
        : <h1 className="text-center">No Results Found</h1>
      }
  </div>

}

export default Search;
