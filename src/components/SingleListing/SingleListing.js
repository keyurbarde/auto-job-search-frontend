import "./SingleListing.css";

const SingleListing = ({ listing }) => {
  return (
    <>
      <h2>{listing.position}</h2>
      <p>{listing.company}</p>
      <p>{listing.location}</p>
      <p>{listing.posted}</p>
    </>
  );
};

export default SingleListing;
