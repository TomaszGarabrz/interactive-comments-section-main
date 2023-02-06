import styled from 'styled-components';
import { Button } from './Buttons';
import { useDispatch } from 'react-redux';
import { addScore, removeScore } from '../../redux/appRedux';
import { colors } from '../../style/colors';

const SideWrapper = ({ replyId, score, reply, commentId }) => {
  const dispatch = useDispatch();

  const handleAddScore = (commentId, replyId) => {
    dispatch(addScore(commentId, replyId));
  };

  const handleRemoveScore = (commentId, replyId) => {
    dispatch(removeScore(commentId, replyId));
  };

  return (
    <Wrapper>
      {reply ? (
        <>
          <Button
            color={colors.lightBlue}
            score
            onClick={() =>
              handleAddScore({
                commentId: commentId,
                replyId: replyId,
              })
            }
          >
            +
          </Button>
          <p>{score}</p>
          <Button
            color={colors.lightBlue}
            score
            onClick={() =>
              handleRemoveScore({
                commentId: commentId,
                replyId: replyId,
              })
            }
          >
            -
          </Button>
        </>
      ) : (
        <>
          <Button
            color={colors.lightBlue}
            score
            onClick={() =>
              handleAddScore({
                commentId: commentId,
                replyId: null,
              })
            }
          >
            +
          </Button>
          <p>{score}</p>
          <Button
            color={colors.lightBlue}
            score
            onClick={() =>
              handleRemoveScore({
                commentId: commentId,
                replyId: null,
              })
            }
          >
            -
          </Button>
        </>
      )}
    </Wrapper>
  );
};

export default SideWrapper;

const Wrapper = styled.div`
  background-color: ${colors.lightGray};
  width: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;

  p {
    color: ${colors.moderateBlue};
    font-weight: bold;
  }
`;
