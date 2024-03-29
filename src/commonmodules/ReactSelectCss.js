export const handleReactSelectCss = (name,error, flag, type,settings,opacityflag) => {
    var pointers = "fill";
    var pointer1 = "";
    if (type === "view") {
      pointers = "none";
      pointer1 = "fill";
    }
    var reactslctw = "";
    switch (name) {
      case "normal": {
        reactslctw = "12rem";
        break;
      }
      case "small": {
        reactslctw = "9rem";
        break;
      }
      case "xmsmall": {
        reactslctw = "100px";
        break;
      }
      case "xsmall": {
        reactslctw = "80px";
        break;
      }
      case "large": {
        reactslctw = "13rem";
        break;
      }
      case "xlarge":{
        reactslctw = "25.5rem";
        break;
      }
      case "xlarge1": {
        reactslctw = "24rem";
        break;
      }
      case "xlarge2": {
        reactslctw = "29rem";
        break;
      }
      case "xlarge3": {
        reactslctw = "21rem";
        break;
      }
      case "xlarge4": {
        reactslctw = "49.5rem";
        break;
      }

      case "xlarge5": {
        reactslctw = "18.5rem";
        break;
      }
      case "xlarge6": {
        reactslctw = "34rem";
        break;
      }
      default:
        reactslctw = "392px";
        break;
    }
    return {
      control: (styles, state) => ({
        ...styles,
        width: reactslctw,
        // overflowY: "auto",
        height: flag===true ?"49px":opacityflag ? "49px" :"35px",
        maxHeight: flag===true ?"49px" :opacityflag ? "49px" :"35px",
        borderRadius:"5px",
        fontSize: "16px",
        marginTop: "-2px",
        border: error?"2px solid red !important":state.isFocused ? "none" : "none",
        backgroundColor:flag===true ?" rgb(229 231 235 / var(--tw-bg-opacity))":settings===true?"#3b3b3b": opacityflag === true ? "rgb(229 231 235 / 0.4)" :"white",
        // outline: state.isFocused?"none !important":"none",
        // filter: state.isFocused
        //   ? "drop-shadow(5px 5px 2px black) !important"
        //   : "none",
        boxShadow: "2px solid black !important",
        fontWeight: "520",
        cursor: type === "view" ? "auto" : "pointer",
        pointerEvents: pointer1,
        outline: "none",
        paddingLeft: "5px",
        paddingRight: "5px",
       
        // boxShadow: "inset 0 0 0.2vh 0.1vh rgb(0, 0, 0, 0.6)",
      }),
      menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
      // menu: (provided) => ({ ...provided, zIndex: 9999, width: "460px" }),
      // menuList: (provided) => ({
      //   ...provided,
      //   zIndex: 9999,
      //   width: "470px",
      //   maxHeight: "168px",
      // }),
      menu: (styles) => {
        return {
          ...styles,
          width: "100%",
          marginTop:"0px",
          border: "2px solid black  !important",
          backgroundColor: "#fff",
          borderRadius: "8px",
          color:"black"
        };
      },
      menuList: (styles) => {
        return {
          ...styles,
          width: "100%",
          maxHeight: "150px",
        };
      },
      option: (styles, state) => {
        return {
          ...styles,
          width: "100%",
          //   borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "500",
          fontSize: "16px",
          color:"black",
  
          "&:hover": {
            backgroundColor: state.isSelected ? "#B7D6F2" : "#EBF4F8",
            color: "#0D4459",
          },
          backgroundColor:
            state.isFocused | state.isSelected ? "#B7D6F2" : "white",
          // color: state.isFocused | state.isSelected ? "#0D4459" : "#white",
          fontWeight: "500",
        };
      },
  
      valueContainer: (styles, state) => ({
        ...styles,
        padding: "0 0.1vw 0.1vh 0.3vh",
        pointerEvents: pointers,
        color:"black"
      }),
  
      indicatorSeparator: (state) => ({
        display: "none",
      }),
      indicatorsContainer: (provided, state) => ({
        ...provided,
        color:"black"
        //   display: "none",
      }),
  
      input: (provided, state) => ({
        ...provided,
        color: "black",
      }),
      singleValue: (provided, state) => ({
        ...provided,
        color:  settings===true ? "white":"black", // Change 'white' and 'black' to desired colors
      }),
    };
  };
  