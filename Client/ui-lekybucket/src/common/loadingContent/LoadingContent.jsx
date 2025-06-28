import React from "react";
import loadingContent from "../../assets/images/loading-content.gif";

const LoadingContent = () => {
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <img style={{width:"10%"}} src={loadingContent} alt="loading content" />
    </div>
  );
};

export default LoadingContent;
