import React from "react";
import styled from "styled-components";

const VideoPlayer = ({ movieId, tvShowId, page, episodeNum, seasonNum }) => {
  const videoUrl =
    page === "/TV Shows"
      ? `https://vidsrc.to/embed/tv/${tvShowId}/${seasonNum}/${episodeNum}`
      : `https://vidsrc.to/embed/movie/${movieId}`;

  return (
    <VideoContainer>
      <StyledVideo
        width={"100%"}
        height={"500px"}
        frameBorder="0"
        allowFullScreen
        src={videoUrl}
        controls
      />
    </VideoContainer>
  );
};
const VideoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin-top: 20px;
`;

const StyledVideo = styled.iframe`
  width: ${({ width }) => width || "900px"};
  height: ${({ height }) => height || "450px"};
  min-width: 335px;
  border: 0;
  @media (max-width: 768px) {
    height: auto;
    aspect-ratio: 16 / 9;
  }
`;

export default VideoPlayer;
