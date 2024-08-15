import React from "react";

const Resources: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  };

  const itemStyle: React.CSSProperties = {
    width: "200px",
    textAlign: "center",
    position: "relative",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "auto",
    borderRadius: "4px",
  };

  const textStyle: React.CSSProperties = {
    marginTop: "10px",
    fontWeight: "bold",
  };

  const actionsStyle: React.CSSProperties = {
    display: "none",
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
  };

  const buttonStyle: React.CSSProperties = {
    margin: "5px",
    padding: "5px 10px",
    fontSize: "14px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "4px",
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const actions = e.currentTarget.querySelector(".actions") as HTMLElement;
    if (actions) actions.style.display = "block";
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const actions = e.currentTarget.querySelector(".actions") as HTMLElement;
    if (actions) actions.style.display = "none";
  };

  const handleViewClick = (src: string) => {
    window.open(src, "_blank");
  };

  const handleDownloadClick = (src: string, alt: string) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = alt;
    link.click();
  };

  const resources = [
    { src: "/lckhp-logo.png", alt: "LCKHP Club Logo", text: "LCKHP Club Logo" },
    {
      src: "/lckhp-president-logo-2425.png",
      alt: "LCKHP President Logo 24/25",
      text: "LCKHP President Logo 24/25",
    },
    {
      src: "/lckhp-president-logo-2324.png",
      alt: "LCKHP President Logo 23/24",
      text: "LCKHP President Logo 23/24",
    },
  ];

  const googleDriveResources = [
    {
      src: "/ldc325r-dp-logo-2425.png",
      alt: "District Resources",
      text: "District Resources",
      url: "https://drive.google.com/drive/folders/1X7ayyyaa_shF21ux5kThJe0EIyEQqFz3?usp=sharing", // Replace with actual link
    },
    {
      src: "/gdrive.png",
      alt: "District Resources",
      text: "Cluster Resources",
      url: "https://drive.google.com/drive/folders/1ik1mRIGgTNpS7tuK39IPO-ZexXbOkpT9", // Replace with actual link
    },
  ];

  const clickableItemStyle: React.CSSProperties = {
    ...itemStyle,
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      {resources.map((resource, index) => (
        <div
          key={index}
          style={itemStyle}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <img src={resource.src} alt={resource.alt} style={imageStyle} />
          <div style={textStyle}>{resource.text}</div>
          <div className="actions" style={actionsStyle}>
            <button
              style={buttonStyle}
              onClick={() => handleViewClick(resource.src)}
            >
              View
            </button>
            <button
              style={buttonStyle}
              onClick={() => handleDownloadClick(resource.src, resource.alt)}
            >
              Download
            </button>
          </div>
        </div>
      ))}
      {googleDriveResources.map((resource, index) => (
        <div
          key={index}
          style={clickableItemStyle}
          onClick={() => window.open(resource.url, "_blank")}
        >
          {resource.src && (
            <img src={resource.src} alt={resource.alt} style={imageStyle} />
          )}
          <div style={textStyle}>{resource.text}</div>
        </div>
      ))}
    </div>
  );
};

export default Resources;
