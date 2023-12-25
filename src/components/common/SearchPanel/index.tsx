import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { SearchInputGenerator } from "./SearchInputGenerator";
import { SearchSchema } from "./types";

type Props = {
  setParams: (props: any) => void;
  schema: SearchSchema;
};

export const SearchPanel: FC<Props> = (props) => {
  const { setParams, schema } = props;

  const rhfProps = useForm();

  const onSubmit = useCallback(() => {
    setParams(rhfProps.getValues());
  }, [rhfProps, setParams]);

  const onClickReset = useCallback(() => rhfProps.reset(), [rhfProps]);

  return (
    <Card sx={{ p: 2 }}>
      <form onSubmit={rhfProps.handleSubmit(onSubmit)}>
        <Stack spacing={1} direction="column">
          {schema.map((item, index) => {
            return (
              <Box
                display="grid"
                gridTemplateColumns="250px 1fr"
                gridTemplateRows={`repeat(${
                  item.helperComponent ? 2 : 1
                }, 1fr)`}
                key={`search row ${index}`}
              >
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" component="h1" textAlign="center">
                    {item.label}
                  </Typography>
                </Box>
                <SearchInputGenerator searchItem={item} rhfProps={rhfProps} />
                {item.helperComponent && (
                  <>
                    <Box /> {/* <- 空のセル */}
                    {item.helperComponent}
                  </>
                )}
              </Box>
            );
          })}
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button type="submit" variant="contained">
              検索
            </Button>
            <Button onClick={onClickReset} variant="outlined">
              リセット
            </Button>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
};
