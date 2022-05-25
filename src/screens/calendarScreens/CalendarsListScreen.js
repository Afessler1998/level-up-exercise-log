import React from "react";
import { View, SafeAreaView, FlatList, StyleSheet } from "react-native";
import { darkGrey } from "../../colorPalette";
import FullYearCalendars from "../../components/calendarComponents/FullYearCalendars";

const CalendarsListScreen = ({ navigation }) => {
  const thisYear = new Date().getFullYear();
  const yearsList = [{ year: thisYear }];

  const renderItem = (item) => (
    <FullYearCalendars year={item.item.year} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.background}>
        <FlatList
          style={styles.flatList}
          data={yearsList}
          renderItem={renderItem}
          initialNumToRender={1}
          onEndReached={() => {
            const lastYear = yearsList[yearsList.length - 1].year;
            yearsList.push({ year: lastYear - 1 });
          }}
          onEndReachedThreshold={0.9}
          keyExtractor={(item) => item.year.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: darkGrey,
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingBottom: 15
  },
  flatList: {
    flex: 1,
    transform: [{ scaleY: -1 }]
  }
});

export default CalendarsListScreen;
