import { Schema } from "mongoose";
import { FC, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { customId } from "../App";
import { useSession } from "../pages/hooks/useSession";

interface IVote {
  id: Schema.Types.ObjectId;
  isVoteOnTopic: boolean;
}

const VoteComponent: FC<IVote> = ({ id, isVoteOnTopic }) => {
  const { session } = useSession();
  const [topicVotes, setTopicVotes] = useState<Schema.Types.ObjectId[]>([]);
  const [commentVotes, setCommentVotes] = useState<Schema.Types.ObjectId[]>([]);
  useEffect(() => {
    const getTopicAndCommentVotes = async () => {
      const getTopicVotes = await fetch(`/api/get/vote/on/topic/${id}`, {
        method: "GET",
      });
      const topicVoteResponse = await getTopicVotes.json();
      setTopicVotes(topicVoteResponse.data?.votes);


      const getCommentVotes = await fetch(`/api/get/vote/on/comment/${id}`, {
        method: "GET",
      });
      const commentVoteResponse = await getCommentVotes.json();
      setCommentVotes(commentVoteResponse.data?.votes);
    };
    
    getTopicAndCommentVotes();
  }, []);

  const renderVotes = useCallback(() => {
    const VoteHandler = async (type: "add" | "remove") => {
      if (session && session._id && isVoteOnTopic === true) {
        switch (type) {
          case "add":
            const upVote = await fetch(`/api/vote/topic/${id}`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                payload: "add",
              },
              body: JSON.stringify({ increaseVote: session._id }),
            });

            if (upVote.status === 200) {
              const getVotes = await fetch(`/api/get/vote/${id}`, {
                method: "GET",
              });
              const upVoteResponse = await getVotes.json();
              setTopicVotes(upVoteResponse.data?.votes);
              toast.success("vote added");
            } else if (upVote.status === 300) {
              toast.error("You liked this topic already.");
            } else if (upVote.status === 400) {
              toast.error(
                "Please login or register to vote and downvote this topic"
              );
            } else {
              toast.error("server error");
            }
            break;

          case "remove":
            const downVote = await fetch(`/api/vote/topic/${id}`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                  payload: "remove",
              },
              body: JSON.stringify({ increaseVote: session._id }),
            });
            if (downVote.status === 200) {
              const downVote = await fetch(`/api/get/vote/on/topic/${id}`, {
                method: "GET",
              });
              const downVoteResponse = await downVote.json();
              setTopicVotes(downVoteResponse.data.votes);
              toast.error("You have downvoted this topic");
            }

            if (downVote.status === 300) {
              return toast.error("You down voted this topic already.", {
                toastId: customId,
              });
            }
            if (downVote.status === 400) {
              toast.error(
                "vote cannot be downvoted at this time, try again later"
              );
            }
            break;

          default:
            break;
        }
      } else if (session && session._id && isVoteOnTopic === false) {
        switch (type) {
          case "add":
            const upVote = await fetch(`/api/vote/comment/${id}`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                  payload: "add",
              },
              body: JSON.stringify({ increaseVote: session._id }),
            });

            if (upVote.status === 200) {
              const getVotes = await fetch(`/api/get/vote/on/comment/${id}`, {
                method: "GET",
              });
              const upVoteResponse = await getVotes.json();
              setCommentVotes(upVoteResponse.data.votes);
              toast.success("vote added");
            }
            if (upVote.status === 300) {
              toast.error("You liked this comment already.");
            }
            if (upVote.status === 400) {
              toast.error(
                "Please login or register to vote and downvote this comment"
              );
            }
            break;

          case "remove":
            const downVote = await fetch(`/api/vote/comment/${id}`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                  payload: "remove",
              },
              body: JSON.stringify({ increaseVote: session._id }),
            });
            if (downVote.status === 200) {
              const downVote = await fetch(`/api/get/vote/on/comment/${id}`, {
                method: "GET",
              });
              const downVoteResponse = await downVote.json();
              setCommentVotes(downVoteResponse.data.votes);
              toast.error("You have downvoted this comment");
            }

            if (downVote.status === 300) {
              return toast.error("You down voted this comment already.", {
                toastId: customId,
              });
            }
            if (downVote.status === 400) {
              toast.error(
                "vote cannot be downvoted at this time, try again later"
              );
            }
            break;

          default:
            break;
        }
      } else {
        toast.error("Please login or register to vote and downvote");
      }
    };

    return (
      <Vote>
        <div className="vote_items">
          <div>
            <h5 onClick={() => VoteHandler("add")}>+</h5>
            {isVoteOnTopic ? (
              <h3 className="counter">
                {topicVotes && topicVotes.length > 0 ? topicVotes.length : "0"}
              </h3>
            ) : (
              <h3 className="counter">
                {commentVotes && commentVotes.length > 0 ? commentVotes.length: "0"}
              </h3>
            )}
            <h5 onClick={() => VoteHandler("remove")}>-</h5>
          </div>
        </div>
      </Vote>
    );
  }, [commentVotes, id, isVoteOnTopic, session, topicVotes]);

  return <> {renderVotes()}</>;
};

export default VoteComponent;
const Vote = styled.div`
  .vote_items {
    display: flex;
    width: 3rem;
    background: var(--very-light-gray);
    padding: 1rem;
    border-radius: 0.8rem;
    div {
      text-align: center;
      justify-content: center;
      margin: 0 auto;
    }
  }

  h5 {
    color: var(--grayish-blue);
    :hover {
      cursor: pointer;
    }
  }

  .counter {
    color: var(--moderate-blue);
    padding: 3px 0 3px 0;
  }
`;
