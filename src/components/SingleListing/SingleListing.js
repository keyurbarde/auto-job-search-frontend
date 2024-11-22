import "./SingleListing.css";

const SingleListing = ({ listing }) => {
  return (
    <>
      <h2>{listing.Title}</h2>
      <p>{listing.Score}</p>
      <p>{listing.Company}</p>
      <p>{listing.Location}</p>
      <p>
        <a href={listing.URL}>URL</a>
      </p>
    </>
  );
};

export default SingleListing;
