import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import Swiper from "react-id-swiper";
import img1 from "../../../assets/img/slider/banner-7.jpg";
import img2 from "../../../assets/img/slider/banner-2.jpg";
import img3 from "../../../assets/img/slider/banner-3.jpg";
import img4 from "../../../assets/img/slider/banner-4.jpg";
import img5 from "../../../assets/img/slider/banner-5.jpg";
import "swiper/css/swiper.css";
import "../../../assets/scss/plugins/extensions/swiper.scss";
import urlDomain from "../../../utility/urlDomain";
import isAuthenticated from "../../../utility/authenticated";
import axios from "axios";

const params = {
  spaceBetween: 170,
  effect: "fade",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-prev",
    prevEl: ".swiper-button-next",
  },
};
class FadeEffectSwiper extends React.Component {
  imagesGenreator = (images) => {
    return images.map((item) => item.image.full_size);
  };
  render() {
    let { images } = this.props;
    return (
      <Card>
        <CardHeader>
          <CardTitle> تصاویر رویداد</CardTitle>
        </CardHeader>
        <CardBody className="justify-content-center d-flex">
          {images.length === 0 && (
            <p>عکسی برای این رویداد موجود نیست.</p>
          )}
          {images.length !== 0 && (
            <Swiper dotColor="orange" activeDotColor="red" {...params}>
              {this.imagesGenreator(images).map((item) => {
                return (
                  <div>
                    <img src={item} alt="swiper 1" className="img-fluid" />
                  </div>
                );
              })}
            </Swiper>
          )}
        </CardBody>
      </Card>
    );
  }
}
export default FadeEffectSwiper;
