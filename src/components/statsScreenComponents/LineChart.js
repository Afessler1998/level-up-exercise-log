import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Polyline, Line, Text } from "react-native-svg";
import { black, white } from "../../colorPalette";
import { infoText } from "../../fontSizeEnum";
import ChartDateSelector from "./ChartDateSelector";

const LineChart = ({
  graphData,
  graphHeight,
  graphWidth,
  graphPadding,
  setDateFrom,
  setSelectedBtn,
  selectedBtn
}) => {
  let dataPointsString = "";

  const { dataPoints, horizontalGuides } = graphData;

  if (dataPoints) {
    dataPoints.forEach((dataPoint) => {
      dataPointsString = `${dataPointsString + dataPoint.xCoord},${
        dataPoint.yCoord
      } `;
    });
  }

  return (
    <View>
      <View
        style={[styles.container, { height: graphHeight, width: graphWidth }]}
      >
        {dataPoints && (
          <Svg height={graphHeight} width={graphWidth}>
            {/* X axis line */}
            <Line
              x1={graphWidth * graphPadding}
              y1={graphHeight - graphWidth * graphPadding}
              x2={graphWidth - graphWidth * graphPadding}
              y2={graphHeight - graphWidth * graphPadding}
              stroke="black"
            />

            {/* Y axis line */}
            <Line
              x1={graphWidth * graphPadding}
              y1={graphWidth * graphPadding}
              x2={graphWidth * graphPadding}
              y2={graphHeight - graphWidth * graphPadding}
              stroke="black"
            />

            {/* horizontal guides */}
            {horizontalGuides &&
              horizontalGuides.map((horizontalGuide) => (
                <Line
                  key={horizontalGuide.label}
                  x1={horizontalGuide.x1}
                  y1={horizontalGuide.y}
                  x2={horizontalGuide.x2}
                  y2={horizontalGuide.y}
                  stroke="#d3d3d3"
                />
              ))}

            {/* y axis labels */}
            {horizontalGuides &&
              horizontalGuides.map((horizontalGuide) => (
                <Text
                  key={`text ${horizontalGuide.label}`}
                  x={horizontalGuide.x1 / 4}
                  y={`${horizontalGuide.y + 5}`}
                  fill="black"
                >
                  {horizontalGuide.label}
                </Text>
              ))}

            {/* exercise data */}
            <Polyline
              points={dataPointsString}
              stroke="black"
              strokeWidth={1}
            />
          </Svg>
        )}
      </View>
      <ChartDateSelector
        setDateFrom={setDateFrom}
        setSelectedBtn={setSelectedBtn}
        selectedBtn={selectedBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },
  text: {
    color: black,
    fontSize: infoText
  }
});

export default LineChart;
