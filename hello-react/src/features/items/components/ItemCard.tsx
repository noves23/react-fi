import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Collapse,
  Stack,
} from "@mui/material";

import type { Item } from "../types";

interface Props {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
  onUpload: () => void;
}

export function ItemCard({ 
  item, 
  onEdit, 
  onDelete, 
  onUpload,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      <CardContent>
        <Collapse in={true} timeout="auto" unmountOnExit>
          <Typography variant="h6"
          sx={{ cursor: "pointer" }}
          onClick={() =>
            setExpanded(!expanded)
          }>
            Title: {item.title}
          </Typography>
        <Collapse in={expanded}>

        </Collapse>
          <Typography>
            Brand: {item.brand}
          </Typography>

          <Typography>
            Date: {item.date}
          </Typography>

          <Typography>
            Mileage: {item.mileage}
          </Typography>

          <Typography>
            Color: {item.color}
          </Typography>

          <Typography>
            Permission:
            {item.validPermition
              ? " Yes"
              : " No"}
          </Typography>

           <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 2 }}
          >
            <Button
              variant="outlined"
              onClick={() =>
                onEdit(item)
              }
            >
              Edit
            </Button>

            <Button
              variant="outlined"
              onClick={onUpload}
            >
            Select Data
            </Button>
            
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                onDelete(item.id)
              }
            >
              Delete
            </Button>
          </Stack>
        </Collapse>
      </CardContent>
    </Card>
  );
}