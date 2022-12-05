import React from "react";

function Testimonials() {

  const testimonials = [
    {
      name: "Peter",
      state: "California",
      description: "I had an amazing experience working with Donna. he is very knowledgeable and always responds quickly when I have aquestion. I would recommend her to anyone. "
    },
    {
      name: "Emma",
      state: "California",
      description: "I had an amazing experience working with Donna. he is very knowledgeable and always responds quickly when I have aquestion. I would recommend her to anyone."
    },
    {
      name: "John",
      state: "California",
      description: "I had an amazing experience working with Donna. he is very knowledgeable and always responds quickly when I have aquestion. I would recommend her to anyone."
    },
    {
      name: "Ramirez",
      state: "California",
      description: "I had an amazing experience working with Donna. he is very knowledgeable and always responds quickly when I have aquestion. I would recommend her to anyone."
    },
  ]

  return (
    <div>
      <h1 className="heading">- OUR CLIENT SPEAK VOLUMES. -</h1>
      <div>
        
      </div>
      <div>
        <div className="testimonials">
          <div className="container-md">
          <h2 className="sub-heading mb-5">
          Our client testimonials describe what has been, and our promise of
          what is to come.
        </h2>
            <div className="row d-flex gy-3">
              {testimonials.map((testimonial, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{testimonial.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {testimonial.state}
                      </h6>
                      <p className="card-text">{testimonial.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>

        </div>
        <div className="sub-heading mb-5">...and more! </div>
      </div>
      );
}

      export default Testimonials;
