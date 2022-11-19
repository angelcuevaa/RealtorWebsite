import React from "react";

function Contact() {
  return (
    <div>
      <section className="module" id="about">
        <div className="container">
          <div className="row">
            <p>&nbsp;</p>
            <h2 className="heading" className="module-title font-alt">
              - Contact Us -
            </h2>
            <h1 className="sub-heading" align="center">
              Got a question? We are available …
            </h1>
          </div>
          <div className="row">
            <div className="col-sm-2 col-sm-offset-5">
              <div className="large-text align-center">
                <a className="section-scroll" href="#services">
                  {" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <a className="section-scroll" href="#services">
        <hr className="divider-w" />
      </a>

      <section className="module" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <a className="section-scroll" href="#services">
                {" "}
              </a>
              <form
                method="post"
                id="form"
                action="/el/cgi/eFormsNew.asp"
                onsubmit="return valida(this))"
                className="wrapper"
              >
                <a className="section-scroll" href="#services">
                  <div className="form-group">
                    <label className="sr-only" for="name">
                      Name
                    </label>
                    <input
                      name="FirstName"
                      type="text"
                      id="FirstName"
                      className="form-control"
                      placeholder="First Name"
                    />
                    <p className="help-block text-danger"></p>
                  </div>

                  <div className="form-group">
                    <label className="sr-only" for="email">
                      Last Name
                    </label>
                    <input
                      name="LastName"
                      className="form-control"
                      type="text"
                      placeholder="Last Name"
                    />
                    <p className="help-block text-danger"></p>
                  </div>

                  <div className="form-group">
                    <label className="sr-only" for="email">
                      Email
                    </label>
                    <input
                      name="Email"
                      className="form-control"
                      type="text"
                      placeholder="Email"
                    />
                    <p className="help-block text-danger"></p>
                  </div>

                  <div className="form-group">
                    <textarea
                      className="form-control"
                      rows="7"
                      id="message"
                      name="message"
                      placeholder="Your Message"
                      required="required"
                      data-validation-required-message="Please enter your message."
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>

                  <div className="form-group">
                    <a href="BuyersVirtual.shtml" className="buyerVitrual-btn">
                      Buyers virtual appointment
                    </a>
                    <a href="SellersVirtual.shtml" className="SellersVitrual-btn">
                      Sellers virtual appointment
                    </a>
                  </div>

                  <div className="col-sm-4">
                    <div className="alt-features-item mt-0">
                      <div className="alt-features-icon">
                        <span className="icon-map"></span>
                      </div>
                      <h3 className="alt-features-title font-alt">Where to meet</h3>
                      Address
                    </div>
                    <div className="alt-features-item mt-xs-60">
                      <div className="alt-features-icon">
                        <span className="icon-envelope"></span>
                      </div>
                      <h3 className="alt-features-title font-alt">Say Hello</h3>
                      Email: Phone:
                    </div>
                    <div className="alt-features-item mt-xs-60">
                      <div className="alt-features-icon">
                        <span className=" icon-chat"></span>
                      </div>
                      <h3 className="alt-features-title font-alt">Languages</h3>
                      English
                    </div>
                  </div>
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
