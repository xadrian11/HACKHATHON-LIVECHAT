import React from "react";
import styles from "../styles/Item.module.css";
import { Icon } from "@iconify/react";

type ItemProps = {
  time: string;
  url: string;
  upvotes: number;
  downvotes: number;
  flag: string;
  onUpVote: VoidFunction;
  onDownVote: VoidFunction;
};

function Item({
  time,
  url,
  upvotes,
  downvotes,
  flag,
  onUpVote,
  onDownVote,
}: ItemProps) {
  let backgroundColor = 'white';
  if (flag === 'red') {
    backgroundColor = '#fad7d7'
  }
  if (flag === 'orange') {
    backgroundColor = '#fcf2eb'
  }
  if (flag === 'green') {
    backgroundColor = '#d9fae6'
  }
  return (
    <div className={styles.item} style={{ backgroundColor: backgroundColor}} >
      <div className={styles.flagContainer}>
        <img className={styles.flag} src={`${flag}-flag.png`} />
      </div>
      <p className={styles.time}>{time}</p>
      <p className={styles.url}>{url}</p>
      <div className={styles.votesWrapper}>
        <div className={styles.vote}>
          <button className={styles.voteBtn} onClick={onUpVote}>
            <img className={styles.arrow} src="arrow-up-vote.png" />
          </button>
          <p className={styles.upvotes}>{upvotes}</p>
        </div>
        <div className={styles.vote}>
          <button className={styles.voteBtn} onClick={onDownVote}>
          <img className={styles.arrow} src="arrow-down-vote.png" />
          </button>
          <p className={styles.downvotes}>{downvotes}</p>
        </div>
      </div>
    </div>
  );
}

export default Item;
