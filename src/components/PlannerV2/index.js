// @flow
import React from "react";
import moment from "moment";
import styled from "styled-components";
import groupBy from "lodash/groupBy";
import {connect} from "react-redux";
import {withNamespaces} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp, faLeaf, faStar, faTrashAlt, faUtensils} from "@fortawesome/free-solid-svg-icons";
import type {Recipe as RecipeProps} from "~/types/recipe";
import type {DaySchedule, Planning} from "~/types/plan";
import {formatToDate, getCurrentWeek, getCurrentDays} from "~/helpers/dates";
import {DISH_TYPES, MAIN_DISH_TYPES} from "~/constants/strings";
import Paragraph from "~/components/common/Paragraph";
import RecipeMenuV2 from "~/components/RecipeMenuV2";
import {WORKDAYS} from "~/constants/dates";
import Content from "./Content";
import Schedule from "./Schedule";
import Header from "./Header";

import Navigation from "./Navigation";

import Modal from "~/components/common/Modal";
import Search from "~/routes/Search";

import {getDomainPath} from '~/helpers/url'

import {startRecipeSearch, closeRecipeSearch} from "~/actions/plan";
import {GRAY_DARK} from "../../constants/colors";
import {Button, Card, Col, Collapse, Container, Row} from "react-bootstrap";
import {SummaryItem} from "../RecipeMenuV2/SummaryItem";
import {Footer} from "../RecipeMenuV2/Footer";
import {ImageContainer, ImagePlaceholder} from "../RecipeMenuV2/Image";
import {LazyLoadImage} from "react-lazy-load-image-component";
import Title from "../common/Title";
import {RemoveButton, SummaryAction} from "../RecipeMenuV2/Summary";


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

const headers = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]


const isEmpty = (schedule: Array<any>): boolean =>
    schedule.filter(Boolean).length === 0;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;

  > ${Paragraph} {
    margin: 0 0 0 0.2rem;
    text-align: center;
  }
`;

const Element = styled.div`
  text-align: center;
  min-width: 150px;
  margin: 10px 0;

  ${Paragraph} {
    margin: 0;
  }
`

const HeaderV = styled.div`
  flex: 1;
  text-align: center;
  min-width: 150px;

`;

class Planner extends React.Component<Props, State> {
    state = {
        week: null,
        open: true,
    };

    toggleRecipeSearch = () => {
        const {toggleRecipeSearch} = this.props;

        toggleRecipeSearch();
    };

    addRecipesToMenu = (recipes, day, index) => {

        this.state.week[index].weeks.map((item, key) => {
            item.weekDays[day].value.recipes = item.weekDays[day].value.recipes.concat(recipes)
            console.log('item.weekDays[day].value.recipes', item.weekDays[day].value.recipes);
        })
        let currentWeek = this.state.week;
        this.setState({...this.state})
        this.props.updateCentralPlan(currentWeek);
    };

    removeRecipe = (recipes, day, index, k) => {
        this.state.week[index].weeks.map((item, key) => {
            item.weekDays[day].value.recipes.splice(k, 1)
        })
        let currentWeek = this.state.week;
        this.setState({...this.state})
        this.props.updateCentralPlan(currentWeek);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.planning) {
            this.setState({week: nextProps.planning});
        }
    }

    componentDidMount() {
        if (this.props.planning) {
            this.setState({week: this.props.planning});
        }
    }

    render() {
        const {week} = this.state;
        const {count, menuId} = this.props;
        let hasProblem = false;

        return (
            <React.Fragment>
                <Navigation
                    setPrevious={this.setPreviousWeekDay}
                    count={count}
                    title={1}
                    setNext={this.setNextWeekDay}
                    onChange={this.handleViewFilters}
                />
                <Content>
                    <div className="container-fluid">
                        <div className='row flex-lg-nowrap flex-md-nowra'>
                            {headers.map((item, key) => (
                                <div className='col p-1' key={key}>
                                        <Element key={item}>
                                            <Paragraph>{item}</Paragraph>
                                        </Element>

                                        {week && week.map((type, i) => {
                                            return (
                                                <>
                                                    <Button
                                                        onClick={() => this.setState({
                                                                ['open_' + key + '_' + i]: !this.state['open_' + key + '_' + i]
                                                            }
                                                        )}
                                                        aria-controls={['example_' + key + '_' + i]}
                                                        aria-expanded={['open_' + key + '_' + i]}
                                                        variant="light"
                                                        style={{width: '100%'}}

                                                    >
                                                        <div style={{width: "100%", position: 'relative'}}>
                              <span style={{textAlign: "center"}}>
                                {type.dishName}
                              </span>
                                                            <span style={{right: "10px", position: 'absolute'}}>
                                  {this.state['open_' + key + '_' + i] ? (
                                      <FontAwesomeIcon icon={faCaretDown} color={GRAY_DARK}/>
                                  ) : (
                                      <FontAwesomeIcon icon={faCaretUp} color={GRAY_DARK}/>
                                  )}
                              </span>
                                                        </div>

                                                    </Button>

                                                    <Collapse in={!this.state['open_' + key + '_' + i]}>
                                                        <div id={'example' + i}>
                                                            {type.weeks[0].weekDays[key].value.recipes.map((rec, k) => {
                                                                const isFooterShown = rec.isOrganic || rec.hasOrphan
                                                                rec.name === 'Chicken Salad with Onions'
                                                                    ? (hasProblem = true)
                                                                    : (hasProblem = false)
                                                                const hasProblemStyle = hasProblem
                                                                    ? {borderTop: '3px solid orange'}
                                                                    : {borderTop: '3px solid transparent'}
                                                                const ContentV = styled.div`
                                          display: flex;
                                          flex-direction: ${rec.count === 1 ? 'row' : 'column'};
                                          padding: 0.5rem;
                                          p {
                                            margin-right: ${rec.count === 1 ? '2rem' : '0'};
                                          }
                                          button {
                                            margin-top: -0.4em;
                                          }
                                        `;

                                                                return (
                                                                    <Card key={k}>
                                                                        <Card.Header style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'space-between',
                                                                            padding: '5px'
                                                                        }}>
                                                                            <ImageContainer>
                                                                                <LazyLoadImage
                                                                                    height={40}
                                                                                    src={rec.photoUrl}
                                                                                    alt={rec.name}
                                                                                    placeholder={<ImagePlaceholder/>}
                                                                                />
                                                                            </ImageContainer>
                                                                            <Title style={{
                                                                                fontSize: '13px',
                                                                                textAlign: 'center',
                                                                                lineHeight: '20px'
                                                                            }}>{rec.name}</Title>
                                                                        </Card.Header>
                                                                        <ContentV>
                                                                            <Paragraph>
                                                                                <strong>Quantities</strong>: {Number(rec.quantities && rec.quantities.original)}
                                                                            </Paragraph>
                                                                            <Paragraph>
                                                                                <strong>EC</strong>: {rec.currency}
                                                                                {Number(rec.cost)}
                                                                            </Paragraph>
                                                                            <Paragraph>
                                                                                <strong>Selling
                                                                                    Price</strong>: {rec.currency}
                                                                                {Number(rec.price)}
                                                                            </Paragraph>
                                                                            <SummaryAction>
                                                                                <RemoveButton
                                                                                    role="button"
                                                                                    onClick={() => this.removeRecipe(rec, key, i, k)}
                                                                                >
                                                                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                                                                </RemoveButton>
                                                                                {rec.isOrganic && (
                                                                                    <FontAwesomeIcon icon={faLeaf}
                                                                                                     color={GRAY_DARK}/>
                                                                                )}
                                                                            </SummaryAction>
                                                                        </ContentV>
                                                                        <Footer>
                                                                            <SummaryItem>
                                                                                {!rec.isOrganic && (
                                                                                    <FontAwesomeIcon icon={faLeaf}
                                                                                                     color={GRAY_DARK}/>
                                                                                )}
                                                                            </SummaryItem>
                                                                            <SummaryItem>
                                                                                {!rec.hasOrphan && (
                                                                                    <FontAwesomeIcon icon={faStar}
                                                                                                     color={GRAY_DARK}/>
                                                                                )}
                                                                            </SummaryItem>
                                                                            <SummaryItem>
                                                                                {!rec.hasOrphan && (
                                                                                    <FontAwesomeIcon icon={faUtensils}
                                                                                                     color={GRAY_DARK}/>
                                                                                )}
                                                                            </SummaryItem>
                                                                        </Footer>
                                                                    </Card>
                                                                )
                                                            })}
                                                        </div>
                                                    </Collapse>
                                                    <Modal
                                                        triggerText={"add recipe"}
                                                        onToggle={() => this.toggleRecipeSearch()}
                                                        style={{width: '100%'}}
                                                    >
                                                        {({toggleProps}) => {
                                                            return (
                                                                <Search
                                                                    onModal
                                                                    finishSearch={toggleProps.onClick}
                                                                    onSearchFinish={data => {
                                                                        this.addRecipesToMenu(data, key, i);
                                                                    }}
                                                                />
                                                            );
                                                        }}
                                                    </Modal>
                                                </>
                                            );
                                        })}

                                        <br/>
                                </div>
                            ))}
                        </div>
                    </div>
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

const mapDispatchToProps = {
    toggleRecipeSearch: startRecipeSearch,
    addRecipesToMenu: closeRecipeSearch
};

export default connect(
    null,
    mapDispatchToProps
)(withNamespaces()(Planner));
