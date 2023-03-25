function CardInfo({cardInfo}) {

  const fullCardInfo = [];

  for (const description in cardInfo) {
    const newRow = (
      <div>
        {description}: {cardInfo[description]}
      </div>
    );
    fullCardInfo.push(newRow);
  }

  return (
    <div className="cardInfo">
      {fullCardInfo}
    </div>
  )
}

export default CardInfo;