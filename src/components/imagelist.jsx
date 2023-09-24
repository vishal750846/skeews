import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Ls6 from "../../src/images/ls6.jpg";
import Ls7 from "../../src/images/ls8.jpeg";
import Ls8 from "../../src/images/ls10.jpg";
import Ls9 from "../../src/images/ls11.jpg";
import Ls10 from "../../src/images/ls12.jpg";
import Ls11 from "../../src/images/ls6.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function imagelist(props) {
  let imageUrl = "https://api.skewws.com/resources/";
  const navigate = useNavigate();
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
  };
  return (
    <div className="border-top border-bottom">
      <Container>
        <Slider className="banner-slide" {...settings}>
          {props.category.map((val, i) => {
            return (
              <div className="custom-slide" key={i}>
                {i == 0 ? (
                  <LazyLoadImage
                    src={Ls6}
                    key={i}
                    effect="blur"
                    onClick={(e) => navigate(`/categories/${val._id}`)}
                  />
                ) : i == 1 ? (
                  <LazyLoadImage
                    src={Ls7}
                    key={i}
                    effect="blur"
                    onClick={(e) => navigate(`/categories/${val._id}`)}
                  />
                ) : i == 2 ? (
                  <LazyLoadImage
                    src={Ls8}
                    key={i}
                    effect="blur"
                    onClick={(e) => navigate(`/categories/${val._id}`)}
                  />
                ) : i == 3 ? (
                  <LazyLoadImage
                    src={Ls9}
                    key={i}
                    effect="blur"
                    onClick={(e) => navigate(`/categories/${val._id}`)}
                  />
                ) : i == 4 ? (
                  <LazyLoadImage
                    src={Ls10}
                    key={i}
                    effect="blur"
                    onClick={(e) => navigate(`/categories/${val._id}`)}
                  />
                ) : (
                  <LazyLoadImage
                    src={Ls11}
                    key={i}
                    effect="blur"
                    onClick={(e) => navigate(`/categories/${val._id}`)}
                  />
                )}
                <p style={{ textAlign: "center" }}> {val.name}</p>
              </div>
            );
          })}
        </Slider>
      </Container>
    </div>
  );
}
