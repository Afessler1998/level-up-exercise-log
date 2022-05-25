import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
  StyleSheet
} from "react-native";
import Calendar from "./Calendar";

const { width } = Dimensions.get("window");

class CalendarList extends Component {
  constructor(props) {
    super(props);
    this.flatListRef = null;
  }

  componentDidUpdate() {
    const { dateRangeForward, dateRangeBack } = this.props;
    this.flatListRef.scrollToIndex({
      index: dateRangeForward / 2 + dateRangeBack / 2,
      animated: false
    });
  }

  getData = () => {
    const { calendarDate, dateRangeBack, dateRangeForward } = this.props;
    const data = [];
    for (let i = -dateRangeBack; i <= dateRangeForward; i += 1) {
      const date = new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth() + i,
        1
      );
      data.push({ key: `${i}`, date });
    }
    return data;
  };

  render() {
    const { dateRangeBack, dateRangeForward } = this.props;
    return (
      <SafeAreaView style={styles.contentContainer}>
        <View
          style={styles.contentContainer}
          onLayout={() => {
            this.flatListRef.scrollToIndex({
              index: dateRangeForward / 2 + dateRangeBack / 2,
              animated: false
            });
          }}
        >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            initialNumToRender={7}
            ref={(ref) => (this.flatListRef = ref)}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index
            })}
            data={this.getData()}
            renderItem={({ item }) => {
              const { markedDates, navigation } = this.props;
              return (
                <Calendar
                  date={item.date}
                  markedDates={markedDates}
                  navigation={navigation}
                />
              );
            }}
            keyExtractor={(item) => item.key}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: "center",
    flex: 1,
    marginTop: 5,
    marginBottom: 10
  }
});

export default CalendarList;
