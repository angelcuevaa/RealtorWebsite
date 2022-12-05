import React from "react";
import {
  MDBFooter,
} from "mdb-react-ui-kit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { ReactNavbar } from "overlay-navbar";
import "../Footer/Footer.css";

const Footer = () => {
  return (
    <MDBFooter className="" color="white" bgColor="dark">
      <div className="container-md p-4">
        <section className="">
          <div className="row d-flex justify-content-center">
            <div className="col-md-4 mb-4 mb-md-0">
              <h3 className="mb-5">Location</h3>
              <h5>Pankaj Patel</h5>

              <p>
                Real Estate Sales <br /> Professional License# 01923499 <br />{" "}
                Cell: 323-317-6338
              </p>
              <p>
                11365 183rd Street,<br /> Cerritos, CA 90701 <br />
                323-317-6338
              </p>

              {/* <p>
                Should you require assistance in navigating our website or
                searching for real estate, please contact our offices at
                323-317-6338.
              </p> */}
            </div>

            <div className="col-md-4 mb-4">
              <h3 className="mb-5">MLS Disclaimer</h3>
              <p>
                Based on information from California Regional Multiple Listing
                Service, Inc. as of October 16, 2022 5:35 AM UTC This
                information is for your personal, non-commercial use and may not
                be used for any purpose other than to identify prospective
                properties you may be interested in purchasing. 
              </p>
              
            </div>
            <div className="col-md-4 mb-4">
              <p className="mb-5">
                <h3>Sign up for our newsletter</h3>
              </p>
              <input type="email" className="form-control" placeholder="Email" />
              <div className="input-group-append">
                <button className="btn btn-outline-light mt-3" type="button">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2022 Copyright:
        <a className="text-white" href="XXX">
          CECS443
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;
