import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import i18n from "../i18n/i18nHelper";
import { useSelector } from "react-redux";

const Schemes = () => {
  const lang = useSelector((state) => state.root.lang);
  i18n.locale = lang;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderModalContent = () => {
    if (!selectedItem) {
      return null;
    }

    return (
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{selectedItem.title}</Text>
        <Text style={styles.modalDescription}>{selectedItem.description}</Text>
        <TouchableOpacity
          style={styles.modalLink}
          onPress={() => Linking.openURL(selectedItem.englishLink)}
        >
          <Text style={styles.modalLinkText}>{i18n.t("readMoreEnglish")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.modalLink}
          onPress={() => Linking.openURL(selectedItem.kannadalink)}
        >
          <Text style={styles.modalLinkText}>{i18n.t("readMoreKannada")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
          <Text style={styles.modalCloseButtonText}>
            {i18n.t("closeScheme")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const data = [
    {
      id: 1,
      title: i18n.t("listTitle1"),
      description: i18n.t("description1"),
      kannadalink:
        "https://raitamitra.karnataka.gov.in/info-2/Chief+Minister+Raitha+Vidya+Nidhi/kn",
      englishLink:
        "https://raitamitra.karnataka.gov.in/info-2/Chief+Minister+Raitha+Vidya+Nidhi/en",
    },
    {
      id: 2,
      title: i18n.t("listTitle2"),
      description: i18n.t("description2"),
      kannadalink:
        "https://raitamitra.karnataka.gov.in/info-2/Pradhan+Mantri+KIsan+SAmman+Nidhi+(PM+KISAN)/kn",
      englishLink:
        "https://raitamitra.karnataka.gov.in/info-2/Pradhan+Mantri+KIsan+SAmman+Nidhi+(PM+KISAN)/en",
    },

    {
      id: 3,
      title: i18n.t("listTitle2"),
      description: i18n.t("description3"),
      kannadalink:
        "https://raitamitra.karnataka.gov.in/info-2/Organic+Farming+and+Millet+Promotional+Programs/Savayava+Siri/kn",
      englishLink:
        "https://raitamitra.karnataka.gov.in/info-2/Organic+Farming+and+Millet+Promotional+Programs/Savayava+Siri/en",
    },
    {
      id: 4,
      title: i18n.t("listTitle2"),
      description: i18n.t("description4"),
      kannadalink:
        "https://raitamitra.karnataka.gov.in/info-2/Rashtriya+Krishi+Vikas+Yojana(RKVY+RAFTAAR)/kn",
      englishLink:
        "https://raitamitra.karnataka.gov.in/info-2/Rashtriya+Krishi+Vikas+Yojana(RKVY+RAFTAAR)/en",
    },
    {
      id: 5,
      title: i18n.t("listTitle2"),
      description: i18n.t("description5"),
      kannadalink:
        "https://raitamitra.karnataka.gov.in/info-2/FERTILIZER+AND+MANURE/Guideline+and+Circulars/kn",
      englishLink:
        "https://raitamitra.karnataka.gov.in/info-2/FERTILIZER+AND+MANURE/Guideline+and+Circulars/en",
    },
    {
      id: 6,
      title: i18n.t("listTitle2"),
      description: i18n.t("description6"),
      kannadalink:
        "https://raitamitra.karnataka.gov.in/info-2/krushi+Bhagya/kn",
      englishLink:
        "https://raitamitra.karnataka.gov.in/info-2/krushi+Bhagya/en",
    },
    {
      id: 7,
      title: i18n.t("listTitle2"),
      description: i18n.t("description7"),
      kannadalink:
        "https://raitamitra.karnataka.gov.in/info-2/Seeds/Rate+Contract/kn",
      englishLink:
        "https://raitamitra.karnataka.gov.in/info-2/Seeds/Rate+Contract/en",
    },
    {
      id: 8,
      title: i18n.t("listTitle2"),
      description: i18n.t("description8"),
      kannadalink:
        "https://raitamitra.karnataka.gov.in/info-2/Micro+Irrigation/Guideline+Government+Order+and++Circulars/kn",
      englishLink:
        "https://raitamitra.karnataka.gov.in/info-2/Micro+Irrigation/Guideline+Government+Order+and++Circulars/en",
    },
    {
      id: 9,
      title: i18n.t("listTitle2"),
      description: i18n.t("description9"),
      kannadalink:
        "https://raitamitra.karnataka.gov.in/info-2/Farm+Mechanization+And++Agro+processing/Guideline+Government+Order+and++Circulars/kn",
      englishLink:
        "https://raitamitra.karnataka.gov.in/info-2/Farm+Mechanization+And++Agro+processing/Guideline+Government+Order+and++Circulars/en",
    },
    {
      id: 10,
      title: i18n.t("listTitle2"),
      description: i18n.t("description10"),
      kannadalink:
        "https://raitamitra.karnataka.gov.in/info-2/Natinal+Mission+For+Sustainable+Agriculture(NMSA)/Soil+Heath+Mission/kn",
      englishLink:
        "https://raitamitra.karnataka.gov.in/info-2/Natinal+Mission+For+Sustainable+Agriculture(NMSA)/Soil+Heath+Mission/en",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            onPress={() => openModal(item)}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.link}>{i18n.t("tapToReadMore")}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>{renderModalContent()}</View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: "#f5f5f1",
    borderRadius: 15,
    elevation: 5,
  },
  title: {
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
  },
  link: {
    marginTop: 10,
    marginLeft: 20,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#001e7c",
    marginBottom: 15,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.97)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: Dimensions.get("window").width / 1.08,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    marginBottom: 10,
  },
  modalDescription: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    marginBottom: 10,
  },
  modalLink: {
    marginTop: 10,
    backgroundColor: "#328d38",
    padding: 10,
    borderRadius: 5,
  },
  modalLinkText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#fff",
    textAlign: "center",
  },
  modalCloseButton: {
    marginTop: 10,
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#000",
    textAlign: "center",
  },
});

export default Schemes;
