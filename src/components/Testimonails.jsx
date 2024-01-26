import { useEffect, useState } from "react"
import SectionHead from "./SectionHead"
import { ImQuotesLeft } from "react-icons/im"
import Card from "../UI/Card"
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io"
import { testimonials } from "../data"
import axiosInstance from "../services/LocalAxiosInstance"
import { useSelector } from "react-redux"
import avatar from "../assets/person/noAvatar.png"
import halfstar from "../assets/halfstar.png";
import fullstar from "../assets/fullstar.png";

const Testimonails = () => {
  let loginDetails = useSelector((e)=>e.logindetails.data);
  let [feedbackdata,setfeedbackdata] = useState([])

  let getfeedbackgymurl = "feedback/list"
  const getfeedback = async () => {
    try {
      const res = await axiosInstance.post(getfeedbackgymurl, {
        gymId: parseInt(loginDetails?.gymId),
      });

      if (res.status === 200) {
        if (res.data.status) {
          console.log(res?.data?.data);
          setfeedbackdata([...res.data.data]);
        } else {
          // const l = { ...modalpopupdata };
          //         l.show=true
          //         l.errormsg=res.data.message
          //         l.logout=false
          //         setmodalpopupdata({...l})
        }
      } else if (res.response.status === 401) {
        // const l = { ...modalpopupdata };
        // l.show=true
        // l.errormsg="Session Expired. Please login again..."
        // l.logout=true
        // setmodalpopupdata({...l})
      } else {
        // const l = { ...modalpopupdata };
        // l.show=true
        // l.errormsg="Unable to Connect.Please try again later"
        // l.logout=false
        // setmodalpopupdata({...l})
      }
    } catch (err) {
      // const l = { ...modalpopupdata };
      // l.show=true
      // l.errormsg="Unable to Connect.Please try again later"
      // l.logout=false
      // setmodalpopupdata({...l})
    }
  };
  useEffect(() => {
    getfeedback();
  }, []);
  const [index, setIndex] = useState(0);
  // const {rating,message,userName} = feedbackdata[index];

  const prevTestimomailsHandler = () => {
    setIndex(prev => prev - 1);

    if(index <= 0) {
      setIndex(feedbackdata.length - 1);
    }
  }

  const nextTestimomailsHandler = () => {
    setIndex(prev => prev + 1);

    if(index >= feedbackdata.length - 1) {
      setIndex(0);
    }
  }

  const getrating = (ratingval) => {
    switch (ratingval) {
      case 0.5:
        return <img src={halfstar} alt="half" />;
      case 1:
        return <img src={fullstar} alt="one" />;
      case 1.5:
        return (
          <div className="w-8 h-8 flex">
            <img src={fullstar} alt="oneandhalf" />
            <img src={halfstar} alt="oneandhalf" />{" "}
          </div>
        );
      case 2:
        return (
          <div className="w-8 h-8 flex">
            <img src={fullstar} alt="two" />
            <img src={fullstar} alt="two" />
          </div>
        );
      case 2.5:
        return (
          <div className="w-8 h-8 flex">
            <img src={fullstar} alt="two" />
            <img src={fullstar} alt="two" />
            <img src={halfstar} alt="two" />
          </div>
        );
      case 3:
        return (
          <div className="w-8 h-8 flex">
            <img src={fullstar} alt="three" />{" "}
            <img src={fullstar} alt="three" />{" "}
            <img src={fullstar} alt="three" />{" "}
            <img src={fullstar} alt="three" />
          </div>
        );
      case 3.5:
        return (
          <div className="w-8 h-8 flex">
            <img src={fullstar} alt="three" />
            <img src={fullstar} alt="three" />
            <img src={fullstar} alt="three" />
            <img src={halfstar} alt="half" />
          </div>
        );
      case 4:
        return (
          <div className="w-8 h-8 flex">
            <img src={fullstar} alt="four" /> <img src={fullstar} alt="four" />{" "}
            <img src={fullstar} alt="four" /> <img src={fullstar} alt="four" />
          </div>
        );
      case 4.5:
        return (
          <div className="w-8 h-8 flex">
            <img src={fullstar} alt="four" /> <img src={fullstar} alt="four" />{" "}
            <img src={fullstar} alt="four" /> <img src={fullstar} alt="four" />{" "}
            <img src={halfstar} alt="four" />
          </div>
        );
      case 5:
        return (
          <div className="w-8 h-8 flex">
            <img src={fullstar} alt="five" /> <img src={fullstar} alt="five" />{" "}
            <img src={fullstar} alt="five" /> <img src={fullstar} alt="five" />{" "}
            <img src={fullstar} alt="five" />
          </div>
        );

      default:
        return (
          <>
            {/* <img src={fullstar} alt="rating"/> */}
          </>
        )
    
    }
  };

  return (
    <section className="testimonails">
      <div className="container testimonialstocontainer">
        <SectionHead icon={<ImQuotesLeft />} title="Testimonails" className="testimonailstohead" />
        <Card className="testimonail">
          <div className="testimonailstoavatar">
            <img src={avatar} alt="" />
          </div>
          <div className="flex items-center justify-center mr-20">{getrating(Math.round(feedbackdata[index]?.rating))}</div>
          <p className="testimonailstoquote">{feedbackdata[index]?.message}</p>
          <div className="text-base">{feedbackdata[index]?.userName}</div>
          {/* <small className="testimonailstotitle">{job}</small> */}
        </Card>
        <div className="testimonailstobttn-container">
          <button className="testimonailstobttn" onClick={prevTestimomailsHandler}><IoIosArrowDropleftCircle /></button>
          <button className="testimonailstobttn" onClick={nextTestimomailsHandler}><IoIosArrowDroprightCircle /></button>
        </div>
      </div>
    </section>
  )
}

export default Testimonails
