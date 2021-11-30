import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import { ContextLayout } from "./utility/context/Layout";

// Route-based code splitting
const Home = lazy(() => import("./views/dashboard/HomePage/HomePage"));

const PersonalInfo = lazy(() => import("./views/UserInfo/UserInfo"));
const WorkInfo = lazy(() => import("./views/WorkInfo/WorkInfo"));
const UsersMessages = lazy(() => import("./views/UserMessages/UserMessages"));
const TradeInfo = lazy(() => import("./views/UserTradeInfo/UserTradeInfo"));

const BookingCreation = lazy(() =>
  import("./views/Reservation/CreateTurns/CreateTurns")
);

const Login = lazy(() => import("./views/authentication/login/Login"));
const ForgotPassword = lazy(() => import("./views/authentication/ForgotPassword"));
const SignUp = lazy(() => import("./views/authentication/register/Register"));
const MyReservation = lazy(() => import("./views/Reservation/MyTurns/MyTurns"));
const MyEvents = lazy(() => import("./views/Event/MyEvents/MyEvents"));

const EventCreation = lazy(() =>
  import("./views/Event/EventCreation/EventCreation")
);

const AboutUs = lazy(() => import("./views/Support/AboutUs"));
const ReceivedComments = lazy(() =>
  import("./views/UserReceivedComments/receivedComment")
);
const DetailPage = lazy(() => import("./views/Event/MyEvents/EventDetailPage"));

const CallUs = lazy(() => import("./views/Support/CallUs"));

// Set Layout and Component Using App Route
const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);

const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={Home} />
          <AppRoute path="/login" component={Login} fullLayout />
          <AppRoute path="/forget-password" component={ForgotPassword} fullLayout />
          <AppRoute path="/register" component={SignUp} fullLayout />
          <AppRoute path="/personal-info" component={PersonalInfo} />

          <AppRoute path="/work-info" component={WorkInfo} />
          <AppRoute path="/user-messages" component={UsersMessages} />
          <AppRoute path="/trade-info" component={TradeInfo} />
          <AppRoute path="/event-creation" component={EventCreation} />

          <AppRoute path="/book-creation" component={BookingCreation} />
          <AppRoute path="/my-reservation" component={MyReservation} />
          <AppRoute path="/my-events" component={MyEvents} />
          <AppRoute path="/about-us" component={AboutUs} />
          <AppRoute path="/received-comments" component={ReceivedComments} />
          <AppRoute path ="/event-detail/:id" component={DetailPage}/>

          <AppRoute path="/call-us" component={CallUs} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
