import React from "react";
import { PopupButton } from "react-calendly";

function Contact() {
  return (
    <div>
      <section className="module" id="contact">
        <div className="container-md mb-5">
          <h1 className="heading">- Contact Us -</h1>
          <h3 className="text-center mb-5">Got a question? We are available</h3>
          <div className="row d-flex">
            <div className="col-md-8">
              <form>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="fname"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="lname"
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group mb-3">
                  <textarea
                    className="form-control"
                    id="message"
                    rows="5"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <div className="d-grid">
                <button type="submit" className="btn btn-dark mb-3">
                  Submit
                </button>
                </div>
                <div className="row d-flex">
                  <div className="col-md-6 d-grid">
                    
                    <PopupButton
                            className='btn btn-primary'
                            url={process.env.REACT_APP_CALENDLY_URL}
                            rootElement={document.getElementById("root")}
                            text="Buyers Virtual Appointment" />
                  </div>
                  <div className="col-md-6 d-grid">
                    
                    <PopupButton
                            className='btn btn-danger'
                            url={process.env.REACT_APP_CALENDLY_URL}
                            rootElement={document.getElementById("root")}
                            text="Seller Virtual Appointment" />
                  </div>

                </div>
              </form>
            </div>
            <div className="col-md-4">
              <div className="mb-5">
                <p className="mb-2"> <i class="bi bi-map"></i> {" "}WHERE TO MEET</p>
                <p>Pankaj Patel Realtor</p>
                <p>11265 183rd Street,
                  Cerritos, CA 90701</p>
              </div>
              <div className="mb-5">
                <p className="mb-2"> <i class="bi bi-envelope"></i> {" "}SAY HELLO</p>
                <p className="m-0"><a className="text-decoration-none" href="mailto:hello@example.com"> Email: pankajpatel130@yahoo.com </a></p>
                <p><a className="text-decoration-none" href="tel:3233176338"> Phone: 323-317-6338 </a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
