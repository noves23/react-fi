import { useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
}

export function UploadDialog({
  open,
  onClose,
}: UploadDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0] ?? null;

    setSelectedFile(file);
  };

  const handleUpload = () => {
    console.log(
      "Selected file:",
      selectedFile
    );

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
    >
      <DialogTitle>
        Upload File
      </DialogTitle>

<DialogContent>
  <input
    ref={fileInputRef}
    type="file"
    accept=".txt,.jpg,.png"
    hidden
    onChange={handleFileChange}
  />

  <Button
    variant="outlined"
    onClick={() =>
      fileInputRef.current?.click()
    }
  >
    Choose File
  </Button>

  {selectedFile && (
    <Typography mt={2}>
      Selected: {selectedFile.name}
    </Typography>
  )}
</DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleUpload}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}