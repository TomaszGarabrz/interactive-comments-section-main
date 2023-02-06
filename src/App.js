import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './style/styles.css';
import ReplyForm from './components/ReplyForm';
import { deleteReply } from './redux/appRedux';
import ReplyEditForm from './components/ReplyEditForm';
import { Button } from './components/utlities/Buttons';
import ReplyIcon from './images/icon-reply.svg';
import EditIcon from './images/icon-edit.svg';
import DeleteIcon from './images/icon-delete.svg';
import { colors } from './style/colors';
import SideWrapper from './components/utlities/SideWrapper';
import { Paragraph } from './components/utlities/Typography';
import TopDetails from './components/utlities/TopDetails';

const App = () => {
  const [currentReplyId, setCurrentReplyId] = useState();
  const [showEditBox, setShowEditBox] = useState(null);
  const commentsList = useSelector((state) => state.app.data);
  const currentUser = useSelector((state) => state.app.currentUser);

  const dispatch = useDispatch();

  const handleReplyId = (id) => {
    setCurrentReplyId(id);
    if (currentReplyId === id) {
      setCurrentReplyId('');
    }
  };

  console.log(currentReplyId);

  const handleDelete = (commentId, replyId) => {
    dispatch(deleteReply(commentId, replyId));
  };

  return (
    <div className="container">
      {commentsList.map((comment, index) => {
        const { author, img, addDate, content, score, id } = comment;

        return (
          <div key={index} className="wrapper">
            <div className="item__wrapper">
              <SideWrapper score={score} commentId={comment.id} />
              <div className="item__wrapper__content">
                <div className="wrapper__conent__top">
                  <TopDetails img={img} author={author} addDate={addDate} />
                  <div className="conent__top__actions">
                    <Button
                      color={colors.moderateBlue}
                      action
                      onClick={() => handleReplyId(comment.id)}
                    >
                      <img src={ReplyIcon} alt="" /> Reply
                    </Button>
                  </div>
                </div>

                <div className="wrapper__conent__center">
                  <Paragraph lineH="1.5" gray>
                    {content}
                  </Paragraph>
                </div>
              </div>
            </div>

            {currentReplyId === comment.id ? (
              <ReplyForm
                setCurrentReplyId={setCurrentReplyId}
                parentId={comment.id}
                elementId={comment.id}
                author={author}
                currentUser={currentUser}
              />
            ) : null}
            {comment.replies.map((reply, index) => {
              const { author, img, replyTo, addDate, content, score, id } =
                reply;

              return (
                <>
                  <div key={index} className="item__wrapper reply">
                    <SideWrapper
                      replyId={id}
                      score={score}
                      reply
                      commentId={comment.id}
                    />
                    <div className="item__wrapper__content">
                      <div className="wrapper__conent__top">
                        <TopDetails
                          img={img}
                          author={author}
                          addDate={addDate}
                        />
                        <div className="conent__top__actions">
                          {currentUser.author === author ? (
                            <>
                              <Button
                                action
                                color={colors.softRed}
                                onClick={() =>
                                  handleDelete({
                                    commentId: comment.id,
                                    replyId: id,
                                  })
                                }
                              >
                                <img src={DeleteIcon} alt="delete" /> Delete
                              </Button>
                              <Button
                                action
                                color={colors.moderateBlue}
                                onClick={() => {
                                  setShowEditBox(id);
                                }}
                              >
                                <img src={EditIcon} alt="edit" /> Edit
                              </Button>
                            </>
                          ) : (
                            <Button
                              color={colors.moderateBlue}
                              action
                              onClick={() => handleReplyId(id)}
                            >
                              <img src={ReplyIcon} alt="" /> Reply
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="wrapper__conent__center">
                        {showEditBox === id ? (
                          <ReplyEditForm
                            content={content}
                            replyTo={replyTo}
                            elementId={id}
                            parentId={comment.id}
                            setShowEditBox={setShowEditBox}
                          />
                        ) : (
                          <Paragraph lineH="1.5" gray>
                            <span>{`${replyTo} `}</span>

                            {content}
                          </Paragraph>
                        )}
                      </div>
                    </div>
                  </div>
                  {currentReplyId == id ? (
                    <ReplyForm
                      setCurrentReplyId={setCurrentReplyId}
                      reply
                      parentId={comment.id}
                      elementId={id}
                      author={author}
                      currentUser={currentUser}
                      img={img}
                    />
                  ) : null}
                </>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default App;
