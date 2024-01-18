import "./plan.css"
import Header from "../../components/Header"
import HeaderImage from "../../images/header_bg_4.jpg"
import Card from "../../UI/Card"
import { plan, plans } from "../../data"
import { useNavigate } from "react-router-dom"

const Plan = () => {

  const nav = useNavigate();
  return (
    <>
      <Header title="Membership Plans" image={HeaderImage}>
      {/* lla velit elementum lorem,at aliquam ante leo eu risus. Duis quis magna leo. Suspendisse potenti. */}
      </Header>
      <section className="plans">
        <div className="container planstocontainer">
          {
            plans.map(({id, name, desc, price, features}) => {
              return <Card key={id} className="plan">
                <h3>{name}</h3>
                <small>{desc}</small>
                <h1>{`฿${price}`}</h1><h2>/M</h2>
                <h4>Features</h4>
                {
                  features.map(({feature, available}, index) => {
                    return <p key={index} className={!available ? 'disabled' : ''}>{feature}</p>
                  })
                }
                <button className="bttn lg" onClick={()=>nav("/portal/plan/checkout")}>Choose Plan</button>
              </Card>
            })
          }
        </div>
      </section>
    </>
  )
}

export default Plan