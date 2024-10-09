import { CardItem } from "./CardItem";
import GameData from "../app.mock";
import { useEffect, useState } from "react";

export const CardItemList = () => {
  const [cardList, setCardList] = useState([...GameData]);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [openCards, setOpenCards] = useState([]);

  const onClickHandler = (currentId) => {
    const selectedCard = cardList.find((card) => card.id === currentId);

    if (!selectedCard.isOpen && openCards.length < 2) {
      selectedCard.isOpen = true;

      setOpenCards((prev) => [...prev, selectedCard]);

      if (!first) {
        setFirst(selectedCard);
      } else if (!second) {
        setSecond(selectedCard);
        if (first.name === selectedCard.name) {
          setFirst(null);
          setSecond(null);
          setOpenCards([]);
        } else {
          setTimeout(() => {
            setCardList((prev) =>
              prev.map((card) =>
                card.name === first.name || card.name === selectedCard.name
                  ? { ...card, isOpen: false }
                  : card
              )
            );
            setFirst(null);
            setSecond(null);
            setOpenCards([]);
          }, 100);
        }
      }
    }
  };

  return (
    <div className="card-item-list">
      {cardList.map((item) => (
        <CardItem
          key={item.id}
          id={item.id}
          image={item.pic}
          onClick={onClickHandler}
          isOpen={item.isOpen}
        />
      ))}
    </div>
  );
};
