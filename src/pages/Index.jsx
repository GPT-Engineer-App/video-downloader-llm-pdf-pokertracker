import React, { useState } from "react";
import { Container, VStack, Input, Button, Text, Spinner, Image } from "@chakra-ui/react";
import Navigation from "../components/Navigation.jsx";
import axios from "axios";

const Index = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoDownloaded, setVideoDownloaded] = useState(false);
  const [framesExtracted, setFramesExtracted] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const [stats, setStats] = useState(null);

  const handleDownloadVideo = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/download_video", { video_url: videoUrl, resolution: "highest" });
      const videoPath = response.data.video_path;
      setVideoPath(videoPath);
      const framesResponse = await axios.post("/extract_frames", { video_path: videoPath, interval: 1 });
      const frames = framesResponse.data.frames;
      const analysisResponse = await axios.post("/analyze_frames", { frames });
      const analysis = analysisResponse.data.analysis;
      const pdfResponse = await axios.post("/create_pdf", { analysis }, { responseType: "blob" });
      if (pdfResponse.data) {
        const pdfBlob = new Blob([pdfResponse.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
      } else {
        console.error("Failed to create PDF Blob");
      }
      setVideoDownloaded(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleGetStats = async (playerId) => {
    try {
      const response = await axios.get("/get_stats", { params: { player_id: playerId } });
      setStats(response.data.stats);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExtractFrames = async () => {
    setLoading(true);
    try {
      const framesResponse = await axios.post("/extract_frames", { video_path: videoPath, interval: 1 });
      const frames = framesResponse.data.frames;
      const analysisResponse = await axios.post("/analyze_frames", { frames });
      const analysis = analysisResponse.data.analysis;
      const pdfResponse = await axios.post("/create_pdf", { analysis }, { responseType: "blob" });
      if (pdfResponse.data) {
        const pdfBlob = new Blob([pdfResponse.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
        setFramesExtracted(true);
      } else {
        console.error("Failed to create PDF Blob");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Navigation />
      <VStack spacing={4}>
        <Text fontSize="2xl">PokerStars Hand History Compilation</Text>
        <Input placeholder="Enter video URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        <Button onClick={handleDownloadVideo} isLoading={loading} isDisabled={videoDownloaded}>
          Download Video
        </Button>
        {videoDownloaded && videoPath && (
          <>
            <Text>Video downloaded to: {videoPath}</Text>
            <Button onClick={handleExtractFrames} isLoading={loading} isDisabled={framesExtracted}>
              Process Frames
            </Button>
          </>
        )}
        {loading && <Spinner />}
        {pdfUrl && (
          <a href={pdfUrl} download="storybook.pdf">
            Download PDF Storybook
          </a>
        )}
        <Text fontSize="lg">Enter Player ID to fetch stats:</Text>
        <Input placeholder="Enter Player ID" onBlur={(e) => handleGetStats(e.target.value)} />
        {stats && (
          <VStack spacing={2}>
            <Text>Player Stats:</Text>
            <Text>Games Played: {stats.gamesPlayed}</Text>
            <Text>Wins: {stats.wins}</Text>
            <Text>Losses: {stats.losses}</Text>
            <Text>Win Rate: {stats.winRate}%</Text>
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
