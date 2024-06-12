import React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface StyledTabProps {
  label: string;
}

export const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  background: "#EBEEF3",
  "& .MuiTabs-indicator": {
    backgroundColor: "#2A3958",
  },
});

export const AntTab = styled((props: StyledTabProps) => <Tab {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box sx={{ width: "100%", mt: { xs: "7%", sm: "2%" } }}>
      <Box sx={{ bgcolor: "#fff" }}>
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
          <AntTab label="Reading Level F" /> <AntTab label="Reading Level G" />{" "}
          <AntTab label="Reading Level H" />
          <AntTab label="Reading Level I" />
          <AntTab label="Reading Level J" />
        </AntTabs>
      </Box>
    </Box>
  );
};

export default CustomTabs;
