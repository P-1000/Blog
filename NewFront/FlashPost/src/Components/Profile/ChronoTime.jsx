import React from "react"
import { Chrono } from "react-chrono";

const ChronoTime = () => {
  const items = [{
    title: "May 1940",
    cardTitle: "Dunkirk",
    url: "http://www.history.com",
    cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
    cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    media: {
      type: "IMAGE",
      source: {
        url: "https://ik.imagekit.io/cwq19b8fi/profile/sasuke-sasuke-susanoo_ZCetgwk6e.gif"
      }
    }
  }, {
    title: "May 1940",
    cardTitle: "Dunkirk",
    url: "http://www.history.com",
    cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
    cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    media: {
      type: "IMAGE",
      source: {
        url: "https://ik.imagekit.io/cwq19b8fi/profile/sasuke-sasuke-susanoo_ZCetgwk6e.gif"
      }
    }
  }];

  return (
    <div style={{ width: "500px", height: "400px" }}>
      <Chrono items={items} mode="VERTICAL" />
    </div>
  )
}