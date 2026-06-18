import {
  Button,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  Checkbox,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";

import type { Item } from "../types";

interface Props {
  item: Item | null;
  onSave: (item: Item) => void;
  onClose: () => void;
}

export function ItemForm({
  item,
  onSave,
  onClose,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
  } = useForm<Item>();

  useEffect(() => {
    if (item) {
      reset(item);
    } else {
      reset({
        brand: "",
        title: "",
        date: "",
        mileage: 0,
        color: "",
        validPermition: false,
      });
    }
  }, [item, reset]);

  const submit = (data: Item) => {
    onSave({
      ...data,
      id:
        item?.id ??
        crypto.randomUUID(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
    >
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label="Brand"
            {...register("brand")}
          />

          <TextField
            label="Title"
            {...register("title")}
          />

          <TextField
            label="Date"
            {...register("date")}
          />

          <TextField
            label="Mileage"
            type="number"
            {...register("mileage", {
              valueAsNumber: true,
            })}
          />

          <TextField
            label="Color"
            {...register("color")}
          />

          <FormControlLabel
            control={
              <Controller
                name="validPermition"
                control={control}
                render={({ field }) => (
                  <Switch
                    {...field}
                    checked={field.value}
                  />
                )}
              />
            }
            label="Toggle"
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </form>
  );
}