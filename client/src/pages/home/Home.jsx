import { Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import { Container, Grid } from "@mui/material";
import LicenseItem from "components/license/LicenseItem/LicenseItem";
import { useCallback, useState } from "react";

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
  const [index, setIndex] = useState(0);

  const changeTab = useCallback((e, value) => setIndex(value), []);

  return (
    <Container sx={{ minHeight: 1000 }}>
      <Tabs size="lg" value={index} onChange={changeTab}>
        <TabList variant="outlined">
          <Tab
            variant={index === 0 ? "soft" : "plain"}
            color={index === 0 ? "primary" : "neutral"}
            sx={{ boxShadow: "none" }}
          >
            🏪 Buy licenses
          </Tab>

          <Tab
            variant={index === 1 ? "soft" : "plain"}
            color={index === 1 ? "info" : "neutral"}
            sx={{ boxShadow: "none" }}
          >
            📜 My licences
          </Tab>

          <Tab
            variant={index === 2 ? "soft" : "plain"}
            color={index === 2 ? "warning" : "neutral"}
            sx={{ boxShadow: "none" }}
          >
            📦 My published apps
          </Tab>
        </TabList>

        <TabPanel value={0}>
          <Grid container rowGap={1} columnGap={1} py={2}>
            <Grid item xs={4}>
              <LicenseItem license={license} />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={1}>
          <Typography level="h6" textAlign="center">
            🚧 Under construction
          </Typography>
        </TabPanel>

        <TabPanel value={2}>
          <Typography level="h6" textAlign="center">
            🚧 Under construction
          </Typography>
        </TabPanel>
      </Tabs>
    </Container>
  );
};

export default Home;
