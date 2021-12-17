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
const params = {
  spaceBetween: 30,
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
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle> تصاویر رویداد</CardTitle>
        </CardHeader>
        <CardBody>
          <Swiper dotColor="orange" activeDotColor="red" {...params}>
            <div>
              <img src={img1} alt="swiper 1" className="img-fluid" />
            </div>
            <div>
              <img src={img2} alt="swiper 2" className="img-fluid" />
            </div>
            <div>
              <img src={img3} alt="swiper 3" className="img-fluid" />
            </div>
            <div>
              <img src={img4} alt="swiper 4" className="img-fluid" />
            </div>
            <div>
              <img src={img5} alt="swiper 5" className="img-fluid" />
            </div>
          </Swiper>
        </CardBody>
      </Card>
    );
  }
}
export default FadeEffectSwiper;
