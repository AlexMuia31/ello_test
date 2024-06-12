import React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "@/GraphQL/Queries";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";

interface StyledTabProps {
  label: string;
}

export const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  background: "#EBEEF3",
  borderRadius: "10px",
  "& .MuiTabs-indicator": {
    backgroundColor: "#2A3958",
  },
});

export const AntTab = styled((props: StyledTabProps) => <Tab {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    whiteSpace: "nowrap",
    minWidth: 0,
    [theme.breakpoints.up("xs")]: {
      minWidth: 0,
    },
    fontWeight: 400,
    marginRight: theme.spacing(1),
    color: "#B1B4BB",
    "&:hover": {
      color: "#B1B4BB",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#fff",
      backgroundColor: "Turquoise",
      fontWeight: 500,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "Turquoise",
    },
  })
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const CustomTabs = () => {
  const [value, setValue] = React.useState(0);
  const [rowsToShow, setRowsToShow] = React.useState(2);
  const [selectedBook, setSelectedBook] = React.useState<any | null>(null);
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const books = data?.books || [];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setRowsToShow(2); // Reset rows to show when tab changes
  };

  const loadMore = () => {
    setRowsToShow((prevRows) => prevRows + 2);
  };

  const handleBookSelect = (
    event: React.SyntheticEvent,
    newValue: any | null
  ) => {
    setSelectedBook(newValue);
    setRowsToShow(2); // Reset rows to show when filter changes
  };

  const filteredBooks = selectedBook
    ? books.filter((book: any) => book.title === selectedBook.title)
    : books;

  const renderBooks = (readingLevel: string) => {
    const filteredByLevel = filteredBooks.filter(
      (book: any) => book.readingLevel === readingLevel
    );

    const booksToShow = filteredByLevel.slice(0, rowsToShow * 4);

    return (
      <>
        {filteredByLevel.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 2 }}>
            No books found
          </Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {booksToShow.map((book: any) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={book.title}>
                  <Box>
                    <Card>
                      <CardMedia component="img" image={book.coverPhotoURL} />
                      <CardContent>
                        <Typography variant="h6">{book.title}</Typography>
                        <Typography variant="subtitle1">
                          {book.author}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              ))}
            </Grid>
            {filteredByLevel.length > booksToShow.length && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button variant="contained" onClick={loadMore}>
                  Load More
                </Button>
              </Box>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <Box sx={{ width: "100%", mt: { xs: "7%", sm: "5%" } }}>
      <Box sx={{ bgcolor: "#fff", p: 2 }}>
        <Autocomplete
          options={books}
          getOptionLabel={(option: any) => option.title}
          value={selectedBook}
          onChange={handleBookSelect}
          renderInput={(params) => (
            <TextField {...params} label="Filter by Title" />
          )}
          renderOption={(props, option) => (
            <li {...props}>
              <Avatar src={option.coverPhotoURL} sx={{ mr: 2 }} />
              {option.title}
            </li>
          )}
          sx={{ mb: 2 }}
        />
        <AntTabs
          value={value}
          onChange={handleChange}
          variant={isUpMd ? "fullWidth" : "scrollable"}
        >
          <AntTab label="All Books" />
          <AntTab label="Reading Level A" />
          <AntTab label="Reading Level B" />
          <AntTab label="Reading Level C" />
          <AntTab label="Reading Level E" />
          <AntTab label="Reading Level F" />
          <AntTab label="Reading Level G" />
          <AntTab label="Reading Level H" />
          <AntTab label="Reading Level I" />
          <AntTab label="Reading Level J" />
        </AntTabs>
      </Box>
      <Box>
        <CustomTabPanel value={value} index={0}>
          {filteredBooks.length === 0 ? (
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>
              No books found
            </Typography>
          ) : (
            <>
              <Grid container spacing={2}>
                {filteredBooks.slice(0, rowsToShow * 4).map((book: any) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={book.title}>
                    <Card>
                      <CardMedia component="img" image={book.coverPhotoURL} />
                      <CardContent>
                        <Typography variant="h6">{book.title}</Typography>
                        <Typography variant="subtitle1">
                          {book.author}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              {filteredBooks.length > rowsToShow * 4 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button variant="contained" onClick={loadMore}>
                    Load More
                  </Button>
                </Box>
              )}
            </>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {renderBooks("A")}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {renderBooks("B")}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          {renderBooks("C")}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          {renderBooks("E")}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          {renderBooks("F")}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
          {renderBooks("G")}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={7}>
          {renderBooks("H")}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={8}>
          {renderBooks("I")}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={9}>
          {renderBooks("J")}
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default CustomTabs;
