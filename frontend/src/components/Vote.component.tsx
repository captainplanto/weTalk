import { Schema } from "mongoose";
import React, { FC, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { customId } from "../App";

interface IVote {
  id: Schema.Types.ObjectId;
}
const VoteComponent: FC<IVote> = ({ id }) => {
  const sessionId = localStorage.getItem("item");
  const sessionUser = sessionId ? JSON.parse(sessionId) : "";
  const currentUser: Schema.Types.ObjectId = sessionUser.id;
  const [votes, setVotes] = useState<any>();

  useEffect(() => {
    const myVotes = async () => {
      const getVotes = await fetch(`/api/get/vote/${id}`, {
        method: "GET",
      });
      const upVoteResponse = await getVotes.json();
      setVotes(upVoteResponse.data.votes);
console.log(upVoteResponse.data.votes)
    };
    myVotes();
  }, []);

  const renderVotes = useCallback(() => {
    const VoteHandler = async (type: "add" | "remove") => {
      switch (type) {
        case "add":
          if (currentUser) {
            const upVote = await fetch(`/api/upvotetopic/${id}`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ increaseVote: currentUser }),
            });

            if (upVote.status === 200) {
              const getVotes = await fetch(`/api/get/vote/${id}`, {
                method: "GET",
              });
              const upVoteResponse = await getVotes.json();
              setVotes(upVoteResponse.data.votes);
              toast.success("vote added");
            }
            if (upVote.status === 300) {
              toast.error("You liked this topic already.");
            }
            if (upVote.status === 400) {
              toast.error(
                "Please login or register to vote and downvote this topic"
              );
            }
          } else {
          toast.error("Please login or register to vote and downvote this topic");
          }
          break;

        case "remove":
          const downVote = await fetch(`/api/downvotetopic/${id}`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ increaseVote: currentUser }),
          });
          if (downVote.status === 200) {
            const downVote = await fetch(`/api/get/vote/${id}`, {
              method: "GET",
            });
            const downVoteResponse = await downVote.json();
            setVotes(downVoteResponse.data.votes);
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
    };

    return (
      <Vote>
        <div className="vote_items">
          <div>
            <h5 onClick={() => VoteHandler("add")}>+</h5>
            <h3 className="counter">
              {votes && votes.length > 0 ? votes.length : "0"}
            </h3>
            <h5 onClick={() => VoteHandler("remove")}>-</h5>
          </div>
        </div>
      </Vote>
    );
  }, [currentUser, id, votes]);

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
