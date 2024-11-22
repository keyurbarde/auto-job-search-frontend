import "./SingleListing.css";
import extIcon from "../../svgs/external-link.svg";

const SingleListing = ({ listing }) => {
  return (
    <div className="listing-container">
      <div className="listing-title-company">
        <h2>{listing.Title}</h2>
        <p>{listing.Company}</p>
      </div>
      <div className="listing-rest">
        <div className="listing-loc-rating">
          <p>{listing.Score.toFixed(2) * 100}%</p>
          <p>{listing.Location}</p>
        </div>
        <div className="listing-url">
          <a href={listing.URL} target="_blank">
            <img className="listing-ext-icon" src={extIcon} alt="URL"></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SingleListing;
