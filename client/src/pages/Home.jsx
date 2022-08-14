import { Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import { Container } from "@mui/material";
import { AppManagementTab, MarketplaceTab } from "components/app";
import { useCallback, useState } from "react";

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
          <MarketplaceTab />
        </TabPanel>

        <TabPanel value={1}>
          <Typography level="h6" textAlign="center">
            🚧 Under construction
          </Typography>
        </TabPanel>

        <TabPanel value={2}>
          <AppManagementTab />
        </TabPanel>
      </Tabs>
    </Container>
  );
};

export default Home;
