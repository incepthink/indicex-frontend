"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const faqs = [
  {
    question: "What is IndiceX?",
    answer:
      "IndiceX is a platform offering tokenized exposure to global market indices using stablecoins. It bridges traditional finance and blockchain, allowing anyone to invest in diversified index portfolios without intermediaries.",
  },
  {
    question: "How do I invest?",
    answer:
      "Deposit supported stablecoins and receive index tokens representing diversified exposure. Simply connect your wallet, choose an index, deposit stablecoins, and your tokens are minted instantly on-chain.",
  },
  {
    question: "Can I redeem anytime?",
    answer:
      "Yes, subject to liquidity conditions and protocol safeguards. You can burn your index tokens to receive the underlying stablecoins back at any time during normal market conditions.",
  },
  {
    question: "Is IndiceX custodial?",
    answer:
      "No, assets are managed through transparent on-chain smart contracts. You always retain full ownership of your tokens — IndiceX never takes custody of your funds.",
  },
  {
    question: "What risks exist?",
    answer:
      "Market volatility, smart contract risks, oracle pricing risks, and regulatory risks. While IndiceX is designed with multiple layers of security and audits, all investments carry inherent risk. Always invest responsibly.",
  },
];

const FAQPage = () => {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange = (index: number) => {
    setExpanded((prev) => (prev === index ? false : index));
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        component="section"
        sx={{ bgcolor: "background.default" }}
        className="pt-24 pb-14 px-4"
      >
        <Box className="max-w-4xl mx-auto text-center">
          <Typography
            variant="overline"
            sx={{
              color: "secondary.main",
              fontWeight: 600,
              letterSpacing: "0.2em",
              fontSize: "0.9rem",
            }}
          >
            Support
          </Typography>

          <Typography
            variant="h2"
            sx={{
              color: "text.primary",
              fontWeight: 700,
              mt: 1.5,
              mb: 3,
              lineHeight: 1.15,
            }}
          >
            Frequently Asked{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              Questions
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1.2rem",
              maxWidth: 680,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Everything you need to know about IndiceX, how it works, and how to
            get started.
          </Typography>
        </Box>
      </Box>

      {/* FAQ Accordion Section */}
      <Box
        component="section"
        sx={{ bgcolor: "background.default" }}
        className="pb-24 px-4"
      >
        <Box className="max-w-3xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={() => handleChange(index)}
              disableGutters
              elevation={0}
              sx={{
                bgcolor: "background.paper",
                borderRadius: "12px !important",
                border: "1px solid",
                borderColor:
                  expanded === index
                    ? "primary.main"
                    : "rgba(75, 73, 69, 0.12)",
                transition: "border-color 0.3s ease",
                "&::before": { display: "none" },
                overflow: "hidden",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color:
                        expanded === index ? "primary.main" : "text.secondary",
                      fontSize: "1.5rem",
                    }}
                  />
                }
                sx={{
                  px: 3,
                  py: 1,
                  "& .MuiAccordionSummary-content": { my: 2 },
                }}
              >
                <Typography
                  sx={{
                    color: expanded === index ? "primary.main" : "text.primary",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    transition: "color 0.3s ease",
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: "1rem",
                    lineHeight: 1.8,
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FAQPage;
