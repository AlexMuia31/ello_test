import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { BannerButton } from "../buttons/buttons";
import { SubHeading } from "../typographies/typographies";

const BookList = ({
  books,
  readingLevel,
  rowsToShow,
  loadMore,
  addToTeacherList,
  removeFromTeacherList,
}: any) => {
  const filteredBooks = books.filter(
    (book: any) => book.readingLevel === readingLevel
  );

  return (
    <>
      {filteredBooks.length === 0 ? (
        <SubHeading variant="h6" align="center" sx={{ mt: 2 }}>
          No books found
        </SubHeading>
      ) : (
        <>
          <Grid container spacing={2}>
            {filteredBooks.slice(0, rowsToShow * 4).map((book: any) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                <Card>
                  <CardMedia component="img" image={book.coverPhotoURL} />
                  <CardContent>
                    <SubHeading variant="h6">{book.title}</SubHeading>
                    <SubHeading variant="subtitle1">{book.author}</SubHeading>
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
                Load More
              </BannerButton>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default BookList;
