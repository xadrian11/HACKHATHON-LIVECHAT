import {
  PopupWrapper,
  FlagWrapper,
  ArrowsWrapper,
  Footer,
  LoadingWrapper,
} from "./popup.styled";
import { useState, useEffect } from "react";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { Button } from "@nextui-org/react";

const Popup = () => {
  const [currentDomain, setCurrentDomain] = useState<any>(null);
  const [opinions, setOpinions] = useState<any>(null);
  const [domainInfo, setDomainInfo] = useState<any>(null);

  const addingDomainHandler = async () => {
    const data = await fetch(`https://fake-alert.netlify.app/api/pages`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: currentDomain }),
    });
    const parsedData = await data.json();
    setOpinions(parsedData);
  };

  const upvoteHandler = async () => {
    const response = await fetch(
      `https://fake-alert.netlify.app/api/pages/${encodeURIComponent(
        currentDomain
      )}/upvote`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    setOpinions(data);
  };

  const downvoteHandler = async () => {
    console.log("down");
    const response = await fetch(
      `https://fake-alert.netlify.app/api/pages/${encodeURIComponent(
        currentDomain
      )}/downvote`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    setOpinions(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      setCurrentDomain(
        tab.url[tab.url.length - 1] === "/"
          ? [...tab.url].splice(0, tab.url.length - 1).join("")
          : tab.url
      );
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (currentDomain) {
      const fetchDataFromServer = async () => {
        const response = await fetch(
          `https://fake-alert.netlify.app/api/pages/${encodeURIComponent(
            currentDomain
          )}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setOpinions(data);
        }

        const response2 = await fetch(
          `https://fake-alert.netlify.app/api/pages/${encodeURIComponent(
            currentDomain
          )}/whois`
        );
        const domainInfo = await response2.json();
        console.log(
          "🚀 ~ file: popup.tsx ~ line 64 ~ fetchDataFromServer ~ domainInfo",
          domainInfo
        );
        setDomainInfo(domainInfo);
      };

      fetchDataFromServer();
    }
  }, [currentDomain]);

  return (
    <PopupWrapper opinions={opinions}>
      {opinions ? (
        <>
          <FlagWrapper selectedFlag={opinions.flag} />
          <ArrowsWrapper>
            <span>{opinions.downvotes}</span>
            <Button
              auto
              flat
              color="error"
              onPress={downvoteHandler}
              icon={<ImArrowDown style={{ transform: "scale(1.5)" }} />}
            />
            <Button
              auto
              flat
              color="success"
              onPress={upvoteHandler}
              icon={<ImArrowUp style={{ transform: "scale(1.5)" }} />}
            />
            <span>{opinions.upvotes}</span>
          </ArrowsWrapper>
          <p>
            <span>
              Domain owner: {domainInfo?.owner || "No data available"}
            </span>
            <span>
              Country: {domainInfo?.registeredCountry || "No data available"}
            </span>
            <span>
              Creation date:{" "}
              {domainInfo?.created
                ?.split(" ")?.[0]
                .slice(0, 11)
                .replace("T", "") || "No data available"}
            </span>
          </p>
          <Footer>
            <Button
              as="a"
              href="https://fake-alert.netlify.app/"
              target="_blank"
              size="xs"
              style={{ textDecoration: "none" }}
            >
              Show More
            </Button>
          </Footer>
        </>
      ) : (
        <LoadingWrapper>
          <img src="logo.png" alt="logo image" />
          <Button onClick={addingDomainHandler}>Add current domain!</Button>
        </LoadingWrapper>
      )}
    </PopupWrapper>
  );
};

export default Popup;
