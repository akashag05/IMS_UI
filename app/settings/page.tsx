"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useAppContext } from "@/context/AppContext";
import UserManagement from "@/components/Settings/UserManagement";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const { sidebarOpen, themeSwitch } = useAppContext();
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div className={` ${sidebarOpen ? "ml-72" : "ml-20"}`}>
      <div className="flex">
        <div className="w-60">
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            sx={{
              backgroundColor: themeSwitch ? "#24303F" : "#ffffff",
              borderRadius: "1rem 1rem 0  0",
            }}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              className="text-white"
            >
              <Typography className={themeSwitch ? "text-white" : ""}>
                USER MANAGEMENT
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: themeSwitch ? "#1A222C" : "#ffffff",
                padding: "5px 30px",
              }}
            >
              <Typography className={themeSwitch ? "text-white" : ""}>
                User Management
              </Typography>
              <Typography className={themeSwitch ? "text-white" : ""}>
                Role Management
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            sx={{ backgroundColor: themeSwitch ? "#24303F" : "#ffffff" }}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography className={themeSwitch ? "text-white" : ""}>
                SYSTEM SETTINGS
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: themeSwitch ? "#1A222C" : "#ffffff",
                padding: "5px 30px",
              }}
            >
              <Typography className={themeSwitch ? "text-white" : ""}>
                SMTP Configuration
              </Typography>
              <Typography className={themeSwitch ? "text-white" : ""}>
                Global Settings
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
            sx={{ backgroundColor: themeSwitch ? "#24303F" : "#ffffff" }}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography className={themeSwitch ? "text-white" : ""}>
                DISCOVERY SETTINGS
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: themeSwitch ? "#1A222C" : "#ffffff",
                padding: "5px 30px",
              }}
            >
              <Typography className={themeSwitch ? "text-white" : ""}>
                Discovery Schedulers
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
            sx={{ backgroundColor: themeSwitch ? "#24303F" : "#ffffff" }}
          >
            <AccordionSummary
              aria-controls="panel4d-content"
              id="panel4d-header"
            >
              <Typography className={themeSwitch ? "text-white" : ""}>
                DEVICE SETTINGS
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: themeSwitch ? "#1A222C" : "#ffffff",
                padding: "5px 30px",
              }}
            >
              <Typography className={themeSwitch ? "text-white" : ""}>
                Credential Profiles
              </Typography>
              <Typography className={themeSwitch ? "text-white" : ""}>
                Onboarding
              </Typography>
              <Typography className={themeSwitch ? "text-white" : ""}>
                Groups
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
            sx={{ backgroundColor: themeSwitch ? "#24303F" : "#ffffff" }}
          >
            <AccordionSummary
              aria-controls="panel5d-content"
              id="panel5d-header"
            >
              <Typography className={themeSwitch ? "text-white" : ""}>
                MONITORING SETTINGS
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: themeSwitch ? "#1A222C" : "#ffffff",
                padding: "5px 30px",
              }}
            >
              <Accordion
                expanded={expanded === "panel9"}
                onChange={handleChange("panel9")}
                sx={{ backgroundColor: themeSwitch ? "#24303F" : "#ffffff" }}
              >
                <AccordionSummary
                  aria-controls="panel9d-content"
                  id="panel9d-header"
                >
                  <Typography className={themeSwitch ? "text-white" : ""}>
                    SNMP
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: themeSwitch ? "#1A222C" : "#ffffff",
                    padding: "5px 30px",
                  }}
                >
                  <Typography className={themeSwitch ? "text-white" : ""}>
                    SNMP Catalogue
                  </Typography>
                  <Typography className={themeSwitch ? "text-white" : ""}>
                    SNMP Catalogue
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
            sx={{ backgroundColor: themeSwitch ? "#24303F" : "#ffffff" }}
          >
            <AccordionSummary
              aria-controls="panel6d-content"
              id="panel6d-header"
            >
              <Typography className={themeSwitch ? "text-white" : ""}>
                FLOW SETTINGS
              </Typography>
            </AccordionSummary>
          </Accordion>
          <Accordion
            expanded={expanded === "panel7"}
            onChange={handleChange("panel7")}
            sx={{
              backgroundColor: themeSwitch ? "#24303F" : "#ffffff",
              borderRadius: " 0  0 1rem 1rem",
            }}
          >
            <AccordionSummary
              aria-controls="panel7d-content"
              id="panel7d-header"
            >
              <Typography className={themeSwitch ? "text-white" : ""}>
                CLUSTER MANAGEMENT
              </Typography>
            </AccordionSummary>
          </Accordion>
        </div>
        <div className="mx-4 p-2 border-2 rounded-xl w-max h-full">hi</div>
      </div>
    </div>
  );
}
