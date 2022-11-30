import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from "mdb-react-ui-kit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { ReactNavbar } from "overlay-navbar";
import "../Footer/Footer.css";

const Footer = () => {
  return (
    <MDBFooter className="text-center" color="white" bgColor="dark">
      <MDBContainer className="p-4">
        <section className="">
          <MDBRow>
            <MDBCol lg="6" md="6" className="mb-4 mb-md-0">
              <h4 className="text-uppercase">The Real Estate, Location</h4>
              <h5>Agent Name</h5>

              <p>
                Real Estate Sales <br /> Professional License# XXXXXXXXX <br />{" "}
                Cell: XXX-XXX-XXXX
              </p>
              <p>
                1234 Abcd Efg <br /> Long Beach, CA 90815 <br />
                XXX-XXX-XXXX
              </p>

              <p>
                Should you require assistance in navigating our website or
                searching for real estate, please contact our offices at
                XXX-XXX-XXXX.
              </p>

              <p>Broker: CECS443 Real Estate Consultants, DRE # XXXXXXXX</p>
            </MDBCol>

            <MDBCol lg="6" md="6" className="mb-4 mb-md-0">
              <h3>MLS Disclaimer</h3>
              <p>
                Based on information from California Regional Multiple Listing
                Service, Inc. as of October 16, 2022 5:35 AM UTC This
                information is for your personal, non-commercial use and may not
                be used for any purpose other than to identify prospective
                properties you may be interested in purchasing. Display of MLS
                data is usually deemed reliable but is NOT guaranteed accurate
                by the MLS. Buyers are responsible for verifying the accuracy of
                all information and should investigate the data themselves or
                retain appropriate professionals. Information from sources other
                than the Listing Agent may have been included in the MLS data.
                Unless otherwise specified in writing, Broker/Agent has not and
                will not verify any information obtained from other sources. The
                Broker/Agent providing the information contained herein may or
                may not have been the Listing and/or Selling Agent.
              </p>
              <p>
                Based on information from October 16, 2022 5:35 AM UTC The
                information being provided by CRMLS is for the visitor's
                personal, noncommercial use and may not be used for any purpose
                other than to identify prospective properties visitor may be
                interested in purchasing. The data contained herein is
                copyrighted by CRMLS, CLAW, i-Tech MLS, PSRMLS and/or VCRDS and
                is protected by all applicable copyright laws. Any dissemination
                of this information is in violation of copyright laws and is
                strictly prohibited.{" "}
              </p>
              <p>
                Any property information referenced on this website comes from
                the Internet Data Exchange (IDX) program of CRMLS. All data,
                including all measurements and calculations of area, is obtained
                from various sources and has not been, and will not be, verified
                by broker or MLS. All information should be independently
                reviewed and verified for accuracy. Properties may or may not be
                listed by the office/agent presenting the information.
              </p>
            </MDBCol>
          </MDBRow>
        </section>

        <section className="">
          <form action="">
            <MDBRow className="d-flex justify-content-center">
              <MDBCol size="auto">
                <p className="pt-2">
                  <strong>Sign up for our newsletter</strong>
                </p>
              </MDBCol>

              <MDBCol md="5" start="12">
                <MDBInput
                  contrast
                  type="email"
                  label="Email address"
                  className="mb-4"
                />
              </MDBCol>

              <MDBCol size="auto">
                <MDBBtn outline color="light" type="submit" className="mb-4">
                  Subscribe
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </form>
        </section>
      </MDBContainer>

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
