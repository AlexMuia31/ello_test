/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
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
import { BannerButton } from "../buttons/buttons";
import { Heading } from "../typographies/typographies";

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
  const [value, setValue] = useState(0);
  const [rowsToShow, setRowsToShow] = useState(2);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [teacherList, setTeacherList] = useState<any[]>([]);
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const { loading, error, data } = useQuery(GET_BOOKS);

  useEffect(() => {
    const storedTeacherList = localStorage.getItem("teacherList");
    if (storedTeacherList) {
      setTeacherList(JSON.parse(storedTeacherList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("teacherList", JSON.stringify(teacherList));
  }, [teacherList]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const books = data?.books || [];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setRowsToShow(2);
  };

  const loadMore = () => {
    setRowsToShow((prevRows) => prevRows + 2);
  };

  const handleBookSelect = (
    event: React.SyntheticEvent,
    newValue: any | null
  ) => {
    setSelectedBook(newValue);
    setRowsToShow(2);
  };

  const addToTeacherList = (book: any) => {
    const updatedTeacherList = [...teacherList, book];
    setTeacherList(updatedTeacherList);
  };

  const removeFromTeacherList = (book: any) => {
    setTeacherList(teacherList.filter((b) => b.title !== book.title));
  };

  const filteredBooks = selectedBook
    ? books.filter((book: any) => book.title === selectedBook.title)
    : books;

  return (
    <Box sx={{ width: "100%", mt: { xs: "7%", sm: "5%" }, pb: "4%" }}>
      <Box sx={{ bgcolor: "#fff", p: 2 }}>
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
        <Box sx={{ mb: "4%" }}>
          <Heading sx={{ mb: "1%" }}>Teacher's Reading List</Heading>
          {teacherList.length === 0 ? (
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>
              No books in List
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {teacherList.map((book: any) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={book.title}>
                  <Card>
                    <CardMedia component="img" image={book.coverPhotoURL} />
                    <CardContent>
                      <Typography variant="h6">{book.title}</Typography>
                      <Typography variant="subtitle1">{book.author}</Typography>
                      <Box sx={{ display: "flex", gap: 2, mt: "1%" }}>
                        <BannerButton
                          onClick={() => removeFromTeacherList(book)}
                          sx={{
                            textTransform: "capitalize",
                            bgcolor: "info.main",
                            color: "secondary.light",
                            "&:hover": {
                              bgcolor: "info.main",
                            },
                          }}
                        >
                          Remove
                        </BannerButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
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

        <CustomTabPanel value={value} index={0}>
          {filteredBooks.length === 0 ? (
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>
              No books found
            </Typography>
          ) : (
            <>
              <Grid container spacing={2}>
                {filteredBooks.slice(0, rowsToShow * 4).map((book: any) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                    <Card>
                      <CardMedia component="img" image={book.coverPhotoURL} />
                      <CardContent>
                        <Typography variant="h6">{book.title}</Typography>
                        <Typography variant="subtitle1">
                          {book.author}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2, mt: "1%" }}>
                          <BannerButton
                            onClick={() => addToTeacherList(book)}
                            sx={{
                              textTransform: "capitalize",
                              bgcolor: "primary.main",
                              color: "secondary.light",
                              "&:hover": {
                                bgcolor: "primary.main",
                              },
                            }}
                          >
                            Add to List
                          </BannerButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              {filteredBooks.length > rowsToShow * 4 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <BannerButton
                    variant="contained"
                    onClick={loadMore}
                    sx={{
                      textTransform: "capitalize",
                      color: "secondary.light",
                    }}
                  >
                    Load More ...
                  </BannerButton>
                </Box>
              )}
            </>
          )}
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default CustomTabs;
