import buttonGroupStyle from "../../material-dashboard-react/buttonGroupStyle";
import customCheckboxRadioSwitch from "../../material-dashboard-react/customCheckboxRadioSwitch";
import { cardTitle } from "../../material-dashboard-react";
import { Theme } from "@material-ui/core";

const extendedTablesStyle = (theme: Theme) => ({
  ...customCheckboxRadioSwitch,
  ...buttonGroupStyle,
  right: {
    textAlign: "right" as "right",
  },
  center: {
    textAlign: "center" as "center",
  },
  description: {
    maxWidth: "150px",
  },
  actionButton: {
    margin: "0 0 0 5px",
    padding: "5px",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      marginRight: "0px",
    },
  },
  icon: {
    verticalAlign: "middle",
    width: "17px",
    height: "17px",
    top: "-1px",
    position: "relative" as "relative",
  },
  imgContainer: {
    width: "120px",
    maxHeight: "160px",
    overflow: "hidden",
    display: "block",
  },
  img: {
    width: "100%",
    height: "auto",
    verticalAlign: "middle",
    border: "0",
  },
  tdName: {
    minWidth: "200px",
    fontWeight: 400,
    fontSize: "1.5em",
  },
  tdNameAnchor: {
    color: "#3C4858",
  },
  tdNameSmall: {
    color: "#999999",
    fontSize: "0.75em",
    fontWeight: 300,
  },
  tdNumber: {
    textAlign: "right" as "right",
    minWidth: "145px",
    fontWeight: 300,
    fontSize: "1.3em !important",
  },
  tdNumberSmall: {
    marginRight: "3px",
  },
  tdNumberAndButtonGroup: {
    lineHeight: "1 !important",
  },
  positionAbsolute: {
    position: "absolute" as "absolute",
    right: "0",
    top: "0",
  },
  customFont: {
    fontSize: "16px !important",
  },
  actionButtonRound: {
    width: "auto",
    height: "auto",
    minWidth: "auto",
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
});

export default extendedTablesStyle;
