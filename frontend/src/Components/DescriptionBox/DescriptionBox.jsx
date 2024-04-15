import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-navbox">Description</div>
        <div className="descriptionbox-navbox fade">Reviews (372)</div>
      </div>
      <div className="descriptionbox-desc">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          eaque, at molestiae officia ab laudantium, nulla asperiores non itaque
          incidunt ex assumenda facere veritatis. Aliquid laudantium at
          veritatis, fugit beatae nihil tenetur voluptate adipisci laboriosam
          natus facilis molestiae. Eos ipsam harum, illum cumque debitis soluta
          veniam odit error. Officiis, sequi.-
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          sapiente possimus rerum ab voluptas ex explicabo aperiam, delectus
          velit voluptates vel distinctio dicta fuga veritatis ipsa quas?
          Exercitationem, impedit nostrum?
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
