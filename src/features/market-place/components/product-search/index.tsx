import { useState } from "react";
import {
  Slider,
  Button,
  MenuItem,
  Typography,
  Box,
  Select,
} from "@mui/material";
import { ICategoryItem } from "../../apis";
import { useEffectSkippingFirstUpdate } from "shared/hooks";
import styles from "./styles.module.css";

export type ISearchItemParams = {
  rangePrice: number[];
  category: string;
  createdAtSort: "latest" | "oldest";
  priceSort: "asc" | "desc";
};

export const DEFAULT_SEARCH_PARAMS: ISearchItemParams = {
  rangePrice: [0.01, 200],
  category: "all",
  createdAtSort: "latest",
  priceSort: "desc",
};

type Props = {
  showClearSearch: boolean;
  categories: ICategoryItem[];
  searchParams: ISearchItemParams;
  onSearch: (params: ISearchItemParams) => void;
  onReset: (params: ISearchItemParams) => void;
};

export const ProductSearch = ({
  showClearSearch,
  categories,
  searchParams,
  onSearch,
  onReset,
}: Props) => {
  const [innerSearchParams, setInnerSearchParams] = useState<ISearchItemParams>(
    DEFAULT_SEARCH_PARAMS
  );

  useEffectSkippingFirstUpdate(() => {
    setInnerSearchParams(searchParams);
  }, [searchParams]);

  return (
    <Box display="flex" flexDirection="column" gap={5}>
      <section>
        <Typography fontWeight={600} variant="body1" color="white">
          PRICE
        </Typography>
        <Slider
          min={0.01}
          max={200}
          step={0.01}
          value={innerSearchParams.rangePrice}
          onChange={(_, value) => {
            setInnerSearchParams((prev) => ({
              ...prev,
              rangePrice: value as number[],
            }));
          }}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} ETH`}
        />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="#D6D6D6">
            {innerSearchParams.rangePrice[0]} ETH
          </Typography>
          <Typography variant="body2" color="#D6D6D6">
            {innerSearchParams.rangePrice[1]} ETH
          </Typography>
        </Box>
      </section>
      <section>
        <Typography fontWeight={600} variant="body1" color="white">
          TIER
        </Typography>
        <Select
          value={innerSearchParams.category}
          onChange={({ target: { value } }) =>
            setInnerSearchParams((prev) => ({
              ...prev,
              category: value as ISearchItemParams["category"],
            }))
          }
        >
          {categories.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </section>
      <section>
        <Typography fontWeight={600} variant="body1" color="white">
          TIME
        </Typography>
        <Select
          value={innerSearchParams.createdAtSort}
          onChange={({ target: { value } }) =>
            setInnerSearchParams((prev) => ({
              ...prev,
              createdAtSort: value as ISearchItemParams["createdAtSort"],
            }))
          }
        >
          {[
            { label: "Latest", value: "latest" },
            { label: "Oldest", value: "oldest" },
          ].map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </section>
      <section>
        <Typography fontWeight={600} variant="body1" color="white">
          PRICE
        </Typography>
        <Select
          value={innerSearchParams.priceSort}
          onChange={({ target: { value } }) =>
            setInnerSearchParams((prev) => ({
              ...prev,
              priceSort: value as ISearchItemParams["priceSort"],
            }))
          }
        >
          {[
            { label: "Low to high", value: "desc" },
            { label: "High to low", value: "asc" },
          ].map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </section>

      <section>
        <Box alignItems="center" display="flex" justifyContent="space-between">
          <div>
            {showClearSearch && (
              <button
                onClick={() => onReset(DEFAULT_SEARCH_PARAMS)}
                className={styles["button-reset"]}
              >
                <img src="/images/icons/close-icon.png" alt="close-icon" />{" "}
                Reset filter
              </button>
            )}
          </div>
          <Button
            onClick={() => onSearch(innerSearchParams)}
            className={styles["button-submit"]}
          >
            Search
          </Button>
        </Box>
      </section>
    </Box>
  );
};
