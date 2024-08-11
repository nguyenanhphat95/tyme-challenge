import { convertToCapitalizedCase } from "shared/http/utils";
import { IItem } from "../../apis";
import { Box, Grid } from "@mui/material";
import cn from "classnames";
import styles from "./styles.module.css";

export const ProductCard = ({
  name,
  price,
  creator,
  thumbnail,
  category,
}: IItem) => {
  return (
    <Box p={2} className={styles.root}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <div
            className={cn(
              styles["image-container"],
              styles[`image-container-${thumbnail}`]
            )}
          >
            <div className={styles["category-container"]}>
              {convertToCapitalizedCase(category)}
            </div>
            <img
              src={`/images/products/${thumbnail}.png`}
              alt={name}
              style={{
                width: "100%",
              }}
            />
          </div>
        </Grid>
        <Grid item>
          <Box display="flex" justifyContent="space-between">
            <span className={styles.name}>{name}</span>
            <Box display="flex" alignItems="center" gap={1}>
              <img src="/images/icons/ethereum.png" alt="logo-ethereum" />
              <span className={styles.price}>{price} ETH</span>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Box gap={1} display="flex" alignItems="center">
            <img
              className={styles["creator-avatar"]}
              src="/images/avatar.jpeg"
              alt={creator}
            />
            <span className={styles["creator-name"]}>{creator}</span>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
