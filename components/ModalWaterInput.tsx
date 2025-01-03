import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { styles, style2 } from "@/styles";
import DrinkChoice from "./drinkScale/DrinkChoice.";
import AddCloseBtn from "./AddCloseBtn";
import dbHandle from "@/dbFunc/dbHandle";

type ModalWaterInputProps = {
  setModal: (modal: boolean) => void;
  fetchData: () => void;
};

export default function ModalWaterInput(props: ModalWaterInputProps) {
  const [amount, setAmount] = useState("");
  const [useScale, setUseScale] = useState(false);
  const { width: w, height: h } = Dimensions.get("window");

  const inputRef = useRef<TextInput>(null);

  const handleChangeAmount = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setAmount(numericValue);
  };

  const handleSubmit = async (amount: string) => {
    if (!amount) return;
    await dbHandle.createRecord(Number(amount));
    props.fetchData();
    props.setModal(false);
  };

  useEffect(() => {
    if (!useScale) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      inputRef.current?.blur();
    }
  }, [useScale]);

  return (
    <View
      style={{
        width: w,
        height: useScale ? h * 0.7 : h * 0.5,
        ...style2.modalStyle,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 20,
        }}
      >
        Record water
      </Text>
      <TouchableOpacity
        onPress={() => setUseScale((prev) => !prev)}
        style={{
          marginHorizontal: "auto",
          width: "50%",
          backgroundColor: useScale ? "green" : "skyblue",
          paddingVertical: 12,
          borderRadius: 15,
          marginTop: 10,
        }}
      >
        {useScale ? (
          <Text
            style={{
              fontSize: 15,
              fontWeight: 600,
              textAlign: "center",
              color: "white",
            }}
          >
            use input record
          </Text>
        ) : (
          <Text style={{ fontSize: 15, fontWeight: 600, textAlign: "center" }}>
            use drinking scale
          </Text>
        )}
      </TouchableOpacity>
      <TextInput
        ref={inputRef}
        style={{
          ...styles.inputContainer,
          marginHorizontal: "auto",
        }}
        placeholder="ml"
        readOnly={useScale}
        value={amount}
        keyboardType="numeric"
        onChangeText={handleChangeAmount}
      ></TextInput>
      {useScale ? (
        <DrinkChoice
          closeModal={() => props.setModal(false)}
          onPress={async () => await handleSubmit(amount)}
          setAmount={(amountWater: number) =>
            setAmount((prev) => (Number(prev) + amountWater).toString())
          }
        />
      ) : (
        <AddCloseBtn
          onPress={async () => await handleSubmit(amount)}
          closeModal={() => props.setModal(false)}
        />
      )}
    </View>
  );
}
