import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Item from "../components/item";
import { Icon } from "@iconify/react";
import Modal from "../components/modal";
import { Page as DBPage } from "@prisma/client";
import { getPages } from "../services";

type Page = Omit<DBPage, "createdAt"> & {
  createdAt: string;
  flag: string;
};

const Home = () => {
  const [webUrl, setWebUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);
  const [submitUrl, setSubmitUrl] = useState("");

  const filtered = pages.filter((item) => item.url.includes(webUrl));
  const items = filtered.length ? filtered : pages;

  async function callUpvote(url: string) {
    const encodedURL = encodeURIComponent(url);
    const res = await fetch(`/api/pages/${encodedURL}/upvote`, {
      method: "POST",
    });
    if (res.ok) {
      const page = (await res.json()) as Page;
      setPages(pages.filter((p) => p.id !== page.id).concat(page));
    }
  }

  async function callDownvote(url: string) {
    const encodedURL = encodeURIComponent(url);
    const res = await fetch(`/api/pages/${encodedURL}/downvote`, {
      method: "POST",
    });
    if (res.ok) {
      const page = (await res.json()) as Page;
      setPages(pages.filter((p) => p.id !== page.id).concat(page));
    }
  }

  async function submitPage(submittedUrl: string) {
    const res = await fetch("/api/pages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: submittedUrl,
      } as Partial<Page>),
    });
    if (res.ok) {
      const page = (await res.json()) as Page;
      setPages(pages.filter((p) => p.id !== page.id).concat(page));
      setIsOpen(false);
      setSubmitUrl("");
    }
  }

  useEffect(() => {
    getPages().then(setPages);
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.flagContainer}>
          <img className={styles.flag} src="big-red-flag.png" />
        </div>
        <h1 className={styles.header}>Report a website</h1>
        <TextField
          fullWidth
          label="URL"
          id="fullWidth"
          onChange={(e) => setSubmitUrl(e.target.value)}
        />
        <div className={styles.btnContainer}>
          <Button variant="contained" onClick={() => submitPage(submitUrl)}>
            Submit
          </Button>
        </div>
      </Modal>

      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src='logo.png' />
        </div>
        <div className={styles.searchContainer}>
          <button className={styles.plusBtn} onClick={() => setIsOpen(true)}>
            <img className={styles.addButton} src='add-button.png' />
          </button>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              label="Search"
              id="fullWidth"
              onChange={(e) => setWebUrl(e.target.value)}
              type="url"
            />
          </Box>
        </div>
      </div>

      <div className={styles.items}>
        <div className={styles.itemContainer}>
          {items
            .sort(
              (a, b) =>
                Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
            )
            .map((el) => {
              return (
                <div className={styles.itemWrapper} key={el.url}>
                  <Item
                    onUpVote={() => {
                      callUpvote(el.url);
                    }}
                    onDownVote={() => {
                      callDownvote(el.url);
                    }}
                    time={el.createdAt.slice(0, -14)}
                    url={el.url}
                    upvotes={el.upvotes}
                    downvotes={el.downvotes}
                    flag={el.flag}
                  ></Item>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
