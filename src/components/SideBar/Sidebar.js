import {
  faBook,
  faCalendar,
  faChartBar,
  faEnvelopeCircleCheck,
  faReorder,
  faShoppingCart,
  faUser,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import Category from "../Category/Category";
import Crop from "../Crop/Crop";
import Customer from "../CustomerProfile/Customer";
import EditProduct from "../EditProduct/EditProduct";
import EditProductPage from "../EditProduct/EditProductPage";
import Email from "../Email/Email";
import Order from "../order/Order";
import SingleOrder from "../order/SingleOrder";
import PerformanceBoard from "../PerformanceBoard/PerformanceBoard";
import Product from "../Product/Product";
import Tools from "../Tools/Tools";
import "./SidebarStyle.css";
import Coupon from "../Coupon/Coupon";
import Shipping from "../Shipping/Shipping";

const sidebarClasses = {
  root: "ps-sidebar-root",
  container: "ps-sidebar-container",
  image: "ps-sidebar-image",
  backdrop: "ps-sidebar-backdrop",
  collapsed: "ps-collapsed",
  toggled: "ps-toggled",
  rtl: "ps-rtl",
  broken: "ps-broken",
};

const menuClasses = {
  root: "ps-menu-root",
  menuItemRoot: "ps-menuitem-root",
  subMenuRoot: "ps-submenu-root",
  button: "ps-menu-button",
  prefix: "ps-menu-prefix",
  suffix: "ps-menu-suffix",
  label: "ps-menu-label",
  icon: "ps-menu-icon",
  subMenuContent: "ps-submenu-content",
  SubMenuExpandIcon: "ps-submenu-expand-icon",
  disabled: "ps-disabled",
  active: "ps-active",
  open: "ps-open",
};

const themes = {
  light: {
    sidebar: {
      backgroundColor: "#0b2948",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#ff6f61",
      hover: {
        backgroundColor: "#ffe4e1",
        color: "#44596e",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#0b2948",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      icon: "#1abc9c",
      hover: {
        backgroundColor: "#00458b",
        color: "#b6c8d9",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
  },
};

// hex to rgba converter
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Create dummy components for the missing ones
const Switch = ({ id, checked, onChange, label }) => (
  <div>
    <input type="checkbox" id={id} checked={checked} onChange={onChange} />
    <label htmlFor={id}>{label}</label>
  </div>
);

const SidebarHeader = ({ rtl, style }) => (
  <div style={style}>Aihomesd Dashboard</div>
);

const SidebarFooter = ({ collapsed }) => (
  <div style={{ textAlign: "center", padding: "10px 0", color: "#8ba1b7" }}>
    <p
      style={{
        margin: 0,
        color: "white",
      }}
    >
      Developed by{" "}
      <a
        href="https://araflogix.com/"
        style={{ color: "white", textDecoration: "none" }}
      >
        ArafLogix.com
      </a>
    </p>
    {collapsed ? "(collapsed)" : ""}
  </div>
);

const Badge = ({ variant, shape, children }) => (
  <span className={`badge ${variant} ${shape}`}>{children}</span>
);

const Typography = ({ variant, fontWeight, style, children }) => (
  <div style={{ ...style, fontWeight }}>{children}</div>
);

const PackageBadges = () => <div>Package Badges</div>;

export const Playground = () => {
  const [collapsed, _setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(false);
  const [rtl, _setRtl] = React.useState(false);
  const [hasImage, _setHasImage] = React.useState(false);
  const [theme, _setTheme] = React.useState("dark");

  const menuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(
              themes[theme].menu.menuContent,
              hasImage && !collapsed ? 0.4 : 1
            )
          : "transparent",
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: hexToRgba(
          themes[theme].menu.hover.backgroundColor,
          hasImage ? 0.8 : 1
        ),
        // backgroundColor: hexToRgba(
        //   themes[theme].menu.hover.backgroundColor,
        //   hasImage ? 0.8 : 1
        // ),
        color: themes[theme].menu.hover.color,
        borderRadius: "50px 0px 0px 50px",
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
    activeItem: {
      backgroundColor: themes[theme].menu.hover.backgroundColor, // Use theme hover background color
      color: themes[theme].menu.hover.color, // Use theme hover text color
      fontWeight: 600, // Bold active item
      borderRadius: "50px 0px 0px 50px",
    },
  };

  const [mainMenu, setMainMenu] = useState("");
  const [subMenu, setSubMenu] = useState("");
  const [nestedMenu, setNestedMenu] = useState("");

  const setActiveOption = (props) => {
    setNestedMenu("");

    const parts = props.split("/");

    // Construct the new URL
    const newUrl = `${window.location.origin}/dashboard/${props}`;

    if (parts.length > 1) {
      setMainMenu(parts[0]);
      setSubMenu(parts[1]);
    }

    // Change route without refreshing using HTML5 history API
    window.history.pushState({}, "", newUrl);

    console.log(props);
  };

  useLayoutEffect(() => {
    // Extract the productId from the URL path
    const path = window.location.pathname;

    const parts = path.split("/");

    // main menu
    parts[2] && setMainMenu(parts[2]);
    // sub menu menu
    parts[3] && setSubMenu(parts[3]);

    if (parts[4]) {
      setNestedMenu(parts[4].split("=")[0]);
    }
  }, []);

  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeString = currentDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://backend.yeesto.com/getAllOrder") // Replace with your backend API URL
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div
      id="sideBard"
      className="sideBard"
      style={{
        display: "flex",
        height: "100vh", // Ensure full viewport height
        direction: rtl ? "rtl" : "ltr",
      }}
    >
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
        rtl={rtl}
        breakPoint="md"
        backgroundColor={hexToRgba(
          themes[theme].sidebar.backgroundColor,
          hasImage ? 0.9 : 1
        )}
        rootStyles={{
          color: themes[theme].sidebar.color,
          height: "100vh", // Ensure sidebar height is 100vh
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundImage: hasImage
              ? "url('https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg')"
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <SidebarHeader
            rtl={rtl}
            style={{
              marginBottom: "24px",
              marginTop: "16px",
              color: themes[theme].sidebar.color,
              fontSize: "1.2rem",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Dashboard
          </SidebarHeader>

          <div style={{ flex: 1, marginBottom: "32px" }}>
            <div style={{ padding: "0 24px", marginBottom: "8px" }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{
                  opacity: collapsed ? 0 : 0.7,
                  letterSpacing: "0.5px",
                  color: themes[theme].sidebar.color,
                }}
              >
                General
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem
                onClick={() => setActiveOption("board/performance-board")}
                icon={<FontAwesomeIcon icon={faChartBar} />}
                style={
                  mainMenu === "board" && subMenu === "performance-board"
                    ? menuItemStyles.activeItem
                    : {}
                }
              >
                Dashboard
              </MenuItem>

              <MenuItem
                onClick={() => setActiveOption("order/order-list")}
                icon={<FontAwesomeIcon icon={faReorder} />}
                style={
                  mainMenu === "order" && subMenu === "order-list"
                    ? menuItemStyles.activeItem
                    : {}
                }
              >
                Order
              </MenuItem>

              <SubMenu
                label="Product"
                icon={<FontAwesomeIcon icon={faShoppingCart} />}
                style={mainMenu === "product" ? menuItemStyles.activeItem : {}}
              >
                <MenuItem
                  onClick={() => setActiveOption("product/product-add")}
                  style={
                    subMenu === "product-add" ? menuItemStyles.activeItem : {}
                  }
                >
                  Add Product
                </MenuItem>
                <MenuItem
                  onClick={() => setActiveOption("product/product-edit")}
                  style={
                    subMenu === "product-edit" ? menuItemStyles.activeItem : {}
                  }
                >
                  Edit Product
                </MenuItem>
                <MenuItem
                  onClick={() => setActiveOption("product/product-category")}
                  style={
                    subMenu === "product-category"
                      ? menuItemStyles.activeItem
                      : {}
                  }
                >
                  Category
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    setActiveOption("product/product-image-cropper")
                  }
                  style={
                    subMenu === "product-image-cropper"
                      ? menuItemStyles.activeItem
                      : {}
                  }
                >
                  Image Cropper
                </MenuItem>
              </SubMenu>

              <MenuItem
                onClick={() => setActiveOption("user/register-customer")}
                icon={<FontAwesomeIcon icon={faUser} />}
                style={
                  mainMenu === "user" && subMenu === "register-customer"
                    ? menuItemStyles.activeItem
                    : {}
                }
              >
                Customer
              </MenuItem>
              <MenuItem
                onClick={() => setActiveOption("shipping/shipping-setting")}
                icon={<FontAwesomeIcon icon={faUser} />}
                style={
                  mainMenu === "shipping" && subMenu === "shipping-setting"
                    ? menuItemStyles.activeItem
                    : {}
                }
              >
              Shipping
              </MenuItem>
              <MenuItem
                onClick={() => setActiveOption("coupon/list-coupon")}
                icon={<FontAwesomeIcon icon={faUser} />}
                style={
                  mainMenu === "coupon" && subMenu === "list-coupon"
                    ? menuItemStyles.activeItem
                    : {}
                }
              >
                Coupon
              </MenuItem>

           

              <MenuItem
                onClick={() => setActiveOption("message/email")}
                icon={<FontAwesomeIcon icon={faEnvelopeCircleCheck} />}
                style={
                  mainMenu === "message" && subMenu === "email"
                    ? menuItemStyles.activeItem
                    : {}
                }
              >
                Email
              </MenuItem>
            </Menu>

            <div
              style={{
                padding: "0 24px",
                marginBottom: "8px",
                marginTop: "32px",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                style={{
                  opacity: collapsed ? 0 : 0.7,
                  letterSpacing: "0.5px",
                  color: themes[theme].sidebar.color,
                }}
              >
                Extra
              </Typography>
            </div>

            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem
                icon={<FontAwesomeIcon icon={faCalendar} />}
                onClick={() => setActiveOption("tool/Tools")}
                style={
                  mainMenu === "tool" && subMenu === "Tools"
                    ? menuItemStyles.activeItem
                    : {}
                }
              >
                Tools
              </MenuItem>
              <MenuItem
                style={{ display: "none" }}
                icon={<FontAwesomeIcon icon={faBook} />}
                onClick={() => setActiveOption("Documentation")}
              >
                Documentation
              </MenuItem>
              <MenuItem
                style={{ display: "none" }}
                icon={<FontAwesomeIcon icon={faWrench} />}
                onClick={() => setActiveOption("Settings")}
              >
                Settings
              </MenuItem>
            </Menu>
          </div>
          <SidebarFooter collapsed={collapsed} />
        </div>
      </Sidebar>

      <div style={{ overflowY: "scroll", width: "100%", overflowX: "hidden" }}>
        {/* Toggle Button */}
        {broken && (
          <button
            className="sb-button"
            onClick={() => setToggled(!toggled)}
            style={{
              backgroundColor: theme === "dark" ? "#1abc9c" : "#ff6f61",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Toggle
          </button>
        )}

        <div
          className="topbar"
          style={{
            width: "100%",
            background: "linear-gradient(90deg, #0B2948, #6dd5fa)",
            color: "#ecf0f1",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            position: "fixed",
            top: "0",
            zIndex: "1000",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            // Adding media query styles directly in JSX for demonstration
          }}
        >
          {/* SubMenu (Visible on all screen sizes) */}
          <div style={{ flex: 1, textAlign: "left" }}>
            {subMenu === ""
              ? "Dashboard"
              : subMenu === "performance-board"
              ? "Dashboard"
              : subMenu === "order-list"
              ? "Order"
              : subMenu === "product-add"
              ? "Upload Product"
              : subMenu === "product-edit"
              ? "Edit Product"
              : subMenu === "product-category"
              ? "Upload Category"
              : subMenu === "list-coupon"
              ? "Coupon"
              : subMenu === "shipping-setting"
              ? "Shipping Setting"
              : subMenu === "register-customer"
              ? "Register Customer"
              : "Dashboard"}
          </div>

          {/* Date and Time (Hidden on small screens) */}
          <div
            style={{
              flex: 2,
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // Responsive styles
              "@media (max-width: 768px)": {
                display: "none",
              },
            }}
          >
            {dateString} | {timeString}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mt-5">
          {" "}
          {/* Added paddingTop to account for fixed topbar */}
          {mainMenu === "product" && (
            <div>
              {nestedMenu === "productId" ? (
                <EditProductPage />
              ) : (
                <div>
                  {subMenu === "product-add" && <Product />}
                  {subMenu === "product-edit" && <EditProduct />}
                  {subMenu === "product-category" && <Category />}
                  {subMenu === "product-image-cropper" && <Crop />}
                </div>
              )}
            </div>
          )}
          {mainMenu === "order" && (
            <div>
              {nestedMenu === "orderId" ? (
                <SingleOrder />
              ) : (
                <div>{subMenu === "order-list" && <Order />}</div>
              )}
            </div>
          )}
          {mainMenu === "" && <PerformanceBoard />}
          {subMenu === "performance-board" && <PerformanceBoard />}
          {subMenu === "register-customer" && <Customer />}
          {subMenu === "Tools" && <Tools />}
          {subMenu === "email" && <Email />}
          {subMenu === "list-coupon" && <Coupon />}
          {subMenu === "shipping-setting" && <Shipping />}
        </div>
      </div>
    </div>
  );
};

/**
 * 
 * 
 * <div>
            {activeOption === "Product" && "Add Product"}
            {activeOption === "EditProduct" && "Edit Product"}
            {activeOption === "crop" && "Image Cropper"}
            {activeOption === "category" && "Add Category"}
          </div>



          
 *        {activeOption === "Product" && <Product />}
          {activeOption === "EditProduct" && <EditProduct />}
          {activeOption === "crop" && <Crop />}
          {activeOption === "category" && <Tools />}
 */
