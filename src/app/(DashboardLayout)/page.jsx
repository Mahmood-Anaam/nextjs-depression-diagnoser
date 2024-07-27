"use client";
import VideoCapture  from "@/components/videoCapture/VideoCapture";
import { Button} from "@mui/material";

import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open Video Capture
      </Button>
      <VideoCapture
        onFrameCapture={(frame) => {}}
        size={{ width: 640, height: 360 }}
        allowCamera={true}
        allowFileUpload={true}
        showInDialog={true}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
