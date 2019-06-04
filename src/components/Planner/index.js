// @flow
import React from "react";
import moment from "moment";
import groupBy from "lodash/groupBy";
import get from "lodash/get";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import type { Recipe as RecipeProps } from "~/types/recipe";
import type { DaySchedule, Planning } from "~/types/plan";
import { formatToDate, getCurrentWeek, getCurrentDays } from "~/helpers/dates";
import { DISH_TYPES } from "~/constants/strings";
import Paragraph from "~/components/common/Paragraph";
import RecipeMenu from "~/components/RecipeMenu";
import { WORKDAYS } from "~/constants/dates";
import { GRAY_DARK } from "~/constants/colors";
import Content from "./Content";
import Schedule from "./Schedule";
import Header from "./Header";
import Summary from "./Summary";
import Navigation from "./Navigation";
import Section, { SectionTitle, SectionToggle } from "./Section";
import EmptySchedule from "./EmptySchedule";
import EmptyPlanning from "./EmptyPlanning";
import { WEEK, DAYS_FILTER } from "~/constants/dropdown";

type Props = {
  planning: Planning,
  menuId: string,
  count: number
};

type State = {
  weekDay: moment,
  currentViewFilter: string
};

type ViewablePlanningDays = Array<?DaySchedule>;

const orderRecipes = (
  recipes: Array<RecipeProps>
): { [key: string]: Array<RecipeProps> } => {
  return groupBy(recipes, recipe => Number(recipe.plan.order));
};

const setRecipes = (
  recipes: Array<RecipeProps>,
  schedule: string,
  menuId: string,
  count: number
) => {
  const recipesByGroups = orderRecipes(recipes);
  //eslint-disable-next-line no-console
  const onToggle = (...args) => console.log("onToggle", ...args);
  return Object.keys(recipesByGroups).map((group: string) => {
    return (
      <Section
        onToggle={onToggle}
        key={group}
        group={group}
        schedule={schedule}
        menuId={menuId}
        count={count}
      >
        {({ on, toggleProps }) => (
          <>
            <SectionTitle>
              <Paragraph>{DISH_TYPES[Number(group) - 1]}</Paragraph>
              <SectionToggle
                aria-label={`section-toggle-${group}`}
                {...toggleProps}
              >
                {on ? (
                  <FontAwesomeIcon icon={faCaretDown} color={GRAY_DARK} />
                ) : (
                  <FontAwesomeIcon icon={faCaretUp} color={GRAY_DARK} />
                )}
              </SectionToggle>
            </SectionTitle>
            {on && <Summary recipes={recipesByGroups[group]} />}
            {on &&
              recipesByGroups[group].map((recipe: RecipeProps) => (
                <RecipeMenu
                  key={recipe.plan.menuUUID}
                  {...recipe}
                  count={count}
                />
              ))}
          </>
        )}
      </Section>
    );
  });
};

const isEmpty = (schedule: Array<any>): boolean =>
  schedule.filter(Boolean).length === 0;

class Planner extends React.Component<Props, State> {
  state = {
    weekDay: moment(),
    currentViewFilter: WEEK
  };

  setNextWeekDay = () => {
    const currentViewableWeek: moment = this.state.weekDay;
    const currentFilter: string = this.state.currentViewFilter;
    const newWeekDay: moment =
      this.state.currentViewFilter === WEEK
        ? currentViewableWeek.endOf("isoWeek").add(2, "days")
        : currentViewableWeek.add(DAYS_FILTER[currentFilter], "days");
    this.setState({ weekDay: newWeekDay });
  };

  setPreviousWeekDay = () => {
    const currentViewableWeek: moment = this.state.weekDay;
    const currentFilter: string = this.state.currentViewFilter;
    const newWeekDay: moment =
      this.state.currentViewFilter === WEEK
        ? currentViewableWeek.startOf("isoWeek").subtract(2, "days")
        : currentViewableWeek.subtract(DAYS_FILTER[currentFilter], "days");
    this.setState({ weekDay: newWeekDay });
  };

  handleViewFilters = (e: Object) => {
    const value = e.target.value;
    this.setState({ currentViewFilter: value });
    const currentViewableWeek: moment = this.state.weekDay;
    const newWeekDay: moment = currentViewableWeek.startOf("isoWeek");
    this.setState({ weekDay: newWeekDay });
  };

  render() {
    const { planning, menuId } = this.props;
    const { weekDay } = this.state;
    const count = DAYS_FILTER[this.state.currentViewFilter];
    const viewablePlanningDays: ViewablePlanningDays = mapSchedulesToCurrentWeek(
      planning,
      weekDay,
      count
    ).filter(
      (section, index) =>
        index < WORKDAYS.length || (index < WORKDAYS.length && section)
    );
    const isPlanningEmpty: boolean = isEmpty(viewablePlanningDays);
    return (
      <React.Fragment>
        <Navigation
          setPrevious={this.setPreviousWeekDay}
          count={count}
          title={weekDay}
          setNext={this.setNextWeekDay}
          onChange={this.handleViewFilters}
        />
        <Header
          weekDay={weekDay}
          hasWeekendSchedule={viewablePlanningDays.length === WORKDAYS.length}
          getCurrentViewValue={count}
        />
        <Content>
          {isPlanningEmpty && <EmptyPlanning />}
          {!isPlanningEmpty &&
            viewablePlanningDays.map((dayPlan: ?DaySchedule, i: number) => {
              if (!dayPlan)
                return (
                  <Schedule key={`dayplan-${i}`}>
                    <EmptySchedule />
                  </Schedule>
                );
              const schedules: Array<string> = Object.keys(dayPlan);
              console.log("-----------DAYPLAN-----------", dayPlan);
              return (
                <Schedule key={`dayplan-${i}`}>
                  {schedules.map(schedule => {
                    //$FlowFixMe
                    const tempTimeStamp = get(dayPlan[schedule], [
                      [0],
                      "plan",
                      "serveAt"
                    ]);
                    const setRecipesArgs = [tempTimeStamp, menuId, count];
                    console.log(
                      "-----------setRecipesArgs -----------",
                      setRecipesArgs
                    );
                    //$FlowFixMe
                    return setRecipes(dayPlan[schedule], ...setRecipesArgs);
                  })}
                </Schedule>
              );
            })}
        </Content>
      </React.Fragment>
    );
  }
}

const setCurrentWeekToPlanningKeys = (
  weekDay: moment,
  count: number
): Array<string> =>
  count === DAYS_FILTER[WEEK]
    ? getCurrentWeek(weekDay).map((date): string => formatToDate(moment(date)))
    : getCurrentDays(weekDay, count).map(
        (date): string => formatToDate(moment(date))
      );
const mapSchedulesToCurrentWeek = (
  planning: Planning,
  weekDay: moment,
  count: number
): Array<?DaySchedule> => {
  const dates: Array<string> = Object.keys(planning);
  const currentWeekDates: Array<string> = setCurrentWeekToPlanningKeys(
    weekDay,
    count
  );
  return currentWeekDates.map((currentWeekDay: string) => {
    const dateIdx: number = dates.findIndex(date => date === currentWeekDay);
    if (dates[dateIdx]) {
      return planning[currentWeekDay];
    }
  });
};

export default Planner;
