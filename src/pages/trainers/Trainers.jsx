import "./trainers.css";
import Header from "../../components/Header";
import HeaderImage from "../../images/header_bg_5.jpg";
import Trainer from "../../components/Trainer";
import { trainers } from "../../data";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { BsLine } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../services/LocalAxiosInstance";
import Card from "../../UI/Card";
import halfstar from "../../assets/halfstar.png";
import fullstar from "../../assets/fullstar.png";
import logo from "../../assets/logotrainer.png";
import LoadingPopup from "../../commonmodules/Loading";
import noAvatar from "../../assets/person/noAvatar.png";
const Trainers = () => {
  let gettrainerlisturl = "users/trainerlist";
  let loginDetails = useSelector((e) => e.logindetails.data);

  const socials = [
    { icon: <BsInstagram />, link: "https://instagram.com/" },

    { icon: <AiOutlineTwitter />, link: "https://twitter.com/" },
    { icon: <FaFacebookF />, link: "https://facebook.com/" },
    { icon: <BsLine />, link: "https://line.me/th/" },
  ];
  console.log(loginDetails);
  let [loading, setLoading] = useState(false);
  const [trainerdata, settrainerdata] = useState([]);
  const gettrainers = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.post(gettrainerlisturl, {
        gymId: loginDetails.gymId,
      });

      if (res.status === 200) {
        if (res.data.status) {
          console.log(res?.data?.data);
          settrainerdata([...res.data.data.listOfTrainers]);
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
    setLoading(false)
  };
  useEffect(() => {
    gettrainers();
  }, []);
  useEffect(() => {
    // Scroll to the top whenever the component mounts or tab changes
    window.scrollTo(0, 0);

    // If you're using React Router, you can listen for route changes
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    // Attach the event listener for route changes
    // Remove the listener on component unmount to avoid memory leaks
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []); // Empty dependency array ensures this effect runs only once
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
            <img src={fullstar} alt="rating"/>
          </>
        )
    
    }
  };

  return (
    <>
      {/* <Header title="Our Trainers" image={HeaderImage}> */}

      {/* </Header> */}
      <section className="trainers lg:-ml-28 sm:ml-0 md:ml-0">
        <div className="container trainerstocontainer">


          {trainerdata.map((d, i) => (
            <Card className="trainer">
              <div className="trainertoimg">
                <img src={d?.image ? "data:image/png;base64," + d?.image: noAvatar} alt={d?.trainerName} />
              </div>
              <div className="text-2xl font-semibold mt-8">
                {d?.trainerName}
              </div>
              <p className="text-lg font-semibold mt-2">{d?.categoryName}</p>

              {d?.rating !== 0 ? (
                <div className="flex items-center justify-center mt-2 mr-24">
                  
                    {/* {Math.round(d?.rating)}{" "} */}
{getrating(Math.round(d?.rating))}
                 
                  {/* {d?.rating ? "⭐" : ""} */}
                </div>
              ) : (
                <></>
              )}

              <div className="trainertosocials">
                {socials.map(({ icon, link }, index) => {
                  return (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noreffer noopener"
                    >
                      {icon}
                    </a>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

      </section>

      {loading && (
        <LoadingPopup state={loading} message="Loading... Please Wait" />
      )}

    </>
  );
};

export default Trainers;
