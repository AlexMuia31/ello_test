/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import { Mulish } from "next/font/google";
import { AppBar, Box, Toolbar } from "@mui/material";
import Image from "next/image";
import { Heading, SubHeading } from "./components/typographies/typographies";
import { BannerButton } from "./components/buttons/buttons";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import MailIcon from "@mui/icons-material/Mail";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";

const inter = Mulish({ subsets: ["latin"] });

const Home = () => {
  return (
    <>
      <Head>
        <title>ello</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Box className={inter.className} component="main">
        <Toolbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "2%",
          }}
        >
          <Box>
            <Image src="/banner.png" alt="" width={300} height={200} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Heading
            sx={{
              color: "primary.dark",
              mt: "1%",
              fontSize: { xs: "20px", sm: "35px" },
            }}
          >
            Confident, Independent Reading
          </Heading>
          <Box sx={{ maxWidth: "560px", mt: { sm: "1%", xs: "7%" } }}>
            <SubHeading
              sx={{ fontSize: { xs: "16px", sm: "20px" }, textAlign: "center" }}
            >
              Over 700 decodable books that match your child's reading ability.
              Help prevent the summer slump, without frustration
            </SubHeading>
          </Box>
          <BannerButton
            sx={{
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.main" },
              color: "secondary.light",
              width: { xs: "300px", sm: "300px" },
              mt: { sm: "3%", xs: "7%" },
            }}
            size="large"
          >
            EXPLORE READING SETS
          </BannerButton>
          <SubHeading
            sx={{
              fontSize: { xs: "16px", sm: "18px" },
              mt: { sm: "2%", xs: "7%" },
            }}
          >
            Share this library with friends!
          </SubHeading>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "primary.main",
              gap: 3,
              mt: { sm: "1%", xs: "7%" },
            }}
          >
            <MailIcon sx={{ fontSize: "40px" }} />{" "}
            <InstagramIcon sx={{ fontSize: "40px" }} />
            <FacebookIcon sx={{ fontSize: "40px" }} />
            <XIcon sx={{ fontSize: "40px" }} />
            <PinterestIcon sx={{ fontSize: "40px" }} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
