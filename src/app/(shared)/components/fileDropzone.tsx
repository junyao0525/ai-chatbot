"use client";

import { Box, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileDropzoneProps {
  onFiles: (files: File[]) => void;
}

export default function FileDropzone({ onFiles }: FileDropzoneProps) {
  // Track document-level dragging so overlay can appear even before entering root
  const [isDraggingDocument, setIsDraggingDocument] = useState(false);
  const dragDepthRef = useRef(0);

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      // Only show when dragging files
      const hasFiles = Array.from(e.dataTransfer?.types || []).includes(
        "Files"
      );
      if (!hasFiles) return;
      dragDepthRef.current += 1;
      setIsDraggingDocument(true);
    };

    const handleDragLeave = () => {
      dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
      if (dragDepthRef.current === 0) {
        setIsDraggingDocument(false);
      }
    };

    const handleDrop = () => {
      dragDepthRef.current = 0;
      setIsDraggingDocument(false);
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);
    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  // Handle dropped files
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log("Dropped files:", acceptedFiles);
      onFiles(acceptedFiles);
      // Ensure overlay hides after processing drop
      dragDepthRef.current = 0;
      setIsDraggingDocument(false);
    },
    [onFiles]
  );

  // Dropzone setup
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true, // disable click-to-upload
    noKeyboard: true, // disable Enter/Space
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1300, // same as MUI modal
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        // Capture pointer events only while a drag is happening so normal UI remains usable
        pointerEvents: isDraggingDocument ? "auto" : "none",
        bgcolor:
          isDragActive || isDraggingDocument
            ? "rgba(0,0,0,0.6)"
            : "transparent",
      }}>
      <input {...getInputProps()} />

      {isDragActive && (
        <Paper
          elevation={6}
          sx={{
            border: "2px dashed",
            borderColor: "primary.main",
            bgcolor: "background.paper",
            p: 6,
            marginLeft: "430px",
            width: "60%",
            maxWidth: 1000,
            minHeight: 400,
            textAlign: "center", // 👈 center all text inside
            display: "flex", // 👈 center vertically
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Typography
            variant="h6"
            color="primary"
            gutterBottom>
            Drop files here
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary">
            Your files will be uploaded immediately
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
