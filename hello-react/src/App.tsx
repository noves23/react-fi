import { useState } from "react";
import {
  Button,
  Container,
  Dialog,
  Stack,
  Typography,
} from "@mui/material";

import type { Item } from "./features/items/types";
import { mockItems } from "./mocks/data";
import { ItemCard } from "./features/items/components/ItemCard";
import { ItemForm } from "./features/items/components/ItemForm";

export function ItemsPage() {
  const [items, setItems] =
    useState<Item[]>(mockItems);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedItem, setSelectedItem] =
    useState<Item | null>(null);

  const handleAdd = () => {
    setSelectedItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  const handleSave = (item: Item) => {
    if (selectedItem) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? item : i
        )
      );
    } else {
      setItems((prev) => [
        ...prev,
        item,
      ]);
    }

    setDialogOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        gutterBottom
      >
        Vehicle Items
      </Typography>

      <Button
        variant="contained"
        onClick={handleAdd}
        sx={{ mb: 2 }}
      >
        Add Item
      </Button>

      <Stack spacing={2}>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </Stack>

      <Dialog
        open={dialogOpen}
        onClose={() =>
          setDialogOpen(false)
        }
        fullWidth
      >
        <ItemForm
          item={selectedItem}
          onSave={handleSave}
          onClose={() =>
            setDialogOpen(false)
          }
        />
      </Dialog>
    </Container>
  );
}