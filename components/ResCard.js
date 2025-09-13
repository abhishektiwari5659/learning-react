

const ResCard = ({ name, cuisine, image, price, deliveryTime, onClick }) => {
  return (
    <div className="res-card" onClick={onClick}>
      <img className="res-log" src={image} alt={name} />
      <p><strong>{name}</strong></p>
      <p>{cuisine}</p>
      <p>{price}</p>
      <p>🛵 {deliveryTime}</p>
    </div>
  );
};

export default ResCard;
