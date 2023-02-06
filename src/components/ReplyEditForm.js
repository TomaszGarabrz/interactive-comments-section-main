import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editReply } from '../redux/appRedux';
import { Button } from './utlities/Buttons';
import { TextArea } from './utlities/Form';

const ReplyEditForm = ({
  content,
  replyTo,
  setShowEditBox,
  elementId,
  parentId,
}) => {
  const [currentValue, setCurrentValue] = useState(`${replyTo} ${content}`);
  const dispatch = useDispatch();

  const handleUpdate = (elementId) => {
    const removeFirstWord = (str) => {
      const indexOfSpace = currentValue.indexOf(' ');

      return currentValue.slice(indexOfSpace + 1);
    };

    dispatch(
      editReply({
        commentId: parentId,
        replyId: elementId,
        content: removeFirstWord(currentValue),
      })
    );
    setCurrentValue('');
  };

  return (
    <div className="reply__edit__wrapper">
      <div className="reply__form__input">
        <TextArea
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
        />
      </div>
      <Button
        formButton
        onClick={() => {
          handleUpdate(elementId);
          setShowEditBox();
        }}
        className="button button-update"
      >
        UPDATE
      </Button>
    </div>
  );
};

export default ReplyEditForm;
