import { useState } from "react";
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
  <Button
    variant="outlined"
    component="label"
  >
    Choose File

    <input
      hidden
      type="file"
      accept=".txt,.jpg,.png"
      onChange={handleFileChange}
    />
  </Button>

  {selectedFile && (
    <Typography sx={{ mt: 2 }}>
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