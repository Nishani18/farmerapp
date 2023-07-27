import i18n from "../i18n/i18nHelper";
import { useSelector } from "react-redux";

const languageChange = () => {
  const lang = useSelector((state) => state.root.lang);
  i18n.locale = lang;
};

const SchemesData = [
  {
    id: 1,
    name: i18n.t("listTitle1"),
    description: i18n.t("description1"),
    kannadalink:
      "https://raitamitra.karnataka.gov.in/info-2/Chief+Minister+Raitha+Vidya+Nidhi/kn",
    englishLink:
      "https://raitamitra.karnataka.gov.in/info-2/Chief+Minister+Raitha+Vidya+Nidhi/en",
  },
  {
    id: 2,
    name: "Pradhan Mantri Kisan Samman Nidhi (PM KISAN)",
    description:
      "Pradhan Mantri Kisan Samman Nidhi (PM KISAN) is a scheme by the Government of India that provides income support to small and marginal farmers. Eligible farmers receive Rs. 6,000 per year in three equal installments, directly into their bank accounts, to help with agricultural expenses and household needs.",
    kannadalink:
      "https://raitamitra.karnataka.gov.in/info-2/Pradhan+Mantri+KIsan+SAmman+Nidhi+(PM+KISAN)/kn",
    englishLink:
      "https://raitamitra.karnataka.gov.in/info-2/Pradhan+Mantri+KIsan+SAmman+Nidhi+(PM+KISAN)/en",
  },
  {
    id: 3,
    name: "Savayava Siri",
    description:
      "Savayava Siri is a Karnataka government initiative to promote organic farming by providing subsidies, training, and support to farmers. Its aim is to encourage sustainable agriculture and protect the environment.",
    kannadalink:
      "https://raitamitra.karnataka.gov.in/info-2/Organic+Farming+and+Millet+Promotional+Programs/Savayava+Siri/kn",
    englishLink:
      "https://raitamitra.karnataka.gov.in/info-2/Organic+Farming+and+Millet+Promotional+Programs/Savayava+Siri/en",
  },
  {
    id: 4,
    name: "Rashtriya Krishi Vikas Yojana(RKVY RAFTAAR)",
    description:
      "Rashtriya Krishi Vikas Yojana (RKVY RAFTAAR) is an Indian government scheme that promotes agricultural development by providing financial support to states for implementing innovative projects. It aims to achieve a 4% annual growth rate in the agriculture sector and focuses on enhancing productivity, value addition, and infrastructure.",
    kannadalink:
      "https://raitamitra.karnataka.gov.in/info-2/Rashtriya+Krishi+Vikas+Yojana(RKVY+RAFTAAR)/kn",
    englishLink:
      "https://raitamitra.karnataka.gov.in/info-2/Rashtriya+Krishi+Vikas+Yojana(RKVY+RAFTAAR)/en",
  },
  {
    id: 5,
    name: "Fertilizer and Manure",
    description:
      "The Government of Karnataka offers a Fertilizer and Manure service to farmers, providing easy access to quality fertilizers and manure through subsidized distribution centers. The service also includes soil testing facilities to promote sustainable farming practices.",
    kannadalink:
      "https://raitamitra.karnataka.gov.in/info-2/FERTILIZER+AND+MANURE/Guideline+and+Circulars/kn",
    englishLink:
      "https://raitamitra.karnataka.gov.in/info-2/FERTILIZER+AND+MANURE/Guideline+and+Circulars/en",
  },
  {
    id: 6,
    name: "Krushi Bhagya",
    description:
      "Krushi Bhagya is a Karnataka government scheme that provides financial support to small and marginal farmers for crop cultivation, including land preparation, seed treatment, and marketing. The scheme aims to improve agricultural productivity and is implemented by the Department of Agriculture, Government of Karnataka.",
    kannadalink: "https://raitamitra.karnataka.gov.in/info-2/krushi+Bhagya/kn",
    englishLink: "https://raitamitra.karnataka.gov.in/info-2/krushi+Bhagya/en",
  },
  {
    id: 7,
    name: "Seeds",
    description:
      "The Government of Karnataka provides a Seeds service to promote the use of quality seeds for agricultural purposes. The service includes seed production and distribution centers, training, and technical assistance for farmers. It is administered by the Department of Agriculture, Government of Karnataka, to support the agricultural sector and promote sustainable farming practices.",
    kannadalink:
      "https://raitamitra.karnataka.gov.in/info-2/Seeds/Rate+Contract/kn",
    englishLink:
      "https://raitamitra.karnataka.gov.in/info-2/Seeds/Rate+Contract/en",
  },
  {
    id: 8,
    name: "Micro Irrigation",
    description:
      "The Government of Karnataka provides Micro Irrigation services to promote efficient water use in agriculture. The service includes technical assistance, training, and financial support for adopting micro-irrigation technologies such as drip and sprinkler systems. The service is administered by the Department of Water Resources to promote sustainable water management practices in the state.",
    kannadalink:
      "https://raitamitra.karnataka.gov.in/info-2/Micro+Irrigation/Guideline+Government+Order+and++Circulars/kn",
    englishLink:
      "https://raitamitra.karnataka.gov.in/info-2/Micro+Irrigation/Guideline+Government+Order+and++Circulars/en",
  },
  {
    id: 9,
    name: "Farm Mechanization And Agro processing",
    description:
      "The Government of Karnataka's Farm Mechanization and Agro-processing service provides financial assistance, training, and technical support to farmers for modern farming practices. This service helps increase agricultural productivity and income and is administered by the Department of Agriculture.",
    kannadalink:
      "https://raitamitra.karnataka.gov.in/info-2/Farm+Mechanization+And++Agro+processing/Guideline+Government+Order+and++Circulars/kn",
    englishLink:
      "https://raitamitra.karnataka.gov.in/info-2/Farm+Mechanization+And++Agro+processing/Guideline+Government+Order+and++Circulars/en",
  },
  {
    id: 10,
    name: "National Mission For Sustainable Agriculture(NMSA)",
    description:
      "NMSA is a Government of India scheme promoting sustainable agriculture practices, including soil health, water conservation, and productivity improvement. It supports integrated farming, agroforestry, and farmer skill development, implemented by the Department of Agriculture.",
    kannadalink:
      "https://raitamitra.karnataka.gov.in/info-2/Natinal+Mission+For+Sustainable+Agriculture(NMSA)/Soil+Heath+Mission/kn",
    englishLink:
      "https://raitamitra.karnataka.gov.in/info-2/Natinal+Mission+For+Sustainable+Agriculture(NMSA)/Soil+Heath+Mission/en",
  },
  {
    id: 11,
    name: "Krushi Abhiyaana",
    description:
      "Krushi Abhiyaana is a program by the Government of Karnataka to provide financial and technical support to farmers, promoting sustainable farming practices through soil health cards, training, and crop insurance. The program aims to increase crop yields, reduce input costs, and increase farmers' income, and is implemented by the Department of Agriculture.",
    link: "https://raitamitra.karnataka.gov.in/info-2/Krushi+Abhiyaana/kn",
  },
  {
    id: 12,
    name: "National Food Security Mission(NFSM)",
    description:
      "The National Food Security Mission (NFSM) increases food grain production and improves food security through better technology and farming practices for rice, wheat, and pulses. It's implemented by the Department of Agriculture.",
    link: "https://raitamitra.karnataka.gov.in/info-2/National+Food+Security+Mission(NFSM)/Rice-Pulse-Coarse+Cereals-Nutri+Cereals+and+ARPP/kn",
  },
  {
    id: 13,
    name: "ATMA",
    description:
      "ATMA is a government program in India that promotes sustainable agricultural practices by providing training, extension services, and market linkages to farmers. It aims to improve productivity and income and is implemented by the Department of Agriculture.",
    link: "https://raitamitra.karnataka.gov.in/info-2/ATMA/kn",
  },
  {
    id: 14,
    name: "TRAINING",
    description:
      "Karnataka Government provides training to farmers on advanced farming techniques, pest management, and market linkages. The goal is to improve productivity and promote sustainable practices.",
    link: "https://raitamitra.karnataka.gov.in/info-2/TRAINING/kn",
  },
  {
    id: 15,
    name: "Plant Protection",
    description:
      "The Plant Protection service of the Karnataka Government offers farmers information on pest control and management, conducts pest surveillance, and provides access to safe and effective pesticides. Its goal is to enhance agricultural productivity and ensure food security.",
    link: "https://raitamitra.karnataka.gov.in/info-2/Plant+Protection/Quality+Control/kn",
  },
  {
    id: 16,
    name: "COMPENSATION FOR FARMERS SUICIDE",
    description:
      "The Government of Karnataka offers compensation to the families of farmers who have committed suicide due to financial distress, including education assistance for their children. It is implemented by the Department of Agriculture, Karnataka.",
    link: "https://raitamitra.karnataka.gov.in/info-2/COMPENSATION+FOR+FARMERS+SUICIDE/Guideline+and+Circulars/kn",
  },
  {
    id: 17,
    name: "State Pesticide Testing Laboratory",
    description:
      "The State Pesticide Testing Laboratory of Karnataka Government tests pesticides to ensure safety and quality. It aims to ensure farmers have access to safe and effective pesticides.",
    link: "https://raitamitra.karnataka.gov.in/info-2/State+Pesticide+Testing+Laboratory/Bio+control+Laboratory/kn",
  },
  {
    id: 18,
    name: "Accidental Death and hayloss compensations",
    description:
      "The Government of Karnataka offers compensation to farmers' families for accidental death or hay loss due to natural calamities to help them recover from the losses. It is implemented by the Department of Agriculture.",
    link: "https://raitamitra.karnataka.gov.in/info-2/Accidental+Death+and+hayloss+compensations/Guideline+and+Circulars/kn",
  },
  {
    id: 19,
    name: "Discount for 1 percent Crop loan",
    description:
      "The Karnataka government offers a 1% discount on crop loans up to Rs. 3 lakh taken by farmers from cooperative banks and other financial institutions. It aims to provide affordable credit to farmers for agricultural activities.",
    link: "https://raitamitra.karnataka.gov.in/info-2/Discount+for+1+percent+Crop+loan/Guideline+and+Circulars/kn",
  },
  {
    id: 20,
    name: "Karnataka Raitha Suraksha Pradhana Mantri Fasal Bima Yojana",
    description:
      "The Karnataka crop insurance scheme, known as Raitha Suraksha Pradhana Mantri Fasal Bima Yojana, offers affordable crop insurance to farmers in case of crop loss or damage due to natural calamities, ensuring their financial stability.",
    link: "https://raitamitra.karnataka.gov.in/info-2/Karnataka+Raitha+Suraksha+Pradhana+Mantri+Fasal+Bima+Yojana/Guidelines+And+Circular/kn",
  },
  {
    id: 21,
    name: "Fertilizer and Biofertilizer Quality Control Laboratory",
    description:
      "The Fertilizer and Biofertilizer Quality Control Lab in Karnataka tests fertilizers and biofertilizers for safety and effectiveness, issuing quality certificates to dealers and manufacturers",
    link: "https://raitamitra.karnataka.gov.in/info-2/Fertilizer+and++Biofertilizer+Quality+Control+Laboratory/kn",
  },
  {
    id: 22,
    name: "Raita Siri",
    description:
      "Raita Siri is a government of Karnataka scheme that aims to provide financial assistance to small and marginal farmers in the state. Under this scheme, eligible farmers can receive Rs. 10,000 per hectare of land as direct benefit transfer (DBT) for a maximum of 10 hectares per farmer per year.",
    link: "https://raitamitra.karnataka.gov.in/info-2/Raita+Siri/kn",
  },
  {
    id: 23,
    name: "Raitha Samparka Kendra",
    description:
      "Raitha Samparka Kendra - Karnataka government's initiative to establish centers for connecting farmers to agricultural experts, providing them with information and advice on farming practices, crop management, market trends, and other related issues.",
    link: "https://raitamitra.karnataka.gov.in/info-2/Raitha+Samparka+Kendra/kn",
  },
  {
    id: 24,
    name: "Crop Survey Scheme",
    description:
      "The Crop Survey Scheme is a Karnataka government initiative to collect crop data and develop strategies to enhance agricultural productivity and support farmers.",
    link: "https://raitamitra.karnataka.gov.in/info-2/Crop+Survey+Scheme/kn",
  },
  {
    id: 25,
    name: "Maize D B T",
    description:
      "Maize DBT is a government scheme that provides direct benefit transfer to farmers for the cultivation of maize crops.",
    link: "https://raitamitra.karnataka.gov.in/info-2/Maize+D+B+T/kn",
  },
  {
    id: 26,
    name: "Pesticides Licence Related",
    description:
      "Karnataka Government provides Pesticide License to regulate the manufacture, sale, and distribution of pesticides in the state, ensuring the safety of farmers, consumers, and the environment.",
    link: "https://raitamitra.karnataka.gov.in/info-2/Pesticides+Licence+Related/kn",
  },
  {
    id: 27,
    name: "Soil Health Mission State Sector",
    description:
      "Karnataka's Soil Health Mission is a state-level initiative to promote soil health and sustainable agricultural practices. The program aims to increase crop productivity by improving soil fertility, nutrient management, and soil conservation through various interventions such as soil testing, balanced fertilizer use, and crop residue management.",
    link: "https://raitamitra.karnataka.gov.in/info-2/Soil+Health+Mission+State+Sector/kn",
  },
  {
    id: 28,
    name: "Krishi Yantra Dhare(CHSC)",
    description:
      "Krishi Yantra Dhare (CHSC) is a scheme by the Karnataka government aimed at providing agricultural machinery and equipment to farmers on a rental basis. The scheme aims to improve farm productivity by making modern and efficient farming equipment available to farmers at affordable prices.",
    link: "https://raitamitra.karnataka.gov.in/info-2/Krishi+Yantra+Dhare(CHSC)/Service+Providers/kn",
  },
];

export default SchemesData;
