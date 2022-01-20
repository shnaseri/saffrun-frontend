import mock from "./mock"
import "./autoComplete/autoComplete"
import "./navbar/navbarSearch"
import "./navbar/navbarBookmarkSearch"
import "./auth/authentication"
import "./apps/userList"
mock.onAny().passThrough()
