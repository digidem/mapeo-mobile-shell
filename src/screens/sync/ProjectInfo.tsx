import * as React from "react";
import { Image, Linking, StyleSheet, View } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { defineMessages, useIntl } from "react-intl";

import { Text } from "../../components/Text";
import { useWifiInfo } from "../../hooks/useWifiInfo";
import { colors, spacing } from "../../lib/styles";

const TAB_SIZE = 36;

const m = defineMessages({
  noConnection: {
    id: "screen.sync.ProjectInfo.noConnection",
    defaultMessage: "No connection",
  },
  connectedNoNetworkName: {
    id: "screen.sync.ProjectInfo.connectedNoNetworkName",
    defaultMessage: "Connected (no network name)",
  },
  project: {
    id: "screen.sync.ProjectInfo.project",
    defaultMessage: "Project {name}",
  },
});

const WifiIcon = ({ active }: { active?: boolean }) => {
  return (
    <MaterialIcon
      color={colors.WHITE}
      style={{
        backgroundColor: colors.DARK_BLUE,
        padding: spacing.small,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
      name={active ? "wifi" : "wifi-strength-off"}
      size={16}
    />
  );
};

const viewSwitchStyles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 6,
    padding: spacing.small / 2,
    backgroundColor: colors.GRAY,
  },
  innerContainer: { flexDirection: "row" },
  baseTab: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    height: TAB_SIZE,
    width: TAB_SIZE,
  },
});

const ViewSwitch = ({
  value,
  toggle,
}: {
  value: "list" | "bubbles";
  toggle: () => void;
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={toggle}
      style={viewSwitchStyles.container}
    >
      <View style={viewSwitchStyles.innerContainer}>
        <View
          style={[
            viewSwitchStyles.baseTab,

            value === "list"
              ? {
                  elevation: 5,
                  backgroundColor: colors.WHITE,
                }
              : undefined,
          ]}
        >
          <MaterialIcon
            name="format-list-bulleted-square"
            size={TAB_SIZE / 1.5}
          />
        </View>
        <View style={{ width: spacing.small }}></View>
        <View
          style={[
            viewSwitchStyles.baseTab,
            value === "bubbles"
              ? {
                  elevation: 5,
                  backgroundColor: colors.WHITE,
                }
              : undefined,
          ]}
        >
          <MaterialIcon name="graphql" size={TAB_SIZE / 1.5} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const projectInfoStyles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: colors.WHITE,
  },

  titleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHT_GRAY,
    padding: spacing.large / 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  connectionInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  wifiIconContainer: {
    marginRight: spacing.medium,
  },

  ssidContainer: { flex: 1 },

  logoImageContainer: {
    marginBottom: spacing.large,
  },

  logoImage: { width: 100, height: 100 },

  bodyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.large * 1.5,
    paddingHorizontal: spacing.large / 2,
  },
});

export const ProjectInfo = ({
  name,
  viewMode,
  toggleViewMode,
}: {
  name: string;
  viewMode: "list" | "bubbles";
  toggleViewMode: () => void;
}) => {
  const { formatMessage: t } = useIntl();
  const { permissionEnabled, ssid, wifiConnected } = useWifiInfo();

  return (
    <View style={projectInfoStyles.container}>
      <View style={projectInfoStyles.titleContainer}>
        <View style={projectInfoStyles.connectionInfoContainer}>
          <View style={projectInfoStyles.wifiIconContainer}>
            <WifiIcon active={wifiConnected} />
          </View>
          <View style={projectInfoStyles.ssidContainer}>
            <TouchableWithoutFeedback
              onPress={
                permissionEnabled ? undefined : () => Linking.openSettings()
              }
            >
              <Text size="small" bold numberOfLines={1}>
                {wifiConnected
                  ? ssid || t(m.connectedNoNetworkName)
                  : t(m.noConnection)}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <ViewSwitch value={viewMode} toggle={toggleViewMode} />
      </View>
      <View style={projectInfoStyles.bodyContainer}>
        <View style={projectInfoStyles.logoImageContainer}>
          <Image
            source={require("../../../assets/cards.png")}
            style={projectInfoStyles.logoImage}
          />
        </View>
        <Text size="medium" bold>
          {t(m.project, { name })}
        </Text>
      </View>
    </View>
  );
};
