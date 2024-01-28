import React from 'react'
import Header from "../../components/Header"
import HeaderImage from "../../images/header_bg_3.jpg"
const Classes = () => {
  return (
    <>
    <Header title="Classes" image={HeaderImage}>
      {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lacinia, augue ac laoreet ultricies, */}
      {/* nulla velit elementum lorem,at aliquam ante leo eu risus. Duis quis magna leo. Suspendisse potenti. */}
    </Header>
    <section className="gallery">
      {/* <div className="container gallerytocontainer"> */}
        {/* {
          images.map((imagee, index) => {
            return <article key={index}>
              <img src={imagee} alt={`Gallery Image ${index + 1}`} />
            </article>
          })
        } */}
        <p className="text-center">In progress...</p>
      {/* </div> */}
    </section>
  </>
  )
}

export default Classes