//@flow
import React from "react";
import _ from "lodash";
import { FlexWrapper, DayContainer } from "./Components";
import styled from "styled-components";
import { GRAY_LIGHT } from "~/constants/colors";
import { CYCLE_PERIOD_VALUE } from "./DropdownOptions";

const MinMaxItemsContainer = styled.div`
  width: 100%;
  padding-top: 1rem;
  margin-bottom: 1rem;
`;
const MinMaxInputField = styled.input`
  margin-bottom: 1rem;
  height: 25px;
`;

const DayHeader = styled.p`
  padding: 0.5rem 0;
  background: ${GRAY_LIGHT};
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;

  div:nth-child(1) {
  }
  div:nth-child(2) {
  }
`;

const HeaderTitle = styled.h1`
  font-weight: 500;
  font-size: 1.4rem;
`;
type MinMaxInputProps = {
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  className: string,
  placeholder?: string,
  ref?: () => void,
  value: ?any
};
const MinMaxInput = ({
  onChange,
  placeholder,
  value,
  className
}: MinMaxInputProps) => {
  return (
    <MinMaxInputField
      type="number"
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      className={className}
    />
  );
};

type Props = {};

type State = {
  minValue: number,
  maxValue: number,
  minArr: Array<number>,
  maxArr: Array<number>,
  dishTypeArr: Array<string>,
  allDishes: Array<Object>,
  selectedWeek: number,
  cyclePeriod: string
};

export default class MenuStructureConditions extends React.Component<
  Props,
  State
> {
  constructor(props) {
    super(props);
    let fromInputData = localStorage.getItem("createNewMenuFormData");
    let formData = JSON.parse(fromInputData || "{}");

    let newDishTypeArr = [];
    newDishTypeArr.push(formData["dishType"]);
    newDishTypeArr = String(newDishTypeArr).split(",");
    let allDishesArr = [];
    let noOfWeeks = CYCLE_PERIOD_VALUE[formData["cyclePeriod"]];

    newDishTypeArr.forEach(element => {
      let dishObj = {
        dishName: "",
        minValue: 0,
        maxValue: 0,
        weeks: []
      };
      console.log("NOOFWEEKZ:", noOfWeeks);
      for (let i = 0; i < noOfWeeks; i++) {
        let week = {
          weekNo: i + 1,
          weekDays: [
            {
              key: "Monday",
              value: {
                min: 0,
                max: 0,
                recipe: "",
                recipes: []
              }
            },
            {
              key: "Tuesday",
              value: {
                min: 0,
                max: 0,
                recipe: "",
                recipes: []
              }
            },
            {
              key: "Wednesday",
              value: {
                min: 0,
                max: 0,
                recipe: "",
                recipes: []
              }
            },
            {
              key: "Thursday",
              value: {
                min: 0,
                max: 0,
                recipe: "",
                recipes: []
              }
            },
            {
              key: "Friday",
              value: {
                min: 0,
                max: 0,
                recipe: "",
                recipes: []
              }
            },
            {
              key: "Saturday",
              value: {
                min: 0,
                max: 0,
                recipe: "",
                recipes: []
              }
            },
            {
              key: "Sunday",
              value: {
                min: 0,
                max: 0,
                recipe: "",
                recipes: []
              }
            }
          ]
        };

        dishObj.weeks.push(week);
        console.log(i);
      }

      dishObj.dishName = element;
      allDishesArr.push(dishObj);
    });

    console.log(allDishesArr);
    this.state = {
      minValue: 0,
      maxValue: 0,
      minArr: [0, 0, 0, 0, 0, 0, 0],
      maxArr: [0, 0, 0, 0, 0, 0, 0],
      dishTypeArr: newDishTypeArr,
      allDishes: allDishesArr,
      selectedWeek: 0,
      noOfWeeks: noOfWeeks,
      cyclePeriod: formData["cyclePeriod"]
    };
  }

  handleMinValue = (e: SyntheticInputEvent<HTMLInputElement>, idx: number) => {
    let dishArray = this.state.allDishes;
    dishArray[idx].minValue = e.currentTarget.value;
    dishArray[idx].weeks[this.state.selectedWeek].weekDays.forEach(w => {
      w.value.min = e.currentTarget.value;
    });
    localStorage.setItem("allDishes", JSON.stringify(dishArray));
    this.setState({ allDishes: dishArray });
  };

  handleMaxValue = (e: SyntheticInputEvent<HTMLInputElement>, idx: number) => {
    let dishArray = this.state.allDishes;
    dishArray[idx].maxValue = e.currentTarget.value;
    dishArray[idx].weeks[this.state.selectedWeek].weekDays.forEach(w => {
      w.value.max = e.currentTarget.value;
    });
    localStorage.setItem("allDishes", JSON.stringify(dishArray));
    this.setState({ allDishes: dishArray });
  };

  handleSingleMinValue = (
    e: SyntheticInputEvent<HTMLInputElement>,
    index: number,
    idx: number
  ) => {
    e.preventDefault();
    let dishArray = this.state.allDishes;
    dishArray[idx].weeks[this.state.selectedWeek].weekDays[index].value.min =
      e.currentTarget.value;
    localStorage.setItem("allDishes", JSON.stringify(dishArray));
    this.setState({ allDishes: dishArray });
  };

  handleSingleMaxValue = (
    e: SyntheticInputEvent<HTMLInputElement>,
    index: number,
    idx: number
  ) => {
    e.preventDefault();
    let dishArray = this.state.allDishes;
    dishArray[idx].weeks[this.state.selectedWeek].weekDays[index].value.max =
      e.currentTarget.value;
    localStorage.setItem("allDishes", JSON.stringify(dishArray));
    this.setState({ allDishes: dishArray });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.allDishes !== prevState.allDishes) {
      if (JSON.stringify(this.state.allDishes).indexOf('"max":"0"') !== -1) {
        console.log("WITH 0");
        this.props.setMenuStructureDone(false);
      } else {
        this.props.setMenuStructureDone(true);
      }
    }
  }

  changeWeek = e => {
    console.log(this.state.allDishes);
    this.setState({ selectedWeek: e.target.value });
  };

  render() {
    const ContentAll = this.state.allDishes.map((item, index) => {
      return (
        <MinMaxItemsContainer
          className="MinMaxItemsContainer"
          key={`dishType${index}`}
        >
          <HeaderContainer>
            <div>
              <HeaderTitle> {item.dishName} </HeaderTitle>
            </div>
            <div>
              {"Min:"}
              <MinMaxInput
                className={"MinValue"}
                onChange={e => {
                  this.handleMinValue(e, index);
                }}
                value={this.state.allDishes[index].minValue}
              />
              &nbsp; &nbsp;
              {"Max:"}
              <MinMaxInput
                className={"MaxValue"}
                onChange={e => {
                  this.handleMaxValue(e, index);
                }}
                value={this.state.allDishes[index].maxValue}
              />
            </div>
          </HeaderContainer>

          <FlexWrapper className="RowContainer">
            {item.weeks[this.state.selectedWeek].weekDays.map(
              (wObj, windex) => {
                const { min, max } = wObj.value;
                return (
                  <DayContainer key={`Day${windex}`} className="Cell">
                    <DayHeader>{wObj.key} </DayHeader>
                    <MinMaxInput
                      className="MinValue"
                      onChange={e =>
                        this.handleSingleMinValue(e, windex, index)
                      }
                      value={min}
                    />
                    <MinMaxInput
                      className="MaxValue"
                      onChange={e =>
                        this.handleSingleMaxValue(e, windex, index)
                      }
                      value={max}
                    />
                    <button
                      type="submit"
                      onClick={e => this.handleClick(e, windex, index)}
                    >
                      {" "}
                      Apply on {wObj.key}s{" "}
                    </button>
                  </DayContainer>
                );
              }
            )}
          </FlexWrapper>
          <hr />
        </MinMaxItemsContainer>
      );
    });
    const weeksOptions = [];
    for (let i = 1; i <= CYCLE_PERIOD_VALUE[this.state.cyclePeriod]; i++) {
      weeksOptions.push(<option value={i - 1}> {`Week ${i}`}</option>);
    }

    return (
      <React.Fragment>
        <select onChange={this.changeWeek}>{weeksOptions}</select>
        {ContentAll}
      </React.Fragment>
    );
  }
  handleClick(e, index, idx) {
    e.preventDefault();
    let dishArray = this.state.allDishes;
    let min =
      dishArray[idx].weeks[this.state.selectedWeek].weekDays[index].value.min;
    let max =
      dishArray[idx].weeks[this.state.selectedWeek].weekDays[index].value.max;
    console.log(dishArray);
    console.log(min);
    console.log(max);
    console.log(this.state.selectedWeek);
    for (let j = 0; j < dishArray[idx].weeks.length; j++) {
      dishArray[idx].weeks[j].weekDays[index].value.min = min;
      dishArray[idx].weeks[j].weekDays[index].value.max = max;
    }
    this.setState({ allDishes: dishArray });
  }
}
