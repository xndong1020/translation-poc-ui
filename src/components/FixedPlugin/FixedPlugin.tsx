import React, { useState } from "react";
import classnames from "classnames";

import imagine1 from "../../assets/img/sidebar-1.jpg";
// import imagine1 from "assets/img/sidebar-1.jpg";
import imagine2 from "../../assets/img/sidebar-2.jpg";
import imagine3 from "../../assets/img/sidebar-3.jpg";
import imagine4 from "../../assets/img/sidebar-4.jpg";

import Button from "../CustomButtons/Button";
import { Link } from "react-router-dom";

interface Props {
  bgImage: any;
  rtlActive?: any;
  fixedClasses: any;
  bgColor: any;
  handleFixedClick: any;
  handleColorClick: any;
  handleImageClick: any;
}

interface State {
  classes: string;
  bg_checked: boolean;
  bgImage: any;
}

const FixedPlugin = (props: Props) => {
  const initState: State = {
    classes: "dropdown show",
    bg_checked: true,
    bgImage: props.bgImage,
  };

  const [fixedPluginState, setFixedPluginState] = useState(initState);
  const handleClick = () => {
    props.handleFixedClick();
  };
  return (
    <div
      className={classnames("fixed-plugin", {
        "rtl-fixed-plugin": props.rtlActive,
      })}
    >
      <div id="fixedPluginClasses" className={props.fixedClasses}>
        <div onClick={handleClick}>
          <i className="fa fa-cog fa-2x" />
        </div>
        <ul className="dropdown-menu">
          <li className="header-title">SIDEBAR FILTERS</li>
          <li className="adjustments-line">
            <div className="switch-trigger">
              <div>
                <span
                  className={
                    props.bgColor === "purple"
                      ? "badge filter badge-purple active"
                      : "badge filter badge-purple"
                  }
                  data-color="purple"
                  onClick={() => {
                    props.handleColorClick("purple");
                  }}
                />
                <span
                  className={
                    props.bgColor === "blue"
                      ? "badge filter badge-blue active"
                      : "badge filter badge-blue"
                  }
                  data-color="blue"
                  onClick={() => {
                    props.handleColorClick("blue");
                  }}
                />
                <span
                  className={
                    props.bgColor === "green"
                      ? "badge filter badge-green active"
                      : "badge filter badge-green"
                  }
                  data-color="green"
                  onClick={() => {
                    props.handleColorClick("green");
                  }}
                />
                <span
                  className={
                    props.bgColor === "red"
                      ? "badge filter badge-red active"
                      : "badge filter badge-red"
                  }
                  data-color="red"
                  onClick={() => {
                    props.handleColorClick("red");
                  }}
                />
                <span
                  className={
                    props.bgColor === "orange"
                      ? "badge filter badge-orange active"
                      : "badge filter badge-orange"
                  }
                  data-color="orange"
                  onClick={() => {
                    props.handleColorClick("orange");
                  }}
                />
              </div>
            </div>
          </li>
          <li className="header-title">Images</li>
          <li className={fixedPluginState.bgImage === imagine1 ? "active" : ""}>
            <Button
              className="img-holder switch-trigger"
              component={Link}
              onClick={() => {
                setFixedPluginState({
                  ...fixedPluginState,
                  bgImage: imagine1,
                });
                props.handleImageClick(imagine1);
              }}
            >
              <img src={imagine1} alt="..." />
            </Button>
          </li>
          <li className={fixedPluginState.bgImage === imagine2 ? "active" : ""}>
            <Button
              className="img-holder switch-trigger"
              component={Link}
              onClick={() => {
                setFixedPluginState({
                  ...fixedPluginState,
                  bgImage: imagine2,
                });
                props.handleImageClick(imagine2);
              }}
            >
              <img src={imagine2} alt="..." />
            </Button>
          </li>
          <li className={fixedPluginState.bgImage === imagine3 ? "active" : ""}>
            <Button
              className="img-holder switch-trigger"
              component={Link}
              onClick={() => {
                setFixedPluginState({
                  ...fixedPluginState,
                  bgImage: imagine3,
                });
                props.handleImageClick(imagine3);
              }}
            >
              <img src={imagine3} alt="..." />
            </Button>
          </li>
          <li className={fixedPluginState.bgImage === imagine4 ? "active" : ""}>
            <Button
              className="img-holder switch-trigger"
              component={Link}
              onClick={() => {
                setFixedPluginState({
                  ...fixedPluginState,
                  bgImage: imagine4,
                });
                props.handleImageClick(imagine4);
              }}
            >
              <img src={imagine4} alt="..." />
            </Button>
          </li>
          <li className="adjustments-line" />
        </ul>
      </div>
    </div>
  );
};

export default FixedPlugin;
