import React from "react";
import { ScrollView } from "react-native";
import { defineMessages } from "react-intl";

import { supportedLanguages } from "../../contexts/IntlContext";
import { SelectOne } from "./SelectOne";
import { ScreenComponent } from "../../sharedTypes";
import { colors } from "../../lib/styles";

const m = defineMessages({
  title: {
    id: "screens.LanguageSettings.title",
    defaultMessage: "Language",
    description: "Title language settings screen",
  },
});

export const LanguageSelector: ScreenComponent<"LanguageSelector"> = ({
  route,
}) => {
  const { role } = route.params;
  return (
    <ScrollView style={{ backgroundColor: colors.WHITE }}>
      {supportedLanguages.map((lang) => (
        <SelectOne key={lang.locale} role={role} value={lang} />
      ))}
    </ScrollView>
  );
};

LanguageSelector.navTitle = m.title;
