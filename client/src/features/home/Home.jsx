import { Container, Grid } from "@mui/material";
import LicenseItem from "features/store/components/LicenseItem/LicenseItem";

const license = {
  id: "75705185633419d2d713ce4f166813eab9b254257c0b258acdca36131a6fc30d",
  name: "Gallery one",
  date: 1659859521000,
  contentHash:
    "0x8e079926d7340822e6b4c501811af5d1edc47d796b97f56c1cbe3177b47d588b",
  owner: "0x0xEE37294c74295F2792FCB1369F1e9e9B5DA34B8b",
  version: 1,
  price: "824213281784279560",
};

const Home = () => {
  return (
    <Container sx={{ height: 1000 }}>
      <Grid container rowGap={1} columnGap={1}>
        <Grid item xs={4}>
          <LicenseItem license={license} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
