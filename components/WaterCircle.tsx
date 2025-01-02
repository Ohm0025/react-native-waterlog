import { CircularProgressBase } from "react-native-circular-progress-indicator";
import { Text, Dimensions, View, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";

type WaterCircleProps = {
  totalAmount: number;
  currentAmount: number;
  fetchData: () => void;
};

export default function WaterCircle(props: WaterCircleProps) {
  const { width } = Dimensions.get("window");
  const radiusCircle = width * 0.43 >= 200 ? 200 : width * 0.43;
  const radiusSmall = radiusCircle * 0.7;

  useEffect(() => {
    props.fetchData();
  }, []);

  return (
    <CircularProgressBase
      radius={radiusCircle}
      value={(props.currentAmount * 100) / props.totalAmount}
      activeStrokeColor={"blue"}
      inActiveStrokeOpacity={0.2}
      inActiveStrokeColor="gray"
      activeStrokeWidth={37}
      inActiveStrokeWidth={37}
    ></CircularProgressBase>
  );
}
