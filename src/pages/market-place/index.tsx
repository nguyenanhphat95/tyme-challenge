import { useEffect, useMemo, useRef, useState } from "react";
import { Grid, Box } from "@mui/material";
import {
  // components
  ProductList,
  ProductSearch,
  // interfaces
  IItem,
  ICategoryItem,
  ISearchItemParams,
  // constants
  DEFAULT_SEARCH_PARAMS,
  // apis
  getListProductApi,
} from "features/market-place";
import { isDifferent } from "shared/utils";
import { useDeviceType } from "shared/hooks";
import cn from "classnames";
import styles from "./styles.module.css";

export const MarketPlacePage = () => {
  const { isTablet, isMobile } = useDeviceType();
  const originalDataRef = useRef<IItem[]>([]);
  const [data, setData] = useState<IItem[]>([]);
  const [categories, setCategories] = useState<ICategoryItem[]>([]);
  const [searchParams, setSearchParams] = useState<ISearchItemParams>(
    DEFAULT_SEARCH_PARAMS
  );
  const isDifferentSearch = useMemo(() => {
    return isDifferent(searchParams, DEFAULT_SEARCH_PARAMS);
  }, [searchParams]);

  const fetchData = () => {
    getListProductApi().then(({ payload }) => {
      setData(sortData(payload?.items || [], searchParams));
      setCategories(payload?.categories || []);
      originalDataRef.current = payload?.items || [];
    });
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const filterData = (data: IItem[], params: ISearchItemParams) => {
    return data.filter(({ category, price }) => {
      const isCategoryMatch =
        params.category === "all" || category === params.category;
      const isPriceInRange =
        price >= params.rangePrice[0] && price <= params.rangePrice[1];
      return isCategoryMatch && isPriceInRange;
    });
  };

  const sortData = (data: IItem[], params: ISearchItemParams) => {
    return data.sort((a, b) => {
      if (params.priceSort === "desc") {
        if (a.price !== b.price) {
          return a.price - b.price;
        }
      } else if (params.priceSort === "asc") {
        if (a.price !== b.price) {
          return b.price - a.price;
        }
      }

      if (params.createdAtSort === "latest") {
        return b.created_at.localeCompare(a.created_at);
      } else if (params.createdAtSort === "oldest") {
        return a.created_at.localeCompare(b.created_at);
      }

      return 0;
    });
  };

  const handleSearch = (params: ISearchItemParams) => {
    const filteredData = filterData(originalDataRef.current, params);
    const sortedData = sortData(filteredData, params);

    setData(sortedData);
    setSearchParams(params);
  };

  return (
    <Box>
      <section
        className={cn(
          styles.banner,
          isTablet && styles["banner-tablet"],
          isMobile && styles["banner-mobile"]
        )}
      />

      <main className={styles.main}>
        <Grid container spacing={5}>
          <Grid item md={4} xs={12}>
            <ProductSearch
              showClearSearch={isDifferentSearch}
              categories={categories}
              searchParams={searchParams}
              onSearch={handleSearch}
              onReset={handleSearch}
            />
          </Grid>
          <Grid item md={8} xs={12}>
            <ProductList
              searchParams={searchParams}
              categories={categories}
              data={data}
            />
          </Grid>
        </Grid>
      </main>

      <footer className={styles.footer} />
    </Box>
  );
};
