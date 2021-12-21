import React from "react";
import { Row, Col , Button } from "reactstrap";
import avatar1 from "../../../assets/img/portrait/small/avatar-s-5.jpg";
import avatar2 from "../../../assets/img/portrait/small/avatar-s-7.jpg";
import RevenueChart from "../../ui-elements/cards/analytics/Revenue";
import SupportTracker from "./../../ui-elements/cards/analytics/SupportTracker";
import ChatWidget from "../../../components/@vuexy/chatWidget/ChatWidget";
import { Star, Users, Command, MessageCircle, Check } from "react-feather";
import ApexLineCharts from "./../../charts/apex/ApexLineChart";
import "../../../assets/scss/plugins/charts/apex-charts.scss";
import avatarImg from "../../../assets/img/portrait/small/avatar-s-12.jpg";
import { Card, CardHeader, CardBody } from "reactstrap";
import DispatchedOrders from "./DispatchedOrders";
import { ChevronsRight } from "react-feather"
import { history } from './../../../history';

let $primary = "#7367F0",
  $success = "#28C76F",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $info = "#00cfe8",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292",
  $info_light = "#1edec5",
  $stroke_color = "#b9c3cd",
  $label_color = "#e7eef7",
  $purple = "#df87f2",
  $white = "#fff";
const header = ["نوبت گیرنده", "مکان", "تاریخ و زمان", "مدت"];
class Home extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <Row className="match-height">
          <Col lg="4" md="6" sm="12">
            <Card>
              <CardHeader className="mx-auto">
                <div className="avatar mr-1 avatar-xl">
                  <img src={avatarImg} alt="avatarImg" />
                </div>
              </CardHeader>
              <CardBody className="text-center">
                <h4>محمد رضایی</h4>
                <p>نام کسب و کار</p>
                <div className="d-flex justify-content-between mt-2">
                  <div className="uploads">
                    <p className="font-weight-bold font-medium-2 mb-0">568</p>
                    <span>کامنت ها</span>
                  </div>
                  <div className="followers">
                    <p className="font-weight-bold font-medium-2 mb-0">76.8k</p>
                    <span>دنبال کنندگان</span>
                  </div>
                  {/* <div className="following">
                    <p className="font-weight-bold font-medium-2 mb-0">112</p>
                    <span>Following</span>
                  </div> */}
                </div>
                <hr className="my-2" />
                <ul
                  className="activity-timeline timeline-left list-unstyled"
                  style={{ textAlign: "right" }}
                >
                  <li>
                    <div className="timeline-icon bg-primary">
                      <MessageCircle size="18" />
                    </div>
                    <div className="timeline-info">
                      <p className="font-weight-bold">اکبر محمدی</p>
                      <span
                        style={{
                          display: "inline-block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxHeight: "8ch",
                        }}
                      >
                        فتضاح بود. اصلا پیشنهاد نمیکنم 1. تاخیر دو ساعته هنگام
                        رفت - خود لیدر با دو ساعت تاخیر رسید!! 2. انتخاب محل
                        نامناسب برای دیدار اولیه - جلوی متروی شریف که یه سرپناه
                        از بارون شدید و یا یه جا برای نشستن و منتظر لیدر بودن !
                        نداشت 3. اتوبوس قدیمی و داغون غیر VIP - از سقف اتوبوس
                        روی 60 درصد صندلیا اب میچکید. کل شب در واقع زیر بارون !
                        و روی صندلیای خیس نشسته بودیم و بی خوابی مزید بر علت
                        بود. 4. بیشتر از ظرفیت اتوبوس تور رو فروخته بودن که با
                        توجه به تاخیر و شرایط خیس اتوبوس حدودا 10 نفر مجبور به
                        انصراف از تور شدن و با این حال اتوبوس تا آخرین صندلی پر
                        بود. 5. کاروانسرای شاه عباسی و مواردی که توی توضیحات
                        نوشته شده رو فقط از کنارش با اتوبوس رد میشین!! و قرار
                        نیست بازدیدی ازش داشته باشین 6. نفری 25 هزار تومن ورودی
                        کویر از ما توسط لیدر دریافت شد که هیچ جای توضیحات تور
                        نوشته نشده بود. 7. از ساعت یک شب تا 11 صبح توی اتوبوس
                        بودیم و فقط 6 صبح تا 7 برای صبحونه نگه داشت که البته
                        مسیر توی کویر هم زیاده که باعث میشه مجبور به این کار
                        باشن ت
                      </span>
                    </div>
                    <small className="">13 دقیه قبل</small>
                  </li>
                  <li>
                    <div className="timeline-icon bg-warning">
                      <MessageCircle size="18" />
                    </div>
                    <div className="timeline-info">
                      <p className="font-weight-bold">حسین کریمی</p>
                      <span>
                        تور لیدر بسیار مودب و خوش برخورد بود.و بسیار زمان بندی
                        دقیقی داشتن.
                      </span>
                    </div>
                    <small className="">20 دقیه قبل</small>
                  </li>
                </ul>
                <Button onClick={()=>{history.push("/received-comments")}} className="btn-block shadow" color="primary">
                <ChevronsRight size={15} />
                مشاهده همه 
              </Button>
              </CardBody>
            </Card>
          </Col>
          <Col lg="8" md="6" sm="12">
            <SupportTracker
              primary={$primary}
              danger={$danger}
              white={$white}
            />
          </Col>
        </Row>
        <Row >
          <Col lg="7" md="12"  >
            <ApexLineCharts  />
          </Col>
          <Col lg="5" md="12" >
            <DispatchedOrders
              className ="h-250"
              cardName="5 نوبت نزدیک"
              header={header}
              tBody={[
                {
                  Recipient: [
                    { name: "Ali", imgUrl: avatar1 },
                    { name: "Mmd", imgUrl: avatar2 },
                  ],
                  Place: "تهران",
                  Time: "18:00",
                  Date: "25/02/1400",
                  Duration: "20",
                },
                {
                  Recipient: [
                    { name: "Ali", imgUrl: avatar1 },
                    { name: "Mmd", imgUrl: avatar2 },
                  ],
                  Place: "سمنان",
                  Time: "21:00",
                  Date: "14/02/1400",
                  Duration: "120",
                },
                {
                  Recipient: [
                    { name: "Ali", imgUrl: avatar1 },
                    { name: "Mmd", imgUrl: avatar2 },
                  ],
                  Place: "تهران",
                  Time: "18:00",
                  Date: "25/02/1400",
                  Duration: "20",
                },
                {
                  Recipient: [
                    { name: "Ali", imgUrl: avatar1 },
                    { name: "Mmd", imgUrl: avatar2 },
                    { name: "Ali", imgUrl: avatar1 },
                    { name: "Mmd", imgUrl: avatar2 },
                  ],
                  Place: "کرمان",
                  Time: "18:00",
                  Date: "25/02/1400",
                  Duration: "20",
                },
                {
                  Recipient: [
                    { name: "Ali", imgUrl: avatar1 },
                    { name: "Mmd", imgUrl: avatar2 },
                  ],
                  Place: "زنجان",
                  Time: "19:00",
                  Date: "25/12/1400",
                  Duration: "200",
                },
              ]}
            />
          </Col>
        </Row>
        <Row></Row>
        <Row>
          <Col lg="5" md="12" className="text-center">
          <DispatchedOrders
              cardName="5 رویداد اخیر"
              header={["نام رویداد" , "مکان","تاریخ و زمان","مدت","تعداد شرکت کننده"]}
              tBody={[
                {
                  eventName : "آمورش شنا",
                  Recipient : [],
                  Place: "تهران",
                  Time: "18:00",
                  Date: "25/02/1400",
                  Duration: "20",
                  Participant : "4"
                },
                {
                  eventName : "مسابقه کتاب خوانی",
                  Recipient : [],
                  Place: "تهران",
                  Time: "18:00",
                  Date: "25/02/1400",
                  Duration: "20",
                  Participant : "25"
                },
                {
                  eventName : "همایش دوستی",
                  Recipient : [],
                  Place: "شیراز",
                  Time: "18:00",
                  Date: "25/02/1400",
                  Duration: "20",
                  Participant : "44"
                },
                {
                  eventName : "مافیا",
                  Recipient : [],
                  Place: "کاشان",
                  Time: "22:00",
                  Date: "25/02/1400",
                  Duration: "90",
                  Participant : "10"
                },
                {
                  eventName : "آمورش شنا",
                  Recipient : [],
                  Place: "تهران",
                  Time: "18:00",
                  Date: "25/02/1400",
                  Duration: "20",
                  Participant : "88"
                },
              ]}
            />
          </Col>
          <Col lg="7" md="12" className="text-center ">
            <RevenueChart
              primary={$primary}
              dangerLight={$danger_light}
              strokeColor={$stroke_color}
              labelColor={$label_color}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Home;
