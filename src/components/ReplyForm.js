import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReply } from '../redux/appRedux';
import { Button } from './utlities/Buttons';
import { TextArea } from './utlities/Form';

const ReplyForm = ({
  reply,
  parentId,
  setCurrentReplyId,
  elementId,
  author,
  currentUser,
}) => {
  const currentEditItem = useSelector((state) => state.app.currentEditItem);

  const [editItem, setEditItem] = useState();
  const [inputValue, setInputValue] = useState(
    `@${author} ${editItem ? editItem.content : ''}`
  );
  const stateId = useSelector((state) => state.app.stateId);

  useEffect(() => {
    setEditItem(currentEditItem);
  }, []);

  const dispatch = useDispatch();

  const handleAddReply = () => {
    const removeFirstWord = (str) => {
      const indexOfSpace = inputValue.indexOf(' ');

      return inputValue.slice(indexOfSpace + 1);
    };

    const newObj = {
      parentId,
      currentUser: '',
      score: 0,
      addDate: '26 dec 2022',
      id: stateId,
      content: removeFirstWord(inputValue),
      replyTo: `@${author}`,
      elementId,
      author: currentUser.author,
      img: currentUser.img,
    };

    dispatch(addReply(newObj));
    setCurrentReplyId('');
  };

  return (
    <>
      <div className={`reply__form__wrapper ${reply ? 'reply' : ''}`}>
        <img className="reply__form__img" src={currentUser.img} alt="img" />
        <div className="reply__form__input">
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="reply__form__button">
          <Button formButton onClick={() => handleAddReply()}>
            REPLY
          </Button>
        </div>
      </div>
    </>
  );
};

export default ReplyForm;
