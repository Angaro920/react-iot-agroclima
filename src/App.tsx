import { useState } from "react";
import { Layout, FloatButton, Drawer } from "antd";
import { MenuDashboard } from "./components";
import { BulbOutlined, MoonOutlined } from "@ant-design/icons";
import { dashboardStyle } from "./styles";
import {
  Dashboard,
  Devices,
  ReportHidPage,
  ReportHumIn,
  ReportHumOut,
  ReportHumPage,
  ReportLightPage,
  ReportRain,
  ReportTempIn,
  ReportTempOut,
  ReportTempPage,
  UsersPage,
} from "./pages";
import { Pages } from "./constants/pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./components/FormLogIn";
import ProtectedRoute from "./components/ProtectedRoutes";
import { ReportBaromRel } from "./pages/ReportBaromRel";
import { ReportSolarRad } from "./pages/ReportSolarRad";
import { ReportUV } from "./pages/ReportUV";

const { Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsedMenu, setCollapsedMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(Pages.DASHBOARD);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout style={dashboardStyle.globalLayoutStyle}>
                  <Sider
                    collapsible
                    collapsed={collapsedMenu}
                    onCollapse={(value) => setCollapsedMenu(value)}
                  >
                    <div>
                      <div>
                        <img
                          src="./agroclima.png"
                          style={dashboardStyle.logo}
                        />{" "}
                      </div>
                    </div>
                    <MenuDashboard
                      setCurrentPage={(key: string) =>
                        setCurrentPage(key as Pages)
                      }
                    />
                  </Sider>
                  <Layout>
                    <Content style={{ margin: "0 16px" }}>
                      {currentPage === Pages.DASHBOARD && <Dashboard />}
                      {currentPage === Pages.DEVICES && <Devices />}
                      {currentPage === Pages.LISTHIDRO && <ReportHidPage />}
                      {currentPage === Pages.LISTHUM && <ReportHumPage />}
                      {currentPage === Pages.LISTLUZ && <ReportLightPage />}
                      {currentPage === Pages.LISTTEMP && <ReportTempPage />}
                      {currentPage === Pages.USERS && <UsersPage />}
                      {currentPage === Pages.LISTTEMPOUT && <ReportTempOut />}
                    {currentPage === Pages.LISTTEMPIN && <ReportTempIn />}
                      {currentPage === Pages.LISTHUMEIN && <ReportHumIn />}
                      {currentPage === Pages.LISTHUMEOUT && <ReportHumOut />}
                      {currentPage === Pages.LISTBAROMREL && <ReportBaromRel />}
                      {currentPage === Pages.LISTSOLARRAD && <ReportSolarRad />}
                      {currentPage === Pages.LISTUV && <ReportUV />}
                      {currentPage === Pages.LISTEVENRAIN && <ReportRain/>}
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                      Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                  </Layout>
                  <FloatButton.Group shape="square">
                    <FloatButton icon={<BulbOutlined />} onClick={showDrawer} />
                    <FloatButton icon={<MoonOutlined />} />
                    <FloatButton.BackTop visibilityHeight={0} />
                  </FloatButton.Group>
                  <Drawer
                    title="Basic Drawer"
                    onClose={onClose}
                    open={openDrawer}
                  >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                  </Drawer>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
   
  );
};

export default App;
