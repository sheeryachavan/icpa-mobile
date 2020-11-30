import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Dimensions, Image } from "react-native";
import { Block, Text, Button } from "galio-framework";
import { showTopErrorMessage } from "../_utils/helper";
import { CreditCard } from "../constants/Images";
const { width } = Dimensions.get("screen");
import { payRegistrationFees, payVariableFees } from "../redux/slices/Login";
import { Input } from "../components";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
const decimalNoRegex = /^\d*\.?\d*$/;

let _type = [
  { label: "Membership Payment", value: 0, key: "membership" },
  { label: "Miscellaneous Payment", value: 1, key: "varaible" },
];
import { icpaTheme } from "../constants";

export default function Payment() {
  const dispatch = useDispatch();
  const state = useSelector((_state) => _state.dataLogin);
  const [memberCta, setMemberCta] = useState("Membership Payment");
  const [varaibleCta, setVaraibleCta] = useState("Variable Payment");
  const [des, setDes] = useState("");
  const [amt, setAmt] = useState("");
  const [type, setType] = useState(0);

  const handleSubmit = () => {
    let token = state.token.jwtToken;
    setMemberCta("Please wait...");
    dispatch(
      payRegistrationFees(token, (error, data) => {
        if (error) {
          showTopErrorMessage(data || "Something went wrong!", "danger");
        } else {
          showTopErrorMessage(
            data || "Please check your Mail or Phone no",
            "success"
          );
        }
        setMemberCta("Membership Payment");
      })
    );
  };
  const handleVariableSubmit = () => {
    let token = state.token.jwtToken;
    if (amt === "") {
      showTopErrorMessage("Amount is required", "danger");
    } else if (!decimalNoRegex.test(amt)) {
      showTopErrorMessage("Amount is not Valid", "danger");
    } else if (des === "") {
      showTopErrorMessage("Description is required", "danger");
    } else {
      setVaraibleCta("Please wait...");
      const data = {
        amount: amt,
        description: des,
      };
      dispatch(
        payVariableFees(token, data, (error, data) => {
          if (error) {
            showTopErrorMessage(data || "Something went wrong!", "danger");
          } else {
            showTopErrorMessage(
              data || "Please check your Mail or Phone no",
              "success"
            );
          }
          setVaraibleCta("Membership Payment");
        })
      );
    }
  };

  return (
    <Block flex style={styles.home}>
      <Block width={width * 0.8}>
        <Block style={[styles.shadow, styles.input, { marginTop: 15 }]}>
          <Text
            style={{ paddingBottom: 5, color: icpaTheme.COLORS.PLACEHOLDER }}
          >
            Select payment type
          </Text>
          <RadioForm formHorizontal={false} animation={true}>
            {_type.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i}>
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={type === i}
                  onPress={(value) => {
                    setType(value);
                  }}
                  borderWidth={1}
                  buttonInnerColor={icpaTheme.COLORS.SECONDARY}
                  buttonOuterColor={
                    type === i
                      ? icpaTheme.COLORS.PRIMARY
                      : icpaTheme.COLORS.INPUT
                  }
                  buttonSize={20}
                  buttonOuterSize={20}
                  buttonWrapStyle={[{ margin: 5 }]}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  onPress={(value) => {
                    setType(value);
                  }}
                  labelStyle={{
                    fontSize: 14,
                    color: icpaTheme.COLORS.PRIMARY,
                  }}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </Block>
      </Block>
      <Image source={CreditCard} />
      {type === 0 ? (
        <Block middle center>
          <Text size={16} color={icpaTheme.COLORS.SECONDARY}>
            Proceed to make membership payment
          </Text>
          <Button
            color="primary"
            style={styles.createButton}
            onPress={memberCta === "Please wait..." ? () => {} : handleSubmit}
          >
            <Text bold size={14} color={icpaTheme.COLORS.WHITE}>
              {memberCta}
            </Text>
          </Button>
        </Block>
      ) : (
        <Block width={width * 0.8}>
          <Text size={14} color={icpaTheme.COLORS.SECONDARY}>
            Amount
          </Text>
          <Input
            right
            type="decimal-pad"
            placeholder="Amount"
            onChangeText={(text) => {
              setAmt(text);
            }}
          />
          <Text
            size={14}
            style={styles.left}
            color={icpaTheme.COLORS.SECONDARY}
          >
            Description
          </Text>
          <Input
            right
            placeholder="Description"
            onChangeText={(text) => {
              setDes(text);
            }}
          />
          <Button
            color="primary"
            style={styles.createButton}
            onPress={
              varaibleCta === "Please wait..." ? () => {} : handleVariableSubmit
            }
          >
            <Text bold size={14} color={icpaTheme.COLORS.WHITE}>
              {varaibleCta}
            </Text>
          </Button>
        </Block>
      )}
    </Block>
  );
}
const styles = StyleSheet.create({
  home: {
    padding: 20,
    alignItems: "center",
    minWidth: width * 0.7,
    position: "relative",
  },
  left: {
    textAlign: "left",
  },
  createButton: {
    width: 180,
    height: 50,
    marginTop: 15,
  },
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: "#fff",
  },
});
