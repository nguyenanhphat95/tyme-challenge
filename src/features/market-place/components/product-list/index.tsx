import { Grid, Box } from "@mui/material";
import { ICategoryItem, IItem } from "../../apis";
import { ProductCard } from "../product-card";
import { CategoryTag } from "../category-tag";
import { ISearchItemParams } from "../product-search";

type Props = {
  data: IItem[];
  categories: ICategoryItem[];
  searchParams: ISearchItemParams;
};

export const ProductList = ({
  data,
  categories,
  searchParams: { category },
}: Props) => {
  return (
    <>
      <Grid container spacing={2}>
        {categories.map(({ value, label }) => (
          <Grid item key={value}>
            <CategoryTag isSelected={category === value}>{label}</CategoryTag>
          </Grid>
        ))}
      </Grid>

      <Box mt={3}>
        <Grid container spacing={3}>
          {data.map((item, index) => (
            <Grid item xs={6} md={3} key={index}>
              <ProductCard {...item}>{item.name}</ProductCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {data.length === 0 && (
        <Box mt={3} textAlign="center">
          No data found
        </Box>
      )}
    </>
  );
};
